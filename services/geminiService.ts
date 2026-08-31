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

export type ReadingLens = 'western' | 'eastern' | 'compare';

// 東方視角的語言標籤
const EASTERN_LABELS: Record<string, { lens: string; essence: string; guidance: string; closing: string; opening: string }> = {
  'zh-TW': { lens: '東方智慧視角', essence: '觀象', guidance: '應時', closing: '歸一神諭', opening: '靜下心來，觀照這幅牌景...' },
  'zh-CN': { lens: '东方智慧视角', essence: '观象', guidance: '应时', closing: '归一神谕', opening: '静下心来，观照这幅牌景...' },
  'en':    { lens: 'Eastern Wisdom Lens', essence: 'Beholding', guidance: 'Timely Response', closing: 'The Onefold Oracle', opening: 'Still your mind and behold this tableau...' },
  'ja':    { lens: '東洋の智慧の視点', essence: '観象', guidance: '応時', closing: '帰一の神託', opening: '心を静めて、この景色を観照しましょう...' },
  'ko':    { lens: '동양 지혜의 시선', essence: '관상', guidance: '응시', closing: '귀일의 신탁', opening: '마음을 가라앉히고 이 장면을 관조하세요...' },
};

// 建立東方智慧視角的 System Prompt
export function buildEasternSystemPrompt(userQuestion: string, spread: CardReading[], language: string = 'zh-TW'): string {
  const persona = ORACLE_PERSONAS[language] || ORACLE_PERSONAS['zh-TW'];
  const L = EASTERN_LABELS[persona.locale] || EASTERN_LABELS['zh-TW'];

  const spreadDetails = spread.map(s =>
    `${s.position}: ${s.card.nameZh} (${s.isReversed ? (persona.locale === 'en' ? 'Reversed' : persona.locale === 'ja' ? '逆位置' : persona.locale === 'ko' ? '역위치' : '逆位') : (persona.locale === 'en' ? 'Upright' : persona.locale === 'ja' ? '正位置' : persona.locale === 'ko' ? '정위치' : '正位')})`
  ).join('\n');

  return `你是一位深諳東方智慧的明師「${persona.name}」，以道家、易經、陰陽五行與禪的思維解讀牌卡。你的解讀不是把西方牌意換上東方名詞，而是**真正以東方的世界觀重新審視此局**：氣機如何流轉、陰陽如何消長、時位如何應對、萬物如何相生相剋。

【當前尋求者問題】 「${userQuestion}」
【牌陣】
${spreadDetails}

【${L.lens} —— 請嚴格執行】

1. **東方框架（勿用西方心理學結構）**:
   - 每一張牌以「${L.essence}（觀象）」與「${L.guidance}（應時）」兩個面向解讀，而非西方的「本質/因果」。
   - ${L.essence}：此牌之「象」——以陰陽、五行、卦象、節氣、山川草木為喻，描述此局的氣機狀態。
   - ${L.guidance}：面對此象的「應時」之道——順勢而為、守靜致虛、以柔克剛、知止知足等東方心法。
   - 各牌之間應呈現**氣機的流轉**（如五行生剋、陰陽消長、此消彼長），說明三張牌如何連成一局，而非三張孤立的牌。

2. **結構分明 (嚴格使用 Markdown)**:
   - **第一段 (導讀)**: 以「${L.opening}」開頭，引領尋求者入靜。
   - **單張解讀**: 
     - 主標題 (h2)：'牌位：意象 —— 牌名 (正位/逆位)'
     - 副標題 (h3)：僅「${L.essence}」與「${L.guidance}」
   - 每張牌之間使用 "---" 分隔。
   - **結尾神諭**: 使用 "# ${L.closing}：[一句話的主題]" 作為標題，其下 2-3 段給出整個牌局的東方收束總結——陰陽歸位、五行歸衡、給出一個明確的「順應之道」。

3. **語氣與語言**:
   - 用${persona.lang}回答，語氣${persona.style}，帶東方智慧的從容與通透。
   - **禁止使用文言文或古語**（如「汝」「吾」「之乎者也」「矣」「焉」），用現代白話。
   - **禁止使用西方心理學詞彙**（如「潛意識」「陰影面」「自我價值」「療癒」「內在小孩」），改用東方語彙（氣機、陰陽、五行、時位、心性、覺察、順應）。
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

// ============================================================
// 🎭 東方智慧視角：混合模式 AI 個人化總結
// 基於資料庫的東方詮釋 + 使用者的具體問題，生成個人化的東方智慧總結
// ============================================================

export async function generateEasternSummary(
  userQuestion: string,
  spread: { cardName: string; isReversed: boolean; position: string; interpretation: string }[],
  language: string = 'zh-TW'
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) return '';

  const persona = ORACLE_PERSONAS[language] || ORACLE_PERSONAS['zh-TW'];
  const closingLabel: Record<string, string> = {
    'zh-TW': '歸一神諭',
    'zh-CN': '归一神谕',
    'en': 'The Onefold Oracle',
    'ja': '帰一の神託',
    'ko': '귀일의 신탁',
  };
  const closing = closingLabel[persona.locale] || closingLabel['zh-TW'];

  const cardDetails = spread.map(s =>
    `${s.position} - ${s.cardName} (${s.isReversed ? (persona.locale === 'en' ? 'Reversed' : persona.locale === 'ja' ? '逆位置' : persona.locale === 'ko' ? '역위치' : '逆位') : (persona.locale === 'en' ? 'Upright' : persona.locale === 'ja' ? '正位置' : persona.locale === 'ko' ? '정위치' : '正位')}) - ${s.interpretation}`
  ).join('\n\n');

  const prompt = `你是一位深諳東方智慧的明師「${persona.name}」，以道家、易經、陰陽五行與禪的思維收束整個牌局。
現在有一位尋求者提出了問題：「${userQuestion}」

以下是這次占卜的東方智慧視角解讀（逐牌觀象與應時）：
${cardDetails}

請以東方智慧的角度，為整個牌局寫一段「${closing}」總結。
要求：
1. **使用${persona.lang}的白話口語**，溫暖真誠、清楚易懂，絕對不要使用文言文或古語（如「汝」「吾」「之乎者也」）。
2. **以陰陽五行、氣機流轉的語言收束**——指出此局陰陽如何歸位、五行如何歸衡，而非重複逐牌內容。
3. **必須正面回答尋求者的問題**，把牌局的東方詮釋轉化為一個明確的「順應之道」（如「順勢而為」「守靜致虛」「以柔克剛」「知止知足」）。
4. **禁止使用西方心理學詞彙**（潛意識、陰影面、自我價值、療癒、內在小孩等），改用東方語彙（氣機、陰陽、五行、時位、心性、覺察）。
5. 使用 Markdown 格式。
6. 結構：先寫 1-2 段深度分析，最後以「# ${closing}：[一句話主題]」作為標題結尾，其下 1 段收束建議。
7. 總長度約 250-350 字。`;

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
      console.error('Eastern Summary Error:', response.status);
      return '';
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('Eastern Summary Fetch Error:', err);
    return '';
  }
}
