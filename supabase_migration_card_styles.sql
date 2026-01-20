-- ============================================
-- 牌面風格商店 - Supabase 資料表
-- 32 種風格，一次購買永久擁有
-- ============================================

-- 1. 牌面風格定義表 (card_styles)
CREATE TABLE IF NOT EXISTS card_styles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- 風格資訊
    style_key VARCHAR(50) NOT NULL UNIQUE,  -- 'celestial', 'cyberpunk', 'baroque', etc.
    name_zh VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    description_zh TEXT,
    description_en TEXT,
    
    -- 預覽圖片
    preview_image_url TEXT,  -- 主預覽圖
    sample_cards_urls TEXT[],  -- 樣本牌卡圖片陣列
    
    -- 風格設定
    primary_color VARCHAR(20) DEFAULT '#d4af37',  -- 主題色
    
    -- 定價
    price DECIMAL(10, 2) NOT NULL DEFAULT 99,
    original_price DECIMAL(10, 2),  -- 原價（用於折扣顯示）
    currency VARCHAR(10) DEFAULT 'TWD',
    
    -- 狀態
    is_free BOOLEAN DEFAULT false,  -- 是否為免費（預設風格）
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,  -- 推薦風格
    is_new BOOLEAN DEFAULT false,  -- 新品標籤
    
    -- 上傳進度
    cards_uploaded INTEGER DEFAULT 0,  -- 已上傳的牌數（0-23）
    is_complete BOOLEAN DEFAULT false,  -- 是否已完整上傳（23張）
    
    -- 分類
    category VARCHAR(50),  -- 'classic', 'modern', 'fantasy', 'artistic', etc.
    tags TEXT[],  -- 標籤
    
    -- 排序
    sort_order INTEGER DEFAULT 0,
    
    -- 統計
    purchase_count INTEGER DEFAULT 0,
    
    -- 時間戳
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_card_styles_active ON card_styles(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_card_styles_category ON card_styles(category);
CREATE INDEX IF NOT EXISTS idx_card_styles_featured ON card_styles(is_featured);

-- RLS 政策
ALTER TABLE card_styles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Card styles are readable by everyone" ON card_styles
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage card styles" ON card_styles
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 2. 用戶購買的風格記錄 (user_card_styles)
CREATE TABLE IF NOT EXISTS user_card_styles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    style_id UUID NOT NULL REFERENCES card_styles(id) ON DELETE CASCADE,
    
    -- 購買資訊
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    payment_id UUID,  -- 關聯的付款記錄
    price_paid DECIMAL(10, 2),  -- 購買時支付的價格
    
    -- 確保每個用戶只購買一次每個風格
    UNIQUE(user_id, style_id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_user_styles_user ON user_card_styles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_styles_style ON user_card_styles(style_id);

-- RLS 政策
ALTER TABLE user_card_styles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchased styles" ON user_card_styles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage user styles" ON user_card_styles
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 3. 風格購買記錄表 (style_purchases)
CREATE TABLE IF NOT EXISTS style_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    style_id UUID NOT NULL REFERENCES card_styles(id) ON DELETE CASCADE,
    
    -- 交易資訊
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'TWD',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    
    -- 金流資訊
    payment_provider VARCHAR(50),
    provider_transaction_id VARCHAR(255),
    
    -- 時間戳
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_style_purchases_user ON style_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_style_purchases_status ON style_purchases(status);

-- RLS 政策
ALTER TABLE style_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own style purchases" ON style_purchases
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================

-- 4. RPC 函數：購買風格
CREATE OR REPLACE FUNCTION purchase_card_style(
    p_user_id UUID,
    p_style_id UUID,
    p_amount DECIMAL,
    p_transaction_id VARCHAR DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
    v_already_owned BOOLEAN;
BEGIN
    -- 檢查是否已擁有
    SELECT EXISTS(
        SELECT 1 FROM user_card_styles 
        WHERE user_id = p_user_id AND style_id = p_style_id
    ) INTO v_already_owned;
    
    IF v_already_owned THEN
        RETURN FALSE;  -- 已經擁有
    END IF;
    
    -- 新增購買記錄
    INSERT INTO user_card_styles (user_id, style_id, price_paid)
    VALUES (p_user_id, p_style_id, p_amount);
    
    -- 更新購買次數
    UPDATE card_styles SET 
        purchase_count = purchase_count + 1,
        updated_at = NOW()
    WHERE id = p_style_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RPC 函數：取得用戶擁有的風格
CREATE OR REPLACE FUNCTION get_user_owned_styles(
    p_user_id UUID
) RETURNS TABLE (
    style_id UUID,
    style_key VARCHAR,
    name_zh VARCHAR,
    name_en VARCHAR,
    purchased_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cs.id,
        cs.style_key,
        cs.name_zh,
        cs.name_en,
        ucs.purchased_at
    FROM user_card_styles ucs
    JOIN card_styles cs ON cs.id = ucs.style_id
    WHERE ucs.user_id = p_user_id
    ORDER BY ucs.purchased_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. RPC 函數：檢查用戶是否擁有特定風格
CREATE OR REPLACE FUNCTION user_owns_style(
    p_user_id UUID,
    p_style_key VARCHAR
) RETURNS BOOLEAN AS $$
DECLARE
    v_style_id UUID;
BEGIN
    -- 取得風格 ID
    SELECT id INTO v_style_id FROM card_styles WHERE style_key = p_style_key;
    
    IF v_style_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- 檢查是否為免費風格
    IF EXISTS(SELECT 1 FROM card_styles WHERE id = v_style_id AND is_free = true) THEN
        RETURN TRUE;
    END IF;
    
    -- 檢查是否已購買
    RETURN EXISTS(
        SELECT 1 FROM user_card_styles 
        WHERE user_id = p_user_id AND style_id = v_style_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================

-- 7. 插入預設風格（32 種）
INSERT INTO card_styles (style_key, name_zh, name_en, category, price, primary_color, is_free, is_complete, cards_uploaded, is_featured, sort_order) VALUES
    -- 免費風格（1 種已完成，2 種待上傳）
    ('classic', '經典萊德', 'Classic Rider-Waite', 'classic', 0, '#d4af37', true, true, 23, false, 1),
    ('minimalist', '極簡風格', 'Minimalist', 'modern', 0, '#2c2c2c', true, false, 0, false, 2),
    ('watercolor', '水彩柔美', 'Watercolor', 'artistic', 0, '#7eb8da', true, false, 0, false, 3),
    
    -- 經典類（5 種）
    ('vintage', '復古典藏', 'Vintage Collection', 'classic', 99, '#8b7355', false, false, 10),
    ('golden', '金箔奢華', 'Golden Luxe', 'classic', 149, '#daa520', false, true, 11),
    ('medieval', '中世紀古風', 'Medieval', 'classic', 99, '#654321', false, false, 12),
    ('renaissance', '文藝復興', 'Renaissance', 'classic', 129, '#c9a227', false, false, 13),
    ('baroque', '巴洛克華麗', 'Baroque', 'classic', 149, '#d4af37', false, false, 14),
    
    -- 現代類（6 種）
    ('neon', '霓虹都市', 'Neon City', 'modern', 99, '#ff00ff', false, false, 20),
    ('cyberpunk', '賽博龐克', 'Cyberpunk', 'modern', 129, '#00fff9', false, true, 21),
    ('geometric', '幾何抽象', 'Geometric', 'modern', 79, '#4a90e2', false, false, 22),
    ('glitch', '故障藝術', 'Glitch Art', 'modern', 99, '#ff0080', false, true, 23),
    ('vaporwave', '蒸汽波', 'Vaporwave', 'modern', 99, '#ff71ce', false, false, 24),
    ('synthwave', '合成波', 'Synthwave', 'modern', 99, '#f97306', false, false, 25),
    
    -- 奇幻類（6 種）
    ('celestial', '星空神秘', 'Celestial', 'fantasy', 129, '#8b5cf6', false, true, 30),
    ('fairy', '精靈仙境', 'Fairy Realm', 'fantasy', 99, '#ffc0cb', false, false, 31),
    ('dragon', '龍族傳說', 'Dragon Legend', 'fantasy', 149, '#dc143c', false, false, 32),
    ('witch', '魔女月光', 'Witch Moon', 'fantasy', 99, '#9370db', false, true, 33),
    ('crystal', '水晶魔法', 'Crystal Magic', 'fantasy', 109, '#e0ffff', false, false, 34),
    ('gothic', '哥德暗黑', 'Gothic Dark', 'fantasy', 129, '#2f0000', false, false, 35),
    
    -- 文化類（6 種）
    ('japanese', '和風浮世繪', 'Japanese Ukiyo-e', 'cultural', 149, '#c41e3a', false, true, 40),
    ('chinese', '東方水墨', 'Chinese Ink', 'cultural', 149, '#000000', false, false, 41),
    ('egyptian', '埃及神秘', 'Egyptian Mystery', 'cultural', 129, '#d4a574', false, false, 42),
    ('celtic', '凱爾特結', 'Celtic Knot', 'cultural', 99, '#228b22', false, false, 43),
    ('indian', '印度曼陀羅', 'Indian Mandala', 'cultural', 129, '#ff9933', false, false, 44),
    ('nordic', '北歐符文', 'Nordic Rune', 'cultural', 129, '#4682b4', false, false, 45),
    
    -- 藝術類（6 種）
    ('oil_painting', '油畫質感', 'Oil Painting', 'artistic', 149, '#8b4513', false, false, 50),
    ('stained_glass', '彩繪玻璃', 'Stained Glass', 'artistic', 129, '#1e90ff', false, true, 51),
    ('art_nouveau', '新藝術風', 'Art Nouveau', 'artistic', 149, '#6b8e23', false, false, 52),
    ('impressionist', '印象派', 'Impressionist', 'artistic', 129, '#87ceeb', false, false, 53),
    ('line_art', '線條藝術', 'Line Art', 'artistic', 79, '#000000', false, false, 54),
    ('pop_art', '普普藝術', 'Pop Art', 'artistic', 99, '#ff1493', false, false, 55)
ON CONFLICT (style_key) DO NOTHING;
