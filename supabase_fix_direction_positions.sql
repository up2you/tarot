-- ============================================
-- 修復 General Direction 方位指引的 Position 缺失問題
-- 問題：App 端查詢 'past', 'present', 'future'，但資料庫僅有 'single'
-- 解法：將 'single' 的解釋複製給其他三個位置
-- ============================================

-- 1. 複製給 Past (過去/起點)
INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
SELECT card_id, card_name, orientation, scenario_key, 'past', interpretation
FROM oracle_interpretations
WHERE scenario_key = 'general_direction' AND position_key = 'single'
ON CONFLICT (card_id, orientation, scenario_key, position_key) DO NOTHING;

-- 2. 複製給 Present (現在/過程)
INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
SELECT card_id, card_name, orientation, scenario_key, 'present', interpretation
FROM oracle_interpretations
WHERE scenario_key = 'general_direction' AND position_key = 'single'
ON CONFLICT (card_id, orientation, scenario_key, position_key) DO NOTHING;

-- 3. 複製給 Future (未來/方向)
INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
SELECT card_id, card_name, orientation, scenario_key, 'future', interpretation
FROM oracle_interpretations
WHERE scenario_key = 'general_direction' AND position_key = 'single'
ON CONFLICT (card_id, orientation, scenario_key, position_key) DO NOTHING;

-- 驗證
-- SELECT COUNT(*) FROM oracle_interpretations WHERE scenario_key = 'general_direction';
-- 應該從 44 筆增加到 176 筆 (44 * 4)
