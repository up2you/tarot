-- ========================================
-- 步驟 1: 清理現有 love_* 資料
-- ========================================

-- 檢查當前資料數量
SELECT scenario_key, COUNT(*) as current_count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- ⚠️ 執行刪除（請確認後再執行）
-- DELETE FROM oracle_interpretations WHERE scenario_key LIKE 'love_%';

-- 驗證已清空
-- SELECT COUNT(*) as remaining_count 
-- FROM oracle_interpretations 
-- WHERE scenario_key LIKE 'love_%';
-- 應該返回 0
