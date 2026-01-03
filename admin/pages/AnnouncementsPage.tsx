/**
 * 系統公告頁面 - 跑馬燈管理（連接 Supabase）
 */

import React, { useState, useEffect } from 'react';
import {
    Announcement,
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    toggleAnnouncementActive,
    reorderAnnouncements,
} from '../../services/announcementService';

// 類型標籤
const typeLabels: Record<string, { label: string; color: string }> = {
    info: { label: '📢 資訊', color: 'bg-blue-500/20 text-blue-400' },
    warning: { label: '⚠️ 警告', color: 'bg-yellow-500/20 text-yellow-400' },
    promo: { label: '🎉 促銷', color: 'bg-green-500/20 text-green-400' },
    system: { label: '🔧 系統', color: 'bg-red-500/20 text-red-400' },
};

const AnnouncementsPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [newContent, setNewContent] = useState('');
    const [newType, setNewType] = useState<'info' | 'warning' | 'promo' | 'system'>('info');

    // 編輯模式
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [editType, setEditType] = useState<'info' | 'warning' | 'promo' | 'system'>('info');

    // 訊息提示
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // 載入公告
    const loadAnnouncements = async () => {
        setIsLoading(true);
        const data = await getAnnouncements();
        setAnnouncements(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadAnnouncements();
    }, []);

    // 顯示訊息
    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    // 新增公告
    const handleCreate = async () => {
        if (!newContent.trim()) {
            showMessage('error', '請輸入公告內容');
            return;
        }

        setIsSaving(true);
        const result = await createAnnouncement({
            content: newContent.trim(),
            type: newType,
            active: true,
        });

        if (result) {
            setNewContent('');
            setNewType('info');
            await loadAnnouncements();
            showMessage('success', '公告已新增');
        } else {
            showMessage('error', '新增失敗');
        }
        setIsSaving(false);
    };

    // 切換啟用狀態
    const handleToggleActive = async (id: string, currentActive: boolean) => {
        const success = await toggleAnnouncementActive(id, !currentActive);
        if (success) {
            setAnnouncements(prev =>
                prev.map(a => a.id === id ? { ...a, active: !currentActive } : a)
            );
        } else {
            showMessage('error', '更新失敗');
        }
    };

    // 開始編輯
    const handleStartEdit = (announcement: Announcement) => {
        setEditingId(announcement.id);
        setEditContent(announcement.content);
        setEditType(announcement.type);
    };

    // 儲存編輯
    const handleSaveEdit = async () => {
        if (!editingId || !editContent.trim()) return;

        setIsSaving(true);
        const success = await updateAnnouncement(editingId, {
            content: editContent.trim(),
            type: editType,
        });

        if (success) {
            setEditingId(null);
            await loadAnnouncements();
            showMessage('success', '公告已更新');
        } else {
            showMessage('error', '更新失敗');
        }
        setIsSaving(false);
    };

    // 取消編輯
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditContent('');
    };

    // 刪除公告
    const handleDelete = async (id: string) => {
        if (!confirm('確定要刪除這則公告嗎？')) return;

        const success = await deleteAnnouncement(id);
        if (success) {
            setAnnouncements(prev => prev.filter(a => a.id !== id));
            showMessage('success', '公告已刪除');
        } else {
            showMessage('error', '刪除失敗');
        }
    };

    // 移動公告順序
    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= announcements.length) return;

        const newOrder = [...announcements];
        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];

        setAnnouncements(newOrder);

        // 更新資料庫排序
        const orderedIds = newOrder.map(a => a.id);
        await reorderAnnouncements(orderedIds);
    };

    // 取得啟用中的公告
    const activeAnnouncements = announcements.filter(a => a.active);

    return (
        <div className="space-y-6">
            {/* 訊息提示 */}
            {message && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                    {message.text}
                </div>
            )}

            {/* 預覽 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">👁️ 跑馬燈預覽</h3>
                <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 overflow-hidden">
                    {activeAnnouncements.length > 0 ? (
                        <div className="animate-marquee whitespace-nowrap">
                            {activeAnnouncements.map((a) => (
                                <span key={a.id} className="text-amber-400 mx-8">
                                    {a.content}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">目前沒有啟用中的公告</p>
                    )}
                </div>
            </div>

            {/* 新增公告 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">➕ 新增公告</h3>
                <div className="flex gap-4">
                    <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    >
                        <option value="info">📢 資訊</option>
                        <option value="promo">🎉 促銷</option>
                        <option value="warning">⚠️ 警告</option>
                        <option value="system">🔧 系統</option>
                    </select>
                    <input
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="輸入公告內容..."
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    />
                    <button
                        onClick={handleCreate}
                        disabled={isSaving}
                        className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 disabled:opacity-50"
                    >
                        {isSaving ? '處理中...' : '新增'}
                    </button>
                </div>
            </div>

            {/* 公告列表 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 公告列表</h3>

                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-gray-700 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : announcements.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">尚無公告</p>
                ) : (
                    <div className="space-y-3">
                        {announcements.map((a, index) => (
                            <div key={a.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                                {editingId === a.id ? (
                                    /* 編輯模式 */
                                    <div className="flex-1 flex items-center gap-4">
                                        <select
                                            value={editType}
                                            onChange={(e) => setEditType(e.target.value as any)}
                                            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                                        >
                                            <option value="info">📢 資訊</option>
                                            <option value="promo">🎉 促銷</option>
                                            <option value="warning">⚠️ 警告</option>
                                            <option value="system">🔧 系統</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
                                            autoFocus
                                        />
                                        <button
                                            onClick={handleSaveEdit}
                                            disabled={isSaving}
                                            className="text-green-400 hover:text-green-300"
                                        >
                                            儲存
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="text-gray-400 hover:text-gray-300"
                                        >
                                            取消
                                        </button>
                                    </div>
                                ) : (
                                    /* 顯示模式 */
                                    <>
                                        <div className="flex items-center gap-4 flex-1">
                                            {/* 排序按鈕 */}
                                            <div className="flex flex-col">
                                                <button
                                                    onClick={() => handleMove(index, 'up')}
                                                    disabled={index === 0}
                                                    className="text-gray-500 hover:text-white disabled:opacity-30"
                                                >
                                                    ▲
                                                </button>
                                                <button
                                                    onClick={() => handleMove(index, 'down')}
                                                    disabled={index === announcements.length - 1}
                                                    className="text-gray-500 hover:text-white disabled:opacity-30"
                                                >
                                                    ▼
                                                </button>
                                            </div>

                                            {/* 類型標籤 */}
                                            <span className={`px-2 py-1 rounded text-xs ${typeLabels[a.type]?.color || 'bg-gray-600 text-gray-300'}`}>
                                                {typeLabels[a.type]?.label || a.type}
                                            </span>

                                            {/* 內容 */}
                                            <span className={a.active ? 'text-white' : 'text-gray-500 line-through'}>
                                                {a.content}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* 啟用開關 */}
                                            <button
                                                onClick={() => handleToggleActive(a.id, a.active)}
                                                className={`w-12 h-6 rounded-full relative transition-colors ${a.active ? 'bg-green-500' : 'bg-gray-600'
                                                    }`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${a.active ? 'right-1' : 'left-1'
                                                    }`} />
                                            </button>

                                            <button
                                                onClick={() => handleStartEdit(a)}
                                                className="text-blue-400 hover:text-blue-300"
                                            >
                                                編輯
                                            </button>
                                            <button
                                                onClick={() => handleDelete(a.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                刪除
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnnouncementsPage;
