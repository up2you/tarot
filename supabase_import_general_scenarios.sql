-- =====================================================
-- 匯入 General Scenarios 神諭資料 (6,600 筆)
-- 執行於 Supabase SQL Editor
-- =====================================================

-- Step 1: 先備份並檢查現有資料
SELECT 
    'Before Import' as status,
    COUNT(*) as total_records,
    COUNT(DISTINCT scenario_key) as scenarios
FROM oracle_interpretations
WHERE scenario_key LIKE 'general_%';

-- Step 2: 刪除舊的 general scenarios 資料 (如果有的話)
DELETE FROM oracle_interpretations 
WHERE scenario_key LIKE 'general_%';

-- Step 3: 確認刪除成功
SELECT 
    'After Delete' as status,
    COUNT(*) as remaining_general_records
FROM oracle_interpretations
WHERE scenario_key LIKE 'general_%';

-- =====================================================
-- Step 4: 開始匯入新資料
-- 請在下方貼上 all_general_scenarios.sql 的內容
-- 或分批執行各個 general_*.sql 檔案
-- =====================================================

