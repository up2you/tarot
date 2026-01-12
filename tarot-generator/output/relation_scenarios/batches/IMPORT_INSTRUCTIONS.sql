-- 批次導入指令
-- 請在 Supabase SQL Editor 中依序執行以下批次

-- 批次 01/7
-- 複製 batch_01.sql 的內容並執行

-- 批次 02/7
-- 複製 batch_02.sql 的內容並執行

-- 批次 03/7
-- 複製 batch_03.sql 的內容並執行

-- 批次 04/7
-- 複製 batch_04.sql 的內容並執行

-- 批次 05/7
-- 複製 batch_05.sql 的內容並執行

-- 批次 06/7
-- 複製 batch_06.sql 的內容並執行

-- 批次 07/7
-- 複製 batch_07.sql 的內容並執行


-- 執行完成後，驗證資料:
SELECT scenario_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 應該看到 7 個 scenarios，每個 440 條
