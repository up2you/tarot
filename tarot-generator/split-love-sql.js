import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const INPUT_FILE = path.join(__dirname, 'output/love_scenarios/all_love_scenarios.sql');
const OUTPUT_DIR = path.join(__dirname, 'output/love_scenarios/batches');
const BATCH_SIZE = 500; // 每個批次 500 筆資料

console.log('🚀 開始拆分 Love Scenarios SQL 檔案...\n');

// 確保輸出目錄存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 讀取原始 SQL 檔案
const sqlContent = fs.readFileSync(INPUT_FILE, 'utf-8');

// 分割成單獨的 INSERT 語句
const insertStatements = sqlContent
    .split('\n')
    .filter(line => line.trim().startsWith('INSERT INTO'));

console.log(`📊 總筆數: ${insertStatements.length}`);
console.log(`📦 批次大小: ${BATCH_SIZE}`);

// 計算需要多少批次
const totalBatches = Math.ceil(insertStatements.length / BATCH_SIZE);
console.log(`🔢 總批次數: ${totalBatches}\n`);

// 拆分成批次
for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, insertStatements.length);
    const batchStatements = insertStatements.slice(start, end);

    // 生成批次檔名
    const batchNumber = String(i + 1).padStart(2, '0');
    const outputFile = path.join(OUTPUT_DIR, `love_batch_${batchNumber}.sql`);

    // 寫入檔案
    const content = batchStatements.join('\n') + '\n';
    fs.writeFileSync(outputFile, content, 'utf-8');

    console.log(`✅ 批次 ${batchNumber}/${totalBatches}: ${batchStatements.length} 筆 → ${path.basename(outputFile)}`);
}

// 生成導入指令腳本
const importScript = `-- Love Scenarios 批次導入指令
-- 請在 Supabase SQL Editor 中依序執行以下批次

${Array.from({ length: totalBatches }, (_, i) => {
    const batchNumber = String(i + 1).padStart(2, '0');
    return `-- 批次 ${batchNumber}/${totalBatches}\n-- 複製 love_batch_${batchNumber}.sql 的內容並執行\n`;
}).join('\n')}

-- 執行完成後，驗證資料:
SELECT scenario_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%'
GROUP BY scenario_key
ORDER BY scenario_key;

-- 應該看到 11 個 scenarios，每個 484 條

-- 驗證 relation position:
SELECT scenario_key, position_key, COUNT(*) as count
FROM oracle_interpretations
WHERE scenario_key LIKE 'love_%' AND position_key = 'relation'
GROUP BY scenario_key, position_key
ORDER BY scenario_key;

-- 應該看到 11 個 scenarios，每個 44 條
`;

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'IMPORT_INSTRUCTIONS.sql'),
    importScript,
    'utf-8'
);

console.log('\n🎉 拆分完成!');
console.log(`📁 輸出目錄: ${OUTPUT_DIR}`);
console.log('\n📋 下一步:');
console.log('1. 先在 Supabase 清空舊 love_* 資料');
console.log('2. 依序執行 love_batch_01.sql ~ love_batch_11.sql');
console.log('3. 執行驗證查詢');
