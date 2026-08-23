/**
 * 東方詮釋批次匯入引擎
 * 讀取 data/eastern_done（或 data/eastern_done_{lang}）的已完成批次，匯入 Supabase eastern_interpretations
 * 支援續跑：已匯入的批次會跳過
 *
 * 用法：
 *   npx tsx scripts/easternImportEngine.ts              # zh-TW（預設）
 *   $env:EASTERN_LANG=en npx tsx scripts/easternImportEngine.ts   # 其他語言
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const LANG = process.env.EASTERN_LANG || 'zh-TW';
const LANG_DIR_SUFFIX = LANG === 'zh-TW' ? '' : `_${LANG}`;
const DONE_DIR = path.join(DATA_DIR, `eastern_done${LANG_DIR_SUFFIX}`);
const IMPORT_PROGRESS = path.join(DATA_DIR, `eastern_import_progress${LANG_DIR_SUFFIX}.json`);

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY 環境變數');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface EasternItem {
  card_id: number;
  card_name: string;
  orientation: 'upright' | 'reversed';
  scenario_key: string;
  position_key: string;
  interpretation: string;
}

function loadImported(): string[] {
  try {
    return JSON.parse(fs.readFileSync(IMPORT_PROGRESS, 'utf8'));
  } catch {
    return [];
  }
}

function saveImported(list: string[]) {
  fs.writeFileSync(IMPORT_PROGRESS, JSON.stringify(list, null, 2), 'utf8');
}

async function main() {
  const imported = loadImported();
  const files = fs.readdirSync(DONE_DIR).filter(f => f.endsWith('.json'));
  let total = 0;

  for (const file of files) {
    if (imported.includes(file)) continue;

    const items: EasternItem[] = JSON.parse(fs.readFileSync(path.join(DONE_DIR, file), 'utf8'));
    if (items.length === 0) continue;

    // 批次插入（upsert：同 card+orientation+scenario+position+language 覆蓋）
    const rows = items.map(it => ({
      card_id: it.card_id,
      card_name: it.card_name,
      orientation: it.orientation,
      scenario_key: it.scenario_key,
      position_key: it.position_key,
      interpretation: it.interpretation,
      language: LANG,
    }));

    const { error } = await supabase
      .from('eastern_interpretations')
      .upsert(rows, {
        onConflict: 'card_id,orientation,scenario_key,position_key,language',
        ignoreDuplicates: false,
      });

    if (error) {
      console.error(`❌ ${file} 匯入失敗:`, error.message);
      continue;
    }

    imported.push(file);
    saveImported(imported);
    total += items.length;

    if (total % 200 < 10) {
      console.log(`  已匯入: ${total} 筆`);
    }

    // 小憩避免限流
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n✅ 匯入完成，共 ${total} 筆（本輪）。累計已匯入 ${imported.length} 個批次`);
}

main().catch(err => {
  console.error('執行失敗:', err);
  process.exit(1);
});
