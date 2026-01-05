
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

// 針對方位指引，我們只需要一個位置 key，但為了相容 App 的查詢（past/present/future），
// 我們生成時使用 'single'，然後 SQL 後處理會複製給其他 key。
// 或者直接在這裡生成多個 key 的內容（雖然內容可能雷同，但可以讓 AI 寫出細微差別）。
// 用戶之前的 SQL 修復是用複製的。為了品質，我們還是生成一份 'single' 的高品質內容就好，
// 並且在 SQL 寫入時直接寫入四個 positions: single, past, present, future.

const SCENARIO = { key: 'general_direction', nameZh: '方位指引', description: '指引適合前往的方位或空間建議' };

class DirectionGenerator {
    private apiKey: string;
    private outputDir: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.outputDir = path.join(__dirname, '..', 'output');
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    private async callDeepSeek(prompt: string): Promise<string> {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: '你是一位名為「艾瑟瑞爾」的 17 世紀巴洛克宮廷神祕學家。你的語氣高貴、神祕，帶有詩意與哲理。你擅長透過塔羅牌給予人們方向的指引。'
                    },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.8,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        return data.choices[0]?.message?.content || '';
    }

    private buildPrompt(card: typeof MAJOR_ARCANA[0], isReversed: boolean): string {
        const orientation = isReversed ? '逆位' : '正位';
        return `
題目：為迷途者指引方向。
抽到的牌是：${card.nameZh} (${orientation})。

請根據這張牌的能量，判斷最適合的「方位建議」（只能從以下選擇一個：東方、南方、西方、北方、前進、後退、留在原地）。

輸出格式要求：
【方位：[你選擇的方位]】
[這裡請用一段約 150 字的文字，以艾瑟瑞爾的口吻解釋為什麼選擇這個方位。結合牌面的意象（如隱士的燈籠、戰車的輪子等）與其象徵意義。語氣要優美、深邃，並給出一個強而有力的指引結論。]

範例：
【方位：北方】
隱士手中的提燈照亮了內在的雪山。北方的寒冷與寂靜正是你此刻需要的良藥。遠離喧囂的人群，往幽靜的高處走去，智慧的聲音只有在孤獨中才能聽見。不要急於行動，先在北方的靜謐中找回你自己。
`;
    }

    async generateAll() {
        console.log('🔮 開始生成方位指引神諭 (DeepSeek AI)...');
        const sqlStatements: string[] = [];

        // 為了讓使用者體驗更好，我們直接在 SQL 產生所有需要的 position
        const targetPositions = ['single', 'past', 'present', 'future'];

        for (const card of MAJOR_ARCANA) {
            for (const isReversed of [false, true]) {
                const prompt = this.buildPrompt(card, isReversed);
                let content = '';

                // Retry logic
                for (let i = 0; i < 3; i++) {
                    try {
                        content = await this.callDeepSeek(prompt);
                        break;
                    } catch (e) {
                        console.log('Retrying...');
                        await new Promise(r => setTimeout(r, 1000));
                    }
                }

                if (content) {
                    // 簡單清理
                    content = content.trim();
                    const escapedContent = content.replace(/'/g, "''").replace(/\n/g, '\\n');

                    console.log(`✅ ${card.nameZh} (${isReversed ? '逆' : '正'}) -> ${content.split('\n')[0]}`);

                    // 為每個 position 生成一條 SQL
                    for (const pos of targetPositions) {
                        const sql = `INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation) VALUES (${card.id}, '${card.nameZh}', '${isReversed ? 'reversed' : 'upright'}', 'general_direction', '${pos}', '${escapedContent}') ON CONFLICT (card_id, orientation, scenario_key, position_key) DO UPDATE SET interpretation = EXCLUDED.interpretation;`;
                        sqlStatements.push(sql);
                    }
                }

                // Rate limit
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        const outputPath = path.join(this.outputDir, 'direction_oracle_data_v2.sql');
        fs.writeFileSync(outputPath, sqlStatements.join('\n'));
        console.log(`\n✨ 生成完成！SQL 已儲存至：${outputPath}`);
    }
}

// Run
const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
    console.error('Please set DEEPSEEK_API_KEY in .env');
    process.exit(1);
}
new DirectionGenerator(apiKey).generateAll();
