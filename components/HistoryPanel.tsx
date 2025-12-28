/**
 * 占卜歷史記錄面板
 * 顯示使用者過去的占卜記錄，支援查看、刪除
 */

import React, { useState, useEffect } from 'react';
import { ReadingRecord } from '../types';
import {
    getReadings,
    deleteReading,
    clearAllReadings,
    formatDate,
    truncateQuestion
} from '../services/historyService';

interface HistoryPanelProps {
    onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClose }) => {
    const [records, setRecords] = useState<ReadingRecord[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showConfirmClear, setShowConfirmClear] = useState(false);

    useEffect(() => {
        setRecords(getReadings());
    }, []);

    const handleDelete = (id: string) => {
        if (deleteReading(id)) {
            setRecords(prev => prev.filter(r => r.id !== id));
            if (expandedId === id) setExpandedId(null);
        }
    };

    const handleClearAll = () => {
        clearAllReadings();
        setRecords([]);
        setShowConfirmClear(false);
    };

    const toggleExpand = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col animate-fade-up">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#d4af37]/20">
                <div>
                    <h2 className="text-2xl font-cinzel text-[#d4af37] font-black tracking-widest">
                        占卜歷史
                    </h2>
                    <p className="text-xs text-[#d4af37]/40 font-lora italic mt-1">
                        共 {records.length} 筆記錄 · 僅保存於此裝置
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {records.length > 0 && (
                        <button
                            onClick={() => setShowConfirmClear(true)}
                            className="px-4 py-2 text-xs font-cinzel tracking-wider text-red-400/60 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 rounded-full transition-all"
                        >
                            清空全部
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Confirm Clear Dialog */}
            {showConfirmClear && (
                <div className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center p-6">
                    <div className="divine-vessel p-8 max-w-sm w-full text-center">
                        <h3 className="text-xl font-cinzel text-[#d4af37] mb-4">確定清空所有記錄？</h3>
                        <p className="text-[#d4af37]/60 font-lora italic text-sm mb-6">
                            此操作無法復原，所有占卜歷史將永久刪除。
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConfirmClear(false)}
                                className="flex-1 py-3 rounded-full border border-[#d4af37]/30 text-[#d4af37] font-cinzel text-sm hover:bg-[#d4af37]/10 transition-all"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="flex-1 py-3 rounded-full bg-red-900/50 border border-red-400/30 text-red-300 font-cinzel text-sm hover:bg-red-900/70 transition-all"
                            >
                                確定清空
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Records List */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {records.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-6xl mb-6 opacity-20">🔮</div>
                        <p className="text-[#d4af37]/40 font-cinzel text-lg mb-2">尚無占卜記錄</p>
                        <p className="text-[#d4af37]/20 font-lora italic text-sm">
                            完成一次占卜後，記錄將自動保存於此
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        {records.map((record) => (
                            <div
                                key={record.id}
                                className="divine-vessel overflow-hidden transition-all"
                            >
                                {/* Record Header - Always visible */}
                                <div
                                    className="p-5 cursor-pointer hover:bg-[#d4af37]/5 transition-all"
                                    onClick={() => toggleExpand(record.id)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest mb-1">
                                                {formatDate(record.timestamp)}
                                            </p>
                                            <p className="text-[#f3e5ab] font-lora italic truncate">
                                                「{truncateQuestion(record.question, 40)}」
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {/* Card Icons */}
                                            <div className="flex -space-x-2">
                                                {record.cards.map((card, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`w-6 h-8 rounded border border-[#d4af37]/30 bg-[#1a0505] flex items-center justify-center text-[8px] text-[#d4af37]/60 ${card.isReversed ? 'rotate-180' : ''
                                                            }`}
                                                        title={`${card.nameZh} (${card.isReversed ? '逆位' : '正位'})`}
                                                    >
                                                        ✦
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Expand Arrow */}
                                            <span className={`text-[#d4af37]/40 transition-transform ${expandedId === record.id ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedId === record.id && (
                                    <div className="px-5 pb-5 border-t border-[#d4af37]/10 animate-fade-up">
                                        {/* Question */}
                                        <div className="py-4 border-b border-[#d4af37]/10">
                                            <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest mb-2">問題</p>
                                            <p className="text-[#f3e5ab] font-lora italic">「{record.question}」</p>
                                        </div>

                                        {/* Cards */}
                                        <div className="py-4 border-b border-[#d4af37]/10">
                                            <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest mb-3">牌陣</p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {record.cards.map((card, idx) => (
                                                    <div key={idx} className="text-center">
                                                        <p className="text-[8px] font-cinzel text-[#d4af37]/40 uppercase mb-1">
                                                            {card.position}
                                                        </p>
                                                        <div className={`p-2 rounded border border-[#d4af37]/20 ${card.isReversed ? 'bg-red-900/10' : 'bg-[#d4af37]/5'}`}>
                                                            <p className="text-sm text-[#d4af37] font-cinzel">{card.nameZh}</p>
                                                            <p className="text-[10px] text-[#d4af37]/40">{card.name}</p>
                                                            <p className={`text-[10px] mt-1 ${card.isReversed ? 'text-red-400/60' : 'text-green-400/60'}`}>
                                                                {card.isReversed ? '逆位' : '正位'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Interpretation Summary */}
                                        {record.interpretation && (
                                            <div className="py-4 border-b border-[#d4af37]/10">
                                                <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest mb-2">解讀摘要</p>
                                                <p className="text-[#d4af37]/60 font-lora text-sm leading-relaxed line-clamp-4">
                                                    {record.interpretation}
                                                </p>
                                            </div>
                                        )}

                                        {/* Delete Button */}
                                        <div className="pt-4 flex justify-end">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(record.id);
                                                }}
                                                className="px-4 py-2 text-xs font-cinzel tracking-wider text-red-400/60 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 rounded-full transition-all"
                                            >
                                                刪除此記錄
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPanel;
