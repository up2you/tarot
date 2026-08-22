/**
 * 塔羅占卜 App - 高階神秘奢華登入頁面 (Antigravity Spec)
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    supabaseSignIn,
    supabaseSignUp,
    supabaseSignInWithGoogle,
    supabaseSignInWithMagicLink,
    supabaseSendPasswordReset,
} from '../services/supabaseAuthService';

import { CosmicBackground } from './tarot/CosmicBackground';
import { TarotLogo } from './tarot/TarotLogo';
import { TarotCardsDisplay } from './tarot/TarotCard';
import { LoginCard } from './auth/LoginCard';
import { LanguageSelector } from './auth/LanguageSelector';

const LANGUAGE_OPTIONS = [
    { code: 'zh-TW', label: '🇹🇼 繁體中文' },
    { code: 'zh-CN', label: '🇨🇳 简体中文' },
    { code: 'en',    label: '🇺🇸 English' },
    { code: 'ja',    label: '🇯🇵 日本語' },
    { code: 'ko',    label: '🇰🇷 한국어' },
];

type AuthMode = 'login' | 'register' | 'forgot' | 'magic';

interface AuthPageProps {
    onAuthSuccess?: () => void;
    initialMode?: AuthMode;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, initialMode = 'login' }) => {
    const { t, i18n } = useTranslation();
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
    };

    // 處理登入
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const result = await supabaseSignIn(email, password);

        if (result.success) {
            setMessage({ type: 'success', text: result.message || '登入成功！' });
            if (onAuthSuccess) {
                setTimeout(onAuthSuccess, 800);
            }
        } else {
            setMessage({ type: 'error', text: result.message || '登入失敗，請檢查電子郵件或密碼' });
        }

        setIsLoading(false);
    };

    // 處理註冊
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: t('auth.password_mismatch') || '密碼與確認密碼不一致' });
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: t('auth.password_too_short') || '密碼長度至少需要 6 個字元' });
            setIsLoading(false);
            return;
        }

        const result = await supabaseSignUp(email, password, displayName);

        if (result.success) {
            setMessage({ type: 'success', text: result.message || '註冊成功！請至電子郵件收取驗證信件' });
        } else {
            setMessage({ type: 'error', text: result.message || '註冊失敗，請稍後再試' });
        }

        setIsLoading(false);
    };

    // 處理忘記密碼
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const result = await supabaseSendPasswordReset(email);

        if (result.success) {
            setMessage({ type: 'success', text: result.message || '重設密碼連結已傳送至您的電子郵件' });
        } else {
            setMessage({ type: 'error', text: result.message || '傳送失敗，請確認電子郵件地址' });
        }

        setIsLoading(false);
    };

    // 處理 Magic Link
    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (!email) {
            setMessage({ type: 'error', text: '請輸入電子郵件' });
            setIsLoading(false);
            return;
        }

        const result = await supabaseSignInWithMagicLink(email);

        if (result.success) {
            setMessage({ type: 'success', text: result.message || '魔法登入連結已傳送至您的電子郵件' });
        } else {
            setMessage({ type: 'error', text: result.message || '傳送失敗，請稍後再試' });
        }

        setIsLoading(false);
    };

    // 偵測是否為 App 內建瀏覽器 (Line, FB, etc.)
    const isInAppBrowser = () => {
        const ua = navigator.userAgent.toLowerCase();
        return (
            ua.indexOf('line') > -1 ||
            ua.indexOf('fban') > -1 ||
            ua.indexOf('fbav') > -1 ||
            ua.indexOf('instagram') > -1 ||
            ua.indexOf('micromessenger') > -1
        );
    };

    // 處理 Google 登入
    const handleGoogleLogin = async () => {
        if (isInAppBrowser()) {
            setMessage({
                type: 'error',
                text: t('auth.inapp_browser_warning') || '請使用系統瀏覽器 (Safari / Chrome) 開啟以使用 Google 登入'
            });
            return;
        }

        setIsLoading(true);
        await supabaseSignInWithGoogle();
        setIsLoading(false);
    };

    // 表單提交路由
    const handleFormSubmit = (e: React.FormEvent) => {
        switch (mode) {
            case 'register':
                return handleRegister(e);
            case 'forgot':
                return handleForgotPassword(e);
            case 'magic':
                return handleMagicLink(e);
            default:
                return handleLogin(e);
        }
    };

    // 自動定時清除訊息
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 6000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden selection:bg-[#7B4DFF]/30 selection:text-[#F6E7B7]">
            {/* 動態星空與宇宙景致背景 */}
            <CosmicBackground />

            {/* 頂部導覽列 / 右上角語言選擇器 */}
            <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 flex justify-end items-center">
                <LanguageSelector
                    currentLanguage={i18n.language || 'zh-TW'}
                    options={LANGUAGE_OPTIONS}
                    onLanguageChange={changeLanguage}
                />
            </header>

            {/* 中央主要 Layout 內容區 (桌面雙欄 1440px / 1920px，手機單欄) */}
            <main className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-4 sm:py-8 my-auto flex-1 flex items-center justify-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* 左側：塔羅品牌視覺與卡牌 Display (僅在桌面版 lg 以上顯示，手機版隱藏) */}
                    <div className="hidden lg:flex lg:col-span-7 flex-col items-center justify-center text-center py-2 lg:py-6">
                        {/* 品牌標誌與標題 */}
                        <TarotLogo />

                        {/* 三張塔羅卡 DOM 展示 (THE MOON, THE STAR, THE SUN) */}
                        <TarotCardsDisplay />
                    </div>

                    {/* 右側：登入 Card Shell (Col 5 on LG) */}
                    <div className="lg:col-span-5 flex justify-center items-center w-full py-2">
                        <LoginCard
                            mode={mode}
                            setMode={setMode}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            displayName={displayName}
                            setDisplayName={setDisplayName}
                            isLoading={isLoading}
                            message={message}
                            onSubmit={handleFormSubmit}
                            onGoogleLogin={handleGoogleLogin}
                            onMagicLinkClick={() => setMode('magic')}
                            t={t}
                        />
                    </div>

                </div>
            </main>

            {/* 頁尾留白 */}
            <footer className="relative z-10 w-full py-2" />
        </div>
    );
};

export default AuthPage;
