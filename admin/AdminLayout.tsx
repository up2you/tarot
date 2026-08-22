/**
 * 管理員後台佈局
 * 包含管理員權限驗證
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { isAdminEmail } from '../services/settingsService';
import { useToast } from '../components/Toast';

// 側邊欄選項
const MENU_ITEMS = [
    { id: 'dashboard', icon: '📊', label: '總覽' },
    { id: 'analytics', icon: '📈', label: '流量分析' },
    { id: 'revenue', icon: '💰', label: '收入報表' },
    { id: 'customers', icon: '👥', label: '客戶管理' },
    { id: 'media', icon: '🎵', label: '媒體管理' },
    { id: 'cards', icon: '🎨', label: '牌面管理' },
    { id: 'emails', icon: '✉️', label: '郵件通知' },
    { id: 'announcements', icon: '📢', label: '系統公告' },
    { id: 'settings', icon: '⚙️', label: '系統設定' },
];

interface AdminLayoutProps {
    children: React.ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage, onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [adminEmail, setAdminEmail] = useState<string>('');
    const toast = useToast();

    // 驗證管理員權限
    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                // 檢查登入狀態
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    console.warn('[AdminLayout] 未登入，重導向至首頁');
                    window.location.href = '/';
                    return;
                }

                // 檢查是否為管理員
                const isAdmin = await isAdminEmail(user.email || '');

                if (!isAdmin) {
                    console.warn('[AdminLayout] 非管理員帳號，重導向至首頁');
                    toast.error('您沒有管理員權限');
                    window.location.href = '/';
                    return;
                }

                // 驗證通過
                setAdminEmail(user.email || '');
                setIsVerifying(false);
            } catch (error) {
                console.error('[AdminLayout] 驗證失敗:', error);
                window.location.href = '/';
            }
        };

        verifyAdmin();
    }, []);

    // 登出功能
    const handleLogout = async () => {
        if (!confirm('確定要登出嗎？')) return;

        try {
            await supabase.auth.signOut();
            window.location.href = '/';
        } catch (error) {
            console.error('[AdminLayout] 登出失敗:', error);
            toast.error('登出失敗，請重試');
        }
    };

    // 驗證中顯示載入畫面
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">正在驗證管理員權限...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* 側邊欄 */}
            <aside
                className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
                    {!isCollapsed && (
                        <h1 className="text-lg font-bold text-amber-400 tracking-wider">
                            🎴 Admin
                        </h1>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-gray-400 hover:text-white p-2"
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>

                {/* 選單 */}
                <nav className="flex-1 py-4">
                    {MENU_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${currentPage === item.id
                                ? 'bg-amber-500/20 text-amber-400 border-r-2 border-amber-400'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {!isCollapsed && <span className="font-medium">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* 底部 */}
                <div className="p-4 border-t border-gray-700">
                    {!isCollapsed && (
                        <p className="text-xs text-gray-500 text-center">
                            Aetheris Admin v1.0
                        </p>
                    )}
                </div>
            </aside>

            {/* 主內容區 */}
            <main className="flex-1 flex flex-col">
                {/* 頂部導航 */}
                <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
                    <h2 className="text-xl font-bold text-white">
                        {MENU_ITEMS.find(m => m.id === currentPage)?.label || '後台管理'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-gray-500 text-xs">管理員</p>
                            <p className="text-gray-300 text-sm">{adminEmail}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm"
                        >
                            登出
                        </button>
                    </div>
                </header>

                {/* 頁面內容 */}
                <div className="flex-1 p-6 overflow-auto bg-gray-900">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
