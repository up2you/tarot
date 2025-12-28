/**
 * 郵件通知頁面
 */

import React, { useState } from 'react';

const EmailsPage: React.FC = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [target, setTarget] = useState('all');

    return (
        <div className="space-y-6">
            {/* 發送郵件表單 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">✉️ 群發郵件</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">發送對象</label>
                        <select
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                        >
                            <option value="all">所有用戶</option>
                            <option value="vip">VIP 用戶</option>
                            <option value="free">免費用戶</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">郵件主旨</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="輸入郵件主旨..."
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">郵件內容</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="輸入郵件內容..."
                            rows={8}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                        />
                    </div>

                    <button className="px-8 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400">
                        發送郵件
                    </button>
                </div>
            </div>

            {/* 發送記錄 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 發送記錄</h3>
                <div className="space-y-3">
                    {[
                        { time: '2024-12-28 14:30', subject: '新年優惠通知', target: '所有用戶', sent: 1542 },
                        { time: '2024-12-25 10:00', subject: '聖誕活動開跑', target: 'VIP 用戶', sent: 45 },
                    ].map((log, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                            <div>
                                <p className="text-white font-medium">{log.subject}</p>
                                <p className="text-gray-400 text-sm">{log.time} · {log.target}</p>
                            </div>
                            <span className="text-green-400">✓ 已發送 {log.sent} 封</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmailsPage;
