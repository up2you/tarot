/**
 * 牌陣選擇器 (已全面修復手機版 z-index / 上方固定選單避開與按鈕高亮對比問題)
 * 兩階段選擇：問題分類 → 牌陣
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SPREAD_CATEGORIES, SPREADS, getSpreadsByCategory } from '../constants';
import { useToast } from './Toast';

interface SpreadSelectorProps {
    isVip: boolean;
    onSelectSpread: (spreadId: string) => void;
    onBack: () => void;
}

const SpreadSelector: React.FC<SpreadSelectorProps> = ({ isVip, onSelectSpread, onBack }) => {
    const { t } = useTranslation();
    const toast = useToast();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Object.values(SPREAD_CATEGORIES);
    const spreadsInCategory = selectedCategory ? getSpreadsByCategory(selectedCategory) : [];

    const handleSelectCategory = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleSelectSpread = (spreadId: string, isSpreadVip: boolean) => {
        if (isSpreadVip && !isVip) {
            toast.info(t('spread_selector.vip_required') || '此牌陣為 VIP 專屬，請升級會員以解鎖');
            return;
        }
        onSelectSpread(spreadId);
    };

    return (
        <div className="relative z-30 w-full max-w-4xl mx-auto pt-16 sm:pt-6 pb-12 px-3 sm:px-6 animate-fade-up">
            {/* 標題區 */}
            <header className="mb-6 sm:mb-10 text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-black tracking-tighter gold-text-shimmer mb-2 drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
                    {selectedCategory ? t('spread_selector.select_spread') : t('spread_selector.today_question')}
                </h1>
                <p className="text-[10px] sm:text-xs font-cinzel tracking-[0.6em] sm:tracking-[0.8em] text-[#D4AF37]/90 uppercase ml-[0.6em] font-semibold">
                    {selectedCategory ? 'Select Your Spread' : 'Choose Your Path'}
                </p>
            </header>

            {/* 返回按鈕 (置頂層 z-40、具備獨立深底色與光暈邊框，避開遮擋) */}
            <div className="mb-6 flex justify-start">
                <button
                    type="button"
                    onClick={selectedCategory ? () => setSelectedCategory(null) : onBack}
                    className="relative z-40 text-[#F6E7B7] hover:text-[#FFD700] font-cinzel text-xs sm:text-sm font-semibold tracking-widest uppercase flex items-center gap-2 group transition-all duration-300 border-2 border-[#D4AF37]/70 bg-[#160E2A]/95 backdrop-blur-xl px-5 py-2.5 rounded-full hover:bg-[#D4AF37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.3)] active:scale-95 cursor-pointer"
                >
                    <span className="group-hover:-translate-x-1 transition-transform text-base sm:text-lg text-[#FFD700]">←</span>
                    <span>{selectedCategory ? t('spread_selector.back_to_categories') : t('spread_selector.back_to_home')}</span>
                </button>
            </div>

            {/* 第一階段：問題分類選擇 (感情, 事業, 運勢, 靈性, 人際) */}
            {!selectedCategory && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 relative z-30">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleSelectCategory(cat.id)}
                            className="relative z-30 p-5 sm:p-8 text-center bg-[#160E2A]/90 border-2 border-[#D4AF37]/50 hover:border-[#FFD700] hover:bg-[#D4AF37]/20 transition-all duration-300 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(123,77,255,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer group flex flex-col items-center justify-center"
                        >
                            <div
                                className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
                                style={{ filter: `drop-shadow(0 0 15px ${cat.color}60)` }}
                            >
                                {cat.icon}
                            </div>
                            <h3
                                className="text-lg sm:text-2xl font-cinzel font-extrabold tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                                style={{ color: cat.color }}
                            >
                                {t(`spreads:categories.${cat.id}`, cat.name)}
                            </h3>
                        </button>
                    ))}
                </div>
            )}

            {/* 第二階段：詳細牌陣選擇 */}
            {selectedCategory && (
                <div className="space-y-4 relative z-30">
                    {spreadsInCategory.length === 0 ? (
                        <div className="text-center py-16 bg-[#160E2A]/80 rounded-2xl border border-[#D4AF37]/30">
                            <p className="text-[#D4AF37]/70 font-lora italic text-base sm:text-lg">{t('spread_selector.no_spreads')}</p>
                        </div>
                    ) : (
                        spreadsInCategory.map((spread) => {
                            const isLocked = spread.isVip && !isVip;
                            return (
                                <button
                                    key={spread.id}
                                    type="button"
                                    onClick={() => handleSelectSpread(spread.id, spread.isVip)}
                                    className={`relative z-30 w-full p-5 sm:p-8 text-center transition-all duration-300 rounded-2xl bg-[#160E2A]/95 border-2 ${
                                        isLocked
                                            ? 'opacity-70 border-gray-600/50 bg-[#120B22]/90'
                                            : 'border-[#D4AF37]/50 hover:border-[#FFD700] hover:bg-[#D4AF37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.3)] active:scale-[0.99] cursor-pointer'
                                    }`}
                                >
                                    <div className="flex flex-col items-center mb-3">
                                        <h3 className="text-xl sm:text-2xl font-cinzel font-black text-[#F6E7B7] tracking-wider flex items-center gap-2">
                                            <span>{t(`spreads:spreads.${spread.id}.name`, spread.nameZh)}</span>
                                            {isLocked && (
                                                <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-normal">
                                                    👑 VIP
                                                </span>
                                            )}
                                        </h3>
                                        <span className="text-[#D4AF37]/70 font-cinzel text-xs sm:text-sm mt-1">
                                            {t('spread_selector.card_count', { count: spread.positions.length })}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 font-lora italic text-xs sm:text-sm mb-4 max-w-2xl mx-auto leading-relaxed">
                                        {t(`spreads:spreads.${spread.id}.desc`, spread.description)}
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {spread.positions.slice(0, 5).map((pos, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F6E7B7] text-xs font-cinzel"
                                            >
                                                {t(`spreads:positions.${pos.key}`, pos.name)}
                                            </span>
                                        ))}
                                        {spread.positions.length > 5 && (
                                            <span className="px-3 py-1 text-[#D4AF37]/60 text-xs font-cinzel">
                                                +{spread.positions.length - 5}{t('spread_selector.more')}
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
