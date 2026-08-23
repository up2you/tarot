-- ============================================================
-- Migration: 更新 eastern_interpretations unique 約束
-- 舊約束 (card_id, orientation, language) 不支援情境化資料
-- 新約束 (card_id, orientation, scenario_key, position_key, language)
-- 同時清除舊的泛用資料（scenario_key 為 NULL，將被情境化資料取代）
-- ============================================================

-- 1. 清除舊泛用資料（scenario_key 為 NULL 的 44 筆）
DELETE FROM eastern_interpretations WHERE scenario_key IS NULL;

-- 2. 移除舊 unique 約束
ALTER TABLE eastern_interpretations DROP CONSTRAINT IF EXISTS eastern_interpretations_card_id_orientation_language_key;

-- 3. 建立新 unique 約束（支援情境化）
ALTER TABLE eastern_interpretations
  ADD CONSTRAINT eastern_interpretations_card_ori_scen_pos_lang_key
  UNIQUE (card_id, orientation, scenario_key, position_key, language);

-- 驗證
SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint
WHERE conrelid = 'eastern_interpretations'::regclass;
