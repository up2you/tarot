-- 🔍 驗證 Relation Oracle 資料完整性

-- 1. 檢查每個 scenario 的總筆數 (應該都是 440)
SELECT scenario_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 2. 檢查每個 scenario 的牌卡分布 (應該每張牌都有正位和逆位)
SELECT 
    scenario_key,
    COUNT(DISTINCT card_id) as unique_cards,
    COUNT(DISTINCT CASE WHEN orientation = 'upright' THEN card_id END) as upright_cards,
    COUNT(DISTINCT CASE WHEN orientation = 'reversed' THEN card_id END) as reversed_cards
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key
ORDER BY scenario_key;
-- 預期: unique_cards=22, upright_cards=22, reversed_cards=22

-- 3. 檢查每個 scenario 的位置分布 (應該有 10 個位置)
SELECT 
    scenario_key,
    COUNT(DISTINCT position_key) as unique_positions
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key
ORDER BY scenario_key;
-- 預期: unique_positions=10

-- 4. 詳細檢查每個 scenario 的完整性
-- (22 張牌 × 2 方向 × 10 位置 = 440)
SELECT 
    scenario_key,
    card_id,
    orientation,
    COUNT(DISTINCT position_key) as position_count
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key, card_id, orientation
HAVING COUNT(DISTINCT position_key) != 10
ORDER BY scenario_key, card_id, orientation;
-- 如果回傳資料，表示有某些組合的位置不完整

-- 5. 檢查是否有任何一個位置缺失
SELECT 
    scenario_key,
    position_key,
    COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'relation_%'
GROUP BY scenario_key, position_key
ORDER BY scenario_key, position_key;
-- 預期: 每個 scenario 的每個 position 都應該有 44 筆 (22張牌 × 2方向)
