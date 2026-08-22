
import React, { useState, useEffect } from 'react';
import { TarotCardData } from '../types';
import { useAnimationSettings } from '../hooks/useAnimationSettings';
import { useTilt } from '../hooks/useTilt';

interface TarotCardProps {
  card?: TarotCardData;
  isFlipped: boolean;
  isReversed: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  customBack?: string;
  showNameLabel?: boolean;  // 新增：是否顯示牌名標籤
  enableTouchTilt?: boolean; // 觸控傾斜開關（滑動手勢容器內應關閉，避免手勢衝突）
}

const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isFlipped,
  isReversed,
  onClick,
  className = "",
  size = 'md',
  customBack,
  showNameLabel = true,  // 預設顯示
  enableTouchTilt = true,
}) => {
  const [showLight, setShowLight] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const { settings: animSettings } = useAnimationSettings();
  // 小尺寸（xs）卡片不啟用觸控傾斜：效果不明顯且會干擾小卡片點擊
  const { tilt, onMouseMove, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd } = useTilt(
    animSettings.tiltEnabled,
    enableTouchTilt && size !== 'xs'
  );

  // 當翻轉狀態改變時，觸發聖光閃爍
  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => setShowLight(true), 400); // 在翻轉至一半時啟動
      return () => clearTimeout(timer);
    } else {
      setShowLight(false);
    }
  }, [isFlipped]);

  // 物理翻牌風格：翻轉完成瞬間觸發能量漣漪
  useEffect(() => {
    if (isFlipped && animSettings.flipStyle === 'physical') {
      const rippleTimer = setTimeout(() => {
        setShowRipple(true);
        // 漣漪動畫 0.9s 後移除
        setTimeout(() => setShowRipple(false), 950);
      }, 500);
      return () => clearTimeout(rippleTimer);
    } else {
      setShowRipple(false);
    }
  }, [isFlipped, animSettings.flipStyle]);

  const sizeClasses = {
    xs: 'w-20 h-[9rem]',     // 超小尺寸 - 凱爾特十字手機版
    sm: 'w-28 h-[12.5rem]',
    md: 'w-48 h-[21.5rem]',
    lg: 'w-64 h-[28.5rem]'
  };

  const DefaultMysticPattern = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0d0202]">
      <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
      <svg className="w-24 h-24 text-[#d4af37]/20" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="45" strokeWidth="0.5" />
        <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="0.5" opacity="0.3" />
        <path d="M25 25 L75 75 M75 25 L25 75" strokeWidth="0.3" opacity="0.2" />
      </svg>
    </div>
  );

  // 跟手 3D 傾斜的 transform（套在外層容器上）
  const tiltTransform = animSettings.tiltEnabled
    ? `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`
    : undefined;

  return (
    <div
      className={`relative perspective-3000 ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={tiltTransform ? { transform: tiltTransform, transition: 'transform 0.2s ease-out' } : undefined}
    >
      {/* 聖光擴散層 - 僅在翻牌瞬間出現 */}
      {showLight && (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-white animate-holy-flash mix-blend-screen opacity-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent animate-shimmer pointer-events-none"></div>
        </div>
      )}

      {/* 物理翻牌風格：能量漣漪環 */}
      {showRipple && <div className="card-ripple" />}

      <div className={`card-inner ${isFlipped ? 'card-flipped' : ''} ${animSettings.flipStyle === 'physical' ? 'card-inner-flip-physical' : ''} ${isFlipped && animSettings.flipStyle === 'physical' ? 'card-breathe' : ''} cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.9)]`}>

        {/* 牌背 (Back side) */}
        <div className="card-face card-back-side">
          {customBack ? (
            <img
              src={customBack}
              className="w-full h-full object-cover"
              alt="聖殿之印"
            />
          ) : <DefaultMysticPattern />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          <div className="absolute inset-0 border-[1px] border-[#d4af37]/20 m-2 rounded-lg pointer-events-none"></div>
          <div className="absolute inset-x-4 inset-y-10 border-x border-[#d4af37]/10 pointer-events-none"></div>
        </div>

        {/* 牌面 (Front side) */}
        <div className="card-face card-front-side">
          {card && (
            <div className={`relative w-full h-full flex flex-col ${isReversed ? 'rotate-180' : ''}`}>

              <div className={`flex-1 relative overflow-hidden bg-[#050505] ${isFlipped ? 'canvas-emergence' : ''}`}>
                {/* 核心牌面圖片 */}
                <img
                  src={card.image}
                  alt={card.nameZh}
                  className="w-full h-full object-cover"
                  loading="eager"
                />

                {/* 油畫裂紋質感層 - 隨時間慢慢淡出 */}
                <div className={`craquelure-overlay transition-opacity duration-[2000ms] ${isFlipped ? 'opacity-10' : 'opacity-30'}`}></div>

                {/* 增加側邊陰影增強立體感 */}
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"></div>

                {/* 模擬油畫的高光掃過感 */}
                {isFlipped && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                )}

                {/* 3D 光澤反射層 */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.15) 100%)',
                  }}
                />
              </div>

              {/* 牌名標籤 - 根據設定和尺寸調整 */}
              {showNameLabel && (
                <div className={`absolute left-1/2 -translate-x-1/2 w-[88%] transition-all duration-1000 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${size === 'xs' ? 'bottom-1' : size === 'sm' ? 'bottom-1' : 'bottom-6'}`}>
                  <div className={`bg-[#fdfcf0]/90 backdrop-blur-md border border-[#d4af37] shadow-[0_15px_30px_rgba(0,0,0,1)] rounded-sm text-center ${size === 'xs' ? 'py-0.5 px-0.5' : size === 'sm' ? 'py-0.5 px-1' : 'py-2 px-1'}`}>
                    <p className={`text-black font-cinzel font-black leading-tight ${size === 'xs' ? 'text-[8px] tracking-[0.1em]' : size === 'sm' ? 'text-[10px] tracking-[0.1em]' : 'text-xl tracking-[0.2em]'}`}>{card.nameZh}</p>
                    {size === 'lg' || size === 'md' ? (
                      <>
                        <div className="w-1/3 h-px bg-black/20 mx-auto my-1"></div>
                        <p className="text-black/60 uppercase font-cinzel font-bold text-[8px] tracking-[0.4em]">{card.name}</p>
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TarotCard;
