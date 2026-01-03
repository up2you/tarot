/**
 * 訂閱服務 - 處理用戶訂閱、點數、付費相關邏輯
 */

import { supabase } from './supabaseClient';

// ============================================
// 類型定義
// ============================================

export type SubscriptionType = 'free' | 'credits' | 'monthly' | 'yearly' | 'lifetime';

export type PlanType = 'credits_5' | 'credits_10' | 'credits_20' | 'monthly' | 'yearly' | 'lifetime';

export interface UserSubscription {
    subscription_type: SubscriptionType;
    subscription_expires_at: string | null;
    credits_balance: number;
    total_readings: number;
    free_readings_used: number;
}

export interface PricingPlan {
    id: string;
    plan_type: PlanType;
    name_zh: string;
    name_en: string;
    price: number;
    currency: string;
    original_price: number | null;
    credits_amount: number | null;
    subscription_months: number | null;
    is_active: boolean;
    is_popular: boolean;
}

export interface UserAccess {
    can_use_ai: boolean;
    is_vip: boolean;
    credits_remaining: number;
    free_readings_remaining: number;
}

export interface PaymentRecord {
    id: string;
    user_id: string;
    payment_type: string;
    amount: number;
    status: string;
    created_at: string;
}

// 免費次數限制
const FREE_READINGS_LIMIT = 3;

// ============================================
// 價格方案
// ============================================

/**
 * 取得所有價格方案
 */
export const getPricingPlans = async (): Promise<PricingPlan[]> => {
    try {
        const { data, error } = await supabase
            .from('pricing_plans')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('[SubscriptionService] getPricingPlans failed:', error);
            return [];
        }

        return data as PricingPlan[];
    } catch (err) {
        console.error('[SubscriptionService] getPricingPlans error:', err);
        return [];
    }
};

// ============================================
// 用戶訂閱狀態
// ============================================

/**
 * 取得用戶訂閱資訊
 */
export const getUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('subscription_type, subscription_expires_at, credits_balance, total_readings, free_readings_used')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('[SubscriptionService] getUserSubscription failed:', error);
            return null;
        }

        return data as UserSubscription;
    } catch (err) {
        console.error('[SubscriptionService] getUserSubscription error:', err);
        return null;
    }
};

/**
 * 檢查用戶權限
 */
export const checkUserAccess = async (userId: string): Promise<UserAccess> => {
    try {
        // 使用 RPC 函數
        const { data, error } = await supabase.rpc('check_user_access', { p_user_id: userId });

        if (error || !data || data.length === 0) {
            // 回退到本地計算
            const sub = await getUserSubscription(userId);
            if (!sub) {
                return {
                    can_use_ai: false,
                    is_vip: false,
                    credits_remaining: 0,
                    free_readings_remaining: FREE_READINGS_LIMIT,
                };
            }

            const isVip = ['monthly', 'yearly', 'lifetime'].includes(sub.subscription_type) &&
                (!sub.subscription_expires_at || new Date(sub.subscription_expires_at) > new Date());

            const freeRemaining = Math.max(0, FREE_READINGS_LIMIT - sub.free_readings_used);
            const canUseAi = isVip || sub.credits_balance > 0 || freeRemaining > 0;

            return {
                can_use_ai: canUseAi,
                is_vip: isVip,
                credits_remaining: sub.credits_balance,
                free_readings_remaining: freeRemaining,
            };
        }

        return data[0] as UserAccess;
    } catch (err) {
        console.error('[SubscriptionService] checkUserAccess error:', err);
        return {
            can_use_ai: false,
            is_vip: false,
            credits_remaining: 0,
            free_readings_remaining: FREE_READINGS_LIMIT,
        };
    }
};

/**
 * 檢查是否為 VIP
 */
export const isVipUser = async (userId: string): Promise<boolean> => {
    const access = await checkUserAccess(userId);
    return access.is_vip;
};

// ============================================
// 點數操作
// ============================================

/**
 * 使用點數（或免費次數）
 */
export const useReading = async (userId: string): Promise<{ success: boolean; message: string }> => {
    try {
        const access = await checkUserAccess(userId);

        if (!access.can_use_ai) {
            return { success: false, message: '沒有可用的解讀次數，請購買點數或升級 VIP' };
        }

        // VIP 用戶不扣點數
        if (access.is_vip) {
            // 只增加使用次數統計
            await supabase
                .from('user_profiles')
                .update({
                    total_readings: supabase.rpc('increment', { x: 1 }),
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', userId);

            return { success: true, message: 'VIP 無限使用' };
        }

        // 優先使用免費次數
        if (access.free_readings_remaining > 0) {
            await supabase
                .from('user_profiles')
                .update({
                    free_readings_used: supabase.rpc('increment', { x: 1 }),
                    total_readings: supabase.rpc('increment', { x: 1 }),
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', userId);

            return {
                success: true,
                message: `使用免費次數 (剩餘 ${access.free_readings_remaining - 1} 次)`
            };
        }

        // 使用點數
        const { data, error } = await supabase.rpc('use_credits', {
            p_user_id: userId,
            p_credits: 1,
            p_usage_type: 'reading'
        });

        if (error || !data) {
            return { success: false, message: '點數扣除失敗' };
        }

        return {
            success: true,
            message: `使用 1 點數 (剩餘 ${access.credits_remaining - 1} 點)`
        };

    } catch (err) {
        console.error('[SubscriptionService] useReading error:', err);
        return { success: false, message: '系統錯誤' };
    }
};

// ============================================
// 訂閱操作
// ============================================

/**
 * 購買點數
 */
export const purchaseCredits = async (
    userId: string,
    credits: number,
    paymentId: string
): Promise<boolean> => {
    try {
        const { data, error } = await supabase.rpc('purchase_credits', {
            p_user_id: userId,
            p_credits: credits,
            p_payment_id: paymentId,
        });

        if (error) {
            console.error('[SubscriptionService] purchaseCredits failed:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('[SubscriptionService] purchaseCredits error:', err);
        return false;
    }
};

/**
 * 啟用訂閱
 */
export const activateSubscription = async (
    userId: string,
    subscriptionType: 'monthly' | 'yearly' | 'lifetime',
    months: number
): Promise<boolean> => {
    try {
        const { data, error } = await supabase.rpc('activate_subscription', {
            p_user_id: userId,
            p_subscription_type: subscriptionType,
            p_months: months,
        });

        if (error) {
            console.error('[SubscriptionService] activateSubscription failed:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('[SubscriptionService] activateSubscription error:', err);
        return false;
    }
};

// ============================================
// 付款記錄
// ============================================

/**
 * 創建付款記錄
 */
export const createPaymentRecord = async (
    userId: string,
    paymentType: PlanType,
    amount: number,
    provider?: string
): Promise<string | null> => {
    try {
        const planInfo = getPlanInfo(paymentType);

        const { data, error } = await supabase
            .from('payment_records')
            .insert({
                user_id: userId,
                payment_type: paymentType.startsWith('credits') ? 'credits' : paymentType,
                amount,
                credits_purchased: planInfo.credits,
                subscription_months: planInfo.months,
                status: 'pending',
                payment_provider: provider,
            })
            .select('id')
            .single();

        if (error) {
            console.error('[SubscriptionService] createPaymentRecord failed:', error);
            return null;
        }

        return data.id;
    } catch (err) {
        console.error('[SubscriptionService] createPaymentRecord error:', err);
        return null;
    }
};

/**
 * 完成付款
 */
export const completePayment = async (
    paymentId: string,
    transactionId: string
): Promise<boolean> => {
    try {
        // 更新付款狀態
        const { data: payment, error: fetchError } = await supabase
            .from('payment_records')
            .select('*')
            .eq('id', paymentId)
            .single();

        if (fetchError || !payment) {
            return false;
        }

        // 更新狀態
        await supabase
            .from('payment_records')
            .update({
                status: 'completed',
                provider_transaction_id: transactionId,
                completed_at: new Date().toISOString(),
            })
            .eq('id', paymentId);

        // 根據類型處理
        if (payment.credits_purchased) {
            await purchaseCredits(payment.user_id, payment.credits_purchased, paymentId);
        } else if (payment.subscription_months) {
            const subType = payment.subscription_months >= 9999 ? 'lifetime' :
                payment.subscription_months >= 12 ? 'yearly' : 'monthly';
            await activateSubscription(payment.user_id, subType, payment.subscription_months);
        }

        return true;
    } catch (err) {
        console.error('[SubscriptionService] completePayment error:', err);
        return false;
    }
};

/**
 * 取得用戶付款記錄
 */
export const getUserPayments = async (userId: string): Promise<PaymentRecord[]> => {
    try {
        const { data, error } = await supabase
            .from('payment_records')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            return [];
        }

        return data as PaymentRecord[];
    } catch (err) {
        return [];
    }
};

// ============================================
// 輔助函數
// ============================================

function getPlanInfo(planType: PlanType): { credits: number | null; months: number | null } {
    switch (planType) {
        case 'credits_5': return { credits: 5, months: null };
        case 'credits_10': return { credits: 10, months: null };
        case 'credits_20': return { credits: 20, months: null };
        case 'monthly': return { credits: null, months: 1 };
        case 'yearly': return { credits: null, months: 12 };
        case 'lifetime': return { credits: null, months: 9999 };
        default: return { credits: null, months: null };
    }
}

/**
 * 格式化訂閱狀態顯示
 */
export const formatSubscriptionStatus = (sub: UserSubscription): string => {
    switch (sub.subscription_type) {
        case 'lifetime':
            return '終身 VIP 會員';
        case 'yearly':
            return `年費 VIP (到期: ${formatDate(sub.subscription_expires_at)})`;
        case 'monthly':
            return `月費 VIP (到期: ${formatDate(sub.subscription_expires_at)})`;
        case 'credits':
            return `點數會員 (餘額: ${sub.credits_balance} 點)`;
        default:
            return `免費會員 (剩餘 ${Math.max(0, FREE_READINGS_LIMIT - sub.free_readings_used)} 次體驗)`;
    }
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '無限期';
    return new Date(dateStr).toLocaleDateString('zh-TW');
}
