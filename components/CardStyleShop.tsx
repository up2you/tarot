/**
 * 牌面風格商店組件
 * 用於預覽和購買牌面風格
 */

import React, { useState, useEffect } from 'react';
import {
    CardStyle,
    StyleWithOwnership,
    STYLE_CATEGORIES,
    getStylesWithOwnership,
    getFreeStyles,
    purchaseStyle,
    setActiveStyle,
    getActiveStyle,
    formatStylePrice,
} from '../services/cardStyleService';
import { supabase } from '../services/supabaseClient';

interface CardStyleShopProps {
    onStyleChange?: (styleKey: string) => void;
}

const CardStyleShop: React.FC<CardStyleShopProps> = ({ onStyleChange }) => {
    const [styles, setStyles] = useState<StyleWithOwnership[]>([]);
    const [activeStyleKey, setActiveStyleKey] = useState('classic');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [previewStyle, setPreviewStyle] = useState<StyleWithOwnership | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);

        // 取得用戶資訊
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            setUserId(user.id);

            // 取得風格（含擁有狀態）
            const stylesData = await getStylesWithOwnership(user.id);
            setStyles(stylesData);

            // 取得當前使用的風格
            const active = await getActiveStyle(user.id);
            setActiveStyleKey(active);
        } else {
            // 未登入用戶只顯示免費風格
            const freeStyles = await getFreeStyles();
            setStyles(freeStyles.map(s => ({ ...s, is_owned: true })));
        }

        setIsLoading(false);
    };

    const handlePurchase = async (style: StyleWithOwnership) => {
        if (!userId) {
            setMessage({ type: 'error', text: '請先登入' });
            return;
        }

        if (style.is_owned) {
            setMessage({ type: 'error', text: '您已擁有此風格' });
            return;
        }

        // TODO: 整合付款流程
        // 這裡暫時模擬購買成功
        const result = await purchaseStyle(userId, style.id, style.price);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            // 重新載入資料
            await loadData();
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    const handleSetActive = async (styleKey: string) => {
        if (!userId) return;

        const success = await setActiveStyle(userId, styleKey);
        if (success) {
            setActiveStyleKey(styleKey);
            if (onStyleChange) {
                onStyleChange(styleKey);
            }
            setMessage({ type: 'success', text: '風格已切換' });
        }
    };

    const filteredStyles = selectedCategory
        ? styles.filter(s => s.category === selectedCategory)
        : styles;

    const ownedCount = styles.filter(s => s.is_owned).length;

    // 清除訊息
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-8 px-4">
            {/* 訊息提示 */}
            {message && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                    {message.text}
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* 標題 */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">🎴 牌面風格商店</h1>
                    <p className="text-gray-400">
                        探索 {styles.length} 種精美牌面風格，一次購買，永久擁有
                    </p>
                    <div className="mt-3 text-amber-400">
                        已擁有：{ownedCount} / {styles.length} 種風格
                    </div>
                </div>

                {/* 分類篩選 */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full transition-all ${selectedCategory === null
                                ? 'bg-amber-500 text-black'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        全部
                    </button>
                    {Object.entries(STYLE_CATEGORIES).map(([key, cat]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className={`px-4 py-2 rounded-full transition-all ${selectedCategory === key
                                    ? 'bg-amber-500 text-black'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {cat.icon} {cat.name_zh}
                        </button>
                    ))}
                </div>

                {/* 風格列表 */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-xl h-64 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredStyles.map((style) => (
                            <div
                                key={style.id}
                                className={`relative bg-gray-800 rounded-xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-105 ${activeStyleKey === style.style_key
                                        ? 'border-amber-500 shadow-lg shadow-amber-500/20'
                                        : style.is_owned
                                            ? 'border-green-500/50'
                                            : 'border-gray-700'
                                    }`}
                                onClick={() => setPreviewStyle(style)}
                            >
                                {/* 標籤 */}
                                <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                                    {style.is_featured && (
                                        <span className="bg-amber-500 text-black text-xs px-2 py-0.5 rounded-full">
                                            推薦
                                        </span>
                                    )}
                                    {style.is_new && (
                                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            新品
                                        </span>
                                    )}
                                    {style.is_free && (
                                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            免費
                                        </span>
                                    )}
                                </div>

                                {/* 使用中標記 */}
                                {activeStyleKey === style.style_key && (
                                    <div className="absolute top-2 left-2 bg-amber-500 text-black text-xs px-2 py-0.5 rounded-full z-10">
                                        使用中
                                    </div>
                                )}

                                {/* 預覽圖 */}
                                <div className="h-40 bg-gray-700 flex items-center justify-center">
                                    {style.preview_image_url ? (
                                        <img
                                            src={style.preview_image_url}
                                            alt={style.name_zh}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-6xl opacity-50">🎴</div>
                                    )}
                                </div>

                                {/* 資訊 */}
                                <div className="p-3">
                                    <h3 className="text-white font-bold truncate">{style.name_zh}</h3>
                                    <p className="text-gray-400 text-sm truncate">{style.name_en}</p>

                                    <div className="flex items-center justify-between mt-2">
                                        {style.is_owned ? (
                                            <span className="text-green-400 text-sm">✓ 已擁有</span>
                                        ) : (
                                            <span className="text-amber-400 font-bold">
                                                {formatStylePrice(style)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 預覽 Modal */}
                {previewStyle && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setPreviewStyle(null)}
                    >
                        <div
                            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* 預覽圖 */}
                            <div className="h-64 bg-gray-700 flex items-center justify-center">
                                {previewStyle.preview_image_url ? (
                                    <img
                                        src={previewStyle.preview_image_url}
                                        alt={previewStyle.name_zh}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-8xl opacity-50">🎴</div>
                                )}
                            </div>

                            <div className="p-6">
                                {/* 標題 */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{previewStyle.name_zh}</h2>
                                        <p className="text-gray-400">{previewStyle.name_en}</p>
                                    </div>
                                    <button
                                        onClick={() => setPreviewStyle(null)}
                                        className="text-gray-400 hover:text-white text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* 描述 */}
                                {previewStyle.description_zh && (
                                    <p className="text-gray-300 mb-4">{previewStyle.description_zh}</p>
                                )}

                                {/* 樣本牌卡 */}
                                {previewStyle.sample_cards_urls && previewStyle.sample_cards_urls.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-white font-bold mb-2">樣本預覽</h4>
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {previewStyle.sample_cards_urls.map((url, i) => (
                                                <img
                                                    key={i}
                                                    src={url}
                                                    alt={`樣本 ${i + 1}`}
                                                    className="h-32 rounded-lg"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 價格和按鈕 */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div>
                                        {previewStyle.original_price && (
                                            <span className="text-gray-500 line-through mr-2">
                                                NT$ {previewStyle.original_price}
                                            </span>
                                        )}
                                        <span className="text-2xl font-bold text-amber-400">
                                            {formatStylePrice(previewStyle)}
                                        </span>
                                        {!previewStyle.is_free && (
                                            <p className="text-gray-400 text-sm mt-1">一次購買，永久擁有</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {previewStyle.is_owned ? (
                                            activeStyleKey === previewStyle.style_key ? (
                                                <button
                                                    disabled
                                                    className="px-6 py-2 bg-gray-600 text-gray-400 rounded-xl cursor-not-allowed"
                                                >
                                                    使用中
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        handleSetActive(previewStyle.style_key);
                                                        setPreviewStyle(null);
                                                    }}
                                                    className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-400 transition-colors"
                                                >
                                                    立即使用
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                onClick={() => handlePurchase(previewStyle)}
                                                className="px-6 py-2 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors"
                                            >
                                                購買解鎖
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* 購買次數 */}
                                {previewStyle.purchase_count > 0 && (
                                    <p className="text-gray-500 text-sm mt-2 text-center">
                                        已有 {previewStyle.purchase_count} 人購買
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 底部說明 */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>🎨 所有風格一次購買，永久擁有</p>
                    <p className="mt-1">即使訂閱中斷，重新訂閱後仍可使用已購買的風格</p>
                </div>
            </div>
        </div>
    );
};

export default CardStyleShop;
