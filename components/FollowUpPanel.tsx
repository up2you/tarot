/**
 * 追問功能 UI 組件
 * 終身 VIP 限定，每題最多 2 次追問
 */

import React, { useState, useEffect } from 'react';
import {
    FollowupEligibility,
    Followup,
    checkFollowupEligibility,
    getFollowups,
    askFollowup,
} from '../services/followUpService';
import { supabase } from '../services/supabaseClient';

interface FollowUpPanelProps {
    readingId: string;
    onFollowupComplete?: (answer: string) => void;
}

const FollowUpPanel: React.FC<FollowUpPanelProps> = ({ readingId, onFollowupComplete }) => {
    const [eligibility, setEligibility] = useState<FollowupEligibility | null>(null);
    const [followups, setFollowups] = useState<Followup[]>([]);
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAsking, setIsAsking] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

    useEffect(() => {
        loadData();
    }, [readingId]);

    const loadData = async () => {
        setIsLoading(true);

        // 取得用戶資訊
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setMessage({ type: 'info', text: '請先登入' });
            setIsLoading(false);
            return;
        }

        setUserId(user.id);

        // 檢查追問資格
        const elig = await checkFollowupEligibility(user.id, readingId);
        setEligibility(elig);

        // 取得已有的追問
        const existingFollowups = await getFollowups(readingId);
        setFollowups(existingFollowups);

        setIsLoading(false);
    };

    const handleAskFollowup = async () => {
        if (!userId || !question.trim()) return;

        setIsAsking(true);
        setMessage(null);

        const result = await askFollowup(userId, readingId, question.trim());

        if (result.success && result.answer) {
            setMessage({ type: 'success', text: '追問完成！' });
            setQuestion('');

            // 重新載入資料
            await loadData();

            if (onFollowupComplete) {
                onFollowupComplete(result.answer);
            }
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setIsAsking(false);
    };

    // 清除訊息
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (isLoading) {
        return (
            <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="animate-pulse text-gray-400">載入中...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            {/* 標題 */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    💬 追問功能
                    <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full">
                        終身 VIP 限定
                    </span>
                </h3>
                {eligibility && (
                    <span className="text-sm text-gray-400">
                        剩餘 {eligibility.remaining_count}/2 次
                    </span>
                )}
            </div>

            {/* 訊息提示 */}
            {message && (
                <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-400' :
                        message.type === 'error' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* 已有的追問記錄 */}
            {followups.length > 0 && (
                <div className="space-y-4 mb-6">
                    {followups.map((followup, index) => (
                        <div key={followup.id} className="bg-gray-700/50 rounded-lg p-4">
                            {/* 追問問題 */}
                            <div className="flex items-start gap-2 mb-2">
                                <span className="text-amber-400">Q{index + 1}:</span>
                                <p className="text-white">{followup.question}</p>
                            </div>
                            {/* 追問回答 */}
                            {followup.answer && (
                                <div className="flex items-start gap-2 pl-6">
                                    <span className="text-purple-400">A:</span>
                                    <p className="text-gray-300">{followup.answer}</p>
                                </div>
                            )}
                            {followup.status === 'pending' && (
                                <div className="pl-6 text-gray-500 text-sm animate-pulse">
                                    正在生成回答...
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* 追問輸入區 */}
            {eligibility?.can_ask ? (
                <div className="space-y-3">
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="輸入您想進一步了解的問題..."
                        className="w-full bg-gray-700 text-white rounded-lg p-3 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                        disabled={isAsking}
                    />
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">
                            每個占卜最多可追問 2 次
                        </p>
                        <button
                            onClick={handleAskFollowup}
                            disabled={isAsking || !question.trim()}
                            className={`px-6 py-2 rounded-lg font-bold transition-all ${isAsking || !question.trim()
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-amber-500 text-black hover:bg-amber-400'
                                }`}
                        >
                            {isAsking ? '正在詢問...' : '發送追問'}
                        </button>
                    </div>
                </div>
            ) : eligibility ? (
                <div className="text-center py-6">
                    <p className="text-gray-400 mb-2">{eligibility.reason}</p>
                    {eligibility.remaining_count === 0 && followups.length > 0 && (
                        <p className="text-gray-500 text-sm">
                            您已使用完此占卜的追問次數
                        </p>
                    )}
                    {!eligibility.can_ask && eligibility.reason.includes('終身 VIP') && (
                        <a
                            href="/pricing"
                            className="inline-block mt-3 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors"
                        >
                            升級終身 VIP 解鎖追問功能
                        </a>
                    )}
                </div>
            ) : null}

            {/* 功能說明 */}
            <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-500 space-y-1">
                    <p>✨ 追問功能可讓您針對牌卡解讀提出更深入的問題</p>
                    <p>👑 此功能為終身 VIP 專屬，每個占卜限追問 2 次</p>
                </div>
            </div>
        </div>
    );
};

export default FollowUpPanel;
