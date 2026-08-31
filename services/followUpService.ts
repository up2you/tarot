/**
 * 追問服務 - 終身 VIP 限定，每題最多 2 次追問
 */

import { supabase } from './supabaseClient';
import { MAJOR_ARCANA } from '../constants';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// 各語言的導師 persona（與 geminiService 一致）
const FOLLOWUP_PERSONAS: Record<string, { name: string; lang: string; style: string }> = {
  'zh-TW': { name: '艾瑟瑞爾', lang: '繁體中文', style: '溫暖真誠、有智慧與洞見的現代塔羅導師，用白話口語解讀' },
  'zh-CN': { name: '艾瑟瑞尔', lang: '简体中文', style: '温暖真诚、有智慧与洞见的现代塔罗导师，用白话口语解读' },
  'en':    { name: 'Aetheriel', lang: 'English', style: 'warm, sincere, wise and insightful modern tarot guide speaking in plain language' },
  'ja':    { name: 'エーセリエル', lang: '日本語', style: '温かく誠実で、知恵と洞察に満ちた現代のタロットガイド。平易な口語で' },
  'ko':    { name: '에테리엘', lang: '한국어', style: '따뜻하고 진실하며 지혜와 통찰이 있는 현대 타로 가이드. 쉬운 구어체로' },
};

// 取得 API Key（由 vite.config.ts define 注入）
const getApiKey = (): string => {
  // @ts-ignore - process.env 由 vite.config.ts define 注入
  return process.env.DEEPSEEK_API_KEY || '';
};

// ============================================
// 類型定義
// ============================================

export interface Reading {
    id: string;
    user_id: string;
    spread_type: string;
    category: string | null;
    question: string | null;
    cards: CardResult[];
    interpretation: string | null;
    interpretation_type: 'oracle' | 'ai';
    followup_count: number;
    max_followups: number;
    created_at: string;
}

export interface CardResult {
    cardId: number;
    isReversed: boolean;
    position: string;
}

export interface Followup {
    id: string;
    reading_id: string;
    user_id: string;
    question: string;
    answer: string | null;
    sequence: number;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
    completed_at: string | null;
}

export interface FollowupEligibility {
    can_ask: boolean;
    reason: string;
    remaining_count: number;
}

// ============================================
// 占卜記錄
// ============================================

/**
 * 保存占卜記錄
 */
export const saveReading = async (
    userId: string,
    spreadType: string,
    cards: CardResult[],
    interpretation: string,
    interpretationType: 'oracle' | 'ai' = 'oracle',
    question?: string,
    category?: string
): Promise<string | null> => {
    try {
        const { data, error } = await supabase
            .from('readings')
            .insert({
                user_id: userId,
                spread_type: spreadType,
                category,
                question,
                cards,
                interpretation,
                interpretation_type: interpretationType,
                followup_count: 0,
                max_followups: 2,
            })
            .select('id')
            .single();

        if (error) {
            console.error('[FollowUpService] saveReading failed:', error);
            return null;
        }

        return data.id;
    } catch (err) {
        console.error('[FollowUpService] saveReading error:', err);
        return null;
    }
};

/**
 * 取得用戶的占卜記錄
 */
export const getUserReadings = async (
    userId: string,
    limit: number = 20
): Promise<Reading[]> => {
    try {
        const { data, error } = await supabase
            .from('readings')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('[FollowUpService] getUserReadings failed:', error);
            return [];
        }

        return data as Reading[];
    } catch (err) {
        console.error('[FollowUpService] getUserReadings error:', err);
        return [];
    }
};

/**
 * 取得單一占卜記錄
 */
export const getReading = async (readingId: string): Promise<Reading | null> => {
    try {
        const { data, error } = await supabase
            .from('readings')
            .select('*')
            .eq('id', readingId)
            .single();

        if (error) {
            return null;
        }

        return data as Reading;
    } catch (err) {
        return null;
    }
};

// ============================================
// 追問功能
// ============================================

/**
 * 檢查用戶是否可以追問
 */
export const checkFollowupEligibility = async (
    userId: string,
    readingId: string
): Promise<FollowupEligibility> => {
    try {
        const { data, error } = await supabase.rpc('can_followup', {
            p_user_id: userId,
            p_reading_id: readingId,
        });

        if (error || !data || data.length === 0) {
            // 回退到本地檢查
            return await localCheckFollowupEligibility(userId, readingId);
        }

        return data[0] as FollowupEligibility;
    } catch (err) {
        console.error('[FollowUpService] checkFollowupEligibility error:', err);
        return { can_ask: false, reason: '系統錯誤', remaining_count: 0 };
    }
};

/**
 * 本地檢查追問資格（RPC 失敗時使用）
 */
async function localCheckFollowupEligibility(
    userId: string,
    readingId: string
): Promise<FollowupEligibility> {
    // 檢查用戶是否為終身 VIP
    const { data: user } = await supabase
        .from('user_profiles')
        .select('subscription_type')
        .eq('user_id', userId)
        .single();

    if (!user || user.subscription_type !== 'lifetime') {
        return {
            can_ask: false,
            reason: '追問功能僅限終身 VIP 會員使用',
            remaining_count: 0,
        };
    }

    // 檢查占卜記錄
    const { data: reading } = await supabase
        .from('readings')
        .select('followup_count, max_followups')
        .eq('id', readingId)
        .eq('user_id', userId)
        .single();

    if (!reading) {
        return {
            can_ask: false,
            reason: '找不到此占卜記錄',
            remaining_count: 0,
        };
    }

    const remaining = reading.max_followups - reading.followup_count;
    if (remaining <= 0) {
        return {
            can_ask: false,
            reason: '已達到最大追問次數（2次）',
            remaining_count: 0,
        };
    }

    return {
        can_ask: true,
        reason: '',
        remaining_count: remaining,
    };
}

/**
 * 創建追問
 */
export const createFollowup = async (
    userId: string,
    readingId: string,
    question: string
): Promise<{ success: boolean; followupId?: string; message: string }> => {
    try {
        // 先檢查資格
        const eligibility = await checkFollowupEligibility(userId, readingId);
        if (!eligibility.can_ask) {
            return { success: false, message: eligibility.reason };
        }

        // 使用 RPC 創建追問
        const { data, error } = await supabase.rpc('create_followup', {
            p_user_id: userId,
            p_reading_id: readingId,
            p_question: question,
        });

        if (error) {
            console.error('[FollowUpService] createFollowup RPC failed:', error);
            // 回退到直接插入
            return await localCreateFollowup(userId, readingId, question);
        }

        if (data && data.length > 0 && data[0].success) {
            return {
                success: true,
                followupId: data[0].followup_id,
                message: data[0].message,
            };
        }

        return { success: false, message: data?.[0]?.message || '創建追問失敗' };
    } catch (err) {
        console.error('[FollowUpService] createFollowup error:', err);
        return { success: false, message: '系統錯誤' };
    }
};

/**
 * 本地創建追問（RPC 失敗時使用）
 */
async function localCreateFollowup(
    userId: string,
    readingId: string,
    question: string
): Promise<{ success: boolean; followupId?: string; message: string }> {
    // 取得當前追問次數
    const { data: reading } = await supabase
        .from('readings')
        .select('followup_count')
        .eq('id', readingId)
        .single();

    if (!reading) {
        return { success: false, message: '找不到占卜記錄' };
    }

    // 創建追問
    const { data: followup, error: insertError } = await supabase
        .from('followups')
        .insert({
            reading_id: readingId,
            user_id: userId,
            question,
            sequence: reading.followup_count + 1,
            status: 'pending',
        })
        .select('id')
        .single();

    if (insertError) {
        return { success: false, message: '創建追問失敗' };
    }

    // 更新占卜記錄
    await supabase
        .from('readings')
        .update({
            followup_count: reading.followup_count + 1,
            updated_at: new Date().toISOString()
        })
        .eq('id', readingId);

    return {
        success: true,
        followupId: followup.id,
        message: '追問已創建',
    };
}

/**
 * 完成追問（儲存 AI 回答）
 */
export const completeFollowup = async (
    followupId: string,
    answer: string
): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('followups')
            .update({
                answer,
                status: 'completed',
                completed_at: new Date().toISOString(),
            })
            .eq('id', followupId);

        if (error) {
            console.error('[FollowUpService] completeFollowup failed:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('[FollowUpService] completeFollowup error:', err);
        return false;
    }
};

/**
 * 取得占卜記錄的所有追問
 */
export const getFollowups = async (readingId: string): Promise<Followup[]> => {
    try {
        const { data, error } = await supabase
            .from('followups')
            .select('*')
            .eq('reading_id', readingId)
            .order('sequence', { ascending: true });

        if (error) {
            return [];
        }

        return data as Followup[];
    } catch (err) {
        return [];
    }
};

// ============================================
// AI 追問回答（DeepSeek 整合）
// ============================================

/**
 * 取得牌名（含正逆位標記）
 */
function getCardDisplay(card: CardResult, language: string): string {
    const major = MAJOR_ARCANA.find(c => c.id === card.cardId);
    const baseName = major?.nameZh || `Card ${card.cardId}`;
    const isEn = language === 'en';
    const upright = isEn ? 'Upright' : language === 'ja' ? '正位置' : language === 'ko' ? '정위치' : '正位';
    const reversed = isEn ? 'Reversed' : language === 'ja' ? '逆位置' : language === 'ko' ? '역위치' : '逆位';
    return `${card.position}：${baseName} (${card.isReversed ? reversed : upright})`;
}

/**
 * 生成追問回答（整合 DeepSeek AI）
 * 根據：
 * 1. 原始占卜結果 (reading.cards, reading.interpretation)
 * 2. 用戶的追問問題 (followupQuestion)
 * 3. 之前的追問對話 (previousFollowups)
 */
export const generateFollowupAnswer = async (
    reading: Reading,
    followupQuestion: string,
    previousFollowups: Followup[],
    language: string = 'zh-TW'
): Promise<string> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        return language === 'zh-TW' || language === 'zh-CN'
            ? '抱歉，AI 服務暫時無法使用，請稍後再試。'
            : 'Sorry, the AI service is temporarily unavailable. Please try again later.';
    }

    const persona = FOLLOWUP_PERSONAS[language] || FOLLOWUP_PERSONAS['zh-TW'];

    // 牌面描述
    const cardsDesc = reading.cards.map(c => getCardDisplay(c, language)).join('\n');

    // 過往追問對話（若有）
    const historyDesc = previousFollowups.length > 0
        ? previousFollowups.map((f, i) =>
            `Q${i + 1}: ${f.question}\nA${i + 1}: ${f.answer || '(尚未回答)'}`
        ).join('\n\n')
        : '（無）';

    const prompt = `你是一位資深的塔羅解讀師「${persona.name}」，擅長用${persona.style}。

【原始占卜】
- 尋求者問題：${reading.question || '（未記錄）'}
- 牌陣：${reading.spread_type}
- 牌面：
${cardsDesc}

【原始解讀】
${reading.interpretation?.substring(0, 2000) || '（無）'}

【過往追問對話】
${historyDesc}

【尋求者現在追問】
${followupQuestion}

請針對這個追問，用${persona.lang}的白話口語回答。
要求：
1. **直接正面回答追問**，不要重複原始解讀，而是針對新問題深入。
2. 語氣${persona.style}，清楚易懂。
3. **禁止使用文言文或古語**（如「汝」「吾」「之乎者也」）。
4. 可引用牌面能量，但要與追問問題緊密結合。
5. 使用 Markdown 格式，長度約 250-400 字。
6. 結尾給出一個具體的建議或行動方向。`;

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.8,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            console.error('[FollowUpService] DeepSeek API error:', response.status);
            return language === 'zh-TW' || language === 'zh-CN'
                ? '抱歉，AI 服務暫時無法使用，請稍後再試。'
                : 'Sorry, the AI service is temporarily unavailable. Please try again later.';
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || '（無回應）';
    } catch (err) {
        console.error('[FollowUpService] generateFollowupAnswer error:', err);
        return language === 'zh-TW' || language === 'zh-CN'
            ? '抱歉，AI 服務暫時無法使用，請稍後再試。'
            : 'Sorry, the AI service is temporarily unavailable. Please try again later.';
    }
};

/**
 * 完整的追問流程
 */
export const askFollowup = async (
    userId: string,
    readingId: string,
    question: string,
    language: string = 'zh-TW'
): Promise<{ success: boolean; answer?: string; message: string }> => {
    // 1. 創建追問記錄
    const createResult = await createFollowup(userId, readingId, question);
    if (!createResult.success || !createResult.followupId) {
        return { success: false, message: createResult.message };
    }

    try {
        // 2. 取得原始占卜記錄
        const reading = await getReading(readingId);
        if (!reading) {
            return { success: false, message: '找不到占卜記錄' };
        }

        // 3. 取得之前的追問
        const previousFollowups = await getFollowups(readingId);

        // 4. 生成 AI 回答
        const answer = await generateFollowupAnswer(reading, question, previousFollowups, language);

        // 5. 儲存回答
        await completeFollowup(createResult.followupId, answer);

        return { success: true, answer, message: '追問完成' };
    } catch (err) {
        console.error('[FollowUpService] askFollowup error:', err);
        return { success: false, message: '生成回答失敗' };
    }
};
