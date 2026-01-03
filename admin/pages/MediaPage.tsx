/**
 * 媒體管理頁面 - 背景音樂管理（連接 Supabase Storage）
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    MusicFile,
    ThemeType,
    getMusicFiles,
    uploadMusic,
    deleteMusic,
    setActiveMusic,
    updateMusic,
    formatFileSize,
    themeLabels,
} from '../../services/mediaService';

const MediaPage: React.FC = () => {
    const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // 上傳表單
    const [uploadName, setUploadName] = useState('');
    const [uploadTheme, setUploadTheme] = useState<ThemeType>('baroque');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // 播放狀態
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 訊息
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // 載入音樂列表
    const loadMusicFiles = async () => {
        setIsLoading(true);
        const files = await getMusicFiles();
        setMusicFiles(files);
        setIsLoading(false);
    };

    useEffect(() => {
        loadMusicFiles();

        // 清理音頻
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // 顯示訊息
    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    // 選擇檔案
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // 自動填入檔名（去除副檔名）
            if (!uploadName) {
                setUploadName(file.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };

    // 上傳音樂
    const handleUpload = async () => {
        if (!selectedFile) {
            showMessage('error', '請選擇檔案');
            return;
        }
        if (!uploadName.trim()) {
            showMessage('error', '請輸入音樂名稱');
            return;
        }

        setIsUploading(true);
        setUploadProgress(30);

        const result = await uploadMusic({
            file: selectedFile,
            name: uploadName.trim(),
            theme: uploadTheme,
        });

        setUploadProgress(100);

        if (result.success) {
            setSelectedFile(null);
            setUploadName('');
            if (fileInputRef.current) fileInputRef.current.value = '';
            await loadMusicFiles();
            showMessage('success', result.message);
        } else {
            showMessage('error', result.message);
        }

        setIsUploading(false);
        setUploadProgress(0);
    };

    // 刪除音樂
    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`確定要刪除「${name}」嗎？`)) return;

        // 停止播放
        if (playingId === id) {
            handleStop();
        }

        const success = await deleteMusic(id);
        if (success) {
            setMusicFiles(prev => prev.filter(f => f.id !== id));
            showMessage('success', '已刪除');
        } else {
            showMessage('error', '刪除失敗');
        }
    };

    // 設為啟用
    const handleSetActive = async (file: MusicFile) => {
        const success = await setActiveMusic(file.id, file.theme);
        if (success) {
            // 更新本地狀態
            setMusicFiles(prev => prev.map(f => ({
                ...f,
                is_active: f.theme === file.theme ? f.id === file.id : f.is_active,
            })));
            showMessage('success', `已設為${themeLabels[file.theme].label}主題音樂`);
        } else {
            showMessage('error', '設定失敗');
        }
    };

    // 播放/暫停
    const handlePlayPause = (file: MusicFile) => {
        if (playingId === file.id) {
            // 暫停
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlayingId(null);
        } else {
            // 播放新的
            if (audioRef.current) {
                audioRef.current.pause();
            }
            audioRef.current = new Audio(file.url);
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(err => {
                console.error('Playback failed:', err);
                showMessage('error', '播放失敗');
            });
            audioRef.current.onended = () => setPlayingId(null);
            setPlayingId(file.id);
        }
    };

    // 停止播放
    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setPlayingId(null);
    };

    // 按主題分組
    const groupedByTheme = (theme: ThemeType) =>
        musicFiles.filter(f => f.theme === theme);

    // 格式化日期
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('zh-TW');
    };

    return (
        <div className="space-y-6">
            {/* 訊息提示 */}
            {message && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                    {message.text}
                </div>
            )}

            {/* 上傳區域 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">🎵 上傳背景音樂</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* 檔案選擇 */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">選擇檔案</label>
                        <div className="relative">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="audio/mpeg,audio/ogg,audio/wav,audio/mp3,.mp3,.ogg,.wav"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="music-upload"
                            />
                            <label
                                htmlFor="music-upload"
                                className="flex items-center justify-center w-full py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-amber-500 transition-colors"
                            >
                                {selectedFile ? (
                                    <div className="text-center">
                                        <span className="text-2xl mb-2 block">🎶</span>
                                        <span className="text-white">{selectedFile.name}</span>
                                        <span className="text-gray-400 text-sm block">
                                            {formatFileSize(selectedFile.size)}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <span className="text-3xl mb-2 block">📁</span>
                                        <span className="text-gray-400">點擊或拖拽上傳</span>
                                        <span className="text-gray-500 text-sm block">
                                            MP3, OGG, WAV (最大 20MB)
                                        </span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* 設定 */}
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">音樂名稱</label>
                            <input
                                type="text"
                                value={uploadName}
                                onChange={(e) => setUploadName(e.target.value)}
                                placeholder="輸入音樂名稱..."
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">指定主題</label>
                            <select
                                value={uploadTheme}
                                onChange={(e) => setUploadTheme(e.target.value as ThemeType)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                            >
                                {Object.entries(themeLabels).map(([key, { label, icon }]) => (
                                    <option key={key} value={key}>
                                        {icon} {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={isUploading || !selectedFile}
                            className="w-full py-3 bg-amber-500 text-black rounded-lg font-bold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUploading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    上傳中... {uploadProgress}%
                                </span>
                            ) : (
                                '上傳音樂'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 音樂列表 - 按主題分組 */}
            {(['baroque', 'cyberpunk', 'celestial'] as ThemeType[]).map(theme => {
                const themeFiles = groupedByTheme(theme);
                const { label, icon } = themeLabels[theme];

                return (
                    <div key={theme} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-bold text-white mb-4">
                            {icon} {label}主題音樂
                            <span className="text-gray-400 text-sm font-normal ml-2">
                                ({themeFiles.length} 個檔案)
                            </span>
                        </h3>

                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2].map((i) => (
                                    <div key={i} className="h-16 bg-gray-700 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : themeFiles.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">尚無音樂</p>
                        ) : (
                            <div className="space-y-3">
                                {themeFiles.map((file) => (
                                    <div
                                        key={file.id}
                                        className={`flex items-center justify-between p-4 rounded-lg transition-colors ${file.is_active
                                                ? 'bg-amber-500/10 border border-amber-500/30'
                                                : 'bg-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* 播放按鈕 */}
                                            <button
                                                onClick={() => handlePlayPause(file)}
                                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${playingId === file.id
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-amber-500 text-black hover:bg-amber-400'
                                                    }`}
                                            >
                                                {playingId === file.id ? '⏸' : '▶'}
                                            </button>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-white font-medium">{file.name}</p>
                                                    {file.is_active && (
                                                        <span className="px-2 py-0.5 bg-amber-500 text-black text-xs rounded">
                                                            使用中
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-sm">
                                                    {formatFileSize(file.size)} · {formatDate(file.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {!file.is_active && (
                                                <button
                                                    onClick={() => handleSetActive(file)}
                                                    className="px-4 py-2 bg-gray-700 text-amber-400 rounded-lg hover:bg-gray-600 text-sm"
                                                >
                                                    設為使用
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(file.id, file.name)}
                                                className="text-red-400 hover:text-red-300 px-3 py-2"
                                            >
                                                刪除
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* 提示 */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <p className="text-gray-500 text-sm text-center">
                    💡 設為「使用中」的音樂將作為該主題的背景音樂播放
                </p>
            </div>
        </div>
    );
};

export default MediaPage;
