/**
 * 本地占卜歷史記錄管理服務
 * 資料僅存於使用者裝置，不上傳至伺服器
 */

import { ReadingRecord, AppTheme } from '../types';

const STORAGE_KEY = 'aetheris_reading_history';
const MAX_RECORDS = 100; // 最多保存 100 筆記錄

/**
 * 生成 UUID
 */
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * 取得所有占卜記錄 (按時間倒序)
 */
export function getReadings(): ReadingRecord[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        const records: ReadingRecord[] = JSON.parse(data);
        return records.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
        console.error('Failed to load reading history:', error);
        return [];
    }
}

/**
 * 儲存新的占卜記錄
 */
export function saveReading(
    question: string,
    cards: ReadingRecord['cards'],
    theme: AppTheme,
    interpretation?: string
): ReadingRecord {
    const record: ReadingRecord = {
        id: generateId(),
        timestamp: Date.now(),
        question,
        cards,
        interpretation,
        theme
    };

    try {
        const records = getReadings();
        records.unshift(record); // 新記錄放最前面

        // 超過上限時移除最舊的記錄
        while (records.length > MAX_RECORDS) {
            records.pop();
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
        console.error('Failed to save reading:', error);
    }

    return record;
}

/**
 * 刪除單筆記錄
 */
export function deleteReading(id: string): boolean {
    try {
        const records = getReadings();
        const filtered = records.filter(r => r.id !== id);

        if (filtered.length === records.length) {
            return false; // 沒找到該記錄
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Failed to delete reading:', error);
        return false;
    }
}

/**
 * 清空所有記錄
 */
export function clearAllReadings(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear readings:', error);
    }
}

/**
 * 取得記錄總數
 */
export function getReadingCount(): number {
    return getReadings().length;
}

/**
 * 格式化時間戳為可讀日期
 */
export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hour}:${minute}`;
}

/**
 * 將問題截斷為摘要
 */
export function truncateQuestion(question: string, maxLength: number = 50): string {
    if (question.length <= maxLength) return question;
    return question.substring(0, maxLength) + '...';
}
