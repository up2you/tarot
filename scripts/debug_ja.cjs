// Debug: test DeepSeek JSON parsing for ja translations
const fs = require('fs');

// Load env
const env = {};
fs.readFileSync('D:/TL/.env', 'utf8').split(/\r?\n/).forEach(l => {
  const t = l.trim();
  if (t && !t.startsWith('#')) {
    const i = t.indexOf('=');
    if (i !== -1) env[t.substring(0, i).trim()] = t.substring(i + 1).trim();
  }
});

console.log('Keys loaded:', {
  supabase: !!env.VITE_SUPABASE_URL,
  serviceRole: !!env.VITE_SUPABASE_SERVICE_ROLE_KEY,
  deepseek: !!env.DEEPSEEK_API_KEY
});

const apiKey = env.DEEPSEEK_API_KEY;
const { createClient } = require('@supabase/supabase-js');
const c = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_SERVICE_ROLE_KEY);

// Include the sanitize functions
function safeParseJSON(jsonStr) {
  try { return JSON.parse(jsonStr); } catch (err1) {
    try { return JSON.parse(sanitizeJsonStrings(jsonStr)); } catch (err2) {
      throw new Error(err1.message + '\n  [Fallback: ' + err2.message + ']');
    }
  }
}
function sanitizeJsonStrings(str) {
  let result = '', inString = false, escaped = false;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (escaped) { result += ch; escaped = false; continue; }
    if (inString) {
      if (ch === '\\') { escaped = true; result += ch; }
      else if (ch === '"') { inString = false; result += ch; }
      else if (ch === '\n') { result += '\\n'; }
      else if (ch === '\r') { result += '\\r'; }
      else if (ch === '\t') { result += '\\t'; }
      else { result += ch; }
    } else {
      if (ch === '"') inString = true;
      result += ch;
    }
  }
  return result;
}

async function go() {
  // Get 5 unique texts
  const { data, error } = await c.from('oracle_interpretations')
    .select('interpretation')
    .eq('language', 'zh-TW')
    .order('card_id')
    .limit(25);
  
  if (error) { console.error('Query error:', error); return; }
  if (!data || data.length === 0) { console.error('No data returned'); return; }
  
  const texts = [...new Set(data.map(d => d.interpretation))];
  console.log('Unique texts to translate:', texts.length);
  console.log('Text lengths:', texts.map(t => t.length));

  const items = texts.map((t, i) => `[${i + 1}] ${t}`).join('\n\n---\n\n');

  const systemPrompt = '你是一位專業的塔羅牌占卜翻譯師。請將以下神諭解讀從繁體中文翻譯成日本語。\n\n翻譯規則：\n1. 保持原文的情感語氣與溫暖感\n2. 保留所有特殊標記格式\n3. 保留 Markdown 格式\n4. 塔羅牌名稱保持與原文一致或使用該語言通用譯名\n5. 占卜術語使用該語言的自然表達方式\n6. 不要添加或刪除內容，純翻譯\n\n請以 JSON 陣列回覆，每個元素對應一筆翻譯：\n[\n  "第一筆翻譯結果",\n  "第二筆翻譯結果",\n  ...\n]\n\n只回傳 JSON 陣列，不要有其他文字。';

  console.log('\nSending API request...');
  const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: items }
      ],
      temperature: 0.3
    })
  });

  const json = await resp.json();
  if (json.error) {
    console.error('API error:', json.error);
    return;
  }
  
  const content = json.choices[0].message.content;
  fs.writeFileSync('D:/TL/debug_ja_response.txt', content, 'utf8');
  console.log('Response saved. Content length:', content.length);
  
  // Extract JSON
  const match = content.match(/\[[\s\S]*\]/);
  if (!match) {
    console.log('No JSON array found in response!');
    console.log('Content:', content.substring(0, 1000));
    return;
  }
  const jsonStr = match[0];
  console.log('JSON string length:', jsonStr.length);
  
  // Test parsing
  try {
    const parsed = JSON.parse(jsonStr);
    console.log('SUCCESS: Direct parse worked!');
    console.log('Translations:', parsed.length);
    parsed.forEach((t, i) => console.log('  [' + (i+1) + ']: ' + t.substring(0, 80) + '...'));
  } catch (err1) {
    console.log('Direct parse FAILED:', err1.message);
    
    // Test sanitize
    try {
      const sanitized = sanitizeJsonStrings(jsonStr);
      console.log('Sanitized length:', sanitized.length, '(added', sanitized.length - jsonStr.length, 'chars)');
      const parsed2 = JSON.parse(sanitized);
      console.log('Sanitized parse SUCCESS!');
      console.log('Translations:', parsed2.length);
      parsed2.forEach((t, i) => console.log('  [' + (i+1) + ']: ' + t.substring(0, 80) + '...'));
    } catch (err2) {
      console.log('Sanitized parse FAILED:', err2.message);
      
      // Show context around error
      const posMatch = err1.message.match(/position (\d+)/);
      if (posMatch) {
        const pos = parseInt(posMatch[1]);
        console.log('Context around position', pos + ':');
        console.log(jsonStr.substring(Math.max(0, pos - 100), pos + 100));
      }
      
      // Save fragment for manual inspection
      fs.writeFileSync('D:/TL/debug_ja_fragment.txt', jsonStr.substring(0, 10000), 'utf8');
      console.log('Saved first 10000 chars to debug_ja_fragment.txt');
    }
  }
}

go().catch(e => {
  console.error('FATAL:', e.message);
  console.error(e.stack);
});
