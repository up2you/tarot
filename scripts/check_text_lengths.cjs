const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_KEY);

async function main() {
  const { data } = await supabase.from('oracle_interpretations').select('text').eq('language','zh-TW').limit(8);
  if (!data || data.length === 0) { console.log('No data'); return; }
  let totalLen = 0;
  data.forEach((r, i) => {
    const len = r.text.length;
    totalLen += len;
    console.log(`Text ${i+1}: ${len} chars | ${r.text.substring(0, 80)}...`);
  });
  console.log(`Total for 8 texts: ${totalLen} chars`);
  
  // Also check text length distribution for the remaining batch
  const { data: allData } = await supabase.from('oracle_interpretations').select('text').eq('language','zh-TW').is('language', 'zh-TW');
  if (allData) {
    const lengths = allData.map(r => r.text.length);
    lengths.sort((a,b) => b - a);
    console.log(`\nText length stats (${allData.length} rows):`);
    console.log(`  Max: ${lengths[0]}`);
    console.log(`  Top 5 avg: ${(lengths.slice(0,5).reduce((a,b)=>a+b,0)/5).toFixed(0)}`);
    console.log(`  Median: ${lengths[Math.floor(lengths.length/2)]}`);
    console.log(`  Min: ${lengths[lengths.length-1]}`);
    console.log(`  Avg: ${(lengths.reduce((a,b)=>a+b,0)/lengths.length).toFixed(0)}`);
  }
}

main().catch(e => console.error(e.message));
