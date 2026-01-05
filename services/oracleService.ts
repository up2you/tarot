/**
 * Oracle Service - 神諭解釋服務
 * 用於免費用戶的預存解釋查詢和組合
 */

import { supabase } from './supabaseClient';
import { ORACLE_SCENARIOS } from '../constants/oracleScenarios';
import { ORACLE_POSITIONS, getPositionByKey } from '../constants/oraclePositions';

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
}

export interface CardRelationship {
    id: string;
    card_a_id: number;
    card_b_id: number;
    relationship_type: string;
    description: string;
}

export interface ReadingSummary {
    id: string;
    pattern_key: string;
    summary: string;
}

// ============================================
// 解釋查詢
// ============================================

/**
 * 取得單牌解釋
 */
export const getOracleInterpretation = async (
    cardId: number,
    isReversed: boolean,
    scenarioKey: string,
    positionKey: string
): Promise<string | null> => {
    try {
        const orientation = isReversed ? 'reversed' : 'upright';

        const { data, error } = await supabase
            .from('oracle_interpretations')
            .select('interpretation')
            .eq('card_id', cardId)
            .eq('orientation', orientation)
            .eq('scenario_key', scenarioKey)
            .eq('position_key', positionKey)
            .single();

        if (error) {
            console.error('[OracleService] getInterpretation failed:', error);
            return null;
        }

        return data?.interpretation || null;
    } catch (err) {
        console.error('[OracleService] getInterpretation error:', err);
        return null;
    }
};

/**
 * 批量取得多張牌的解釋
 */
export const getBatchInterpretations = async (
    cards: { cardId: number; isReversed: boolean; positionKey: string }[],
    scenarioKey: string
): Promise<Map<string, string>> => {
    const results = new Map<string, string>();

    try {
        // 建立查詢條件
        const queries = cards.map(card => ({
            card_id: card.cardId,
            orientation: card.isReversed ? 'reversed' : 'upright',
            scenario_key: scenarioKey,
            position_key: card.positionKey,
        }));

        // 批量查詢
        for (const query of queries) {
            const { data, error } = await supabase
                .from('oracle_interpretations')
                .select('interpretation, position_key')
                .eq('card_id', query.card_id)
                .eq('orientation', query.orientation)
                .eq('scenario_key', query.scenario_key)
                .eq('position_key', query.position_key)
                .single();

            if (!error && data) {
                const key = `${query.card_id}_${query.orientation}_${query.position_key}`;
                results.set(key, data.interpretation);
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
    cardBId: number
): Promise<string | null> => {
    try {
        // 確保順序一致（較小 ID 在前）
        const [first, second] = cardAId < cardBId
            ? [cardAId, cardBId]
            : [cardBId, cardAId];

        const { data, error } = await supabase
            .from('oracle_relationships')
            .select('description')
            .eq('card_a_id', first)
            .eq('card_b_id', second)
            .single();

        if (error) {
            return null;
        }

        return data?.description || null;
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
export const getReadingSummary = async (patternKey: string): Promise<string | null> => {
    try {
        const { data, error } = await supabase
            .from('oracle_summaries')
            .select('summary')
            .eq('pattern_key', patternKey)
            .single();

        if (error) {
            return null;
        }

        return data?.summary || null;
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
    scenarioKey: string
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
                card.positionKey
            );

            const position = getPositionByKey(card.positionKey);
            result.interpretations.push({
                position: position?.nameZh || card.positionKey,
                text: text || `${card.cardName}${card.isReversed ? '（逆位）' : '（正位）'}的能量正在影響這個位置...`,
            });
        }

        // 2. 取得牌卡關係
        for (let i = 0; i < cards.length - 1; i++) {
            const relationship = await getCardRelationship(cards[i].cardId, cards[i + 1].cardId);
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
                const summary = await getReadingSummary(patternKey);
                result.summary = summary || '這個牌陣揭示了方向的線索，請靜心感受牌面指出的道路。';
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
                const summary = await getReadingSummary(patternKey);
                result.summary = summary || '這間房子有其獨特的氣場，請細讀牌面訊息，感受它是否與你的頻率共振。';
            }
        } else {
            // 一般場景使用預設總結
            const patternKey = analyzePattern(cards);
            const summary = await getReadingSummary(patternKey);
            result.summary = summary || '這個牌陣揭示了重要的訊息，請細細體會每張牌帶來的指引。';
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
