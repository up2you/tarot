/**
 * 管理員服務
 * 管理 Supabase user_profiles 資料表的後台操作
 */

import { supabase } from './supabaseClient';
import { UserProfile } from './userService';

export interface GetUsersOptions {
    page: number;
    limit: number;
    search?: string;
    filter?: 'all' | 'vip' | 'free';
}

export interface GetUsersResult {
    users: UserProfile[];
    total: number;
    page: number;
    totalPages: number;
}

export interface UserStats {
    totalUsers: number;
    vipUsers: number;
    freeUsers: number;
    activeToday: number;
    newThisMonth: number;
}

/**
 * 取得用戶列表（支援分頁、搜尋、篩選）
 */
export const getUsers = async (options: GetUsersOptions): Promise<GetUsersResult> => {
    const { page, limit, search, filter } = options;
    const offset = (page - 1) * limit;

    try {
        let query = supabase
            .from('user_profiles')
            .select('*', { count: 'exact' });

        // 搜尋條件
        if (search && search.trim()) {
            query = query.or(`email.ilike.%${search}%,display_name.ilike.%${search}%`);
        }

        // 篩選條件
        if (filter === 'vip') {
            query = query.eq('is_vip', true);
        } else if (filter === 'free') {
            query = query.eq('is_vip', false);
        }

        // 排序和分頁
        query = query
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) {
            console.error('[AdminService] getUsers failed:', error);
            return { users: [], total: 0, page, totalPages: 0 };
        }

        const total = count || 0;
        const totalPages = Math.ceil(total / limit);

        return {
            users: data as UserProfile[],
            total,
            page,
            totalPages,
        };
    } catch (err) {
        console.error('[AdminService] getUsers error:', err);
        return { users: [], total: 0, page, totalPages: 0 };
    }
};

/**
 * 取得單一用戶詳情
 */
export const getUserById = async (id: string): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('[AdminService] getUserById failed:', error);
            return null;
        }

        return data as UserProfile;
    } catch (err) {
        console.error('[AdminService] getUserById error:', err);
        return null;
    }
};

/**
 * 更新用戶 VIP 狀態
 */
export const updateUserVipStatus = async (
    id: string,
    isVip: boolean,
    expiresAt?: Date
): Promise<boolean> => {
    try {
        const updateData: any = {
            is_vip: isVip,
            updated_at: new Date().toISOString(),
        };

        if (isVip && expiresAt) {
            updateData.vip_expires_at = expiresAt.toISOString();
        } else if (!isVip) {
            updateData.vip_expires_at = null;
        }

        const { error } = await supabase
            .from('user_profiles')
            .update(updateData)
            .eq('id', id);

        if (error) {
            console.error('[AdminService] updateUserVipStatus failed:', error);
            return false;
        }

        console.log('[AdminService] VIP status updated:', id, isVip);
        return true;
    } catch (err) {
        console.error('[AdminService] updateUserVipStatus error:', err);
        return false;
    }
};

/**
 * 更新用戶免費額度
 */
export const updateUserFreeQuota = async (
    id: string,
    newQuota: number
): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                free_readings_remaining: newQuota,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) {
            console.error('[AdminService] updateUserFreeQuota failed:', error);
            return false;
        }

        console.log('[AdminService] Free quota updated:', id, newQuota);
        return true;
    } catch (err) {
        console.error('[AdminService] updateUserFreeQuota error:', err);
        return false;
    }
};

/**
 * 重置用戶月度額度
 */
export const resetUserMonthlyQuota = async (id: string): Promise<boolean> => {
    try {
        // 先取得用戶的月度上限
        const user = await getUserById(id);
        if (!user) return false;

        const { error } = await supabase
            .from('user_profiles')
            .update({
                free_readings_remaining: user.free_readings_monthly_limit,
                last_quota_reset_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) {
            console.error('[AdminService] resetUserMonthlyQuota failed:', error);
            return false;
        }

        console.log('[AdminService] Monthly quota reset:', id);
        return true;
    } catch (err) {
        console.error('[AdminService] resetUserMonthlyQuota error:', err);
        return false;
    }
};

/**
 * 停用/啟用用戶
 */
export const toggleUserActive = async (
    id: string,
    isActive: boolean
): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                is_active: isActive,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) {
            console.error('[AdminService] toggleUserActive failed:', error);
            return false;
        }

        console.log('[AdminService] User active status:', id, isActive);
        return true;
    } catch (err) {
        console.error('[AdminService] toggleUserActive error:', err);
        return false;
    }
};

/**
 * 取得用戶統計數據
 */
export const getUserStats = async (): Promise<UserStats> => {
    try {
        // 總用戶數
        const { count: totalUsers } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true });

        // VIP 用戶數
        const { count: vipUsers } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true })
            .eq('is_vip', true);

        // 本月新用戶
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { count: newThisMonth } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfMonth.toISOString());

        // 今日活躍（更新時間在今天）
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const { count: activeToday } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true })
            .gte('updated_at', startOfDay.toISOString());

        return {
            totalUsers: totalUsers || 0,
            vipUsers: vipUsers || 0,
            freeUsers: (totalUsers || 0) - (vipUsers || 0),
            activeToday: activeToday || 0,
            newThisMonth: newThisMonth || 0,
        };
    } catch (err) {
        console.error('[AdminService] getUserStats error:', err);
        return {
            totalUsers: 0,
            vipUsers: 0,
            freeUsers: 0,
            activeToday: 0,
            newThisMonth: 0,
        };
    }
};
