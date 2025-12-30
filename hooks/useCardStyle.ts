/**
 * 牌面風格 Hook
 * 從後台設定讀取當前使用的牌面風格（管理員控制）
 */

import { useState, useEffect, useCallback } from 'react';
import { CARD_STYLES, CardStyle } from '../constants/cardStyles';
import { getStyleCardImages } from '../services/cardStorageService';
import { getSettings } from '../services/settingsService';

export interface CardStyleState {
    currentStyleId: string;
    currentStyle: CardStyle;
    getCardImageUrl: (cardIndex: number) => string | null;
    getBackImageUrl: () => string | null;
    styleImages: Map<number, string>;
    isLoading: boolean;
}

export function useCardStyle(): CardStyleState {
    const [currentStyleId, setCurrentStyleId] = useState<string>('classic');
    const [styleImages, setStyleImages] = useState<Map<number, string>>(new Map());
    const [isLoading, setIsLoading] = useState(true);

    // 從後台設定載入當前風格
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const settings = await getSettings();
                const styleId = settings.active_card_style || 'classic';
                setCurrentStyleId(styleId);
            } catch (err) {
                console.error('[useCardStyle] Failed to load settings:', err);
                setCurrentStyleId('classic');
            }
        };
        loadSettings();
    }, []);

    // 載入風格的圖片
    useEffect(() => {
        const loadImages = async () => {
            if (currentStyleId === 'classic') {
                // 經典風格使用本地圖片，不需要從 Supabase 載入
                setStyleImages(new Map());
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const images = await getStyleCardImages(currentStyleId);
                setStyleImages(images);
            } catch (err) {
                console.error('[useCardStyle] Failed to load images:', err);
                setStyleImages(new Map());
            } finally {
                setIsLoading(false);
            }
        };
        loadImages();
    }, [currentStyleId]);

    // 取得牌面圖片 URL
    const getCardImageUrl = useCallback((cardIndex: number): string | null => {
        if (currentStyleId === 'classic') {
            return null; // 經典風格使用預設圖片
        }
        return styleImages.get(cardIndex) || null;
    }, [currentStyleId, styleImages]);

    // 取得牌背圖片 URL
    const getBackImageUrl = useCallback((): string | null => {
        if (currentStyleId === 'classic') {
            return null; // 經典風格使用預設牌背
        }
        return styleImages.get(-1) || null;
    }, [currentStyleId, styleImages]);

    const currentStyle = CARD_STYLES.find(s => s.id === currentStyleId) || CARD_STYLES[0];

    return {
        currentStyleId,
        currentStyle,
        getCardImageUrl,
        getBackImageUrl,
        styleImages,
        isLoading,
    };
}
