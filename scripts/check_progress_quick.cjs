const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('❌ 缺少 SUPABASE_ANON_KEY 環境變數');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const tables = ['oracle_interpretations', 'oracle_summaries'];
  const languages = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
  
  for (const table of tables) {
    console.log('=== ' + table + ' ===');
    const { count: total } = await supabase.from(table).select('*', { count: 'exact', head: true });
    
    for (const lang of languages) {
      const { count: done } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('language', lang);
      const pct = ((done / total) * 100).toFixed(1);
      console.log(lang + ': ' + done + '/' + total + ' (' + pct + '%)');
    }
    console.log('');
  }
}
check().catch(console.error);
