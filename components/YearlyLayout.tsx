/**
 * 年度運勢牌陣佈局
 * 12張牌代表12個月，3x4 網格佈局
 */

import React from 'react';
import TarotCard from './TarotCard';
import { CardReading } from '../types';

interface YearlyLayoutProps {
    spread: (CardReading & { aiImage?: string })[];
    isFlipped: boolean[];
    onFlipCard: (index: number) => void;
    cardBackImage: string;
}

const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'];

const YearlyLayout: React.FC<YearlyLayoutProps> = ({
    spread,
    isFlipped,
    onFlipCard,
    cardBackImage
}) => {
    // 確保有 12 張牌
    if (spread.length !== 12) {
        return <div className="text-[#d4af37]/60">牌陣數量不正確</div>;
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-cinzel font-black text-[#d4af37] tracking-widest mb-2">
                    年度命運藍圖
                </h3>
                <p className="text-[#d4af37]/40 font-lora italic text-sm">
                    十二張牌揭示您未來一年的命運軌跡
                </p>
            </div>

            {/* 3x4 網格：每行 4 個月 */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {spread.map((s, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center animate-deal-card"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                        {/* 月份標籤 */}
                        <div className="mb-2 px-3 py-1 rounded-full bg-[#d4af37]/10">
                            <p className="text-[#d4af37] font-cinzel text-xs font-black tracking-wider">
                                {MONTHS[idx]}
                            </p>
                        </div>

                        <TarotCard
                            card={{ ...s.card, image: s.aiImage || s.card.image }}
                            isFlipped={isFlipped[idx]}
                            isReversed={s.isReversed}
                            onClick={() => onFlipCard(idx)}
                            size="sm"
                            customBack={cardBackImage}
                        />

                        {!isFlipped[idx] && (
                            <p className="mt-2 text-[#d4af37]/30 font-lora italic text-[10px] animate-pulse">
                                點擊翻牌
                            </p>
                        )}

                        {/* 翻牌後顯示牌名 */}
                        {isFlipped[idx] && (
                            <p className="mt-2 text-[#d4af37]/60 font-cinzel text-[10px] text-center">
                                {s.card.nameZh}
                                <span className="text-[#d4af37]/40 ml-1">
                                    {s.isReversed ? '逆' : '正'}
                                </span>
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* 小提示 */}
            <div className="text-center mt-8">
                <p className="text-[#d4af37]/20 font-lora italic text-xs">
                    翻開所有牌以獲得完整年度解讀
                </p>
            </div>
        </div>
    );
};

export default YearlyLayout;
