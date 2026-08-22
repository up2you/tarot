-- ============================================================
-- Phase 4: Oracle Multi-Language Migration
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add language column to oracle_interpretations
ALTER TABLE oracle_interpretations 
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'zh-TW';

-- 2. Add language column to oracle_summaries
ALTER TABLE oracle_summaries 
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'zh-TW';

-- 3. Add language column to oracle_relationships
ALTER TABLE oracle_relationships 
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'zh-TW';

-- 4. Create index for language lookups (performance)
CREATE INDEX IF NOT EXISTS idx_oracle_interpretations_language 
  ON oracle_interpretations(language);

CREATE INDEX IF NOT EXISTS idx_oracle_summaries_language 
  ON oracle_summaries(language);

-- 5. Verify
SELECT 'oracle_interpretations' AS table_name, 
       count(*) AS total_rows,
       count(DISTINCT language) AS languages
FROM oracle_interpretations
UNION ALL
SELECT 'oracle_summaries', count(*), count(DISTINCT language)
FROM oracle_summaries
UNION ALL
SELECT 'oracle_relationships', count(*), count(DISTINCT language)
FROM oracle_relationships;
