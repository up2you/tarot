/**
 * 系統設定頁面 - 包含維護模式開關
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { MobileCardDisplayMode } from '../../types';

// 從 localStorage 讀取顯示設定
const DISPLAY_STORAGE_KEY = 'aetheris_display_settings';

const getDisplaySettings = () => {
    try {
        const stored = localStorage.getItem(DISPLAY_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load display settings:', e);
    }
    return { mobileCardDisplayMode: 'grid' };
};

const saveDisplaySettings = (settings: { mobileCardDisplayMode: MobileCardDisplayMode }) => {
    try {
        localStorage.setItem(DISPLAY_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
        console.error('Failed to save display settings:', e);
    }
};

const SettingsPage: React.FC = () => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [maintenanceMessage, setMaintenanceMessage] = useState('系統維護中，請稍後再試');
    const [isSaving, setIsSaving] = useState(false);
    const [mobileDisplayMode, setMobileDisplayMode] = useState<MobileCardDisplayMode>('grid');

    // 載入設定
    useEffect(() => {
        const settings = getDisplaySettings();
        setMobileDisplayMode(settings.mobileCardDisplayMode || 'grid');
    }, []);

    const handleToggleMaintenance = async () => {
        setIsSaving(true);
        try {
            // TODO: 儲存到 Supabase
            setMaintenanceMode(!maintenanceMode);
            alert(maintenanceMode ? '維護模式已關閉' : '維護模式已開啟');
        } catch (error) {
            console.error('Failed to toggle maintenance mode:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDisplayModeChange = (mode: MobileCardDisplayMode) => {
        setMobileDisplayMode(mode);
        saveDisplaySettings({ mobileCardDisplayMode: mode });
    };

    const displayModes: { mode: MobileCardDisplayMode; label: string; desc: string; icon: string }[] = [
        { mode: 'grid', label: '並列格子', desc: '一次顯示所有牌', icon: '▦' },
        { mode: 'fullscreen', label: '全螢幕滑動', desc: '單牌沉浸式', icon: '▣' },
        { mode: 'carousel', label: '水平輪播', desc: '左右滑動切換', icon: '◧' },
    ];

    return (
        <div className="space-y-6">
            {/* 📱 手機牌陣顯示模式 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                    📱 手機牌陣顯示模式
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    設定手機版牌陣的顯示方式（僅影響當前裝置）
                </p>

                <div className="grid grid-cols-3 gap-4">
                    {displayModes.map(({ mode, label, desc, icon }) => (
                        <button
                            key={mode}
                            onClick={() => handleDisplayModeChange(mode)}
                            className={`p-4 rounded-lg border-2 transition-all text-center ${mobileDisplayMode === mode
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
                                }`}
                        >
                            <div className="text-3xl mb-2">{icon}</div>
                            <div className={`font-bold ${mobileDisplayMode === mode ? 'text-amber-400' : 'text-white'}`}>
                                {label}
                            </div>
                            <div className="text-gray-400 text-xs mt-1">{desc}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                    <p className="text-gray-400 text-sm">
                        💡 <strong className="text-white">提示：</strong>
                        「全螢幕滑動」模式下，凱爾特十字牌陣會分為「十字區」和「權杖柱」兩個分組顯示
                    </p>
                </div>
            </div>

            {/* 維護模式 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            🔧 維護模式
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            開啟後，一般用戶將無法訪問網站
                        </p>
                    </div>
                    <button
                        onClick={handleToggleMaintenance}
                        disabled={isSaving}
                        className={`relative w-16 h-8 rounded-full transition-all ${maintenanceMode ? 'bg-red-500' : 'bg-gray-600'
                            }`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${maintenanceMode ? 'left-9' : 'left-1'
                            }`} />
                    </button>
                </div>

                {maintenanceMode && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <label className="block text-red-400 text-sm font-medium mb-2">
                            維護訊息
                        </label>
                        <textarea
                            value={maintenanceMessage}
                            onChange={(e) => setMaintenanceMessage(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                            rows={3}
                        />
                    </div>
                )}
            </div>

            {/* 管理員設定 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                    👑 管理員設定
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            管理員 Email 白名單
                        </label>
                        <textarea
                            placeholder="admin@example.com&#10;manager@example.com"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                            rows={4}
                        />
                        <p className="text-gray-500 text-xs mt-1">每行一個 Email</p>
                    </div>
                </div>
            </div>

            {/* 其他設定 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                    ⚙️ 其他設定
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">允許新用戶註冊</p>
                            <p className="text-gray-400 text-sm">關閉後不接受新註冊</p>
                        </div>
                        <button className="w-12 h-6 bg-green-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">開放免費占卜</p>
                            <p className="text-gray-400 text-sm">關閉後僅 VIP 可使用</p>
                        </div>
                        <button className="w-12 h-6 bg-green-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 儲存按鈕 */}
            <div className="flex justify-end">
                <button className="px-8 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-all">
                    儲存設定
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
