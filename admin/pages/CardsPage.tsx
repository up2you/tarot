/**
 * 牌面管理頁面 - 完整功能實作
 * 支援批量上傳、單張上傳、刪除、預覽
 */

import React, { useState, useEffect, useRef } from 'react';
import { CARD_STYLES } from '../../constants/cardStyles';
import { MAJOR_ARCANA, CARD_BACK_IMAGE } from '../../constants';
import {
    uploadCardImage,
    uploadCardImages,
    getStyleCardImages,
    checkStyleCompletion,
    deleteCardImage
} from '../../services/cardStorageService';

const CardsPage: React.FC = () => {
    const [selectedStyle, setSelectedStyle] = useState('classic');
    const [uploadedImages, setUploadedImages] = useState<Map<number, string>>(new Map());
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
    const [styleStats, setStyleStats] = useState<Map<string, { uploaded: number; total: number }>>(new Map());
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const batchInputRef = useRef<HTMLInputElement>(null);
    const [pendingCardIndex, setPendingCardIndex] = useState<number | null>(null);

    const currentStyle = CARD_STYLES.find(s => s.id === selectedStyle);
    const isClassic = selectedStyle === 'classic';

    // 載入風格的圖片
    const loadStyleImages = async (styleId: string) => {
        if (styleId === 'classic') {
            // 經典風格使用本地圖片
            const localImages = new Map<number, string>();
            MAJOR_ARCANA.forEach((card, idx) => {
                localImages.set(idx, card.image);
            });
            localImages.set(-1, CARD_BACK_IMAGE);
            setUploadedImages(localImages);
            return;
        }

        setIsLoading(true);
        try {
            const images = await getStyleCardImages(styleId);
            setUploadedImages(images);
        } catch (err) {
            console.error('Failed to load images:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 載入所有風格的統計
    const loadAllStyleStats = async () => {
        const stats = new Map<string, { uploaded: number; total: number }>();

        // 經典風格已完成
        stats.set('classic', { uploaded: 23, total: 23 });

        for (const style of CARD_STYLES) {
            if (style.id === 'classic') continue;

            try {
                const completion = await checkStyleCompletion(style.id);
                stats.set(style.id, { uploaded: completion.uploaded, total: completion.total });
            } catch {
                stats.set(style.id, { uploaded: 0, total: 23 });
            }
        }

        setStyleStats(stats);
    };

    useEffect(() => {
        loadStyleImages(selectedStyle);
    }, [selectedStyle]);

    useEffect(() => {
        loadAllStyleStats();
    }, []);

    // 單張上傳處理
    const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || pendingCardIndex === null) return;

        setIsLoading(true);
        setMessage(null);

        try {
            const url = await uploadCardImage(selectedStyle, pendingCardIndex, file);
            if (url) {
                setUploadedImages(prev => {
                    const newMap = new Map(prev);
                    newMap.set(pendingCardIndex, url + '?t=' + Date.now()); // 加時間戳防快取
                    return newMap;
                });
                setMessage({ type: 'success', text: `成功上傳 ${pendingCardIndex === -1 ? '牌背' : MAJOR_ARCANA[pendingCardIndex]?.nameZh}` });
                loadAllStyleStats();
            } else {
                setMessage({ type: 'error', text: '上傳失敗，請重試' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: '上傳發生錯誤' });
        } finally {
            setIsLoading(false);
            setPendingCardIndex(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    // 批量上傳處理
    const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsLoading(true);
        setMessage(null);
        setUploadProgress({ current: 0, total: files.length });

        const uploadList: { cardIndex: number; file: File }[] = [];

        // 解析檔案名稱對應 cardIndex
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const name = file.name.toLowerCase();

            if (name.includes('back') || name === 'back.png' || name === 'back.jpg') {
                uploadList.push({ cardIndex: -1, file });
            } else {
                // 嘗試從檔名解析數字
                const match = name.match(/(\d+)/);
                if (match) {
                    const num = parseInt(match[1]);
                    if (num >= 0 && num <= 21) {
                        uploadList.push({ cardIndex: num, file });
                    }
                }
            }
        }

        if (uploadList.length === 0) {
            setMessage({ type: 'error', text: '無法識別檔案名稱。請使用 0.png ~ 21.png 和 back.png' });
            setIsLoading(false);
            setUploadProgress(null);
            return;
        }

        // 逐個上傳並更新進度
        let successCount = 0;
        for (let i = 0; i < uploadList.length; i++) {
            const { cardIndex, file } = uploadList[i];
            setUploadProgress({ current: i + 1, total: uploadList.length });

            const url = await uploadCardImage(selectedStyle, cardIndex, file);
            if (url) {
                successCount++;
                setUploadedImages(prev => {
                    const newMap = new Map(prev);
                    newMap.set(cardIndex, url + '?t=' + Date.now());
                    return newMap;
                });
            }
        }

        setUploadProgress(null);
        setIsLoading(false);
        setMessage({
            type: successCount > 0 ? 'success' : 'error',
            text: `批量上傳完成：成功 ${successCount} 張，失敗 ${uploadList.length - successCount} 張`
        });
        loadAllStyleStats();

        if (batchInputRef.current) batchInputRef.current.value = '';
    };

    // 刪除圖片
    const handleDeleteImage = async (cardIndex: number) => {
        if (!confirm(`確定要刪除 ${cardIndex === -1 ? '牌背' : MAJOR_ARCANA[cardIndex]?.nameZh} 嗎？`)) {
            return;
        }

        setIsLoading(true);
        const success = await deleteCardImage(selectedStyle, cardIndex);

        if (success) {
            setUploadedImages(prev => {
                const newMap = new Map(prev);
                newMap.delete(cardIndex);
                return newMap;
            });
            setMessage({ type: 'success', text: '已刪除' });
            loadAllStyleStats();
        } else {
            setMessage({ type: 'error', text: '刪除失敗' });
        }

        setIsLoading(false);
    };

    // 點擊牌卡觸發上傳
    const handleCardClick = (cardIndex: number) => {
        if (isClassic) return; // 經典風格不可編輯
        setPendingCardIndex(cardIndex);
        fileInputRef.current?.click();
    };

    // 清除訊息
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="space-y-6">
            {/* 隱藏的檔案輸入 */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSingleUpload}
            />
            <input
                ref={batchInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleBatchUpload}
            />

            {/* 操作提示訊息 */}
            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
                    <p className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                        {message.text}
                    </p>
                </div>
            )}

            {/* 上傳進度 */}
            {uploadProgress && (
                <div className="bg-blue-500/20 border border-blue-500/50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                        <div className="flex-1">
                            <p className="text-blue-400 font-medium">正在上傳...</p>
                            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all"
                                    style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{uploadProgress.current} / {uploadProgress.total}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 風格選擇 */}
            <div className="flex gap-4 flex-wrap items-center">
                <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white min-w-64"
                    disabled={isLoading}
                >
                    {CARD_STYLES.map((style) => {
                        const stats = styleStats.get(style.id);
                        return (
                            <option key={style.id} value={style.id}>
                                {style.nameZh} {stats ? `(${stats.uploaded}/${stats.total})` : ''}
                            </option>
                        );
                    })}
                </select>

                {!isClassic && (
                    <button
                        onClick={() => batchInputRef.current?.click()}
                        disabled={isLoading}
                        className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 disabled:opacity-50"
                    >
                        📁 批量上傳
                    </button>
                )}

                {isLoading && (
                    <div className="w-6 h-6 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                )}
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
                    <div className="flex-1">
                        <p className="font-bold text-lg" style={{ color: currentStyle.primaryColor }}>
                            {currentStyle.nameZh}
                            {isClassic && (
                                <span className="ml-2 px-2 py-1 bg-green-500/20 rounded text-xs text-green-400">
                                    ✓ 系統內建
                                </span>
                            )}
                        </p>
                        <p className="text-gray-400 text-sm">{currentStyle.description}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: currentStyle.primaryColor }}>
                            {uploadedImages.size}/23
                        </p>
                        <p className="text-gray-500 text-xs">已上傳</p>
                    </div>
                </div>
            )}

            {/* 使用說明 */}
            {!isClassic && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">
                        💡 <strong className="text-white">上傳方式：</strong>
                        點擊空白牌卡上傳單張，或使用「批量上傳」一次上傳多張。
                        批量上傳時，請將檔案命名為 <code className="bg-gray-900 px-1 rounded">0.png</code> ~ <code className="bg-gray-900 px-1 rounded">21.png</code>（牌面）和 <code className="bg-gray-900 px-1 rounded">back.png</code>（牌背）。
                    </p>
                </div>
            )}

            {/* 22 張大阿爾卡那 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                    🎴 22 張大阿爾卡那
                    <span className="text-gray-400 text-sm font-normal ml-2">
                        ({[...uploadedImages.keys()].filter(k => k >= 0).length}/22 已上傳)
                    </span>
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {MAJOR_ARCANA.map((card, idx) => {
                        const imageUrl = uploadedImages.get(idx);
                        const hasImage = !!imageUrl;

                        return (
                            <div
                                key={idx}
                                className={`aspect-[2/3] bg-gray-900 rounded-lg border-2 flex items-center justify-center overflow-hidden relative group transition-all ${hasImage
                                        ? 'border-green-500/30 hover:border-green-500'
                                        : 'border-gray-700 hover:border-amber-500 cursor-pointer'
                                    }`}
                                onClick={() => !hasImage && handleCardClick(idx)}
                            >
                                {hasImage ? (
                                    <>
                                        <img
                                            src={imageUrl}
                                            alt={card.nameZh}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Hover 顯示名稱和操作 */}
                                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                                            <span className="text-amber-400 text-xs font-bold">{idx}</span>
                                            <span className="text-white text-xs text-center mt-1">{card.nameZh}</span>
                                            {!isClassic && (
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleCardClick(idx); }}
                                                        className="text-blue-400 text-xs hover:text-blue-300"
                                                    >
                                                        換
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteImage(idx); }}
                                                        className="text-red-400 text-xs hover:text-red-300"
                                                    >
                                                        刪
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-2">
                                        <span className="text-2xl text-gray-600">+</span>
                                        <p className="text-gray-500 text-xs mt-1">{idx}</p>
                                        <p className="text-gray-600 text-[10px] mt-1 truncate">{card.nameZh}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 牌背 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                    🔮 牌背
                    {uploadedImages.has(-1) && <span className="text-green-400 text-sm font-normal ml-2">(已上傳)</span>}
                </h3>
                <div className="flex gap-4 items-start">
                    <div
                        className={`w-32 aspect-[2/3] bg-gray-900 rounded-lg border-2 overflow-hidden relative group transition-all ${uploadedImages.has(-1)
                                ? 'border-green-500/30 hover:border-green-500'
                                : 'border-gray-700 hover:border-amber-500 cursor-pointer'
                            }`}
                        onClick={() => !uploadedImages.has(-1) && handleCardClick(-1)}
                    >
                        {uploadedImages.has(-1) ? (
                            <>
                                <img
                                    src={uploadedImages.get(-1)}
                                    alt="牌背"
                                    className="w-full h-full object-cover"
                                />
                                {!isClassic && (
                                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleCardClick(-1); }}
                                            className="text-blue-400 text-sm hover:text-blue-300"
                                        >
                                            更換
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteImage(-1); }}
                                            className="text-red-400 text-sm hover:text-red-300 mt-2"
                                        >
                                            刪除
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <span className="text-2xl text-gray-600">+</span>
                                <p className="text-gray-500 text-xs mt-2">點擊上傳</p>
                            </div>
                        )}
                    </div>
                    <div className="text-gray-400 text-sm">
                        <p>建議尺寸：<strong className="text-white">600 x 900 px</strong> (2:3 比例)</p>
                        <p className="mt-1">格式：PNG, JPG, WebP</p>
                    </div>
                </div>
            </div>

            {/* 所有風格快覽 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 所有風格 ({CARD_STYLES.length} 種)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {CARD_STYLES.map((style) => {
                        const stats = styleStats.get(style.id);
                        const isComplete = stats?.uploaded === stats?.total;

                        return (
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
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white"
                                        style={{ backgroundColor: style.primaryColor }}
                                    >
                                        {isComplete ? '✓' : stats?.uploaded || 0}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{style.nameZh}</p>
                                        <p className="text-gray-500 text-xs truncate">{style.name}</p>
                                    </div>
                                    {isComplete ? (
                                        <span className="px-2 py-1 bg-green-500/20 rounded text-[10px] text-green-400">
                                            完成
                                        </span>
                                    ) : stats?.uploaded ? (
                                        <span className="px-2 py-1 bg-yellow-500/20 rounded text-[10px] text-yellow-400">
                                            {stats.uploaded}/23
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 bg-gray-700 rounded text-[10px] text-gray-400">
                                            待上傳
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CardsPage;
