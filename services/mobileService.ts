/**
 * Mobile Platform Utilities
 * 處理 Capacitor 原生功能整合
 */

import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { App } from '@capacitor/app';

/**
 * 檢查是否在原生平台運行
 */
export const isNativePlatform = (): boolean => {
    return Capacitor.isNativePlatform();
};

/**
 * 獲取當前平台
 */
export const getPlatform = (): 'ios' | 'android' | 'web' => {
    return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
};

/**
 * 初始化移動端設定
 */
export const initMobileApp = async (): Promise<void> => {
    if (!isNativePlatform()) return;

    try {
        // 設定狀態列
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#050505' });

        // 隱藏啟動畫面 (延遲以確保 UI 準備好)
        setTimeout(async () => {
            await SplashScreen.hide({
                fadeOutDuration: 500
            });
        }, 100);

        // 監聽返回鍵 (Android)
        App.addListener('backButton', ({ canGoBack }) => {
            if (canGoBack) {
                window.history.back();
            } else {
                // 在主頁面按返回鍵，最小化 app 而非退出
                App.minimizeApp();
            }
        });

        // 監聯應用狀態變化
        App.addListener('appStateChange', ({ isActive }) => {
            console.log('App state changed. Is active:', isActive);
        });

    } catch (error) {
        console.warn('Mobile init error:', error);
    }
};

/**
 * 觸發輕微震動反饋
 */
export const hapticFeedback = async (style: 'light' | 'medium' | 'heavy' = 'light'): Promise<void> => {
    if (!isNativePlatform()) return;

    try {
        const impactStyle = {
            light: ImpactStyle.Light,
            medium: ImpactStyle.Medium,
            heavy: ImpactStyle.Heavy,
        }[style];

        await Haptics.impact({ style: impactStyle });
    } catch (error) {
        console.warn('Haptic error:', error);
    }
};

/**
 * 觸發選擇震動
 */
export const hapticSelection = async (): Promise<void> => {
    if (!isNativePlatform()) return;

    try {
        await Haptics.selectionStart();
        await Haptics.selectionChanged();
        await Haptics.selectionEnd();
    } catch (error) {
        console.warn('Haptic selection error:', error);
    }
};

/**
 * 觸發通知震動
 */
export const hapticNotification = async (type: 'success' | 'warning' | 'error' = 'success'): Promise<void> => {
    if (!isNativePlatform()) return;

    try {
        const notificationType = {
            success: NotificationType.Success,
            warning: NotificationType.Warning,
            error: NotificationType.Error,
        }[type];

        await Haptics.notification({ type: notificationType });
    } catch (error) {
        console.warn('Haptic notification error:', error);
    }
};

/**
 * 顯示/隱藏狀態列
 */
export const toggleStatusBar = async (show: boolean): Promise<void> => {
    if (!isNativePlatform()) return;

    try {
        if (show) {
            await StatusBar.show();
        } else {
            await StatusBar.hide();
        }
    } catch (error) {
        console.warn('StatusBar error:', error);
    }
};
