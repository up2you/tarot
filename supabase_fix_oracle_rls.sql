-- =====================================================
-- 修復神諭資料表權限 - 允許匿名讀取
-- =====================================================

-- 1. 刪除舊的 RLS 政策
DROP POLICY IF EXISTS "Oracle interpretations are readable by everyone" ON oracle_interpretations;
DROP POLICY IF EXISTS "Admins can manage oracle interpretations" ON oracle_interpretations;
DROP POLICY IF EXISTS "Oracle relationships are readable by everyone" ON oracle_relationships;
DROP POLICY IF EXISTS "Oracle summaries are readable by everyone" ON oracle_summaries;

-- 2. 確保 RLS 已啟用
ALTER TABLE oracle_interpretations ENABLE ROW LEVEL SECURITY;

-- 3. 創建允許公開讀取的政策（包含匿名用戶）
CREATE POLICY "Allow public read access" ON oracle_interpretations
    FOR SELECT
    USING (true);

-- 4. 如果有 oracle_relationships 表，也設置公開讀取
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oracle_relationships') THEN
        ALTER TABLE oracle_relationships ENABLE ROW LEVEL SECURITY;
        EXECUTE 'DROP POLICY IF EXISTS "Allow public read access" ON oracle_relationships';
        EXECUTE 'CREATE POLICY "Allow public read access" ON oracle_relationships FOR SELECT USING (true)';
    END IF;
END $$;

-- 5. 如果有 oracle_summaries 表，也設置公開讀取
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oracle_summaries') THEN
        ALTER TABLE oracle_summaries ENABLE ROW LEVEL SECURITY;
        EXECUTE 'DROP POLICY IF EXISTS "Allow public read access" ON oracle_summaries';
        EXECUTE 'CREATE POLICY "Allow public read access" ON oracle_summaries FOR SELECT USING (true)';
    END IF;
END $$;

-- 6. 測試查詢
SELECT card_id, card_name, orientation, scenario_key, position_key, 
       LEFT(interpretation, 100) as preview
FROM oracle_interpretations
WHERE card_id = 10 
AND orientation = 'upright'
AND scenario_key = 'money_current'
AND position_key = 'past'
LIMIT 1;
