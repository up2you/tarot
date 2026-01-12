-- ========================================
-- 步驟 1: 清理現有的不完整資料
-- ========================================

-- 檢查當前資料數量
SELECT scenario_key, COUNT(*) as current_count
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 預期看到：每個 scenario 440 筆（不完整）
-- 正確應該是：每個 scenario 484 筆（22牌 × 2方向 × 11位置）

-- ⚠️ 執行刪除（請確認後再執行）
-- DELETE FROM oracle_interpretations WHERE scenario_key LIKE 'relation_%';

-- 驗證已清空
-- SELECT COUNT(*) as remaining_count 
-- FROM oracle_interpretations 
-- WHERE scenario_key LIKE 'relation_%';
-- 應該返回 0
