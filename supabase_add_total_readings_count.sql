-- 新增 total_readings_count 欄位到 user_profiles 表
-- 用於追蹤用戶累計占卜次數

-- 1. 新增欄位
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS total_readings_count INTEGER DEFAULT 0;

-- 2. 為現有用戶初始化計數（從 readings 表統計）
UPDATE user_profiles up
SET total_readings_count = (
    SELECT COUNT(*)
    FROM readings r
    WHERE r.user_id = up.user_id
)
WHERE total_readings_count = 0;

-- 3. 創建觸發器：當新增 reading 時自動增加計數
CREATE OR REPLACE FUNCTION increment_reading_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE user_profiles
    SET total_readings_count = total_readings_count + 1
    WHERE user_id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. 綁定觸發器到 readings 表
DROP TRIGGER IF EXISTS reading_count_trigger ON readings;
CREATE TRIGGER reading_count_trigger
AFTER INSERT ON readings
FOR EACH ROW
EXECUTE FUNCTION increment_reading_count();

-- 5. 添加註解
COMMENT ON COLUMN user_profiles.total_readings_count IS '用戶累計占卜總次數';
