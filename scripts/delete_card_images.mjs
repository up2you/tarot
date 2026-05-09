/**
 * 批量刪除 Supabase card-images bucket 中所有圖片
 * 
 * 使用方式 (PowerShell):
 *   $env:SUPABASE_SERVICE_ROLE_KEY="eyJ..."
 *   node scripts/delete_card_images.mjs
 * 
 * Service Role Key 取得位置：
 *   Supabase Dashboard > Settings > API > service_role (secret)
 */

const SUPABASE_URL = 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'card-images';

// 12 個風格資料夾 (對應 Supabase 中看到的)
const STYLE_FOLDERS = [
    'art_nouveau',
    'baroque_divine',
    'botanical',
    'celtic',
    'cosmic',
    'cyberpunk',
    'dark_fantasy',
    'egyptian',
    'minimalist',
    'stained_glass',
    'ukiyo_e',
    'watercolor',
];

if (!SERVICE_KEY) {
    console.error('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY');
    console.log('\n請到 Supabase Dashboard > Settings > API > service_role (secret) 複製');
    console.log('然後在 PowerShell 執行：');
    console.log('  $env:SUPABASE_SERVICE_ROLE_KEY="eyJ..."');
    console.log('  node scripts/delete_card_images.mjs');
    process.exit(1);
}

const headers = {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
};

async function listFolderFiles(folder) {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            prefix: folder + '/',
            limit: 1000,
            sortBy: { column: 'name', order: 'asc' },
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`列出 ${folder} 失敗: ${res.status} - ${text}`);
    }
    const files = await res.json();
    return files.map(f => `${folder}/${f.name}`);
}

async function deleteFiles(filePaths) {
    if (filePaths.length === 0) return { data: [], error: null };
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ prefixes: filePaths }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`刪除失敗: ${res.status} - ${text}`);
    }
    return res.json();
}

async function main() {
    console.log('🗑️  開始刪除 Supabase card-images bucket 所有圖片');
    console.log('='.repeat(60));
    console.log(`專案: ${SUPABASE_URL}`);
    console.log(`Bucket: ${BUCKET}`);
    console.log(`時間: ${new Date().toLocaleString('zh-TW')}\n`);

    let totalDeleted = 0;
    let totalFailed = 0;

    for (const folder of STYLE_FOLDERS) {
        try {
            console.log(`📁 處理資料夾: ${folder}`);
            const files = await listFolderFiles(folder);

            if (files.length === 0) {
                console.log(`   (空資料夾，跳過)\n`);
                continue;
            }

            console.log(`   找到 ${files.length} 個檔案，正在刪除...`);

            // 每次最多刪 100 個 (Supabase 限制)
            const chunkSize = 100;
            for (let i = 0; i < files.length; i += chunkSize) {
                const chunk = files.slice(i, i + chunkSize);
                const result = await deleteFiles(chunk);
                const successCount = Array.isArray(result) ? result.length : chunk.length;
                totalDeleted += successCount;
                console.log(`   ✅ 已刪除 ${successCount} 個 (${i + chunk.length}/${files.length})`);
            }
            console.log(`   ✓ 完成資料夾 ${folder}\n`);
        } catch (err) {
            console.error(`   ❌ 資料夾 ${folder} 失敗: ${err.message}\n`);
            totalFailed++;
        }
    }

    // 最後再掃一次根目錄有沒有零散檔案
    try {
        console.log('📁 掃描根目錄零散檔案...');
        const rootRes = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ prefix: '', limit: 1000, sortBy: { column: 'name', order: 'asc' } }),
        });
        const rootFiles = await rootRes.json();
        const rootFileNames = (Array.isArray(rootFiles) ? rootFiles : [])
            .filter(f => f.name && !f.name.endsWith('/'))
            .map(f => f.name);

        if (rootFileNames.length > 0) {
            console.log(`   找到 ${rootFileNames.length} 個根目錄檔案，刪除中...`);
            await deleteFiles(rootFileNames);
            totalDeleted += rootFileNames.length;
            console.log(`   ✅ 已刪除根目錄 ${rootFileNames.length} 個檔案`);
        } else {
            console.log('   (無零散檔案)');
        }
    } catch (err) {
        console.error(`   根目錄掃描錯誤: ${err.message}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log(`🎉 完成！共刪除 ${totalDeleted} 個檔案`);
    if (totalFailed > 0) console.log(`⚠️  ${totalFailed} 個資料夾失敗`);
    console.log('\n💡 接下來：');
    console.log('   1. 本地壓縮圖片至 100KB 以內');
    console.log('   2. 重新上傳到相同路徑');
    console.log('   3. Supabase 儲存空間應降至 <200MB');
}

main().catch(err => {
    console.error('執行失敗:', err);
    process.exit(1);
});
