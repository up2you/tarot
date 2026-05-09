-- =============================================
-- Step 2: 刪除詩詞系統殘留資料表
-- 在確認 Step 1 查詢結果後執行此腳本
-- 預計釋放：~26 MB
-- =============================================

-- 刪除備份表（明確是舊備份）
DROP TABLE IF EXISTS poems_library_backup_20251223;

-- 刪除詩詞相關表（按依賴順序）
DROP TABLE IF EXISTS poem_qa_knowledge;
DROP TABLE IF EXISTS poem_question_categories;
DROP TABLE IF EXISTS poems_library;

-- 驗證刪除結果
SELECT tablename, pg_size_pretty(pg_total_relation_size('public.'||tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size('public.'||tablename) DESC;

-- 確認資料庫總大小
SELECT pg_size_pretty(pg_database_size(current_database())) AS new_total_db_size;
