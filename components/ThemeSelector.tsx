/**
 * 主題選擇器元件
 * 浮動在首頁角落，點擊展開選擇主題
 */

import React, { useState } from 'react';
import { useTheme, Theme, ThemeId } from '../hooks/useTheme';

const ThemeSelector: React.FC = () => {
    const { currentTheme, setTheme, themes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const currentThemeInfo = themes.find(t => t.id === currentTheme)!;

    return (
        <div className="fixed top-6 right-6 z-[100]">
            {/* 觸發按鈕 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{
                    background: `linear-gradient(135deg, ${currentThemeInfo.primaryColor}20, ${currentThemeInfo.primaryColor}40)`,
                    border: `2px solid ${currentThemeInfo.primaryColor}40`,
                    boxShadow: `0 0 20px ${currentThemeInfo.primaryColor}20`
                }}
                title="切換主題"
            >
                <span className="text-xl">{currentThemeInfo.icon}</span>
            </button>

            {/* 展開選單 */}
            {isOpen && (
                <>
                    {/* 背景遮罩 */}
                    <div
                        className="fixed inset-0 bg-black/50 z-[-1]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 主題選項 */}
                    <div
                        className="absolute top-14 right-0 w-64 rounded-2xl overflow-hidden animate-fade-up"
                        style={{
                            background: 'rgba(0,0,0,0.9)',
                            border: `1px solid ${currentThemeInfo.primaryColor}30`,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
                        }}
                    >
                        <div className="p-4 border-b" style={{ borderColor: `${currentThemeInfo.primaryColor}20` }}>
                            <p className="text-xs font-cinzel tracking-widest uppercase" style={{ color: `${currentThemeInfo.primaryColor}60` }}>
                                選擇主題風格
                            </p>
                        </div>

                        <div className="p-2">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => {
                                        setTheme(theme.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${currentTheme === theme.id ? 'bg-white/10' : 'hover:bg-white/5'
                                        }`}
                                >
                                    {/* 主題圖示 + 顏色預覽 */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${theme.primaryColor}30, ${theme.primaryColor}60)`,
                                            border: `2px solid ${theme.primaryColor}`
                                        }}
                                    >
                                        <span className="text-lg">{theme.icon}</span>
                                    </div>

                                    {/* 主題名稱 */}
                                    <div className="flex-1">
                                        <p
                                            className="font-cinzel font-bold tracking-wider"
                                            style={{ color: theme.primaryColor }}
                                        >
                                            {theme.nameZh}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-lora italic">
                                            {theme.description}
                                        </p>
                                    </div>

                                    {/* 選中標記 */}
                                    {currentTheme === theme.id && (
                                        <span style={{ color: theme.primaryColor }}>✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ThemeSelector;
