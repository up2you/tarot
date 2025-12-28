/**
 * 主題音效管理器
 * 根據當前主題播放不同風格的洗牌/翻牌音效
 */

import { useCallback } from 'react';
import { ThemeId } from '../hooks/useTheme';

type SoundType = 'shuffle' | 'draw' | 'flip' | 'ambient';

// 主題音效配置 - 使用 Web Audio API 合成不同風格
const THEME_SOUND_CONFIGS: Record<ThemeId, {
  shuffle: { type: OscillatorType; freqStart: number; freqEnd: number; duration: number };
  flip: { type: OscillatorType; freqStart: number; freqEnd: number; duration: number };
  draw: { type: OscillatorType; freqStart: number; freqEnd: number; duration: number };
}> = {
  // 巴洛克：低沉神秘的管風琴風格
  baroque: {
    shuffle: { type: 'sine', freqStart: 80, freqEnd: 40, duration: 0.6 },
    flip: { type: 'sine', freqStart: 220, freqEnd: 440, duration: 0.4 },
    draw: { type: 'triangle', freqStart: 330, freqEnd: 660, duration: 0.25 }
  },
  // 賽博龐克：電子合成器風格
  cyberpunk: {
    shuffle: { type: 'sawtooth', freqStart: 100, freqEnd: 50, duration: 0.4 },
    flip: { type: 'square', freqStart: 400, freqEnd: 800, duration: 0.2 },
    draw: { type: 'sawtooth', freqStart: 600, freqEnd: 1200, duration: 0.15 }
  },
  // 星空：空靈夢幻風格
  celestial: {
    shuffle: { type: 'sine', freqStart: 200, freqEnd: 100, duration: 0.8 },
    flip: { type: 'sine', freqStart: 500, freqEnd: 1000, duration: 0.5 },
    draw: { type: 'sine', freqStart: 800, freqEnd: 1600, duration: 0.3 }
  }
};

export const useThemedSounds = (theme: ThemeId = 'baroque') => {
  const playSound = useCallback((type: SoundType) => {
    if (type === 'ambient') return; // 背景音樂由 BackgroundMusic 處理

    const config = THEME_SOUND_CONFIGS[theme][type];
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // 創建振盪器
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // 根據主題添加效果
    oscillator.type = config.type;
    oscillator.connect(gainNode);

    // Cyberpunk 主題添加失真效果
    if (theme === 'cyberpunk') {
      const distortion = audioCtx.createWaveShaper();
      distortion.curve = makeDistortionCurve(50);
      oscillator.connect(distortion);
      distortion.connect(gainNode);
    } else {
      oscillator.connect(gainNode);
    }

    gainNode.connect(audioCtx.destination);

    // 設定頻率變化
    oscillator.frequency.setValueAtTime(config.freqStart, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(config.freqEnd, audioCtx.currentTime + config.duration);

    // 設定音量淡出
    const volume = theme === 'celestial' ? 0.08 : theme === 'cyberpunk' ? 0.06 : 0.07;
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + config.duration);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + config.duration);
  }, [theme]);

  return { playSound };
};

// 生成失真曲線 (用於 Cyberpunk 主題)
function makeDistortionCurve(amount: number): Float32Array {
  const samples = 44100;
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < samples; ++i) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

// 向後兼容的 useMysticSounds (預設 baroque)
export const useMysticSounds = () => useThemedSounds('baroque');
