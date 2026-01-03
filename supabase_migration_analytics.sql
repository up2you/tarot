-- ============================================
-- 流量分析功能 - Supabase 資料表
-- ============================================

-- 1. 每日統計彙總表 (daily_analytics)
CREATE TABLE IF NOT EXISTS daily_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    visitors INTEGER DEFAULT 0,
    readings INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    vip_conversions INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_daily_analytics_date ON daily_analytics(date DESC);

-- RLS 政策
ALTER TABLE daily_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read analytics" ON daily_analytics
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "System can update analytics" ON daily_analytics
    FOR ALL USING (true);

-- ============================================

-- 2. 占卜記錄表 (reading_logs)
CREATE TABLE IF NOT EXISTS reading_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    spread_type VARCHAR(50),
    question_category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_reading_logs_created_at ON reading_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reading_logs_spread_type ON reading_logs(spread_type);
CREATE INDEX IF NOT EXISTS idx_reading_logs_user_id ON reading_logs(user_id);

-- RLS 政策
ALTER TABLE reading_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read reading logs" ON reading_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert reading logs" ON reading_logs
    FOR INSERT WITH CHECK (true);

-- ============================================

-- 3. RPC 函數：增加每日訪客數
CREATE OR REPLACE FUNCTION increment_daily_visitors(target_date DATE)
RETURNS void AS $$
BEGIN
    INSERT INTO daily_analytics (date, visitors, created_at, updated_at)
    VALUES (target_date, 1, NOW(), NOW())
    ON CONFLICT (date)
    DO UPDATE SET
        visitors = daily_analytics.visitors + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RPC 函數：增加每日占卜數
CREATE OR REPLACE FUNCTION increment_daily_readings(target_date DATE)
RETURNS void AS $$
BEGIN
    INSERT INTO daily_analytics (date, readings, created_at, updated_at)
    VALUES (target_date, 1, NOW(), NOW())
    ON CONFLICT (date)
    DO UPDATE SET
        readings = daily_analytics.readings + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RPC 函數：增加每日新用戶數
CREATE OR REPLACE FUNCTION increment_daily_new_users(target_date DATE)
RETURNS void AS $$
BEGIN
    INSERT INTO daily_analytics (date, new_users, created_at, updated_at)
    VALUES (target_date, 1, NOW(), NOW())
    ON CONFLICT (date)
    DO UPDATE SET
        new_users = daily_analytics.new_users + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. RPC 函數：增加每日 VIP 轉化數
CREATE OR REPLACE FUNCTION increment_daily_vip_conversions(target_date DATE)
RETURNS void AS $$
BEGIN
    INSERT INTO daily_analytics (date, vip_conversions, created_at, updated_at)
    VALUES (target_date, 1, NOW(), NOW())
    ON CONFLICT (date)
    DO UPDATE SET
        vip_conversions = daily_analytics.vip_conversions + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================

-- 7. 插入範例資料（過去7天）
INSERT INTO daily_analytics (date, visitors, readings, new_users, vip_conversions)
VALUES 
    (CURRENT_DATE - INTERVAL '6 days', 65, 23, 5, 1),
    (CURRENT_DATE - INTERVAL '5 days', 78, 31, 8, 2),
    (CURRENT_DATE - INTERVAL '4 days', 92, 42, 6, 1),
    (CURRENT_DATE - INTERVAL '3 days', 88, 38, 7, 0),
    (CURRENT_DATE - INTERVAL '2 days', 110, 45, 9, 2),
    (CURRENT_DATE - INTERVAL '1 day', 128, 52, 11, 3),
    (CURRENT_DATE, 45, 18, 4, 1)
ON CONFLICT (date) DO NOTHING;

-- 插入占卜記錄範例
INSERT INTO reading_logs (spread_type, question_category, created_at)
VALUES 
    ('single', 'love', NOW() - INTERVAL '1 day'),
    ('single', 'career', NOW() - INTERVAL '1 day'),
    ('three-card', 'love', NOW() - INTERVAL '2 days'),
    ('three-card', 'general', NOW() - INTERVAL '2 days'),
    ('celtic-cross', 'self', NOW() - INTERVAL '3 days'),
    ('single', 'money', NOW() - INTERVAL '3 days'),
    ('love', 'love', NOW() - INTERVAL '4 days'),
    ('career', 'career', NOW() - INTERVAL '5 days'),
    ('three-card', 'family', NOW() - INTERVAL '5 days'),
    ('single', 'general', NOW());
