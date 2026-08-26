/**
 * 用 OpenCC 修復 zh-CN 殘留繁體（100% 可靠，不需 API）
 * 讀取 fix 檔 → OpenCC 繁→簡 → 直接 SQL UPDATE（用 card_id 組合定位）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { Converter } from 'opencc-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY 環境變數');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const converter = Converter({ from: 'tw', to: 'cn' });

interface FixRow {
  card_id: number;
  card_name: string;
  orientation: string;
  scenario_key: string | null;
  position_key: string | null;
  interpretation: string;
}

async function main() {
  const fix: FixRow[] = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/oracle_zh-CN_fix.json'), 'utf8'));
  console.log(`共 ${fix.length} 行待轉換`);

  let success = 0;
  let fail = 0;

  for (const row of fix) {
    const converted = converter(row.interpretation);
    const { error } = await supabase
      .from('oracle_interpretations')
      .update({ interpretation: converted })
      .eq('language', 'zh-CN')
      .eq('card_id', row.card_id)
      .eq('orientation', row.orientation)
      .eq('scenario_key', row.scenario_key ?? null)
      .eq('position_key', row.position_key ?? null);

    if (error) {
      console.error(`❌ [${row.card_id} ${row.orientation} ${row.scenario_key} ${row.position_key}] ${error.message}`);
      fail++;
    } else {
      success++;
    }
  }

  console.log(`\n✅ 完成：成功 ${success}，失敗 ${fail}`);
}

main().catch(err => {
  console.error('執行失敗:', err);
  process.exit(1);
});
