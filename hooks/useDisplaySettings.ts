/**
 * 顯示設定 Hook
 * 從 Supabase 讀取全域顯示設定
 */

import { useState, useEffect } from 'react';
import { DisplaySettings, MobileCardDisplayMode } from '../types';
import { getSettings } from '../services/settingsService';

const DEFAULT_SETTINGS: DisplaySettings = {
    mobileCardDisplayMode: 'grid', // 預設並列格子
};

export function useDisplaySettings() {
    const [settings, setSettings] = useState<DisplaySettings>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    // 從 Supabase 載入設定
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const appSettings = await getSettings();
                setSettings({
                    mobileCardDisplayMode: appSettings.mobile_display_mode || 'grid',
                });
            } catch (error) {
                console.error('Failed to load display settings from Supabase:', error);
            }
            setIsLoaded(true);
        };
        loadSettings();
    }, []);

    return {
        settings,
        isLoaded,
    };
}
