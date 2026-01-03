-- ============================================
-- 媒體管理功能 - Supabase 資料表與 Storage
-- ============================================

-- 1. 音樂檔案記錄表 (music_files)
CREATE TABLE IF NOT EXISTS music_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    file_name VARCHAR(500) NOT NULL,
    theme VARCHAR(20) NOT NULL CHECK (theme IN ('baroque', 'cyberpunk', 'celestial')),
    size INTEGER NOT NULL,
    duration INTEGER,
    url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_music_files_theme ON music_files(theme);
CREATE INDEX IF NOT EXISTS idx_music_files_is_active ON music_files(is_active);

-- RLS 政策
ALTER TABLE music_files ENABLE ROW LEVEL SECURITY;

-- 所有人可讀取（前台播放需要）
CREATE POLICY "Music files are viewable by everyone" ON music_files
    FOR SELECT USING (true);

-- 管理員可執行所有操作
CREATE POLICY "Admins can manage music files" ON music_files
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 重要：手動步驟 - 在 Supabase Dashboard 執行
-- ============================================

-- 2. 創建 Storage Bucket（需在 Supabase Dashboard > Storage 手動創建）
-- 
-- Bucket 名稱: music
-- Public: 是（允許公開訪問）
-- 
-- 或使用以下 SQL（可能需要管理員權限）：

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'music',
    'music',
    true,
    20971520,  -- 20MB
    ARRAY['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage 政策

-- 允許所有人讀取（播放音樂）
CREATE POLICY "Public music access" ON storage.objects
    FOR SELECT USING (bucket_id = 'music');

-- 允許認證用戶上傳
CREATE POLICY "Authenticated users can upload music" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'music' 
        AND auth.role() = 'authenticated'
    );

-- 允許認證用戶刪除
CREATE POLICY "Authenticated users can delete music" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'music' 
        AND auth.role() = 'authenticated'
    );

-- ============================================

-- 4. 插入範例資料（如果有預設音樂的話）
-- 這些需要先上傳檔案到 Storage 才有 URL

-- INSERT INTO music_files (name, file_name, theme, size, url, is_active)
-- VALUES 
--     ('巴洛克氛圍', 'baroque/baroque-ambient.mp3', 'baroque', 4400000, 'https://xxx.supabase.co/storage/v1/object/public/music/baroque/baroque-ambient.mp3', true),
--     ('賽博龐克氛圍', 'cyberpunk/cyberpunk-ambient.mp3', 'cyberpunk', 3900000, 'https://xxx.supabase.co/storage/v1/object/public/music/cyberpunk/cyberpunk-ambient.mp3', true),
--     ('星空氛圍', 'celestial/celestial-ambient.mp3', 'celestial', 5200000, 'https://xxx.supabase.co/storage/v1/object/public/music/celestial/celestial-ambient.mp3', true);
