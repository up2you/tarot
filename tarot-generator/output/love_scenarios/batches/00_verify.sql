-- ========================================
-- Love Scenarios 資料完整性驗證
-- ========================================

-- 1. 檢查每個 scenario 的總筆數
SELECT scenario_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 預期：每個 scenario 484 筆
-- love_affair      | 484
-- love_breakup     | 484
-- love_cheating    | 484
-- love_conflict    | 484
-- love_crush       | 484
-- love_dating      | 484
-- love_feelings    | 484
-- love_marriage    | 484
-- love_pursuit     | 484
-- love_reunion     | 484
-- love_single      | 484


-- 2. 檢查每個 scenario 的牌卡分布
SELECT 
    scenario_key,
    COUNT(DISTINCT card_id) as unique_cards,
    COUNT(DISTINCT CASE WHEN orientation = 'upright' THEN card_id END) as upright_cards,
    COUNT(DISTINCT CASE WHEN orientation = 'reversed' THEN card_id END) as reversed_cards
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 預期：每個 scenario 有 22 張不同的牌，正位和逆位各 22 張


-- 3. 檢查 position_key 分布
SELECT DISTINCT position_key
FROM oracle_interpretations
WHERE scenario_key = 'love_single'
ORDER BY position_key;

-- 預期：應該有 11 個 positions
-- advice, environment, future, hope_fear, obstacle, other, outcome, past, present, relation, self


-- 4. 【關鍵】檢查 relation position 資料
SELECT scenario_key, position_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%' AND position_key = 'relation'
GROUP BY scenario_key, position_key
ORDER BY scenario_key;

-- 預期：每個 scenario 有 44 筆 relation position 資料（22張牌 × 2方向）


-- 5. 驗證每個 scenario 的完整性（484 = 22 cards × 2 orientations × 11 positions）
SELECT 
    scenario_key,
    COUNT(*) as total_records,
    COUNT(DISTINCT card_id) * 2 * 11 as expected_records,
    CASE 
        WHEN COUNT(*) = COUNT(DISTINCT card_id) * 2 * 11 THEN '✅ 完整'
        ELSE '❌ 不完整'
    END as status
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%'
GROUP BY scenario_key
ORDER BY scenario_key;


-- 6. 檢查總筆數
SELECT COUNT(*) as total_love_records
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%';

-- 預期：5,324 筆（11 scenarios × 484）
