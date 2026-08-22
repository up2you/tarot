/**
 * AI 占卜解讀服務
 * 支援 DeepSeek API (OpenAI 相容格式) - 串流回應版本
 */

import { CardReading } from "../types";

// 獲取 API Key
const getApiKey = (): string => {
  // @ts-ignore - process.env 由 vite.config.ts define 注入
  const key = process.env.DEEPSEEK_API_KEY || '';
  return key;
};

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// 各語言的角色名稱與語氣指令
// 注意：style 刻意避免「宮廷/神祕」等誘發文言文的詞彙，改用現代白話導師定位
const ORACLE_PERSONAS: Record<string, { name: string; lang: string; style: string; locale: string }> = {
  'zh-TW': { name: '艾瑟瑞爾', lang: '繁體中文', style: '溫暖真誠、有智慧與洞見的現代塔羅導師，用白話口語解讀', locale: 'zh-TW' },
  'zh-CN': { name: '艾瑟瑞尔', lang: '简体中文', style: '温暖真诚、有智慧与洞见的现代塔罗导师，用白话口语解读', locale: 'zh-CN' },
  'en':    { name: 'Aetheriel', lang: 'English', style: 'warm, sincere, wise and insightful modern tarot guide speaking in plain language', locale: 'en' },
  'ja':    { name: 'エーセリエル', lang: '日本語', style: '温かく誠実で、知恵と洞察に満ちた現代のタロットガイド。平易な口語で', locale: 'ja' },
  'ko':    { name: '에테리엘', lang: '한국어', style: '따뜻하고 진실하며 지혜와 통찰이 있는 현대 타로 가이드. 쉬운 구어체로', locale: 'ko' },
};

// 簡易 Chat 類別來維持對話狀態 (支援串流)
export class DeepSeekChat {
  private messages: { role: string; content: string }[];
  private apiKey: string;

  constructor(systemPrompt: string, apiKey: string) {
    this.apiKey = apiKey;
    this.messages = [{ role: 'system', content: systemPrompt }];
  }

  // 非串流版本 (用於追問)
  async sendMessage(message: { message: string }): Promise<{ text: string }> {
    this.messages.push({ role: 'user', content: message.message });

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: this.messages,
        temperature: 0.8,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || '無法取得回應';
    this.messages.push({ role: 'assistant', content: assistantMessage });

    return { text: assistantMessage };
  }

  // 串流版本 - 用於首次解讀
  async sendMessageStream(
    message: { message: string },
    onChunk: (chunk: string, fullText: string) => void
  ): Promise<{ text: string }> {
    this.messages.push({ role: 'user', content: message.message });

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: this.messages,
        temperature: 0.8,
        max_tokens: 4096,
        stream: true  // 啟用串流
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API Error: ${response.status} - ${errorText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    if (!reader) {
      throw new Error('Response body is null');
    }

    // 讀取串流
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) {
              fullText += content;
              onChunk(content, fullText);
            }
          } catch (e) {
            // 忽略解析錯誤
          }
        }
      }
    }

    this.messages.push({ role: 'assistant', content: fullText });
    return { text: fullText };
  }
}

// 建立塔羅解讀的 System Prompt
export function buildTarotSystemPrompt(userQuestion: string, spread: CardReading[], language: string = 'zh-TW'): string {
  const persona = ORACLE_PERSONAS[language] || ORACLE_PERSONAS['zh-TW'];
  const labels: Record<string, { upright: string; reversed: string; essence: string; causality: string; finalOracle: string; opening: string }> = {
    'zh-TW': { upright: '正位', reversed: '逆位', essence: '牌面本質', causality: '命運因果', finalOracle: '艾瑟瑞爾的最終神諭', opening: '在聖殿的穹頂之下...' },
    'zh-CN': { upright: '正位', reversed: '逆位', essence: '牌面本质', causality: '命运因果', finalOracle: '艾瑟瑞尔的最终神谕', opening: '在圣殿的穹顶之下...' },
    'en':    { upright: 'Upright', reversed: 'Reversed', essence: 'Card Essence', causality: 'Fate & Causality', finalOracle: "Aetheriel's Final Oracle", opening: 'Beneath the sacred dome...' },
    'ja':    { upright: '正位置', reversed: '逆位置', essence: '札の本質', causality: '運命の因果', finalOracle: 'エーセリエルの最終神託', opening: '聖なるドームの下で...' },
    'ko':    { upright: '정위치', reversed: '역위치', essence: '카드의 본질', causality: '운명의 인과', finalOracle: '에테리엘의 최종 신탁', opening: '성스러운 돔 아래에서...' },
  };
  const L = labels[persona.locale] || labels['zh-TW'];

  const spreadDetails = spread.map(s =>
    `${s.position}: ${s.card.nameZh} (${s.isReversed ? L.reversed : L.upright})`
  ).join('\n');

  return `你是一位資深的塔羅解讀師「${persona.name}」，擅長用溫暖真誠的現代白話為人解惑。

【當前尋求者問題】 「${userQuestion}」
【神諭牌陣】
${spreadDetails}

【${persona.name}的解讀聖律 —— 請嚴格執行排版】

1. **結構分明 (嚴格使用 Markdown)**:
   - **第一段 (導讀)**: 必須以「${L.opening}」這段優美的文字開頭。
   - **單張解讀**: 請為每張牌建立極具儀式感的區塊。
     **核心要求：**
     - **主標題 (h2)**：格式為「牌位：隱喻標題 —— 牌名 (${L.upright}/${L.reversed})」。**嚴禁出現【】或()括號包圍整個標題**。
     - **副標題 (h3)**：僅限「${L.essence}」與「${L.causality}」。**嚴禁使用左右橫杠（如 — ${L.essence} —）**。

     ## ${spread[0]?.position}：隱喻標題 —— ${spread[0]?.card.nameZh} (${spread[0]?.isReversed ? L.reversed : L.upright})

     ### ${L.essence}
     描述該牌的視覺意象。

     ### ${L.causality}
     對問題「${userQuestion}」的深層剖析。

   - 每張牌解讀之間使用 "---" 分隔。
   - **最終神諭**: 使用 "# ${L.finalOracle}：主題名稱"。

2. **靈魂染色系統**:
   - 凡涉及「背叛、終結、深淵、恐懼、危險」等詞彙，使用 <span class="highlight-crimson">詞彙</span>。
   - 凡涉及「啟示、轉機、權力、聖光、重生」等詞彙，使用 <span class="highlight-gold">詞彙</span>。
   - 重要的結論性句子請加 **粗體**。

3. **語氣規範**:
   - 用${persona.lang}回答，語氣必須具備 ${persona.style}。
   - **禁止使用文言文或古語**（如「汝」「吾」「之乎者也」「矣」「焉」），全程使用${persona.lang}的現代白話口語，讓一般使用者能輕鬆讀懂。`;
}

// 建立塔羅解讀 session (串流版本)
export function createTarotSession(userQuestion: string, spread: CardReading[], language: string = 'zh-TW') {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('DeepSeek API Key not configured');
  }

  const systemPrompt = buildTarotSystemPrompt(userQuestion, spread, language);
  const chat = new DeepSeekChat(systemPrompt, apiKey);

  return chat;
}

// ============================================================
// 🎭 雙透鏡解讀：東方智慧視角
// 同一牌面，以東方智慧（道家 / 易經 / 陰陽 / 冥想心法）重新詮釋
// 與西方塔羅原型形成對照，提供更全面的啟示
// ============================================================

export type ReadingLens = 'western' | 'eastern';

// 東方視角的語言標籤
const EASTERN_LABELS: Record<string, { lens: string; essence: string; guidance: string; closing: string; opening: string }> = {
  'zh-TW': { lens: '東方智慧視角', essence: '象外之意', guidance: '心法指引', closing: '靜觀之悟', opening: '靜下心來，觀照這幅牌景...' },
  'zh-CN': { lens: '东方智慧视角', essence: '象外之意', guidance: '心法指引', closing: '静观之悟', opening: '静下心来，观照这幅牌景...' },
  'en':    { lens: 'Eastern Wisdom Lens', essence: 'Beyond the Symbol', guidance: 'Mindful Guidance', closing: 'The Still Insight', opening: 'Still your mind and behold this tableau...' },
  'ja':    { lens: '東洋の智慧の視点', essence: '象の奥の意味', guidance: '心法の導き', closing: '静観の悟り', opening: '心を静めて、この景色を観照しましょう...' },
  'ko':    { lens: '동양 지혜의 시선', essence: '상징 너머의 뜻', guidance: '마음의 지침', closing: '고요한 깨달음', opening: '마음을 가라앉히고 이 장면을 관조하세요...' },
};

// 建立東方智慧視角的 System Prompt
export function buildEasternSystemPrompt(userQuestion: string, spread: CardReading[], language: string = 'zh-TW'): string {
  const persona = ORACLE_PERSONAS[language] || ORACLE_PERSONAS['zh-TW'];
  const L = EASTERN_LABELS[persona.locale] || EASTERN_LABELS['zh-TW'];

  const spreadDetails = spread.map(s =>
    `${s.position}: ${s.card.nameZh} (${s.isReversed ? (persona.locale === 'en' ? 'Reversed' : persona.locale === 'ja' ? '逆位置' : persona.locale === 'ko' ? '역위치' : '逆位') : (persona.locale === 'en' ? 'Upright' : persona.locale === 'ja' ? '正位置' : persona.locale === 'ko' ? '정위치' : '正位')})`
  ).join('\n');

  return `你是一位融合東方智慧的冥想導師「${persona.name}」，擅長以道家、易經與陰陽哲學的角度解讀牌卡，用現代白話為人指點迷津。

【當前尋求者問題】 「${userQuestion}」
【牌陣】
${spreadDetails}

【${L.lens} —— 請嚴格執行排版】

1. **結構分明 (嚴格使用 Markdown)**:
   - **第一段 (導讀)**: 必須以「${L.opening}」開頭，引導尋求者進入靜觀狀態。
   - **單張解讀**: 為每張牌建立冥想式區塊。
     - **主標題 (h2)**：格式為「牌位：意象 —— 牌名 (${persona.locale === 'en' ? 'Upright/Reversed' : persona.locale === 'ja' ? '正位置/逆位置' : persona.locale === 'ko' ? '정위치/역위치' : '正位/逆位'})」。
     - **副標題 (h3)**：僅限「${L.essence}」與「${L.guidance}」。
     - ${L.essence}：描述這張牌在東方智慧下的象徵——如陰陽消長、五行流轉、時位之道。
     - ${L.guidance}：對問題「${userQuestion}」的心法指引——如「順勢而為」「守靜致虛」「以柔克剛」。
   - 每張牌之間使用 "---" 分隔。
   - **結尾**: 使用 "# ${L.closing}：[主題名稱]"。

2. **語氣規範**:
   - 用${persona.lang}回答，語氣${persona.style}，帶著東方智慧的從容與通透。
   - **禁止使用文言文或古語**（如「汝」「吾」「之乎者也」「矣」「焉」），全程使用${persona.lang}的現代白話，讓一般使用者能輕鬆讀懂。
   - 避免宿命論與恐嚇性語言，強調「調和」「覺察」「順應自然」的正面引導。`;
}

// 建立東方視角 session
export function createEasternTarotSession(userQuestion: string, spread: CardReading[], language: string = 'zh-TW') {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('DeepSeek API Key not configured');
  }

  const systemPrompt = buildEasternSystemPrompt(userQuestion, spread, language);
  const chat = new DeepSeekChat(systemPrompt, apiKey);

  return chat;
}

// 舊版 startTarotSession (保持向後兼容，但現在不再使用)
export async function startTarotSession(
  userQuestion: string,
  spread: CardReading[],
  isPremium: boolean = false
) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('DeepSeek API Key not configured');
  }

  const systemPrompt = buildTarotSystemPrompt(userQuestion, spread);
  const chat = new DeepSeekChat(systemPrompt, apiKey);
  const response = await chat.sendMessage({ message: "神諭已降臨，請艾瑟瑞爾揭示真相。" });

  return { chat, initialInterpretation: response.text };
}

/**
 * 混合模式專用：為免費用戶生成 AI 總結
 * 根據用戶的具體問題與模板解釋，生成一段針對性的最終神諭
 */
export async function generateAISummary(
  userQuestion: string,
  spread: { cardName: string; isReversed: boolean; position: string; interpretation: string }[],
  language: string = 'zh-TW'
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) return '';

  const persona = ORACLE_PERSONAS[language] || ORACLE_PERSONAS['zh-TW'];
  const labels: Record<string, { upright: string; reversed: string; finalOracle: string }> = {
    'zh-TW': { upright: '正位', reversed: '逆位', finalOracle: '艾瑟瑞爾的最終神諭' },
    'zh-CN': { upright: '正位', reversed: '逆位', finalOracle: '艾瑟瑞尔的最终神谕' },
    'en':    { upright: 'Upright', reversed: 'Reversed', finalOracle: "Aetheriel's Final Oracle" },
    'ja':    { upright: '正位置', reversed: '逆位置', finalOracle: 'エーセリエルの最終神託' },
    'ko':    { upright: '정위치', reversed: '역위치', finalOracle: '에테리엘의 최종 신탁' },
  };
  const L = labels[persona.locale] || labels['zh-TW'];

  const cardDetails = spread.map(s =>
    `${s.position} - ${s.cardName} (${s.isReversed ? L.reversed : L.upright}) - ${s.interpretation}`
  ).join('\n\n');

  const prompt = `你是一位資深的塔羅解讀師「${persona.name}」。
現在有一位尋求者提出了問題：「${userQuestion}」

以下是這次占卜抽出的牌面及其基本含義：
${cardDetails}

請根據以上訊息，為尋求者寫一段「最終神諭總結」。
要求：
1. **使用${persona.lang}的白話口語**，就像一位溫暖的朋友在說話，清楚易懂，絕對不要使用文言文或古語（如「汝」「吾」「之乎者也」）。
2. **必須正面回答尋求者的問題**，絕對不能答非所問。請將牌面能量轉化為對問題的直接啟示。
3. 語氣親切而真誠，帶有智慧與洞見，但保持現代白話的敘事感。
4. 使用 Markdown 格式。
5. 結構：先寫 1-2 段深度分析，最後以「# ${L.finalOracle}：[主題名稱]」作為標題結尾。
6. 總長度約 200 字左右。`;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      console.error('AI Summary Error:', response.status);
      return '';
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('AI Summary Fetch Error:', err);
    return '';
  }
}
