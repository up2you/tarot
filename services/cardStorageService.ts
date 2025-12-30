/**
 * 牌面儲存服務
 * 使用 Supabase Storage 儲存牌面圖片
 */

import { supabase } from './supabaseClient';

const BUCKET_NAME = 'card-images';

export interface CardImageInfo {
    styleId: string;
    cardIndex: number;  // 0-21 for Major Arcana, -1 for back
    url: string;
    uploadedAt: string;
}

/**
 * 確保 storage bucket 存在
 */
const ensureBucket = async (): Promise<boolean> => {
    try {
        const { data: buckets } = await supabase.storage.listBuckets();
        const exists = buckets?.some(b => b.name === BUCKET_NAME);

        if (!exists) {
            const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
                public: true,
                fileSizeLimit: 5 * 1024 * 1024, // 5MB
            });
            if (error) {
                console.error('[CardStorage] Failed to create bucket:', error);
                return false;
            }
        }
        return true;
    } catch (err) {
        console.error('[CardStorage] ensureBucket error:', err);
        return false;
    }
};

/**
 * 上傳單張牌面圖片
 */
export const uploadCardImage = async (
    styleId: string,
    cardIndex: number,  // 0-21 for cards, -1 for back
    file: File
): Promise<string | null> => {
    try {
        await ensureBucket();

        const fileName = cardIndex === -1
            ? `${styleId}/back.png`
            : `${styleId}/${cardIndex}.png`;

        // 上傳檔案
        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, file, {
                cacheControl: '31536000',
                upsert: true, // 覆蓋已存在的檔案
            });

        if (uploadError) {
            console.error('[CardStorage] Upload failed:', uploadError);
            return null;
        }

        // 取得公開 URL
        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        console.log('[CardStorage] Uploaded:', fileName);
        return publicUrl;
    } catch (err) {
        console.error('[CardStorage] uploadCardImage error:', err);
        return null;
    }
};

/**
 * 批量上傳牌面圖片
 */
export const uploadCardImages = async (
    styleId: string,
    files: { cardIndex: number; file: File }[]
): Promise<{ success: number; failed: number; urls: Map<number, string> }> => {
    const urls = new Map<number, string>();
    let success = 0;
    let failed = 0;

    for (const { cardIndex, file } of files) {
        const url = await uploadCardImage(styleId, cardIndex, file);
        if (url) {
            urls.set(cardIndex, url);
            success++;
        } else {
            failed++;
        }
    }

    return { success, failed, urls };
};

/**
 * 取得風格的所有牌面圖片 URL
 */
export const getStyleCardImages = async (
    styleId: string
): Promise<Map<number, string>> => {
    const urls = new Map<number, string>();

    try {
        const { data: files, error } = await supabase.storage
            .from(BUCKET_NAME)
            .list(styleId);

        if (error || !files) {
            return urls;
        }

        for (const file of files) {
            const { data: { publicUrl } } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(`${styleId}/${file.name}`);

            // 解析 cardIndex
            if (file.name === 'back.png') {
                urls.set(-1, publicUrl);
            } else {
                const match = file.name.match(/^(\d+)\.png$/);
                if (match) {
                    urls.set(parseInt(match[1]), publicUrl);
                }
            }
        }
    } catch (err) {
        console.error('[CardStorage] getStyleCardImages error:', err);
    }

    return urls;
};

/**
 * 檢查風格的完成度
 */
export const checkStyleCompletion = async (
    styleId: string
): Promise<{ total: number; uploaded: number; missingIndices: number[] }> => {
    const urls = await getStyleCardImages(styleId);
    const missingIndices: number[] = [];

    // 檢查 0-21 張牌
    for (let i = 0; i <= 21; i++) {
        if (!urls.has(i)) {
            missingIndices.push(i);
        }
    }

    // 檢查牌背
    if (!urls.has(-1)) {
        missingIndices.push(-1);
    }

    return {
        total: 23, // 22 cards + 1 back
        uploaded: 23 - missingIndices.length,
        missingIndices,
    };
};

/**
 * 刪除單張牌面圖片
 */
export const deleteCardImage = async (
    styleId: string,
    cardIndex: number
): Promise<boolean> => {
    try {
        const fileName = cardIndex === -1
            ? `${styleId}/back.png`
            : `${styleId}/${cardIndex}.png`;

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([fileName]);

        if (error) {
            console.error('[CardStorage] Delete failed:', error);
            return false;
        }

        console.log('[CardStorage] Deleted:', fileName);
        return true;
    } catch (err) {
        console.error('[CardStorage] deleteCardImage error:', err);
        return false;
    }
};

/**
 * 刪除整個風格的所有圖片
 */
export const deleteStyleImages = async (styleId: string): Promise<boolean> => {
    try {
        const { data: files } = await supabase.storage
            .from(BUCKET_NAME)
            .list(styleId);

        if (!files || files.length === 0) return true;

        const filePaths = files.map(f => `${styleId}/${f.name}`);
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove(filePaths);

        if (error) {
            console.error('[CardStorage] Delete style failed:', error);
            return false;
        }

        console.log('[CardStorage] Deleted style:', styleId);
        return true;
    } catch (err) {
        console.error('[CardStorage] deleteStyleImages error:', err);
        return false;
    }
};
