/**
 * 匯出 Supabase 資料表到 NAS（分批）
 * 用法: npx tsx scripts/exportDbToNas.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.env.VITE_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

const NAS_DIR = process.argv[2] || '\\\\192.168.8.104\\home\\tarot_backup_20260831_223048';
const BATCH = 1000;

async function exportTable(table: string, select: string) {
  const outDir = path.join(NAS_DIR, 'db');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${table}.json`);
  const all: unknown[] = [];
  let from = 0;

  console.log(`匯出 ${table}...`);
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .range(from, from + BATCH - 1);
    if (error) {
      console.error(`  ${table} 錯誤:`, error.message);
      break;
    }
    if (!data || data.length === 0) break;
    all.push(...data);
    from += BATCH;
    process.stdout.write(`  ${all.length} 行...\r`);
  }
  fs.writeFileSync(outFile, JSON.stringify(all, null, 0), 'utf8');
  console.log(`\n✅ ${table}: ${all.length} 行 → ${outFile} (${Math.round(fs.statSync(outFile).size / 1024 / 1024)} MB)`);
}

async function main() {
  await exportTable('oracle_interpretations', 'id,card_id,card_name,orientation,scenario_key,position_key,interpretation,language,created_at,updated_at');
  await exportTable('eastern_interpretations', 'id,card_id,card_name,orientation,scenario_key,position_key,interpretation,language,created_at,updated_at');
  await exportTable('pricing_plans', '*');
  await exportTable('user_profiles', '*');
  await exportTable('payment_records', '*');
  await exportTable('readings', '*');
  await exportTable('followups', '*');
  await exportTable('daily_analytics', '*');
  console.log('\n🎉 全部匯出完成');
}

main().catch(e => { console.error('失敗:', e); process.exit(1); });
