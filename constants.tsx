import { TarotCardData, SpreadDefinition, SpreadCategory } from './types';

// 使用本地牌組圖片 (card01)
const CARD_DECK_PATH = '/card01';

export const MAJOR_ARCANA: TarotCardData[] = [
  { id: 0, name: "The Fool", nameZh: "愚者", arcana: "Major", image: `${CARD_DECK_PATH}/0.webp`, meaning: "Beginning, spontaneity, faith.", reversedMeaning: "Naivety, recklessness, risk-taking." },
  { id: 1, name: "The Magician", nameZh: "魔術師", arcana: "Major", image: `${CARD_DECK_PATH}/1.webp`, meaning: "Manifestation, resourcefulness, power.", reversedMeaning: "Manipulation, poor planning, untapped talent." },
  { id: 2, name: "The High Priestess", nameZh: "女教皇", arcana: "Major", image: `${CARD_DECK_PATH}/2.webp`, meaning: "Intuition, sacred knowledge, subconscious.", reversedMeaning: "Secrets, disconnected from intuition, withdrawal." },
  { id: 3, name: "The Empress", nameZh: "皇后", arcana: "Major", image: `${CARD_DECK_PATH}/3.webp`, meaning: "Femininity, beauty, nature, abundance.", reversedMeaning: "Creative block, dependence on others." },
  { id: 4, name: "The Emperor", nameZh: "皇帝", arcana: "Major", image: `${CARD_DECK_PATH}/4.webp`, meaning: "Authority, structure, control, fatherhood.", reversedMeaning: "Tyranny, rigidity, lack of discipline." },
  { id: 5, name: "The Hierophant", nameZh: "教皇", arcana: "Major", image: `${CARD_DECK_PATH}/5.webp`, meaning: "Spiritual wisdom, tradition, conformity.", reversedMeaning: "Rebellion, subversion of new rules." },
  { id: 6, name: "The Lovers", nameZh: "戀人", arcana: "Major", image: `${CARD_DECK_PATH}/6.webp`, meaning: "Love, harmony, relationships, values.", reversedMeaning: "Self-love, disharmony, imbalance." },
  { id: 7, name: "The Chariot", nameZh: "戰車", arcana: "Major", image: `${CARD_DECK_PATH}/7.webp`, meaning: "Control, willpower, success, action.", reversedMeaning: "Self-discipline, opposition, lack of direction." },
  { id: 8, name: "Strength", nameZh: "力量", arcana: "Major", image: `${CARD_DECK_PATH}/8.webp`, meaning: "Strength, courage, persuasion, influence.", reversedMeaning: "Inner strength, self-doubt, raw emotion." },
  { id: 9, name: "The Hermit", nameZh: "隱士", arcana: "Major", image: `${CARD_DECK_PATH}/9.webp`, meaning: "Soul-searching, introspection, being alone.", reversedMeaning: "Isolation, loneliness, withdrawal." },
  { id: 10, name: "Wheel of Fortune", nameZh: "命運之輪", arcana: "Major", image: `${CARD_DECK_PATH}/10.webp`, meaning: "Good luck, karma, life cycles, destiny.", reversedMeaning: "Bad luck, resistance to change." },
  { id: 11, name: "Justice", nameZh: "正義", arcana: "Major", image: `${CARD_DECK_PATH}/11.webp`, meaning: "Justice, fairness, truth, cause and effect.", reversedMeaning: "Unfairness, lack of accountability, dishonesty." },
  { id: 12, name: "The Hanged Man", nameZh: "倒吊人", arcana: "Major", image: `${CARD_DECK_PATH}/12.webp`, meaning: "Pause, surrender, letting go, new perspective.", reversedMeaning: "Delays, resistance, stalling, indecision." },
  { id: 13, name: "Death", nameZh: "死亡", arcana: "Major", image: `${CARD_DECK_PATH}/13.webp`, meaning: "Endings, change, transformation, transition.", reversedMeaning: "Resistance to change, personal transformation." },
  { id: 14, name: "Temperance", nameZh: "節制", arcana: "Major", image: `${CARD_DECK_PATH}/14.webp`, meaning: "Balance, moderation, patience, purpose.", reversedMeaning: "Imbalance, excess, self-healing, re-alignment." },
  { id: 15, name: "The Devil", nameZh: "惡魔", arcana: "Major", image: `${CARD_DECK_PATH}/15.webp`, meaning: "Shadow self, attachment, addiction, restriction.", reversedMeaning: "Detaching, breaking free, reclaiming control." },
  { id: 16, name: "The Tower", nameZh: "高塔", arcana: "Major", image: `${CARD_DECK_PATH}/16.webp`, meaning: "Sudden change, upheaval, chaos, awakening.", reversedMeaning: "Personal transformation, fear of change, averting disaster." },
  { id: 17, name: "The Star", nameZh: "星星", arcana: "Major", image: `${CARD_DECK_PATH}/17.webp`, meaning: "Hope, faith, purpose, renewal, spirituality.", reversedMeaning: "Lack of faith, despair, self-trust, disconnection." },
  { id: 18, name: "The Moon", nameZh: "月亮", arcana: "Major", image: `${CARD_DECK_PATH}/18.webp`, meaning: "Illusion, fear, anxiety, subconscious, intuition.", reversedMeaning: "Release of fear, repressed emotion, confusion." },
  { id: 19, name: "The Sun", nameZh: "太陽", arcana: "Major", image: `${CARD_DECK_PATH}/19.webp`, meaning: "Positivity, fun, warmth, success, vitality.", reversedMeaning: "Inner child, feeling down, overly optimistic." },
  { id: 20, name: "Judgement", nameZh: "審判", arcana: "Major", image: `${CARD_DECK_PATH}/20.webp`, meaning: "Judgement, rebirth, inner calling, absolution.", reversedMeaning: "Self-doubt, inner-critic, ignoring the call." },
  { id: 21, name: "The World", nameZh: "世界", arcana: "Major", image: `${CARD_DECK_PATH}/21.webp`, meaning: "Completion, integration, accomplishment, travel.", reversedMeaning: "Seeking closure, shortcuts, delays." },
];

// 牌背圖片路徑
export const CARD_BACK_IMAGE = `${CARD_DECK_PATH}/back02.webp`;




// ...

// 問題分類資訊
export const SPREAD_CATEGORIES = {
  love: { id: SpreadCategory.LOVE, name: '感情', icon: '💕', color: '#ff6b9d' },
  career: { id: SpreadCategory.CAREER, name: '事業', icon: '💼', color: '#4a9eff' },
  money: { id: SpreadCategory.MONEY, name: '財運', icon: '💰', color: '#ffd700' },
  self: { id: SpreadCategory.SELF, name: '自我', icon: '🌟', color: '#9b59b6' },
  family: { id: SpreadCategory.FAMILY, name: '人際', icon: '🤝', color: '#2ecc71' },
  general: { id: SpreadCategory.GENERAL, name: '通用', icon: '🔮', color: '#d4af37' },
};

// 所有牌陣定義
export const SPREADS: Record<string, SpreadDefinition> = {
  // 💕 感情類
  LOVE_QUICK: {
    id: 'love_quick',
    name: 'Love Quick Read',
    nameZh: '戀愛快問',
    category: SpreadCategory.LOVE,
    description: '快速了解感情狀態',
    isVip: false,
    positions: [
      { key: 'self', name: '你的心', description: '你對這段關係的真實感受' },
      { key: 'other', name: '對方的心', description: '對方目前的態度' },
      { key: 'relation', name: '連結', description: '兩人之間的能量' },
    ]
  },
  LOVE_ANALYSIS: {
    id: 'love_analysis',
    name: 'Relationship Analysis',
    nameZh: '關係解析',
    category: SpreadCategory.LOVE,
    description: '深入分析關係全貌',
    isVip: false,
    positions: [
      { key: 'self', name: '自己', description: '你在關係中的狀態' },
      { key: 'other', name: '對方', description: '對方的狀態' },
      { key: 'relation', name: '連結', description: '當前的關係品質' },
      { key: 'obstacle', name: '挑戰', description: '需要面對的問題' },
      { key: 'advice', name: '指引', description: '建議的方向' },
    ]
  },
  LOVE_REUNION: {
    id: 'love_reunion',
    name: 'Reunion Possibility',
    nameZh: '復合可能',
    category: SpreadCategory.LOVE,
    description: '分手後的機會分析',
    isVip: false,
    positions: [
      { key: 'past', name: '過去', description: '分開的原因' },
      { key: 'present', name: '現狀', description: '雙方目前的心態' },
      { key: 'obstacle', name: '障礙', description: '復合的阻礙' },
      { key: 'outcome', name: '可能', description: '復合的機會' },
    ]
  },

  // 💼 事業類
  CAREER_DIRECTION: {
    id: 'career_direction',
    name: 'Career Direction',
    nameZh: '職涯方向',
    category: SpreadCategory.CAREER,
    description: '職業發展指引',
    isVip: false,
    positions: [
      { key: 'present', name: '現況', description: '目前的職業狀態' },
      { key: 'future', name: '潛力', description: '你的優勢與可能' },
      { key: 'advice', name: '建議', description: '下一步的方向' },
    ]
  },

  // 💰 財運類
  MONEY_QUICK: {
    id: 'money_quick',
    name: 'Fortune Quick Read',
    nameZh: '財運速看',
    category: SpreadCategory.MONEY,
    description: '近期財運趨勢',
    isVip: false,
    positions: [
      { key: 'future', name: '收入', description: '進財的可能' },
      { key: 'obstacle', name: '支出', description: '花費的警示' },
      { key: 'advice', name: '建議', description: '理財方向' },
    ]
  },

  // 🌟 自我類
  SELF_EXPLORATION: {
    id: 'self_exploration',
    name: 'Soul Exploration',
    nameZh: '靈魂探索',
    category: SpreadCategory.SELF,
    description: '探索內在自我',
    isVip: false,
    positions: [
      { key: 'self', name: '意識', description: '你意識到的自己' },
      { key: 'present', name: '潛意識', description: '隱藏的內在' },
      { key: 'obstacle', name: '陰影', description: '需要面對的課題' },
    ]
  },
  SELF_LESSON: {
    id: 'self_lesson',
    name: 'Life Lesson',
    nameZh: '課題解析',
    category: SpreadCategory.SELF,
    description: '現階段的人生課題',
    isVip: false,
    positions: [
      { key: 'present', name: '課題', description: '你正在學習的功課' },
      { key: 'obstacle', name: '阻礙', description: '阻止你前進的因素' },
      { key: 'self', name: '力量', description: '你擁有的內在資源' },
      { key: 'future', name: '成長', description: '可能的突破方向' },
    ]
  },

  // 👨‍👩‍👧 家庭類
  FAMILY_HARMONY: {
    id: 'family_harmony',
    name: 'Family Harmony',
    nameZh: '家庭和諧',
    category: SpreadCategory.FAMILY,
    description: '家庭關係分析',
    isVip: false,
    positions: [
      { key: 'self', name: '自己', description: '你在家庭中的角色' },
      { key: 'other', name: '家人', description: '家人的狀態' },
      { key: 'relation', name: '互動', description: '彼此的關係動態' },
      { key: 'advice', name: '建議', description: '改善關係的方向' },
    ]
  },
  RELATIONSHIP: {
    id: 'relationship',
    name: 'Interpersonal',
    nameZh: '人際關係',
    category: SpreadCategory.FAMILY,
    description: '與他人的關係分析',
    isVip: false,
    positions: [
      { key: 'self', name: '自己', description: '你的狀態' },
      { key: 'other', name: '對方', description: '對方的狀態' },
      { key: 'relation', name: '連結', description: '關係的本質' },
    ]
  },

  // 🔮 通用類
  THREE_CARD: {
    id: 'three_card',
    name: 'Past Present Future',
    nameZh: '時間之流',
    category: SpreadCategory.GENERAL,
    description: '過去、現在、未來',
    isVip: false,
    positions: [
      { key: 'past', name: '過去', description: '影響現況的過去因素' },
      { key: 'present', name: '現在', description: '當前狀態' },
      { key: 'future', name: '未來', description: '可能的發展方向' },
    ]
  },
  CELTIC_CROSS: {
    id: 'celtic_cross',
    name: 'Celtic Cross',
    nameZh: '凱爾特十字',
    category: SpreadCategory.GENERAL,
    description: '經典深度分析',
    isVip: false, // 暫時開放測試
    defaultScenario: 'celtic_cross',
    positions: [
      { key: 'significator', name: '核心', description: '當前處境的核心' },
      { key: 'crossing', name: '障礙', description: '橫跨的挑戰或影響' },
      { key: 'foundation', name: '基礎', description: '情況的根源' },
      { key: 'recent_past', name: '近過去', description: '剛過去的影響' },
      { key: 'crown', name: '可能', description: '最佳可能結果' },
      { key: 'near_future', name: '近未來', description: '即將發生的事' },
      { key: 'self', name: '自我', description: '你對情況的態度' },
      { key: 'environment', name: '環境', description: '外在環境的影響' },
      { key: 'hopes_fears', name: '希望與恐懼', description: '內心的期待與擔憂' },
      { key: 'outcome', name: '結果', description: '最終可能的結局' },
    ]
  },
  YEARLY: {
    id: 'yearly',
    name: 'Year Ahead',
    nameZh: '年度運勢',
    category: SpreadCategory.GENERAL,
    description: '12個月預測',
    isVip: false, // 暫時開放測試
    defaultScenario: 'yearly',
    positions: [
      { key: 'jan', name: '一月', description: '一月運勢' },
      { key: 'feb', name: '二月', description: '二月運勢' },
      { key: 'mar', name: '三月', description: '三月運勢' },
      { key: 'apr', name: '四月', description: '四月運勢' },
      { key: 'may', name: '五月', description: '五月運勢' },
      { key: 'jun', name: '六月', description: '六月運勢' },
      { key: 'jul', name: '七月', description: '七月運勢' },
      { key: 'aug', name: '八月', description: '八月運勢' },
      { key: 'sep', name: '九月', description: '九月運勢' },
      { key: 'oct', name: '十月', description: '十月運勢' },
      { key: 'nov', name: '十一月', description: '十一月運勢' },
      { key: 'dec', name: '十二月', description: '十二月運勢' },
    ]
  },
};

// 根據分類獲取牌陣列表
export const getSpreadsByCategory = (category: string) => {
  return Object.values(SPREADS).filter(spread => spread.category === category);
};

// 獲取所有可用牌陣（根據 VIP 狀態）
export const getAvailableSpreads = (isVip: boolean) => {
  return Object.values(SPREADS).filter(spread => !spread.isVip || isVip);
};
