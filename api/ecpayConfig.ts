/**
 * 綠界 ECPay 組態（僅伺服器端使用）
 */

export const getEcpayMode = (): 'Production' | 'Test' => {
  return (process.env.ECPAY_ENV || 'stage') === 'production' ? 'Production' : 'Test';
};

export const getMerchantConfig = () => {
  return {
    MerchantID: process.env.ECPAY_MERCHANT_ID || '',
    HashKey: process.env.ECPAY_HASH_KEY || '',
    HashIV: process.env.ECPAY_HASH_IV || '',
    ReturnURL: `${process.env.VITE_SITE_URL || 'https://majorarcana.app'}/api/ecpay-return`,
    ClientBackURL: `${process.env.VITE_SITE_URL || 'https://majorarcana.app'}/pricing?payment=success`,
  };
};

export function isEcpayConfigured(): boolean {
  return Boolean(
    process.env.ECPAY_MERCHANT_ID &&
    process.env.ECPAY_HASH_KEY &&
    process.env.ECPAY_HASH_IV
  );
}
