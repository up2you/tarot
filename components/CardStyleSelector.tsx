/**
 * 牌面風格選擇器元件
 * 讓用戶選擇 13 種塔羅牌風格
 */

import React, { useState } from 'react';
import { CARD_STYLES, CardStyle } from '../constants/cardStyles';

interface CardStyleSelectorProps {
    currentStyle: string;
    onSelect: (styleId: string) => void;
    onClose: () => void;
    isVip?: boolean;
}

const CardStyleSelector: React.FC<CardStyleSelectorProps> = ({
    currentStyle,
    onSelect,
    onClose,
    isVip = false
}) => {
    const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

    const handleSelect = (style: CardStyle) => {
        if (style.isComingSoon) {
            return; // 即將推出的風格不可選
        }
        if (style.isVip && !isVip) {
            alert('此風格為 VIP 專屬，請升級會員');
            return;
        }
        onSelect(style.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 背景遮罩 */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 選擇器面板 */}
            <div className="relative bg-gray-900 border border-[#d4af37]/30 rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden animate-fade-up">
                {/* 標題 */}
                <div className="p-6 border-b border-[#d4af37]/20 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-cinzel font-bold text-[#d4af37]">選擇牌面風格</h2>
                        <p className="text-[#d4af37]/60 text-sm mt-1">切換您喜愛的塔羅牌藝術風格</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#d4af37]/40 hover:text-[#d4af37] text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* 風格列表 */}
                <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {CARD_STYLES.map((style) => {
                            const isSelected = style.id === currentStyle;
                            const isLocked = style.isVip && !isVip;
                            const isComingSoon = style.isComingSoon;

                            return (
                                <button
                                    key={style.id}
                                    onClick={() => handleSelect(style)}
                                    onMouseEnter={() => setHoveredStyle(style.id)}
                                    onMouseLeave={() => setHoveredStyle(null)}
                                    disabled={isComingSoon}
                                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                            ? 'border-[#d4af37] bg-[#d4af37]/10'
                                            : isComingSoon
                                                ? 'border-gray-700 bg-gray-800/50 opacity-60 cursor-not-allowed'
                                                : 'border-gray-700 hover:border-[#d4af37]/50 hover:bg-gray-800/50'
                                        }`}
                                >
                                    {/* 預覽圖區域 */}
                                    <div
                                        className="aspect-[2/3] rounded-lg mb-3 flex items-center justify-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${style.primaryColor}20, ${style.primaryColor}40)`,
                                            border: `1px solid ${style.primaryColor}40`
                                        }}
                                    >
                                        {isComingSoon ? (
                                            <span className="text-gray-500 text-sm">即將推出</span>
                                        ) : (
                                            <span className="text-4xl opacity-50">🎴</span>
                                        )}
                                    </div>

                                    {/* 風格名稱 */}
                                    <p
                                        className="font-cinzel font-bold text-sm"
                                        style={{ color: isComingSoon ? '#666' : style.primaryColor }}
                                    >
                                        {style.nameZh}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">{style.description}</p>

                                    {/* 標記 */}
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center">
                                            <span className="text-black text-sm">✓</span>
                                        </div>
                                    )}
                                    {isLocked && !isComingSoon && (
                                        <div className="absolute top-2 right-2 text-yellow-500">👑</div>
                                    )}
                                    {isComingSoon && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-700 rounded text-[10px] text-gray-400">
                                            SOON
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 底部 */}
                <div className="p-4 border-t border-[#d4af37]/20 text-center">
                    <p className="text-[#d4af37]/40 text-sm">
                        更多風格即將推出 · 敬請期待
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardStyleSelector;
