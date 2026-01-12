-- ========================================
-- 步驟 2: 重新導入完整資料 - 執行順序指南
-- ========================================

-- 📋 導入批次檔案清單（按順序執行）
-- 
-- 批次 1: batch_01.sql (500 筆)
-- 批次 2: batch_02.sql (500 筆)
-- 批次 3: batch_03.sql (500 筆)
-- 批次 4: batch_04.sql (500 筆)
-- 批次 5: batch_05.sql (500 筆)
-- 批次 6: batch_06.sql (500 筆)
-- 批次 7: batch_07.sql (80 筆)
--
-- 總計: 3,080 筆 (7 scenarios × 440 records)
-- 注意：原始生成的資料確實是 440/scenario，不是 484
-- 因為生成器雖定義了 'relation' position，但實際只生成了 10 個標準 positions

-- ========================================
-- 步驟 3: 驗證導入完成
-- ========================================

-- 3.1 檢查總筆數
SELECT scenario_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 預期結果：每個 scenario 440 筆
-- relation_client     | 440
-- relation_colleague  | 440
-- relation_elder      | 440
-- relation_family     | 440
-- relation_friend     | 440
-- relation_neighbor   | 440
-- relation_rival      | 440

-- 3.2 檢查 position_key 分布
SELECT DISTINCT position_key
FROM oracle_interpretations
WHERE scenario_key = 'relation_family'
ORDER BY position_key;

-- 預期結果：應該有 10 個 positions
-- advice, environment, future, obstacle, other, outcome, past, present, relation, self

-- 3.3 檢查 relation position 是否存在
SELECT COUNT(*) as relation_count
FROM oracle_interpretations
WHERE scenario_key = 'relation_family'
AND position_key = 'relation';

-- 預期結果：44 筆 (22張牌 × 2方向)

-- ========================================
-- 如果 relation position 仍然缺失...
-- ========================================

-- 需要重新生成資料，因為批次檔案可能就沒有包含 'relation' position
-- 讓我檢查 batch_01.sql 的內容...
