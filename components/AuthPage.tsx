/**
 * 登入/註冊頁面
 */

import React, { useState, useEffect } from 'react';
import {
    supabaseSignIn,
    supabaseSignUp,
    supabaseSignInWithGoogle,
    supabaseSignInWithMagicLink,
    supabaseSendPasswordReset,
} from '../services/supabaseAuthService';

type AuthMode = 'login' | 'register' | 'forgot' | 'magic';

interface AuthPageProps {
    onAuthSuccess?: () => void;
    initialMode?: AuthMode;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, initialMode = 'login' }) => {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

    // 處理登入
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const result = await supabaseSignIn(email, password);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            if (onAuthSuccess) {
                setTimeout(onAuthSuccess, 1000);
            }
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setIsLoading(false);
    };

    // 處理註冊
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: '密碼不一致' });
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: '密碼至少需要 6 個字元' });
            setIsLoading(false);
            return;
        }

        const result = await supabaseSignUp(email, password, displayName);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
        } else {
            setMessage({ type: 'error', text: result.message });
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
            setMessage({ type: 'success', text: result.message });
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setIsLoading(false);
    };

    // 處理 Magic Link
    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const result = await supabaseSignInWithMagicLink(email);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setIsLoading(false);
    };

    // 處理 Google 登入
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        await supabaseSignInWithGoogle();
        setIsLoading(false);
    };

    // 清除訊息
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const getTitle = (): string => {
        switch (mode) {
            case 'register': return '建立帳號';
            case 'forgot': return '重設密碼';
            case 'magic': return '魔法連結登入';
            default: return '歡迎回來';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/30 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🔮</div>
                    <h1 className="text-3xl font-bold text-white">塔羅占卜</h1>
                    <p className="text-gray-400 mt-2">探索命運的奧秘</p>
                </div>

                {/* 卡片 */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">{getTitle()}</h2>

                    {/* 訊息提示 */}
                    {message && (
                        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                message.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* 表單 */}
                    {mode === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">電子郵件</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">密碼</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? '登入中...' : '登入'}
                            </button>
                        </form>
                    )}

                    {mode === 'register' && (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">暱稱</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="您的暱稱"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">電子郵件</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">密碼</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="至少 6 個字元"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">確認密碼</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="再次輸入密碼"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? '註冊中...' : '建立帳號'}
                            </button>
                        </form>
                    )}

                    {mode === 'forgot' && (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <p className="text-gray-400 text-sm text-center mb-4">
                                輸入您的電子郵件，我們將發送密碼重設連結給您。
                            </p>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">電子郵件</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? '發送中...' : '發送重設連結'}
                            </button>
                        </form>
                    )}

                    {mode === 'magic' && (
                        <form onSubmit={handleMagicLink} className="space-y-4">
                            <p className="text-gray-400 text-sm text-center mb-4">
                                無需密碼！我們將發送一個魔法連結到您的信箱。
                            </p>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">電子郵件</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? '發送中...' : '發送魔法連結'}
                            </button>
                        </form>
                    )}

                    {/* 分隔線 */}
                    {(mode === 'login' || mode === 'register') && (
                        <>
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-700"></div>
                                <span className="px-4 text-gray-500 text-sm">或</span>
                                <div className="flex-1 border-t border-gray-700"></div>
                            </div>

                            {/* 社交登入 */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full bg-white text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                使用 Google 登入
                            </button>
                        </>
                    )}

                    {/* 切換模式連結 */}
                    <div className="mt-6 text-center space-y-2">
                        {mode === 'login' && (
                            <>
                                <button onClick={() => setMode('forgot')} className="text-gray-400 hover:text-white text-sm block w-full">
                                    忘記密碼？
                                </button>
                                <button onClick={() => setMode('magic')} className="text-amber-400 hover:text-amber-300 text-sm block w-full">
                                    ✨ 使用魔法連結登入
                                </button>
                                <p className="text-gray-500 text-sm pt-2">
                                    還沒有帳號？
                                    <button onClick={() => setMode('register')} className="text-amber-400 hover:text-amber-300 ml-1">
                                        立即註冊
                                    </button>
                                </p>
                            </>
                        )}
                        {mode === 'register' && (
                            <p className="text-gray-500 text-sm">
                                已有帳號？
                                <button onClick={() => setMode('login')} className="text-amber-400 hover:text-amber-300 ml-1">
                                    立即登入
                                </button>
                            </p>
                        )}
                        {(mode === 'forgot' || mode === 'magic') && (
                            <button onClick={() => setMode('login')} className="text-amber-400 hover:text-amber-300 text-sm">
                                ← 返回登入
                            </button>
                        )}
                    </div>
                </div>

                {/* 底部說明 */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    登入即表示您同意我們的服務條款和隱私政策
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
