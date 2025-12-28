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
export function buildTarotSystemPrompt(userQuestion: string, spread: CardReading[]): string {
  const spreadDetails = spread.map(s =>
    `${s.position}: ${s.card.nameZh} (${s.isReversed ? '逆位' : '正位'})`
  ).join('\n');

  return `你是一位隱居於巴洛克聖殿中的占卜宗師「艾瑟瑞爾」。

【當前尋求者問題】 「${userQuestion}」
【神諭牌陣】
${spreadDetails}

【艾瑟瑞爾的解讀聖律 —— 請嚴格執行排版】

1. **結構分明 (嚴格使用 Markdown)**:
   - **第一段 (導讀)**: 必須以「在聖殿的穹頂之下...」這段優美的文字開頭。
   - **單張解讀**: 請為每張牌建立極具儀式感的區塊。
     **核心要求：**
     - **主標題 (h2)**：格式為「牌位：隱喻標題 —— 牌名 (正/逆位)」。**嚴禁出現【】或()括號包圍整個標題**。
     - **副標題 (h3)**：僅限「牌面本質」與「命運因果」。**嚴禁使用左右橫杠（如 — 牌面本質 —）**。
     
     ## ${spread[0]?.position}：隱喻標題 —— ${spread[0]?.card.nameZh} (${spread[0]?.isReversed ? '逆位' : '正位'})
     
     ### 牌面本質
     描述該牌的視覺意象。
     
     ### 命運因果
     對問題「${userQuestion}」的深層剖析。
     
   - 每張牌解讀之間使用 "---" 分隔。
   - **最終神諭**: 使用 "# 艾瑟瑞爾的最終神諭：主題名稱"。

2. **靈魂染色系統**:
   - 凡涉及「背叛、終結、深淵、恐懼、危險」等詞彙，使用 <span class="highlight-crimson">詞彙</span>。
   - 凡涉及「啟示、轉機、權力、聖光、重生」等詞彙，使用 <span class="highlight-gold">詞彙</span>。
   - 重要的結論性句子請加 **粗體**。

3. **語氣規範**:
   - 繁體中文回答，語氣必須具備 17 世紀宮廷神祕學家的傲慢與智慧。`;
}

// 建立塔羅解讀 session (串流版本)
export function createTarotSession(userQuestion: string, spread: CardReading[]) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('DeepSeek API Key not configured');
  }

  const systemPrompt = buildTarotSystemPrompt(userQuestion, spread);
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
