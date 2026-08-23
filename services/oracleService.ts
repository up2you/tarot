/**
 * Oracle Service - 神諭解釋服務
 * 用於免費用戶的預存解釋查詢和組合
 */

import { supabase } from './supabaseClient';
import { ORACLE_SCENARIOS } from '../constants/oracleScenarios';
import { ORACLE_POSITIONS, getPositionByKey } from '../constants/oraclePositions';
import { CardReading } from '../types';

// ============================================
// 類型定義
// ============================================

export interface OracleInterpretation {
    id: string;
    card_id: number;
    card_name: string;
    orientation: 'upright' | 'reversed';
    scenario_key: string;
    position_key: string;
    interpretation: string;
    language: string;
}

export interface CardRelationship {
    id: string;
    card_a_id: number;
    card_b_id: number;
    relationship_type: string;
    description: string;
    language: string;
}

export interface ReadingSummary {
    id: string;
    pattern_key: string;
    summary: string;
    language: string;
}

// ============================================
// 解釋查詢
// ============================================

const FALLBACK_SCENARIOS: Record<string, string> = {
    // 豐收類 Fallback
    'harvest_farming': 'money_business',
    'harvest_fishery': 'money_business',
    'harvest_forestry': 'money_business',
    'harvest_livestock': 'money_business',
    'harvest_garden': 'general_luck',

    // 博弈類 Fallback
    'gamble_lottery': 'money_windfall',
    'gamble_card': 'money_luck',
    'gamble_sport': 'money_luck',
    'gamble_casino': 'money_luck',
    'gamble_luck': 'money_luck',

    // 健康類 Fallback
    'health_gender': 'health_pregnancy',

    // 感情類 Fallback
    'love_cheating': 'love_affair', // 使用「第三者」的解釋

    // 事業類 Fallback
    'career_bidding': 'career_seeking', // 使用「求職/面試」的評估解釋
};

/**
 * 取得單牌解釋（支援多語言 fallback：找不到目標語言時自動降級到 zh-TW）
 */
export const getOracleInterpretation = async (
    cardId: number,
    isReversed: boolean,
    scenarioKey: string,
    positionKey: string,
    language: string = 'zh-TW'
): Promise<string | null> => {
    try {
        const orientation = isReversed ? 'reversed' : 'upright';

        // 建立語言 fallback 鏈：目標語言 → zh-TW
        const langChain = language === 'zh-TW' ? ['zh-TW'] : [language, 'zh-TW'];

        const tryFetch = async (key: string, lang: string) => {
            const { data, error } = await supabase
                .from('oracle_interpretations')
                .select('interpretation')
                .eq('card_id', cardId)
                .eq('orientation', orientation)
                .eq('scenario_key', key)
                .eq('position_key', positionKey)
                .eq('language', lang)
                .maybeSingle();

            if (error) return null;
            return data?.interpretation || null;
        };

        // 嘗試所有場景 key + 所有語言
        const scenarioKeys = [scenarioKey];
        const fallbackKey = FALLBACK_SCENARIOS[scenarioKey];
        if (fallbackKey) scenarioKeys.push(fallbackKey);
        if (scenarioKey !== 'general_luck' && fallbackKey !== 'general_luck') {
            scenarioKeys.push('general_luck');
        }

        for (const lang of langChain) {
            for (const sKey of scenarioKeys) {
                const text = await tryFetch(sKey, lang);
                if (text) return text;
            }

            // Yearly spread fallback: try 'monthly' position with same scenario
            if (scenarioKey === 'yearly') {
                const { data, error } = await supabase
                    .from('oracle_interpretations')
                    .select('interpretation')
                    .eq('card_id', cardId)
                    .eq('orientation', orientation)
                    .eq('scenario_key', 'yearly')
                    .eq('position_key', 'monthly')
                    .eq('language', lang)
                    .maybeSingle();
                if (!error && data?.interpretation) return data.interpretation;
            }
        }

        return null;
    } catch (err) {
        console.error('[OracleService] getInterpretation error:', err);
        return null;
    }
};

// ============================================
// 🎭 東方智慧詮釋查詢（雙透鏡混合模式資料庫部分）
// ============================================

export interface EasternInterpretation {
    id: string;
    card_id: number;
    card_name: string;
    orientation: 'upright' | 'reversed';
    interpretation: string;
    language: string;
}

/**
 * 取得單張牌的東方智慧詮釋（支援多語言 fallback → zh-TW）
 * 若資料庫無此語言，自動降級到 zh-TW
 */
export const getEasternInterpretation = async (
    cardId: number,
    isReversed: boolean,
    language: string = 'zh-TW',
    scenarioKey?: string,
    positionKey?: string
): Promise<string | null> => {
    try {
        const orientation = isReversed ? 'reversed' : 'upright';
        const langChain = language === 'zh-TW' ? ['zh-TW'] : [language, 'zh-TW'];

        for (const lang of langChain) {
            // 1. 精確情境化查詢（若提供 scenario/position）
            if (scenarioKey && positionKey) {
                const { data, error } = await supabase
                    .from('eastern_interpretations')
                    .select('interpretation')
                    .eq('card_id', cardId)
                    .eq('orientation', orientation)
                    .eq('scenario_key', scenarioKey)
                    .eq('position_key', positionKey)
                    .eq('language', lang)
                    .maybeSingle();
                if (!error && data?.interpretation) return data.interpretation;
            }

            // 2. 情境化查詢但位置彈性（部分情境位置不同）
            if (scenarioKey) {
                const { data, error } = await supabase
                    .from('eastern_interpretations')
                    .select('interpretation')
                    .eq('card_id', cardId)
                    .eq('orientation', orientation)
                    .eq('scenario_key', scenarioKey)
                    .eq('language', lang)
                    .limit(1)
                    .maybeSingle();
                if (!error && data?.interpretation) return data.interpretation;
            }

            // 3. fallback：泛用詮釋（scenario_key 為 NULL）
            const { data, error } = await supabase
                .from('eastern_interpretations')
                .select('interpretation')
                .eq('card_id', cardId)
                .eq('orientation', orientation)
                .is('scenario_key', null)
                .eq('language', lang)
                .maybeSingle();
            if (!error && data?.interpretation) return data.interpretation;
        }
        return null;
    } catch (err) {
        console.error('[OracleService] getEasternInterpretation error:', err);
        return null;
    }
};

/**
 * 批量取得多張牌的東方智慧詮釋（情境化）
 * 返回 Map<cardId-orientation, text>
 */
export const getBatchEasternInterpretations = async (
    cards: { cardId: number; isReversed: boolean }[],
    language: string = 'zh-TW',
    scenarioKey?: string,
    positionKeys?: string[]
): Promise<Map<string, string>> => {
    const results = new Map<string, string>();
    try {
        await Promise.all(cards.map(async (card, idx) => {
            const posKey = positionKeys?.[idx];
            const text = await getEasternInterpretation(
                card.cardId, card.isReversed, language,
                scenarioKey, posKey
            );
            if (text) results.set(`${card.cardId}-${card.isReversed ? 'r' : 'u'}`, text);
        }));
    } catch (err) {
        console.error('[OracleService] getBatchEasternInterpretations error:', err);
    }
    return results;
};

/**
 * 組合東方智慧視角的完整解讀（資料庫部分）
 * 格式與 formatOracleReading 類似，但用東方詮釋
 */
export const formatEasternReading = (
    cards: (CardReading & { aiImage?: string })[],
    interpretations: Map<string, string>,
    positions: string[]
): string => {
    let text = `## ☯️ 東方智慧視角\n\n`;

    cards.forEach((card, idx) => {
        const interp = interpretations.get(`${card.card.id}-${card.isReversed ? 'r' : 'u'}`);
        const reversedTag = card.isReversed ? '（逆位）' : '（正位）';
        text += `### ${positions[idx] || card.position}：${card.card.nameZh} ${reversedTag}\n\n`;
        text += (interp || '此刻的能量正在流動中，靜觀其變。') + '\n\n';
        if (idx < cards.length - 1) text += '---\n\n';
    });

    return text;
};

/**
 * 批量取得多張牌的解釋
 */
export const getBatchInterpretations = async (
    cards: { cardId: number; isReversed: boolean; positionKey: string }[],
    scenarioKey: string,
    language: string = 'zh-TW'
): Promise<Map<string, string>> => {
    const results = new Map<string, string>();
    const langChain = language === 'zh-TW' ? ['zh-TW'] : [language, 'zh-TW'];

    try {
        // 批量查詢（先試目標語言，失敗 fallback zh-TW）
        for (const lang of langChain) {
            for (const card of cards) {
                const mapKey = `${card.cardId}_${card.isReversed ? 'rev' : 'up'}_${card.positionKey}`;
                if (results.has(mapKey)) continue; // 已有結果跳過

                const { data, error } = await supabase
                    .from('oracle_interpretations')
                    .select('interpretation, position_key')
                    .eq('card_id', card.cardId)
                    .eq('orientation', card.isReversed ? 'reversed' : 'upright')
                    .eq('scenario_key', scenarioKey)
                    .eq('position_key', card.positionKey)
                    .eq('language', lang)
                    .maybeSingle();

                if (!error && data) {
                    results.set(mapKey, data.interpretation);
                }
            }
        }

        return results;
    } catch (err) {
        console.error('[OracleService] getBatchInterpretations error:', err);
        return results;
    }
};

// ============================================
// 雙牌關係查詢
// ============================================

/**
 * 取得兩張牌的關係描述
 */
export const getCardRelationship = async (
    cardAId: number,
    cardBId: number,
    language: string = 'zh-TW'
): Promise<string | null> => {
    try {
        // 確保順序一致（較小 ID 在前）
        const [first, second] = cardAId < cardBId
            ? [cardAId, cardBId]
            : [cardBId, cardAId];

        const langChain = language === 'zh-TW' ? ['zh-TW'] : [language, 'zh-TW'];

        for (const lang of langChain) {
            const { data, error } = await supabase
                .from('oracle_relationships')
                .select('description')
                .eq('card_a_id', first)
                .eq('card_b_id', second)
                .eq('language', lang)
                .maybeSingle();

            if (!error && data?.description) {
                return data.description;
            }
        }

        return null;
    } catch (err) {
        console.error('[OracleService] getCardRelationship error:', err);
        return null;
    }
};

// ============================================
// 總結模板
// ============================================

/**
 * 根據牌陣模式取得總結
 */
export const getReadingSummary = async (
    patternKey: string,
    language: string = 'zh-TW'
): Promise<string | null> => {
    try {
        const langChain = language === 'zh-TW' ? ['zh-TW'] : [language, 'zh-TW'];

        for (const lang of langChain) {
            const { data, error } = await supabase
                .from('oracle_summaries')
                .select('summary')
                .eq('pattern_key', patternKey)
                .eq('language', lang)
                .maybeSingle();

            if (!error && data?.summary) {
                return data.summary;
            }
        }

        return null;
    } catch (err) {
        console.error('[OracleService] getReadingSummary error:', err);
        return null;
    }
};

/**
 * 分析牌陣模式
 */
export const analyzePattern = (
    cards: { isReversed: boolean; positionKey: string }[]
): string => {
    const reversedCount = cards.filter(c => c.isReversed).length;
    const uprightCount = cards.length - reversedCount;

    if (reversedCount === 0) return 'all_upright';
    if (uprightCount === 0) return 'all_reversed';
    if (reversedCount === 1) return 'one_reversed';
    if (uprightCount === 1) return 'one_upright';
    return 'mixed';
};

// ============================================
// 完整占卜生成
// ============================================

/**
 * 生成完整的免費版占卜解釋
 */
export const generateFreeReading = async (
    cards: { cardId: number; cardName: string; isReversed: boolean; positionKey: string }[],
    scenarioKey: string,
    language: string = 'zh-TW'
): Promise<{
    interpretations: { position: string; text: string }[];
    relationships: string[];
    summary: string;
}> => {
    const result = {
        interpretations: [] as { position: string; text: string }[],
        relationships: [] as string[],
        summary: '',
    };

    try {
        // 1. 取得每張牌的解釋
        for (const card of cards) {
            const text = await getOracleInterpretation(
                card.cardId,
                card.isReversed,
                scenarioKey,
                card.positionKey,
                language
            );

            const position = getPositionByKey(card.positionKey);
            const posName = language === 'en' ? (position?.nameEn || card.positionKey)
                          : language === 'zh-CN' ? (position?.key === 'past' ? '过去' : position?.key === 'present' ? '现在' : position?.key === 'future' ? '未来' : position?.nameZh)
                          : (position?.nameZh || card.positionKey);

            result.interpretations.push({
                position: posName || card.positionKey,
                text: text || `${card.cardName} (${card.isReversed ? 'Reversed' : 'Upright'})`,
            });
        }

        // 2. 取得牌卡關係
        for (let i = 0; i < cards.length - 1; i++) {
            const relationship = await getCardRelationship(cards[i].cardId, cards[i + 1].cardId, language);
            if (relationship) {
                result.relationships.push(relationship);
            }
        }

        // 3. 取得總結
        if (scenarioKey === 'general_direction') {
            // 方位指引專用總結邏輯：優先採用「未來/Future」或「單張/Single」的建議
            const futureCard = result.interpretations.find(i => i.position === '未來' || i.position === '單張');
            const presentCard = result.interpretations.find(i => i.position === '現在');

            let direction = '';
            // 嘗試從文本中提取【方位：XXX】
            const extractDirection = (text: string) => {
                const match = text.match(/【方位：(.+?)】/);
                return match ? match[1] : null;
            };

            const futureDir = futureCard ? extractDirection(futureCard.text) : null;
            const presentDir = presentCard ? extractDirection(presentCard.text) : null;

            if (futureDir) {
                result.summary = `# 艾瑟瑞爾的最終神諭：${futureDir}\n\n根據牌陣流動，雖然過程中有變數，但最終指引明確指向「${futureDir}」。相信未來的召喚，這是你靈魂真正渴望的方向。`;
            } else if (presentDir) {
                result.summary = `# 艾瑟瑞爾的最終神諭：${presentDir}\n\n當下最重要的是「${presentDir}」。把握現在的動能，這一步將決定後續的發展。`;
            } else {
                // 依然使用各種 Pattern 分析作為備案
                const patternKey = analyzePattern(cards);
                const summary = await getReadingSummary(patternKey, language);
                result.summary = summary || '這個牌陣揭示了方向的線索，請靜心感受牌面指出的道路。';
            }
        } else if (scenarioKey === 'general_decision') {
            // 決策指引專用總結邏輯
            const mainCard = result.interpretations.find(i => i.position === '未來' || i.position === '單張' || i.position === '結果');

            // 嘗試提取【最終回答：XXX】
            const extractAnswer = (text: string) => {
                const match = text.match(/【最終回答：(.+?)】/);
                // 移除可能的額外說明，只取冒號後的關鍵字
                if (match) {
                    return match[1].split('】')[0];
                }
                return null;
            };

            const answer = mainCard ? extractAnswer(mainCard.text) : null;

            if (answer && mainCard) { // 確保有找到答案
                // 提取建議部分 (如果在標籤後有文字)
                const textParts = mainCard.text.split(/【最終回答：.+?】/);
                const adviceRaw = textParts.length > 1 ? textParts[1].trim() : '';
                // 如果後續沒有建議，就使用預設引言
                const finalAdvice = adviceRaw || '根據牌面的指引，命運的方向已經顯現。';

                result.summary = `# 艾瑟瑞爾的最終回答：${answer}\n\n${finalAdvice}`;
            } else {
                const patternKey = analyzePattern(cards);
                const summary = await getReadingSummary(patternKey, language);
                result.summary = summary || '這個決定需要更深層的直覺，請靜心感受牌面傳遞的微妙平衡。';
            }
        } else if (scenarioKey === 'house_rent') {
            // 租屋指引專用總結邏輯
            const mainCard = result.interpretations.find(i => i.position === '未來' || i.position === '單張' || i.position === '現在');

            const extractAdvice = (text: string) => {
                const match = text.match(/【建議：(.+?)】/);
                return match ? match[1] : null;
            };

            const advice = mainCard ? extractAdvice(mainCard.text) : null;

            if (advice) {
                result.summary = `# 艾瑟瑞爾的最終神諭：${advice}\n\n綜合牌面能量，針對這間房子的最終建議是「${advice}」。請相信你的直覺與這份指引，做出最適合當下的選擇。`;
            } else {
                const patternKey = analyzePattern(cards);
                const summary = await getReadingSummary(patternKey, language);
                result.summary = summary || '這間房子有其獨特的氣場，請細讀牌面訊息，感受它是否與你的頻率共振。';
            }
        } else if (scenarioKey.startsWith('love_') || scenarioKey.startsWith('relation_')) {
            // 愛情與關係專用動態總結
            const pastCard = cards.find(c => c.positionKey === 'past');
            const presentCard = cards.find(c => c.positionKey === 'present');
            const futureCard = cards.find(c => c.positionKey === 'future' || c.positionKey === 'outcome');
            const otherCard = cards.find(c => c.positionKey === 'other'); // 對方
            const selfCard = cards.find(c => c.positionKey === 'self'); // 自己
            const relationCard = cards.find(c => c.positionKey === 'relation'); // 連結

            // 針對「提問魂印」等只有 self/other/relation 的牌陣
            if (selfCard && otherCard && relationCard && !presentCard && !futureCard) {
                const getMsg = (pos: string) => {
                    const interpret = result.interpretations.find(i => i.position === (getPositionByKey(pos)?.nameZh || pos));
                    if (!interpret?.text) return '';
                    // 取第一段，並移除常見開頭以利句子銜接
                    let text = interpret.text.split('\n\n')[0]
                        .replace(/^(在你們的關係中，|在感情上，|關於這段關係，|親愛的，|這張牌|當|從)/, '');
                    // 智能截斷：如果超過200字，在最後一個句號處截斷
                    if (text.length > 200) {
                        const sentences = text.substring(0, 200).split('。');
                        sentences.pop(); // 移除最後一個不完整的句子
                        text = sentences.join('。') + (sentences.length > 0 ? '。' : '');
                    }
                    return text;
                };

                const selfMsg = getMsg('self');
                const otherMsg = getMsg('other');
                const relationMsg = getMsg('relation');

                let narrative = '';
                narrative += `在這段關係中，你（**${selfCard.cardName}**）${selfMsg}\n\n`;
                narrative += `對方（**${otherCard.cardName}**）${otherMsg}\n\n`;
                narrative += `而你們的連結（**${relationCard.cardName}**）${relationMsg}\n\n`;
                narrative += `請相信直覺，答案已在心中。`;

                result.summary = `# 艾瑟瑞爾的愛之神諭\n\n${narrative}`;
            } else if (presentCard && futureCard) {
                const getMsg = (pos: string) => {
                    const interpret = result.interpretations.find(i => i.position === (getPositionByKey(pos)?.nameZh || pos));
                    if (!interpret?.text) return '';
                    // 取第一段，並移除常見開頭以利句子銜接
                    let text = interpret.text.split('\n')[0]
                        .replace(/^(在你們的關係中，|在感情上，|關於這段關係，)/, '');
                    // 智能截斷：如果超過200字，在最後一個句號處截斷
                    if (text.length > 200) {
                        const sentences = text.substring(0, 200).split('。');
                        sentences.pop(); // 移除最後一個不完整的句子
                        text = sentences.join('。') + (sentences.length > 0 ? '。' : '');
                    }
                    return text;
                };

                const presentMsg = getMsg(presentCard.positionKey);
                const futureMsg = getMsg(futureCard.positionKey);
                const pastMsg = pastCard ? getMsg(pastCard.positionKey) : '';

                let narrative = '';

                // 構建敘事邏輯
                if (pastCard && pastMsg) {
                    narrative += `雖然目前**${presentCard.cardName}**顯示${presentMsg}，但請不要忽略過去**${pastCard.cardName}**所留下的影響：${pastMsg}。\n\n`;
                    narrative += `未來的關鍵在於**${futureCard.cardName}**：${futureMsg}`;
                } else {
                    // 沒有過去牌的情況 (例如只有單張或兩張牌)
                    narrative += `目前**${presentCard.cardName}**的能量顯示${presentMsg}。\n\n`;
                    narrative += `而未來的走向，**${futureCard.cardName}**指引著：${futureMsg}`;
                }

                // 如果有「對方」的牌，加入補充
                if (otherCard) {
                    const otherMsg = getMsg(otherCard.positionKey);
                    if (otherMsg) {
                        narrative += `\n\n同時，值得留意的是對方（${otherCard.cardName}）的狀態：${otherMsg}`;
                    }
                }

                narrative += `\n\n這段關係的走向，關鍵在於誠實面對彼此的內心，愛會在真實中綻放。`;

                result.summary = `# 艾瑟瑞爾的愛之神諭\n\n${narrative}`;
            } else if (scenarioKey.startsWith('love_')) {
                // 愛情場景但沒有標準位置的fallback
                const mainCard = selfCard || otherCard || relationCard || cards[0];
                if (mainCard) {
                    result.summary = `# 艾瑟瑞爾的愛之神諭\n\n在這段關係中，**${mainCard.cardName}**為你帶來重要的訊息。請細心感受牌面的指引，愛的答案就在你心中。`;
                } else {
                    result.summary = `# 艾瑟瑞爾的愛之神諭\n\n請相信直覺，答案已在心中。`;
                }
            } else if (scenarioKey.startsWith('relation_')) {
                // relation scenarios 專用邏輯（FAMILY_HARMONY等牌陣）
                const selfCard = cards.find(c => c.positionKey === 'self');
                const relationCard = cards.find(c => c.positionKey === 'relation');
                const adviceCard = cards.find(c => c.positionKey === 'advice');

                // 提取每張牌的第一段核心訊息
                const getCoreMeaning = (pos: string) => {
                    const interpret = result.interpretations.find(i => i.position === (getPositionByKey(pos)?.nameZh || pos));
                    if (!interpret?.text) return '';
                    const firstParagraph = interpret.text.split('\n\n')[0];
                    const sentences = firstParagraph.split('。');
                    let text = sentences[1] || sentences[0] || '';
                    // 智能截斷：如果超過150字，取前面完整的句子
                    if (text.length > 150) {
                        const subSentences = text.substring(0, 150).split('。');
                        subSentences.pop(); // 移除最後一個不完整的句子
                        text = subSentences.join('。') + (subSentences.length > 0 ? '。' : '');
                    }
                    return text;
                };

                let relationshipTitle = '關係';
                if (scenarioKey === 'relation_family') relationshipTitle = '家庭';
                else if (scenarioKey === 'relation_friend') relationshipTitle = '友誼';
                else if (scenarioKey === 'relation_colleague') relationshipTitle = '職場人際';
                else if (scenarioKey === 'relation_client') relationshipTitle = '客戶關係';
                else if (scenarioKey === 'relation_neighbor') relationshipTitle = '鄰里';
                else if (scenarioKey === 'relation_elder') relationshipTitle = '長輩相處';
                else if (scenarioKey === 'relation_rival') relationshipTitle = '競爭關係';

                let summary = `# 艾瑟瑞爾的${relationshipTitle}神諭\n\n`;

                if (selfCard && relationCard && adviceCard) {
                    const selfMsg = getCoreMeaning('self');
                    const relationMsg = getCoreMeaning('relation');
                    const adviceMsg = getCoreMeaning('advice');

                    summary += `在這段關係中，**${selfCard.cardName}**顯示${selfMsg}\n\n`;
                    summary += `連結的核心（**${relationCard.cardName}**）告訴我們${relationMsg}\n\n`;
                    summary += `艾瑟瑞爾建議（**${adviceCard.cardName}**）${adviceMsg}\n\n`;
                    summary += `請記得，所有關係都需要雙方的理解與努力。帶著開放的心與勇氣去溝通，和諧將在真誠中萌芽。`;
                } else {
                    // Fallback: 使用主牌
                    const mainCard = selfCard || relationCard || adviceCard || cards[0];
                    if (mainCard) {
                        const mainMsg = getCoreMeaning(mainCard.positionKey);
                        summary += `**${mainCard.cardName}**揭示${mainMsg}\n\n`;
                        summary += `牌面傳遞了重要的關係訊息，請細心感受，答案就在彼此的理解之中。`;
                    } else {
                        summary += `牌面揭示了重要的關係訊息，請細心感受每張牌傳遞的智慧，答案就在彼此的理解之中。`;
                    }
                }

                result.summary = summary;
            } else {
                // 缺少關鍵牌位時的備案
                const mainCard = result.interpretations.find(i => i.position === '未來' || i.position === '結果' || i.position === '單張');
                const cleanText = mainCard?.text?.split('\n')[0] || '';
                result.summary = `# 艾瑟瑞爾的愛之神諭\n\n${cleanText}...\n\n請相信直覺，答案已在心中。`;
            }
        } else if (
            scenarioKey.startsWith('career_') ||
            scenarioKey.startsWith('money_') ||
            scenarioKey.startsWith('study_') ||
            scenarioKey.startsWith('health_')
        ) {
            // 其他主要人生場景
            // 其他主要人生場景
            const patternKey = analyzePattern(cards);
            // 優先嘗試取得「場景專用」的總結 (例如 career_seeking_all_upright, health_gender_all_upright)
            const specificSummaryKey = `${scenarioKey}_${patternKey}`;
            let summary = await getReadingSummary(specificSummaryKey, language);

            if (summary && summary.trim()) {
                result.summary = summary;
            } else {
                // 如果沒有專用總結，才退回到使用「主牌解釋」作為總結
                const mainCard = result.interpretations.find(i => i.position === '未來' || i.position === '結果' || i.position === '單張');

                if (mainCard && mainCard.text) {
                    const cleanText = mainCard.text.split('\n')[0].substring(0, 100);
                    let title = '艾瑟瑞爾的神諭';
                    let closing = '這段旅程的指引已經顯現，請相信內心的力量。';

                    if (scenarioKey.startsWith('career_')) {
                        title = '艾瑟瑞爾的事業神諭';
                        closing = '職涯的道路雖有起伏，但每一步都是積累。把握當下的動能，你的價值終將閃耀。';
                    } else if (scenarioKey.startsWith('money_')) {
                        title = '艾瑟瑞爾的財富神諭';
                        closing = '豐盛的能量正在流動，請保持理智與耐心，財富將隨智慧而來。';
                    }

                    result.summary = `# ${title}\n\n${cleanText}...\n\n${closing}`;
                } else {
                    // 如果連主牌解釋都沒有，使用通用 Pattern 總結
                    summary = await getReadingSummary(patternKey, language);
                    result.summary = (summary && summary.trim()) ? summary : '命運的星圖錯綜複雜，請相信此刻的際遇都有其深意。';
                }
            }
        } else {
            // 其他一般場景使用預設總結
            const patternKey = analyzePattern(cards);
            // 同樣嘗試取得場景專用總結
            const specificSummaryKey = `${scenarioKey}_${patternKey}`;
            let summary = await getReadingSummary(specificSummaryKey, language);

            if (!summary) {
                summary = await getReadingSummary(patternKey, language);
            }
            result.summary = (summary && summary.trim()) ? summary : '這個牌陣揭示了重要的訊息，請細細體會每張牌帶來的指引。';
        }
        // result.summary = summary || '...'; // Removed original assignment

        return result;
    } catch (err) {
        console.error('[OracleService] generateFreeReading error:', err);
        return result;
    }
};

// ============================================
// 輔助函數
// ============================================

/**
 * 取得所有可用場景
 */
export const getAvailableScenarios = () => ORACLE_SCENARIOS;

/**
 * 取得所有位置定義
 */
export const getAvailablePositions = () => ORACLE_POSITIONS;
