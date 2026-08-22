/**
 * 儀式洗牌動畫（三幕式敘事）
 * 第一幕：聚合 — 牌從四方飛入，聚合成牌堆（每張牌不同起點 → 層次感）
 * 第二幕：洗切 — 牌堆 3D 傾斜，牌上下交錯滑動，能量流動
 * 第三幕：收束 — 牌堆聚合，金色能量微光匯聚，準備發牌
 *
 * 全程只使用 transform / opacity（GPU 合成），不觸發 reflow
 * 所有牌同步播放三幕（3s），差異由 CSS 變數提供，與 App 計時器精確對齊
 */

import React, { useMemo } from 'react';

interface RitualShuffleProps {
  cardBackImage: string;
  cardBackAlt: string;
  /** 牌數（預設 5，凱爾特十字為 10） */
  cardCount?: number;
}

// 各張牌的聚合起點（第一幕：從不同方位飛入）
const GATHER_OFFSETS = [
  { x: -170, y: -130, rot: -24 },
  { x: 170, y: -110, rot: 20 },
  { x: -150, y: 120, rot: -14 },
  { x: 150, y: 130, rot: 16 },
  { x: 0, y: -150, rot: 0 },
  { x: 60, y: 150, rot: -8 },
  { x: -80, y: -160, rot: 10 },
  { x: 80, y: -160, rot: -10 },
  { x: -90, y: 150, rot: 12 },
  { x: 90, y: 150, rot: -12 },
];

const RitualShuffle: React.FC<RitualShuffleProps> = ({
  cardBackImage,
  cardBackAlt,
  cardCount = 5,
}) => {
  const cards = useMemo(() => {
    return Array.from({ length: cardCount }, (_, i) => {
      const offset = GATHER_OFFSETS[i % GATHER_OFFSETS.length];
      // 洗切階段的交錯位移：奇偶交錯、隨張數加大
      const shuffleShift = (i % 2 === 0 ? -1 : 1) * (16 + (i % 3) * 10);
      return { offset, shuffleShift, zIndex: cardCount - i };
    });
  }, [cardCount]);

  return (
    <div className="ritual-shuffle-stage relative w-48 h-72" aria-hidden="true">
      {cards.map((card, i) => (
        <div
          key={i}
          className="ritual-shuffle-card absolute inset-0 rounded-xl shadow-2xl overflow-hidden"
          style={{
            zIndex: card.zIndex,
            ['--gather-x' as string]: `${card.offset.x}px`,
            ['--gather-y' as string]: `${card.offset.y}px`,
            ['--gather-rot' as string]: `${card.offset.rot}deg`,
            ['--shuffle-shift' as string]: `${card.shuffleShift}px`,
          }}
        >
          <img
            src={cardBackImage}
            alt={cardBackAlt}
            className="w-full h-full object-cover rounded-xl border-2 border-[#d4af37]/40"
            style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }}
            draggable={false}
          />
        </div>
      ))}

      {/* 能量匯聚光暈（第二幕起漸亮，第三幕最盛） */}
      <div className="ritual-shuffle-glow absolute -inset-6 rounded-full pointer-events-none" />
    </div>
  );
};

export default RitualShuffle;
