
import React, { useState } from 'react';
import { registerUser, loginUser, googleUpsertUser } from '../services/authService';
import { User } from '../types';

interface AuthFormProps {
  onSuccess: (user: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const user = await loginUser(username, password);
        if (user) {
          onSuccess(user);
        } else {
          setError('身份驗證失敗：帳號或密碼錯誤。');
        }
      } else {
        const success = await registerUser(username, password);
        if (success) {
          setIsLogin(true);
          setError('契約締結成功，請揭示您的身份以進入聖殿。');
        } else {
          setError('締結失敗：此帳號已存在。');
        }
      }
    } catch (err) {
      setError('聖殿連線中斷，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    // 模擬 Google OAuth 授權流程
    setTimeout(async () => {
      try {
        const mockEmail = "divine.seeker@google.com";
        const mockName = "Google 求道者";
        const user = await googleUpsertUser(mockEmail, mockName);
        onSuccess(user);
      } catch (err) {
        setError('Google 靈魂印記感應失敗。');
        setLoading(false);
      }
    }, 1800);
  };

  return (
    <div className="w-full max-w-md mx-auto baroque-border-outer bg-black/90 p-12 rounded-[3rem] gold-glow-heavy animate-fade-in relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/damask.png')] pointer-events-none"></div>
      
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-cinzel text-[#d4af37] mb-8 tracking-[0.3em] font-black uppercase">
          {isLogin ? '身分揭示' : '契約締結'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              required
              placeholder="聖殿帳號"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-[#d4af37]/30 rounded-full px-6 py-4 text-[#d4af37] placeholder-[#d4af37]/20 focus:outline-none focus:border-[#d4af37] transition-all font-lora italic"
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              required
              placeholder="靈魂密鑰"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-[#d4af37]/30 rounded-full px-6 py-4 text-[#d4af37] placeholder-[#d4af37]/20 focus:outline-none focus:border-[#d4af37] transition-all font-lora italic"
            />
          </div>

          {error && <p className="text-red-500/80 text-xs italic font-lora">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#d4af37] text-black font-cinzel font-black tracking-widest hover:brightness-125 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading && !username ? '連通中...' : (isLogin ? '進入聖殿' : '完成締結')}
          </button>
        </form>

        {/* 分隔線 */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/40"></div>
          <span className="text-[10px] font-cinzel text-[#d4af37]/30 tracking-widest uppercase">或以靈魂印記感應</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/40"></div>
        </div>

        {/* Google 登入按鈕 */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 rounded-full border border-[#d4af37]/40 flex items-center justify-center gap-4 bg-[#1a0000] hover:bg-black transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.32-2.12 4.4-1.2 1.08-2.68 1.88-5.72 1.88-5.04 0-9.12-4.12-9.12-9.2s4.08-9.2 9.12-9.2c2.72 0 4.84 1.08 6.36 2.48l2.44-2.44C19.28 1.12 16.32 0 12.48 0 5.64 0 0 5.64 0 12.48s5.64 12.48 12.48 12.48c3.76 0 6.6-1.24 8.76-3.52 2.24-2.24 2.96-5.44 2.96-8.04 0-.52-.04-1.04-.12-1.48h-11.6z"/>
          </svg>
          <span className="text-[#d4af37] font-cinzel text-xs tracking-[0.2em] font-bold">以 Google 帳號揭示身分</span>
          
          {loading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>

        <div className="mt-8">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#d4af37]/40 text-xs font-cinzel tracking-widest hover:text-[#d4af37] transition-colors"
          >
            {isLogin ? '尚未締結契約？前往註冊' : '已有契約？返回登入'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
