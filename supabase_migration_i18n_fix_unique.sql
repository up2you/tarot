-- ============================================================
-- Phase 4b: Fix unique constraints for multi-language support
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Update oracle_interpretations unique index to include language
--    Drop old index first, then create new one
DROP INDEX IF EXISTS idx_oracle_interp_unique;
CREATE UNIQUE INDEX idx_oracle_interp_unique 
ON oracle_interpretations(card_id, orientation, scenario_key, position_key, language);

-- 2. Update oracle_summaries: pattern_key UNIQUE → (pattern_key, language) UNIQUE
--    Drop old constraint, then add new one
ALTER TABLE oracle_summaries DROP CONSTRAINT IF EXISTS oracle_summaries_pattern_key_key;
ALTER TABLE oracle_summaries ADD CONSTRAINT oracle_summaries_pattern_lang_key 
UNIQUE (pattern_key, language);

-- 3. Verify
SELECT 
  indexname, 
  indexdef 
FROM pg_indexes 
WHERE tablename IN ('oracle_interpretations', 'oracle_summaries')
  AND indexname IN ('idx_oracle_interp_unique', 'oracle_summaries_pattern_lang_key');
