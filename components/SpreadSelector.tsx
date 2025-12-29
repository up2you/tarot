/**
 * 牌陣選擇器
 * 兩階段選擇：問題分類 → 牌陣
 */

import React, { useState } from 'react';
import { SPREAD_CATEGORIES, SPREADS, getSpreadsByCategory } from '../constants';

interface SpreadSelectorProps {
    isVip: boolean;
    onSelectSpread: (spreadId: string) => void;
    onBack: () => void;
}

const SpreadSelector: React.FC<SpreadSelectorProps> = ({ isVip, onSelectSpread, onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Object.values(SPREAD_CATEGORIES);
    const spreadsInCategory = selectedCategory ? getSpreadsByCategory(selectedCategory) : [];

    const handleSelectCategory = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleSelectSpread = (spreadId: string, isSpreadVip: boolean) => {
        if (isSpreadVip && !isVip) {
            // TODO: 顯示 VIP 升級提示
            alert('此牌陣為 VIP 專屬，請升級會員');
            return;
        }
        onSelectSpread(spreadId);
    };

    return (
        <div className="max-w-4xl w-full animate-fade-up">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-cinzel font-black tracking-tighter gold-text-shimmer mb-2">
                    {selectedCategory ? '選擇牌陣' : '今日想問什麼？'}
                </h1>
                <p className="text-[10px] font-cinzel tracking-[0.8em] text-[#d4af37]/60 uppercase ml-[0.8em]">
                    {selectedCategory ? 'Select Your Spread' : 'Choose Your Path'}
                </p>
            </header>

            {/* 返回按鈕 */}
            <button
                onClick={selectedCategory ? () => setSelectedCategory(null) : onBack}
                className="mb-8 text-[#d4af37]/80 hover:text-[#d4af37] font-cinzel text-sm tracking-widest uppercase flex items-center gap-2 group transition-all border border-[#d4af37]/40 px-4 py-2 rounded-full hover:bg-[#d4af37]/10"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                {selectedCategory ? '返回分類' : '返回首頁'}
            </button>

            {/* 分類選擇 */}
            {!selectedCategory && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleSelectCategory(cat.id)}
                            className="divine-vessel p-6 md:p-10 text-center hover:bg-[#d4af37]/5 transition-all group"
                        >
                            <div
                                className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform"
                                style={{ filter: `drop-shadow(0 0 10px ${cat.color}40)` }}
                            >
                                {cat.icon}
                            </div>
                            <h3
                                className="text-xl md:text-2xl font-cinzel font-black tracking-widest"
                                style={{ color: cat.color }}
                            >
                                {cat.name}
                            </h3>
                        </button>
                    ))}
                </div>
            )}

            {/* 牌陣選擇 */}
            {selectedCategory && (
                <div className="space-y-4">
                    {spreadsInCategory.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[#d4af37]/40 font-lora italic">此分類尚無牌陣</p>
                        </div>
                    ) : (
                        spreadsInCategory.map((spread) => {
                            const isLocked = spread.isVip && !isVip;
                            return (
                                <button
                                    key={spread.id}
                                    onClick={() => handleSelectSpread(spread.id, spread.isVip)}
                                    className={`w-full divine-vessel p-6 md:p-8 text-center transition-all ${isLocked ? 'opacity-60' : 'hover:bg-[#d4af37]/5'
                                        }`}
                                >
                                    <div className="flex flex-col items-center mb-3">
                                        <h3 className="text-xl md:text-2xl font-cinzel font-black text-[#d4af37] tracking-wider">
                                            {spread.nameZh}
                                            {isLocked && (
                                                <span className="ml-2 text-sm text-yellow-500/80 font-normal">
                                                    👑 VIP
                                                </span>
                                            )}
                                        </h3>
                                        <span className="text-[#d4af37]/40 font-cinzel text-sm mt-1">
                                            {spread.positions.length} 張牌
                                        </span>
                                    </div>
                                    <p className="text-[#d4af37]/60 font-lora italic text-sm mb-4">
                                        {spread.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {spread.positions.slice(0, 5).map((pos, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37]/60 text-xs font-cinzel"
                                            >
                                                {pos.name}
                                            </span>
                                        ))}
                                        {spread.positions.length > 5 && (
                                            <span className="px-3 py-1 text-[#d4af37]/40 text-xs font-cinzel">
                                                +{spread.positions.length - 5} 更多
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default SpreadSelector;
