/**
 * 背景音樂管理器
 * 需要用戶自行添加音樂檔案到 public/audio 資料夾
 */

import React, { useState, useEffect, useRef } from 'react';
import { ThemeId } from '../hooks/useTheme';

// 音樂檔案配置 - 需要用戶自行添加到 public/audio/ 資料夾
// 格式可以是 mp3/ogg/wav
const THEME_MUSIC: Record<ThemeId, { path: string; name: string }> = {
    baroque: {
        path: '/audio/baroque-ambient.mp3',
        name: '古典神殿'
    },
    cyberpunk: {
        path: '/audio/cyberpunk-ambient.mp3',
        name: '霓虹迷城'
    },
    celestial: {
        path: '/audio/celestial-ambient.mp3',
        name: '星辰低語'
    }
};

interface BackgroundMusicProps {
    theme: ThemeId;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ theme }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [hasAudio, setHasAudio] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const musicInfo = THEME_MUSIC[theme];

    // 檢查音樂檔案是否存在
    useEffect(() => {
        const checkAudio = async () => {
            try {
                const response = await fetch(musicInfo.path, { method: 'HEAD' });
                setHasAudio(response.ok);
            } catch {
                setHasAudio(false);
            }
        };
        checkAudio();
    }, [musicInfo.path]);

    // 當主題變化時切換音樂
    useEffect(() => {
        if (audioRef.current && isPlaying && hasAudio) {
            audioRef.current.pause();
            audioRef.current.src = musicInfo.path;
            audioRef.current.load();
            audioRef.current.play().catch(() => { });
        }
    }, [theme, musicInfo.path, hasAudio]);

    const togglePlay = async () => {
        if (!hasAudio) {
            alert(`請將音樂檔案添加到專案：\n\n${Object.values(THEME_MUSIC).map(m => `📁 public${m.path}`).join('\n')}\n\n可從免費音樂網站下載：\n• bensound.com\n• uppbeat.io\n• chosic.com`);
            return;
        }

        if (!audioRef.current) {
            audioRef.current = new Audio(musicInfo.path);
            audioRef.current.loop = true;
            audioRef.current.volume = volume;
        }

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setIsLoading(true);
            try {
                audioRef.current.src = musicInfo.path;
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (e) {
                console.log('Music play failed:', e);
                alert('音樂播放失敗，請確認檔案格式正確');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    // 清理
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <div
                className="flex items-center gap-3 px-4 py-3 rounded-full transition-all"
                style={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid var(--theme-primary, #d4af37)30',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
            >
                {/* 播放/暫停按鈕 */}
                <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    style={{
                        background: isPlaying ? 'var(--theme-primary, #d4af37)' : hasAudio ? 'transparent' : 'rgba(255,255,255,0.1)',
                        border: `2px solid ${hasAudio ? 'var(--theme-primary, #d4af37)' : 'rgba(255,255,255,0.3)'}`,
                        color: isPlaying ? 'black' : hasAudio ? 'var(--theme-primary, #d4af37)' : 'rgba(255,255,255,0.5)'
                    }}
                    title={hasAudio ? (isPlaying ? '暫停音樂' : '播放音樂') : '需添加音樂檔案'}
                >
                    {isLoading ? (
                        <span className="animate-spin">⏳</span>
                    ) : !hasAudio ? (
                        <span>🔇</span>
                    ) : isPlaying ? (
                        <span>⏸</span>
                    ) : (
                        <span>🎵</span>
                    )}
                </button>

                {/* 音樂名稱 + 音量控制 (僅在播放時顯示) */}
                {isPlaying && (
                    <div className="flex items-center gap-3 animate-fade-up">
                        <span
                            className="text-xs font-cinzel tracking-widest"
                            style={{ color: 'var(--theme-primary, #d4af37)' }}
                        >
                            {musicInfo.name}
                        </span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 appearance-none bg-white/20 rounded-full cursor-pointer"
                            style={{
                                accentColor: 'var(--theme-primary, #d4af37)'
                            }}
                        />
                    </div>
                )}

                {/* 沒有音樂時顯示提示 */}
                {!hasAudio && hasAudio !== null && (
                    <span className="text-xs text-white/40 font-lora italic">
                        需添加音樂
                    </span>
                )}
            </div>
        </div>
    );
};

export default BackgroundMusic;
