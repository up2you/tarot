/**
 * 生成東方智慧詮釋的 SQL 匯入檔
 * 讀取 data/easternInterpretations.ts 的資料，輸出 SQL
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EASTERN_CARD_INTERPRETATIONS } from '../data/easternInterpretations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 轉義 SQL 字串（單引號加倍）
const esc = (s: string) => s.replace(/'/g, "''");

let sql = `-- ============================================================
-- 東方智慧詮釋資料匯入（22 張大阿爾卡納 × 正逆位 = 44 筆）
-- 執行方式：在 Supabase SQL Editor 中執行（需先執行 migration）
-- ============================================================

-- 清空既有資料（避免重複匯入衝突）
TRUNCATE eastern_interpretations RESTART IDENTITY CASCADE;

`;

for (const card of EASTERN_CARD_INTERPRETATIONS) {
  sql += `INSERT INTO eastern_interpretations (card_id, card_name, orientation, interpretation, language) VALUES
  (${card.cardId}, '${esc(card.cardName)}', 'upright', '${esc(card.upright)}', 'zh-TW'),
  (${card.cardId}, '${esc(card.cardName)}', 'reversed', '${esc(card.reversed)}', 'zh-TW');
`;
}

sql += `
-- 驗證
SELECT card_id, card_name, orientation, language, LEFT(interpretation, 40) AS preview
FROM eastern_interpretations
ORDER BY card_id, orientation
LIMIT 10;
`;

const outPath = path.join(__dirname, '../supabase_insert_eastern_interpretations.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log(`✅ SQL 已寫入: ${outPath}`);
console.log(`   總筆數: ${EASTERN_CARD_INTERPRETATIONS.length * 2} 筆（22 張 × 正逆位）`);
