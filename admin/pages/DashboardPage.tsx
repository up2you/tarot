/**
 * 後台總覽頁面
 */

import React from 'react';

// 統計卡片元件
const StatCard: React.FC<{
    icon: string;
    label: string;
    value: string | number;
    change?: string;
    changeType?: 'up' | 'down' | 'neutral';
}> = ({ icon, label, value, change, changeType = 'neutral' }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{icon}</span>
            {change && (
                <span className={`text-sm px-2 py-1 rounded ${changeType === 'up' ? 'bg-green-500/20 text-green-400' :
                        changeType === 'down' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-600 text-gray-300'
                    }`}>
                    {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
                </span>
            )}
        </div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-gray-400 text-sm">{label}</p>
    </div>
);

const DashboardPage: React.FC = () => {
    // TODO: 從 Supabase 獲取真實數據
    const stats = {
        todayVisitors: 128,
        totalUsers: 1542,
        vipUsers: 45,
        todayRevenue: 'NT$ 2,850',
        todayReadings: 76,
        maintenanceMode: false,
    };

    return (
        <div className="space-y-6">
            {/* 維護模式提示 */}
            {stats.maintenanceMode && (
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4 flex items-center gap-4">
                    <span className="text-2xl">⚠️</span>
                    <div>
                        <p className="text-yellow-400 font-bold">維護模式已啟用</p>
                        <p className="text-yellow-400/70 text-sm">用戶目前無法訪問網站</p>
                    </div>
                </div>
            )}

            {/* 快速統計 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon="👥" label="今日訪客" value={stats.todayVisitors} change="+12%" changeType="up" />
                <StatCard icon="🎴" label="今日占卜" value={stats.todayReadings} change="+8%" changeType="up" />
                <StatCard icon="👑" label="VIP 用戶" value={stats.vipUsers} change="+3" changeType="up" />
                <StatCard icon="💰" label="今日收入" value={stats.todayRevenue} change="+15%" changeType="up" />
            </div>

            {/* 第二行 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 最近活動 */}
                <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4">📊 最近活動</h3>
                    <div className="space-y-3">
                        {[
                            { time: '2 分鐘前', event: '新用戶註冊', user: 'user_abc@gmail.com' },
                            { time: '5 分鐘前', event: 'VIP 升級', user: 'premium@example.com' },
                            { time: '12 分鐘前', event: '完成占卜', user: 'tarot_lover@yahoo.com' },
                            { time: '18 分鐘前', event: '新用戶註冊', user: 'mystic@gmail.com' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-sm w-20">{item.time}</span>
                                    <span className="text-white">{item.event}</span>
                                </div>
                                <span className="text-gray-400 text-sm">{item.user}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 快速操作 */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4">⚡ 快速操作</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-all text-left flex items-center gap-3">
                            <span>📢</span> 發布公告
                        </button>
                        <button className="w-full py-3 px-4 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-left flex items-center gap-3">
                            <span>✉️</span> 群發郵件
                        </button>
                        <button className="w-full py-3 px-4 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all text-left flex items-center gap-3">
                            <span>🎵</span> 上傳音樂
                        </button>
                        <button className="w-full py-3 px-4 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-left flex items-center gap-3">
                            <span>🔧</span> 維護模式
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
