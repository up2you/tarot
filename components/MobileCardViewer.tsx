/**
 * 手機牌陣瀏覽器
 * 支援全螢幕滑動模式和水平輪播模式
 * 凱爾特十字牌陣會分成「十字區」+「權杖柱」兩個分組
 */

import React, { useState, useRef, useEffect } from 'react';
import TarotCard from './TarotCard';
import { CardReading, MobileCardDisplayMode } from '../types';

interface MobileCardViewerProps {
    spread: (CardReading & { aiImage?: string })[];
    isFlipped: boolean[];
    onFlipCard: (index: number) => void;
    cardBackImage: string;
    mode: MobileCardDisplayMode;
    spreadType?: string; // 'celtic_cross' | 'yearly' | 'three_card' 等
}

// 凱爾特十字分組定義
const CELTIC_CROSS_GROUPS = [
    {
        name: '十字區',
        nameEn: 'The Cross',
        indices: [0, 1, 2, 3, 4, 5],
        description: '核心問題與影響',
    },
    {
        name: '權杖柱',
        nameEn: 'The Staff',
        indices: [6, 7, 8, 9],
        description: '深層分析與結果',
    },
];

const MobileCardViewer: React.FC<MobileCardViewerProps> = ({
    spread,
    isFlipped,
    onFlipCard,
    cardBackImage,
    mode,
    spreadType,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentGroup, setCurrentGroup] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

    const isCelticCross = spreadType === 'celtic_cross';

    // 取得當前分組的牌
    const getCurrentCards = () => {
        if (isCelticCross && mode !== 'grid') {
            const group = CELTIC_CROSS_GROUPS[currentGroup];
            return group.indices.map(i => ({ index: i, card: spread[i] }));
        }
        return spread.map((card, index) => ({ index, card }));
    };

    const cards = getCurrentCards();
    const totalGroups = isCelticCross ? CELTIC_CROSS_GROUPS.length : 1;

    // 觸控事件處理
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        });
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const deltaX = e.changedTouches[0].clientX - touchStart.x;
        const deltaY = e.changedTouches[0].clientY - touchStart.y;
        const threshold = 50;

        if (mode === 'carousel') {
            // 水平滑動
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
                if (deltaX < 0 && currentIndex < cards.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else if (deltaX > 0 && currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                }
            }
        } else if (mode === 'fullscreen') {
            // 垂直滑動
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
                if (deltaY < 0 && currentIndex < cards.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else if (deltaY > 0 && currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                }
            }
        }

        setTouchStart(null);
    };

    // 切換分組
    const switchGroup = (groupIndex: number) => {
        setCurrentGroup(groupIndex);
        setCurrentIndex(0);
    };

    // 渲染進度指示器
    const renderProgressIndicator = () => (
        <div className="flex justify-center items-center gap-2 py-4">
            {cards.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                            ? 'w-4 bg-[#d4af37]'
                            : 'bg-[#d4af37]/30 hover:bg-[#d4af37]/50'
                        }`}
                />
            ))}
        </div>
    );

    // 渲染分組選擇器（凱爾特十字專用）
    const renderGroupSelector = () => {
        if (!isCelticCross || mode === 'grid') return null;

        return (
            <div className="flex justify-center gap-4 py-4 border-b border-[#d4af37]/20 mb-4">
                {CELTIC_CROSS_GROUPS.map((group, idx) => (
                    <button
                        key={group.name}
                        onClick={() => switchGroup(idx)}
                        className={`px-4 py-2 rounded-full text-sm font-cinzel transition-all ${idx === currentGroup
                                ? 'bg-[#d4af37] text-black font-bold'
                                : 'border border-[#d4af37]/30 text-[#d4af37]/60 hover:bg-[#d4af37]/10'
                            }`}
                    >
                        {group.name}
                        <span className="text-xs ml-1 opacity-60">({group.indices.length}張)</span>
                    </button>
                ))}
            </div>
        );
    };

    // 全螢幕垂直滑動模式
    if (mode === 'fullscreen') {
        const currentCard = cards[currentIndex];
        if (!currentCard) return null;

        return (
            <div className="w-full min-h-screen flex flex-col">
                {renderGroupSelector()}

                <div
                    ref={containerRef}
                    className="flex-1 flex flex-col items-center justify-center px-4"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* 位置標題 */}
                    <div className="text-center mb-4">
                        <p className="text-[#d4af37]/40 text-xs font-cinzel tracking-widest uppercase">
                            {isCelticCross && <span className="mr-2">{CELTIC_CROSS_GROUPS[currentGroup].name}</span>}
                            {currentIndex + 1} / {cards.length}
                        </p>
                        <p className="text-[#d4af37] text-lg font-cinzel tracking-widest mt-1">
                            {currentCard.card.position}
                        </p>
                    </div>

                    {/* 牌面 */}
                    <div className="animate-fade-up">
                        <TarotCard
                            card={{ ...currentCard.card.card, image: currentCard.card.aiImage || currentCard.card.card.image }}
                            isFlipped={isFlipped[currentCard.index]}
                            isReversed={currentCard.card.isReversed}
                            onClick={() => onFlipCard(currentCard.index)}
                            size="lg"
                            customBack={cardBackImage}
                        />
                    </div>

                    {/* 翻牌提示 */}
                    {!isFlipped[currentCard.index] && (
                        <p className="mt-4 text-[#d4af37]/40 font-lora italic text-sm animate-pulse">
                            點擊揭示命運
                        </p>
                    )}

                    {/* 進度指示器 */}
                    {renderProgressIndicator()}

                    {/* 滑動提示 */}
                    <p className="text-[#d4af37]/20 text-xs font-cinzel mt-2">
                        {currentIndex < cards.length - 1 ? '↓ 下滑查看下一張' :
                            (isCelticCross && currentGroup < totalGroups - 1) ? '切換到權杖柱 →' : '已是最後一張'}
                    </p>
                </div>
            </div>
        );
    }

    // 水平輪播模式
    if (mode === 'carousel') {
        const currentCard = cards[currentIndex];
        if (!currentCard) return null;

        return (
            <div className="w-full">
                {renderGroupSelector()}

                <div
                    ref={containerRef}
                    className="flex flex-col items-center justify-center px-4 py-8"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* 位置標題 */}
                    <div className="text-center mb-4">
                        <p className="text-[#d4af37]/40 text-xs font-cinzel tracking-widest uppercase">
                            {isCelticCross && <span className="mr-2">{CELTIC_CROSS_GROUPS[currentGroup].name}</span>}
                            {currentIndex + 1} / {cards.length}
                        </p>
                        <p className="text-[#d4af37] text-lg font-cinzel tracking-widest mt-1">
                            {currentCard.card.position}
                        </p>
                    </div>

                    {/* 左右箭頭 + 牌面 */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] disabled:opacity-20 hover:bg-[#d4af37]/10 transition-all"
                        >
                            ←
                        </button>

                        <div className="animate-fade-up">
                            <TarotCard
                                card={{ ...currentCard.card.card, image: currentCard.card.aiImage || currentCard.card.card.image }}
                                isFlipped={isFlipped[currentCard.index]}
                                isReversed={currentCard.card.isReversed}
                                onClick={() => onFlipCard(currentCard.index)}
                                size="lg"
                                customBack={cardBackImage}
                            />
                        </div>

                        <button
                            onClick={() => setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))}
                            disabled={currentIndex === cards.length - 1}
                            className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] disabled:opacity-20 hover:bg-[#d4af37]/10 transition-all"
                        >
                            →
                        </button>
                    </div>

                    {/* 翻牌提示 */}
                    {!isFlipped[currentCard.index] && (
                        <p className="mt-4 text-[#d4af37]/40 font-lora italic text-sm animate-pulse">
                            點擊揭示命運
                        </p>
                    )}

                    {/* 進度指示器 */}
                    {renderProgressIndicator()}

                    {/* 滑動提示 */}
                    <p className="text-[#d4af37]/20 text-xs font-cinzel mt-2">
                        ← 左右滑動或點擊箭頭 →
                    </p>
                </div>
            </div>
        );
    }

    // Grid 模式 - 回傳 null，讓 App.tsx 使用原有的 grid 佈局
    return null;
};

export default MobileCardViewer;
