/**
 * Supabase 完整資料庫備份腳本
 * ===========================
 * 將 Supabase 所有重要表格匯出到本地 SQL 文件
 * 
 * 執行方式：
 *   $env:SUPABASE_SERVICE_ROLE_KEY = "eyJhbGci..."
 *   node scripts/supabase_backup.js
 * 
 * 備份結果：F:\TL\backup\YYYYMMDD_HHMMSS\
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
    console.error('❌ 請設置 SUPABASE_SERVICE_ROLE_KEY：');
    console.error('   $env:SUPABASE_SERVICE_ROLE_KEY = "eyJ..."');
    process.exit(1);
}

// 備份目錄
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19).replace('T', '_');
const BACKUP_DIR = path.join('F:\\TL\\backup', timestamp);
fs.mkdirSync(BACKUP_DIR, { recursive: true });
console.log(`📁 備份目錄：${BACKUP_DIR}\n`);

// HTTP 請求函式
function fetchJson(urlPath, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(SUPABASE_URL + urlPath);
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method,
            headers: {
                'apikey': SERVICE_KEY,
                'Authorization': `Bearer ${SERVICE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'count=exact'
            },
            timeout: 60000
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) }); }
                catch { resolve({ status: res.statusCode, headers: res.headers, body: data }); }
            });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

// 將資料轉成 INSERT SQL
function toInsertSQL(tableName, rows, columns) {
    if (!rows || rows.length === 0) return `-- ${tableName}: 無資料\n`;

    const colNames = columns.join(', ');
    const lines = [`-- Table: ${tableName} (${rows.length} rows)`];
    lines.push(`-- Exported: ${new Date().toISOString()}`);
    lines.push('');

    // 分批，每500行一個INSERT
    for (let i = 0; i < rows.length; i += 500) {
        const batch = rows.slice(i, i + 500);
        const values = batch.map(row => {
            const vals = columns.map(col => {
                const v = row[col];
                if (v === null || v === undefined) return 'NULL';
                if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
                if (typeof v === 'number') return String(v);
                if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
                return `'${String(v).replace(/'/g, "''")}'`;
            });
            return `(${vals.join(', ')})`;
        });
        lines.push(`INSERT INTO ${tableName} (${colNames}) VALUES`);
        lines.push(values.join(',\n') + '\nON CONFLICT DO NOTHING;');
        lines.push('');
    }
    return lines.join('\n');
}

// 備份單張表
async function backupTable(tableName, orderBy = 'created_at') {
    process.stdout.write(`  備份 ${tableName}... `);

    const PAGE_SIZE = 1000;
    let allRows = [];
    let offset = 0;
    let columns = null;
    let totalCount = 0;

    while (true) {
        const path = `/rest/v1/${tableName}?select=*&order=${orderBy}&limit=${PAGE_SIZE}&offset=${offset}`;
        const resp = await fetchJson(path);

        if (resp.status !== 200 && resp.status !== 206) {
            console.log(`❌ HTTP ${resp.status}`);
            return false;
        }

        const rows = resp.body;
        if (!Array.isArray(rows) || rows.length === 0) break;

        if (!columns && rows.length > 0) {
            columns = Object.keys(rows[0]);
            // 從 content-range 解析總數
            const cr = resp.headers['content-range'];
            if (cr) totalCount = parseInt(cr.split('/')[1]) || 0;
        }

        allRows = allRows.concat(rows);
        offset += PAGE_SIZE;

        if (rows.length < PAGE_SIZE) break;
        process.stdout.write('.');
    }

    if (allRows.length === 0) {
        console.log('(空表)');
        return true;
    }

    const sql = toInsertSQL(tableName, allRows, columns);
    const filePath = path.join(BACKUP_DIR, `${tableName}.sql`);
    fs.writeFileSync(filePath, sql, 'utf8');
    console.log(`✅ ${allRows.length} 行 → ${tableName}.sql`);
    return true;
}

// 備份 Storage Bucket 列表
async function backupStorageInfo() {
    process.stdout.write('  查詢 Storage Buckets... ');
    const resp = await fetchJson('/storage/v1/bucket');
    if (resp.status !== 200) {
        console.log(`❌ HTTP ${resp.status}`);
        return;
    }
    const buckets = resp.body;
    console.log(`找到 ${buckets.length} 個 Bucket`);

    let report = '# Supabase Storage 備份報告\n\n';
    report += `備份時間：${new Date().toISOString()}\n\n`;

    for (const bucket of buckets) {
        console.log(`\n  📦 Bucket: ${bucket.name} (public: ${bucket.public})`);
        report += `## Bucket: ${bucket.name}\n`;
        report += `- Public: ${bucket.public}\n`;

        // 列出文件
        const filesResp = await fetchJson(`/storage/v1/object/list/${bucket.name}`, 'POST', {
            prefix: '', limit: 500, offset: 0,
            sortBy: { column: 'name', order: 'asc' }
        });

        if (filesResp.status === 200 && Array.isArray(filesResp.body)) {
            const files = filesResp.body;
            let totalSize = 0;
            files.forEach(f => { if (f.metadata?.size) totalSize += Number(f.metadata.size); });
            console.log(`     ${files.length} 個文件, ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
            report += `- 文件數量：${files.length}\n`;
            report += `- 總大小：${(totalSize / 1024 / 1024).toFixed(2)} MB\n\n`;

            report += '| 文件名 | 大小 | 類型 | 建立時間 |\n';
            report += '|--------|------|------|----------|\n';
            files.forEach(f => {
                const size = f.metadata?.size ? `${(f.metadata.size / 1024).toFixed(1)} KB` : '-';
                const mime = f.metadata?.mimetype || '-';
                report += `| ${f.name} | ${size} | ${mime} | ${f.created_at?.slice(0, 10) || '-'} |\n`;
            });
            report += '\n';
        }
    }

    fs.writeFileSync(path.join(BACKUP_DIR, 'storage_report.md'), report, 'utf8');
    console.log('  ✅ Storage 報告已存至 storage_report.md');
}

// 主函式
async function main() {
    console.log('🚀 開始備份 Supabase...\n');

    // 需要備份的表（按重要性排序）
    const tables = [
        ['oracle_interpretations', 'id'],
        ['oracle_summaries', 'id'],
        ['users', 'created_at'],
        ['user_profiles', 'created_at'],
        ['profiles', 'created_at'],
        ['fortune_records', 'created_at'],
        ['transactions', 'created_at'],
        ['payment_records', 'created_at'],
        ['card_styles', 'sort_order'],
        ['user_card_styles', 'purchased_at'],
        ['style_purchases', 'created_at'],
        ['reading_logs', 'created_at'],
        ['readings', 'created_at'],
        ['announcements', 'created_at'],
        ['app_settings', 'id'],
        ['system_settings', 'id'],
        ['pricing_plans', 'id'],
        ['music_files', 'created_at'],
        ['daily_analytics', 'created_at'],
        ['oracle_relationships', 'id'],
        ['followups', 'created_at'],
        ['email_logs', 'created_at'],
        ['credits_usage', 'created_at'],
        ['gender_summaries', 'id'],
    ];

    console.log('📊 備份資料庫表格：');
    let success = 0, failed = 0;
    for (const [table, order] of tables) {
        try {
            const ok = await backupTable(table, order);
            if (ok) success++; else failed++;
        } catch (e) {
            console.log(`❌ ${table}: ${e.message}`);
            failed++;
        }
    }

    console.log(`\n  完成：${success} 成功，${failed} 失敗`);

    // 備份 Storage 資訊
    console.log('\n📦 儲存桶資訊：');
    await backupStorageInfo();

    // 建立備份摘要
    const files = fs.readdirSync(BACKUP_DIR);
    let totalSize = 0;
    files.forEach(f => {
        const stat = fs.statSync(path.join(BACKUP_DIR, f));
        totalSize += stat.size;
    });

    console.log(`\n✅ 備份完成！`);
    console.log(`   位置：${BACKUP_DIR}`);
    console.log(`   文件數：${files.length}`);
    console.log(`   總大小：${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(e => {
    console.error('備份失敗：', e);
    process.exit(1);
});
