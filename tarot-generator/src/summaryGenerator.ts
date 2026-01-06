
/**
 * 總體指引生成器 (Summary Generator)
 * 
 * 問題：目前的 oracle_summaries 只有 5 種通用模式（如 "all_upright"），
 * 導致所有場景（愛情、事業）都共用同一句籠統的廢話。
 * 
 * 解法：
 * 此腳本會使用 DeepSeek API，針對 15 個 Scenarios * 5 種 Patterns，
 * 生成 75 則「高度客製化」的總體指引。
 * 
 * 例如：
 * - Love + All Upright -> 生成一段關於愛情順遂、鼓勵行動的優美指引。
 * - Career + One Reversed -> 生成一段關於事業大致看好，但需注意具體細節的指引。
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// 1. 定義 5 種牌陣模式
const PATTERNS = [
    { key: 'all_upright', nameZh: '全正位', description: '能量完全順暢，無阻礙' },
    { key: 'all_reversed', nameZh: '全逆位', description: '能量受阻，需要內省或暫停' },
    { key: 'one_reversed', nameZh: '單張逆位', description: '大部分順利，但有一個特定阻礙' },
    { key: 'one_upright', nameZh: '單張正位', description: '局勢困難，但仍有一線希望' },
    { key: 'mixed', nameZh: '正逆混合', description: '局勢複雜，好壞參半，需要平衡' }
];

// 2. 引用現有的 Scenarios (從 file 複製過來以免讀取依賴問題)
// 2. 引用現有的 Scenarios (完整 50 個場景)
const SCENARIOS = [
    // 感情類 (10)
    { key: 'love_single', nameZh: '單身求緣' },
    { key: 'love_crush', nameZh: '暗戀對象' },
    { key: 'love_pursuit', nameZh: '追求中' },
    { key: 'love_dating', nameZh: '熱戀期' },
    { key: 'love_conflict', nameZh: '感情磨合' },
    { key: 'love_marriage', nameZh: '婚姻關係' },
    { key: 'love_affair', nameZh: '第三者' },
    { key: 'love_breakup', nameZh: '分手' },
    { key: 'love_reunion', nameZh: '復合' },
    { key: 'love_feelings', nameZh: '對方心意' },

    // 事業類 (10)
    { key: 'career_seeking', nameZh: '求職' },
    { key: 'career_interview', nameZh: '面試' },
    { key: 'career_current', nameZh: '現職發展' },
    { key: 'career_promotion', nameZh: '升遷' },
    { key: 'career_raise', nameZh: '加薪' },
    { key: 'career_startup', nameZh: '創業' },
    { key: 'career_partner', nameZh: '合夥' },
    { key: 'career_change', nameZh: '轉行' },
    { key: 'career_retire', nameZh: '退休' },
    { key: 'career_conflict', nameZh: '職場衝突' },

    // 財運類 (10)
    { key: 'money_salary', nameZh: '正財運' },
    { key: 'money_windfall', nameZh: '偏財運' },
    { key: 'money_invest', nameZh: '投資' },
    { key: 'money_loan', nameZh: '借貸' },
    { key: 'money_debt', nameZh: '債務' },
    { key: 'money_property', nameZh: '買房' },
    { key: 'money_plan', nameZh: '理財規劃' },
    { key: 'money_loss', nameZh: '破財' },
    { key: 'money_luck', nameZh: '橫財' },
    { key: 'money_business', nameZh: '生意財' },

    // 學業類 (7)
    { key: 'study_admission', nameZh: '升學' },
    { key: 'study_exam', nameZh: '考試' },
    { key: 'study_cert', nameZh: '證照考試' },
    { key: 'study_abroad', nameZh: '留學' },
    { key: 'study_thesis', nameZh: '論文' },
    { key: 'study_skill', nameZh: '技能學習' },
    { key: 'study_compete', nameZh: '競賽' },

    // 健康類 (6)
    { key: 'health_body', nameZh: '身體健康' },
    { key: 'health_mental', nameZh: '心理健康' },
    { key: 'health_surgery', nameZh: '手術' },
    { key: 'health_recovery', nameZh: '康復' },
    { key: 'health_pregnancy', nameZh: '懷孕' },
    { key: 'health_birth', nameZh: '生產' },

    // 人際類 (7)
    { key: 'relation_family', nameZh: '家庭關係' },
    { key: 'relation_friend', nameZh: '朋友關係' },
    { key: 'relation_colleague', nameZh: '同事關係' },
    { key: 'relation_client', nameZh: '客戶關係' },
    { key: 'relation_neighbor', nameZh: '鄰居關係' },
    { key: 'relation_elder', nameZh: '長輩關係' },
    { key: 'relation_rival', nameZh: '對手競爭' },

    // 豐收類 (5)
    { key: 'harvest_farming', nameZh: '農業 (豐收)' },
    { key: 'harvest_fishery', nameZh: '漁業 (豐收)' },
    { key: 'harvest_forestry', nameZh: '林業 (豐收)' },
    { key: 'harvest_livestock', nameZh: '畜牧 (豐收)' },
    { key: 'harvest_garden', nameZh: '園藝 (豐收)' },

    // 一般 (原有保留)
    { key: 'general_search', nameZh: '尋物/尋人' },
    { key: 'general_travel', nameZh: '旅行/出行' },
    { key: 'general_legal', nameZh: '法律/訴訟' },
    { key: 'general_move', nameZh: '搬遷/遷移' },
    { key: 'general_luck', nameZh: '運勢/時機' },
    { key: 'general_future', nameZh: '未來展望' },
    { key: 'general_decision', nameZh: '一般決策' },
    { key: 'general_compete', nameZh: '比賽/競爭' },
    { key: 'general_spiritual', nameZh: '靈異/風水' },
    { key: 'general_gamble', nameZh: '賭博/博弈' },
    { key: 'general_vehicle', nameZh: '購車/買車' },
    { key: 'general_gift', nameZh: '禮物/驚喜' },
    { key: 'general_contact', nameZh: '聯絡/等待' },
    { key: 'general_weather', nameZh: '天氣/活動' },
    { key: 'general_contract', nameZh: '合作/契約' },
];

interface GenerationConfig {
    apiKey: string;
    outputDir: string;
    scenarios?: { key: string, nameZh: string }[];
    filename?: string;
}

class SummaryGenerator {
    private config: GenerationConfig;

    constructor(config: GenerationConfig) {
        this.config = config;
        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }
    }

    private async callDeepSeek(prompt: string): Promise<string> {
        // 簡易 retry 機制
        for (let i = 0; i < 3; i++) {
            try {
                const response = await fetch(DEEPSEEK_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.config.apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: [
                            { role: 'system', content: '你是一位專業、溫暖且富有靈性洞見的塔羅占卜師「艾瑟瑞爾」。請用優美、撫慰人心的繁體中文撰寫指引。' },
                            { role: 'user', content: prompt }
                        ],
                        temperature: 0.7,
                        max_tokens: 500
                    })
                });

                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                const data = await response.json() as any;
                return data.choices[0]?.message?.content || '';
            } catch (err) {
                console.warn(`Retry ${i + 1}...`);
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        return '';
    }

    private buildPrompt(scenario: { key: string, nameZh: string }, pattern: { key: string, nameZh: string, description: string }): string {
        return `
請為塔羅牌占卜的「總體指引」區塊撰寫一段總結文字。

**背景資訊**：
- **占卜主題**：${scenario.nameZh}
- **牌陣能量模式**：${pattern.nameZh} (${pattern.description})

**撰寫要求**：
1. **針對性強**：必須緊扣「${scenario.nameZh}」這個主題。不要寫通用的廢話。
2. **能量解讀**：根據「${pattern.description}」來給予建議。
   - 如果是全正位，鼓勵採取行動、把握機會。
   - 如果有逆位，溫柔地指出需要調整的心態或注意的隱患，不要嚇唬使用者。
3. **語氣**：溫暖、療癒、給予力量。
4. **字數**：約 80-120 字。精簡有力。
5. **格式**：直接輸出那段文字，不要有標題。

**範例（主題：愛情 / 模式：單張逆位）**：
「雖然大體上的緣分正在靠近，但似乎有一點小小的自我懷疑正在阻礙你。這張逆位牌不是拒絕，而是邀請你先愛自己。調整好心態，別讓不安遮蔽了愛的可能，幸福其實就在轉角。」
`;
    }

    async generateAll() {
        console.log('🚀 開始生成場景化總體指引...');
        const sqlStatements: string[] = [];

        const scenariosToProcess = this.config.scenarios || SCENARIOS;

        for (const scenario of scenariosToProcess) {
            console.log(`\n📂 處理場景: ${scenario.nameZh} (${scenario.key})`);

            for (const pattern of PATTERNS) {
                process.stdout.write(`  - 生成模式: ${pattern.nameZh}... `);

                const prompt = this.buildPrompt(scenario, pattern);
                const summary = await this.callDeepSeek(prompt);

                if (summary) {
                    // 轉義 SQL 字串
                    const escapedSummary = summary.replace(/'/g, "''").replace(/\n/g, '\\n').trim();

                    // 產生 SQL: 注意這裡我們假設資料庫多了一個 scenario_key 欄位
                    // 如果沒有，我們可能要用 pattern_key 的變體，例如 'love_single_all_upright'
                    const uniqueKey = `${scenario.key}_${pattern.key}`;

                    // 為了相容性，我們將 pattern_key 設為組合鍵
                    sqlStatements.push(`
INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('${uniqueKey}', '${escapedSummary}')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;
                    `.trim());

                    console.log('✅ 完成');
                } else {
                    console.log('❌ 失敗');
                }

                // 避免 Rate Limit
                await new Promise(r => setTimeout(r, 300));
            }
        }

        const outputPath = path.join(this.config.outputDir, this.config.filename || 'batch_summaries.sql');
        fs.writeFileSync(outputPath, sqlStatements.join('\n\n'));
        console.log(`\n🎉 全部完成！SQL 已儲存至: ${outputPath}`);
    }
}

// 執行
const apiKey = process.env.DEEPSEEK_API_KEY;
if (apiKey) {
    const GENERATION_CONFIG: GenerationConfig = {
        apiKey,
        outputDir: path.join(__dirname, '..', 'output', 'summaries'),
        // scenarios: SCENARIOS, // Default to all
        // filename: 'batch_summaries.sql' // Default
    };
    new SummaryGenerator(GENERATION_CONFIG).generateAll();
} else {
    console.error('請設定 DEEPSEEK_API_KEY');
}
