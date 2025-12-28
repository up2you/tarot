/**
 * 主題管理 Hook
 * 處理主題狀態、持久化和切換
 */

import { useState, useEffect, useCallback } from 'react';

export type ThemeId = 'baroque' | 'cyberpunk' | 'celestial';

export interface Theme {
    id: ThemeId;
    name: string;
    nameZh: string;
    description: string;
    primaryColor: string;
    icon: string;
}

export const THEMES: Theme[] = [
    {
        id: 'baroque',
        name: 'Baroque',
        nameZh: '巴洛克',
        description: '17世紀宮廷神秘學風格',
        primaryColor: '#d4af37',
        icon: '🏛️'
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        nameZh: '賽博龐克',
        description: '霓虹未來都市風格',
        primaryColor: '#00fff9',
        icon: '🌃'
    },
    {
        id: 'celestial',
        name: 'Celestial',
        nameZh: '星空',
        description: '銀河星辰夢幻風格',
        primaryColor: '#a78bfa',
        icon: '🌌'
    }
];

const THEME_STORAGE_KEY = 'aetheris-ui-theme';

export function useTheme() {
    const [currentTheme, setCurrentTheme] = useState<ThemeId>('baroque');

    // 初始化時從 localStorage 讀取
    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
        if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
            setCurrentTheme(savedTheme);
            document.body.setAttribute('data-theme', savedTheme);
        }
    }, []);

    // 切換主題
    const setTheme = useCallback((themeId: ThemeId) => {
        setCurrentTheme(themeId);
        localStorage.setItem(THEME_STORAGE_KEY, themeId);
        document.body.setAttribute('data-theme', themeId);
    }, []);

    // 獲取當前主題資訊
    const themeInfo = THEMES.find(t => t.id === currentTheme) || THEMES[0];

    return {
        currentTheme,
        setTheme,
        themeInfo,
        themes: THEMES
    };
}
