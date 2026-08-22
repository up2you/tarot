/**
 * 價格方案頁面組件
 * 用於顯示訂閱方案和購買選項
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    PricingPlan,
    UserAccess,
    getPricingPlans,
    checkUserAccess,
    formatSubscriptionStatus,
    getUserSubscription,
    UserSubscription,
} from '../services/subscriptionService';
import { supabase } from '../services/supabaseClient';

interface PricingPageProps {
    onPurchase?: (planType: string) => void;
    onClose?: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onPurchase, onClose }) => {
    const { t, i18n } = useTranslation();
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [userAccess, setUserAccess] = useState<UserAccess | null>(null);
    const [userSub, setUserSub] = useState<UserSubscription | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const isChinese = i18n.language === 'zh-TW' || i18n.language === 'zh-CN';

    // 載入資料
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);

        // 取得價格方案
        try {
            const pricingPlans = await getPricingPlans();
            setPlans(pricingPlans);
        } catch (e) {
            console.warn('[PricingPage] getPricingPlans failed');
            setPlans([]);
        }

        // 取得用戶狀態
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            try {
                const access = await checkUserAccess(user.id);
                setUserAccess(access);
            } catch (e) {
                console.warn('[PricingPage] checkUserAccess failed');
            }
            try {
                const sub = await getUserSubscription(user.id);
                setUserSub(sub);
            } catch (e) {
                console.warn('[PricingPage] getUserSubscription failed');
            }
        }

        setIsLoading(false);
    };

    const handlePurchase = (planType: string) => {
        setSelectedPlan(planType);
        if (onPurchase) {
            onPurchase(planType);
        } else {
            setMessage({ type: 'success', text: t('pricing.selected_plan_msg', { plan: planType }) });
        }
    };

    const formatPrice = (price: number): string => {
        return `NT$ ${price.toLocaleString()}`;
    };

    const getPlanIcon = (planType: string): string => {
        if (planType.startsWith('credits')) return '🎯';
        if (planType === 'monthly') return '📅';
        if (planType === 'yearly') return '🌟';
        if (planType === 'lifetime') return '👑';
        return '💎';
    };

    const getPlanDescription = (plan: PricingPlan): string => {
        if (plan.credits_amount) {
            return t('pricing.ai_readings', { count: plan.credits_amount });
        }
        if (plan.subscription_months === 1) {
            return t('pricing.unlimited_ai');
        }
        if (plan.subscription_months === 12) {
            return t('pricing.unlimited_ai');
        }
        if (plan.subscription_months && plan.subscription_months > 100) {
            return t('pricing.unlimited_ai');
        }
        return '';
    };

    const renderSubscriptionStatus = (sub: UserSubscription): string => {
        const expiresDate = sub.subscription_expires_at
            ? new Date(sub.subscription_expires_at).toLocaleDateString(i18n.language)
            : '---';

        switch (sub.subscription_type) {
            case 'lifetime':
                return t('pricing.status.lifetime');
            case 'yearly':
                return t('pricing.status.yearly', { expires: expiresDate });
            case 'monthly':
                return t('pricing.status.monthly', { expires: expiresDate });
            case 'credits':
                return t('pricing.status.credits', { credits: sub.credits_balance });
            default:
                return t('pricing.status.free', { remaining: Math.max(0, 3 - sub.free_readings_used) });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
            {/* 訊息提示 */}
            {message && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                    {message.text}
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* 返回按鈕 */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <span>←</span> {t('pricing.back')}
                    </button>
                )}

                {/* 標題 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {t('pricing.title')}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {t('pricing.subtitle')}
                    </p>

                    {/* 當前狀態 */}
                    {userSub && (
                        <div className="mt-4 inline-block px-4 py-2 bg-gray-800 rounded-full text-amber-400">
                            {t('pricing.current_plan', { status: renderSubscriptionStatus(userSub) })}
                        </div>
                    )}
                </div>

                {/* 價格方案 */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-2xl p-6 border-2 border-gray-700 animate-pulse">
                                <div className="h-12 w-12 bg-gray-700 rounded-full mx-auto mb-4" />
                                <div className="h-6 bg-gray-700 rounded w-2/3 mx-auto mb-4" />
                                <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto mb-6" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-700 rounded" />
                                    <div className="h-4 bg-gray-700 rounded" />
                                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                                </div>
                                <div className="h-12 bg-gray-700 rounded-xl mt-6" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((plan) => {
                            const planKey = `pricing.plans.${plan.plan_type}`;
                            const translatedPlanName = t(planKey);
                            const planName = translatedPlanName !== planKey
                                ? translatedPlanName
                                : (isChinese ? plan.name_zh : (plan.name_en || plan.name_zh));

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative bg-gray-800 rounded-2xl p-6 border-2 transition-all ${plan.is_popular
                                        ? 'border-amber-500 shadow-lg shadow-amber-500/20'
                                        : 'border-gray-700 hover:border-gray-600'
                                        } ${selectedPlan === plan.plan_type ? 'ring-2 ring-amber-400' : ''
                                        }`}
                                >
                                    {/* 推薦標籤 */}
                                    {plan.is_popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                                                {t('pricing.popular')}
                                            </span>
                                        </div>
                                    )}

                                    {/* 方案圖示和名稱 */}
                                    <div className="text-center mb-6">
                                        <div className="text-4xl mb-3">{getPlanIcon(plan.plan_type)}</div>
                                        <h3 className="text-xl font-bold text-white">{planName}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{getPlanDescription(plan)}</p>
                                    </div>

                                    {/* 價格 */}
                                    <div className="text-center mb-6">
                                        {plan.original_price && (
                                            <div className="text-gray-500 line-through text-lg">
                                                {formatPrice(plan.original_price)}
                                            </div>
                                        )}
                                        <div className="text-3xl font-bold text-white">
                                            {formatPrice(plan.price)}
                                        </div>
                                        {plan.subscription_months === 12 && (
                                            <div className="text-amber-400 text-sm">
                                                {t('pricing.avg_per_month', { price: Math.round(plan.price / 12) })}
                                            </div>
                                        )}
                                    </div>

                                    {/* 特點列表 */}
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center text-gray-300">
                                            <span className="text-green-400 mr-2">✓</span>
                                            {t('pricing.feature_ai')}
                                        </li>
                                        <li className="flex items-center text-gray-300">
                                            <span className="text-green-400 mr-2">✓</span>
                                            {t('pricing.feature_spreads')}
                                        </li>
                                        {(plan.subscription_months || 0) >= 1 && (
                                            <li className="flex items-center text-gray-300">
                                                <span className="text-green-400 mr-2">✓</span>
                                                {t('pricing.feature_followup')}
                                            </li>
                                        )}
                                        {plan.plan_type === 'lifetime' && (
                                            <li className="flex items-center text-amber-400">
                                                <span className="mr-2">👑</span>
                                                {t('pricing.feature_upgrade')}
                                            </li>
                                        )}
                                    </ul>

                                    {/* 購買按鈕 */}
                                    <button
                                        onClick={() => handlePurchase(plan.plan_type)}
                                        className={`w-full py-3 rounded-xl font-bold transition-all ${plan.is_popular
                                            ? 'bg-amber-500 text-black hover:bg-amber-400'
                                            : 'bg-gray-700 text-white hover:bg-gray-600'
                                            }`}
                                    >
                                        {plan.credits_amount ? t('pricing.buy_credits') : t('pricing.subscribe')}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 底部說明 */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>{t('pricing.footer_features')}</p>
                    <p className="mt-2">
                        {t('pricing.support')}
                    </p>
                </div>

                {/* 免費體驗說明 */}
                <div className="mt-8 bg-gray-800/50 rounded-xl p-6 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">{t('pricing.free_user_note')}</h4>
                    <p className="text-gray-400 whitespace-pre-line">
                        {t('pricing.free_user_note_desc')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
