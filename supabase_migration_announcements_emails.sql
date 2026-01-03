-- ============================================
-- 公告管理與郵件通知功能 - Supabase 資料表
-- ============================================

-- 1. 公告表 (announcements)
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 1,
    type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'promo', 'system')),
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 公告表索引
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(active);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);

-- 公告表 RLS 政策
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- 所有人可讀取啟用中的公告
CREATE POLICY "Active announcements are viewable by everyone" ON announcements
    FOR SELECT USING (active = true);

-- 管理員可執行所有操作（暫時允許所有authenticated用戶）
CREATE POLICY "Admins can manage announcements" ON announcements
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 2. 郵件發送記錄表 (email_logs)
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    target_type VARCHAR(20) DEFAULT 'all' CHECK (target_type IN ('all', 'vip', 'free', 'custom')),
    target_emails TEXT[],
    sent_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sending', 'completed', 'failed')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 郵件記錄表索引
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at DESC);

-- 郵件記錄表 RLS 政策
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- 只有管理員可以查看和管理郵件記錄
CREATE POLICY "Admins can manage email logs" ON email_logs
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================

-- 3. 插入範例資料（可選）
INSERT INTO announcements (content, active, priority, type)
VALUES 
    ('🎉 新年限時優惠！VIP 只要 199 元！', true, 1, 'promo'),
    ('📢 新功能上線：年度運勢牌陣', true, 2, 'info'),
    ('🔧 系統將於 1/5 進行維護', false, 3, 'system')
ON CONFLICT DO NOTHING;
