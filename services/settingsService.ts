/**
 * 應用程式設定服務
 * 管理 app_settings 資料表的 CRUD 操作
 */

import { supabase } from './supabaseClient';

// ── 動畫風格選項 ──────────────────────────────────────────────
export type ShuffleAnimationStyle = 'classic' | 'ritual';   // 洗牌動畫：經典抖動 / 儀式三幕
export type DealAnimationStyle = 'fade' | 'arc';            // 發牌動畫：原地浮現 / 弧線飛行
export type FlipAnimationStyle = 'standard' | 'physical';   // 翻牌動畫：標準翻轉 / 物理回彈+漣漪

export interface AppSettings {
    id: string;
    maintenance_mode: boolean;
    maintenance_message: string;
    admin_emails: string[];
    allow_registration: boolean;
    allow_free_reading: boolean;
    mobile_display_mode: 'grid' | 'fullscreen' | 'carousel';
    show_card_name_label: boolean;
    active_card_style: string;  // 新增：當前使用的牌面風格 ID
    // 🎬 動畫演出風格（後台可控制）
    shuffle_animation: ShuffleAnimationStyle;  // 洗牌動畫風格
    deal_animation: DealAnimationStyle;        // 發牌動畫風格
    flip_animation: FlipAnimationStyle;        // 翻牌動畫風格
    card_tilt: boolean;                        // 跟手 3D 傾斜開關
    updated_at: string;
}

const DEFAULT_SETTINGS: AppSettings = {
    id: 'global',
    maintenance_mode: false,
    maintenance_message: '系統維護中，請稍後再試',
    admin_emails: [],
    allow_registration: true,
    allow_free_reading: true,
    mobile_display_mode: 'grid',
    show_card_name_label: true,
    active_card_style: 'classic',  // 預設經典風格
    shuffle_animation: 'classic',  // 預設：經典洗牌抖動
    deal_animation: 'fade',        // 預設：原地浮現
    flip_animation: 'standard',    // 預設：標準翻轉
    card_tilt: false,              // 預設：關閉跟手傾斜
    updated_at: new Date().toISOString(),
};

/**
 * 讀取應用程式設定
 */
export const getSettings = async (): Promise<AppSettings> => {
    try {
        const { data, error } = await supabase
            .from('app_settings')
            .select('*')
            .eq('id', 'global')
            .single();

        if (error) {
            console.error('[Settings] Failed to load:', error);
            return DEFAULT_SETTINGS;
        }

        // 合併預設值：確保新欄位在舊資料庫中也有合理值
        return { ...DEFAULT_SETTINGS, ...(data as Partial<AppSettings>) } as AppSettings;
    } catch (err) {
        console.error('[Settings] Error:', err);
        return DEFAULT_SETTINGS;
    }
};

/**
 * 更新應用程式設定
 */
export const updateSettings = async (updates: Partial<AppSettings>): Promise<boolean> => {
    console.debug('[Settings] Attempting to update:', updates);

    try {
        const { data, error } = await supabase
            .from('app_settings')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', 'global')
            .select();

        console.debug('[Settings] Update response:', { data, error });

        if (error) {
            console.error('[Settings] Failed to update:', error);
            return false;
        }

        console.debug('[Settings] Update successful!');
        return true;
    } catch (err) {
        console.error('[Settings] Update error:', err);
        return false;
    }
};

/**
 * 檢查是否為管理員
 */
export const isAdminEmail = async (email: string): Promise<boolean> => {
    const settings = await getSettings();
    // 如果白名單為空，允許所有人（開發階段）
    if (settings.admin_emails.length === 0) {
        return true;
    }
    return settings.admin_emails.includes(email);
};

/**
 * 檢查維護模式
 */
export const checkMaintenanceMode = async (): Promise<{ active: boolean; message: string }> => {
    const settings = await getSettings();
    return {
        active: settings.maintenance_mode,
        message: settings.maintenance_message,
    };
};
