/**
 * 升級 VIP 彈窗元件
 * 當用戶免費額度用完時顯示
 */

import React from 'react';

interface UpgradeModalProps {
    onClose: () => void;
    remainingQuota?: number;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, remainingQuota = 0 }) => {
    const handleUpgrade = () => {
        // 導向付費頁面
        window.location.href = '/services';
    };

    return (
        <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-2 border-[#d4af37]/40 rounded-3xl p-8 text-center relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 裝飾背景 */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] pointer-events-none"></div>

                {/* 關閉按鈕 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#d4af37]/60 hover:text-[#d4af37] text-2xl transition-colors"
                >
                    ✕
                </button>

                {/* 圖標 */}
                <div className="text-6xl mb-6 animate-float">🔮</div>

                {/* 標題 */}
                <h2 className="text-2xl font-cinzel font-black text-[#d4af37] tracking-widest mb-3">
                    神諭次數已用盡
                </h2>

                <p className="text-[#d4af37]/60 font-lora italic mb-8 leading-relaxed">
                    您本月的免費占卜次數已用完<br />
                    升級 VIP 即可獲得無限次占卜
                </p>

                {/* VIP 權益 */}
                <div className="bg-black/40 rounded-2xl p-6 mb-8 border border-[#d4af37]/20">
                    <p className="text-[#d4af37]/80 font-cinzel text-sm tracking-widest uppercase mb-4">
                        👑 VIP 專屬權益
                    </p>
                    <ul className="text-left space-y-3 text-[#d4af37]/70">
                        <li className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            <span>無限次占卜</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            <span>無限次追問解讀</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            <span>解鎖凱爾特十字等高級牌陣</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            <span>專屬主題與牌面風格</span>
                        </li>
                    </ul>
                </div>

                {/* 按鈕 */}
                <div className="space-y-3">
                    <button
                        onClick={handleUpgrade}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-cinzel font-black tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-amber-500/30"
                    >
                        立即升級 VIP
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-3 text-[#d4af37]/40 font-cinzel text-sm tracking-widest hover:text-[#d4af37]/70 transition-colors"
                    >
                        下次再說
                    </button>
                </div>

                {/* 額度提示 */}
                <p className="mt-6 text-[#d4af37]/30 text-xs font-cinzel">
                    免費額度每月重置 · 目前剩餘 {remainingQuota} 次
                </p>
            </div>
        </div>
    );
};

export default UpgradeModal;
