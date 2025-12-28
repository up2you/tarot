/**
 * 收入報表頁面
 */

import React from 'react';

const RevenuePage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">今日收入</p>
                    <p className="text-3xl font-bold text-green-400 mt-2">NT$ 2,850</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">本月收入</p>
                    <p className="text-3xl font-bold text-green-400 mt-2">NT$ 45,280</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">VIP 訂閱數</p>
                    <p className="text-3xl font-bold text-amber-400 mt-2">45</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">轉化率</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">2.9%</p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">💰 收入趨勢（30日）</h3>
                <div className="h-64 flex items-end justify-around gap-1">
                    {Array.from({ length: 30 }, (_, i) => (
                        <div key={i} className="flex-1">
                            <div
                                className="w-full bg-green-500/50 rounded-t transition-all hover:bg-green-500"
                                style={{ height: `${20 + Math.random() * 80}%` }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 最近交易</h3>
                <div className="space-y-3">
                    {[
                        { time: '14:32', user: 'user@gmail.com', amount: 'NT$ 299', type: 'VIP 月費' },
                        { time: '13:18', user: 'tarot@yahoo.com', amount: 'NT$ 99', type: '追問包' },
                        { time: '11:45', user: 'mystic@gmail.com', amount: 'NT$ 299', type: 'VIP 月費' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 text-sm">{item.time}</span>
                                <span className="text-white">{item.user}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm">{item.type}</span>
                                <span className="text-green-400 font-bold">{item.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RevenuePage;
