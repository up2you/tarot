-- =====================================================
-- 步驟 1: 先檢查 user_profiles 表是否存在及其結構
-- =====================================================

-- 檢查表是否存在
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'user_profiles'
) AS table_exists;

-- 如果存在，顯示欄位
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_profiles'
ORDER BY ordinal_position;
