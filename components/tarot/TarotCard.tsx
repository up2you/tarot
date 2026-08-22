import React from 'react';
import { useTranslation } from 'react-i18next';

export const TarotCardsDisplay: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center my-6 sm:my-8 w-full max-w-lg">
      {/* 3張卡牌重疊擺放 */}
      <div className="relative flex items-center justify-center w-full h-[280px] sm:h-[340px]">
        
        {/* 左側卡牌: XVIII THE MOON */}
        <div 
          className="absolute left-[10%] sm:left-[15%] w-[130px] sm:w-[160px] h-[220px] sm:h-[270px] rounded-xl border-2 border-[#D4AF37]/70 bg-[#120B24] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(123,77,255,0.25)] transform -rotate-[12deg] -translate-y-2 hover:rotate-[-6deg] hover:translate-y-[-10px] hover:z-30 transition-all duration-500 z-10 overflow-hidden cursor-pointer"
        >
          <div className="w-full h-full border border-[#D4AF37]/40 rounded-lg p-2 flex flex-col justify-between items-center bg-gradient-to-b from-[#1E1136] via-[#120B24] to-[#0A0618] relative">
            <span className="text-[10px] sm:text-xs font-serif text-[#D4AF37] tracking-widest">XVIII</span>
            
            {/* 月亮圖騰 SVG */}
            <div className="w-full flex-1 flex items-center justify-center relative my-1">
              <svg className="w-full h-full max-h-[160px]" viewBox="0 0 100 140" fill="none">
                {/* 繁星點點 */}
                <circle cx="20" cy="20" r="1" fill="#F6E7B7" opacity="0.8"/>
                <circle cx="80" cy="30" r="1" fill="#F6E7B7" opacity="0.8"/>
                <circle cx="30" cy="80" r="1.2" fill="#F6E7B7" opacity="0.9"/>
                <circle cx="75" cy="90" r="1" fill="#F6E7B7" opacity="0.6"/>

                {/* 彎月與太陽交融圖騰 */}
                <path d="M50 20 C66 20, 80 34, 80 50 C80 66, 66 80, 50 80 C40 80, 32 75, 27 67 C35 67, 44 60, 44 50 C44 40, 35 33, 27 33 C32 25, 40 20, 50 20 Z" fill="url(#moonGold)"/>
                <circle cx="38" cy="50" r="18" fill="#120B24" />
                <path d="M38 34 C47 34, 54 41, 54 50 C54 59, 47 66, 38 66 Z" fill="#F6E7B7" opacity="0.9"/>
                
                {/* 月光星滴 drops */}
                <path d="M50 86 L52 92 L50 98 L48 92 Z" fill="#D4AF37"/>
                <path d="M35 88 L37 93 L35 98 L33 93 Z" fill="#D4AF37" opacity="0.7"/>
                <path d="M65 88 L67 93 L65 98 L63 93 Z" fill="#D4AF37" opacity="0.7"/>

                {/* 兩座古塔 */}
                <rect x="15" y="90" width="12" height="30" fill="#2E1C4E" stroke="#D4AF37" strokeWidth="0.8"/>
                <polygon points="15,90 21,78 27,90" fill="#2E1C4E" stroke="#D4AF37" strokeWidth="0.8"/>
                <rect x="73" y="90" width="12" height="30" fill="#2E1C4E" stroke="#D4AF37" strokeWidth="0.8"/>
                <polygon points="73,90 79,78 85,90" fill="#2E1C4E" stroke="#D4AF37" strokeWidth="0.8"/>

                <defs>
                  <linearGradient id="moonGold" x1="20" y1="20" x2="80" y2="80">
                    <stop stopColor="#FFF3D1"/>
                    <stop offset="0.6" stopColor="#D4AF37"/>
                    <stop offset="1" stopColor="#8A641A"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <span className="text-[10px] sm:text-xs font-serif font-semibold text-[#D4AF37] tracking-widest border-t border-[#D4AF37]/30 pt-1 w-full text-center">
              THE MOON
            </span>
          </div>
        </div>

        {/* 中央主卡牌: XVII THE STAR (視覺焦點) */}
        <div 
          className="absolute w-[150px] sm:w-[185px] h-[250px] sm:h-[305px] rounded-xl border-[2.5px] border-[#D4AF37] bg-[#170E30] p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.4)] transform hover:scale-105 transition-all duration-500 z-20 overflow-hidden cursor-pointer group"
        >
          <div className="w-full h-full border border-[#D4AF37]/60 rounded-lg p-2.5 flex flex-col justify-between items-center bg-gradient-to-b from-[#251347] via-[#170E30] to-[#0D071D] relative">
            
            {/* 角落四角星裝飾 */}
            <div className="absolute top-1 left-1.5 text-[9px] text-[#D4AF37]">✦</div>
            <div className="absolute top-1 right-1.5 text-[9px] text-[#D4AF37]">✦</div>

            <span className="text-xs sm:text-sm font-serif font-bold text-[#F6E7B7] tracking-widest drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]">
              XVII
            </span>
            
            {/* THE STAR 主卡牌圖案 SVG */}
            <div className="w-full flex-1 flex items-center justify-center relative my-1">
              <svg className="w-full h-full max-h-[190px]" viewBox="0 0 120 160" fill="none">
                {/* 繁星夜空 */}
                <circle cx="15" cy="15" r="1.5" fill="#FFF8DC"/>
                <circle cx="105" cy="20" r="1.2" fill="#FFF8DC"/>
                <circle cx="25" cy="45" r="1" fill="#FFF8DC"/>
                <circle cx="95" cy="55" r="1" fill="#FFF8DC"/>
                <circle cx="10" cy="75" r="1.5" fill="#FFF8DC"/>
                <circle cx="110" cy="85" r="1" fill="#FFF8DC"/>

                {/* 8顆小四角星繞著巨星 */}
                <path d="M25 25 L26 29 L30 30 L26 31 L25 35 L24 31 L20 30 L24 29 Z" fill="#D4AF37"/>
                <path d="M95 30 L96 34 L100 35 L96 36 L95 40 L94 36 L90 35 L94 34 Z" fill="#D4AF37"/>
                <path d="M15 55 L16 58 L19 59 L16 60 L15 63 L14 60 L11 59 L14 58 Z" fill="#D4AF37" opacity="0.8"/>
                <path d="M105 65 L106 68 L109 69 L106 70 L105 73 L104 70 L101 69 L104 68 Z" fill="#D4AF37" opacity="0.8"/>

                {/* 中央巨型八角星 THE STAR */}
                <g filter="drop-shadow(0px 0px 8px rgba(246,231,183,0.8))">
                  {/* 主要長芒星 */}
                  <path d="M60 10 L63.5 35 L88 38.5 L63.5 42 L60 67 L56.5 42 L32 38.5 L56.5 35 Z" fill="url(#starGoldMain)"/>
                  {/* 斜向對角芒星 */}
                  <path d="M60 18 L68 30.5 L80.5 38.5 L68 46.5 L60 59 L52 46.5 L39.5 38.5 L52 30.5 Z" fill="#F6E7B7"/>
                  {/* 核心亮點 */}
                  <circle cx="60" cy="38.5" r="4" fill="#FFFFFF"/>
                </g>

                {/* 跪姿少女與雙水瓶傾倒聖水 */}
                <path d="M60 85 C57 80, 52 82, 50 88 C48 94, 52 105, 48 115 C46 120, 42 125, 40 128" stroke="#F6E7B7" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M50 88 C45 86, 38 92, 36 98 C35 105, 38 112, 35 120" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
                <ellipse cx="51" cy="83" rx="4" ry="5" fill="#F6E7B7"/>
                
                {/* 兩個金水瓶 */}
                <path d="M38 108 C35 105, 30 106, 32 112 C34 118, 38 116, 38 108 Z" fill="url(#jarGold)"/>
                <path d="M68 110 C71 107, 76 108, 74 114 C72 120, 68 118, 68 110 Z" fill="url(#jarGold)"/>
                
                {/* 聖水水流 */}
                <path d="M32 112 C28 115, 25 125, 20 135 C18 140, 15 145, 10 148" stroke="#9B6DFF" strokeWidth="1.8" fill="none" opacity="0.9"/>
                <path d="M32 112 C30 118, 28 128, 26 138" stroke="#F6E7B7" strokeWidth="1" fill="none" opacity="0.8"/>

                <path d="M74 114 C78 118, 85 125, 90 132 C95 138, 102 142, 110 145" stroke="#9B6DFF" strokeWidth="1.8" fill="none" opacity="0.9"/>
                <path d="M74 114 C77 120, 82 128, 85 138" stroke="#F6E7B7" strokeWidth="1" fill="none" opacity="0.8"/>

                {/* 池塘波紋與大地 */}
                <path d="M0 142 C30 138, 60 144, 120 140 L120 160 L0 160 Z" fill="#150C2A"/>
                <path d="M10 148 C40 145, 80 152, 110 148" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>

                <defs>
                  <linearGradient id="starGoldMain" x1="32" y1="10" x2="88" y2="67">
                    <stop stopColor="#FFF8DC"/>
                    <stop offset="0.5" stopColor="#D4AF37"/>
                    <stop offset="1" stopColor="#AA7C11"/>
                  </linearGradient>
                  <linearGradient id="jarGold" x1="30" y1="105" x2="40" y2="120">
                    <stop stopColor="#F6E7B7"/>
                    <stop offset="1" stopColor="#8A641A"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <span className="text-xs sm:text-sm font-serif font-bold text-[#F6E7B7] tracking-widest border-t border-[#D4AF37]/50 pt-1 w-full text-center drop-shadow-[0_0_4px_rgba(212,175,55,0.5)]">
              THE STAR
            </span>
          </div>
        </div>

        {/* 右側卡牌: XIX THE SUN */}
        <div 
          className="absolute right-[10%] sm:right-[15%] w-[130px] sm:w-[160px] h-[220px] sm:h-[270px] rounded-xl border-2 border-[#D4AF37]/70 bg-[#120B24] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(123,77,255,0.25)] transform rotate-[12deg] -translate-y-2 hover:rotate-[6deg] hover:translate-y-[-10px] hover:z-30 transition-all duration-500 z-10 overflow-hidden cursor-pointer"
        >
          <div className="w-full h-full border border-[#D4AF37]/40 rounded-lg p-2 flex flex-col justify-between items-center bg-gradient-to-b from-[#1E1136] via-[#120B24] to-[#0A0618] relative">
            <span className="text-[10px] sm:text-xs font-serif text-[#D4AF37] tracking-widest">XIX</span>
            
            {/* 太陽圖騰 SVG */}
            <div className="w-full flex-1 flex items-center justify-center relative my-1">
              <svg className="w-full h-full max-h-[160px]" viewBox="0 0 100 140" fill="none">
                <circle cx="50" cy="50" r="20" fill="url(#sunGold)"/>
                
                <path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50 M25 25 L32 32 M68 68 L75 75 M75 25 L68 32 M32 68 L25 75" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                
                <circle cx="43" cy="46" r="2" fill="#120B24"/>
                <circle cx="57" cy="46" r="2" fill="#120B24"/>
                <path d="M44 56 C47 60, 53 60, 56 56" stroke="#120B24" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

                <circle cx="25" cy="100" r="8" fill="#8A641A" stroke="#D4AF37"/>
                <circle cx="50" cy="105" r="10" fill="#8A641A" stroke="#D4AF37"/>
                <circle cx="75" cy="100" r="8" fill="#8A641A" stroke="#D4AF37"/>
                <rect x="0" y="115" width="100" height="25" fill="#1D1035"/>
                <line x1="0" y1="115" x2="100" y2="115" stroke="#D4AF37" strokeWidth="1"/>

                <defs>
                  <radialGradient id="sunGold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF3D1"/>
                    <stop offset="70%" stopColor="#D4AF37"/>
                    <stop offset="100%" stopColor="#AA7C11"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <span className="text-[10px] sm:text-xs font-serif font-semibold text-[#D4AF37] tracking-widest border-t border-[#D4AF37]/30 pt-1 w-full text-center">
              THE SUN
            </span>
          </div>
        </div>

      </div>

      {/* 底部引言語句 (動態國際化) */}
      <div className="mt-4 text-center">
        <p className="text-xs sm:text-sm font-serif text-[#F6E7B7]/80 tracking-widest drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]">
          {t('auth.card_quote') || '✦ 每一次抽牌，都是宇宙給你的指引 ✦'}
        </p>
      </div>
    </div>
  );
};
