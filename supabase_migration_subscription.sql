-- ============================================
-- 訂閱/付費系統 - Supabase 資料表
-- ============================================

-- 1. 訂閱類型枚舉
-- subscription_type: 'free' | 'credits' | 'monthly' | 'yearly' | 'lifetime'

-- 2. 更新 user_profiles 表（增加訂閱欄位）
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS subscription_type VARCHAR(20) DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS credits_balance INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_readings INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS free_readings_used INTEGER DEFAULT 0;

-- 設定約束
ALTER TABLE user_profiles 
ADD CONSTRAINT check_subscription_type 
CHECK (subscription_type IN ('free', 'credits', 'monthly', 'yearly', 'lifetime'));

-- 索引
CREATE INDEX IF NOT EXISTS idx_user_subscription ON user_profiles(subscription_type);
CREATE INDEX IF NOT EXISTS idx_user_subscription_expires ON user_profiles(subscription_expires_at);

-- ============================================

-- 3. 付款記錄表 (payment_records)
CREATE TABLE IF NOT EXISTS payment_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- 付款資訊
    payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('credits', 'monthly', 'yearly', 'lifetime')),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'TWD',
    
    -- 購買內容
    credits_purchased INTEGER,  -- 購買的點數（僅 credits 類型）
    subscription_months INTEGER, -- 訂閱月數（月費=1, 年費=12, 終身=9999）
    
    -- 付款狀態
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    
    -- 金流資訊
    payment_provider VARCHAR(50),  -- 'stripe', 'newebpay', 'linepay', etc.
    provider_transaction_id VARCHAR(255),
    
    -- 時間戳
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    
    -- 備註
    notes TEXT
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_payment_user ON payment_records(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_status ON payment_records(status);
CREATE INDEX IF NOT EXISTS idx_payment_created ON payment_records(created_at);

-- RLS 政策
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments" ON payment_records
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments" ON payment_records
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 4. 點數使用記錄表 (credits_usage)
CREATE TABLE IF NOT EXISTS credits_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    credits_used INTEGER NOT NULL DEFAULT 1,
    usage_type VARCHAR(50) NOT NULL,  -- 'reading', 'followup', etc.
    reading_id UUID,  -- 關聯的占卜記錄
    
    balance_before INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_credits_user ON credits_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_credits_created ON credits_usage(created_at);

-- RLS 政策
ALTER TABLE credits_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credits usage" ON credits_usage
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================

-- 5. 價格設定表 (pricing_plans)
CREATE TABLE IF NOT EXISTS pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    plan_type VARCHAR(20) NOT NULL UNIQUE CHECK (plan_type IN ('credits_5', 'credits_10', 'credits_20', 'monthly', 'yearly', 'lifetime')),
    name_zh VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    
    -- 價格
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'TWD',
    original_price DECIMAL(10, 2),  -- 原價（用於顯示折扣）
    
    -- 內容
    credits_amount INTEGER,  -- 點數方案的點數量
    subscription_months INTEGER,  -- 訂閱方案的月數
    
    -- 狀態
    is_active BOOLEAN DEFAULT true,
    is_popular BOOLEAN DEFAULT false,  -- 推薦標籤
    
    -- 排序
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 政策
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing plans are readable by everyone" ON pricing_plans
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage pricing plans" ON pricing_plans
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 6. 插入預設價格方案
INSERT INTO pricing_plans (plan_type, name_zh, name_en, price, original_price, credits_amount, subscription_months, is_popular, sort_order) VALUES
    ('credits_5', '5 次解讀', '5 Credits', 99, NULL, 5, NULL, false, 1),
    ('credits_10', '10 次解讀', '10 Credits', 179, 198, 10, NULL, true, 2),
    ('credits_20', '20 次解讀', '20 Credits', 299, 396, 20, NULL, false, 3),
    ('monthly', '月費會員', 'Monthly VIP', 149, NULL, NULL, 1, false, 4),
    ('yearly', '年費會員', 'Yearly VIP', 999, 1788, NULL, 12, true, 5),
    ('lifetime', '終身會員', 'Lifetime VIP', 2999, NULL, NULL, 9999, false, 6)
ON CONFLICT (plan_type) DO NOTHING;

-- ============================================

-- 7. RPC 函數：購買點數
CREATE OR REPLACE FUNCTION purchase_credits(
    p_user_id UUID,
    p_credits INTEGER,
    p_payment_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
    -- 更新用戶點數
    UPDATE user_profiles 
    SET credits_balance = credits_balance + p_credits,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. RPC 函數：使用點數
CREATE OR REPLACE FUNCTION use_credits(
    p_user_id UUID,
    p_credits INTEGER DEFAULT 1,
    p_usage_type VARCHAR DEFAULT 'reading'
) RETURNS BOOLEAN AS $$
DECLARE
    v_current_balance INTEGER;
BEGIN
    -- 取得當前餘額
    SELECT credits_balance INTO v_current_balance
    FROM user_profiles WHERE user_id = p_user_id;
    
    -- 檢查餘額
    IF v_current_balance < p_credits THEN
        RETURN FALSE;
    END IF;
    
    -- 扣除點數
    UPDATE user_profiles 
    SET credits_balance = credits_balance - p_credits,
        total_readings = total_readings + 1,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- 記錄使用
    INSERT INTO credits_usage (user_id, credits_used, usage_type, balance_before, balance_after)
    VALUES (p_user_id, p_credits, p_usage_type, v_current_balance, v_current_balance - p_credits);
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. RPC 函數：啟用訂閱
CREATE OR REPLACE FUNCTION activate_subscription(
    p_user_id UUID,
    p_subscription_type VARCHAR,
    p_months INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    v_expires_at TIMESTAMPTZ;
BEGIN
    -- 計算到期日
    IF p_subscription_type = 'lifetime' THEN
        v_expires_at := '2099-12-31'::TIMESTAMPTZ;
    ELSE
        v_expires_at := NOW() + (p_months || ' months')::INTERVAL;
    END IF;
    
    -- 更新訂閱狀態
    UPDATE user_profiles 
    SET subscription_type = p_subscription_type,
        subscription_expires_at = v_expires_at,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. RPC 函數：檢查用戶權限
CREATE OR REPLACE FUNCTION check_user_access(
    p_user_id UUID
) RETURNS TABLE (
    can_use_ai BOOLEAN,
    is_vip BOOLEAN,
    credits_remaining INTEGER,
    free_readings_remaining INTEGER
) AS $$
DECLARE
    v_user user_profiles%ROWTYPE;
    v_free_limit INTEGER := 3;
BEGIN
    SELECT * INTO v_user FROM user_profiles WHERE user_id = p_user_id;
    
    -- VIP = 訂閱中（且未過期）或終身
    is_vip := v_user.subscription_type IN ('monthly', 'yearly', 'lifetime')
              AND (v_user.subscription_expires_at IS NULL OR v_user.subscription_expires_at > NOW());
    
    credits_remaining := v_user.credits_balance;
    free_readings_remaining := GREATEST(0, v_free_limit - v_user.free_readings_used);
    
    -- 可以使用 AI = VIP 或 有點數 或 有免費次數
    can_use_ai := is_vip OR credits_remaining > 0 OR free_readings_remaining > 0;
    
    RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
