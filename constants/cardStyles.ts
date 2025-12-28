/**
 * 塔羅牌面風格定義
 * 13 種風格供用戶選擇
 */

export interface CardStyle {
    id: string;
    name: string;
    nameZh: string;
    description: string;
    preview: string; // 預覽圖路徑
    primaryColor: string;
    isVip?: boolean;
    isComingSoon?: boolean;
}

export const CARD_STYLES: CardStyle[] = [
    // 預設風格
    {
        id: 'classic',
        name: 'Classic Mystical',
        nameZh: '經典神秘',
        description: '原始經典塔羅設計',
        preview: '/cards/classic/preview.jpg',
        primaryColor: '#d4af37',
        isVip: false,
    },
    // 12 種新風格
    {
        id: 'baroque_divine',
        name: 'Baroque Divine',
        nameZh: '巴洛克宮廷',
        description: '17世紀宮廷華麗風格',
        preview: '/cards/baroque_divine/preview.jpg',
        primaryColor: '#c9a227',
        isComingSoon: true,
    },
    {
        id: 'art_nouveau',
        name: 'Art Nouveau Ethereal',
        nameZh: '新藝術空靈',
        description: '慕夏風格的優雅曲線',
        preview: '/cards/art_nouveau/preview.jpg',
        primaryColor: '#8b7355',
        isComingSoon: true,
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk Oracle',
        nameZh: '賽博龐克',
        description: '霓虹未來科技風',
        preview: '/cards/cyberpunk/preview.jpg',
        primaryColor: '#00fff9',
        isComingSoon: true,
    },
    {
        id: 'dark_fantasy',
        name: 'Dark Fantasy',
        nameZh: '黑暗奇幻',
        description: '哥德式暗黑美學',
        preview: '/cards/dark_fantasy/preview.jpg',
        primaryColor: '#4a0e0e',
        isComingSoon: true,
    },
    {
        id: 'watercolor',
        name: 'Watercolor Dreams',
        nameZh: '水彩夢境',
        description: '夢幻水彩暈染風',
        preview: '/cards/watercolor/preview.jpg',
        primaryColor: '#7eb8da',
        isComingSoon: true,
    },
    {
        id: 'ukiyo_e',
        name: 'Japanese Ukiyo-e',
        nameZh: '浮世繪',
        description: '日式傳統浮世繪風',
        preview: '/cards/ukiyo_e/preview.jpg',
        primaryColor: '#c41e3a',
        isComingSoon: true,
    },
    {
        id: 'stained_glass',
        name: 'Stained Glass',
        nameZh: '教堂花窗',
        description: '玻璃花窗彩繪風',
        preview: '/cards/stained_glass/preview.jpg',
        primaryColor: '#1e90ff',
        isComingSoon: true,
    },
    {
        id: 'minimalist',
        name: 'Minimalist Modern',
        nameZh: '極簡現代',
        description: '簡約線條現代風',
        preview: '/cards/minimalist/preview.jpg',
        primaryColor: '#2c2c2c',
        isComingSoon: true,
    },
    {
        id: 'cosmic',
        name: 'Cosmic Psychedelic',
        nameZh: '宇宙迷幻',
        description: '迷幻太空銀河風',
        preview: '/cards/cosmic/preview.jpg',
        primaryColor: '#8b5cf6',
        isComingSoon: true,
    },
    {
        id: 'egyptian',
        name: 'Ancient Egyptian',
        nameZh: '古埃及',
        description: '法老時代神秘風',
        preview: '/cards/egyptian/preview.jpg',
        primaryColor: '#daa520',
        isComingSoon: true,
    },
    {
        id: 'celtic',
        name: 'Celtic Mystical',
        nameZh: '凱爾特神秘',
        description: '凱爾特結繩圖騰',
        preview: '/cards/celtic/preview.jpg',
        primaryColor: '#228b22',
        isComingSoon: true,
    },
    {
        id: 'botanical',
        name: 'Vintage Botanical',
        nameZh: '復古植物',
        description: '維多利亞植物插畫',
        preview: '/cards/botanical/preview.jpg',
        primaryColor: '#6b8e23',
        isComingSoon: true,
    },
];

// 獲取可用的風格（排除 coming soon）
export const getAvailableStyles = () =>
    CARD_STYLES.filter(s => !s.isComingSoon);

// 獲取指定風格
export const getCardStyle = (id: string) =>
    CARD_STYLES.find(s => s.id === id) || CARD_STYLES[0];
