import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const sdk = await import('node-ecpay-aio');
    return res.status(200).json({
      ok: true,
      merchantType: typeof sdk.Merchant,
      allPaymentType: typeof sdk.ALLPayment,
      keys: Object.keys(sdk).slice(0, 5),
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: (e as Error).message });
  }
}
