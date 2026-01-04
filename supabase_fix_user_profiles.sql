-- =====================================================
-- 修復 user_profiles 表 - 添加缺失的欄位
-- =====================================================

-- 1. 添加 user_id 欄位（複製 id 的值）
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS user_id UUID;

-- 2. 將現有的 id 值複製到 user_id
UPDATE user_profiles SET user_id = id WHERE user_id IS NULL;

-- 3. 添加其他缺失的欄位
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS active_card_style TEXT DEFAULT 'classic';

-- 4. 確保 credits_balance 有預設值
UPDATE user_profiles SET credits_balance = 0 WHERE credits_balance IS NULL;
UPDATE user_profiles SET subscription_type = 'free' WHERE subscription_type IS NULL;
UPDATE user_profiles SET active_card_style = 'classic' WHERE active_card_style IS NULL;

-- 5. 刪除並重建 RLS policy（使用正確的欄位名）
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow users to view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow users to update own profile" ON user_profiles;

-- 使用 id 欄位（因為這是實際存在的用戶 ID）
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 6. 確認修復結果
SELECT id, user_id, email, display_name, subscription_type, credits_balance, active_card_style 
FROM user_profiles 
LIMIT 5;
