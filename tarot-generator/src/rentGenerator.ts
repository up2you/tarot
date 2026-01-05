
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// 22 Major Arcana
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

// Positions
const POSITIONS = [
    { key: 'single', nameZh: '單張' },
    { key: 'past', nameZh: '過去' },
    { key: 'present', nameZh: '現在' },
    { key: 'future', nameZh: '未來' },
];

// Rent Scenario
const SCENARIO = { key: 'house_rent', nameZh: '租屋指引', description: '判斷這間房子是否適合租住、租屋運勢' };

interface GenerationConfig {
    apiKey: string;
    outputDir: string;
    rateLimitMs: number;
}

class RentGenerator {
    private config: GenerationConfig;
    private progressFile: string;

    constructor(config: GenerationConfig) {
        this.config = config;
        this.progressFile = path.join(config.outputDir, 'rent_generation_progress.md');

        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }
    }

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
                    { role: "system", content: "你是一位名為「艾瑟瑞爾」的神秘塔羅占卜師。你的語言風格優雅、直覺敏銳，並總是能給出富有靈性但又切中現實的建議。請專注於「租屋/居住」的場景，給出具體的判斷。" },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        const data: any = await response.json();
        return data.choices[0].message.content;
    }

    private buildPrompt(card: typeof MAJOR_ARCANA[0], isReversed: boolean): string {
        const orientation = isReversed ? '逆位' : '正位';
        return `
題目：詢問「這間房子適合租嗎？」或「我的租屋運勢如何？」
抽到的牌是：${card.nameZh} (${orientation})。

請根據這張牌的能量，撰寫一段對「租屋者」的建議。
請包含以下兩個部分：
1. 【建議：[適合/不適合/再考慮]】(請給出明確的短語，如：適合簽約、充滿隱憂、不適合久居、環境優良等，做為最終結論的依據)
2. 解讀內容：(約 150 字)
   - 以艾瑟瑞爾的口吻解釋。
   - 分析這間房子的能量（例如：採光、磁場、鄰居、房東關係、是否適合居住）。
   - 若是逆位或凶牌，請具體指出可能的隱憂（如合約陷阱、設施損壞、噪音）。
   - 若是吉牌，請描述居住後的正面影響。

範例格式：
【建議：適合簽約】
這間房子充滿了皇后的豐盛能量，採光充足且磁場溫暖。就像回到母親的懷抱，這裡能滋養你的身心，是個極佳的安身之處。房東或許也相當親切大方。建議你把握機會，讓這裡成為你生活的基石。
`;
    }

    public async generate() {
        console.log(`🔮 開始生成租屋指引神諭...`);
        let sqlStatements = '';

        for (const card of MAJOR_ARCANA) {
            for (const isReversed of [false, true]) {
                const prompt = this.buildPrompt(card, isReversed);

                try {
                    // Retry logic simple
                    let content = '';
                    let retries = 3;
                    while (retries > 0) {
                        try {
                            content = await this.callDeepSeek(prompt);
                            break;
                        } catch (e) {
                            console.error(`Error, retrying... ${retries}`);
                            retries--;
                            await new Promise(r => setTimeout(r, 2000));
                        }
                    }

                    if (content) {
                        content = content.trim();
                        const escapedContent = content.replace(/'/g, "''"); // SQL escape single quotes

                        console.log(`✅ ${card.nameZh} (${isReversed ? '逆' : '正'})`);

                        for (const pos of POSITIONS) {
                            // Use same content for all positions in this specific scenario style for simplicity, 
                            // or just generate once maps to all positions as the prompt is general about "this house".
                            // Since the user asks "Can I rent this?", the advice applies to the situation naturally.
                            // We duplicate the content for past/present/future/single to ensure match.
                            sqlStatements += `INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation) VALUES (${card.id}, '${card.nameZh}', '${isReversed ? 'reversed' : 'upright'}', '${SCENARIO.key}', '${pos.key}', '${escapedContent}') ON CONFLICT (card_id, orientation, scenario_key, position_key) DO UPDATE SET interpretation = EXCLUDED.interpretation;\n`;
                        }
                    }

                    await new Promise(resolve => setTimeout(resolve, this.config.rateLimitMs));

                } catch (error) {
                    console.error(`❌ Failed to generate for ${card.nameZh}:`, error);
                }
            }
        }

        const outputPath = path.join(this.config.outputDir, 'rent_oracle_data.sql');
        fs.writeFileSync(outputPath, sqlStatements);
        console.log(`✨ 生成完成！SQL 已儲存至：${outputPath}`);
    }
}

// 執行生成
const generator = new RentGenerator({
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    outputDir: path.join(__dirname, '../output'),
    rateLimitMs: 1000
});

generator.generate().catch(console.error);
