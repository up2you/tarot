/**
 * 牌面管理頁面 - 13 種風格
 */

import React, { useState } from 'react';
import { CARD_STYLES } from '../../constants/cardStyles';
import { MAJOR_ARCANA, CARD_BACK_IMAGE } from '../../constants';

const CardsPage: React.FC = () => {
    const [selectedStyle, setSelectedStyle] = useState('classic');

    const currentStyle = CARD_STYLES.find(s => s.id === selectedStyle);
    const isClassic = selectedStyle === 'classic';

    return (
        <div className="space-y-6">
            {/* 風格選擇 */}
            <div className="flex gap-4 flex-wrap">
                <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white min-w-64"
                >
                    {CARD_STYLES.map((style) => (
                        <option key={style.id} value={style.id}>
                            {style.nameZh} {style.isComingSoon ? '(即將推出)' : ''}
                        </option>
                    ))}
                </select>
                <button className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400">
                    批量上傳
                </button>
            </div>

            {/* 當前風格資訊 */}
            {currentStyle && (
                <div
                    className="p-4 rounded-xl border flex items-center gap-4"
                    style={{
                        borderColor: currentStyle.primaryColor + '40',
                        backgroundColor: currentStyle.primaryColor + '10'
                    }}
                >
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: currentStyle.primaryColor + '30' }}
                    >
                        🎴
                    </div>
                    <div>
                        <p className="font-bold text-lg" style={{ color: currentStyle.primaryColor }}>
                            {currentStyle.nameZh}
                            {currentStyle.isComingSoon && (
                                <span className="ml-2 px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                                    即將推出
                                </span>
                            )}
                            {isClassic && (
                                <span className="ml-2 px-2 py-1 bg-green-500/20 rounded text-xs text-green-400">
                                    ✓ 已上傳
                                </span>
                            )}
                        </p>
                        <p className="text-gray-400 text-sm">{currentStyle.description}</p>
                    </div>
                </div>
            )}

            {/* 22 張大阿爾卡那 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                    🎴 22 張大阿爾卡那
                    {isClassic && <span className="text-green-400 text-sm font-normal ml-2">(已完成)</span>}
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {MAJOR_ARCANA.map((card, idx) => (
                        <div
                            key={idx}
                            className="aspect-[2/3] bg-gray-900 rounded-lg border-2 border-gray-700 flex items-center justify-center hover:border-amber-500 cursor-pointer transition-all overflow-hidden relative group"
                        >
                            {isClassic ? (
                                <>
                                    <img
                                        src={card.image}
                                        alt={card.nameZh}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Hover 顯示名稱 */}
                                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                                        <span className="text-amber-400 text-xs font-bold text-center">{idx}</span>
                                        <span className="text-white text-xs text-center mt-1">{card.nameZh}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <span className="text-2xl text-gray-600">+</span>
                                    <p className="text-gray-500 text-xs mt-1">{idx}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 牌背 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                    🔮 牌背
                    {isClassic && <span className="text-green-400 text-sm font-normal ml-2">(已完成)</span>}
                </h3>
                <div className="flex gap-4">
                    <div className="w-32 aspect-[2/3] bg-gray-900 rounded-lg border-2 border-gray-700 overflow-hidden">
                        {isClassic ? (
                            <img
                                src={CARD_BACK_IMAGE}
                                alt="牌背"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-2xl text-gray-600">+</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 所有風格快覽 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 所有風格 ({CARD_STYLES.length} 種)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {CARD_STYLES.map((style) => (
                        <div
                            key={style.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedStyle === style.id
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-gray-700 hover:border-gray-600'
                                }`}
                            onClick={() => setSelectedStyle(style.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: style.primaryColor }}
                                >
                                    {style.id === 'classic' && <span className="text-xs">✓</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">{style.nameZh}</p>
                                    <p className="text-gray-500 text-xs truncate">{style.name}</p>
                                </div>
                                {style.isComingSoon && (
                                    <span className="px-2 py-1 bg-gray-700 rounded text-[10px] text-gray-400">
                                        SOON
                                    </span>
                                )}
                                {style.id === 'classic' && (
                                    <span className="px-2 py-1 bg-green-500/20 rounded text-[10px] text-green-400">
                                        完成
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardsPage;
