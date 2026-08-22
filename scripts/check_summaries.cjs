const { createClient } = require('@supabase/supabase-js');

(async () => {
  const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_KEY) {
    console.error('❌ 缺少 SUPABASE_ANON_KEY 環境變數');
    process.exit(1);
  }

  const s = createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log('=== oracle_summaries ===');
  for (const lang of ['zh-TW','zh-CN','en','ja','ko']) {
    const { count, error } = await s.from('oracle_summaries').select('*', { count: 'exact', head: true }).eq('language', lang);
    console.log(lang + ': ' + (error ? 'ERR ' + error.message : count));
  }

  console.log('\n=== oracle_relationships ===');
  const { count: relCount, error: relErr } = await s.from('oracle_relationships').select('*', { count: 'exact', head: true });
  console.log('total relationships: ' + (relErr ? 'ERR ' + relErr.message : relCount));
})();
