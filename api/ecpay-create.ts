/**
 * Vercel Serverless Function - 建立綠界付款訂單
 * POST /api/ecpay-create
 *
 * 流程：
 * 1. 驗證用戶登入（Supabase JWT）
 * 2. 建立 payment_records（status=pending）
 * 3. 用官方 SDK 產生 Checkout 表單（含 CheckMacValue）
 * 4. 回傳給前端自動 submit 到綠界付款頁
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Merchant, ALLPayment } from 'node-ecpay-aio';
import { getCurrentTaipeiTimeString } from 'node-ecpay-aio';

// 綠界組態（內聯，避免跨目錄依賴在 Vercel 打包時遺漏）
const getEcpayMode = (): 'Production' | 'Test' =>
  (process.env.ECPAY_ENV || 'stage') === 'production' ? 'Production' : 'Test';
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

// 延遲建立 supabase client
// - anonClient：用 anon key 驗證用戶 JWT（auth.getUser 需 anon key）
// - adminClient：用 service role key 做 DB 寫入（繞過 RLS）
const getClients = () => {
  const url = process.env.VITE_SUPABASE_URL || '';
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !anonKey || !serviceKey) return null;
  return {
    anonClient: createClient(url, anonKey),
    adminClient: createClient(url, serviceKey),
  };
};

interface PlanInfo {
  name: string;
  credits: number | null;
  months: number | null;
}

const PLAN_INFO: Record<string, PlanInfo> = {
  credits_5: { name: 'AI 解讀點數 x5', credits: 5, months: null },
  credits_10: { name: 'AI 解讀點數 x10', credits: 10, months: null },
  credits_20: { name: 'AI 解讀點數 x20', credits: 20, months: null },
  monthly: { name: '月費 VIP', credits: null, months: 1 },
  yearly: { name: '年費 VIP', credits: null, months: 12 },
  lifetime: { name: '終身 VIP', credits: null, months: 9999 },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!isEcpayConfigured()) {
    return res.status(500).json({ error: 'ECPay not configured' });
  }

  try {
    const clients = getClients();
    if (!clients) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }
    const { anonClient, adminClient } = clients;

    const { planType } = req.body || {};
    const plan = PLAN_INFO[planType];
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    // 驗證用戶
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: { user }, error: authError } = await anonClient.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // 從 DB 取得方案價格（避免前端竄改金額）
    const { data: dbPlan, error: planError } = await adminClient
      .from('pricing_plans')
      .select('*')
      .eq('plan_type', planType)
      .eq('is_active', true)
      .maybeSingle();

    if (planError || !dbPlan) {
      return res.status(400).json({ error: 'Plan not found or inactive' });
    }

    const amount = Number(dbPlan.price);
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid plan price' });
    }

    // 建立付款記錄（pending）
    const { data: payment, error: payError } = await adminClient
      .from('payment_records')
      .insert({
        user_id: user.id,
        payment_type: planType.startsWith('credits') ? 'credits' : planType,
        amount,
        credits_purchased: plan.credits,
        subscription_months: plan.months,
        status: 'pending',
        payment_provider: 'ecpay',
      })
      .select('id')
      .single();

    if (payError || !payment) {
      console.error('[ecpay-create] create payment record failed:', payError);
      return res.status(500).json({ error: 'Failed to create payment record' });
    }

    // 產生綠界交易編號（時間戳 + 隨機，唯一）
    const serial = getCurrentTaipeiTimeString({ format: 'Serial' });
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    const tradeNo = `${serial}${random}`.slice(0, 20);

    // 用官方 SDK 建立付款
    const merchant = new Merchant(getEcpayMode(), getMerchantConfig());
    const baseParams = {
      MerchantTradeNo: tradeNo,
      MerchantTradeDate: getCurrentTaipeiTimeString({ format: 'Datetime' }),
      TotalAmount: amount,
      TradeDesc: 'Aetheris Tarot - ' + (dbPlan.name_en || plan.name),
      ItemName: `${dbPlan.name_zh || plan.name} x1`,
      CustomField1: user.id,
    };

    const paymentOrder = merchant.createPayment(ALLPayment, baseParams, {});
    // _prepareOrder() 回傳含 CheckMacValue 的完整參數
    const order = paymentOrder._prepareOrder();

    // 記錄交易編號
    await adminClient
      .from('payment_records')
      .update({ provider_transaction_id: tradeNo })
      .eq('id', payment.id);

    return res.status(200).json({
      url: paymentOrder.apiUrl,
      params: order,
    });
  } catch (err) {
    console.error('[ecpay-create] error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
