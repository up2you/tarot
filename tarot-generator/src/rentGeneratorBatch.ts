
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

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

const POSITIONS = [
    { key: 'single', nameZh: '單張' },
    { key: 'past', nameZh: '過去' },
    { key: 'present', nameZh: '現在' },
    { key: 'future', nameZh: '未來' },
];

const SCENARIO = { key: 'house_rent', nameZh: '租屋指引', description: '判斷這間房子是否適合租住、租屋運勢' };

interface GenerationConfig {
    apiKey: string;
    outputDir: string;
    rateLimitMs: number;
    startIdx: number;
    endIdx: number;
    batchName: string;
}

class RentGeneratorBatch {
    private config: GenerationConfig;

    constructor(config: GenerationConfig) {
        this.config = config;
        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }
    }

    private async callDeepSeek(prompt: string): Promise<string> {
        // Simple retry logic inside call
        let retries = 3;
        while (retries > 0) {
            try {
                const response = await fetch(DEEPSEEK_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.config.apiKey}` },
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: [
                            { role: "system", content: "你是一位名為「艾瑟瑞爾」的神秘塔羅占卜師。你的語言風格優雅、直覺敏銳，並總是能給出富有靈性但又切中現實的建議。請專注於「租屋/居住」的場景，給出具體的判斷。" },
                            { role: "user", content: prompt }
                        ],
                        temperature: 0.7
                    })
                });
                if (!response.ok) throw new Error(response.statusText);
                const data: any = await response.json();
                return data.choices[0].message.content;
            } catch (e) {
                console.error(`[${this.config.batchName}] Error, retrying... ${retries}`, e);
                retries--;
                await new Promise(r => setTimeout(r, 2000));
            }
        }
        return '';
    }

    private buildPrompt(card: typeof MAJOR_ARCANA[0], isReversed: boolean): string {
        const orientation = isReversed ? '逆位' : '正位';
        return `
題目：詢問「這間房子適合租嗎？」或「我的租屋運勢如何？」
抽到的牌是：${card.nameZh} (${orientation})。

請根據這張牌的能量，撰寫一段對「租屋者」的建議。
請包含以下兩個部分：
1. 【建議：[適合/不適合/再考慮]】(請給出明確結論，如：適合簽約、充滿隱憂、不適合久居)
2. 解讀內容：(約 150 字)
   - 以艾瑟瑞爾的口吻解釋。
   - 分析這間房子的能量（例如：採光、磁場、鄰居、房東關係）。
   - 指出具體的優點或隱憂。

範例格式：
【建議：適合簽約】
這間房子充滿了皇后的豐盛能量...
`;
    }

    public async generate() {
        const outputPath = path.join(this.config.outputDir, `rent_oracle_data_${this.config.batchName}.sql`);
        console.log(`🚀 [${this.config.batchName}] Starting batch ${this.config.startIdx} to ${this.config.endIdx}`);

        // Truncate file initially if starting fresh? No, assume manual clean or append.
        // Let's clear it first to avoid duplicates if re-run
        fs.writeFileSync(outputPath, `-- Batch ${this.config.batchName}\n`);

        const cardsToProcess = MAJOR_ARCANA.slice(this.config.startIdx, this.config.endIdx + 1);

        for (const card of cardsToProcess) {
            for (const isReversed of [false, true]) {
                const prompt = this.buildPrompt(card, isReversed);
                const content = await this.callDeepSeek(prompt);

                if (content) {
                    const cleanContent = content.trim();
                    const escapedContent = cleanContent.replace(/'/g, "''");

                    console.log(`✅ [${this.config.batchName}] ${card.nameZh} (${isReversed ? '逆' : '正'})`);

                    let sqlBlock = '';
                    for (const pos of POSITIONS) {
                        sqlBlock += `INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation) VALUES (${card.id}, '${card.nameZh}', '${isReversed ? 'reversed' : 'upright'}', '${SCENARIO.key}', '${pos.key}', '${escapedContent}') ON CONFLICT (card_id, orientation, scenario_key, position_key) DO UPDATE SET interpretation = EXCLUDED.interpretation;\n`;
                    }

                    // Append immediately
                    fs.appendFileSync(outputPath, sqlBlock);
                }

                await new Promise(resolve => setTimeout(resolve, this.config.rateLimitMs));
            }
        }
        console.log(`🏁 [${this.config.batchName}] Finished!`);
    }
}

// ARGS: startIdx endIdx batchName
const args = process.argv.slice(2);
const startIdx = parseInt(args[0]) || 0;
const endIdx = parseInt(args[1]) || 10;
const batchName = args[2] || 'part1';

const generator = new RentGeneratorBatch({
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    outputDir: path.join(__dirname, '../output'),
    rateLimitMs: 500, // Faster
    startIdx,
    endIdx,
    batchName
});

generator.generate().catch(console.error);
