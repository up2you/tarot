/**
 * Supabase 客戶端配置
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Missing environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 管理員專用客戶端 (需要 Service Role Key)
export const getAdminClient = () => {
    const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
        console.warn('[Supabase] Missing service role key for admin operations');
        return supabase;
    }
    return createClient(supabaseUrl, serviceRoleKey);
};
