/**
 * 客戶管理頁面
 */

import React, { useState } from 'react';

const CustomersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // 模擬數據
    const customers = [
        { id: 1, email: 'user1@gmail.com', name: '張小明', isVip: true, readings: 28, joined: '2024-12-15' },
        { id: 2, email: 'user2@yahoo.com', name: '李美麗', isVip: false, readings: 12, joined: '2024-12-20' },
        { id: 3, email: 'user3@gmail.com', name: '王大華', isVip: true, readings: 45, joined: '2024-11-08' },
        { id: 4, email: 'user4@outlook.com', name: '陳雅婷', isVip: false, readings: 3, joined: '2024-12-28' },
    ];

    return (
        <div className="space-y-6">
            {/* 搜尋列 */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="搜尋用戶 Email 或名稱..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
                <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none">
                    <option>所有用戶</option>
                    <option>VIP 用戶</option>
                    <option>免費用戶</option>
                </select>
            </div>

            {/* 用戶列表 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-700 bg-gray-900">
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">用戶</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">狀態</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">占卜次數</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">加入日期</th>
                            <th className="text-right px-6 py-4 text-gray-400 font-medium">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4">
                                    <p className="text-white font-medium">{c.name}</p>
                                    <p className="text-gray-400 text-sm">{c.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {c.isVip ? (
                                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">👑 VIP</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-gray-600 text-gray-300 rounded-full text-sm">免費</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-white">{c.readings}</td>
                                <td className="px-6 py-4 text-gray-400">{c.joined}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-400 hover:text-blue-300 mr-4">詳情</button>
                                    <button className="text-amber-400 hover:text-amber-300">發送郵件</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 分頁 */}
            <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">顯示 1-4 筆，共 4 筆</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg">上一頁</button>
                    <button className="px-4 py-2 bg-amber-500 text-black rounded-lg">1</button>
                    <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg">下一頁</button>
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;
