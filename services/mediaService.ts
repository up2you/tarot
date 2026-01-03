/**
 * 媒體管理服務
 * 使用 Supabase Storage 管理背景音樂
 */

import { supabase } from './supabaseClient';

// ============================================
// 類型定義
// ============================================

export type ThemeType = 'baroque' | 'cyberpunk' | 'celestial';

export interface MusicFile {
    id: string;
    name: string;
    file_name: string;
    theme: ThemeType;
    size: number;
    duration?: number;
    url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface UploadMusicInput {
    file: File;
    name: string;
    theme: ThemeType;
}

// Storage bucket 名稱
const BUCKET_NAME = 'music';

// 主題標籤
export const themeLabels: Record<ThemeType, { label: string; icon: string }> = {
    baroque: { label: '巴洛克', icon: '🏛️' },
    cyberpunk: { label: '賽博龐克', icon: '🌃' },
    celestial: { label: '星空', icon: '🌌' },
};

// ============================================
// 音樂檔案管理
// ============================================

/**
 * 取得所有音樂檔案
 */
export const getMusicFiles = async (): Promise<MusicFile[]> => {
    try {
        const { data, error } = await supabase
            .from('music_files')
            .select('*')
            .order('theme', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[MediaService] getMusicFiles failed:', error);
            return [];
        }

        return data as MusicFile[];
    } catch (err) {
        console.error('[MediaService] getMusicFiles error:', err);
        return [];
    }
};

/**
 * 取得指定主題的音樂
 */
export const getMusicByTheme = async (theme: ThemeType): Promise<MusicFile[]> => {
    try {
        const { data, error } = await supabase
            .from('music_files')
            .select('*')
            .eq('theme', theme)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[MediaService] getMusicByTheme failed:', error);
            return [];
        }

        return data as MusicFile[];
    } catch (err) {
        console.error('[MediaService] getMusicByTheme error:', err);
        return [];
    }
};

/**
 * 取得當前啟用的主題音樂
 */
export const getActiveMusic = async (theme: ThemeType): Promise<MusicFile | null> => {
    try {
        const { data, error } = await supabase
            .from('music_files')
            .select('*')
            .eq('theme', theme)
            .eq('is_active', true)
            .single();

        if (error) {
            // 沒有啟用的音樂不算錯誤
            if (error.code === 'PGRST116') return null;
            console.error('[MediaService] getActiveMusic failed:', error);
            return null;
        }

        return data as MusicFile;
    } catch (err) {
        console.error('[MediaService] getActiveMusic error:', err);
        return null;
    }
};

/**
 * 上傳音樂檔案
 */
export const uploadMusic = async (input: UploadMusicInput): Promise<{ success: boolean; file?: MusicFile; message: string }> => {
    try {
        const { file, name, theme } = input;

        // 驗證檔案類型
        const allowedTypes = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3'];
        if (!allowedTypes.includes(file.type)) {
            return { success: false, message: '不支援的檔案格式，請上傳 MP3, OGG 或 WAV 檔案' };
        }

        // 驗證檔案大小（最大 20MB）
        const maxSize = 20 * 1024 * 1024;
        if (file.size > maxSize) {
            return { success: false, message: '檔案大小超過 20MB 限制' };
        }

        // 生成唯一檔名
        const timestamp = Date.now();
        const ext = file.name.split('.').pop() || 'mp3';
        const fileName = `${theme}/${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // 上傳到 Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            console.error('[MediaService] Upload failed:', uploadError);
            return { success: false, message: '上傳失敗：' + uploadError.message };
        }

        // 取得公開 URL
        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        // 儲存到資料庫
        const { data: dbData, error: dbError } = await supabase
            .from('music_files')
            .insert({
                name: name,
                file_name: fileName,
                theme: theme,
                size: file.size,
                url: urlData.publicUrl,
                is_active: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (dbError) {
            console.error('[MediaService] DB insert failed:', dbError);
            // 刪除已上傳的檔案
            await supabase.storage.from(BUCKET_NAME).remove([fileName]);
            return { success: false, message: '儲存記錄失敗' };
        }

        console.log('[MediaService] Music uploaded:', dbData.id);
        return { success: true, file: dbData as MusicFile, message: '上傳成功' };

    } catch (err) {
        console.error('[MediaService] uploadMusic error:', err);
        return { success: false, message: '上傳過程發生錯誤' };
    }
};

/**
 * 刪除音樂檔案
 */
export const deleteMusic = async (id: string): Promise<boolean> => {
    try {
        // 先取得檔案資訊
        const { data: file, error: fetchError } = await supabase
            .from('music_files')
            .select('file_name')
            .eq('id', id)
            .single();

        if (fetchError || !file) {
            console.error('[MediaService] File not found:', fetchError);
            return false;
        }

        // 從 Storage 刪除
        const { error: storageError } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([file.file_name]);

        if (storageError) {
            console.warn('[MediaService] Storage delete failed:', storageError);
            // 繼續刪除資料庫記錄
        }

        // 從資料庫刪除
        const { error: dbError } = await supabase
            .from('music_files')
            .delete()
            .eq('id', id);

        if (dbError) {
            console.error('[MediaService] DB delete failed:', dbError);
            return false;
        }

        console.log('[MediaService] Music deleted:', id);
        return true;

    } catch (err) {
        console.error('[MediaService] deleteMusic error:', err);
        return false;
    }
};

/**
 * 設定為主題的啟用音樂
 */
export const setActiveMusic = async (id: string, theme: ThemeType): Promise<boolean> => {
    try {
        // 先停用該主題的所有音樂
        await supabase
            .from('music_files')
            .update({ is_active: false, updated_at: new Date().toISOString() })
            .eq('theme', theme);

        // 啟用指定的音樂
        const { error } = await supabase
            .from('music_files')
            .update({ is_active: true, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('[MediaService] setActiveMusic failed:', error);
            return false;
        }

        console.log('[MediaService] Active music set:', id);
        return true;

    } catch (err) {
        console.error('[MediaService] setActiveMusic error:', err);
        return false;
    }
};

/**
 * 更新音樂資訊
 */
export const updateMusic = async (
    id: string,
    updates: { name?: string; theme?: ThemeType }
): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('music_files')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) {
            console.error('[MediaService] updateMusic failed:', error);
            return false;
        }

        console.log('[MediaService] Music updated:', id);
        return true;

    } catch (err) {
        console.error('[MediaService] updateMusic error:', err);
        return false;
    }
};

/**
 * 格式化檔案大小
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};
