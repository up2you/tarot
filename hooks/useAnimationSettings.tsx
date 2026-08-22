/**
 * 動畫演出風格 Context
 * 從後台 app_settings 讀取動畫設定，提供給全站元件使用
 * 若後台未設定（或讀取失敗），自動回退到本地預設值
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getSettings, ShuffleAnimationStyle, DealAnimationStyle, FlipAnimationStyle } from '../services/settingsService';

export interface AnimationSettings {
  shuffleStyle: ShuffleAnimationStyle;   // 洗牌動畫：'classic' | 'ritual'
  dealStyle: DealAnimationStyle;         // 發牌動畫：'fade' | 'arc'
  flipStyle: FlipAnimationStyle;         // 翻牌動畫：'standard' | 'physical'
  tiltEnabled: boolean;                  // 跟手 3D 傾斜
}

const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
  shuffleStyle: 'classic',
  dealStyle: 'fade',
  flipStyle: 'standard',
  tiltEnabled: false,
};

interface AnimationSettingsContextValue {
  settings: AnimationSettings;
  /** 將設定寫入 localStorage（裝置本地覆蓋，方便測試） */
  setLocalOverride: (settings: Partial<AnimationSettings>) => void;
  /** 清除本地覆蓋，回到後台設定 */
  clearLocalOverride: () => void;
}

const AnimationSettingsContext = createContext<AnimationSettingsContextValue>({
  settings: DEFAULT_ANIMATION_SETTINGS,
  setLocalOverride: () => {},
  clearLocalOverride: () => {},
});

const LOCAL_STORAGE_KEY = 'aetheris_animation_override';

export const AnimationSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AnimationSettings>(DEFAULT_ANIMATION_SETTINGS);

  // 從後台讀取設定（合併本地覆蓋）
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const appSettings = await getSettings();
        if (cancelled) return;

        // 本地覆蓋優先（用於測試 / 裝置級偏好）
        let localOverride: Partial<AnimationSettings> = {};
        try {
          const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (raw) localOverride = JSON.parse(raw);
        } catch { /* 忽略解析錯誤 */ }

        setSettings({
          shuffleStyle: localOverride.shuffleStyle || appSettings.shuffle_animation || 'classic',
          dealStyle: localOverride.dealStyle || appSettings.deal_animation || 'fade',
          flipStyle: localOverride.flipStyle || appSettings.flip_animation || 'standard',
          tiltEnabled: localOverride.tiltEnabled ?? appSettings.card_tilt ?? false,
        });
      } catch (err) {
        console.error('[AnimationSettings] 讀取後台設定失敗，使用預設值:', err);
        if (!cancelled) setSettings(DEFAULT_ANIMATION_SETTINGS);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const setLocalOverride = useCallback((partial: Partial<AnimationSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch { /* 忽略儲存失敗 */ }
      return next;
    });
  }, []);

  const clearLocalOverride = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch { /* 忽略 */ }
    // 重新從後台讀取
    getSettings().then(appSettings => {
      setSettings({
        shuffleStyle: appSettings.shuffle_animation || 'classic',
        dealStyle: appSettings.deal_animation || 'fade',
        flipStyle: appSettings.flip_animation || 'standard',
        tiltEnabled: appSettings.card_tilt ?? false,
      });
    }).catch(() => setSettings(DEFAULT_ANIMATION_SETTINGS));
  }, []);

  return (
    <AnimationSettingsContext.Provider value={{ settings, setLocalOverride, clearLocalOverride }}>
      {children}
    </AnimationSettingsContext.Provider>
  );
};

export const useAnimationSettings = (): AnimationSettingsContextValue => {
  const ctx = useContext(AnimationSettingsContext);
  if (!ctx) {
    throw new Error('useAnimationSettings 必須在 AnimationSettingsProvider 內使用');
  }
  return ctx;
};
