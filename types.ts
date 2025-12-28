
export interface TarotCardData {
  id: number;
  name: string;
  nameZh: string;
  arcana: 'Major' | 'Minor';
  image: string;
  meaning: string;
  reversedMeaning: string;
}

export interface CardReading {
  card: TarotCardData;
  isReversed: boolean;
  position: string;
}

// 本地儲存的占卜記錄
export interface ReadingRecord {
  id: string;                    // UUID
  timestamp: number;             // Unix timestamp
  question: string;              // 問題
  cards: {
    name: string;
    nameZh: string;
    position: string;
    isReversed: boolean;
  }[];
  interpretation?: string;       // 第一條 AI 回應摘要
  theme: AppTheme;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppTheme {
  BAROQUE = 'Baroque',
  CYBERPUNK = 'Cyberpunk',
  CELESTIAL = 'Celestial'
}

export interface User {
  username: string;
  displayName?: string;
  joinedDate: number;
  readingsCount: number;
  spending: number;
  isVip: boolean;
  bio?: string;
  theme: AppTheme;
  provider?: 'local' | 'google';
}

export enum AppState {
  AUTH,
  WELCOME,
  SELECT_SPREAD,  // 新增：選擇牌陣
  SHUFFLING,
  SPREADING,
  READING,
  INTERACTIVE,
  PROFILE,
  HISTORY
}

// 問題分類
export enum SpreadCategory {
  LOVE = 'love',
  CAREER = 'career',
  MONEY = 'money',
  SELF = 'self',
  FAMILY = 'family',
  GENERAL = 'general'
}

// 牌陣位置定義
export interface SpreadPosition {
  key: string;
  name: string;
  description: string;
}

// 牌陣定義
export interface SpreadDefinition {
  id: string;
  name: string;
  nameZh: string;
  category: SpreadCategory;
  positions: SpreadPosition[];
  description: string;
  isVip: boolean;
}
