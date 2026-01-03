/**
 * 郵件通知服務
 * 管理郵件發送和記錄
 */

import { supabase } from './supabaseClient';
import { getUsers } from './adminService';

export interface EmailLog {
    id: string;
    subject: string;
    content: string;
    target_type: 'all' | 'vip' | 'free' | 'custom';
    target_emails?: string[];
    sent_count: number;
    status: 'pending' | 'sending' | 'completed' | 'failed';
    error_message?: string;
    created_at: string;
    completed_at?: string;
}

export interface SendEmailInput {
    subject: string;
    content: string;
    target: 'all' | 'vip' | 'free';
}

/**
 * 取得郵件發送記錄
 */
export const getEmailLogs = async (limit: number = 20): Promise<EmailLog[]> => {
    try {
        const { data, error } = await supabase
            .from('email_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('[EmailService] getEmailLogs failed:', error);
            return [];
        }

        return data as EmailLog[];
    } catch (err) {
        console.error('[EmailService] getEmailLogs error:', err);
        return [];
    }
};

/**
 * 取得目標用戶的郵件地址
 */
export const getTargetEmails = async (target: 'all' | 'vip' | 'free'): Promise<string[]> => {
    try {
        let query = supabase
            .from('user_profiles')
            .select('email')
            .not('email', 'is', null);

        if (target === 'vip') {
            query = query.eq('is_vip', true);
        } else if (target === 'free') {
            query = query.eq('is_vip', false);
        }

        const { data, error } = await query;

        if (error) {
            console.error('[EmailService] getTargetEmails failed:', error);
            return [];
        }

        return data?.map(u => u.email).filter(Boolean) || [];
    } catch (err) {
        console.error('[EmailService] getTargetEmails error:', err);
        return [];
    }
};

/**
 * 發送群發郵件（記錄到資料庫，實際發送需整合第三方服務）
 */
export const sendBulkEmail = async (input: SendEmailInput): Promise<{ success: boolean; logId?: string; message: string }> => {
    try {
        // 1. 取得目標郵件地址
        const emails = await getTargetEmails(input.target);

        if (emails.length === 0) {
            return { success: false, message: '沒有找到符合條件的用戶' };
        }

        // 2. 建立發送記錄
        const { data: log, error: logError } = await supabase
            .from('email_logs')
            .insert({
                subject: input.subject,
                content: input.content,
                target_type: input.target,
                target_emails: emails,
                sent_count: emails.length,
                status: 'pending',
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (logError) {
            console.error('[EmailService] Failed to create email log:', logError);
            return { success: false, message: '無法建立發送記錄' };
        }

        // 3. 嘗試透過 Edge Function 發送（如果有設定的話）
        try {
            const { data: sendResult, error: sendError } = await supabase.functions.invoke('send-bulk-email', {
                body: {
                    logId: log.id,
                    subject: input.subject,
                    content: input.content,
                    emails: emails,
                }
            });

            if (sendError) {
                // Edge Function 失敗，更新狀態為待處理
                console.warn('[EmailService] Edge Function not available, email queued:', sendError);

                await supabase
                    .from('email_logs')
                    .update({
                        status: 'pending',
                        error_message: '郵件已排入佇列，等待人工處理或整合郵件服務',
                    })
                    .eq('id', log.id);

                return {
                    success: true,
                    logId: log.id,
                    message: `郵件已排入佇列（${emails.length} 位收件人）。請整合郵件服務後自動發送。`
                };
            }

            // 更新為已完成
            await supabase
                .from('email_logs')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                })
                .eq('id', log.id);

            return {
                success: true,
                logId: log.id,
                message: `郵件已成功發送給 ${emails.length} 位用戶`
            };

        } catch (funcErr) {
            // Edge Function 不存在，記錄為待處理
            console.log('[EmailService] Email queued for manual processing');

            return {
                success: true,
                logId: log.id,
                message: `郵件已記錄（${emails.length} 位收件人）。需整合郵件服務後發送。`
            };
        }

    } catch (err) {
        console.error('[EmailService] sendBulkEmail error:', err);
        return { success: false, message: '發送郵件時發生錯誤' };
    }
};

/**
 * 取得郵件統計
 */
export const getEmailStats = async (): Promise<{
    totalSent: number;
    lastWeekSent: number;
    pendingCount: number;
}> => {
    try {
        // 總發送數
        const { count: totalSent } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completed');

        // 本週發送數
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const { count: lastWeekSent } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completed')
            .gte('created_at', weekAgo.toISOString());

        // 待處理數
        const { count: pendingCount } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        return {
            totalSent: totalSent || 0,
            lastWeekSent: lastWeekSent || 0,
            pendingCount: pendingCount || 0,
        };
    } catch (err) {
        console.error('[EmailService] getEmailStats error:', err);
        return { totalSent: 0, lastWeekSent: 0, pendingCount: 0 };
    }
};

/**
 * 刪除郵件記錄
 */
export const deleteEmailLog = async (id: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('email_logs')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('[EmailService] deleteEmailLog failed:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('[EmailService] deleteEmailLog error:', err);
        return false;
    }
};

/**
 * 重試發送郵件
 */
export const retryEmailSend = async (logId: string): Promise<{ success: boolean; message: string }> => {
    try {
        // 取得原始記錄
        const { data: log, error } = await supabase
            .from('email_logs')
            .select('*')
            .eq('id', logId)
            .single();

        if (error || !log) {
            return { success: false, message: '找不到郵件記錄' };
        }

        // 更新狀態為發送中
        await supabase
            .from('email_logs')
            .update({ status: 'sending' })
            .eq('id', logId);

        // 嘗試透過 Edge Function 發送
        const { error: sendError } = await supabase.functions.invoke('send-bulk-email', {
            body: {
                logId: log.id,
                subject: log.subject,
                content: log.content,
                emails: log.target_emails,
            }
        });

        if (sendError) {
            await supabase
                .from('email_logs')
                .update({ status: 'failed', error_message: sendError.message })
                .eq('id', logId);

            return { success: false, message: '發送失敗：' + sendError.message };
        }

        await supabase
            .from('email_logs')
            .update({ status: 'completed', completed_at: new Date().toISOString() })
            .eq('id', logId);

        return { success: true, message: '郵件已成功發送' };

    } catch (err) {
        console.error('[EmailService] retryEmailSend error:', err);
        return { success: false, message: '重試發送時發生錯誤' };
    }
};
