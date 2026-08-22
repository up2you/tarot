const { createClient } = require('@supabase/supabase-js');

// 從環境變數讀取（勿在程式碼中寫死金鑰）
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY 環境變數');
  console.error('執行方式：$env:SUPABASE_SERVICE_ROLE_KEY="your_key" node scripts/check_oracle_data.cjs');
  process.exit(1);
}

const s = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  // Count total rows
  const { count: total } = await s.from('oracle_interpretations').select('*', { count: 'exact', head: true }).eq('language', 'zh-TW');
  console.log('Total zh-TW rows:', total);

  // Get sample of interpretation texts
  const { data: samples } = await s.from('oracle_interpretations').select('interpretation').eq('language', 'zh-TW').limit(5);
  console.log('\nSample texts (' + samples.length + '):');
  samples.forEach((r, i) => {
    const preview = r.interpretation.substring(0, 120);
    console.log('  [' + i + '] ' + preview + '... (' + r.interpretation.length + ' chars)');
  });

  // Get unique combo count
  const { count: uniqueCount } = await s.from('oracle_interpretations')
    .select('card_id,orientation,scenario_key,position_key', { count: 'exact', head: true })
    .eq('language', 'zh-TW');
  console.log('\nUnique (card+orientation+scenario+position) combos: (need full query)');

  // Get some unique scenario counts
  const { data: scenarios } = await s.from('oracle_interpretations')
    .select('scenario_key')
    .eq('language', 'zh-TW')
    .limit(5000);

  if (scenarios) {
    const uniq = [...new Set(scenarios.map(r => r.scenario_key))].sort();
    console.log('Scenarios found (first 5k):', uniq);
    console.log('Count:', uniq.length);
  }

  // Summaries
  const { count: sc } = await s.from('oracle_summaries').select('*', { count: 'exact', head: true }).eq('language', 'zh-TW');
  console.log('\nTotal zh-TW summaries:', sc);

  const { data: sumSamples } = await s.from('oracle_summaries').select('*').eq('language', 'zh-TW').limit(3);
  console.log('Sample summaries:');
  sumSamples.forEach(s => console.log('  pattern=' + s.pattern_key + ' summary=' + s.summary.substring(0, 100) + '...'));
}

main().catch(e => console.error(e));
