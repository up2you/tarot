/**
 * 追問服務 - 終身 VIP 限定，每題最多 2 次追問
 */

import { supabase } from './supabaseClient';

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
// AI 追問回答（需整合 AI 服務）
// ============================================

/**
 * 生成追問回答（整合 AI）
 */
export const generateFollowupAnswer = async (
    reading: Reading,
    followupQuestion: string,
    previousFollowups: Followup[]
): Promise<string> => {
    // TODO: 整合 DeepSeek 或其他 AI 服務
    // 這裡需要根據：
    // 1. 原始占卜結果 (reading.cards, reading.interpretation)
    // 2. 用戶的追問問題 (followupQuestion)
    // 3. 之前的追問對話 (previousFollowups)

    // 暫時返回模擬回答
    const mockAnswers = [
        `根據您抽到的牌卡所呈現的能量，關於「${followupQuestion}」這個問題，牌面顯示您目前正處於一個轉變的時期。建議您保持耐心，相信自己的直覺，機會很快就會到來。`,
        `針對您的追問，牌卡的能量指引著一個正面的方向。雖然過程中可能會有些挑戰，但只要您堅持初心，最終會有好的結果。請記得在做決定時，聆聽內心的聲音。`,
    ];

    return mockAnswers[previousFollowups.length] || mockAnswers[0];
};

/**
 * 完整的追問流程
 */
export const askFollowup = async (
    userId: string,
    readingId: string,
    question: string
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
        const answer = await generateFollowupAnswer(reading, question, previousFollowups);

        // 5. 儲存回答
        await completeFollowup(createResult.followupId, answer);

        return { success: true, answer, message: '追問完成' };
    } catch (err) {
        console.error('[FollowUpService] askFollowup error:', err);
        return { success: false, message: '生成回答失敗' };
    }
};
