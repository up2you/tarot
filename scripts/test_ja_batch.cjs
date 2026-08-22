const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Load env
const env = {};
fs.readFileSync('D:/TL/.env', 'utf8').split(/\r?\n/).forEach(l => {
  const t = l.trim();
  if (t && !t.startsWith('#')) {
    const i = t.indexOf('=');
    if (i !== -1) env[t.substring(0, i).trim()] = t.substring(i + 1).trim();
  }
});

const c = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  const { data } = await c.from('oracle_interpretations')
    .select('interpretation')
    .eq('language', 'zh-TW')
    .order('card_id')
    .limit(6);
  
  const texts = [...new Set(data.map(d => d.interpretation))];
  console.log('Unique texts:', texts.length, '| avg length:', Math.round(texts.reduce((a,t)=>a+t.length,0)/texts.length));

  const items = texts.map((t, i) => '[' + (i + 1) + '] ' + t).join('\n\n---\n\n');

  const systemPrompt = '你是一位專業的塔羅牌占卜翻譯師。請將以下神諭解讀從繁體中文翻譯成日本語。只回傳 JSON 陣列，格式：["翻譯1","翻譯2",...]。不要有其他文字。';

  const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.DEEPSEEK_API_KEY },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: items }
      ],
      temperature: 0.3,
      max_tokens: 16384
    })
  });

  const json = await resp.json();
  if (json.error) { console.error('API error:', json.error); return; }

  const content = json.choices[0].message.content;
  fs.writeFileSync('D:/TL/debug_ja_batch6.txt', content, 'utf8');

  console.log('Response length:', content.length);
  console.log('Usage:', JSON.stringify(json.usage));
  console.log('Ends with ]?', content.trim().endsWith(']'));

  const m = content.match(/\[[\s\S]*\]/);
  if (m) {
    try {
      const parsed = JSON.parse(m[0]);
      console.log('SUCCESS! Got', parsed.length, 'translations');
      parsed.forEach((t, i) => console.log('  ['+(i+1)+']:', t.substring(0, 50)+'...'));
    } catch (e) {
      console.log('JSON parse error:', e.message);
      // Try sanitize
      const { sanitizeJsonStrings } = require('./translate_oracle.cjs');
      try {
        const fixed = sanitizeJsonStrings(m[0]);
        const parsed2 = JSON.parse(fixed);
        console.log('Sanitized SUCCESS! Got', parsed2.length, 'translations');
      } catch (e2) {
        console.log('Sanitize also failed:', e2.message);
      }
    }
  } else {
    console.log('No JSON array found');
    console.log('Last 200 chars:', content.slice(-200));
  }
}

test().catch(e => { console.error('FATAL:', e.message); console.error(e.stack); });
