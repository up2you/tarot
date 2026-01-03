/**
 * 公告管理服務
 * 管理 announcements 資料表的 CRUD 操作
 */

import { supabase } from './supabaseClient';

export interface Announcement {
    id: string;
    content: string;
    active: boolean;
    priority: number;
    type: 'info' | 'warning' | 'promo' | 'system';
    start_date?: string;
    end_date?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateAnnouncementInput {
    content: string;
    active?: boolean;
    priority?: number;
    type?: 'info' | 'warning' | 'promo' | 'system';
    start_date?: string;
    end_date?: string;
}

/**
 * 取得所有公告（按優先級排序）
 */
export const getAnnouncements = async (): Promise<Announcement[]> => {
    try {
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .order('priority', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[AnnouncementService] getAnnouncements failed:', error);
            return [];
        }

        return data as Announcement[];
    } catch (err) {
        console.error('[AnnouncementService] getAnnouncements error:', err);
        return [];
    }
};

/**
 * 取得啟用中的公告（用於前台顯示）
 */
export const getActiveAnnouncements = async (): Promise<Announcement[]> => {
    try {
        const now = new Date().toISOString();
        
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .eq('active', true)
            .or(`start_date.is.null,start_date.lte.${now}`)
            .or(`end_date.is.null,end_date.gte.${now}`)
            .order('priority', { ascending: true });

        if (error) {
            console.error('[AnnouncementService] getActiveAnnouncements failed:', error);
            return [];
        }

        return data as Announcement[];
    } catch (err) {
        console.error('[AnnouncementService] getActiveAnnouncements error:', err);
        return [];
    }
};

/**
 * 新增公告
 */
export const createAnnouncement = async (input: CreateAnnouncementInput): Promise<Announcement | null> => {
    try {
        // 取得目前最大優先級
        const { data: existing } = await supabase
            .from('announcements')
            .select('priority')
            .order('priority', { ascending: false })
            .limit(1);

        const maxPriority = existing && existing.length > 0 ? existing[0].priority : 0;

        const { data, error } = await supabase
            .from('announcements')
            .insert({
                content: input.content,
                active: input.active ?? true,
                priority: input.priority ?? maxPriority + 1,
                type: input.type ?? 'info',
                start_date: input.start_date || null,
                end_date: input.end_date || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('[AnnouncementService] createAnnouncement failed:', error);
            return null;
        }

        console.log('[AnnouncementService] Announcement created:', data.id);
        return data as Announcement;
    } catch (err) {
        console.error('[AnnouncementService] createAnnouncement error:', err);
        return null;
    }
};

/**
 * 更新公告
 */
export const updateAnnouncement = async (
    id: string,
    updates: Partial<Omit<Announcement, 'id' | 'created_at'>>
): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('announcements')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) {
            console.error('[AnnouncementService] updateAnnouncement failed:', error);
            return false;
        }

        console.log('[AnnouncementService] Announcement updated:', id);
        return true;
    } catch (err) {
        console.error('[AnnouncementService] updateAnnouncement error:', err);
        return false;
    }
};

/**
 * 切換公告啟用狀態
 */
export const toggleAnnouncementActive = async (id: string, active: boolean): Promise<boolean> => {
    return updateAnnouncement(id, { active });
};

/**
 * 刪除公告
 */
export const deleteAnnouncement = async (id: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('announcements')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('[AnnouncementService] deleteAnnouncement failed:', error);
            return false;
        }

        console.log('[AnnouncementService] Announcement deleted:', id);
        return true;
    } catch (err) {
        console.error('[AnnouncementService] deleteAnnouncement error:', err);
        return false;
    }
};

/**
 * 重新排序公告
 */
export const reorderAnnouncements = async (orderedIds: string[]): Promise<boolean> => {
    try {
        // 批量更新優先級
        const updates = orderedIds.map((id, index) => ({
            id,
            priority: index + 1,
            updated_at: new Date().toISOString(),
        }));

        for (const update of updates) {
            const { error } = await supabase
                .from('announcements')
                .update({ priority: update.priority, updated_at: update.updated_at })
                .eq('id', update.id);

            if (error) {
                console.error('[AnnouncementService] reorderAnnouncements failed:', error);
                return false;
            }
        }

        console.log('[AnnouncementService] Announcements reordered');
        return true;
    } catch (err) {
        console.error('[AnnouncementService] reorderAnnouncements error:', err);
        return false;
    }
};
