/**
 * 收入報表頁面（連接 Supabase）
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';

interface RevenueStats {
    todayRevenue: number;
    monthRevenue: number;
    totalVipUsers: number;
    conversionRate: number;
}

interface PaymentRecord {
    id: string;
    user_id: string;
    payment_type: string;
    amount: number;
    status: string;
    created_at: string;
    user_email?: string;
}

interface DailyRevenue {
    date: string;
    amount: number;
}

const RevenuePage: React.FC = () => {
    const [stats, setStats] = useState<RevenueStats>({
        todayRevenue: 0,
        monthRevenue: 0,
        totalVipUsers: 0,
        conversionRate: 0,
    });
    const [recentPayments, setRecentPayments] = useState<PaymentRecord[]>([]);
    const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);

        try {
            // 取得今日收入
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const { data: todayData } = await supabase
                .from('payment_records')
                .select('amount')
                .eq('status', 'completed')
                .gte('created_at', today.toISOString());

            const todayRevenue = todayData?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

            // 取得本月收入
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

            const { data: monthData } = await supabase
                .from('payment_records')
                .select('amount')
                .eq('status', 'completed')
                .gte('created_at', monthStart.toISOString());

            const monthRevenue = monthData?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

            // 取得 VIP 用戶數
            const { count: vipCount } = await supabase
                .from('user_profiles')
                .select('*', { count: 'exact', head: true })
                .in('subscription_type', ['monthly', 'yearly', 'lifetime']);

            // 取得總用戶數計算轉化率
            const { count: totalUsers } = await supabase
                .from('user_profiles')
                .select('*', { count: 'exact', head: true });

            const conversionRate = totalUsers ? ((vipCount || 0) / totalUsers * 100) : 0;

            setStats({
                todayRevenue,
                monthRevenue,
                totalVipUsers: vipCount || 0,
                conversionRate: Math.round(conversionRate * 10) / 10,
            });

            // 取得最近交易
            const { data: payments } = await supabase
                .from('payment_records')
                .select('*')
                .eq('status', 'completed')
                .order('created_at', { ascending: false })
                .limit(10);

            if (payments) {
                // 取得用戶資訊
                const userIds = [...new Set(payments.map(p => p.user_id))];
                const { data: users } = await supabase
                    .from('user_profiles')
                    .select('user_id, email')
                    .in('user_id', userIds);

                const userMap = new Map(users?.map(u => [u.user_id, u.email]) || []);

                setRecentPayments(payments.map(p => ({
                    ...p,
                    user_email: userMap.get(p.user_id) || '未知用戶',
                })));
            }

            // 取得 30 日收入趨勢
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const { data: revenueData } = await supabase
                .from('payment_records')
                .select('amount, created_at')
                .eq('status', 'completed')
                .gte('created_at', thirtyDaysAgo.toISOString());

            if (revenueData) {
                // 按日期分組
                const grouped = new Map<string, number>();
                for (let i = 0; i < 30; i++) {
                    const d = new Date();
                    d.setDate(d.getDate() - (29 - i));
                    grouped.set(d.toISOString().split('T')[0], 0);
                }

                revenueData.forEach(p => {
                    const date = new Date(p.created_at).toISOString().split('T')[0];
                    grouped.set(date, (grouped.get(date) || 0) + Number(p.amount));
                });

                setDailyRevenue(Array.from(grouped.entries()).map(([date, amount]) => ({
                    date,
                    amount,
                })));
            }

        } catch (err) {
            console.error('[RevenuePage] loadData error:', err);
        }

        setIsLoading(false);
    };

    const formatCurrency = (amount: number): string => {
        return `NT$ ${amount.toLocaleString()}`;
    };

    const formatTime = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateStr: string): string => {
        return new Date(dateStr).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
    };

    const getPaymentTypeName = (type: string): string => {
        const names: Record<string, string> = {
            'credits': '點數購買',
            'monthly': 'VIP 月費',
            'yearly': 'VIP 年費',
            'lifetime': '終身會員',
        };
        return names[type] || type;
    };

    const maxRevenue = Math.max(...dailyRevenue.map(d => d.amount), 1);

    return (
        <div className="space-y-6">
            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">今日收入</p>
                    <p className="text-3xl font-bold text-green-400 mt-2">
                        {isLoading ? '...' : formatCurrency(stats.todayRevenue)}
                    </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">本月收入</p>
                    <p className="text-3xl font-bold text-green-400 mt-2">
                        {isLoading ? '...' : formatCurrency(stats.monthRevenue)}
                    </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">VIP 訂閱數</p>
                    <p className="text-3xl font-bold text-amber-400 mt-2">
                        {isLoading ? '...' : stats.totalVipUsers}
                    </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">轉化率</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">
                        {isLoading ? '...' : `${stats.conversionRate}%`}
                    </p>
                </div>
            </div>

            {/* 收入趨勢圖 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">💰 收入趨勢（30日）</h3>
                {isLoading ? (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        載入中...
                    </div>
                ) : dailyRevenue.length > 0 ? (
                    <div className="h-64 flex items-end justify-around gap-1">
                        {dailyRevenue.map((day, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div
                                    className="w-full bg-green-500/50 rounded-t transition-all hover:bg-green-500"
                                    style={{
                                        height: `${Math.max(5, (day.amount / maxRevenue) * 100)}%`,
                                        minHeight: '4px'
                                    }}
                                />
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                    <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                        {formatDate(day.date)}: {formatCurrency(day.amount)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        尚無收入資料
                    </div>
                )}
            </div>

            {/* 最近交易 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 最近交易</h3>
                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-12 bg-gray-700 rounded animate-pulse" />
                        ))}
                    </div>
                ) : recentPayments.length > 0 ? (
                    <div className="space-y-3">
                        {recentPayments.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-500 text-sm">
                                        {formatTime(payment.created_at)}
                                    </span>
                                    <span className="text-white truncate max-w-[200px]">
                                        {payment.user_email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-400 text-sm">
                                        {getPaymentTypeName(payment.payment_type)}
                                    </span>
                                    <span className="text-green-400 font-bold">
                                        {formatCurrency(payment.amount)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        尚無交易記錄
                    </div>
                )}
            </div>

            {/* 收入分類 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-white font-bold mb-2">🎯 點數收入</h4>
                    <p className="text-gray-400 text-sm">單次購買點數的收入</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-white font-bold mb-2">📅 訂閱收入</h4>
                    <p className="text-gray-400 text-sm">月費/年費 VIP 收入</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-white font-bold mb-2">👑 終身會員</h4>
                    <p className="text-gray-400 text-sm">一次性終身會員收入</p>
                </div>
            </div>
        </div>
    );
};

export default RevenuePage;
