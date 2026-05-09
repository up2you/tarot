-- =============================================
-- Step 1: 先備份詩詞表資料（執行後複製結果貼到本地）
-- =============================================

-- 確認詩詞表的行數（先確認沒有重要資料）
SELECT 'poem_qa_knowledge' AS table_name, COUNT(*) AS rows FROM poem_qa_knowledge
UNION ALL
SELECT 'poems_library', COUNT(*) FROM poems_library
UNION ALL
SELECT 'poem_question_categories', COUNT(*) FROM poem_question_categories
UNION ALL
SELECT 'poems_library_backup_20251223', COUNT(*) FROM poems_library_backup_20251223;

-- =============================================
-- Step 2: 確認這些表在塔羅 app 中沒有外鍵依賴
-- =============================================
SELECT 
    tc.table_name, 
    kcu.column_name,
    ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND (ccu.table_name IN ('poem_qa_knowledge', 'poems_library', 'poem_question_categories', 'poems_library_backup_20251223')
     OR tc.table_name IN ('poem_qa_knowledge', 'poems_library', 'poem_question_categories', 'poems_library_backup_20251223'));
