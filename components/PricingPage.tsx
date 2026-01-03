/**
 * 價格方案頁面組件
 * 用於顯示訂閱方案和購買選項
 */

import React, { useState, useEffect } from 'react';
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
}

const PricingPage: React.FC<PricingPageProps> = ({ onPurchase }) => {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [userAccess, setUserAccess] = useState<UserAccess | null>(null);
    const [userSub, setUserSub] = useState<UserSubscription | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // 載入資料
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);

        // 取得價格方案
        const pricingPlans = await getPricingPlans();
        setPlans(pricingPlans);

        // 取得用戶狀態
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const access = await checkUserAccess(user.id);
            setUserAccess(access);
            const sub = await getUserSubscription(user.id);
            setUserSub(sub);
        }

        setIsLoading(false);
    };

    const handlePurchase = (planType: string) => {
        setSelectedPlan(planType);
        if (onPurchase) {
            onPurchase(planType);
        } else {
            // 預設行為：顯示購買確認
            setMessage({ type: 'success', text: `已選擇方案：${planType}，付款功能開發中...` });
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
            return `${plan.credits_amount} 次 AI 深度解讀`;
        }
        if (plan.subscription_months === 1) {
            return '無限次 AI 深度解讀';
        }
        if (plan.subscription_months === 12) {
            return '全年無限 AI 深度解讀';
        }
        if (plan.subscription_months && plan.subscription_months > 100) {
            return '永久無限 AI 深度解讀';
        }
        return '';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-amber-400 text-xl">載入中...</div>
            </div>
        );
    }

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
                {/* 標題 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🔮 解鎖完整塔羅體驗
                    </h1>
                    <p className="text-gray-400 text-lg">
                        選擇適合您的方案，獲得 AI 深度解讀
                    </p>

                    {/* 當前狀態 */}
                    {userSub && (
                        <div className="mt-4 inline-block px-4 py-2 bg-gray-800 rounded-full text-amber-400">
                            目前：{formatSubscriptionStatus(userSub)}
                        </div>
                    )}
                </div>

                {/* 價格方案 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
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
                                        最受歡迎
                                    </span>
                                </div>
                            )}

                            {/* 方案圖示和名稱 */}
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-3">{getPlanIcon(plan.plan_type)}</div>
                                <h3 className="text-xl font-bold text-white">{plan.name_zh}</h3>
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
                                        平均每月 NT$ {Math.round(plan.price / 12)}
                                    </div>
                                )}
                            </div>

                            {/* 特點列表 */}
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center text-gray-300">
                                    <span className="text-green-400 mr-2">✓</span>
                                    AI 個人化深度解讀
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <span className="text-green-400 mr-2">✓</span>
                                    所有牌陣類型
                                </li>
                                {(plan.subscription_months || 0) >= 1 && (
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-400 mr-2">✓</span>
                                        無限次追問功能
                                    </li>
                                )}
                                {plan.plan_type === 'lifetime' && (
                                    <li className="flex items-center text-amber-400">
                                        <span className="mr-2">👑</span>
                                        永久免費升級
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
                                {plan.credits_amount ? '購買點數' : '立即訂閱'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* 底部說明 */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>💳 支持多種付款方式 | 🔒 安全加密交易 | 📧 購買後即時生效</p>
                    <p className="mt-2">
                        有問題？請聯繫客服 support@tarot.app
                    </p>
                </div>

                {/* 免費體驗說明 */}
                <div className="mt-8 bg-gray-800/50 rounded-xl p-6 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">🆓 免費用戶也能體驗</h4>
                    <p className="text-gray-400">
                        新用戶可免費獲得 3 次 AI 深度解讀，<br />
                        基礎的三張牌解讀永久免費（使用神諭資料庫）
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
