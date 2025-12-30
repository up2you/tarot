/**
 * 用戶服務
 * 管理 Supabase user_profiles 資料表的前台操作
 */

import { supabase } from './supabaseClient';

export interface UserProfile {
    id: string;
    email: string;
    display_name: string | null;
    is_vip: boolean;
    vip_expires_at: string | null;
    free_readings_remaining: number;
    free_readings_monthly_limit: number;
    last_quota_reset_at: string;
    total_readings_count: number;
    is_active: boolean;
    provider: string;
    created_at: string;
    updated_at: string;
}

/**
 * 同步用戶資料到 Supabase（登入時呼叫）
 * 如果用戶不存在則建立，存在則更新 display_name
 */
export const upsertUserProfile = async (
    email: string,
    displayName: string
): Promise<UserProfile | null> => {
    try {
        // 先檢查用戶是否存在
        const { data: existing } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('email', email)
            .single();

        if (existing) {
            // 用戶存在，檢查是否需要重置月度額度
            const profile = await checkAndResetMonthlyQuota(existing);

            // 更新 display_name 和 updated_at
            const { data, error } = await supabase
                .from('user_profiles')
                .update({
                    display_name: displayName,
                    updated_at: new Date().toISOString(),
                })
                .eq('email', email)
                .select()
                .single();

            if (error) {
                console.error('[UserService] Update failed:', error);
                return profile; // 返回原有資料
            }
            return data as UserProfile;
        } else {
            // 新用戶，建立記錄
            const { data, error } = await supabase
                .from('user_profiles')
                .insert({
                    email,
                    display_name: displayName,
                    provider: 'google',
                })
                .select()
                .single();

            if (error) {
                console.error('[UserService] Insert failed:', error);
                return null;
            }
            console.log('[UserService] New user created:', email);
            return data as UserProfile;
        }
    } catch (err) {
        console.error('[UserService] upsertUserProfile error:', err);
        return null;
    }
};

/**
 * 檢查並重置月度額度（如果跨月）
 */
const checkAndResetMonthlyQuota = async (profile: UserProfile): Promise<UserProfile> => {
    const lastReset = new Date(profile.last_quota_reset_at);
    const now = new Date();

    // 檢查是否跨月
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
        // 重置額度
        const { data, error } = await supabase
            .from('user_profiles')
            .update({
                free_readings_remaining: profile.free_readings_monthly_limit,
                last_quota_reset_at: now.toISOString(),
                updated_at: now.toISOString(),
            })
            .eq('id', profile.id)
            .select()
            .single();

        if (!error && data) {
            console.log('[UserService] Monthly quota reset for:', profile.email);
            return data as UserProfile;
        }
    }
    return profile;
};

/**
 * 取得用戶資料
 */
export const getUserProfile = async (email: string): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            console.error('[UserService] getUserProfile failed:', error);
            return null;
        }

        // 檢查並重置月度額度
        return await checkAndResetMonthlyQuota(data as UserProfile);
    } catch (err) {
        console.error('[UserService] getUserProfile error:', err);
        return null;
    }
};

/**
 * 檢查免費額度
 */
export const checkFreeQuota = async (email: string): Promise<{ remaining: number; canRead: boolean }> => {
    const profile = await getUserProfile(email);

    if (!profile) {
        return { remaining: 0, canRead: false };
    }

    // VIP 用戶無限額度
    if (profile.is_vip) {
        return { remaining: -1, canRead: true }; // -1 表示無限
    }

    return {
        remaining: profile.free_readings_remaining,
        canRead: profile.free_readings_remaining > 0,
    };
};

/**
 * 扣除一次免費占卜額度
 */
export const consumeFreeReading = async (email: string): Promise<boolean> => {
    try {
        const profile = await getUserProfile(email);

        if (!profile) {
            console.error('[UserService] User not found for quota deduction');
            return false;
        }

        // VIP 用戶不扣額度
        if (profile.is_vip) {
            // 只增加總次數
            await supabase
                .from('user_profiles')
                .update({
                    total_readings_count: profile.total_readings_count + 1,
                    updated_at: new Date().toISOString(),
                })
                .eq('email', email);
            return true;
        }

        // 免費用戶扣除額度
        if (profile.free_readings_remaining <= 0) {
            console.warn('[UserService] No quota remaining');
            return false;
        }

        const { error } = await supabase
            .from('user_profiles')
            .update({
                free_readings_remaining: profile.free_readings_remaining - 1,
                total_readings_count: profile.total_readings_count + 1,
                updated_at: new Date().toISOString(),
            })
            .eq('email', email);

        if (error) {
            console.error('[UserService] consumeFreeReading failed:', error);
            return false;
        }

        console.log('[UserService] Quota consumed for:', email, 'Remaining:', profile.free_readings_remaining - 1);
        return true;
    } catch (err) {
        console.error('[UserService] consumeFreeReading error:', err);
        return false;
    }
};

/**
 * 檢查用戶是否為 VIP（含過期檢查）
 */
export const checkVipStatus = async (email: string): Promise<boolean> => {
    const profile = await getUserProfile(email);

    if (!profile || !profile.is_vip) {
        return false;
    }

    // 檢查 VIP 是否過期
    if (profile.vip_expires_at) {
        const expiresAt = new Date(profile.vip_expires_at);
        if (expiresAt < new Date()) {
            // VIP 已過期，自動降級
            await supabase
                .from('user_profiles')
                .update({
                    is_vip: false,
                    updated_at: new Date().toISOString(),
                })
                .eq('email', email);
            console.log('[UserService] VIP expired for:', email);
            return false;
        }
    }

    return true;
};
