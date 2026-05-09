// 使用 anon key 測試公開資料表行數
const SUPABASE_URL = 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const KEY = 'sb_publishable_i-KqkTBGauoo96ozj_Yxvw_vG4cKJ3C';

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
