// 使用 anon key 測試公開資料表行數
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!KEY) {
  console.error('❌ 缺少 SUPABASE_ANON_KEY 環境變數');
  process.exit(1);
}

const tables = ['oracle_interpretations', 'oracle_summaries', 'card_styles', 'profiles', 'tarot_readings', 'announcements', 'gender_summaries'];

async function main() {
    console.log('📊 Supabase 表格行數查詢（使用 anon key）\n');
    for (const t of tables) {
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${t}?select=count`, {
                headers: {
                    'apikey': KEY,
                    'Authorization': `Bearer ${KEY}`,
                    'Prefer': 'count=exact',
                    'Range': '0-0'
                }
            });
            const cr = res.headers.get('content-range');
            const status = res.status;
            if (status === 200 || status === 206) {
                console.log(`✅ ${t}: ${cr}`);
            } else {
                const body = await res.text();
                console.log(`❌ ${t}: HTTP ${status} - ${body.slice(0, 100)}`);
            }
        } catch (e) {
            console.log(`⚠️  ${t}: ${e.message}`);
        }
    }
}

main();
