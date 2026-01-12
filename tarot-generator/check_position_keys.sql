-- 檢查 relation_family 使用的 position_key
SELECT DISTINCT position_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key = 'relation_family'
GROUP BY position_key
ORDER BY position_key;

-- 這會告訴我們資料庫中實際使用什麼 position_key
