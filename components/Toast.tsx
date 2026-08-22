/**
 * 主題化 Toast 通知系統
 * 取代原生 alert()，符合 App 的神秘奢華風格（金色邊框 + 深色玻璃質感）
 * 用法：
 *   const toast = useToast();
 *   toast.show('訊息內容', 'success');
 *   toast.success('成功訊息');
 *   toast.error('錯誤訊息');
 *   toast.info('提示訊息');
 */

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  show: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// 各類型對應的圖示與配色
const TOAST_STYLES: Record<ToastType, { icon: string; border: string; glow: string }> = {
  success: {
    icon: '✦',
    border: 'border-[#d4af37]/60',
    glow: 'shadow-[0_0_30px_rgba(212,175,55,0.25)]',
  },
  error: {
    icon: '⚠',
    border: 'border-red-500/60',
    glow: 'shadow-[0_0_30px_rgba(255,77,77,0.25)]',
  },
  info: {
    icon: '◈',
    border: 'border-[#a78bfa]/60',
    glow: 'shadow-[0_0_30px_rgba(167,139,250,0.25)]',
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const show = useCallback((message: string, type: ToastType = 'info', duration = 3500) => {
    const id = ++idRef.current;
    setToasts(prev => [...prev, { id, type, message }]);
    // 自動消失（略長於動畫時間，讓淡出動畫完整播放）
    setTimeout(() => removeToast(id), duration + 300);
  }, [removeToast]);

  const success = useCallback((message: string, duration?: number) => show(message, 'success', duration), [show]);
  const error = useCallback((message: string, duration?: number) => show(message, 'error', duration), [show]);
  const info = useCallback((message: string, duration?: number) => show(message, 'info', duration), [show]);

  return (
    <ToastContext.Provider value={{ show, success, error, info }}>
      {children}

      {/* Toast 容器 - 固定在頂部中央，不阻擋操作 */}
      <div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-3 pointer-events-none px-4"
        role="status"
        aria-live="polite"
      >
        {toasts.map(toast => {
          const style = TOAST_STYLES[toast.type];
          return (
            <div
              key={toast.id}
              className={`
                toast-enter pointer-events-auto
                max-w-[90vw] md:max-w-md w-auto
                px-5 py-3.5 rounded-2xl
                bg-black/90 backdrop-blur-xl
                border ${style.border} ${style.glow}
                flex items-center gap-3
                text-sm md:text-base
                shadow-[0_10px_40px_rgba(0,0,0,0.8)]
              `}
            >
              <span className={`text-lg md:text-xl shrink-0 ${toast.type === 'error' ? 'text-red-400' : toast.type === 'info' ? 'text-[#a78bfa]' : 'text-[#d4af37]'}`}>
                {style.icon}
              </span>
              <span className="font-lora text-[#f3e5ab] leading-relaxed">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="關閉通知"
                className="ml-2 shrink-0 text-[#d4af37]/40 hover:text-[#d4af37] transition-colors text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast 必須在 ToastProvider 內使用');
  }
  return ctx;
};
