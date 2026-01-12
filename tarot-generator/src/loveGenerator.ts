/**
 * Love Scenarios Oracle Generator
 * 為所有 love_* scenarios 生成包含 relation position 的完整解讀
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

// 11 個位置 - 包含 relation
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
    { key: 'relation', nameZh: '連結' }, // 新增！
];

// 11 個 love scenarios
const SCENARIOS = [
    { key: 'love_single', nameZh: '單身求緣', description: '單身者尋找戀愛對象', context: '渴望愛情、期待緣分、自我準備' },
    { key: 'love_crush', nameZh: '暗戀對象', description: '對某人有好感但未表白', context: '暗戀心情、表白時機、對方感受' },
    { key: 'love_pursuit', nameZh: '追求中', description: '正在追求心儀對象', context: '追求策略、對方回應、進展判斷' },
    { key: 'love_dating', nameZh: '熱戀期', description: '剛開始交往的甜蜜期', context: '感情升溫、相處磨合、未來發展' },
    { key: 'love_conflict', nameZh: '感情磨合', description: '感情中遇到摩擦或問題', context: '矛盾根源、溝通問題、關係修復' },
    { key: 'love_marriage', nameZh: '婚姻關係', description: '已婚或長期伴侶關係', context: '婚姻經營、夫妻相處、長期承諾' },
    { key: 'love_affair', nameZh: '第三者', description: '涉及第三者的感情問題', context: '三角關係、信任危機、選擇困境' },
    { key: 'love_cheating', nameZh: '外遇出軌', description: '懷疑背叛與三角關係', context: '背叛行為、信任破裂、關係修復或終止' },
    { key: 'love_breakup', nameZh: '分手', description: '面臨或剛經歷分手', context: '分手原因、情感療癒、放下過去' },
    { key: 'love_reunion', nameZh: '復合', description: '考慮與前任復合', context: '復合可能、過去問題、重新開始' },
    { key: 'love_feelings', nameZh: '對方心意', description: '想了解對方的真實想法', context: '對方態度、感情深淺、未來意向' },
];

interface GenerationConfig {
    apiKey: string;
    outputDir: string;
    rateLimitMs: number;
}

class LoveOracleGenerator {
    private config: GenerationConfig;
    private progressFile: string;
    private totalGenerated = 0;
    private totalToGenerate = SCENARIOS.length * MAJOR_ARCANA.length * 2 * POSITIONS.length;

    constructor(config: GenerationConfig) {
        this.config = config;
        this.progressFile = path.join(config.outputDir, 'love_generation_progress.md');

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
                    { role: 'system', content: '你是專業塔羅師「艾瑟瑞爾」，專精感情諮詢。語氣溫暖、富同理心、充滿智慧。用繁體中文，聚焦於情感連結、關係動態與溝通改善。' },
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
        scenario: typeof SCENARIOS[0],
        card: typeof MAJOR_ARCANA[0],
        isReversed: boolean,
        position: typeof POSITIONS[0]
    ): string {
        const orientation = isReversed ? '逆位' : '正位';

        return `請為以下感情塔羅情境撰寫解讀：

【情境】：${scenario.nameZh}（${scenario.description}）
【背景】：${scenario.context}
【牌卡】：${card.nameZh}（${card.name}）- ${orientation}
【位置】：${position.nameZh}

請撰寫約 200-250 字的解讀，包含：
1. 第一段：這張牌在此位置對感情的啟示
2. 第二段：這種關係模式的深層原因
3. 第三段：具體可操作的改善建議

語氣要求：溫暖、富同理心、實用的溝通建議。
請直接輸出解讀內容，不要加標題。`;
    }

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

    private updateProgress(scenarioIndex: number, completed: number) {
        const percent = Math.round((this.totalGenerated / this.totalToGenerate) * 100);
        const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

        const scenarioStatus = SCENARIOS.map((s, i) => {
            if (i < scenarioIndex) return `| ${i + 1} | ${s.key} | ✅ 完成 | 484/484 |`;
            if (i === scenarioIndex) return `| ${i + 1} | ${s.key} | 🔄 進行中 | ${completed}/484 |`;
            return `| ${i + 1} | ${s.key} | ⏳ 等待中 | 0/484 |`;
        }).join('\n');

        const content = `# Love Scenarios 資料生成進度

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

\`f:\\TL\\tarot-generator\\output\\love_scenarios\\\`

---

## 🔄 最後更新

${now}
`;

        fs.writeFileSync(this.progressFile, content);
    }

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
                    this.updateProgress(scenarioIndex, completed);

                    await this.delay(this.config.rateLimitMs);

                    if (completed % 10 === 0) {
                        console.log(`  ${scenario.key}: ${completed}/484 (${Math.round(completed / 484 * 100)}%)`);
                    }
                }
            }
        }

        const outputFile = path.join(this.config.outputDir, `${scenario.key}.sql`);
        fs.writeFileSync(outputFile, sqlStatements.join('\n'));
        console.log(`✅ ${scenario.key} 完成！已保存到 ${outputFile}`);

        return sqlStatements;
    }

    async generateAll(): Promise<void> {
        console.log('🚀 開始生成 11 個 Love scenarios（包含 relation position）...\n');
        console.log(`總計需生成：${this.totalToGenerate} 筆資料\n`);
        console.log('💡 預估時間：約 60-90 分鐘\n');

        const allSql: string[] = [];

        for (let i = 0; i < SCENARIOS.length; i++) {
            const sql = await this.generateScenario(i);
            allSql.push(...sql);
        }

        const combinedFile = path.join(this.config.outputDir, 'all_love_scenarios.sql');
        fs.writeFileSync(combinedFile, allSql.join('\n'));

        console.log('\n🎉 全部完成！');
        console.log(`所有 SQL 已合併到：${combinedFile}`);
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
        outputDir: path.join(__dirname, '..', 'output', 'love_scenarios'),
        rateLimitMs: 500,
    };

    const generator = new LoveOracleGenerator(config);
    await generator.generateAll();
}

main().catch(console.error);
