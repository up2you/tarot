/**
 * 訪客額度系統
 * 訪客（未登入）使用 localStorage 計數，每日 3 次免費占卜
 * 登入用戶走 Supabase user_profiles 額度（見 userService）
 */

const GUEST_QUOTA_KEY = 'aetheris_guest_quota';
const GUEST_DAILY_LIMIT = 3;

interface GuestQuota {
  date: string;      // YYYY-MM-DD
  used: number;
}

const todayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const loadQuota = (): GuestQuota => {
  try {
    const raw = localStorage.getItem(GUEST_QUOTA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GuestQuota;
      // 跨天重置
      if (parsed.date === todayKey()) return parsed;
    }
  } catch { /* 忽略解析錯誤 */ }
  return { date: todayKey(), used: 0 };
};

/** 訪客剩餘免費次數 */
export const getGuestRemaining = (): number => {
  const quota = loadQuota();
  return Math.max(0, GUEST_DAILY_LIMIT - quota.used);
};

/** 扣除一次訪客額度，回傳是否成功 */
export const consumeGuestQuota = (): boolean => {
  const quota = loadQuota();
  if (quota.used >= GUEST_DAILY_LIMIT) return false;
  quota.used += 1;
  try {
    localStorage.setItem(GUEST_QUOTA_KEY, JSON.stringify(quota));
  } catch { /* 忽略儲存失敗 */ }
  return true;
};

export const GUEST_DAILY_QUOTA_LIMIT = GUEST_DAILY_LIMIT;
