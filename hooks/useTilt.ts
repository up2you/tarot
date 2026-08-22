/**
 * 卡片跟手 3D 傾斜 hook
 * 桌面：滑鼠 hover 時卡片隨游標位置微微傾斜（±8°）
 * 手機：觸控拖動時跟手傾斜，釋放後平滑回正
 * 全程只使用 transform，GPU 合成
 *
 * enabled：總開關（來自後台設定）
 * enableTouch：觸控傾斜開關（滑動手勢容器內應關閉，避免手勢衝突）
 */

import { useCallback, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

export interface TiltValues {
  rotateX: number; // 垂直傾斜（正值 = 頂部向後）
  rotateY: number; // 水平傾斜（正值 = 右側向後）
  scale: number;   // 微放大（hover 時 1.03）
}

export const MAX_TILT = 8;   // 最大傾斜角度
export const MAX_TILT_TOUCH = 6; // 觸控時稍微小一點，避免遮擋

/**
 * 回傳滑鼠/觸控事件處理器與目前傾斜值
 * 用法：
 *   const { tilt, onMouseMove, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd, reset } = useTilt(true, true);
 *   <div style={{ transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})` }}>
 */
export const useTilt = (enabled: boolean, enableTouch = true) => {
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0, scale: 1 });
  const frameRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    });
  }, []);

  const updateTilt = useCallback((px: number, py: number, maxAngle: number) => {
    if (!enabled) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      // px / py 介於 -1 ~ 1（-0.5 ~ 0.5 為中心附近）
      setTilt({
        rotateX: -py * maxAngle * 2,
        rotateY: px * maxAngle * 2,
        scale: 1.03,
      });
    });
  }, [enabled]);

  const onMouseMove = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    updateTilt(px, py, MAX_TILT);
  }, [enabled, updateTilt]);

  const onMouseLeave = useCallback(() => {
    reset();
  }, [reset]);

  const onTouchStart = useCallback((e: ReactTouchEvent<HTMLElement>) => {
    if (!enabled || !enableTouch) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, [enabled, enableTouch]);

  const onTouchMove = useCallback((e: ReactTouchEvent<HTMLElement>) => {
    if (!enabled || !enableTouch || !touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    // 以位移量計算傾斜（最多 ±MAX_TILT_TOUCH）
    const maxDelta = 60;
    const px = Math.max(-1, Math.min(1, dx / maxDelta));
    const py = Math.max(-1, Math.min(1, dy / maxDelta));
    updateTilt(px, py, MAX_TILT_TOUCH);
  }, [enabled, enableTouch, updateTilt]);

  const onTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    reset();
  }, [reset]);

  return { tilt, onMouseMove, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd, reset };
};
