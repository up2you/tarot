/**
 * Supabase 儲存空間分析腳本
 * 執行前請設置環境變數：SUPABASE_SERVICE_ROLE_KEY
 * 
 * 執行方式：
 * $env:SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"
 * node scripts/analyze_supabase.js
 */

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SERVICE_KEY) {
  console.error('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY 環境變數');
  process.exit(1);
}

if (!SERVICE_KEY) {
    console.error('❌ 請設置 SUPABASE_SERVICE_ROLE_KEY 環境變數');
    console.log('在 Supabase 控制台 > Settings > API > service_role key 取得');
    process.exit(1);
}

async function query(sql) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
            'apikey': SERVICE_KEY,
            'Authorization': `Bearer ${SERVICE_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sql })
    });
    return res.json();
}

async function fetchRaw(path, useService = true) {
    const key = useService ? SERVICE_KEY : ANON_KEY;
    const res = await fetch(`${SUPABASE_URL}${path}`, {
        headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`
        }
    });
    return res.json();
}

async function main() {
    console.log('🔍 Supabase 儲存空間分析報告');
    console.log('='.repeat(50));

    // 查詢儲存桶
    console.log('\n📦 Storage Buckets:');
    const buckets = await fetchRaw('/storage/v1/bucket');
    if (Array.isArray(buckets)) {
        buckets.forEach(b => {
            console.log(`  - ${b.name} (public: ${b.public}, id: ${b.id})`);
        });

        // 查詢每個桶的文件
        for (const bucket of buckets) {
            const files = await fetchRaw(`/storage/v1/object/list/${bucket.name}`, true);
            if (Array.isArray(files)) {
                let totalSize = 0;
                files.forEach(f => {
                    if (f.metadata?.size) totalSize += f.metadata.size;
                });
                console.log(`    → ${bucket.name}: ${files.length} files, ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
            }
        }
    } else {
        console.log('  Error:', JSON.stringify(buckets));
    }
}

main().catch(console.error);
