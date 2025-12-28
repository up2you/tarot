/**
 * 流量分析頁面
 */

import React from 'react';

const AnalyticsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">今日訪客</p>
                    <p className="text-3xl font-bold text-white mt-2">128</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">本週訪客</p>
                    <p className="text-3xl font-bold text-white mt-2">892</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">本月訪客</p>
                    <p className="text-3xl font-bold text-white mt-2">3,542</p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📈 訪客趨勢（7日）</h3>
                <div className="h-64 flex items-end justify-around gap-2">
                    {[65, 45, 78, 92, 88, 110, 128].map((v, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                            <div
                                className="w-full bg-amber-500/50 rounded-t-lg transition-all hover:bg-amber-500"
                                style={{ height: `${v}%` }}
                            />
                            <span className="text-gray-500 text-xs mt-2">
                                {['一', '二', '三', '四', '五', '六', '日'][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">🗂️ 熱門頁面</h3>
                <div className="space-y-3">
                    {[
                        { page: '首頁', views: 456 },
                        { page: '占卜頁', views: 328 },
                        { page: 'VIP 升級', views: 89 },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2">
                            <span className="text-white">{item.page}</span>
                            <span className="text-gray-400">{item.views} 次瀏覽</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
