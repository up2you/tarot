-- Love Scenarios 批次導入指令
-- 請在 Supabase SQL Editor 中依序執行以下批次

-- 批次 01/11
-- 複製 love_batch_01.sql 的內容並執行

-- 批次 02/11
-- 複製 love_batch_02.sql 的內容並執行

-- 批次 03/11
-- 複製 love_batch_03.sql 的內容並執行

-- 批次 04/11
-- 複製 love_batch_04.sql 的內容並執行

-- 批次 05/11
-- 複製 love_batch_05.sql 的內容並執行

-- 批次 06/11
-- 複製 love_batch_06.sql 的內容並執行

-- 批次 07/11
-- 複製 love_batch_07.sql 的內容並執行

-- 批次 08/11
-- 複製 love_batch_08.sql 的內容並執行

-- 批次 09/11
-- 複製 love_batch_09.sql 的內容並執行

-- 批次 10/11
-- 複製 love_batch_10.sql 的內容並執行

-- 批次 11/11
-- 複製 love_batch_11.sql 的內容並執行


-- 執行完成後，驗證資料:
SELECT scenario_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 應該看到 11 個 scenarios，每個 484 條

-- 驗證 relation position:
SELECT scenario_key, position_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%' AND position_key = 'relation'
GROUP BY scenario_key, position_key
ORDER BY scenario_key;

-- 應該看到 11 個 scenarios，每個 44 條
