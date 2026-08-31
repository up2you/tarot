import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = process.env.VITE_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
  const results: Record<string, unknown> = {
    url,
    keyPrefix: key.slice(0, 20),
    keyLength: key.length,
  };
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from('pricing_plans').select('plan_type').limit(1);
    results.query = { ok: !error, error: error?.message || null, data };
  } catch (e) {
    results.queryError = (e as Error).message;
  }
  return res.status(200).json(results);
}
