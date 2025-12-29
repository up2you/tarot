/**
 * 顯示設定 Hook
 * 使用 localStorage 儲存各裝置獨立的顯示設定
 */

import { useState, useEffect, useCallback } from 'react';
import { DisplaySettings, MobileCardDisplayMode } from '../types';

const STORAGE_KEY = 'aetheris_display_settings';

const DEFAULT_SETTINGS: DisplaySettings = {
    mobileCardDisplayMode: 'grid', // 預設並列格子
};

export function useDisplaySettings() {
    const [settings, setSettings] = useState<DisplaySettings>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    // 載入設定
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as DisplaySettings;
                setSettings({ ...DEFAULT_SETTINGS, ...parsed });
            }
        } catch (error) {
            console.error('Failed to load display settings:', error);
        }
        setIsLoaded(true);
    }, []);

    // 儲存設定
    const saveSettings = useCallback((newSettings: Partial<DisplaySettings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save display settings:', error);
            }
            return updated;
        });
    }, []);

    // 設定手機顯示模式
    const setMobileDisplayMode = useCallback((mode: MobileCardDisplayMode) => {
        saveSettings({ mobileCardDisplayMode: mode });
    }, [saveSettings]);

    return {
        settings,
        isLoaded,
        setMobileDisplayMode,
        saveSettings,
    };
}
