/**
 * 系統設定頁面 - 連接 Supabase 的完整實作
 */

import React, { useState, useEffect } from 'react';
import { MobileCardDisplayMode } from '../../types';
import { getSettings, updateSettings } from '../../services/settingsService';



const SettingsPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // 設定狀態
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [maintenanceMessage, setMaintenanceMessage] = useState('系統維護中，請稍後再試');
    const [adminEmails, setAdminEmails] = useState('');
    const [allowRegistration, setAllowRegistration] = useState(true);
    const [allowFreeReading, setAllowFreeReading] = useState(true);
    const [mobileDisplayMode, setMobileDisplayMode] = useState<MobileCardDisplayMode>('grid');

    // 載入設定
    useEffect(() => {
        const loadSettings = async () => {
            setIsLoading(true);
            try {
                const settings = await getSettings();
                setMaintenanceMode(settings.maintenance_mode);
                setMaintenanceMessage(settings.maintenance_message);
                setAdminEmails(settings.admin_emails.join('\n'));
                setAllowRegistration(settings.allow_registration);
                setAllowFreeReading(settings.allow_free_reading);

                setMobileDisplayMode(settings.mobile_display_mode || 'grid');
            } catch (error) {
                console.error('Failed to load settings:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadSettings();
    }, []);

    // 儲存所有設定
    const handleSaveAll = async () => {
        setIsSaving(true);
        setSaveMessage(null);
        try {
            const emailList = adminEmails
                .split('\n')
                .map(e => e.trim())
                .filter(e => e.length > 0);

            const success = await updateSettings({
                maintenance_mode: maintenanceMode,
                maintenance_message: maintenanceMessage,
                admin_emails: emailList,
                allow_registration: allowRegistration,
                allow_free_reading: allowFreeReading,
                mobile_display_mode: mobileDisplayMode,
            });

            if (success) {
                setSaveMessage({ type: 'success', text: '✅ 設定已儲存！' });
            } else {
                setSaveMessage({ type: 'error', text: '❌ 儲存失敗，請重試' });
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            setSaveMessage({ type: 'error', text: '❌ 發生錯誤' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveMessage(null), 3000);
        }
    };

    const handleDisplayModeChange = (mode: MobileCardDisplayMode) => {
        setMobileDisplayMode(mode);
        // 即時儲存到 Supabase
        updateSettings({ mobile_display_mode: mode });
    };

    const displayModes: { mode: MobileCardDisplayMode; label: string; desc: string; icon: string }[] = [
        { mode: 'grid', label: '並列格子', desc: '一次顯示所有牌', icon: '▦' },
        { mode: 'fullscreen', label: '全螢幕滑動', desc: '單牌沉浸式', icon: '▣' },
        { mode: 'carousel', label: '水平輪播', desc: '左右滑動切換', icon: '◧' },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">載入設定中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 儲存提示 */}
            {saveMessage && (
                <div className={`p-4 rounded-lg ${saveMessage.type === 'success' ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
                    <p className={saveMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                        {saveMessage.text}
                    </p>
                </div>
            )}

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
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`relative w-16 h-8 rounded-full transition-all ${maintenanceMode ? 'bg-red-500' : 'bg-gray-600'}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${maintenanceMode ? 'left-9' : 'left-1'}`} />
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
                            value={adminEmails}
                            onChange={(e) => setAdminEmails(e.target.value)}
                            placeholder="admin@example.com&#10;manager@example.com"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                            rows={4}
                        />
                        <p className="text-gray-500 text-xs mt-1">每行一個 Email（留空則允許所有人進入後台）</p>
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
                        <button
                            onClick={() => setAllowRegistration(!allowRegistration)}
                            className={`w-12 h-6 rounded-full relative transition-all ${allowRegistration ? 'bg-green-500' : 'bg-gray-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${allowRegistration ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">開放免費占卜</p>
                            <p className="text-gray-400 text-sm">關閉後僅 VIP 可使用</p>
                        </div>
                        <button
                            onClick={() => setAllowFreeReading(!allowFreeReading)}
                            className={`w-12 h-6 rounded-full relative transition-all ${allowFreeReading ? 'bg-green-500' : 'bg-gray-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${allowFreeReading ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 儲存按鈕 */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    className="px-8 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                            儲存中...
                        </>
                    ) : (
                        '儲存設定'
                    )}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
