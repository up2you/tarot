/**
 * 應用程式設定服務
 * 管理 app_settings 資料表的 CRUD 操作
 */

import { supabase } from './supabaseClient';

export interface AppSettings {
    id: string;
    maintenance_mode: boolean;
    maintenance_message: string;
    admin_emails: string[];
    allow_registration: boolean;
    allow_free_reading: boolean;
    updated_at: string;
}

const DEFAULT_SETTINGS: AppSettings = {
    id: 'global',
    maintenance_mode: false,
    maintenance_message: '系統維護中，請稍後再試',
    admin_emails: [],
    allow_registration: true,
    allow_free_reading: true,
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

        return data as AppSettings;
    } catch (err) {
        console.error('[Settings] Error:', err);
        return DEFAULT_SETTINGS;
    }
};

/**
 * 更新應用程式設定
 */
export const updateSettings = async (updates: Partial<AppSettings>): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('app_settings')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', 'global');

        if (error) {
            console.error('[Settings] Failed to update:', error);
            return false;
        }

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
