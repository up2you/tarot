/**
 * Supabase 儲存空間完整分析腳本
 * 需要 SERVICE_ROLE_KEY (在 Supabase Settings > API 取得)
 * 
 * 使用方式：
 * $env:SUPABASE_SERVICE_ROLE_KEY="eyJ..."
 * node scripts/supabase_audit.js
 */

const SUPABASE_URL = 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
    console.error('❌ 缺少 SERVICE_ROLE_KEY');
    console.log('請到 Supabase Dashboard > Settings > API > service_role key 複製');
    console.log('然後執行：$env:SUPABASE_SERVICE_ROLE_KEY="your_key_here"');
    process.exit(1);
}

const headers = {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json'
};

async function rpc(sql) {
    // 使用 pg_meta via supabase management API 查詢
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: sql })
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`RPC failed: ${res.status} - ${text}`);
    }
    return res.json();
}

async function postgrestSQL(sql) {
    // 使用 PostgREST 執行 SQL，僅用於 SELECT 公開資料
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify({ query: sql })
    });
    return res.json();
}

async function listStorageBuckets() {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, { headers });
    return res.json();
}

async function listBucketFiles(bucketName, prefix = '') {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${bucketName}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ prefix, limit: 1000, sortBy: { column: 'name', order: 'asc' } })
    });
    return res.json();
}

async function main() {
    console.log('🔍 Supabase 儲存空間完整稽核報告');
    console.log('='.repeat(60));
    console.log(`專案 URL: ${SUPABASE_URL}`);
    console.log(`時間: ${new Date().toLocaleString('zh-TW')}\n`);

    // === 1. Storage Buckets ===
    console.log('📦 Storage Buckets 分析');
    console.log('-'.repeat(40));
    try {
        const buckets = await listStorageBuckets();
        if (!Array.isArray(buckets)) {
            console.log('無法讀取 Buckets:', JSON.stringify(buckets));
        } else {
            let bucketReport = [];
            for (const bucket of buckets) {
                let files = await listBucketFiles(bucket.name);
                let totalSize = 0;
                let fileCount = 0;
                if (Array.isArray(files)) {
                    fileCount = files.length;
                    files.forEach(f => {
                        if (f.metadata?.size) totalSize += Number(f.metadata.size);
                    });
                }
                bucketReport.push({ name: bucket.name, public: bucket.public, files: fileCount, sizeMB: (totalSize / 1024 / 1024).toFixed(2) });
                console.log(`  ${bucket.name}: ${fileCount} 個文件, ${(totalSize / 1024 / 1024).toFixed(2)} MB (public: ${bucket.public})`);

                // 列出大文件
                if (Array.isArray(files)) {
                    const largeFiles = files
                        .filter(f => f.metadata?.size > 1024 * 1024)
                        .sort((a, b) => b.metadata.size - a.metadata.size)
                        .slice(0, 10);
                    largeFiles.forEach(f => {
                        console.log(`    ⚠️  ${f.name}: ${(f.metadata.size / 1024 / 1024).toFixed(2)} MB`);
                    });
                }
            }
        }
    } catch (e) {
        console.log('Storage 查詢錯誤:', e.message);
    }

    // === 2. Public Tables via PostgREST ===
    console.log('\n📊 資料庫表格行數分析');
    console.log('-'.repeat(40));

    const tables = ['oracle_interpretations', 'oracle_summaries', 'card_styles', 'users', 'readings', 'profiles', 'gender_summaries'];
    for (const table of tables) {
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=count`, {
                headers: { ...headers, 'Prefer': 'count=exact', 'Range': '0-0' }
            });
            const count = res.headers.get('content-range');
            const status = res.status;
            if (status === 200 || status === 206) {
                console.log(`  ${table}: ${count || '未知數量'} 行`);
            } else {
                console.log(`  ${table}: 無法訪問 (${status})`);
            }
        } catch (e) {
            console.log(`  ${table}: 錯誤 - ${e.message}`);
        }
    }

    // === 3. oracle_interpretations scenario 統計 ===
    console.log('\n🃏 oracle_interpretations 各 scenario 數量');
    console.log('-'.repeat(40));
    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/oracle_interpretations?select=scenario&limit=50000`,
            { headers }
        );
        if (res.ok) {
            const data = await res.json();
            const counts = {};
            data.forEach(r => {
                counts[r.scenario] = (counts[r.scenario] || 0) + 1;
            });
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            sorted.forEach(([s, c]) => console.log(`  ${s}: ${c} 行`));
        }
    } catch (e) {
        console.log('查詢錯誤:', e.message);
    }

    console.log('\n✅ 分析完成！');
}

main().catch(err => {
    console.error('執行失敗:', err);
    process.exit(1);
});
