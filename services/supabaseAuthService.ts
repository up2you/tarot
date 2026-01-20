/**
 * Supabase 用戶認證服務 - 處理登入、註冊、密碼重設等
 */

import { supabase } from './supabaseClient';

// ============================================
// 類型定義
// ============================================

export interface AuthUser {
    id: string;
    email: string;
    email_confirmed_at?: string;
    created_at: string;
}

export interface SupabaseUserProfile {
    user_id: string;
    email: string;
    display_name: string | null;
    avatar_url: string | null;
    subscription_type: string;
    subscription_expires_at: string | null;
    credits_balance: number;
    active_card_style: string;
    total_readings_count?: number; // 累計占卜總次數
    created_at: string;
}

export interface AuthResult {
    success: boolean;
    message: string;
    user?: AuthUser;
}

// ============================================
// 認證狀態
// ============================================

/**
 * 取得當前登入用戶
 */
export const getSupabaseUser = async (): Promise<AuthUser | null> => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email || '',
            email_confirmed_at: user.email_confirmed_at,
            created_at: user.created_at,
        };
    } catch (err) {
        console.error('[SupabaseAuthService] getUser error:', err);
        return null;
    }
};

/**
 * 取得用戶 Profile
 */
export const getSupabaseUserProfile = async (userId: string): Promise<SupabaseUserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

        if (error) {
            return null;
        }

        return data as SupabaseUserProfile;
    } catch (err) {
        return null;
    }
};

/**
 * 監聽認證狀態變化
 */
export const onSupabaseAuthStateChange = (callback: (user: AuthUser | null) => void) => {
    return supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
            callback({
                id: session.user.id,
                email: session.user.email || '',
                email_confirmed_at: session.user.email_confirmed_at,
                created_at: session.user.created_at,
            });
        } else {
            callback(null);
        }
    });
};

// ============================================
// 註冊
// ============================================

/**
 * 使用 Email 註冊
 */
export const supabaseSignUp = async (
    email: string,
    password: string,
    displayName?: string
): Promise<AuthResult> => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: displayName,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error('[SupabaseAuthService] signUp failed:', error);
            return { success: false, message: getErrorMessage(error.message) };
        }

        if (data.user) {
            // 創建 user_profile
            await createSupabaseUserProfile(data.user.id, email, displayName);

            return {
                success: true,
                message: '註冊成功！請查看您的信箱進行驗證。',
                user: {
                    id: data.user.id,
                    email: data.user.email || '',
                    created_at: data.user.created_at,
                },
            };
        }

        return { success: false, message: '註冊失敗' };
    } catch (err) {
        console.error('[SupabaseAuthService] signUp error:', err);
        return { success: false, message: '系統錯誤，請稍後再試' };
    }
};

/**
 * 創建用戶 Profile
 */
async function createSupabaseUserProfile(userId: string, email: string, displayName?: string): Promise<void> {
    try {
        await supabase.from('user_profiles').upsert({
            user_id: userId,
            email,
            display_name: displayName || email.split('@')[0],
            subscription_type: 'free',
            credits_balance: 0,
            free_readings_used: 0,
            total_readings: 0,
            total_readings_count: 0, // 初始化累計占卜次數
            active_card_style: 'classic',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
    } catch (err) {
        console.error('[SupabaseAuthService] createUserProfile error:', err);
    }
}

// ============================================
// 登入
// ============================================

/**
 * 使用 Email 登入
 */
export const supabaseSignIn = async (
    email: string,
    password: string
): Promise<AuthResult> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('[SupabaseAuthService] signIn failed:', error);
            return { success: false, message: getErrorMessage(error.message) };
        }

        if (data.user) {
            return {
                success: true,
                message: '登入成功！',
                user: {
                    id: data.user.id,
                    email: data.user.email || '',
                    email_confirmed_at: data.user.email_confirmed_at,
                    created_at: data.user.created_at,
                },
            };
        }

        return { success: false, message: '登入失敗' };
    } catch (err) {
        console.error('[SupabaseAuthService] signIn error:', err);
        return { success: false, message: '系統錯誤，請稍後再試' };
    }
};

/**
 * 使用 Google 登入
 */
export const supabaseSignInWithGoogle = async (): Promise<void> => {
    try {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    } catch (err) {
        console.error('[SupabaseAuthService] Google signIn error:', err);
    }
};

/**
 * 使用 Magic Link 登入（無密碼）
 */
export const supabaseSignInWithMagicLink = async (email: string): Promise<AuthResult> => {
    try {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            return { success: false, message: getErrorMessage(error.message) };
        }

        return {
            success: true,
            message: '魔法連結已發送！請查看您的信箱。',
        };
    } catch (err) {
        return { success: false, message: '發送失敗，請稍後再試' };
    }
};

// ============================================
// 登出
// ============================================

/**
 * 登出
 */
export const supabaseSignOut = async (): Promise<AuthResult> => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return { success: false, message: '登出失敗' };
        }

        return { success: true, message: '已登出' };
    } catch (err) {
        return { success: false, message: '系統錯誤' };
    }
};

// ============================================
// 密碼管理
// ============================================

/**
 * 發送密碼重設郵件
 */
export const supabaseSendPasswordReset = async (email: string): Promise<AuthResult> => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) {
            return { success: false, message: getErrorMessage(error.message) };
        }

        return {
            success: true,
            message: '密碼重設郵件已發送！請查看您的信箱。',
        };
    } catch (err) {
        return { success: false, message: '發送失敗，請稍後再試' };
    }
};

/**
 * 更新密碼
 */
export const supabaseUpdatePassword = async (newPassword: string): Promise<AuthResult> => {
    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            return { success: false, message: getErrorMessage(error.message) };
        }

        return { success: true, message: '密碼已更新！' };
    } catch (err) {
        return { success: false, message: '更新失敗，請稍後再試' };
    }
};

// ============================================
// Profile 更新
// ============================================

/**
 * 更新用戶 Profile
 */
export const updateSupabaseUserProfile = async (
    userId: string,
    updates: Partial<SupabaseUserProfile>
): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId);

        if (error) {
            console.error('[SupabaseAuthService] updateUserProfile failed:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('[SupabaseAuthService] updateUserProfile error:', err);
        return false;
    }
};

// ============================================
// 輔助函數
// ============================================

function getErrorMessage(error: string): string {
    const errorMap: Record<string, string> = {
        'Invalid login credentials': '信箱或密碼錯誤',
        'Email not confirmed': '請先驗證您的信箱',
        'User already registered': '此信箱已註冊',
        'Password should be at least 6 characters': '密碼至少需要6個字元',
        'Invalid email': '信箱格式不正確',
        'Signup requires a valid password': '請輸入有效密碼',
    };

    return errorMap[error] || error;
}
