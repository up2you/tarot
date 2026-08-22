/**
 * 占卜歷史記錄面板
 * 顯示使用者過去的占卜記錄，支援查看、刪除
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../hooks/i18n';
import { ReadingRecord } from '../types';
import { MAJOR_ARCANA } from '../constants';
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

/** 依 nameZh 查詢牌卡圖片 */
const getCardImage = (nameZh: string): string | null => {
    const card = MAJOR_ARCANA.find(c => c.nameZh === nameZh);
    return card ? card.image : null;
};

/** 依日期分組 key */
const getDateGroup = (timestamp: number): 'today' | 'yesterday' | 'week' | 'earlier' => {
    const now = new Date();
    const date = new Date(timestamp);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 86400000;
    const startOfWeek = startOfToday - (now.getDay() === 0 ? 6 : now.getDay() - 1) * 86400000;

    if (timestamp >= startOfToday) return 'today';
    if (timestamp >= startOfYesterday) return 'yesterday';
    if (timestamp >= startOfWeek) return 'week';
    return 'earlier';
};

const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [records, setRecords] = useState<ReadingRecord[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showConfirmClear, setShowConfirmClear] = useState(false);

    useEffect(() => {
        setRecords(getReadings());
    }, []);

    // 依日期分組（保持時間倒序）
    const grouped = useMemo(() => {
        const groups: { key: string; label: string; items: ReadingRecord[] }[] = [];
        const order = ['today', 'yesterday', 'week', 'earlier'];
        for (const key of order) {
            const items = records.filter(r => getDateGroup(r.timestamp) === key);
            if (items.length > 0) {
                groups.push({ key, label: t(`history.group_${key}`), items });
            }
        }
        return groups;
    }, [records, t]);

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
                        {t('history.title')}
                    </h2>
                    <p className="text-xs text-[#d4af37]/40 font-lora italic mt-1">
                        {t('history.count', { count: records.length })}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {records.length > 0 && (
                        <button
                            onClick={() => setShowConfirmClear(true)}
                            className="px-4 py-2 text-xs font-cinzel tracking-wider text-red-400/60 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 rounded-full transition-all"
                        >
                            {t('history.clear_all')}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        aria-label="關閉"
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
                        <h3 className="text-xl font-cinzel text-[#d4af37] mb-4">{t('history.clear_confirm')}</h3>
                        <p className="text-[#d4af37]/60 font-lora italic text-sm mb-6">
                            {t('history.clear_confirm_detail')}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConfirmClear(false)}
                                className="flex-1 py-3 rounded-full border border-[#d4af37]/30 text-[#d4af37] font-cinzel text-sm hover:bg-[#d4af37]/10 transition-all"
                            >
                                {t('history.cancel')}
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="flex-1 py-3 rounded-full bg-red-900/50 border border-red-400/30 text-red-300 font-cinzel text-sm hover:bg-red-900/70 transition-all"
                            >
                                {t('history.confirm_clear')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Records List - 視覺時間軸 */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {records.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-6xl mb-6 opacity-20">🔮</div>
                        <p className="text-[#d4af37]/40 font-cinzel text-lg mb-2">{t('history.empty')}</p>
                        <p className="text-[#d4af37]/20 font-lora italic text-sm">
                            {t('history.empty_hint')}
                        </p>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        {/* 旅程標題 */}
                        <div className="text-center mb-8">
                            <p className="text-[10px] font-cinzel tracking-[0.5em] text-[#d4af37]/40 uppercase">
                                {t('history.journey_hint')}
                            </p>
                        </div>

                        {grouped.map((group) => (
                            <div key={group.key} className="mb-8">
                                {/* 日期分組標題 */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                                    <p className="text-sm font-cinzel text-[#d4af37] tracking-widest">
                                        {group.label}
                                    </p>
                                    <div className="flex-1 h-px bg-gradient-to-r from-[#d4af37]/30 to-transparent" />
                                    <span className="text-xs text-[#d4af37]/40 font-cinzel">
                                        {group.items.length}
                                    </span>
                                </div>

                                {/* 時間軸線 */}
                                <div className="relative pl-6">
                                    <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[#d4af37]/20" />
                                    <div className="space-y-4">
                                        {group.items.map((record) => (
                                            <div key={record.id} className="relative">
                                                {/* 時間軸節點 */}
                                                <div className="absolute -left-6 top-5 w-3 h-3 rounded-full border-2 border-[#d4af37]/50 bg-[#0a0505] z-10" />

                                                {/* 記錄卡片 */}
                                                <div className="divine-vessel overflow-hidden transition-all">
                                                    {/* Record Header */}
                                                    <div
                                                        className="p-4 md:p-5 cursor-pointer hover:bg-[#d4af37]/5 transition-all"
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
                                                                {/* 實際牌卡圖 */}
                                                                <div className="flex -space-x-3">
                                                                    {record.cards.slice(0, 3).map((card, idx) => {
                                                                        const img = getCardImage(card.nameZh);
                                                                        return img ? (
                                                                            <div
                                                                                key={idx}
                                                                                className="w-8 h-11 rounded border border-[#d4af37]/30 overflow-hidden shadow-lg"
                                                                                title={`${card.nameZh} (${card.isReversed ? t('history.reversed') : t('history.upright')})`}
                                                                            >
                                                                                <img
                                                                                    src={img}
                                                                                    alt={card.nameZh}
                                                                                    className={`w-full h-full object-cover ${card.isReversed ? 'rotate-180' : ''}`}
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                key={idx}
                                                                                className="w-8 h-11 rounded border border-[#d4af37]/30 bg-[#1a0505] flex items-center justify-center text-[8px] text-[#d4af37]/60"
                                                                            >
                                                                                ✦
                                                                            </div>
                                                                        );
                                                                    })}
                                                                    {record.cards.length > 3 && (
                                                                        <div className="w-8 h-11 rounded border border-[#d4af37]/20 bg-[#0a0505] flex items-center justify-center text-[10px] text-[#d4af37]/60">
                                                                            +{record.cards.length - 3}
                                                                        </div>
                                                                    )}
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
                                            <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest mb-2">{t('history.question')}</p>
                                            <p className="text-[#f3e5ab] font-lora italic">「{record.question}」</p>
                                        </div>

                                        {/* Cards */}
                                        <div className="py-4 border-b border-[#d4af37]/10">
                                            <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest mb-3">{t('history.spread')}</p>
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
                                                                {card.isReversed ? i18n.t('cards:position.reversed') : i18n.t('cards:position.upright')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Interpretation Summary */}
                                        {record.interpretation && (
                                            <div className="py-4 border-b border-[#d4af37]/10">
                                                <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest mb-2">{t('history.interpretation')}</p>
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
                                                {t('history.delete')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                    </div>
                                </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPanel;
