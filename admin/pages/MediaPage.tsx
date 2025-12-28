/**
 * 媒體管理頁面 - 音樂上傳
 */

import React, { useState } from 'react';

const MediaPage: React.FC = () => {
    const [uploads, setUploads] = useState([
        { id: 1, name: 'baroque-ambient.mp3', theme: 'baroque', size: '4.2 MB', uploaded: '2024-12-28' },
        { id: 2, name: 'cyberpunk-ambient.mp3', theme: 'cyberpunk', size: '3.8 MB', uploaded: '2024-12-28' },
        { id: 3, name: 'celestial-ambient.mp3', theme: 'celestial', size: '5.1 MB', uploaded: '2024-12-28' },
    ]);

    const themeLabels: Record<string, string> = {
        baroque: '🏛️ 巴洛克',
        cyberpunk: '🌃 賽博龐克',
        celestial: '🌌 星空',
    };

    return (
        <div className="space-y-6">
            {/* 上傳區域 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 border-dashed">
                <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">🎵</span>
                    <p className="text-white font-medium mb-2">拖拽音樂檔案到這裡上傳</p>
                    <p className="text-gray-400 text-sm mb-4">支援 MP3, OGG, WAV (最大 20MB)</p>
                    <button className="px-6 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400">
                        選擇檔案
                    </button>
                </div>
            </div>

            {/* 已上傳音樂 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">🎶 已上傳音樂</h3>
                <div className="space-y-3">
                    {uploads.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black">
                                    ▶
                                </button>
                                <div>
                                    <p className="text-white font-medium">{file.name}</p>
                                    <p className="text-gray-400 text-sm">{file.size} · 上傳於 {file.uploaded}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                                    {themeLabels[file.theme]}
                                </span>
                                <select className="bg-gray-700 border-0 rounded-lg px-3 py-2 text-white text-sm">
                                    <option value="baroque">巴洛克</option>
                                    <option value="cyberpunk">賽博龐克</option>
                                    <option value="celestial">星空</option>
                                </select>
                                <button className="text-red-400 hover:text-red-300">刪除</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MediaPage;
