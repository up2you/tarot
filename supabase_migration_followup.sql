-- ============================================
-- 追問功能 - Supabase 資料表
-- 終身 VIP 限定，每題最多 2 次追問
-- ============================================

-- 1. 占卜記錄表 (readings) - 如果尚未存在
CREATE TABLE IF NOT EXISTS readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- 占卜資訊
    spread_type VARCHAR(50) NOT NULL,  -- 牌陣類型
    category VARCHAR(50),  -- 問題分類
    question TEXT,  -- 用戶的問題
    
    -- 牌卡結果
    cards JSONB NOT NULL,  -- [{cardId, isReversed, position}]
    
    -- 解讀結果
    interpretation TEXT,  -- AI 或神諭解讀
    interpretation_type VARCHAR(20) DEFAULT 'oracle',  -- 'oracle' | 'ai'
    
    -- 追問相關
    followup_count INTEGER DEFAULT 0,  -- 已追問次數
    max_followups INTEGER DEFAULT 2,  -- 最大追問次數
    
    -- 時間戳
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_readings_user ON readings(user_id);
CREATE INDEX IF NOT EXISTS idx_readings_created ON readings(created_at DESC);

-- RLS 政策
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own readings" ON readings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings" ON readings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own readings" ON readings
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================

-- 2. 追問記錄表 (followups)
CREATE TABLE IF NOT EXISTS followups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reading_id UUID NOT NULL REFERENCES readings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- 追問內容
    question TEXT NOT NULL,  -- 追問問題
    answer TEXT,  -- AI 回答
    
    -- 順序
    sequence INTEGER NOT NULL,  -- 第幾次追問 (1 or 2)
    
    -- 狀態
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    
    -- 時間戳
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_followups_reading ON followups(reading_id);
CREATE INDEX IF NOT EXISTS idx_followups_user ON followups(user_id);

-- RLS 政策
ALTER TABLE followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own followups" ON followups
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own followups" ON followups
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own followups" ON followups
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================

-- 3. RPC 函數：檢查用戶是否可以追問
CREATE OR REPLACE FUNCTION can_followup(
    p_user_id UUID,
    p_reading_id UUID
) RETURNS TABLE (
    can_ask BOOLEAN,
    reason TEXT,
    remaining_count INTEGER
) AS $$
DECLARE
    v_user user_profiles%ROWTYPE;
    v_reading readings%ROWTYPE;
BEGIN
    -- 取得用戶資訊
    SELECT * INTO v_user FROM user_profiles WHERE user_id = p_user_id;
    
    -- 檢查是否為終身 VIP
    IF v_user.subscription_type != 'lifetime' THEN
        can_ask := FALSE;
        reason := '追問功能僅限終身 VIP 會員使用';
        remaining_count := 0;
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- 取得占卜記錄
    SELECT * INTO v_reading FROM readings WHERE id = p_reading_id AND user_id = p_user_id;
    
    IF v_reading.id IS NULL THEN
        can_ask := FALSE;
        reason := '找不到此占卜記錄';
        remaining_count := 0;
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- 檢查追問次數
    IF v_reading.followup_count >= v_reading.max_followups THEN
        can_ask := FALSE;
        reason := '已達到最大追問次數';
        remaining_count := 0;
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- 可以追問
    can_ask := TRUE;
    reason := '';
    remaining_count := v_reading.max_followups - v_reading.followup_count;
    RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RPC 函數：創建追問
CREATE OR REPLACE FUNCTION create_followup(
    p_user_id UUID,
    p_reading_id UUID,
    p_question TEXT
) RETURNS TABLE (
    success BOOLEAN,
    followup_id UUID,
    message TEXT
) AS $$
DECLARE
    v_can_ask BOOLEAN;
    v_reason TEXT;
    v_current_count INTEGER;
    v_new_followup_id UUID;
BEGIN
    -- 檢查是否可以追問
    SELECT ca.can_ask, ca.reason INTO v_can_ask, v_reason 
    FROM can_followup(p_user_id, p_reading_id) ca;
    
    IF NOT v_can_ask THEN
        success := FALSE;
        followup_id := NULL;
        message := v_reason;
        RETURN NEXT;
        RETURN;
    END IF;
    
    -- 取得當前追問次數
    SELECT followup_count INTO v_current_count FROM readings WHERE id = p_reading_id;
    
    -- 創建追問記錄
    INSERT INTO followups (reading_id, user_id, question, sequence, status)
    VALUES (p_reading_id, p_user_id, p_question, v_current_count + 1, 'pending')
    RETURNING id INTO v_new_followup_id;
    
    -- 更新占卜記錄的追問次數
    UPDATE readings 
    SET followup_count = followup_count + 1,
        updated_at = NOW()
    WHERE id = p_reading_id;
    
    success := TRUE;
    followup_id := v_new_followup_id;
    message := '追問已創建';
    RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RPC 函數：完成追問（儲存 AI 回答）
CREATE OR REPLACE FUNCTION complete_followup(
    p_followup_id UUID,
    p_answer TEXT
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE followups 
    SET answer = p_answer,
        status = 'completed',
        completed_at = NOW()
    WHERE id = p_followup_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
