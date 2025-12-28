/**
 * 凱爾特十字牌陣佈局
 * 傳統十字形 + 權杖柱佈局
 * 
 * 佈局說明:
 *         [5 Crown]
 *   [4 Past] [1+2] [6 Future]
 *         [3 Foundation]
 *                           [10 Outcome]
 *                           [9 Hopes/Fears]
 *                           [8 Environment]
 *                           [7 Self]
 */

import React from 'react';
import TarotCard from './TarotCard';
import { CardReading, TarotCardData } from '../types';

interface CelticCrossLayoutProps {
    spread: (CardReading & { aiImage?: string })[];
    isFlipped: boolean[];
    onFlipCard: (index: number) => void;
    cardBackImage: string;
}

const CelticCrossLayout: React.FC<CelticCrossLayoutProps> = ({
    spread,
    isFlipped,
    onFlipCard,
    cardBackImage
}) => {
    // 確保有 10 張牌
    if (spread.length !== 10) {
        return <div className="text-[#d4af37]/60">牌陣數量不正確</div>;
    }

    // 渲染單張牌
    const renderCard = (index: number, extraClass: string = '', isRotated: boolean = false) => {
        const s = spread[index];
        return (
            <div
                className={`flex flex-col items-center ${extraClass}`}
                style={{ animationDelay: `${index * 0.15}s` }}
            >
                <p className="text-[#d4af37]/60 font-cinzel text-[10px] tracking-widest uppercase mb-2 text-center">
                    {s.position}
                </p>
                <div className={isRotated ? 'rotate-90' : ''}>
                    <TarotCard
                        card={{ ...s.card, image: s.aiImage || s.card.image }}
                        isFlipped={isFlipped[index]}
                        isReversed={s.isReversed}
                        onClick={() => onFlipCard(index)}
                        size="sm"
                        customBack={cardBackImage}
                    />
                </div>
                {!isFlipped[index] && (
                    <p className="mt-2 text-[#d4af37]/30 font-lora italic text-[10px] animate-pulse">點擊翻牌</p>
                )}
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">

                {/* 左側：十字區域 */}
                <div className="relative" style={{ width: '280px', height: '400px' }}>
                    {/* 中心區域 - 1. 核心 + 2. 障礙 (並排顯示，障礙稍微偏右且旋轉) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 animate-deal-card">
                        {/* 1. 核心 */}
                        <div className="z-10">
                            {renderCard(0)}
                        </div>
                        {/* 2. 障礙 (旋轉45度表示橫跨) */}
                        <div className="z-20 -ml-6 rotate-45">
                            {renderCard(1, '', false)}
                        </div>
                    </div>

                    {/* 上方 - 5. 可能 (Crown) */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 animate-deal-card">
                        {renderCard(4)}
                    </div>

                    {/* 下方 - 3. 基礎 (Foundation) */}
                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 animate-deal-card">
                        {renderCard(2)}
                    </div>

                    {/* 左側 - 4. 近過去 */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-deal-card">
                        {renderCard(3)}
                    </div>

                    {/* 右側 - 6. 近未來 */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-deal-card">
                        {renderCard(5)}
                    </div>
                </div>

                {/* 右側：權杖柱 (由下往上: 7, 8, 9, 10) */}
                <div className="flex flex-row md:flex-col gap-4 md:gap-6">
                    {/* 手機版橫排，桌面版直排 */}
                    <div className="animate-deal-card" style={{ animationDelay: '0.9s' }}>
                        {renderCard(6)}
                    </div>
                    <div className="animate-deal-card" style={{ animationDelay: '1.05s' }}>
                        {renderCard(7)}
                    </div>
                    <div className="animate-deal-card" style={{ animationDelay: '1.2s' }}>
                        {renderCard(8)}
                    </div>
                    <div className="animate-deal-card" style={{ animationDelay: '1.35s' }}>
                        {renderCard(9)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CelticCrossLayout;
