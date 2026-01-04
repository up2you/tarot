-- 檢查神諭資料庫的 scenario_key 和 position_key 格式
-- 請在 Supabase SQL Editor 執行

-- 1. 查看有哪些 scenario_key
SELECT DISTINCT scenario_key FROM oracle_interpretations LIMIT 20;

-- 2. 查看有哪些 position_key
SELECT DISTINCT position_key FROM oracle_interpretations LIMIT 20;

-- 3. 範例：查詢皇帝正位在 money 場景的解釋
SELECT card_id, card_name, orientation, scenario_key, position_key, 
       LEFT(interpretation, 100) as interpretation_preview
FROM oracle_interpretations
WHERE card_id = 4  -- 皇帝
AND orientation = 'upright'
LIMIT 5;
