/**
 * Money Fortune Generator
 * 生成財富運勢（money_fortune）scenario 的完整解讀資料
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

// 11 個位置
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
    { key: 'hope_fear', nameZh: '希望與恐懼' },
    { key: 'relation', nameZh: '連結' },
];

interface GenerationConfig {
    apiKey: string;
    outputDir: string;
    rateLimitMs: number;
}

class MoneyFortuneGenerator {
    private config: GenerationConfig;
    private progressFile: string;
    private totalGenerated = 0;
    private totalToGenerate = MAJOR_ARCANA.length * 2 * POSITIONS.length; // 484

    constructor(config: GenerationConfig) {
        this.config = config;
        this.progressFile = path.join(config.outputDir, 'money_fortune_progress.md');

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
                    {
                        role: 'system',
                        content: '你是專業塔羅師「艾瑟瑞爾」，專精財富諮詢。語氣溫暖、務實、充滿希望。用繁體中文，聚焦於整體財富運勢、賺錢機會與豐盛能量。用詞使用「財富」「財運」「豐盛」「機會」，避免「理財」「規劃」「預算」等管理性詞彙。'
                    },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.8,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data: any = await response.json();
        return data.choices[0]?.message?.content || '';
    }

    private buildPrompt(
        card: typeof MAJOR_ARCANA[0],
        isReversed: boolean,
        position: typeof POSITIONS[0]
    ): string {
        const orientation = isReversed ? '逆位' : '正位';

        return `請為以下財富運勢塔羅情境撰寫解讀：

【情境】：財富運勢（整體財富狀況與趨勢）
【牌卡】：${card.nameZh}（${card.name}）- ${orientation}
【位置】：${position.nameZh}

請撰寫約 200-250 字的解讀，包含：
1. 第一段：這張牌對整體財富運勢的啟示
2. 第二段：賺錢機會、財源開展的可能性
3. 第三段：如何培養豐盛意識，吸引財富

語氣要求：溫暖、務實、充滿希望與可能性。
重點：整體財富能量、賺錢機會、豐盛顯化，而非理財策略或預算管理。
請直接輸出解讀內容，不要加標題。`;
    }

    private async generateInterpretation(
        card: typeof MAJOR_ARCANA[0],
        isReversed: boolean,
        position: typeof POSITIONS[0]
    ): Promise<string> {
        const prompt = this.buildPrompt(card, isReversed, position);

        try {
            return await this.callDeepSeek(prompt);
        } catch (error) {
            console.error(`❌ 生成失敗 ${card.nameZh}/${isReversed ? '逆位' : '正位'}/${position.key}:`, error);
            return '';
        }
    }

    private updateProgress(completed: number) {
        const percent = Math.round((this.totalGenerated / this.totalToGenerate) * 100);
        const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

        const content = `# Money Fortune 資料生成進度

## 🚀 生成狀態：進行中

| 項目 | 數值 |
|------|------|
| 開始時間 | ${now} |
| 總筆數 | ${this.totalToGenerate} |
| 已完成 | ${this.totalGenerated} |
| 進度 | ${percent}% |

---

## 📊 詳細進度

已生成 ${this.totalGenerated} / ${this.totalToGenerate} 筆

預估剩餘時間：約 ${Math.round((this.totalToGenerate - this.totalGenerated) * 0.5 / 60)} 分鐘

---

## 🔄 最後更新

${now}
`;

        fs.writeFileSync(this.progressFile, content);
    }

    async generateAll(): Promise<void> {
        console.log('🚀 開始生成 Money Fortune scenario 資料...\n');
        console.log(`總計需生成：${this.totalToGenerate} 筆資料\n`);
        console.log('💡 預估時間：約 40-50 分鐘\n');

        const sqlStatements: string[] = [];

        for (const card of MAJOR_ARCANA) {
            for (const isReversed of [false, true]) {
                for (const position of POSITIONS) {
                    const interpretation = await this.generateInterpretation(card, isReversed, position);

                    if (interpretation) {
                        const escapedText = interpretation.replace(/'/g, "''").replace(/\n/g, '\\n');
                        const sql = `INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation) VALUES (${card.id}, '${card.nameZh}', '${isReversed ? 'reversed' : 'upright'}', 'money_fortune', '${position.key}', '${escapedText}');`;
                        sqlStatements.push(sql);
                    }

                    this.totalGenerated++;
                    this.updateProgress(this.totalGenerated);

                    await this.delay(this.config.rateLimitMs);

                    if (this.totalGenerated % 10 === 0) {
                        console.log(`  已完成: ${this.totalGenerated}/${this.totalToGenerate} (${Math.round(this.totalGenerated / this.totalToGenerate * 100)}%)`);
                    }
                }
            }
        }

        const outputFile = path.join(this.config.outputDir, 'money_fortune.sql');
        fs.writeFileSync(outputFile, sqlStatements.join('\n'));

        console.log('\n🎉 全部完成！');
        console.log(`已保存到：${outputFile}`);
        console.log(`總計生成：${this.totalGenerated} 筆解讀`);
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

async function main() {
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
        console.error('❌ 請設定 DEEPSEEK_API_KEY 環境變數');
        process.exit(1);
    }

    console.log('✅ 已找到 DeepSeek API Key');

    const config: GenerationConfig = {
        apiKey,
        outputDir: path.join(__dirname, '..', 'output', 'money_scenarios'),
        rateLimitMs: 500,
    };

    const generator = new MoneyFortuneGenerator(config);
    await generator.generateAll();
}

main().catch(console.error);
