/**
 * 流量分析頁面 - 連接 Supabase
 * 包含：訪客統計、占卜分析、轉化分析
 */

import React, { useState, useEffect } from 'react';
import {
    VisitorStats,
    ReadingStats,
    ConversionStats,
    getVisitorStats,
    getReadingStats,
    getConversionStats,
} from '../../services/analyticsService';

// 牌陣名稱對照
const spreadLabels: Record<string, string> = {
    'single': '單牌占卜',
    'three-card': '三牌占卜',
    'celtic-cross': '凱爾特十字',
    'love': '愛情牌陣',
    'career': '事業牌陣',
    'year': '年度運勢',
    'unknown': '其他',
};

// 統計卡片元件
const StatCard: React.FC<{
    icon: string;
    label: string;
    value: string | number;
    change?: { value: number; isPositive: boolean };
    isLoading?: boolean;
}> = ({ icon, label, value, change, isLoading }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{icon}</span>
            {change && (
                <span className={`text-sm px-2 py-1 rounded ${change.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                    {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
                </span>
            )}
        </div>
        {isLoading ? (
            <div className="h-9 w-20 bg-gray-700 rounded animate-pulse mt-2" />
        ) : (
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
        )}
        <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
);

// 長條圖元件
const BarChart: React.FC<{
    data: { label: string; value: number }[];
    color?: string;
    isLoading?: boolean;
}> = ({ data, color = 'amber', isLoading }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    if (isLoading) {
        return (
            <div className="h-64 flex items-end justify-around gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-700 rounded-t-lg animate-pulse" style={{ height: '60%' }} />
                        <span className="text-gray-600 text-xs mt-2">-</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="h-64 flex items-end justify-around gap-2">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                        className={`w-full bg-${color}-500/50 rounded-t-lg transition-all hover:bg-${color}-500`}
                        style={{ height: `${(d.value / maxValue) * 100}%`, minHeight: d.value > 0 ? '4px' : '0' }}
                    />
                    <span className="text-gray-500 text-xs mt-2">{d.label}</span>
                </div>
            ))}
        </div>
    );
};

const AnalyticsPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
    const [readingStats, setReadingStats] = useState<ReadingStats | null>(null);
    const [conversionStats, setConversionStats] = useState<ConversionStats | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const [visitors, readings, conversions] = await Promise.all([
                getVisitorStats(),
                getReadingStats(),
                getConversionStats(),
            ]);
            setVisitorStats(visitors);
            setReadingStats(readings);
            setConversionStats(conversions);
            setIsLoading(false);
        };
        loadData();
    }, []);

    // 計算變化百分比
    const calcChange = (current: number, previous: number) => {
        if (previous === 0) return null;
        const change = Math.round(((current - previous) / previous) * 100);
        return { value: Math.abs(change), isPositive: change >= 0 };
    };

    // 格式化日期標籤
    const formatDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        return weekdays[date.getDay()];
    };

    // 訪客趨勢資料
    const visitorTrendData = visitorStats?.trend?.map(d => ({
        label: formatDateLabel(d.date),
        value: d.visitors,
    })) || [];

    // 占卜趨勢資料
    const readingTrendData = readingStats?.trend?.map(d => ({
        label: formatDateLabel(d.date),
        value: d.count,
    })) || [];

    return (
        <div className="space-y-6">
            {/* ============================================ */}
            {/* 訪客統計區塊 */}
            {/* ============================================ */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">👥 訪客統計</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        icon="📅"
                        label="今日訪客"
                        value={visitorStats?.today ?? '-'}
                        change={calcChange(visitorStats?.today || 0, visitorStats?.yesterday || 0) || undefined}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="📆"
                        label="昨日訪客"
                        value={visitorStats?.yesterday ?? '-'}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="📊"
                        label="本週訪客"
                        value={visitorStats?.thisWeek ?? '-'}
                        change={calcChange(visitorStats?.thisWeek || 0, visitorStats?.lastWeek || 0) || undefined}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="📈"
                        label="本月訪客"
                        value={visitorStats?.thisMonth ?? '-'}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* 訪客趨勢圖 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📈 訪客趨勢（7日）</h3>
                <BarChart data={visitorTrendData} color="amber" isLoading={isLoading} />
            </div>

            {/* ============================================ */}
            {/* 占卜使用分析區塊 */}
            {/* ============================================ */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">🎴 占卜使用分析</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        icon="🔮"
                        label="總占卜次數"
                        value={readingStats?.totalReadings?.toLocaleString() ?? '-'}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="✨"
                        label="今日占卜"
                        value={readingStats?.todayReadings ?? '-'}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="📊"
                        label="日均占卜"
                        value={readingStats?.averagePerDay ?? '-'}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* 占卜趨勢與熱門牌陣 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4">📈 占卜趨勢（7日）</h3>
                    <BarChart data={readingTrendData} color="purple" isLoading={isLoading} />
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4">🏆 熱門牌陣（30日）</h3>
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
                            ))}
                        </div>
                    ) : readingStats?.popularSpreads?.length ? (
                        <div className="space-y-3">
                            {readingStats.popularSpreads.map((spread, idx) => {
                                const maxCount = readingStats.popularSpreads[0]?.count || 1;
                                const percentage = (spread.count / maxCount) * 100;
                                return (
                                    <div key={spread.spread_type} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white">
                                                {idx === 0 && '🥇 '}
                                                {idx === 1 && '🥈 '}
                                                {idx === 2 && '🥉 '}
                                                {spreadLabels[spread.spread_type] || spread.spread_type}
                                            </span>
                                            <span className="text-gray-400">{spread.count} 次</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-purple-500 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">尚無數據</p>
                    )}
                </div>
            </div>

            {/* ============================================ */}
            {/* 轉化分析區塊 */}
            {/* ============================================ */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">🎯 轉化分析</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        icon="👤"
                        label="總用戶數"
                        value={conversionStats?.totalUsers?.toLocaleString() ?? '-'}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="👑"
                        label="VIP 用戶"
                        value={conversionStats?.totalVip ?? '-'}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="📝"
                        label="註冊轉化率"
                        value={conversionStats ? `${conversionStats.registrationRate}%` : '-'}
                        isLoading={isLoading}
                    />
                    <StatCard
                        icon="💎"
                        label="VIP 轉化率"
                        value={conversionStats ? `${conversionStats.vipConversionRate}%` : '-'}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* VIP 轉化趨勢 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">💎 VIP 轉化趨勢（7日）</h3>
                {isLoading ? (
                    <div className="h-32 bg-gray-700 rounded animate-pulse" />
                ) : (
                    <div className="flex items-end justify-around gap-4 h-32">
                        {(conversionStats?.recentConversions || []).map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                                <div className="text-green-400 font-bold text-lg mb-2">
                                    {d.count > 0 ? `+${d.count}` : '-'}
                                </div>
                                <span className="text-gray-500 text-xs">{formatDateLabel(d.date)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 提示 */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-500 text-sm text-center">
                    💡 數據每日更新。如需即時追蹤，請考慮整合 Google Analytics 或 Mixpanel。
                </p>
            </div>
        </div>
    );
};

export default AnalyticsPage;
