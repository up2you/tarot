-- ========================================
-- Money Fortune 資料導入指南
-- ========================================

-- 步驟 1: 驗證當前資料
SELECT scenario_key, COUNT(*) 
FROM oracle_interpretations 
WHERE scenario_key = 'money_fortune'
GROUP BY scenario_key;
-- 應該返回 0（新 scenario）

-- 步驟 2: 導入資料
-- 複製 money_fortune.sql 的全部內容並執行
-- 檔案位置: f:\TL\tarot-generator\output\money_scenarios\money_fortune.sql

-- 步驟 3: 驗證導入結果
SELECT COUNT(*) as total_records
FROM oracle_interpretations 
WHERE scenario_key = 'money_fortune';
-- 預期：484 筆

-- 步驟 4: 驗證資料分布
SELECT 
    orientation,
    COUNT(*) as count
FROM oracle_interpretations 
WHERE scenario_key = 'money_fortune'
GROUP BY orientation;
-- 預期：upright: 242, reversed: 242

-- 步驟 5: 驗證 position 完整性
SELECT DISTINCT position_key
FROM oracle_interpretations 
WHERE scenario_key = 'money_fortune'
ORDER BY position_key;
-- 預期：11 個 positions (advice, environment, future, hope_fear, obstacle, other, outcome, past, present, relation, self)

-- 步驟 6: 檢查用詞
SELECT interpretation
FROM oracle_interpretations 
WHERE scenario_key = 'money_fortune'
AND (interpretation LIKE '%財富%' OR interpretation LIKE '%豐盛%' OR interpretation LIKE '%財運%')
LIMIT 5;
-- 應該看到使用「財富」「豐盛」「財運」等詞彙

✅ 導入完成！
