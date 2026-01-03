/**
 * DeepSeek Oracle Generator
 * 批量生成塔羅神諭解釋
 * 
 * 使用方式：
 * 1. 設定環境變數 DEEPSEEK_API_KEY
 * 2. 執行 npx ts-node scripts/generateOracle.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================
// 配置
// ============================================

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-e6ea454451754c26aa989b61a80776f3';

// 輸出目錄 (ESM compatible)
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../data/oracle');

// 延遲設定（避免 API 限流）
const DELAY_BETWEEN_REQUESTS = 500; // ms
const BATCH_SIZE = 50; // 每批處理數量
const SAVE_INTERVAL = 100; // 每 N 條儲存一次

// ============================================
// 牌卡定義
// ============================================

const MAJOR_ARCANA = [
    { id: 0, name: 'The Fool', nameZh: '愚者', keywords: '新開始、純真、冒險' },
    { id: 1, name: 'The Magician', nameZh: '魔術師', keywords: '顯化、技能、資源' },
    { id: 2, name: 'The High Priestess', nameZh: '女教皇', keywords: '直覺、神秘、潛意識' },
    { id: 3, name: 'The Empress', nameZh: '皇后', keywords: '豐盛、滋養、創造' },
    { id: 4, name: 'The Emperor', nameZh: '皇帝', keywords: '權威、結構、穩定' },
    { id: 5, name: 'The Hierophant', nameZh: '教皇', keywords: '傳統、指引、靈性' },
    { id: 6, name: 'The Lovers', nameZh: '戀人', keywords: '愛情、選擇、和諧' },
    { id: 7, name: 'The Chariot', nameZh: '戰車', keywords: '意志力、勝利、控制' },
    { id: 8, name: 'Strength', nameZh: '力量', keywords: '內在力量、勇氣、耐心' },
    { id: 9, name: 'The Hermit', nameZh: '隱士', keywords: '內省、獨處、智慧' },
    { id: 10, name: 'Wheel of Fortune', nameZh: '命運之輪', keywords: '變化、循環、命運' },
    { id: 11, name: 'Justice', nameZh: '正義', keywords: '公平、真相、因果' },
    { id: 12, name: 'The Hanged Man', nameZh: '倒吊人', keywords: '放下、轉換視角、等待' },
    { id: 13, name: 'Death', nameZh: '死亡', keywords: '結束、轉變、重生' },
    { id: 14, name: 'Temperance', nameZh: '節制', keywords: '平衡、調和、耐心' },
    { id: 15, name: 'The Devil', nameZh: '惡魔', keywords: '束縛、誘惑、陰影' },
    { id: 16, name: 'The Tower', nameZh: '高塔', keywords: '突變、崩塌、覺醒' },
    { id: 17, name: 'The Star', nameZh: '星星', keywords: '希望、療癒、靈感' },
    { id: 18, name: 'The Moon', nameZh: '月亮', keywords: '幻象、恐懼、潛意識' },
    { id: 19, name: 'The Sun', nameZh: '太陽', keywords: '成功、快樂、活力' },
    { id: 20, name: 'Judgement', nameZh: '審判', keywords: '重生、覺醒、評估' },
    { id: 21, name: 'The World', nameZh: '世界', keywords: '完成、整合、成就' },
];

// ============================================
// 場景定義
// ============================================

const SCENARIOS = [
    // 感情
    { key: 'love_single', name: '單身求緣', desc: '單身者尋找戀愛對象' },
    { key: 'love_crush', name: '暗戀對象', desc: '對某人有好感但未表白' },
    { key: 'love_pursuit', name: '追求中', desc: '正在追求心儀對象' },
    { key: 'love_dating', name: '熱戀期', desc: '剛開始交往的甜蜜期' },
    { key: 'love_conflict', name: '感情磨合', desc: '感情中遇到摩擦或問題' },
    { key: 'love_marriage', name: '婚姻關係', desc: '已婚或長期伴侶關係' },
    { key: 'love_affair', name: '第三者', desc: '涉及第三者的感情問題' },
    { key: 'love_breakup', name: '分手', desc: '面臨或剛經歷分手' },
    { key: 'love_reunion', name: '復合', desc: '考慮與前任復合' },
    { key: 'love_feelings', name: '對方心意', desc: '想了解對方的真實想法' },
    // 事業
    { key: 'career_seeking', name: '求職', desc: '正在找工作' },
    { key: 'career_interview', name: '面試', desc: '即將或正在面試' },
    { key: 'career_current', name: '現職發展', desc: '目前工作的發展前景' },
    { key: 'career_promotion', name: '升遷', desc: '升職的可能' },
    { key: 'career_raise', name: '加薪', desc: '薪資調整的機會' },
    { key: 'career_startup', name: '創業', desc: '自己創業開公司' },
    { key: 'career_partner', name: '合夥', desc: '與他人合作經營' },
    { key: 'career_change', name: '轉行', desc: '考慮換跑道' },
    { key: 'career_retire', name: '退休', desc: '退休規劃' },
    { key: 'career_conflict', name: '職場衝突', desc: '與同事或上司的問題' },
    // 財運
    { key: 'money_salary', name: '正財運', desc: '工作收入、薪水' },
    { key: 'money_windfall', name: '偏財運', desc: '意外之財、中獎' },
    { key: 'money_invest', name: '投資', desc: '股票、基金等投資' },
    { key: 'money_loan', name: '借貸', desc: '借錢給人或借錢' },
    { key: 'money_debt', name: '債務', desc: '欠債或討債' },
    { key: 'money_property', name: '買房', desc: '買房置產' },
    { key: 'money_plan', name: '理財規劃', desc: '儲蓄和理財' },
    { key: 'money_loss', name: '破財', desc: '意外支出、損失' },
    { key: 'money_luck', name: '橫財', desc: '中彩券、繼承等' },
    { key: 'money_business', name: '生意財', desc: '經商收入' },
    // 學業
    { key: 'study_admission', name: '升學', desc: '升學考試' },
    { key: 'study_exam', name: '考試', desc: '各類考試' },
    { key: 'study_cert', name: '證照考試', desc: '專業證照' },
    { key: 'study_abroad', name: '留學', desc: '出國留學' },
    { key: 'study_thesis', name: '論文', desc: '畢業論文' },
    { key: 'study_skill', name: '技能學習', desc: '學習新技能' },
    { key: 'study_compete', name: '競賽', desc: '比賽競爭' },
    // 健康
    { key: 'health_body', name: '身體健康', desc: '整體身體狀況' },
    { key: 'health_mental', name: '心理健康', desc: '情緒和心理狀態' },
    { key: 'health_surgery', name: '手術', desc: '手術相關' },
    { key: 'health_recovery', name: '康復', desc: '疾病康復' },
    { key: 'health_pregnancy', name: '懷孕', desc: '懷孕相關' },
    { key: 'health_birth', name: '生產', desc: '生產相關' },
    // 人際
    { key: 'relation_family', name: '家庭關係', desc: '與家人的關係' },
    { key: 'relation_friend', name: '朋友關係', desc: '與朋友的關係' },
    { key: 'relation_colleague', name: '同事關係', desc: '與同事的關係' },
    { key: 'relation_client', name: '客戶關係', desc: '與客戶的關係' },
    { key: 'relation_neighbor', name: '鄰居關係', desc: '與鄰居的關係' },
    { key: 'relation_elder', name: '長輩關係', desc: '與長輩的關係' },
    { key: 'relation_rival', name: '對手競爭', desc: '競爭對手' },
];

// ============================================
// 位置定義
// ============================================

const POSITIONS = [
    { key: 'past', name: '過去', desc: '影響現況的過去因素' },
    { key: 'present', name: '現在', desc: '當前的狀態與能量' },
    { key: 'future', name: '未來', desc: '可能的發展方向' },
    { key: 'self', name: '自我', desc: '你自身的狀態或態度' },
    { key: 'other', name: '對方', desc: '對方或他人的狀態' },
    { key: 'obstacle', name: '障礙', desc: '阻礙進展的因素' },
    { key: 'advice', name: '建議', desc: '建議採取的行動' },
    { key: 'environment', name: '環境', desc: '外在環境的影響' },
    { key: 'hope_fear', name: '希望與恐懼', desc: '內心的期待與擔憂' },
    { key: 'outcome', name: '結果', desc: '最終可能的結局' },
];

// ============================================
// 提示詞模板
// ============================================

function buildPrompt(
    card: typeof MAJOR_ARCANA[0],
    orientation: 'upright' | 'reversed',
    scenario: typeof SCENARIOS[0],
    position: typeof POSITIONS[0]
): string {
    const orientationText = orientation === 'upright' ? '正位' : '逆位';
    const orientationKeywords = orientation === 'upright'
        ? card.keywords
        : card.keywords.split('、').map(k => '（逆）' + k).join('、');

    return `你是專業塔羅牌占卜師，請為以下情境生成塔羅牌解釋。

【牌卡資訊】
- 牌名：${card.nameZh}（${card.name}）
- 方向：${orientationText}
- 牌義關鍵詞：${orientationKeywords}

【占卜情境】
- 場景：${scenario.name}
- 場景描述：${scenario.desc}
- 位置：${position.name}
- 位置含義：${position.desc}

【輸出要求】
1. 字數：120-150 字（繁體中文）
2. 語氣：溫暖、有共情、帶有希望但不失真實
3. 結構：現象描述 → 原因分析 → 正向建議
4. 開頭：不需要重複牌名和位置，直接進入解釋
5. 避免：絕對性陳述、過度負面、重複用詞

請直接輸出解釋內容，不需要任何格式標記：`;
}

// ============================================
// API 呼叫
// ============================================

async function callDeepSeek(prompt: string): Promise<string> {
    const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
}

// ============================================
// 生成邏輯
// ============================================

interface GeneratedItem {
    card_id: number;
    card_name: string;
    orientation: string;
    scenario_key: string;
    position_key: string;
    interpretation: string;
}

async function generateAllInterpretations(): Promise<void> {
    console.log('🎴 開始生成神諭解釋...');
    console.log(`📊 總計：${MAJOR_ARCANA.length} 牌 × 2 方向 × ${SCENARIOS.length} 場景 × ${POSITIONS.length} 位置`);
    console.log(`📊 預計生成：${MAJOR_ARCANA.length * 2 * SCENARIOS.length * POSITIONS.length} 條\n`);

    // 確保輸出目錄存在
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const results: GeneratedItem[] = [];
    let completed = 0;
    let errors = 0;

    // 讀取已存在的進度
    const progressFile = path.join(OUTPUT_DIR, 'progress.json');
    let startFrom = 0;
    if (fs.existsSync(progressFile)) {
        const progress = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
        startFrom = progress.completed || 0;
        console.log(`📂 發現進度檔，從第 ${startFrom} 條繼續...\n`);
    }

    // 生成所有組合
    const combinations: Array<{
        card: typeof MAJOR_ARCANA[0];
        orientation: 'upright' | 'reversed';
        scenario: typeof SCENARIOS[0];
        position: typeof POSITIONS[0];
    }> = [];

    for (const card of MAJOR_ARCANA) {
        for (const orientation of ['upright', 'reversed'] as const) {
            for (const scenario of SCENARIOS) {
                for (const position of POSITIONS) {
                    combinations.push({ card, orientation, scenario, position });
                }
            }
        }
    }

    console.log(`🔄 總共 ${combinations.length} 個組合需要生成\n`);

    // 從上次進度繼續
    for (let i = startFrom; i < combinations.length; i++) {
        const { card, orientation, scenario, position } = combinations[i];

        try {
            const prompt = buildPrompt(card, orientation, scenario, position);
            const interpretation = await callDeepSeek(prompt);

            results.push({
                card_id: card.id,
                card_name: card.nameZh,
                orientation,
                scenario_key: scenario.key,
                position_key: position.key,
                interpretation,
            });

            completed++;

            // 顯示進度
            if (completed % 10 === 0) {
                const percent = ((i + 1) / combinations.length * 100).toFixed(1);
                console.log(`✅ 進度：${i + 1}/${combinations.length} (${percent}%) - ${card.nameZh} ${orientation} ${scenario.name} ${position.name}`);
            }

            // 定期儲存
            if (completed % SAVE_INTERVAL === 0) {
                await saveResults(results, i + 1);
                console.log(`💾 已儲存 ${results.length} 條結果\n`);
            }

            // 延遲避免 API 限流
            await delay(DELAY_BETWEEN_REQUESTS);

        } catch (error) {
            errors++;
            console.error(`❌ 錯誤 [${card.nameZh} ${orientation} ${scenario.key} ${position.key}]:`, error);

            // 記錄錯誤
            fs.appendFileSync(
                path.join(OUTPUT_DIR, 'errors.log'),
                `${new Date().toISOString()} - ${card.id},${orientation},${scenario.key},${position.key}\n`
            );
        }
    }

    // 最終儲存
    await saveResults(results, combinations.length);

    console.log('\n🎉 生成完成！');
    console.log(`✅ 成功：${completed} 條`);
    console.log(`❌ 錯誤：${errors} 條`);
    console.log(`📁 結果儲存於：${OUTPUT_DIR}`);
}

async function saveResults(results: GeneratedItem[], completedIndex: number): Promise<void> {
    // 儲存結果
    const outputFile = path.join(OUTPUT_DIR, 'interpretations.json');
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf-8');

    // 儲存進度
    const progressFile = path.join(OUTPUT_DIR, 'progress.json');
    fs.writeFileSync(progressFile, JSON.stringify({ completed: completedIndex }, null, 2), 'utf-8');
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// 主函數
// ============================================

generateAllInterpretations().catch(console.error);
