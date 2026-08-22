const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((o, l) => {
  const [k, ...v] = l.trim().split('=');
  if (k && v.length) o[k] = v.join('=');
  return o;
}, {});
console.log('DEEPSEEK_API_KEY:', (env.DEEPSEEK_API_KEY || 'NOT FOUND').substring(0, 10) + '...');
console.log('VITE_SUPABASE_URL:', env.VITE_SUPABASE_URL);
console.log('SERVICE_KEY exists:', !!env.VITE_SUPABASE_SERVICE_ROLE_KEY);
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_SERVICE_ROLE_KEY);
(async () => {
  const total = 30405;
  const rs = await Promise.all(['zh-CN', 'en', 'ja', 'ko'].map(async lang => {
    const { count } = await supabase.from('oracle_interpretations').select('*', { count: 'exact', head: true }).eq('language', lang);
    return { lang, count };
  }));
  rs.forEach(r => console.log(r.lang + ': ' + r.count + '/' + total + ' (' + ((r.count / total) * 100).toFixed(1) + '%)'));
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
