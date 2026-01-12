-- 🗑️ 清理現有的關係 Oracle 資料
-- 執行此腳本以刪除所有 relation_* scenarios 的資料

-- 先檢查目前有多少筆資料
SELECT scenario_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 如果確認要刪除，請取消下面這行的註解並執行
-- DELETE FROM oracle_interpretations WHERE scenario_key LIKE 'relation_%';

-- 刪除後驗證 (應該回傳 0 筆)
-- SELECT COUNT(*) FROM oracle_interpretations WHERE scenario_key LIKE 'relation_%';
