/**
 * 22 張大阿爾卡納的東方屬性表
 * 用於東方智慧視角的規則式「神諭總結」與意象建構
 * 屬性：陰陽（energy）、五行（element）、卦象（hexagram）、核心意象（image）
 */

export interface EasternCardAttribute {
  cardId: number;
  cardName: string;
  /** 陰陽：陽 = 主動/顯化/向外；陰 = 靜守/內觀/向內 */
  yinYang: '陽' | '陰';
  /** 五行歸屬 */
  element: '木' | '火' | '土' | '金' | '水';
  /** 易經卦象對應 */
  hexagram: string;
  /** 東方核心意象（一句話） */
  image: string;
}

export const EASTERN_CARD_ATTRIBUTES: EasternCardAttribute[] = [
  { cardId: 0,  cardName: '愚者',   yinYang: '陽', element: '木', hexagram: '屯卦', image: '破土而出的新芽，無畏天地' },
  { cardId: 1,  cardName: '魔術師', yinYang: '陽', element: '火', hexagram: '乾卦', image: '執掌四方的創造之火' },
  { cardId: 2,  cardName: '女教皇', yinYang: '陰', element: '水', hexagram: '坎卦', image: '深潭映月，靜觀萬象' },
  { cardId: 3,  cardName: '皇后',   yinYang: '陰', element: '土', hexagram: '坤卦', image: '厚德載物，萬物滋生' },
  { cardId: 4,  cardName: '皇帝',   yinYang: '陽', element: '金', hexagram: '乾卦', image: '剛健中正，立規建制' },
  { cardId: 5,  cardName: '教皇',   yinYang: '陽', element: '土', hexagram: '艮卦', image: '如如不動的傳道之山' },
  { cardId: 6,  cardName: '戀人',   yinYang: '陰', element: '木', hexagram: '咸卦', image: '陰陽和合，兩木相倚' },
  { cardId: 7,  cardName: '戰車',   yinYang: '陽', element: '火', hexagram: '大有卦', image: '驅駕烈火的征伐之車' },
  { cardId: 8,  cardName: '力量',   yinYang: '陰', element: '土', hexagram: '謙卦', image: '柔能克剛，靜能馭動' },
  { cardId: 9,  cardName: '隱士',   yinYang: '陰', element: '水', hexagram: '蒙卦', image: '孤燈照夜，內求其明' },
  { cardId: 10, cardName: '命運之輪', yinYang: '陽', element: '木', hexagram: '復卦', image: '周而復始的天道循環' },
  { cardId: 11, cardName: '正義',   yinYang: '陽', element: '金', hexagram: '中孚卦', image: '持衡立斷，不偏不倚' },
  { cardId: 12, cardName: '倒吊人', yinYang: '陰', element: '水', hexagram: '蹇卦', image: '以退為進，反觀自照' },
  { cardId: 13, cardName: '死亡',   yinYang: '陽', element: '金', hexagram: '革卦', image: '革故鼎新，死而後生' },
  { cardId: 14, cardName: '節制',   yinYang: '陰', element: '水', hexagram: '既濟卦', image: '水火既濟，陰陽調和' },
  { cardId: 15, cardName: '惡魔',   yinYang: '陰', element: '土', hexagram: '困卦', image: '塵埃蒙心，執念為鎖' },
  { cardId: 16, cardName: '高塔',   yinYang: '陽', element: '火', hexagram: '噬嗑卦', image: '雷霆擊頂，破而後立' },
  { cardId: 17, cardName: '星星',   yinYang: '陰', element: '水', hexagram: '渙卦', image: '暗夜引路，清泉滌心' },
  { cardId: 18, cardName: '月亮',   yinYang: '陰', element: '水', hexagram: '明夷卦', image: '月暈而風，迷中見真' },
  { cardId: 19, cardName: '太陽',   yinYang: '陽', element: '火', hexagram: '晉卦', image: '旭日東昇，光明普照' },
  { cardId: 20, cardName: '審判',   yinYang: '陽', element: '金', hexagram: '夬卦', image: '晨鐘暮鼓，喚醒自性' },
  { cardId: 21, cardName: '世界',   yinYang: '陰', element: '土', hexagram: '泰卦', image: '天地交泰，圓滿歸一' },
];

/** 依 cardId 查東方屬性 */
export function getEasternAttribute(cardId: number): EasternCardAttribute | undefined {
  return EASTERN_CARD_ATTRIBUTES.find(a => a.cardId === cardId);
}

/**
 * 五行相生：木→火→土→金→水→木
 */
export const ELEMENT_GENERATES: Record<string, string> = {
  木: '火', 火: '土', 土: '金', 金: '水', 水: '木',
};

/**
 * 五行相剋：木剋土、土剋水、水剋火、火剋金、金剋木
 */
export const ELEMENT_CONTROLS: Record<string, string> = {
  木: '土', 土: '水', 水: '火', 火: '金', 金: '木',
};
