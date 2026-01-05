import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 配置
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com';

if (!DEEPSEEK_API_KEY) {
    console.error('請在 .env 設定 DEEPSEEK_API_KEY');
    process.exit(1);
}



// 塔羅牌定義
const TAROT_CARDS = [
    { id: 0, name: '愚者' }, { id: 1, name: '魔術師' }, { id: 2, name: '女祭司' },
    { id: 3, name: '女皇' }, { id: 4, name: '皇帝' }, { id: 5, name: '教皇' },
    { id: 6, name: '戀人' }, { id: 7, name: '戰車' }, { id: 8, name: '力量' },
    { id: 9, name: '隱者' }, { id: 10, name: '命運之輪' }, { id: 11, name: '正義' },
    { id: 12, name: '吊人' }, { id: 13, name: '死神' }, { id: 14, name: '節制' },
    { id: 15, name: '惡魔' }, { id: 16, name: '高塔' }, { id: 17, name: '星星' },
    { id: 18, name: '月亮' }, { id: 19, name: '太陽' }, { id: 20, name: '審判' },
    { id: 21, name: '世界' }
];

// 目標場景：通用決策
const TARGET_SCENARIO = 'general_decision';

// 定義位置
const POSITIONS = [
    { key: 'single_card', name: '單張' },
    { key: 'past', name: '過去' },
    { key: 'present', name: '現在' },
    { key: 'future', name: '未來' }
];

// 延遲函數
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function callDeepSeek(prompt: string): Promise<string> {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                { role: "system", content: "你是一位神秘且充滿智慧的塔羅占卜師「艾瑟瑞爾」。" },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        })
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    const data: any = await response.json();
    return data.choices[0].message.content || '';
}

async function generateInterpretation(cardName: string, orientation: 'upright' | 'reversed', position: string) {
    const orientationText = orientation === 'upright' ? '正位' : '逆位';

    const prompt = `
請針對「${TARGET_SCENARIO}（一般決策/可不可能）」這個場景，為用戶抽取到的「${cardName} (${orientationText})」位於「${position}」提供解讀。

這類問題通常是：「這件事可不可能？」、「我能不能？」、「可以嗎？」。

請嚴格遵守以下輸出格式：

1. **核心啟示**：用一句話概括這張牌在決策中的核心意義。
2. **詳細解讀**：詳細說明這張牌對決策的影響。如果是正位，通常正面；如果是逆位，通常有阻礙或需要反思。
3. **【最終回答：XXX】**：這是最重要的部分。請務必在文末包含這個標籤。
   - 如果牌義傾向正面/可行，請寫【最終回答：肯定】
   - 如果牌義傾向負面/不可行，請寫【最終回答：否定】
   - 如果牌義模糊或取決於其他條件，請寫【最終回答：看情況】
   - 在標籤後，請附上一句簡短的總結建議（不超過 30 字）。

語氣要求：
- 神秘、優雅、富有同理心。
- 使用「汝」、「命運」、「星辰」等詞彙，但不要過度艱澀。
- 給予明確的指引，不要模稜兩可。

範例輸出：
核心啟示：命運之輪轉動，時機已然成熟。
詳細解讀：命運之輪正位代表著宇宙的能量正在推動著這件事向前發展...（省略）
【最終回答：肯定】順應時勢而為，這件事成功的機率極高。
`;

    try {
        return await callDeepSeek(prompt);
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

async function main() {
    const outputPath = path.join(fileURLToPath(import.meta.url), '../../output/decision_oracle_data.sql');
    const stream = fs.createWriteStream(outputPath, { flags: 'w', encoding: 'utf8' });

    console.log('開始生成決策神諭資料...');
    console.log(`目標檔案: ${outputPath}`);

    // 寫入 SQL Header
    stream.write(`-- Avatar Oracle Data for Scenario: ${TARGET_SCENARIO} (Decision)\n`);
    stream.write(`-- Generated at: ${new Date().toISOString()}\n\n`);

    let count = 0;
    const total = TAROT_CARDS.length * 2 * POSITIONS.length;

    for (const card of TAROT_CARDS) {
        for (const orientation of ['upright', 'reversed'] as const) {
            for (const position of POSITIONS) {
                console.log(`[${++count}/${total}] 生成: ${card.name} (${orientation}) - ${position.name}`);

                let interpretation = await generateInterpretation(card.name, orientation, position.name);

                // 簡單重試機制
                if (!interpretation) {
                    console.log('重試中...');
                    await delay(2000);
                    interpretation = await generateInterpretation(card.name, orientation, position.name);
                }

                if (interpretation) {
                    // 使用 Postgres Dollar Quoting ($STR$ ... $STR$) 避免引號脫逸問題
                    // 這是最安全的處理方式，即使內容包含單引號或換行也能正確匯入
                    const sql = `
INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (${card.id}, '${card.name}', '${orientation}', '${TARGET_SCENARIO}', '${position.key}', $STR$${interpretation}$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();
`;
                    stream.write(sql);
                }

                // 避免 Rate Limit
                await delay(500);
            }
        }
    }

    stream.end();
    console.log('生成完成！');
}

main().catch(console.error);
