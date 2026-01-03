/**
 * 用戶個人中心頁面
 * 顯示用戶資訊、訂閱狀態、購買的風格等
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import {
    getSupabaseUser,
    getSupabaseUserProfile,
    supabaseSignOut,
    SupabaseUserProfile
} from '../services/supabaseAuthService';
import {
    getStylesWithOwnership,
    StyleWithOwnership
} from '../services/cardStyleService';
import { getUserReadings, Reading } from '../services/followUpService';
import { formatSubscriptionStatus, getUserSubscription } from '../services/subscriptionService';

interface UserProfilePageProps {
    onClose?: () => void;
    onNavigate?: (page: string) => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ onClose, onNavigate }) => {
    const [profile, setProfile] = useState<SupabaseUserProfile | null>(null);
    const [ownedStyles, setOwnedStyles] = useState<StyleWithOwnership[]>([]);
    const [recentReadings, setRecentReadings] = useState<Reading[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'styles' | 'history'>('overview');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);

        try {
            const user = await getSupabaseUser();
            if (!user) {
                setIsLoading(false);
                return;
            }

            // 取得用戶 Profile（可能失敗，使用預設值）
            let userProfile = await getSupabaseUserProfile(user.id);

            // 如果沒有 profile，創建一個預設的
            if (!userProfile) {
                userProfile = {
                    user_id: user.id,
                    email: user.email,
                    display_name: user.email.split('@')[0],
                    avatar_url: null,
                    subscription_type: 'free',
                    subscription_expires_at: null,
                    credits_balance: 0,
                    active_card_style: 'classic',
                    created_at: user.created_at,
                };
            }
            setProfile(userProfile);

            // 取得擁有的牌面風格（可能失敗，忽略錯誤）
            try {
                const styles = await getStylesWithOwnership(user.id);
                setOwnedStyles(styles.filter(s => s.is_owned));
            } catch (e) {
                console.log('[UserProfilePage] getStylesWithOwnership failed, using empty array');
                setOwnedStyles([]);
            }

            // 取得最近占卜記錄（可能失敗，忽略錯誤）
            try {
                const readings = await getUserReadings(user.id, 5);
                setRecentReadings(readings);
            } catch (e) {
                console.log('[UserProfilePage] getUserReadings failed, using empty array');
                setRecentReadings([]);
            }
        } catch (err) {
            console.error('[UserProfilePage] loadData error:', err);
        }

        setIsLoading(false);
    };

    const handleLogout = async () => {
        await supabaseSignOut();
        window.location.reload();
    };

    const getSubscriptionBadge = () => {
        if (!profile) return null;

        const badges: Record<string, { color: string; icon: string; text: string }> = {
            'lifetime': { color: 'from-amber-500 to-yellow-400', icon: '👑', text: '終身 VIP' },
            'yearly': { color: 'from-purple-500 to-pink-500', icon: '🌟', text: '年費 VIP' },
            'monthly': { color: 'from-blue-500 to-cyan-400', icon: '📅', text: '月費 VIP' },
            'credits': { color: 'from-green-500 to-emerald-400', icon: '🎯', text: '點數用戶' },
            'free': { color: 'from-gray-500 to-gray-400', icon: '🆓', text: '免費用戶' },
        };

        const badge = badges[displayProfile.subscription_type] || badges['free'];
        return badge;
    };

    if (!isLoading && !profile) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 mb-4">請先登入</p>
                    <button
                        onClick={() => onNavigate?.('auth')}
                        className="px-6 py-2 bg-amber-500 text-black rounded-lg"
                    >
                        前往登入
                    </button>
                </div>
            </div>
        );
    }

    // 使用預設值避免 profile 為 null 時的錯誤
    const displayProfile = profile || {
        user_id: '',
        email: '載入中...',
        display_name: '載入中...',
        avatar_url: null,
        subscription_type: 'free',
        subscription_expires_at: null,
        credits_balance: 0,
        active_card_style: 'classic',
        created_at: new Date().toISOString(),
    };

    const badge = getSubscriptionBadge();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 返回按鈕 */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <span>←</span> 返回
                    </button>
                )}

                {/* 用戶頭像和基本資訊 */}
                <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
                    <div className="flex items-center gap-6">
                        {/* 頭像 */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center text-3xl">
                            {displayProfile.avatar_url ? (
                                <img src={displayProfile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                displayProfile.display_name?.[0]?.toUpperCase() || '🔮'
                            )}
                        </div>

                        {/* 資訊 */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-white mb-1">
                                {displayProfile.display_name || '神秘旅人'}
                            </h1>
                            <p className="text-gray-400 text-sm mb-2">{displayProfile.email}</p>

                            {/* 會員徽章 */}
                            {badge && (
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${badge.color}`}>
                                    <span>{badge.icon}</span>
                                    <span className="text-sm font-bold text-white">{badge.text}</span>
                                </div>
                            )}
                        </div>

                        {/* 登出按鈕 */}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-gray-400 hover:text-red-400 text-sm transition-colors"
                        >
                            登出
                        </button>
                    </div>
                </div>

                {/* 標籤頁切換 */}
                <div className="flex gap-2 mb-6">
                    {['overview', 'styles', 'history'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === tab
                                ? 'bg-amber-500 text-black'
                                : 'bg-gray-800 text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab === 'overview' && '📊 總覽'}
                            {tab === 'styles' && '🎴 牌面風格'}
                            {tab === 'history' && '📜 占卜記錄'}
                        </button>
                    ))}
                </div>

                {/* 總覽標籤頁 */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* 統計卡片 */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">累計占卜</p>
                                <p className="text-2xl font-bold text-white mt-1">{recentReadings.length || 0} 次</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">點數餘額</p>
                                <p className="text-2xl font-bold text-amber-400 mt-1">{displayProfile.credits_balance}</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">擁有風格</p>
                                <p className="text-2xl font-bold text-purple-400 mt-1">{ownedStyles.length} 種</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">當前風格</p>
                                <p className="text-lg font-bold text-white mt-1">{displayProfile.active_card_style || 'classic'}</p>
                            </div>
                        </div>

                        {/* 快捷操作 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => onNavigate?.('pricing')}
                                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black rounded-xl p-6 text-left hover:brightness-110 transition-all"
                            >
                                <div className="text-2xl mb-2">💎</div>
                                <h3 className="font-bold text-lg">升級會員</h3>
                                <p className="text-black/60 text-sm">解鎖更多功能和無限占卜</p>
                            </button>

                            <button
                                onClick={() => onNavigate?.('cardStyles')}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-left hover:border-amber-500/50 transition-all"
                            >
                                <div className="text-2xl mb-2">🎴</div>
                                <h3 className="font-bold text-lg text-white">牌面風格商店</h3>
                                <p className="text-gray-400 text-sm">探索 32 種精美牌面</p>
                            </button>
                        </div>

                        {/* 訂閱狀態詳情 */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-bold text-white mb-4">📋 訂閱詳情</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">會員類型</span>
                                    <span className="text-white">{badge?.text}</span>
                                </div>
                                {displayProfile.subscription_expires_at && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">到期時間</span>
                                        <span className="text-white">
                                            {new Date(displayProfile.subscription_expires_at).toLocaleDateString('zh-TW')}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-400">點數餘額</span>
                                    <span className="text-amber-400">{displayProfile.credits_balance} 點</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 牌面風格標籤頁 */}
                {activeTab === 'styles' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">已擁有的牌面風格</h3>
                            <button
                                onClick={() => onNavigate?.('cardStyles')}
                                className="text-amber-400 text-sm hover:underline"
                            >
                                探索更多 →
                            </button>
                        </div>

                        {ownedStyles.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {ownedStyles.map((style) => (
                                    <div
                                        key={style.id}
                                        className={`bg-gray-800 rounded-xl overflow-hidden border-2 ${profile.active_card_style === style.style_key
                                            ? 'border-amber-500'
                                            : 'border-gray-700'
                                            }`}
                                    >
                                        <div className="h-24 bg-gray-700 flex items-center justify-center text-4xl">
                                            🎴
                                        </div>
                                        <div className="p-3">
                                            <p className="text-white font-bold text-sm truncate">{style.name_zh}</p>
                                            {profile.active_card_style === style.style_key && (
                                                <p className="text-amber-400 text-xs">使用中</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <p className="mb-4">尚未購買任何牌面風格</p>
                                <button
                                    onClick={() => onNavigate?.('cardStyles')}
                                    className="px-6 py-2 bg-amber-500 text-black rounded-lg"
                                >
                                    前往商店
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 占卜記錄標籤頁 */}
                {activeTab === 'history' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">最近占卜記錄</h3>

                        {recentReadings.length > 0 ? (
                            <div className="space-y-3">
                                {recentReadings.map((reading) => (
                                    <div
                                        key={reading.id}
                                        className="bg-gray-800 rounded-xl p-4 border border-gray-700"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-white font-bold">{reading.question || '無記錄問題'}</p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {reading.spread_type} · {new Date(reading.created_at).toLocaleDateString('zh-TW')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-xs px-2 py-1 rounded ${reading.interpretation_type === 'ai'
                                                    ? 'bg-purple-500/20 text-purple-400'
                                                    : 'bg-gray-600/20 text-gray-400'
                                                    }`}>
                                                    {reading.interpretation_type === 'ai' ? 'AI 解讀' : '神諭解讀'}
                                                </span>
                                                {reading.followup_count > 0 && (
                                                    <p className="text-amber-400 text-xs mt-1">
                                                        追問 {reading.followup_count}/2
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <p>尚無占卜記錄</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
