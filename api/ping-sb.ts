import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = process.env.VITE_SUPABASE_URL || '';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
    const supabase = createClient(url, key);
    // 輕量查詢測試連線
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('plan_type')
      .limit(1);
    return res.status(200).json({
      ok: true,
      urlSet: Boolean(url),
      keySet: Boolean(key),
      queryError: error ? error.message : null,
      sample: data?.[0]?.plan_type || null,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message, stack: (e as Error).stack?.split('\n').slice(0, 3) });
  }
}
