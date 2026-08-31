import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '').slice(0, 12);

  // 用前端傳來的 token（或假 token）測試 /auth/v1/user
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  const result: Record<string, unknown> = {
    supabaseUrl,
    anonKeyPrefix: anonKey.slice(0, 20),
    anonKeyLength: anonKey.length,
    serviceKeyPrefix: serviceKey,
    hasToken: Boolean(token),
  };

  try {
    const authResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { 'Authorization': `Bearer ${token}`, 'apikey': anonKey },
    });
    result.authStatus = authResp.status;
    result.authBody = await authResp.text();
  } catch (e) {
    result.authError = (e as Error).message;
  }

  return res.status(200).json(result);
}
