-- =====================================================
-- 檢查神諭資料庫狀態
-- =====================================================

-- 1. 檢查 oracle_interpretations 表是否存在
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'oracle_interpretations'
) AS oracle_interpretations_exists;

-- 2. 計算神諭資料筆數
SELECT 
    COUNT(*) as total_interpretations,
    COUNT(DISTINCT card_id) as unique_cards,
    COUNT(DISTINCT scenario_key) as unique_scenarios
FROM oracle_interpretations;

-- 3. 顯示每個牌卡的解籤數量
SELECT 
    card_id, 
    card_name,
    COUNT(*) as interpretation_count
FROM oracle_interpretations
GROUP BY card_id, card_name
ORDER BY card_id
LIMIT 22;
