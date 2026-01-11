/**
 * 人際關係神諭解讀生成器
 * 使用 DeepSeek API 為 7 個人際關係 scenario 生成塔羅牌解讀
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// 22 張大阿爾克那
const MAJOR_ARCANA = [
    { id: 0, name: 'The Fool', nameZh: '愚者' },
    { id: 1, name: 'The Magician', nameZh: '魔術師' },
    { id: 2, name: 'The High Priestess', nameZh: '女教皇' },
    { id: 3, name: 'The Empress', nameZh: '皇后' },
    { id: 4, name: 'The Emperor', nameZh: '皇帝' },
    { id: 5, name: 'The Hierophant', nameZh: '教皇' },
    { id: 6, name: 'The Lovers', nameZh: '戀人' },
    { id: 7, name: 'The Chariot', nameZh: '戰車' },
    { id: 8, name: 'Strength', nameZh: '力量' },
    { id: 9, name: 'The Hermit', nameZh: '隱士' },
    { id: 10, name: 'Wheel of Fortune', nameZh: '命運之輪' },
    { id: 11, name: 'Justice', nameZh: '正義' },
    { id: 12, name: 'The Hanged Man', nameZh: '倒吊人' },
    { id: 13, name: 'Death', nameZh: '死亡' },
    { id: 14, name: 'Temperance', nameZh: '節制' },
    { id: 15, name: 'The Devil', nameZh: '惡魔' },
    { id: 16, name: 'The Tower', nameZh: '高塔' },
    { id: 17, name: 'The Star', nameZh: '星星' },
    { id: 18, name: 'The Moon', nameZh: '月亮' },
    { id: 19, name: 'The Sun', nameZh: '太陽' },
    { id: 20, name: 'Judgement', nameZh: '審判' },
    { id: 21, name: 'The World', nameZh: '世界' },
];

// 位置定義 - 適用於人際關係牌陣
const POSITIONS = [
    { key: 'past', nameZh: '過去' },
    { key: 'present', nameZh: '現在' },
    { key: 'future', nameZh: '未來' },
    { key: 'self', nameZh: '自己' },
    { key: 'other', nameZh: '對方' },
    { key: 'environment', nameZh: '環境' },
    { key: 'obstacle', nameZh: '阻礙' },
    { key: 'advice', nameZh: '建議' },
    { key: 'outcome', nameZh: '結果' },
    { key: 'relation', nameZh: '連結' }, // 人際關係專用位置
];

// 7 個人際關係 scenario
const SCENARIOS = [
    {
        key: 'relation_family',
        nameZh: '家庭關係',
        description: '與家人（父母、兄弟姊妹、親戚）的關係改善、相處問題、家庭和諧',
        context: '家庭成員之間的情感連結、溝通障礙、世代衝突、家庭責任與期待'
    },
    {
        key: 'relation_friend',
        nameZh: '朋友關係',
        description: '友誼維繫、朋友相處、交友狀況、友情衝突',
        context: '友誼的深度、信任問題、朋友間的誤會、社交圈的變化'
    },
    {
        key: 'relation_colleague',
        nameZh: '同事關係',
        description: '職場同事相處、團隊合作、辦公室人際',
        context: '工作協作、職場競爭、同事衝突、團隊氛圍'
    },
    {
        key: 'relation_client',
        nameZh: '客戶關係',
        description: '客戶關係維護、商業往來、服務品質',
        context: '客戶滿意度、商業信任、長期合作、專業形象'
    },
    {
        key: 'relation_neighbor',
        nameZh: '鄰居關係',
        description: '鄰里相處、社區關係、鄰居糾紛',
        context: '鄰里和諧、界限問題、社區互動、環境適應'
    },
    {
        key: 'relation_elder',
        nameZh: '長輩關係',
        description: '與長輩（上司、老師、前輩）的關係、尊敬與溝通',
        context: '權威關係、學習成長、指導與被指導、世代理解'
    },
    {
        key: 'relation_rival',
        nameZh: '對手競爭',
        description: '競爭對手、敵對關係、對立局面',
        context: '競爭態勢、策略應對、化敵為友、競爭中的成長'
    },
];

interface GenerationConfig {
    apiKey: string;
    outputDir: string;
    rateLimitMs: number;
}

class RelationOracleGenerator {
    private config: GenerationConfig;
    private progressFile: string;
    private totalGenerated = 0;
    private totalToGenerate = SCENARIOS.length * MAJOR_ARCANA.length * 2 * POSITIONS.length;

    constructor(config: GenerationConfig) {
        this.config = config;
        this.progressFile = path.join(config.outputDir, 'relation_generation_progress.md');

        // 確保輸出目錄存在
        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }
    }

    // 調用 DeepSeek API
    private async callDeepSeek(prompt: string): Promise<string> {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: '你是一位專業的塔羅牌解讀師「艾瑟瑞爾」，專精於人際關係諮詢。你的語氣溫暖、富有同理心、充滿智慧。請用繁體中文回答，並聚焦於人與人之間的互動、情感連結與溝通改善。' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.8,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
        }

        const data: any = await response.json();
        return data.choices[0]?.message?.content || '';
    }

    // 構建 AI prompt - 針對人際關係優化
    private buildPrompt(
        scenario: typeof SCENARIOS[0],
        card: typeof MAJOR_ARCANA[0],
        isReversed: boolean,
        position: typeof POSITIONS[0]
    ): string {
        const orientation = isReversed ? '逆位' : '正位';

        // 根據不同位置調整提示詞
        const positionGuidance = this.getPositionGuidance(position.key, scenario.key);

        return `請為以下塔羅牌情境撰寫解讀：

【情境】：${scenario.nameZh}（${scenario.description}）
【背景】：${scenario.context}
【牌卡】：${card.nameZh}（${card.name}）- ${orientation}
【位置】：${position.nameZh}

${positionGuidance}

請撰寫約 200-250 字的解讀，包含：
1. 第一段：描述這張牌在此位置對人際關係的啟示（聚焦於雙方互動、情感狀態）
2. 第二段：解釋這種關係模式的深層原因或心理動機
3. 第三段：給予具體、可操作的改善建議（如何溝通、調整心態、行動方向）

語氣要求：
- 富有同理心，理解關係中的複雜性與脆弱
- 避免批判任何一方，保持中立與包容
- 提供實際可行的溝通技巧或心態調整建議
- 用溫暖的語言鼓勵提問者主動改善關係

請直接輸出解讀內容，不要加標題或分段標記。`;
    }

    // 根據位置提供特定指引
    private getPositionGuidance(positionKey: string, scenarioKey: string): string {
        const relationshipType = this.getRelationshipLabel(scenarioKey);

        const guidanceMap: Record<string, string> = {
            'self': `【位置說明】：「自己」代表提問者在這段${relationshipType}中的態度、情緒與行為模式。請描述提問者當前的內在狀態如何影響關係。`,
            'other': `【位置說明】：「對方」代表${relationshipType}中另一方的心理狀態、想法與行為傾向。請描述對方的立場與感受。`,
            'past': `【位置說明】：「過去」代表這段${relationshipType}的歷史根源，過往的互動如何影響現在。`,
            'present': `【位置說明】：「現在」代表這段${relationshipType}當前的狀態、主要問題或互動模式。`,
            'future': `【位置說明】：「未來」代表這段${relationshipType}的發展走向，若雙方繼續當前模式會如何演變。`,
            'obstacle': `【位置說明】：「阻礙」代表這段${relationshipType}中最主要的障礙，可能是溝通問題、誤解或外在因素。`,
            'advice': `【位置說明】：「建議」代表如何改善這段${relationshipType}，提問者應該採取什麼行動或調整什麼心態。`,
            'outcome': `【位置說明】：「結果」代表若提問者採納建議，這段${relationshipType}最終可能達到的狀態。`,
            'environment': `【位置說明】：「環境」代表影響這段${relationshipType}的外在因素、社會期待或周圍人的態度。`,
            'relation': `【位置說明】：「連結」代表雙方之間的情感紐帶、信任基礎與互動品質的核心。`,
        };

        return guidanceMap[positionKey] || '';
    }

    // 根據 scenario 返回關係類型標籤
    private getRelationshipLabel(scenarioKey: string): string {
        const labels: Record<string, string> = {
            'relation_family': '家庭關係',
            'relation_friend': '友誼',
            'relation_colleague': '同事關係',
            'relation_client': '客戶關係',
            'relation_neighbor': '鄰里關係',
            'relation_elder': '與長輩的關係',
            'relation_rival': '競爭關係',
        };
        return labels[scenarioKey] || '人際關係';
    }

    // 生成單筆解讀
    private async generateInterpretation(
        scenario: typeof SCENARIOS[0],
        card: typeof MAJOR_ARCANA[0],
        isReversed: boolean,
        position: typeof POSITIONS[0]
    ): Promise<string> {
        const prompt = this.buildPrompt(scenario, card, isReversed, position);

        try {
            return await this.callDeepSeek(prompt);
        } catch (error) {
            console.error(`❌ 生成失敗 ${scenario.key}/${card.nameZh}/${isReversed ? '逆位' : '正位'}/${position.key}:`, error);
            return '';
        }
    }

    // 更新進度文件
    private updateProgress(scenarioIndex: number, currentScenario: string, completed: number) {
        const percent = Math.round((this.totalGenerated / this.totalToGenerate) * 100);
        const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

        const scenarioStatus = SCENARIOS.map((s, i) => {
            if (i < scenarioIndex) return `| ${i + 1} | ${s.key} | ✅ 完成 | 440/440 |`;
            if (i === scenarioIndex) return `| ${i + 1} | ${s.key} | 🔄 進行中 | ${completed}/440 |`;
            return `| ${i + 1} | ${s.key} | ⏳ 等待中 | 0/440 |`;
        }).join('\n');

        const content = `# 人際關係神諭資料生成進度

## 🚀 生成狀態：進行中

| 項目 | 數值 |
|------|------|
| 開始時間 | ${now} |
| 總筆數 | ${this.totalToGenerate} |
| 已完成 | ${this.totalGenerated} |
| 進度 | ${percent}% |

---

## 📊 各 Scenario 進度

| # | scenario_key | 狀態 | 已完成/總數 |
|---|--------------|------|------------|
${scenarioStatus}

---

## 📁 輸出檔案

生成完成的 SQL 將存放在：
- \`f:\\TL\\tarot-generator\\output\\relation_scenarios\\\`

---

## 🔄 最後更新

${now}
`;

        fs.writeFileSync(this.progressFile, content);
    }

    // 生成單個 scenario 的所有解讀
    async generateScenario(scenarioIndex: number): Promise<string[]> {
        const scenario = SCENARIOS[scenarioIndex];
        const sqlStatements: string[] = [];
        let completed = 0;

        console.log(`\n📝 開始生成 ${scenario.key} (${scenario.nameZh})...`);

        for (const card of MAJOR_ARCANA) {
            for (const isReversed of [false, true]) {
                for (const position of POSITIONS) {
                    const interpretation = await this.generateInterpretation(scenario, card, isReversed, position);

                    if (interpretation) {
                        const escapedText = interpretation.replace(/'/g, "''").replace(/\n/g, '\\n');
                        const sql = `INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation) VALUES (${card.id}, '${card.nameZh}', '${isReversed ? 'reversed' : 'upright'}', '${scenario.key}', '${position.key}', '${escapedText}');`;
                        sqlStatements.push(sql);
                    }

                    completed++;
                    this.totalGenerated++;
                    this.updateProgress(scenarioIndex, scenario.key, completed);

                    // Rate limiting
                    await this.delay(this.config.rateLimitMs);

                    // 每 10 筆輸出進度
                    if (completed % 10 === 0) {
                        console.log(`  ${scenario.key}: ${completed}/440 (${Math.round(completed / 440 * 100)}%)`);
                    }
                }
            }
        }

        // 保存此 scenario 的 SQL
        const outputFile = path.join(this.config.outputDir, `${scenario.key}.sql`);
        fs.writeFileSync(outputFile, sqlStatements.join('\n'));
        console.log(`✅ ${scenario.key} 完成！已保存到 ${outputFile}`);

        return sqlStatements;
    }

    // 生成所有 scenario
    async generateAll(): Promise<void> {
        console.log('🚀 開始生成 7 個人際關係神諭 scenario（使用 DeepSeek API）...\n');
        console.log(`總計需生成：${this.totalToGenerate} 筆資料\n`);
        console.log('💡 預估時間：約 40-60 分鐘\n');

        const allSql: string[] = [];

        for (let i = 0; i < SCENARIOS.length; i++) {
            const sql = await this.generateScenario(i);
            allSql.push(...sql);
        }

        // 合併所有 SQL 到一個文件
        const combinedFile = path.join(this.config.outputDir, 'all_relation_scenarios.sql');
        fs.writeFileSync(combinedFile, allSql.join('\n'));

        console.log('\n🎉 全部完成！');
        console.log(`所有 SQL 已合併到：${combinedFile}`);
        console.log(`總計生成：${this.totalGenerated} 筆解讀`);
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 主程式
async function main() {
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
        console.error('❌ 請設定 DEEPSEEK_API_KEY 環境變數');
        console.error('請在 f:\\TL\\tarot-generator\\.env 中設定：');
        console.error('DEEPSEEK_API_KEY=your_api_key_here');
        process.exit(1);
    }

    console.log('✅ 已找到 DeepSeek API Key');

    const config: GenerationConfig = {
        apiKey,
        outputDir: path.join(__dirname, '..', 'output', 'relation_scenarios'),
        rateLimitMs: 500, // DeepSeek 限制較寬鬆，使用 500ms 間隔
    };

    const generator = new RelationOracleGenerator(config);
    await generator.generateAll();
}

main().catch(console.error);
