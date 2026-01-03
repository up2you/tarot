/**
 * 流量分析服務
 * 管理訪客統計、占卜分析、轉化率數據
 */

import { supabase } from './supabaseClient';

// ============================================
// 類型定義
// ============================================

export interface DailyStats {
    date: string;           // YYYY-MM-DD
    visitors: number;       // 訪客數
    readings: number;       // 占卜次數
    new_users: number;      // 新註冊數
    vip_conversions: number; // VIP 轉化數
}

export interface VisitorStats {
    today: number;
    yesterday: number;
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
    trend: DailyStats[];    // 過去7天趨勢
}

export interface ReadingStats {
    totalReadings: number;
    todayReadings: number;
    averagePerDay: number;
    popularSpreads: { spread_type: string; count: number }[];
    trend: { date: string; count: number }[];
}

export interface ConversionStats {
    registrationRate: number;   // 訪客→註冊
    vipConversionRate: number;  // 免費→VIP
    totalUsers: number;
    totalVip: number;
    recentConversions: { date: string; count: number }[];
}

// ============================================
// 訪客統計
// ============================================

/**
 * 取得訪客統計數據
 */
export const getVisitorStats = async (): Promise<VisitorStats> => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        const twoWeeksAgo = new Date(today);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        // 從 daily_analytics 表取得統計
        const { data: dailyData, error } = await supabase
            .from('daily_analytics')
            .select('*')
            .gte('date', twoWeeksAgo.toISOString().split('T')[0])
            .order('date', { ascending: false });

        if (error) {
            console.error('[Analytics] getVisitorStats failed:', error);
            return getEmptyVisitorStats();
        }

        const stats = dailyData || [];
        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // 計算各時段訪客數
        const todayStats = stats.find(s => s.date === todayStr);
        const yesterdayStats = stats.find(s => s.date === yesterdayStr);

        const thisWeekStats = stats.filter(s => new Date(s.date) >= weekAgo);
        const lastWeekStats = stats.filter(s => {
            const d = new Date(s.date);
            return d >= twoWeeksAgo && d < weekAgo;
        });

        const thisMonthStats = stats.filter(s => new Date(s.date) >= monthStart);

        // 過去7天趨勢
        const trend: DailyStats[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayStats = stats.find(s => s.date === dateStr);
            trend.push({
                date: dateStr,
                visitors: dayStats?.visitors || 0,
                readings: dayStats?.readings || 0,
                new_users: dayStats?.new_users || 0,
                vip_conversions: dayStats?.vip_conversions || 0,
            });
        }

        return {
            today: todayStats?.visitors || 0,
            yesterday: yesterdayStats?.visitors || 0,
            thisWeek: thisWeekStats.reduce((sum, s) => sum + (s.visitors || 0), 0),
            lastWeek: lastWeekStats.reduce((sum, s) => sum + (s.visitors || 0), 0),
            thisMonth: thisMonthStats.reduce((sum, s) => sum + (s.visitors || 0), 0),
            trend,
        };
    } catch (err) {
        console.error('[Analytics] getVisitorStats error:', err);
        return getEmptyVisitorStats();
    }
};

function getEmptyVisitorStats(): VisitorStats {
    return {
        today: 0,
        yesterday: 0,
        thisWeek: 0,
        lastWeek: 0,
        thisMonth: 0,
        trend: [],
    };
}

// ============================================
// 占卜使用分析
// ============================================

/**
 * 取得占卜使用統計
 */
export const getReadingStats = async (): Promise<ReadingStats> => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);

        // 總占卜數（從 reading_logs 表）
        const { count: totalReadings } = await supabase
            .from('reading_logs')
            .select('*', { count: 'exact', head: true });

        // 今日占卜數
        const { count: todayReadings } = await supabase
            .from('reading_logs')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', today.toISOString());

        // 熱門牌陣
        const { data: spreadData } = await supabase
            .from('reading_logs')
            .select('spread_type')
            .gte('created_at', monthAgo.toISOString());

        const spreadCounts: Record<string, number> = {};
        (spreadData || []).forEach(r => {
            const type = r.spread_type || 'unknown';
            spreadCounts[type] = (spreadCounts[type] || 0) + 1;
        });

        const popularSpreads = Object.entries(spreadCounts)
            .map(([spread_type, count]) => ({ spread_type, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // 過去7天趨勢
        const { data: dailyData } = await supabase
            .from('daily_analytics')
            .select('date, readings')
            .gte('date', weekAgo.toISOString().split('T')[0])
            .order('date', { ascending: true });

        const trend = (dailyData || []).map(d => ({
            date: d.date,
            count: d.readings || 0,
        }));

        // 計算日均
        const daysCount = trend.length || 1;
        const totalInPeriod = trend.reduce((sum, d) => sum + d.count, 0);
        const averagePerDay = Math.round(totalInPeriod / daysCount);

        return {
            totalReadings: totalReadings || 0,
            todayReadings: todayReadings || 0,
            averagePerDay,
            popularSpreads,
            trend,
        };
    } catch (err) {
        console.error('[Analytics] getReadingStats error:', err);
        return {
            totalReadings: 0,
            todayReadings: 0,
            averagePerDay: 0,
            popularSpreads: [],
            trend: [],
        };
    }
};

// ============================================
// 轉化分析
// ============================================

/**
 * 取得轉化率統計
 */
export const getConversionStats = async (): Promise<ConversionStats> => {
    try {
        const today = new Date();
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);

        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        // 總用戶數
        const { count: totalUsers } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true });

        // VIP 用戶數
        const { count: totalVip } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true })
            .eq('is_vip', true);

        // 計算轉化率
        const vipConversionRate = totalUsers ? ((totalVip || 0) / totalUsers * 100) : 0;

        // 本月訪客與註冊（從 daily_analytics）
        const { data: monthlyData } = await supabase
            .from('daily_analytics')
            .select('visitors, new_users')
            .gte('date', monthAgo.toISOString().split('T')[0]);

        const totalVisitors = (monthlyData || []).reduce((sum, d) => sum + (d.visitors || 0), 0);
        const totalNewUsers = (monthlyData || []).reduce((sum, d) => sum + (d.new_users || 0), 0);
        const registrationRate = totalVisitors ? (totalNewUsers / totalVisitors * 100) : 0;

        // 最近7天 VIP 轉化趨勢
        const { data: conversionData } = await supabase
            .from('daily_analytics')
            .select('date, vip_conversions')
            .gte('date', weekAgo.toISOString().split('T')[0])
            .order('date', { ascending: true });

        const recentConversions = (conversionData || []).map(d => ({
            date: d.date,
            count: d.vip_conversions || 0,
        }));

        return {
            registrationRate: Math.round(registrationRate * 100) / 100,
            vipConversionRate: Math.round(vipConversionRate * 100) / 100,
            totalUsers: totalUsers || 0,
            totalVip: totalVip || 0,
            recentConversions,
        };
    } catch (err) {
        console.error('[Analytics] getConversionStats error:', err);
        return {
            registrationRate: 0,
            vipConversionRate: 0,
            totalUsers: 0,
            totalVip: 0,
            recentConversions: [],
        };
    }
};

// ============================================
// 事件記錄（用於前端追蹤）
// ============================================

/**
 * 記錄訪客（每日統計用）
 */
export const logVisit = async (): Promise<void> => {
    try {
        const today = new Date().toISOString().split('T')[0];

        // 使用 upsert 更新今日訪客數
        const { error } = await supabase.rpc('increment_daily_visitors', {
            target_date: today,
        });

        if (error) {
            console.warn('[Analytics] logVisit failed:', error);
        }
    } catch (err) {
        console.warn('[Analytics] logVisit error:', err);
    }
};

/**
 * 記錄占卜事件
 */
export const logReading = async (
    userId: string | null,
    spreadType: string,
    questionCategory?: string
): Promise<void> => {
    try {
        const today = new Date().toISOString().split('T')[0];

        // 記錄到 reading_logs
        await supabase.from('reading_logs').insert({
            user_id: userId,
            spread_type: spreadType,
            question_category: questionCategory,
            created_at: new Date().toISOString(),
        });

        // 更新每日統計
        await supabase.rpc('increment_daily_readings', {
            target_date: today,
        });
    } catch (err) {
        console.warn('[Analytics] logReading error:', err);
    }
};

/**
 * 記錄 VIP 轉化
 */
export const logVipConversion = async (userId: string): Promise<void> => {
    try {
        const today = new Date().toISOString().split('T')[0];

        await supabase.rpc('increment_daily_vip_conversions', {
            target_date: today,
        });
    } catch (err) {
        console.warn('[Analytics] logVipConversion error:', err);
    }
};
