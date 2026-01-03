/**
 * DeepSeek Oracle Generator - 測試版
 * 只生成 10 條資料用於測試 API 連接
 */

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = 'sk-e6ea454451754c26aa989b61a80776f3';

// 測試用牌卡
const TEST_CARD = { id: 0, name: 'The Fool', nameZh: '愚者', keywords: '新開始、純真、冒險' };

// 測試用場景
const TEST_SCENARIOS = [
    { key: 'love_single', name: '單身求緣', desc: '單身者尋找戀愛對象' },
    { key: 'career_seeking', name: '求職', desc: '正在找工作' },
];

// 測試用位置
const TEST_POSITIONS = [
    { key: 'past', name: '過去', desc: '影響現況的過去因素' },
    { key: 'present', name: '現在', desc: '當前的狀態與能量' },
    { key: 'future', name: '未來', desc: '可能的發展方向' },
];

function buildPrompt(
    card: typeof TEST_CARD,
    orientation: 'upright' | 'reversed',
    scenario: typeof TEST_SCENARIOS[0],
    position: typeof TEST_POSITIONS[0]
): string {
    const orientationText = orientation === 'upright' ? '正位' : '逆位';

    return `你是專業塔羅牌占卜師，請為以下情境生成塔羅牌解釋。

【牌卡資訊】
- 牌名：${card.nameZh}（${card.name}）
- 方向：${orientationText}
- 牌義關鍵詞：${card.keywords}

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

請直接輸出解釋內容：`;
}

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
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
}

async function runTest() {
    console.log('🧪 DeepSeek API 測試\n');
    console.log('='.repeat(50));

    let success = 0;
    let failed = 0;

    for (const scenario of TEST_SCENARIOS) {
        for (const position of TEST_POSITIONS) {
            try {
                console.log(`\n📍 測試: ${TEST_CARD.nameZh} + ${scenario.name} + ${position.name}`);

                const prompt = buildPrompt(TEST_CARD, 'upright', scenario, position);
                const result = await callDeepSeek(prompt);

                console.log(`✅ 成功！回應長度: ${result.length} 字`);
                console.log(`📝 內容: ${result.substring(0, 100)}...`);

                success++;

                // 延遲避免限流
                await new Promise(r => setTimeout(r, 1000));

            } catch (error) {
                console.log(`❌ 失敗:`, error);
                failed++;
            }
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`🎯 測試結果: ${success} 成功, ${failed} 失敗`);

    if (success > 0) {
        console.log('\n✅ API 連接正常！可以執行完整生成。');
        console.log('執行指令: npx ts-node scripts/generateOracle.ts');
    } else {
        console.log('\n❌ API 連接失敗，請檢查 API Key。');
    }
}

runTest();
