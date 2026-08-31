/**
 * Vercel Serverless Function - 綠界付款結果回調
 * POST /api/ecpay-return
 *
 * 綠界付款完成後會 POST 回此端點（ReturnURL）。
 * 流程：
 * 1. 用 SDK 驗證 CheckMacValue 簽章（防偽造）
 * 2. 確認付款成功（RtnCode == 1）
 * 3. 依 provider_transaction_id 找到 payment_records
 * 4. 完成付款 → 啟用 VIP / 加點數
 * 5. 回傳 "1|OK" 給綠界
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { isValidReceivedCheckMacValue } from 'node-ecpay-aio';

// 綠界組態（內聯，避免跨目錄依賴在 Vercel 打包時遺漏）
const getMerchantConfig = () => ({
  MerchantID: process.env.ECPAY_MERCHANT_ID || '',
  HashKey: process.env.ECPAY_HASH_KEY || '',
  HashIV: process.env.ECPAY_HASH_IV || '',
  ReturnURL: `${process.env.VITE_SITE_URL || 'https://majorarcana.app'}/api/ecpay-return`,
  ClientBackURL: `${process.env.VITE_SITE_URL || 'https://majorarcana.app'}/pricing?payment=success`,
});
const isEcpayConfigured = () => Boolean(
  process.env.ECPAY_MERCHANT_ID && process.env.ECPAY_HASH_KEY && process.env.ECPAY_HASH_IV
);

// 延遲建立 supabase client（避免 env 缺失時在 module 層拋錯）
const getSupabase = () => {
  const url = process.env.VITE_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) return null;
  return createClient(url, key);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  if (!isEcpayConfigured()) {
    return res.status(500).send('0|ECPay not configured');
  }

  try {
    const supabase = getSupabase();
    if (!supabase) {
      return res.status(500).send('0|Supabase not configured');
    }

    const params = req.body || {};

    // 1. 驗證簽章
    const config = getMerchantConfig();
    if (!isValidReceivedCheckMacValue(params, config.HashKey, config.HashIV)) {
      console.error('[ecpay-return] CheckMacValue verification failed');
      return res.status(400).send('0|CheckMacValue error');
    }

    // 2. 檢查付款結果
    const rtnCode = params['RtnCode'];
    const tradeNo = params['MerchantTradeNo'] || '';
    const amount = params['TradeAmt'] ? parseInt(params['TradeAmt'], 10) : null;

    if (rtnCode !== '1' && rtnCode !== 1) {
      console.log('[ecpay-return] payment not success, RtnCode:', rtnCode);
      return res.status(200).send(`0|${rtnCode}`);
    }

    if (!tradeNo) {
      return res.status(400).send('0|Missing MerchantTradeNo');
    }

    // 3. 找對應付款記錄
    const { data: payment, error: fetchError } = await supabase
      .from('payment_records')
      .select('*')
      .eq('provider_transaction_id', tradeNo)
      .eq('status', 'pending')
      .maybeSingle();

    if (fetchError || !payment) {
      console.error('[ecpay-return] payment record not found for tradeNo:', tradeNo, fetchError);
      return res.status(200).send('0|Payment record not found');
    }

    // 4. 金額核對（防竄改）
    if (amount !== null && amount !== Number(payment.amount)) {
      console.error('[ecpay-return] amount mismatch:', amount, payment.amount);
      return res.status(200).send('0|Amount mismatch');
    }

    // 5. 完成付款（啟用權限）
    const { error: updateError } = await supabase
      .from('payment_records')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', payment.id);

    if (updateError) {
      console.error('[ecpay-return] update payment failed:', updateError);
      return res.status(500).send('0|Update failed');
    }

    // 依類型啟用權限
    if (payment.credits_purchased) {
      const { error: creditError } = await supabase.rpc('purchase_credits', {
        p_user_id: payment.user_id,
        p_credits: payment.credits_purchased,
        p_payment_id: payment.id,
      });
      if (creditError) {
        console.error('[ecpay-return] purchase_credits failed:', creditError);
        return res.status(200).send('0|Credit grant failed');
      }
    } else if (payment.subscription_months) {
      const subType = payment.subscription_months >= 9999 ? 'lifetime'
        : payment.subscription_months >= 12 ? 'yearly' : 'monthly';
      const { error: subError } = await supabase.rpc('activate_subscription', {
        p_user_id: payment.user_id,
        p_subscription_type: subType,
        p_months: payment.subscription_months,
      });
      if (subError) {
        console.error('[ecpay-return] activate_subscription failed:', subError);
        return res.status(200).send('0|Subscription activation failed');
      }
    }

    return res.status(200).send('1|OK');
  } catch (err) {
    console.error('[ecpay-return] error:', err);
    return res.status(500).send('0|Internal error');
  }
}
