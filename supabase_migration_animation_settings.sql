-- ============================================================
-- Migration: 新增動畫演出風格設定欄位
-- 在 app_settings 資料表中加入洗牌/發牌/翻牌動畫風格與跟手傾斜開關
-- 執行方式：在 Supabase SQL Editor 中執行
-- ============================================================

-- 洗牌動畫風格：'classic'（經典抖動）| 'ritual'（儀式三幕）
ALTER TABLE app_settings
  ADD COLUMN IF NOT EXISTS shuffle_animation TEXT NOT NULL DEFAULT 'classic';

-- 發牌動畫風格：'fade'（原地浮現）| 'arc'（弧線飛行）
ALTER TABLE app_settings
  ADD COLUMN IF NOT EXISTS deal_animation TEXT NOT NULL DEFAULT 'fade';

-- 翻牌動畫風格：'standard'（標準翻轉）| 'physical'（物理回彈+漣漪）
ALTER TABLE app_settings
  ADD COLUMN IF NOT EXISTS flip_animation TEXT NOT NULL DEFAULT 'standard';

-- 跟手 3D 傾斜開關
ALTER TABLE app_settings
  ADD COLUMN IF NOT EXISTS card_tilt BOOLEAN NOT NULL DEFAULT FALSE;

-- 更新既有記錄為新預設值（若該列已存在）
UPDATE app_settings
SET
  shuffle_animation = COALESCE(shuffle_animation, 'classic'),
  deal_animation    = COALESCE(deal_animation, 'fade'),
  flip_animation    = COALESCE(flip_animation, 'standard'),
  card_tilt         = COALESCE(card_tilt, FALSE),
  updated_at        = NOW()
WHERE id = 'global';

-- 驗證
SELECT id, shuffle_animation, deal_animation, flip_animation, card_tilt
FROM app_settings
WHERE id = 'global';
