/**
 * 牌面風格服務 - 處理風格購買、擁有權和切換
 */

import { supabase } from './supabaseClient';

// ============================================
// 類型定義
// ============================================

export interface CardStyle {
    id: string;
    style_key: string;
    name_zh: string;
    name_en: string;
    description_zh: string | null;
    description_en: string | null;
    preview_image_url: string | null;
    sample_cards_urls: string[] | null;
    price: number;
    original_price: number | null;
    currency: string;
    is_free: boolean;
    is_active: boolean;
    is_featured: boolean;
    is_new: boolean;
    category: string | null;
    tags: string[] | null;
    purchase_count: number;
}

export interface UserOwnedStyle {
    style_id: string;
    style_key: string;
    name_zh: string;
    name_en: string;
    purchased_at: string;
}

export interface StyleWithOwnership extends CardStyle {
    is_owned: boolean;
    purchased_at?: string;
}

// 風格分類
export const STYLE_CATEGORIES = {
    classic: { name_zh: '經典類', name_en: 'Classic', icon: '🏛️' },
    modern: { name_zh: '現代類', name_en: 'Modern', icon: '🌆' },
    fantasy: { name_zh: '奇幻類', name_en: 'Fantasy', icon: '✨' },
    cultural: { name_zh: '文化類', name_en: 'Cultural', icon: '🌏' },
    artistic: { name_zh: '藝術類', name_en: 'Artistic', icon: '🎨' },
};

// ============================================
// 風格查詢
// ============================================

/**
 * 取得所有可用風格
 */
export const getAllStyles = async (): Promise<CardStyle[]> => {
    try {
        const { data, error } = await supabase
            .from('card_styles')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('[CardStyleService] getAllStyles failed:', error);
            return [];
        }

        return data as CardStyle[];
    } catch (err) {
        console.error('[CardStyleService] getAllStyles error:', err);
        return [];
    }
};

/**
 * 按分類取得風格
 */
export const getStylesByCategory = async (category: string): Promise<CardStyle[]> => {
    try {
        const { data, error } = await supabase
            .from('card_styles')
            .select('*')
            .eq('is_active', true)
            .eq('category', category)
            .order('sort_order', { ascending: true });

        if (error) {
            return [];
        }

        return data as CardStyle[];
    } catch (err) {
        return [];
    }
};

/**
 * 取得免費風格
 */
export const getFreeStyles = async (): Promise<CardStyle[]> => {
    try {
        const { data, error } = await supabase
            .from('card_styles')
            .select('*')
            .eq('is_active', true)
            .eq('is_free', true)
            .order('sort_order', { ascending: true });

        if (error) {
            return [];
        }

        return data as CardStyle[];
    } catch (err) {
        return [];
    }
};

/**
 * 取得推薦風格
 */
export const getFeaturedStyles = async (): Promise<CardStyle[]> => {
    try {
        const { data, error } = await supabase
            .from('card_styles')
            .select('*')
            .eq('is_active', true)
            .eq('is_featured', true)
            .order('sort_order', { ascending: true });

        if (error) {
            return [];
        }

        return data as CardStyle[];
    } catch (err) {
        return [];
    }
};

/**
 * 根據 style_key 取得風格
 */
export const getStyleByKey = async (styleKey: string): Promise<CardStyle | null> => {
    try {
        const { data, error } = await supabase
            .from('card_styles')
            .select('*')
            .eq('style_key', styleKey)
            .single();

        if (error) {
            return null;
        }

        return data as CardStyle;
    } catch (err) {
        return null;
    }
};

// ============================================
// 用戶擁有權
// ============================================

/**
 * 取得用戶擁有的風格列表
 */
export const getUserOwnedStyles = async (userId: string): Promise<UserOwnedStyle[]> => {
    try {
        const { data, error } = await supabase.rpc('get_user_owned_styles', {
            p_user_id: userId,
        });

        if (error) {
            console.error('[CardStyleService] getUserOwnedStyles failed:', error);
            return [];
        }

        return data as UserOwnedStyle[];
    } catch (err) {
        console.error('[CardStyleService] getUserOwnedStyles error:', err);
        return [];
    }
};

/**
 * 檢查用戶是否擁有特定風格
 */
export const userOwnsStyle = async (userId: string, styleKey: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase.rpc('user_owns_style', {
            p_user_id: userId,
            p_style_key: styleKey,
        });

        if (error) {
            return false;
        }

        return data as boolean;
    } catch (err) {
        return false;
    }
};

/**
 * 取得所有風格並標記擁有狀態
 */
export const getStylesWithOwnership = async (userId: string): Promise<StyleWithOwnership[]> => {
    try {
        // 取得所有風格
        const styles = await getAllStyles();

        // 取得用戶擁有的風格
        const ownedStyles = await getUserOwnedStyles(userId);
        const ownedMap = new Map(ownedStyles.map(s => [s.style_id, s.purchased_at]));

        // 合併資訊
        return styles.map(style => ({
            ...style,
            is_owned: style.is_free || ownedMap.has(style.id),
            purchased_at: ownedMap.get(style.id),
        }));
    } catch (err) {
        console.error('[CardStyleService] getStylesWithOwnership error:', err);
        return [];
    }
};

// ============================================
// 購買風格
// ============================================

/**
 * 購買風格
 */
export const purchaseStyle = async (
    userId: string,
    styleId: string,
    amount: number,
    transactionId?: string
): Promise<{ success: boolean; message: string }> => {
    try {
        // 檢查是否已擁有
        const { data: owned, error: checkError } = await supabase
            .from('user_card_styles')
            .select('id')
            .eq('user_id', userId)
            .eq('style_id', styleId)
            .single();

        if (!checkError && owned) {
            return { success: false, message: '您已擁有此風格' };
        }

        // 執行購買
        const { data, error } = await supabase.rpc('purchase_card_style', {
            p_user_id: userId,
            p_style_id: styleId,
            p_amount: amount,
            p_transaction_id: transactionId,
        });

        if (error) {
            console.error('[CardStyleService] purchaseStyle failed:', error);
            return { success: false, message: '購買失敗，請稍後再試' };
        }

        if (!data) {
            return { success: false, message: '購買失敗' };
        }

        return { success: true, message: '購買成功！風格已解鎖' };
    } catch (err) {
        console.error('[CardStyleService] purchaseStyle error:', err);
        return { success: false, message: '系統錯誤' };
    }
};

/**
 * 創建風格購買訂單
 */
export const createStylePurchaseOrder = async (
    userId: string,
    styleId: string,
    amount: number,
    provider?: string
): Promise<string | null> => {
    try {
        const { data, error } = await supabase
            .from('style_purchases')
            .insert({
                user_id: userId,
                style_id: styleId,
                amount,
                status: 'pending',
                payment_provider: provider,
            })
            .select('id')
            .single();

        if (error) {
            console.error('[CardStyleService] createStylePurchaseOrder failed:', error);
            return null;
        }

        return data.id;
    } catch (err) {
        console.error('[CardStyleService] createStylePurchaseOrder error:', err);
        return null;
    }
};

/**
 * 完成風格購買
 */
export const completeStylePurchase = async (
    orderId: string,
    transactionId: string
): Promise<boolean> => {
    try {
        // 取得訂單資訊
        const { data: order, error: fetchError } = await supabase
            .from('style_purchases')
            .select('*')
            .eq('id', orderId)
            .single();

        if (fetchError || !order) {
            return false;
        }

        // 更新訂單狀態
        await supabase
            .from('style_purchases')
            .update({
                status: 'completed',
                provider_transaction_id: transactionId,
                completed_at: new Date().toISOString(),
            })
            .eq('id', orderId);

        // 執行購買
        const result = await purchaseStyle(
            order.user_id,
            order.style_id,
            order.amount,
            transactionId
        );

        return result.success;
    } catch (err) {
        console.error('[CardStyleService] completeStylePurchase error:', err);
        return false;
    }
};

// ============================================
// 用戶當前使用的風格
// ============================================

/**
 * 設定用戶當前使用的風格
 */
export const setActiveStyle = async (userId: string, styleKey: string): Promise<boolean> => {
    try {
        // 檢查是否擁有
        const owns = await userOwnsStyle(userId, styleKey);
        if (!owns) {
            return false;
        }

        // 更新 user_profiles
        const { error } = await supabase
            .from('user_profiles')
            .update({
                active_card_style: styleKey,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', userId);

        if (error) {
            console.error('[CardStyleService] setActiveStyle failed:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('[CardStyleService] setActiveStyle error:', err);
        return false;
    }
};

/**
 * 取得用戶當前使用的風格
 */
export const getActiveStyle = async (userId: string): Promise<string> => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('active_card_style')
            .eq('user_id', userId)
            .single();

        if (error || !data?.active_card_style) {
            return 'classic';  // 預設風格
        }

        return data.active_card_style;
    } catch (err) {
        return 'classic';
    }
};

// ============================================
// 輔助函數
// ============================================

/**
 * 格式化價格
 */
export const formatStylePrice = (style: CardStyle): string => {
    if (style.is_free) {
        return '免費';
    }
    return `NT$ ${style.price.toLocaleString()}`;
};

/**
 * 取得風格的牌卡圖片路徑
 */
export const getCardImagePath = (styleKey: string, cardId: number): string => {
    return `/assets/cards/${styleKey}/${cardId}.webp`;
};
