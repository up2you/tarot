-- =====================================================
-- Supabase 儲存空間分析腳本
-- 在 Supabase SQL Editor 中執行這些查詢
-- =====================================================

-- 1. 查詢所有 public 表格的大小
SELECT 
  schemaname AS schema,
  tablename AS table_name,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
  pg_size_pretty(pg_indexes_size(schemaname||'.'||tablename)) AS indexes_size,
  pg_total_relation_size(schemaname||'.'||tablename) AS total_bytes
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY total_bytes DESC;

-- 2. 查詢各表格的行數
SELECT
  relname AS table_name,
  n_live_tup AS live_rows,
  n_dead_tup AS dead_rows,
  pg_size_pretty(pg_total_relation_size('public.'||relname)) AS total_size
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;

-- 3. 查詢資料庫總大小
SELECT pg_size_pretty(pg_database_size(current_database())) AS database_size;

-- 4. 查詢 oracle_interpretations 表的各 scenario 資料量
SELECT 
  scenario,
  COUNT(*) as row_count
FROM oracle_interpretations
GROUP BY scenario
ORDER BY row_count DESC;

-- 5. 查詢 oracle_summaries 表的各 scenario 資料量（如果存在）
SELECT 
  scenario,
  COUNT(*) as row_count
FROM oracle_summaries
GROUP BY scenario
ORDER BY row_count DESC;

-- 6. 查詢 Storage Bucket 使用量（需要管理員權限）
SELECT 
  bucket_id,
  name,
  metadata->>'size' as file_size,
  created_at
FROM storage.objects
ORDER BY (metadata->>'size')::bigint DESC
LIMIT 50;

-- 7. Storage Buckets 總覽
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets;
