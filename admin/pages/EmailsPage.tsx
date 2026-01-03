/**
 * 郵件通知頁面 - 連接 Supabase
 */

import React, { useState, useEffect } from 'react';
import {
    EmailLog,
    getEmailLogs,
    sendBulkEmail,
    getEmailStats,
    deleteEmailLog,
    retryEmailSend,
    getTargetEmails,
} from '../../services/emailService';

// 狀態標籤
const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: '⏳ 待處理', color: 'bg-yellow-500/20 text-yellow-400' },
    sending: { label: '📤 發送中', color: 'bg-blue-500/20 text-blue-400' },
    completed: { label: '✅ 已完成', color: 'bg-green-500/20 text-green-400' },
    failed: { label: '❌ 失敗', color: 'bg-red-500/20 text-red-400' },
};

// 目標標籤
const targetLabels: Record<string, string> = {
    all: '所有用戶',
    vip: 'VIP 用戶',
    free: '免費用戶',
};

const EmailsPage: React.FC = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [target, setTarget] = useState<'all' | 'vip' | 'free'>('all');
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [stats, setStats] = useState({ totalSent: 0, lastWeekSent: 0, pendingCount: 0 });
    const [targetCount, setTargetCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // 載入數據
    const loadData = async () => {
        setIsLoading(true);
        const [logsData, statsData] = await Promise.all([
            getEmailLogs(20),
            getEmailStats(),
        ]);
        setLogs(logsData);
        setStats(statsData);
        setIsLoading(false);
    };

    // 載入目標用戶數量
    const loadTargetCount = async () => {
        const emails = await getTargetEmails(target);
        setTargetCount(emails.length);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadTargetCount();
    }, [target]);

    // 顯示訊息
    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    // 發送郵件
    const handleSend = async () => {
        if (!subject.trim()) {
            showMessage('error', '請輸入郵件主旨');
            return;
        }
        if (!content.trim()) {
            showMessage('error', '請輸入郵件內容');
            return;
        }

        if (!confirm(`確定要發送郵件給 ${targetLabels[target]}（約 ${targetCount} 人）嗎？`)) {
            return;
        }

        setIsSending(true);
        const result = await sendBulkEmail({ subject, content, target });

        if (result.success) {
            setSubject('');
            setContent('');
            await loadData();
            showMessage('success', result.message);
        } else {
            showMessage('error', result.message);
        }
        setIsSending(false);
    };

    // 刪除記錄
    const handleDelete = async (id: string) => {
        if (!confirm('確定要刪除這筆記錄嗎？')) return;

        const success = await deleteEmailLog(id);
        if (success) {
            setLogs(prev => prev.filter(l => l.id !== id));
            showMessage('success', '記錄已刪除');
        } else {
            showMessage('error', '刪除失敗');
        }
    };

    // 重試發送
    const handleRetry = async (id: string) => {
        const result = await retryEmailSend(id);
        if (result.success) {
            await loadData();
            showMessage('success', result.message);
        } else {
            showMessage('error', result.message);
        }
    };

    // 格式化日期
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString('zh-TW', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-6">
            {/* 訊息提示 */}
            {message && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 max-w-md ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                    {message.text}
                </div>
            )}

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">總發送次數</p>
                    <p className="text-3xl font-bold text-white mt-2">
                        {isLoading ? '-' : stats.totalSent}
                    </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">本週發送</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">
                        {isLoading ? '-' : stats.lastWeekSent}
                    </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">待處理</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-2">
                        {isLoading ? '-' : stats.pendingCount}
                    </p>
                </div>
            </div>

            {/* 發送郵件表單 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">✉️ 群發郵件</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">發送對象</label>
                        <div className="flex gap-4 items-center">
                            <select
                                value={target}
                                onChange={(e) => setTarget(e.target.value as any)}
                                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                            >
                                <option value="all">所有用戶</option>
                                <option value="vip">VIP 用戶</option>
                                <option value="free">免費用戶</option>
                            </select>
                            <span className="text-gray-400 text-sm whitespace-nowrap">
                                約 {targetCount} 位收件人
                            </span>
                        </div>
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
                            placeholder="輸入郵件內容...&#10;&#10;支援純文字格式"
                            rows={8}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">
                            💡 郵件將記錄到資料庫，需整合郵件服務（如 SendGrid）後自動發送
                        </p>
                        <button
                            onClick={handleSend}
                            disabled={isSending}
                            className="px-8 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 disabled:opacity-50"
                        >
                            {isSending ? '發送中...' : '發送郵件'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 發送記錄 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📋 發送記錄</h3>

                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-20 bg-gray-700 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : logs.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">尚無發送記錄</p>
                ) : (
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 bg-gray-900 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-2 py-1 rounded text-xs ${statusLabels[log.status]?.color || 'bg-gray-600 text-gray-300'
                                                }`}>
                                                {statusLabels[log.status]?.label || log.status}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {targetLabels[log.target_type] || log.target_type}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                {formatDate(log.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-white font-medium">{log.subject}</p>
                                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                            {log.content}
                                        </p>
                                        {log.error_message && (
                                            <p className="text-red-400 text-sm mt-1">
                                                ⚠️ {log.error_message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                        <span className="text-gray-400 text-sm whitespace-nowrap">
                                            {log.sent_count} 封
                                        </span>
                                        {(log.status === 'pending' || log.status === 'failed') && (
                                            <button
                                                onClick={() => handleRetry(log.id)}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                重試
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(log.id)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            刪除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailsPage;
