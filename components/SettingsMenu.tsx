/**
 * 設定選單（漢堡選單）
 * 左上角三槓圖示，主題設定和功能選單
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { supabase } from '../services/supabaseClient';
import { supabaseSignOut } from '../services/supabaseAuthService';

const SettingsMenu: React.FC = () => {
    const { currentTheme, setTheme, themes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // 🔒 管理員郵箱列表（只有這些郵箱才能看到後台管理）
    const ADMIN_EMAILS = [
        'alexintab@gmail.com',  // 主管理員
        'admin@majorarcana.app',
        // 在這裡添加更多管理員郵箱
    ];



    // 檢查登入狀態
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setIsLoggedIn(true);
                setUserEmail(user.email || null);
                setIsAdmin(ADMIN_EMAILS.includes(user.email || ''));
            } else {
                setIsLoggedIn(false);
                setUserEmail(null);
                setIsAdmin(false);
            }
        };
        checkAuth();

        // 監聽 auth 狀態變化
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setIsLoggedIn(true);
                setUserEmail(session.user.email || null);
                setIsAdmin(ADMIN_EMAILS.includes(session.user.email || ''));
            } else {
                setIsLoggedIn(false);
                setUserEmail(null);
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // 處理登出
    const handleLogout = async () => {
        await supabaseSignOut();
        window.location.reload();
    };



    return (
        <div className="fixed top-6 left-6 z-[100]">
            {/* 漢堡選單按鈕 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-110 active:scale-95 bg-black/60 border border-[#d4af37]/30 shadow-lg"
                title="設定"
            >
                <span className={`block w-5 h-0.5 bg-[#d4af37] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-[#d4af37] transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-[#d4af37] transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* 展開選單 */}
            {isOpen && (
                <>
                    {/* 背景遮罩 */}
                    <div
                        className="fixed inset-0 bg-black/50 z-[-1]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 選單面板 */}
                    <div
                        className="absolute top-14 left-0 w-72 rounded-2xl overflow-hidden animate-fade-up"
                        style={{
                            background: 'rgba(10, 5, 5, 0.95)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
                        }}
                    >
                        {/* 主題設定區塊 */}
                        <div className="p-4 border-b border-[#d4af37]/20">
                            <p className="text-xs font-cinzel tracking-widest text-[#d4af37]/60 uppercase mb-3">
                                🎨 主題風格
                            </p>
                            <div className="space-y-2">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => {
                                            setTheme(theme.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 ${currentTheme === theme.id ? 'bg-[#d4af37]/10 border border-[#d4af37]/40' : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{
                                                background: `linear-gradient(135deg, ${theme.primaryColor}30, ${theme.primaryColor}60)`,
                                                border: `2px solid ${theme.primaryColor}`
                                            }}
                                        >
                                            <span>{theme.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-cinzel font-bold text-sm" style={{ color: theme.primaryColor }}>
                                                {theme.nameZh}
                                            </p>
                                        </div>
                                        {currentTheme === theme.id && (
                                            <span className="text-[#d4af37]">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 功能導航區塊 */}
                        <div className="p-4">
                            <p className="text-xs font-cinzel tracking-widest text-[#d4af37]/60 uppercase mb-3">
                                📍 功能選單
                            </p>
                            <div className="space-y-2">
                                <a
                                    href="/profile"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'profile' }));
                                        setIsOpen(false);
                                    }}
                                    className="w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 hover:bg-white/5"
                                >
                                    <span className="text-xl">👤</span>
                                    <span className="text-sm text-[#d4af37]">個人中心</span>
                                </a>
                                <a
                                    href="/card-styles"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'cardStyles' }));
                                        setIsOpen(false);
                                    }}
                                    className="w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 hover:bg-white/5"
                                >
                                    <span className="text-xl">🎴</span>
                                    <span className="text-sm text-[#d4af37]">牌面風格商店</span>
                                </a>
                                <a
                                    href="/pricing"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'pricing' }));
                                        setIsOpen(false);
                                    }}
                                    className="w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 hover:bg-white/5"
                                >
                                    <span className="text-xl">💎</span>
                                    <span className="text-sm text-[#d4af37]">升級 VIP / 購買點數</span>
                                </a>

                                {/* 🔒 後台管理 - 只有管理員可見 */}
                                {isAdmin && (
                                    <a
                                        href="/admin"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open('/admin.html', '_blank');
                                            setIsOpen(false);
                                        }}
                                        className="w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 hover:bg-white/5 opacity-60"
                                    >
                                        <span className="text-xl">⚙️</span>
                                        <span className="text-sm text-[#d4af37]">後台管理</span>
                                    </a>
                                )}

                                {/* 登入/登出區塊 */}
                                <div className="border-t border-[#d4af37]/20 mt-2 pt-2">
                                    {isLoggedIn ? (
                                        <>
                                            <div className="px-3 py-2 text-xs text-gray-400 truncate">
                                                {userEmail}
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 hover:bg-red-500/10"
                                            >
                                                <span className="text-xl">🚪</span>
                                                <span className="text-sm text-red-400">登出</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                window.dispatchEvent(new CustomEvent('navigate', { detail: 'auth' }));
                                                setIsOpen(false);
                                            }}
                                            className="w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 hover:bg-white/5"
                                        >
                                            <span className="text-xl">🔑</span>
                                            <span className="text-sm text-green-400">登入 / 註冊</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SettingsMenu;
