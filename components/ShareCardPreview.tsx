/**
 * 分享圖卡預覽組件
 * 用於生成可分享的精美圖片
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
            // 移除 Markdown 標記
            const cleaned = text
                .replace(/^#+\s+/gm, '')
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/---/g, '')
                .trim();

            // 取前 120 字
            if (cleaned.length > 120) {
                return cleaned.slice(0, 120) + '...';
            }
            return cleaned;
        };

        const summary = getSummary(interpretation);

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

                {/* 牌陣展示 */}
                <div className="flex justify-center gap-3 mb-6">
                    {spread.slice(0, 3).map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div
                                className="w-20 h-32 rounded-lg border-2 border-[#d4af37]/50 overflow-hidden shadow-lg"
                                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
                            >
                                <img
                                    src={s.aiImage || s.card.image}
                                    alt={s.card.nameZh}
                                    className={`w-full h-full object-cover ${s.isReversed ? 'rotate-180' : ''}`}
                                    crossOrigin="anonymous"
                                />
                            </div>
                            <p className="text-[#d4af37]/70 text-[10px] mt-2 tracking-wider">
                                {s.position}
                            </p>
                            <p className="text-[#f3e5ab] text-xs font-bold">
                                {s.card.nameZh}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 若超過 3 張顯示更多標記 */}
                {spread.length > 3 && (
                    <p className="text-center text-[#d4af37]/40 text-xs mb-4">
                        +{spread.length - 3} 張牌陣
                    </p>
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
