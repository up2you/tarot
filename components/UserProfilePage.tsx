/**
 * 用戶個人中心頁面
 * 顯示用戶資訊、訂閱狀態、購買的風格等
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t, i18n } = useTranslation();
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

    if (!isLoading && !profile) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 mb-4">{t('profile_page.please_login')}</p>
                    <button
                        onClick={() => onNavigate?.('auth')}
                        className="px-6 py-2 bg-amber-500 text-black rounded-lg"
                    >
                        {t('profile_page.go_to_login')}
                    </button>
                </div>
            </div>
        );
    }

    // 使用預設值避免 profile 為 null 時的錯誤
    const displayProfile = profile || {
        user_id: '',
        email: '...',
        display_name: '...',
        avatar_url: null,
        subscription_type: 'free',
        subscription_expires_at: null,
        credits_balance: 0,
        active_card_style: 'classic',
        total_readings_count: 0,
        created_at: new Date().toISOString(),
    };

    // Helper function to get subscription badge
    const getSubscriptionBadge = (userProfile: typeof displayProfile) => {
        const badges: Record<string, { color: string; icon: string; text: string }> = {
            'lifetime': { color: 'from-amber-500 to-yellow-400', icon: '👑', text: t('profile_page.badge_lifetime') },
            'yearly': { color: 'from-purple-500 to-pink-500', icon: '🌟', text: t('profile_page.badge_yearly') },
            'monthly': { color: 'from-blue-500 to-cyan-400', icon: '📅', text: t('profile_page.badge_monthly') },
            'credits': { color: 'from-green-500 to-emerald-400', icon: '🎯', text: t('profile_page.badge_credits') },
            'free': { color: 'from-gray-500 to-gray-400', icon: '🆓', text: t('profile_page.badge_free') },
        };

        const badge = badges[userProfile.subscription_type] || badges['free'];
        return badge;
    };

    const badge = getSubscriptionBadge(displayProfile);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 返回按鈕 */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <span>{t('profile_page.back')}</span>
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
                                {displayProfile.display_name || t('profile_page.default_name')}
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
                            {t('profile_page.logout')}
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
                            {tab === 'overview' && t('profile_page.tab_overview')}
                            {tab === 'styles' && t('profile_page.tab_styles')}
                            {tab === 'history' && t('profile_page.tab_history')}
                        </button>
                    ))}
                </div>

                {/* 總覽標籤頁 */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* 統計卡片 */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">{t('profile_page.total_readings')}</p>
                                <p className="text-2xl font-bold text-white mt-1">{displayProfile.total_readings_count || 0} {t('profile_page.readings_unit')}</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">{t('profile_page.credits_balance')}</p>
                                <p className="text-2xl font-bold text-amber-400 mt-1">{displayProfile.credits_balance} {t('profile_page.credits_unit')}</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">{t('profile_page.owned_styles')}</p>
                                <p className="text-2xl font-bold text-purple-400 mt-1">{ownedStyles.length} {t('profile_page.styles_unit')}</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                <p className="text-gray-400 text-sm">{t('profile_page.active_style')}</p>
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
                                <h3 className="font-bold text-lg">{t('profile_page.upgrade_membership')}</h3>
                                <p className="text-black/60 text-sm">{t('profile_page.upgrade_desc')}</p>
                            </button>

                            <button
                                onClick={() => onNavigate?.('cardStyles')}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-left hover:border-amber-500/50 transition-all"
                            >
                                <div className="text-2xl mb-2">🎴</div>
                                <h3 className="font-bold text-lg text-white">{t('profile_page.card_style_shop')}</h3>
                                <p className="text-gray-400 text-sm">{t('profile_page.shop_desc', { count: 32 })}</p>
                            </button>
                        </div>

                        {/* 訂閱狀態詳情 */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-bold text-white mb-4">{t('profile_page.subscription_details')}</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">{t('profile_page.membership_type')}</span>
                                    <span className="text-white">{badge?.text}</span>
                                </div>
                                {displayProfile.subscription_expires_at && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">{t('profile_page.expires_at')}</span>
                                        <span className="text-white">
                                            {new Date(displayProfile.subscription_expires_at).toLocaleDateString(i18n.language)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-400">{t('profile_page.credits_balance')}</span>
                                    <span className="text-amber-400">{displayProfile.credits_balance} {t('profile_page.credits_unit')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 牌面風格標籤頁 */}
                {activeTab === 'styles' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{t('profile_page.owned_card_styles')}</h3>
                            <button
                                onClick={() => onNavigate?.('cardStyles')}
                                className="text-amber-400 text-sm hover:underline"
                            >
                                {t('profile_page.explore_more')}
                            </button>
                        </div>

                        {ownedStyles.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {ownedStyles.map((style) => (
                                    <div
                                        key={style.id}
                                        className={`bg-gray-800 rounded-xl overflow-hidden border-2 ${profile?.active_card_style === style.style_key
                                            ? 'border-amber-500'
                                            : 'border-gray-700'
                                            }`}
                                    >
                                        <div className="h-24 bg-gray-700 flex items-center justify-center text-4xl">
                                            🎴
                                        </div>
                                        <div className="p-3">
                                            <p className="text-white font-bold text-sm truncate">
                                                {(i18n.language === 'zh-TW' || i18n.language === 'zh-CN') ? style.name_zh : (style.name_en || style.name_zh)}
                                            </p>
                                            {profile?.active_card_style === style.style_key && (
                                                <p className="text-amber-400 text-xs">{t('profile_page.in_use')}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <p className="mb-4">{t('profile_page.no_owned_styles')}</p>
                                <button
                                    onClick={() => onNavigate?.('cardStyles')}
                                    className="px-6 py-2 bg-amber-500 text-black rounded-lg"
                                >
                                    {t('profile_page.go_to_shop')}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 占卜記錄標籤頁 */}
                {activeTab === 'history' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">{t('profile_page.recent_readings')}</h3>

                        {recentReadings.length > 0 ? (
                            <div className="space-y-3">
                                {recentReadings.map((reading) => (
                                    <div
                                        key={reading.id}
                                        className="bg-gray-800 rounded-xl p-4 border border-gray-700"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-white font-bold">{reading.question || t('profile_page.no_question')}</p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {reading.spread_type} · {new Date(reading.created_at).toLocaleDateString(i18n.language)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-xs px-2 py-1 rounded ${reading.interpretation_type === 'ai'
                                                    ? 'bg-purple-500/20 text-purple-400'
                                                    : 'bg-gray-600/20 text-gray-400'
                                                    }`}>
                                                    {reading.interpretation_type === 'ai' ? t('profile_page.ai_reading') : t('profile_page.oracle_reading')}
                                                </span>
                                                {reading.followup_count > 0 && (
                                                    <p className="text-amber-400 text-xs mt-1">
                                                        {t('profile_page.followup_count', { count: reading.followup_count })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <p>{t('profile_page.no_history')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
