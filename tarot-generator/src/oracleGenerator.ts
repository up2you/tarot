/**
 * 通用神諭解讀生成器
 * 使用 DeepSeek API (OpenAI 相容格式) 為 15 個新 scenario 生成塔羅牌解讀
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

// 位置定義
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
];

// 15 個新 scenario
const SCENARIOS = [
    { key: 'general_search', nameZh: '尋物/尋人', description: '尋找遺失的物品、走失的寵物或失聯的人' },
    { key: 'general_travel', nameZh: '旅行/出行', description: '旅行規劃、出遊運勢、出行安全' },
    { key: 'general_legal', nameZh: '法律/訴訟', description: '官司訴訟、法律糾紛、合約問題' },
    { key: 'general_move', nameZh: '搬遷/遷移', description: '搬家、移民、居住環境變動' },
    { key: 'general_luck', nameZh: '運勢/時機', description: '整體運氣、時機判斷、吉凶預測' },
    { key: 'general_future', nameZh: '未來展望', description: '未來發展、前途走向、人生方向' },
    { key: 'general_decision', nameZh: '一般決策', description: '日常選擇、是非判斷、決定取捨' },
    { key: 'general_compete', nameZh: '比賽/競爭', description: '競賽結果、競爭對手、勝負判斷' },
    { key: 'general_spiritual', nameZh: '靈異/風水', description: '風水改運、靈性指引、能量調整' },
    { key: 'general_gamble', nameZh: '賭博/博弈', description: '賭運、投機、機率判斷（僅供娛樂）' },
    { key: 'general_vehicle', nameZh: '購車/買車', description: '購買車輛、換車時機、車輛運勢' },
    { key: 'general_gift', nameZh: '禮物/驚喜', description: '禮物選擇、驚喜安排、表達心意' },
    { key: 'general_contact', nameZh: '聯絡/等待', description: '等待消息、聯絡對方、音訊問題' },
    { key: 'general_weather', nameZh: '天氣/活動', description: '活動天氣、戶外運勢、時機選擇' },
    { key: 'general_contract', nameZh: '合作/契約', description: '簽約合作、商業協議、合同關係' },
];

interface GenerationConfig {
    apiKey: string;
    outputDir: string;
    rateLimitMs: number;
}

class OracleGenerator {
    private config: GenerationConfig;
    private progressFile: string;
    private totalGenerated = 0;
    private totalToGenerate = SCENARIOS.length * MAJOR_ARCANA.length * 2 * POSITIONS.length;

    constructor(config: GenerationConfig) {
        this.config = config;
        this.progressFile = path.join(config.outputDir, 'generation_progress.md');

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
                    { role: 'system', content: '你是一位專業的塔羅牌解讀師「艾瑟瑞爾」，語氣溫暖、智慧、具有神祕感。請用繁體中文回答。' },
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

        const data = await response.json();
        return data.choices[0]?.message?.content || '';
    }

    // 構建 AI prompt
    private buildPrompt(
        scenario: typeof SCENARIOS[0],
        card: typeof MAJOR_ARCANA[0],
        isReversed: boolean,
        position: typeof POSITIONS[0]
    ): string {
        const orientation = isReversed ? '逆位' : '正位';

        return `請為以下塔羅牌情境撰寫解讀：

場景：${scenario.nameZh}（${scenario.description}）
牌卡：${card.nameZh}（${card.name}）- ${orientation}
位置：${position.nameZh}

請撰寫約 200-250 字的解讀，包含：
1. 第一段：描述這張牌在此位置對問題的啟示
2. 第二段：解釋這種現象的原因或背景
3. 第三段：給予具體可行的建議

請直接輸出解讀內容，不要加標題或分段標記。`;
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
            console.error(`Error generating for ${scenario.key}/${card.nameZh}/${isReversed ? 'reversed' : 'upright'}/${position.key}:`, error);
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

        const content = `# 神諭資料生成進度追蹤

## 🚀 生成狀態：進行中

| 項目 | 數值 |
|------|------|
| 開始時間 | ${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })} |
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
- \`f:\\TL\\tarot-generator\\output\\general_scenarios\\\`

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

                    // Rate limiting - DeepSeek has generous limits
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
        console.log('🚀 開始生成 15 個通用神諭 scenario（使用 DeepSeek API）...\n');
        console.log(`總計需生成：${this.totalToGenerate} 筆資料\n`);

        const allSql: string[] = [];

        for (let i = 0; i < SCENARIOS.length; i++) {
            const sql = await this.generateScenario(i);
            allSql.push(...sql);
        }

        // 合併所有 SQL 到一個文件
        const combinedFile = path.join(this.config.outputDir, 'all_general_scenarios.sql');
        fs.writeFileSync(combinedFile, allSql.join('\n'));

        console.log('\n🎉 全部完成！');
        console.log(`所有 SQL 已合併到：${combinedFile}`);
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
        outputDir: path.join(__dirname, '..', 'output', 'general_scenarios'),
        rateLimitMs: 500, // DeepSeek 限制較寬鬆，使用 500ms 間隔
    };

    const generator = new OracleGenerator(config);
    await generator.generateAll();
}

main().catch(console.error);
