/**
 * 主題音效管理器
 * 使用真實音效檔案播放洗牌/翻牌音效
 */

import { useCallback, useRef, useEffect } from 'react';
import { ThemeId } from '../hooks/useTheme';

type SoundType = 'shuffle' | 'draw' | 'flip' | 'ambient';

// 音效檔案路徑
const SOUND_FILES: Record<string, string> = {
  shuffle: '/audio/shuffle.mp3',
  flip: '/audio/flip.mp3',
  draw: '/audio/flip.mp3', // draw 也使用 flip 音效
};

export const useThemedSounds = (theme: ThemeId = 'baroque') => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  // 預載音效
  useEffect(() => {
    Object.entries(SOUND_FILES).forEach(([key, path]) => {
      if (!audioRefs.current[key]) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        audio.volume = 0.5;
        audioRefs.current[key] = audio;
      }
    });
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (type === 'ambient') return; // 背景音樂由 BackgroundMusic 處理

    const audio = audioRefs.current[type];
    if (audio) {
      // 重置播放位置以支援快速連續播放
      audio.currentTime = 0;

      // 根據音效類型調整音量
      audio.volume = type === 'shuffle' ? 0.6 : 0.4;

      audio.play().catch(err => {
        // 瀏覽器可能阻擋自動播放，靜默失敗
        console.log('[Sound] Playback blocked:', err.message);
      });
    }
  }, []);

  return { playSound };
};

// 向後兼容的 useMysticSounds (預設 baroque)
export const useMysticSounds = () => useThemedSounds('baroque');
