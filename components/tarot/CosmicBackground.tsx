import React from 'react';

export const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B0920]">
      {/* 多層次漸層氣雲與宇宙光暈 (Deep space nebula radial gradients) */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at 50% 15%, rgba(123, 77, 255, 0.25) 0%, rgba(26, 16, 43, 0.4) 45%, transparent 70%),
            radial-gradient(circle at 20% 40%, rgba(74, 30, 140, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(180, 77, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 90%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
            linear-gradient(to bottom, #0B0920 0%, #1A102B 50%, #0B0920 100%)
          `
        }}
      />

      {/* 細緻占星幾何同心圓與星盤虛線 (Sacred Geometry Astrology Circles) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-15">
        <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="380" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="4 6"/>
          <circle cx="400" cy="400" r="310" stroke="#D4AF37" strokeWidth="0.6"/>
          <circle cx="400" cy="400" r="240" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="12 4"/>
          <circle cx="400" cy="400" r="160" stroke="#D4AF37" strokeWidth="0.8"/>
          
          {/* 星盤連線與十字 */}
          <line x1="400" y1="20" x2="400" y2="780" stroke="#D4AF37" strokeWidth="0.4" opacity="0.6"/>
          <line x1="20" y1="400" x2="780" y2="400" stroke="#D4AF37" strokeWidth="0.4" opacity="0.6"/>
          <line x1="130" y1="130" x2="670" y2="670" stroke="#D4AF37" strokeWidth="0.4" opacity="0.4"/>
          <line x1="670" y1="130" x2="130" y2="670" stroke="#D4AF37" strokeWidth="0.4" opacity="0.4"/>

          {/* 12星座星點 */}
          <circle cx="400" cy="90" r="3" fill="#F6E7B7"/>
          <circle cx="400" cy="710" r="3" fill="#F6E7B7"/>
          <circle cx="90" cy="400" r="3" fill="#F6E7B7"/>
          <circle cx="710" cy="400" r="3" fill="#F6E7B7"/>
          <circle cx="180" cy="180" r="2.5" fill="#F6E7B7"/>
          <circle cx="620" cy="620" r="2.5" fill="#F6E7B7"/>
          <circle cx="620" cy="180" r="2.5" fill="#F6E7B7"/>
          <circle cx="180" cy="620" r="2.5" fill="#F6E7B7"/>
        </svg>
      </div>

      {/* 閃爍星雲與粒子 (Twinkling star field particles) */}
      <svg className="absolute inset-0 w-full h-full opacity-70">
        {/* 四角亮星 */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          <path d="M150 120 L152 128 L160 130 L152 132 L150 140 L148 132 L140 130 L148 128 Z" fill="#F6E7B7" opacity="0.9"/>
          <path d="M850 200 L852 206 L858 208 L852 210 L850 216 L848 210 L842 208 L848 206 Z" fill="#F6E7B7" opacity="0.8"/>
          <path d="M220 520 L221 525 L226 526 L221 527 L220 532 L219 527 L214 526 L219 525 Z" fill="#D4AF37" opacity="0.7"/>
          <path d="M780 650 L782 657 L789 659 L782 661 L780 668 L778 661 L771 659 L778 657 Z" fill="#F6E7B7" opacity="0.85"/>
        </g>
        
        {/* 背景隨機點亮細緻小星辰 */}
        <circle cx="8%" cy="15%" r="1" fill="#FFF" opacity="0.7" />
        <circle cx="22%" cy="8%" r="1.2" fill="#F6E7B7" opacity="0.9" />
        <circle cx="35%" cy="25%" r="0.8" fill="#FFF" opacity="0.6" />
        <circle cx="48%" cy="12%" r="1.5" fill="#F6E7B7" opacity="0.9" />
        <circle cx="62%" cy="18%" r="1" fill="#FFF" opacity="0.7" />
        <circle cx="75%" cy="6%" r="1.2" fill="#F6E7B7" opacity="0.8" />
        <circle cx="88%" cy="22%" r="0.9" fill="#FFF" opacity="0.5" />

        <circle cx="12%" cy="45%" r="1.2" fill="#F6E7B7" opacity="0.8" />
        <circle cx="28%" cy="58%" r="0.8" fill="#FFF" opacity="0.6" />
        <circle cx="72%" cy="48%" r="1.5" fill="#F6E7B7" opacity="0.85" />
        <circle cx="92%" cy="52%" r="1" fill="#FFF" opacity="0.7" />

        <circle cx="5%" cy="80%" r="1.5" fill="#FFF" opacity="0.6" />
        <circle cx="18%" cy="72%" r="1" fill="#F6E7B7" opacity="0.8" />
        <circle cx="82%" cy="78%" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="95%" cy="85%" r="0.8" fill="#F6E7B7" opacity="0.9" />
      </svg>

      {/* 底部宇宙山景與日出/曙光水面倒影 (Bottom Mountain Silhouette & Glowing Lake) */}
      <div className="absolute bottom-0 left-0 right-0 h-[220px] sm:h-[280px] pointer-events-none flex flex-col justify-end">
        {/* 遠處暗紫色連綿山脈 */}
        <svg className="w-full h-full" viewBox="0 0 1440 280" preserveAspectRatio="none" fill="none">
          {/* 山谷中心曙光暈光 */}
          <circle cx="720" cy="180" r="140" fill="url(#horizonGlow)" opacity="0.65" />
          <ellipse cx="720" cy="190" rx="40" ry="12" fill="#FFF3D1" opacity="0.9" />

          {/* 遠景山峰 */}
          <path d="M0 220 L120 180 L240 200 L380 150 L520 190 L640 170 L720 190 L800 165 L940 195 L1080 155 L1220 190 L1340 165 L1440 210 L1440 280 L0 280 Z" fill="#140D2B" opacity="0.85"/>
          
          {/* 近景深暗山峰 */}
          <path d="M0 240 L160 200 L300 230 L460 175 L580 220 L720 195 L860 220 L1000 170 L1160 220 L1300 195 L1440 235 L1440 280 L0 280 Z" fill="#0A0618"/>

          {/* 水面上曙光縱向金光倒影 */}
          <path d="M700 195 L740 195 L760 280 L680 280 Z" fill="url(#riverReflection)" opacity="0.7"/>

          <defs>
            <radialGradient id="horizonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F6E7B7" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#D4AF37" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#7B4DFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B0920" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="riverReflection" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF3D1" stopOpacity="0.8"/>
              <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#7B4DFF" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
