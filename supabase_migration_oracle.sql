-- ============================================
-- 神諭資料庫 - Supabase 資料表
-- ============================================

-- 1. 單牌解釋表 (oracle_interpretations)
CREATE TABLE IF NOT EXISTS oracle_interpretations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id INTEGER NOT NULL,
    card_name VARCHAR(50) NOT NULL,
    orientation VARCHAR(10) NOT NULL CHECK (orientation IN ('upright', 'reversed')),
    scenario_key VARCHAR(50) NOT NULL,
    position_key VARCHAR(20) NOT NULL,
    interpretation TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_oracle_interp_card ON oracle_interpretations(card_id, orientation);
CREATE INDEX IF NOT EXISTS idx_oracle_interp_scenario ON oracle_interpretations(scenario_key);
CREATE INDEX IF NOT EXISTS idx_oracle_interp_position ON oracle_interpretations(position_key);

-- 唯一約束（避免重複）
CREATE UNIQUE INDEX IF NOT EXISTS idx_oracle_interp_unique 
ON oracle_interpretations(card_id, orientation, scenario_key, position_key);

-- RLS 政策
ALTER TABLE oracle_interpretations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Oracle interpretations are readable by everyone" ON oracle_interpretations
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage oracle interpretations" ON oracle_interpretations
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 2. 雙牌關係表 (oracle_relationships)
CREATE TABLE IF NOT EXISTS oracle_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_a_id INTEGER NOT NULL,
    card_b_id INTEGER NOT NULL,
    relationship_type VARCHAR(50),
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_oracle_rel_cards ON oracle_relationships(card_a_id, card_b_id);

-- RLS 政策
ALTER TABLE oracle_relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Oracle relationships are readable by everyone" ON oracle_relationships
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage oracle relationships" ON oracle_relationships
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 3. 總結模板表 (oracle_summaries)
CREATE TABLE IF NOT EXISTS oracle_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_key VARCHAR(50) NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 政策
ALTER TABLE oracle_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Oracle summaries are readable by everyone" ON oracle_summaries
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage oracle summaries" ON oracle_summaries
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 4. 插入總結模板範例
INSERT INTO oracle_summaries (pattern_key, summary) VALUES
    ('all_upright', '所有牌都是正位，這是非常順利的能量流動。宇宙正在支持你的方向，繼續保持正向的態度和行動。'),
    ('all_reversed', '多張逆位牌提醒你需要內省和調整。這不是失敗的預兆，而是宇宙在提醒你停下來重新評估。'),
    ('one_reversed', '大部分能量是順暢的，但有一個小小的阻礙需要注意。不要過度擔心，只需要稍微調整。'),
    ('one_upright', '目前面臨較多挑戰，但那張正位牌是你的希望之光。專注於它帶來的訊息，那是突破的關鍵。'),
    ('mixed', '正逆位混合的牌陣反映了生活的複雜性。順勢而為，接受光明與陰影的並存，才是智慧之道。')
ON CONFLICT (pattern_key) DO NOTHING;
