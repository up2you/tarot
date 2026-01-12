-- 為 love_* scenarios 添加 relation position 資料
-- 策略：將 present position 的解讀複製到 relation position

-- 檢查當前 love scenarios 有哪些 position_key
SELECT DISTINCT scenario_key, position_key 
FROM oracle_interpretations 
WHERE scenario_key LIKE 'love_%'
ORDER BY scenario_key, position_key;

-- 檢查是否已有 relation position
SELECT COUNT(*) as relation_count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%' AND position_key = 'relation';

-- 如果 relation_count = 0，執行以下插入
-- 將 present position 的資料複製給 relation position
INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
SELECT 
    card_id,
    card_name,
    orientation,
    scenario_key,
    'relation' as position_key,
    interpretation
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%' 
AND position_key = 'present'
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

-- 驗證結果
SELECT scenario_key, position_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%' AND position_key IN ('present', 'relation')
GROUP BY scenario_key, position_key
ORDER BY scenario_key, position_key;
