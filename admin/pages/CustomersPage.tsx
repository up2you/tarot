/**
 * 客戶管理頁面 - 使用 Supabase 真實數據
 */

import React, { useState, useEffect } from 'react';
import { getUsers, getUserStats, updateUserVipStatus, updateUserFreeQuota, resetUserMonthlyQuota, toggleUserActive, GetUsersResult, UserStats } from '../../services/adminService';
import { UserProfile } from '../../services/userService';

// 用戶詳情彈窗
const UserDetailModal: React.FC<{
    user: UserProfile | null;
    onClose: () => void;
    onUpdate: () => void;
}> = ({ user, onClose, onUpdate }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quotaInput, setQuotaInput] = useState('');

    if (!user) return null;

    const handleToggleVip = async () => {
        setIsUpdating(true);
        const success = await updateUserVipStatus(user.id, !user.is_vip);
        if (success) {
            onUpdate();
        }
        setIsUpdating(false);
    };

    const handleUpdateQuota = async () => {
        const newQuota = parseInt(quotaInput);
        if (isNaN(newQuota) || newQuota < 0) {
            alert('請輸入有效的數字');
            return;
        }
        setIsUpdating(true);
        const success = await updateUserFreeQuota(user.id, newQuota);
        if (success) {
            setQuotaInput('');
            onUpdate();
        }
        setIsUpdating(false);
    };

    const handleResetQuota = async () => {
        setIsUpdating(true);
        const success = await resetUserMonthlyQuota(user.id);
        if (success) {
            onUpdate();
        }
        setIsUpdating(false);
    };

    const handleToggleActive = async () => {
        if (!confirm(`確定要${user.is_active ? '停用' : '啟用'}此用戶？`)) return;
        setIsUpdating(true);
        const success = await toggleUserActive(user.id, !user.is_active);
        if (success) {
            onUpdate();
        }
        setIsUpdating(false);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">用戶詳情</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* 基本資料 */}
                    <div className="space-y-3">
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white font-medium">{user.email}</p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-gray-400 text-sm">名稱</p>
                        <p className="text-white font-medium">{user.display_name || '未設定'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-white">{user.total_readings_count}</p>
                            <p className="text-gray-400 text-sm">總占卜次數</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-amber-400">
                                {user.is_vip ? '∞' : `${user.free_readings_remaining}/${user.free_readings_monthly_limit}`}
                            </p>
                            <p className="text-gray-400 text-sm">免費額度</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-gray-400 text-sm">註冊時間</p>
                        <p className="text-white">{new Date(user.created_at).toLocaleString('zh-TW')}</p>
                    </div>

                    {/* VIP 管理 */}
                    <div className="bg-gray-900 rounded-xl p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">VIP 狀態</p>
                                <p className="text-gray-400 text-sm">
                                    {user.is_vip ? (
                                        user.vip_expires_at
                                            ? `到期：${new Date(user.vip_expires_at).toLocaleDateString('zh-TW')}`
                                            : '永久 VIP'
                                    ) : '免費用戶'}
                                </p>
                            </div>
                            <button
                                onClick={handleToggleVip}
                                disabled={isUpdating}
                                className={`px-4 py-2 rounded-lg font-bold transition-all disabled:opacity-50 ${user.is_vip
                                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                        : 'bg-amber-500 text-black hover:bg-amber-400'
                                    }`}
                            >
                                {user.is_vip ? '移除 VIP' : '升級 VIP'}
                            </button>
                        </div>
                    </div>

                    {/* 免費額度管理（非 VIP 才顯示） */}
                    {!user.is_vip && (
                        <div className="bg-gray-900 rounded-xl p-4 space-y-4">
                            <p className="text-white font-medium">免費額度管理</p>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="輸入新額度"
                                    value={quotaInput}
                                    onChange={(e) => setQuotaInput(e.target.value)}
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                                />
                                <button
                                    onClick={handleUpdateQuota}
                                    disabled={isUpdating || !quotaInput}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 disabled:opacity-50"
                                >
                                    設定
                                </button>
                            </div>
                            <button
                                onClick={handleResetQuota}
                                disabled={isUpdating}
                                className="w-full py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                            >
                                重置為月度上限 ({user.free_readings_monthly_limit})
                            </button>
                        </div>
                    )}

                    {/* 帳號狀態 */}
                    <div className="bg-gray-900 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">帳號狀態</p>
                                <p className={`text-sm ${user.is_active ? 'text-green-400' : 'text-red-400'}`}>
                                    {user.is_active ? '正常' : '已停用'}
                                </p>
                            </div>
                            <button
                                onClick={handleToggleActive}
                                disabled={isUpdating}
                                className={`px-4 py-2 rounded-lg font-bold transition-all disabled:opacity-50 ${user.is_active
                                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                    }`}
                            >
                                {user.is_active ? '停用帳號' : '啟用帳號'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CustomersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'vip' | 'free'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState<GetUsersResult>({ users: [], total: 0, page: 1, totalPages: 0 });
    const [stats, setStats] = useState<UserStats | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

    const ITEMS_PER_PAGE = 15;

    // 載入數據
    const loadData = async () => {
        setIsLoading(true);
        const [usersResult, statsResult] = await Promise.all([
            getUsers({
                page: currentPage,
                limit: ITEMS_PER_PAGE,
                search: searchTerm,
                filter,
            }),
            getUserStats(),
        ]);
        setResult(usersResult);
        setStats(statsResult);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [currentPage, filter]);

    // 搜尋時重置頁碼
    const handleSearch = () => {
        setCurrentPage(1);
        loadData();
    };

    // 按下 Enter 搜尋
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleUserUpdate = () => {
        loadData();
        // 重新載入選中的用戶
        if (selectedUser) {
            const updated = result.users.find(u => u.id === selectedUser.id);
            if (updated) setSelectedUser(updated);
            else loadData(); // 如果找不到就重載
        }
    };

    return (
        <div className="space-y-6">
            {/* 統計卡片 */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                        <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                        <p className="text-gray-400 text-sm">總用戶</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                        <p className="text-3xl font-bold text-amber-400">{stats.vipUsers}</p>
                        <p className="text-gray-400 text-sm">VIP 用戶</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                        <p className="text-3xl font-bold text-blue-400">{stats.activeToday}</p>
                        <p className="text-gray-400 text-sm">今日活躍</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                        <p className="text-3xl font-bold text-green-400">{stats.newThisMonth}</p>
                        <p className="text-gray-400 text-sm">本月新增</p>
                    </div>
                </div>
            )}

            {/* 搜尋列 */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        placeholder="搜尋用戶 Email 或名稱..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400"
                    >
                        搜尋
                    </button>
                </div>
                <select
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value as 'all' | 'vip' | 'free');
                        setCurrentPage(1);
                    }}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                >
                    <option value="all">所有用戶</option>
                    <option value="vip">VIP 用戶</option>
                    <option value="free">免費用戶</option>
                </select>
            </div>

            {/* 用戶列表 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                    </div>
                ) : result.users.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-4xl mb-4">👥</p>
                        <p>沒有找到用戶</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700 bg-gray-900">
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">用戶</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">狀態</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">免費額度</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">占卜次數</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">加入日期</th>
                                    <th className="text-right px-6 py-4 text-gray-400 font-medium">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.users.map((user) => (
                                    <tr key={user.id} className={`border-b border-gray-700 hover:bg-gray-700/50 ${!user.is_active ? 'opacity-50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <p className="text-white font-medium">{user.display_name || '未設定'}</p>
                                            <p className="text-gray-400 text-sm">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.is_vip ? (
                                                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">👑 VIP</span>
                                            ) : (
                                                <span className="px-3 py-1 bg-gray-600 text-gray-300 rounded-full text-sm">免費</span>
                                            )}
                                            {!user.is_active && (
                                                <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">停用</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.is_vip ? (
                                                <span className="text-amber-400">∞</span>
                                            ) : (
                                                <span className={`${user.free_readings_remaining === 0 ? 'text-red-400' : 'text-white'}`}>
                                                    {user.free_readings_remaining}/{user.free_readings_monthly_limit}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-white">{user.total_readings_count}</td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(user.created_at).toLocaleDateString('zh-TW')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="text-blue-400 hover:text-blue-300"
                                            >
                                                詳情
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* 分頁 */}
            {result.totalPages > 1 && (
                <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        第 {currentPage} 頁，共 {result.totalPages} 頁（{result.total} 筆）
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-50"
                        >
                            上一頁
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(result.totalPages, p + 1))}
                            disabled={currentPage === result.totalPages}
                            className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-50"
                        >
                            下一頁
                        </button>
                    </div>
                </div>
            )}

            {/* 用戶詳情彈窗 */}
            <UserDetailModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onUpdate={handleUserUpdate}
            />
        </div>
    );
};

export default CustomersPage;
