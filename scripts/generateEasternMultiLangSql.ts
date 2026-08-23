/**
 * 生成東方智慧詮釋的多語言 SQL 匯入檔
 * 讀取 data/eastern_{lang}.json（en/ja/ko/zh-CN），輸出 SQL
 * 執行後資料庫將有 5 語言 × 44 筆 = 220 筆
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const esc = (s: string) => s.replace(/'/g, "''");

const langs = ['en', 'ja', 'ko', 'zh-CN'];

let sql = `-- ============================================================
-- 東方智慧詮釋多語言資料匯入（en/ja/ko/zh-CN）
-- 執行方式：在 Supabase SQL Editor 中執行
-- ============================================================

`;

let total = 0;
for (const lang of langs) {
  const filePath = path.join(__dirname, `../data/eastern_${lang}.json`);
  const cards = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const card of cards) {
    sql += `INSERT INTO eastern_interpretations (card_id, card_name, orientation, interpretation, language) VALUES
  (${card.cardId}, '${esc(card.cardName)}', 'upright', '${esc(card.upright)}', '${lang}'),
  (${card.cardId}, '${esc(card.cardName)}', 'reversed', '${esc(card.reversed)}', '${lang}');
`;
    total += 2;
  }
  console.log(`✅ ${lang}: ${cards.length} 張牌（${cards.length * 2} 筆）`);
}

sql += `
-- 驗證
SELECT language, COUNT(*) AS total
FROM eastern_interpretations
GROUP BY language
ORDER BY language;
`;

const outPath = path.join(__dirname, '../supabase_insert_eastern_multilang.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log(`\n✅ SQL 已寫入: ${outPath}`);
console.log(`   新增 ${total} 筆（4 語言）`);
