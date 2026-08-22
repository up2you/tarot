/**
 * 每日卡元件（冥想式首屏核心）
 * 中央一張牌背 → 點擊翻牌（0.6s 3D 儀式）→ 卡圖亮起 + 光暈 → 金句 + 出口
 * 設計依據：頂級塔羅 App 的每日卡驅動 60-70% DAU（習慣迴圈）
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MAJOR_ARCANA, CARD_BACK_IMAGE } from '../constants';
import { useThemedSounds } from './SoundManager';
import { hapticFeedback } from '../services/mobileService';

interface DailyCardProps {
  /** 自訂牌背（依後台風格） */
  cardBack?: string;
  /** 點擊「開始占卜」 */
  onStartReading: () => void;
  /** 點擊「看完整解讀」 */
  onViewReading?: () => void;
}

const DailyCard: React.FC<DailyCardProps> = ({
  cardBack,
  onStartReading,
  onViewReading,
}) => {
  const { t } = useTranslation();
  const { playSound } = useThemedSounds();

  // 每日卡：以日期為種子選一張（每天固定，午夜更新）
  const todayKey = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  })();

  const [revealedCard] = useState(() => {
    const seed = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();
    return MAJOR_ARCANA[seed % MAJOR_ARCANA.length];
  });

  // 持久化：記錄今天的卡是否已翻開（localStorage，重新整理保持狀態）
  const DAILY_STATE_KEY = 'aetheris_daily_card';
  const [isFlipped, setIsFlipped] = useState(() => {
    try {
      const raw = localStorage.getItem(DAILY_STATE_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        // 只有今天的記錄才恢復翻開狀態（跨天自動重置）
        if (state.date === todayKey && state.cardId === revealedCard.id) {
          return state.flipped === true;
        }
      }
    } catch { /* 忽略 */ }
    return false;
  });
  const [showGlow, setShowGlow] = useState(() => {
    try {
      const raw = localStorage.getItem(DAILY_STATE_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        return state.date === todayKey && state.cardId === revealedCard.id && state.flipped === true;
      }
    } catch { /* 忽略 */ }
    return false;
  });

  const handleFlip = useCallback(() => {
    if (isFlipped) return;
    playSound('flip');
    hapticFeedback('light');
    setIsFlipped(true);
    // 持久化翻開狀態
    try {
      localStorage.setItem(DAILY_STATE_KEY, JSON.stringify({
        date: todayKey,
        cardId: revealedCard.id,
        flipped: true,
      }));
    } catch { /* 忽略儲存失敗 */ }
    // 翻牌完成後觸發光暈與金句
    setTimeout(() => setShowGlow(true), 700);
  }, [isFlipped, playSound, revealedCard.id, todayKey]);

  // 每日一句（從意義中提取，實際可用 AI 生成）
  const dailyQuote = revealedCard.meaning.split('.')[0] + '.';

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center animate-fade-up">
      {/* 日期標題 */}
      <p className="text-[10px] md:text-xs font-cinzel tracking-[0.5em] text-[#d4af37]/50 uppercase mb-8">
        {new Date().toLocaleDateString(t('app.locale') || 'zh-TW', {
          year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
        })}
      </p>

      {/* 每日卡牌 */}
      <div
        className="relative perspective-3000 w-52 h-80 md:w-64 md:h-[22rem] cursor-pointer select-none"
        onClick={handleFlip}
        role="button"
        aria-label={t('daily.flip_card')}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }}
      >
        {/* 翻牌後光暈 */}
        {showGlow && (
          <div className="absolute -inset-8 pointer-events-none animate-pulse">
            <div className="w-full h-full rounded-full bg-[#d4af37]/20 blur-3xl" />
          </div>
        )}

        {/* 3D 翻轉容器 */}
        <div className={`card-inner ${isFlipped ? 'card-flipped' : ''} shadow-[0_30px_80px_rgba(0,0,0,0.9)]`}>
          {/* 牌背 */}
          <div className="card-face card-back-side">
            <img
              src={cardBack || CARD_BACK_IMAGE}
              alt={t('main.card_back_alt')}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            {/* 脈動微光提示 */}
            {!isFlipped && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[#d4af37]/80 text-sm font-cinzel tracking-[0.3em] animate-pulse">
                  {t('daily.tap_to_reveal')}
                </div>
              </div>
            )}
          </div>

          {/* 牌面 */}
          <div className="card-face card-front-side">
            <img
              src={revealedCard.image}
              alt={revealedCard.nameZh}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {/* 卡名標籤 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] text-center">
              <p className="text-white font-cinzel font-bold text-lg tracking-[0.2em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {revealedCard.nameZh}
              </p>
              <p className="text-[#d4af37]/80 font-cinzel text-[10px] tracking-[0.4em] uppercase mt-1">
                {revealedCard.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 翻牌後：金句 + 出口 */}
      <div className={`mt-10 text-center transition-all duration-700 ${showGlow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="text-[#d4af37]/40 text-xs font-cinzel tracking-[0.4em] uppercase mb-3">
          {t('daily.todays_guidance')}
        </p>
        <p className="text-[#f3e5ab] font-lora italic text-lg md:text-xl leading-relaxed mb-8 px-4">
          「{dailyQuote}」
        </p>

        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={onStartReading}
            className="px-10 py-4 rounded-full gold-button text-black font-cinzel font-black tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {t('daily.start_reading')}
          </button>
          {onViewReading && (
            <button
              onClick={onViewReading}
              className="text-[#d4af37]/50 hover:text-[#d4af37] font-cinzel text-xs tracking-widest uppercase transition-colors"
            >
              {t('daily.view_full_reading')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyCard;
