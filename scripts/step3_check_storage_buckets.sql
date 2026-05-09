-- =============================================
-- Step 3: 查詢 Storage Bucket 使用狀況
-- 在 Supabase SQL Editor 中執行
-- =============================================

-- 列出所有 Storage Bucket
SELECT id, name, public, created_at
FROM storage.buckets
ORDER BY created_at;

-- 各 Bucket 的文件數量與總大小
SELECT 
    bucket_id,
    COUNT(*) AS file_count,
    pg_size_pretty(SUM((metadata->>'size')::bigint)) AS total_size,
    SUM((metadata->>'size')::bigint) AS total_bytes
FROM storage.objects
WHERE metadata->>'size' IS NOT NULL
GROUP BY bucket_id
ORDER BY total_bytes DESC;

-- 列出最大的 20 個文件
SELECT 
    bucket_id,
    name,
    pg_size_pretty((metadata->>'size')::bigint) AS size,
    created_at
FROM storage.objects
WHERE metadata->>'size' IS NOT NULL
ORDER BY (metadata->>'size')::bigint DESC
LIMIT 20;

-- 列出各種文件類型的統計
SELECT 
    bucket_id,
    metadata->>'mimetype' AS mime_type,
    COUNT(*) AS count,
    pg_size_pretty(SUM((metadata->>'size')::bigint)) AS total_size
FROM storage.objects
WHERE metadata->>'size' IS NOT NULL
GROUP BY bucket_id, metadata->>'mimetype'
ORDER BY SUM((metadata->>'size')::bigint) DESC;
