-- ============================================================
-- Migration: 東方智慧詮釋資料表
-- 為雙透鏡解讀的「東方智慧視角」提供預存詮釋（混合模式資料庫部分）
-- 每張大阿爾卡納 × 正逆位 × 語言，獨立詮釋（不依賴 scenario/position）
-- ============================================================

-- 東方智慧詮釋表
CREATE TABLE IF NOT EXISTS eastern_interpretations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id INTEGER NOT NULL,
    card_name VARCHAR(50) NOT NULL,
    orientation VARCHAR(10) NOT NULL CHECK (orientation IN ('upright', 'reversed')),
    interpretation TEXT NOT NULL,
    language VARCHAR(10) NOT NULL DEFAULT 'zh-TW',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (card_id, orientation, language)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_eastern_card ON eastern_interpretations(card_id, orientation);

-- RLS 安全性
ALTER TABLE eastern_interpretations ENABLE ROW LEVEL SECURITY;

-- 所有人可讀（前台使用）
CREATE POLICY "Eastern interpretations are readable by everyone"
    ON eastern_interpretations FOR SELECT
    USING (true);

-- 僅管理員可寫入
CREATE POLICY "Admins can manage eastern interpretations"
    ON eastern_interpretations FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_profiles.email = auth.jwt() ->> 'email'
              AND user_profiles.is_vip = true
        )
    );

-- 驗證
SELECT card_id, card_name, orientation, language FROM eastern_interpretations LIMIT 5;
