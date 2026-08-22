import React from 'react';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { GoogleLoginButton } from './GoogleLoginButton';
import { MagicLinkButton } from './MagicLinkButton';

interface LoginCardProps {
  mode: 'login' | 'register' | 'forgot' | 'magic';
  setMode: (mode: 'login' | 'register' | 'forgot' | 'magic') => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (pwd: string) => void;
  displayName?: string;
  setDisplayName?: (name: string) => void;
  isLoading: boolean;
  message: { type: 'success' | 'error' | 'info'; text: string } | null;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
  onMagicLinkClick: () => void;
  t: (key: string) => string;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  mode,
  setMode,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword = '',
  setConfirmPassword,
  displayName = '',
  setDisplayName,
  isLoading,
  message,
  onSubmit,
  onGoogleLogin,
  onMagicLinkClick,
  t,
}) => {
  return (
    <div className="w-full max-w-md mx-auto relative group">
      {/* 卡片後方紫金色柔光暈 (Backdrop Glow) */}
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-b from-[#7B4DFF]/30 via-[#D4AF37]/20 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* 獨立 Login Card 容器 (深半透明玻璃質感 + 金色細線邊框 + 拱門裝飾 Header) */}
      <div className="relative rounded-[28px] bg-[#130E26]/85 border border-[#D4AF37]/40 shadow-[0_15px_50px_rgba(11,9,32,0.9),0_0_30px_rgba(123,77,255,0.15)] backdrop-blur-xl p-6 sm:p-8 overflow-hidden">
        
        {/* 卡片頂部典雅弧形拱門與八角星飾紋 (Top Arch Crest & Glowing 8-Point Star) */}
        <div className="flex flex-col items-center mb-6 pt-2">
          {/* 上方幾何拱門圖騰與放射星芒 */}
          <div className="relative w-16 h-12 flex items-center justify-center mb-2">
            <svg className="w-16 h-12" viewBox="0 0 60 45" fill="none">
              <path d="M5 45 L5 25 C5 10, 20 2, 30 2 C40 2, 55 10, 55 25 L55 45" stroke="#D4AF37" strokeWidth="1" strokeDasharray="60" strokeDashoffset="0" opacity="0.6"/>
              <path d="M12 45 L12 25 C12 15, 22 8, 30 8 C38 8, 48 15, 48 25 L48 45" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
            </svg>
            
            {/* 中心發光八角星 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#F6E7B7] drop-shadow-[0_0_10px_rgba(246,231,183,0.9)] animate-pulse">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                <path d="M20 2 L22.5 15 L35 11.5 L25 20 L35 28.5 L22.5 25 L20 38 L17.5 25 L5 28.5 L15 20 L5 11.5 L17.5 15 Z" fill="url(#crestStar)"/>
                <circle cx="20" cy="20" r="2.5" fill="#FFF"/>
                <defs>
                  <linearGradient id="crestStar" x1="5" y1="2" x2="35" y2="38">
                    <stop stopColor="#FFF3D1"/>
                    <stop offset="0.6" stopColor="#D4AF37"/>
                    <stop offset="1" stopColor="#AA7C11"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* 歡迎標題 (Welcome Title) */}
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF3D1] to-[#D4AF37] tracking-wider mb-2 flex items-center gap-2">
            <span className="text-xs text-[#D4AF37]">⟡</span>
            <span>
              {mode === 'register'
                ? t('auth.register_title') || '建立帳號'
                : mode === 'forgot'
                ? t('auth.forgot_title') || '重設密碼'
                : mode === 'magic'
                ? t('auth.magic_title') || '魔法連結登入'
                : t('auth.login_title') || '歡迎回來'}
            </span>
            <span className="text-xs text-[#D4AF37]">⟡</span>
          </h2>

          {/* 歡迎副標題 (Welcome Subtitle) */}
          <p className="text-xs sm:text-sm text-[#8A8A9E] font-serif tracking-wide text-center">
            {mode === 'register'
              ? t('auth.register_desc') || '建立新帳號以展開靈魂探索'
              : mode === 'forgot'
              ? t('auth.forgot_desc') || '輸入電子郵件以接收密碼重設連結'
              : mode === 'magic'
              ? t('auth.magic_desc') || '輸入電子郵件即可接收無密碼登入連結'
              : t('auth.welcome_sub') || '請登入以繼續你的塔羅之旅'}
          </p>
        </div>

        {/* 系統訊息提示區 (Success / Error Message Toast) */}
        {message && (
          <div
            className={`mb-5 px-4 py-3 rounded-xl text-xs sm:text-sm border shadow-lg transition-all duration-300 ${
              message.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : message.type === 'error'
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                : 'bg-purple-950/60 border-purple-500/50 text-purple-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{message.type === 'success' ? '✦' : '⚠️'}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* 主表單 (Main Form) */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* 註冊時額外顯示暱稱 */}
          {mode === 'register' && setDisplayName && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-0.5">
                {t('auth.nickname') || '使用者暱稱'}
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t('auth.nickname_placeholder') || '請輸入暱稱'}
                required
                className="w-full bg-[#18112C]/90 text-gray-100 placeholder-[#605B73] text-sm sm:text-base rounded-xl py-3 px-4 border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#7B4DFF]/40 outline-none transition-all"
              />
            </div>
          )}

          {/* Email 輸入框 */}
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={t('auth.email') || '電子郵件'}
            placeholder="your@email.com"
            disabled={isLoading}
          />

          {/* 密碼與忘記密碼 (除 magic & forgot 模式外均顯示) */}
          {(mode === 'login' || mode === 'register') && (
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={t('auth.password') || '密碼'}
              placeholder="••••••••"
              disabled={isLoading}
              showForgotPassword={mode === 'login'}
              forgotPasswordText={t('auth.forgot_password') || '忘記密碼？'}
              onForgotPassword={() => setMode('forgot')}
            />
          )}

          {/* 註冊時確認密碼 */}
          {mode === 'register' && setConfirmPassword && (
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label={t('auth.confirm_password') || '確認密碼'}
              placeholder="••••••••"
              disabled={isLoading}
              showForgotPassword={false}
            />
          )}

          {/* 主要送出按鈕 (Login / Submit Button) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-[#6B38FB] via-[#8E44AD] to-[#5B2C6F] border border-[#D4AF37]/60 rounded-xl text-[#F6E7B7] font-serif font-bold text-base sm:text-lg tracking-widest shadow-[0_0_20px_rgba(123,77,255,0.4)] hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xs text-[#D4AF37] group-hover/btn:scale-125 transition-transform">✦</span>
              <span>
                {isLoading
                  ? t('auth.sending') || '處理中...'
                  : mode === 'register'
                  ? t('auth.register') || '建立帳號'
                  : mode === 'forgot'
                  ? t('auth.send_reset') || '傳送重設連結'
                  : mode === 'magic'
                  ? t('auth.send_magic') || '傳送魔法連結'
                  : t('auth.login') || '登入'}
              </span>
              <span className="text-xs text-[#D4AF37] group-hover/btn:scale-125 transition-transform">✦</span>
            </button>
          </div>
        </form>

        {/* 模式為一般登入時顯示分隔線與第三方登入 */}
        {mode === 'login' && (
          <>
            {/* 分隔線 (Divider) */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full border-t border-[#D4AF37]/20" />
              <span className="absolute bg-[#130E26] px-4 text-xs font-serif text-[#8A8A9E]">
                {t('auth.or') || '或'}
              </span>
            </div>

            {/* Google 登入按鈕 */}
            <div className="mb-4">
              <GoogleLoginButton
                onClick={onGoogleLogin}
                isLoading={isLoading}
                text={t('auth.google_login') || '使用 Google 登入'}
              />
            </div>
          </>
        )}

        {/* 註冊 / 登入 模式切換連結 */}
        <div className="mt-5 text-center text-xs sm:text-sm font-serif">
          {mode === 'login' ? (
            <p className="text-gray-400">
              {t('auth.no_account_prefix') || '還沒有帳號？'}{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-[#D4AF37] font-semibold hover:text-[#F6E7B7] hover:underline transition-colors cursor-pointer"
              >
                {t('auth.register_now') || '立即註冊'}
              </button>
            </p>
          ) : (
            <p className="text-gray-400">
              {t('auth.has_account_prefix') || '已有帳號？'}{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#D4AF37] font-semibold hover:text-[#F6E7B7] hover:underline transition-colors cursor-pointer"
              >
                {t('auth.back_to_login') || '返回登入'}
              </button>
            </p>
          )}
        </div>

        {/* 魔法連結登入 (Magic Link Button) */}
        {mode === 'login' && (
          <div className="mt-3">
            <MagicLinkButton
              onClick={onMagicLinkClick}
              isLoading={isLoading}
              text={t('auth.use_magic_link') || '✦ 魔法連結登入'}
            />
          </div>
        )}

        {/* 底部條款與隱私權宣告 (Legal & Terms Text) */}
        <div className="mt-6 pt-4 border-t border-gray-800/60 text-center">
          <p className="text-[11px] sm:text-xs text-[#6E6B80] leading-relaxed">
            {t('auth.terms_prefix') || '登入即表示您同意我們的'}{' '}
            <a href="#" className="text-[#8A8A9E] hover:text-[#D4AF37] underline transition-colors">
              {t('auth.terms_service') || '服務條款'}
            </a>
            {t('auth.terms_and') || ' 和 '}
            <a href="#" className="text-[#8A8A9E] hover:text-[#D4AF37] underline transition-colors">
              {t('auth.privacy_policy') || '隱私政策'}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};
