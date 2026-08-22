import React from 'react';
import { useTranslation } from 'react-i18next';

export const TarotLogo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* 頂部雙金邊框與水晶球標誌 */}
      <div className="relative w-28 h-36 mb-6 flex items-center justify-center group">
        {/* 卡牌雙邊框造型 */}
        <div className="absolute inset-0 border-2 border-[#D4AF37]/60 rounded-2xl p-1 bg-[#150F2C]/60 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-105">
          <div className="w-full h-full border border-[#D4AF37]/30 rounded-xl flex items-center justify-center relative overflow-hidden">
            {/* 角落黃金四角星飾花 */}
            <div className="absolute top-1 left-1 text-[8px] text-[#D4AF37]">✦</div>
            <div className="absolute top-1 right-1 text-[8px] text-[#D4AF37]">✦</div>
            <div className="absolute bottom-1 left-1 text-[8px] text-[#D4AF37]">✦</div>
            <div className="absolute bottom-1 right-1 text-[8px] text-[#D4AF37]">✦</div>

            {/* 水晶球 SVG */}
            <svg className="w-20 h-24" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 底座 */}
              <ellipse cx="50" cy="100" rx="24" ry="6" fill="#8A641A" opacity="0.6" />
              <path d="M35 96 C35 88, 42 86, 50 86 C58 86, 65 88, 65 96 C65 100, 35 100, 35 96 Z" fill="url(#goldBase)" />
              <path d="M40 86 C40 80, 45 78, 50 78 C55 78, 60 80, 60 86 Z" fill="url(#goldBaseDark)" />
              
              {/* 水晶球本體 */}
              <circle cx="50" cy="50" r="32" fill="url(#crystalGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              
              {/* 水晶球內部神秘光圈與發光雲霧 */}
              <circle cx="50" cy="50" r="26" fill="url(#innerGlow)" opacity="0.8" />
              <ellipse cx="44" cy="42" rx="14" ry="8" fill="white" opacity="0.15" transform="rotate(-20 44 42)" />
              
              {/* 中心四角星 */}
              <path d="M50 36 L52.5 47 L63.5 49.5 L52.5 52 L50 63 L47.5 52 L36.5 49.5 L47.5 47 Z" fill="#FFF8DC" className="animate-pulse" />
              <path d="M50 42 L51.5 48 L57.5 49.5 L51.5 51 L50 57 L48.5 51 L42.5 49.5 L48.5 48 Z" fill="#F6E7B7" />

              {/* 小亮星點綴 */}
              <circle cx="62" cy="38" r="1.5" fill="#F6E7B7" opacity="0.9" />
              <circle cx="38" cy="60" r="1" fill="#F6E7B7" opacity="0.7" />

              {/* 漸層定義 */}
              <defs>
                <linearGradient id="goldBase" x1="35" y1="86" x2="65" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F6E7B7" />
                  <stop offset="0.5" stopColor="#D4AF37" />
                  <stop offset="1" stopColor="#99751D" />
                </linearGradient>
                <linearGradient id="goldBaseDark" x1="40" y1="78" x2="60" y2="86" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D4AF37" />
                  <stop offset="1" stopColor="#664D12" />
                </linearGradient>
                <linearGradient id="goldBorder" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F6E7B7" />
                  <stop offset="0.5" stopColor="#D4AF37" />
                  <stop offset="1" stopColor="#AA7C11" />
                </linearGradient>
                <radialGradient id="crystalGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#4A2E80" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#25164E" stopOpacity="0.95" />
                  <stop offset="85%" stopColor="#100A26" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0B071A" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#9B6DFF" stopOpacity="0.6" />
                  <stop offset="60%" stopColor="#5522AA" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#100A26" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* 標題與副標 (動態國際化) */}
      <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#FFF3D1] via-[#D4AF37] to-[#AA7C11] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] mb-3">
        {t('auth.welcome_title') || '塔羅占卜'}
      </h1>

      {/* 副標題裝飾 */}
      <div className="flex items-center gap-2 text-[#D4AF37]/90 text-sm tracking-widest font-serif">
        <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#D4AF37]/60"></span>
        <span className="text-[10px]">✦</span>
        <span className="text-[#F6E7B7] drop-shadow-[0_0_8px_rgba(246,231,183,0.3)]">
          {t('auth.welcome_subtitle') || '探索命運的奧秘'}
        </span>
        <span className="text-[10px]">✦</span>
        <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#D4AF37]/60"></span>
      </div>
    </div>
  );
};
