/**
 * 系統公告頁面 - 跑馬燈管理
 */

import React, { useState } from 'react';

const AnnouncementsPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState([
        { id: 1, content: '🎉 新年限時優惠！VIP 只要 199 元！', active: true, priority: 1 },
        { id: 2, content: '📢 新功能上線：年度運勢牌陣', active: true, priority: 2 },
        { id: 3, content: '🔧 系統將於 1/5 進行維護', active: false, priority: 3 },
    ]);
    const [newAnnouncement, setNewAnnouncement] = useState('');

    return (
        <div className="space-y-6">
            {/* 預覽 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">👁️ 跑馬燈預覽</h3>
                <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap">
                        {announcements.filter(a => a.active).map((a, i) => (
                            <span key={a.id} className="text-amber-400 mx-8">
                                {a.content}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 新增公告 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">➕ 新增公告</h3>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        placeholder="輸入公告內容..."
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    />
                    <button className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400">
                        新增
                    </button>
                </div>
            </div>

            {/* 公告列表 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 公告列表</h3>
                <div className="space-y-3">
                    {announcements.map((a) => (
                        <div key={a.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                            <div className="flex items-center gap-4">
                                <button className="text-gray-500 cursor-move">⋮⋮</button>
                                <span className={a.active ? 'text-white' : 'text-gray-500'}>{a.content}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    className={`w-12 h-6 rounded-full relative ${a.active ? 'bg-green-500' : 'bg-gray-600'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${a.active ? 'right-1' : 'left-1'
                                        }`} />
                                </button>
                                <button className="text-blue-400 hover:text-blue-300">編輯</button>
                                <button className="text-red-400 hover:text-red-300">刪除</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementsPage;
