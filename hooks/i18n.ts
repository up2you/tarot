/**
 * i18n 設定與初始化
 * 支援語言：繁體中文、英文、日文、韓文、簡體中文
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ── 靜態匯入所有翻譯資源 ──────────────────────────────────────
// zh-TW
import zhTWUi from '../locales/zh-TW/ui.json';
import zhTWCards from '../locales/zh-TW/cards.json';
import zhTWSpreads from '../locales/zh-TW/spreads.json';
// en
import enUi from '../locales/en/ui.json';
import enCards from '../locales/en/cards.json';
import enSpreads from '../locales/en/spreads.json';
// ja
import jaUi from '../locales/ja/ui.json';
import jaCards from '../locales/ja/cards.json';
import jaSpreads from '../locales/ja/spreads.json';
// ko
import koUi from '../locales/ko/ui.json';
import koCards from '../locales/ko/cards.json';
import koSpreads from '../locales/ko/spreads.json';
// zh-CN
import zhCNUi from '../locales/zh-CN/ui.json';
import zhCNCards from '../locales/zh-CN/cards.json';
import zhCNSpreads from '../locales/zh-CN/spreads.json';

// ── 支援的語言清單 ────────────────────────────────────────────
export const SUPPORTED_LANGUAGES = [
  { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
  { code: 'en',    label: 'English',  flag: '🇺🇸' },
  { code: 'ja',    label: '日本語',   flag: '🇯🇵' },
  { code: 'ko',    label: '한국어',   flag: '🇰🇷' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];

// ── i18n 初始化 ───────────────────────────────────────────────
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-TW': { ui: zhTWUi, cards: zhTWCards, spreads: zhTWSpreads },
      'en':    { ui: enUi,   cards: enCards,   spreads: enSpreads   },
      'ja':    { ui: jaUi,   cards: jaCards,   spreads: jaSpreads   },
      'ko':    { ui: koUi,   cards: koCards,   spreads: koSpreads   },
      'zh-CN': { ui: zhCNUi, cards: zhCNCards, spreads: zhCNSpreads },
    },
    lng: undefined,          // 讓 LanguageDetector 決定
    fallbackLng: 'zh-TW',   // 找不到翻譯時 fallback 到繁中
    defaultNS: 'ui',        // 預設 namespace
    ns: ['ui', 'cards', 'spreads'],
    detection: {
      // 偵測順序：localStorage → 瀏覽器語言
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'aetheris_language',
      caches: ['localStorage'],
    },
    supportedLngs: ['zh-TW', 'en', 'ja', 'ko', 'zh-CN'],
    interpolation: {
      escapeValue: false, // React 已做 XSS 防護
    },
  });

export default i18n;
