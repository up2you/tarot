-- ============================================================
-- Migration: 擴充 eastern_interpretations 表（情境化東方詮釋）
-- 加入 scenario_key / position_key，對齊西方神諭資料庫維度
-- 讓東方詮釋可依「牌 × 情境 × 位置 × 正逆位」查詢
-- ============================================================

-- 新增情境欄位
ALTER TABLE eastern_interpretations
  ADD COLUMN IF NOT EXISTS scenario_key VARCHAR(50);

-- 新增位置欄位
ALTER TABLE eastern_interpretations
  ADD COLUMN IF NOT EXISTS position_key VARCHAR(20);

-- 索引（加速情境化查詢）
CREATE INDEX IF NOT EXISTS idx_eastern_scenario ON eastern_interpretations(scenario_key);
CREATE INDEX IF NOT EXISTS idx_eastern_position ON eastern_interpretations(position_key);
CREATE INDEX IF NOT EXISTS idx_eastern_card_ori_scen_pos
  ON eastern_interpretations(card_id, orientation, scenario_key, position_key);

-- 驗證
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'eastern_interpretations' ORDER BY ordinal_position;
