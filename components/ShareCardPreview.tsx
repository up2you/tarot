/**
 * 分享圖卡預覽組件
 * 用於生成可分享的精美圖片
 * 支援 3 張牌、10 張牌（凱爾特十字）等不同牌陣
 */

import React, { forwardRef } from 'react';
import { CardReading } from '../types';

interface ShareCardPreviewProps {
    spread: (CardReading & { aiImage?: string })[];
    question: string;
    interpretation: string;
}

const ShareCardPreview = forwardRef<HTMLDivElement, ShareCardPreviewProps>(
    ({ spread, question, interpretation }, ref) => {
        // 摘取解讀摘要（前 120 字）
        const getSummary = (text: string) => {
            const cleaned = text
                .replace(/^#+\s+/gm, '')
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/---/g, '')
                .trim();
            if (cleaned.length > 120) {
                return cleaned.slice(0, 120) + '...';
            }
            return cleaned;
        };

        const summary = getSummary(interpretation);
        const isLargeSpread = spread.length > 5;

        // 渲染單張牌
        const renderCard = (s: typeof spread[0], idx: number, size: 'sm' | 'xs' = 'sm') => {
            const sizeClasses = size === 'xs'
                ? 'w-12 h-20'
                : 'w-20 h-32';
            return (
                <div key={idx} className="flex flex-col items-center">
                    <div
                        className={`${sizeClasses} rounded-lg border border-[#d4af37]/50 overflow-hidden shadow-lg`}
                        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
                    >
                        <img
                            src={s.aiImage || s.card.image}
                            alt={s.card.nameZh}
                            className={`w-full h-full object-cover ${s.isReversed ? 'rotate-180' : ''}`}
                            crossOrigin="anonymous"
                        />
                    </div>
                    <p className={`text-[#f3e5ab] font-bold mt-1 ${size === 'xs' ? 'text-[8px]' : 'text-xs'}`}>
                        {s.card.nameZh}
                    </p>
                </div>
            );
        };

        return (
            <div
                ref={ref}
                className="w-[540px] bg-gradient-to-b from-[#0a0505] via-[#120808] to-[#0a0505] p-8 font-serif"
                style={{
                    fontFamily: "'Cinzel', 'Lora', serif",
                }}
            >
                {/* 品牌標題 */}
                <div className="text-center mb-6">
                    <h1
                        className="text-3xl font-black tracking-[0.3em] text-transparent bg-clip-text"
                        style={{
                            background: 'linear-gradient(90deg, #a68527, #d4af37, #f3e5ab, #d4af37, #a68527)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        AETHERIS
                    </h1>
                    <p className="text-[#d4af37]/60 text-xs tracking-[0.5em] mt-1">
                        DIVINE ORACLE
                    </p>
                </div>

                {/* 分隔線 */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-6" />

                {/* 牌陣展示 - 根據數量調整佈局 */}
                {isLargeSpread ? (
                    // 大型牌陣（凱爾特十字等）使用網格
                    <div className="mb-6">
                        <div className="grid grid-cols-5 gap-2 justify-items-center">
                            {spread.map((s, idx) => renderCard(s, idx, 'xs'))}
                        </div>
                    </div>
                ) : (
                    // 小型牌陣（3張）水平排列
                    <div className="flex justify-center gap-3 mb-6">
                        {spread.map((s, idx) => renderCard(s, idx, 'sm'))}
                    </div>
                )}

                {/* 分隔線 */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-5" />

                {/* 問題 */}
                <div className="bg-[#000]/40 rounded-xl p-4 mb-5 border border-[#d4af37]/20">
                    <p className="text-[#f3e5ab] text-sm italic text-center leading-relaxed">
                        「{question}」
                    </p>
                </div>

                {/* 解讀摘要 */}
                <div className="mb-6">
                    <p className="text-[#d4af37]/60 text-xs tracking-widest mb-2">神諭啟示</p>
                    <p className="text-[#ccc] text-sm leading-relaxed">
                        {summary}
                    </p>
                </div>

                {/* 底部品牌 */}
                <div className="text-center pt-4 border-t border-[#d4af37]/20">
                    <p className="text-[#d4af37]/50 text-xs tracking-widest">
                        majorarcana.app
                    </p>
                </div>
            </div>
        );
    }
);

ShareCardPreview.displayName = 'ShareCardPreview';

export default ShareCardPreview;
