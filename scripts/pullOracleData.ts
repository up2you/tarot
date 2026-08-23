/**
 * 拉取西方神諭資料（分批），供東方詮釋轉換使用
 * 從 Supabase 拉取 zh-TW 全部 oracle_interpretations，存成批次 JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY 環境變數');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BATCH_SIZE = 500;
const OUT_DIR = path.join(__dirname, '../data/oracle_batches');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  console.log('🔍 開始拉取西方神諭資料 (zh-TW)...');

  // 先查總數
  const { count } = await supabase
    .from('oracle_interpretations')
    .select('id', { count: 'exact', head: true })
    .eq('language', 'zh-TW');
  console.log(`總筆數: ${count}`);

  const allData = [];
  let offset = 0;

  while (offset < (count || 0)) {
    const { data, error } = await supabase
      .from('oracle_interpretations')
      .select('card_id,card_name,orientation,scenario_key,position_key,interpretation')
      .eq('language', 'zh-TW')
      .order('id')
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) {
      console.error(`❌ 拉取失敗 (offset=${offset}):`, error.message);
      break;
    }

    allData.push(...data);
    if (allData.length % 2000 < BATCH_SIZE) {
      console.log(`  已拉取: ${allData.length}/${count}`);
    }
    offset += BATCH_SIZE;

    // 小憩避免限流與超時
    await new Promise(r => setTimeout(r, 800));
  }

  // 寫入批次檔
  const outPath = path.join(OUT_DIR, 'oracle_zhTW_all.json');
  fs.writeFileSync(outPath, JSON.stringify(allData, null, 1), 'utf8');
  console.log(`\n✅ 完成! 共 ${allData.length} 筆，已寫入 ${outPath}`);
}

main().catch(err => {
  console.error('執行失敗:', err);
  process.exit(1);
});
