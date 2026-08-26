/**
 * 西方神諭資料庫殘留修復引擎
 * 修復 oracle_interpretations 中翻譯/轉換未完成的行：
 *   ko    → 將繁體中文內容翻譯為韓文
 *   zh-CN → 將繁體中文內容轉為簡體中文
 *
 * 用法：
 *   $env:DEEPSEEK_API_KEY="sk-..." npx tsx scripts/oracleFixEngine.ts <ko|zh-CN> [批次大小] [並行度]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const API_KEY = process.env.DEEPSEEK_API_KEY;

const SUPABASE_URL = 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const TARGET = process.argv[2]?.trim();

if (!API_KEY) {
  console.error('❌ 缺少 DEEPSEEK_API_KEY 環境變數');
  process.exit(1);
}
if (!SUPABASE_KEY) {
  console.error('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY 環境變數');
  process.exit(1);
}
if (TARGET !== 'ko' && TARGET !== 'zh-CN') {
  console.error('❌ 請指定修復目標：ko | zh-CN');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface FixRow {
  card_id: number;
  card_name: string;
  orientation: string;
  scenario_key: string | null;
  position_key: string | null;
  interpretation: string;
}

const FIX_FILE = path.join(DATA_DIR, `oracle_${TARGET}_fix.json`);
const PROGRESS_FILE = path.join(DATA_DIR, `oracle_${TARGET}_fix_progress.json`);

/** 呼叫 DeepSeek 修復一批 */
async function fixBatch(items: FixRow[]): Promise<FixRow[] | null> {
  const isKo = TARGET === 'ko';
  const instruction = isKo
    ? '你是一位專業的塔羅牌翻譯。請將以下繁體中文的塔羅神諭解讀翻譯為韓文（한국어）。要求：1) 現代口語、溫暖真誠、清楚易懂；2) 保留塔羅牌名與西方神話/象徵術語的韓文慣用譯法；3) 保持「開場共鳴 → 深層分析 → 具體建議」結構與相近長度；4) 不要省略任何內容，不要用文言文或生硬直譯。'
    : '你是一位專業的繁簡轉換編輯。請將以下繁體中文內容轉換為簡體中文。要求：1) 只做繁→簡轉換，不改變任何語意、結構與長度；2) 使用標準簡體用詞（如 資訊→信息、軟體→软件、網路→网络、質疑→质疑、關鍵→关键、與→与、這→这 等）；3) 不要省略或新增任何內容。';

  const input = items.map(it => ({
    cardId: it.card_id,
    orientation: it.orientation,
    scenario: it.scenario_key,
    position: it.position_key,
    interpretation: it.interpretation,
  }));

  const prompt = `${instruction}

【輸入資料（JSON 陣列）】
${JSON.stringify(input, null, 1)}

【輸出格式】
只輸出 JSON 陣列（不要 markdown 程式碼塊、不要其他文字）：
[{"cardId": 對應輸入的cardId, "interpretation": "修復後的文字"}, ...]

每筆輸出的 cardId 必須與輸入一一對應，共 ${items.length} 筆，依序排列。`;

  try {
    const body = JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 8000,
    });

    const resp = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body,
    });

    if (!resp.ok) {
      console.error(`   API 錯誤 ${resp.status}: ${await resp.text()}`);
      return null;
    }

    const data = await resp.json();
    const content = data.choices[0]?.message?.content || '';

    const cleaned = content
      .replace(/^```(json)?\s*/m, '')
      .replace(/\s*```$/, '')
      .trim();

    let jsonStr = cleaned;
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    if (firstBracket >= 0 && lastBracket > firstBracket) {
      jsonStr = cleaned.substring(firstBracket, lastBracket + 1);
    }

    const parsed = JSON.parse(jsonStr);
    if (!Array.isArray(parsed) || parsed.length !== items.length) {
      console.error(`   解析結果數量不符: ${parsed.length}/${items.length}`);
      return null;
    }

    return items.map((orig, i) => ({
      ...orig,
      interpretation: parsed[i]?.interpretation || orig.interpretation,
    }));
  } catch (err) {
    console.error(`   修復失敗: ${(err as Error).message}`);
    return null;
  }
}

function loadProgress(): string[] {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveProgress(list: string[]) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

async function main() {
  const batchSize = Math.max(1, parseInt(process.argv[3] || '5', 10));
  const concurrency = Math.max(1, parseInt(process.argv[4] || '1', 10));

  const rows: FixRow[] = JSON.parse(fs.readFileSync(FIX_FILE, 'utf8'));
  console.log(`共 ${rows.length} 行待修復（${TARGET}），批次 ${batchSize}，並行 ${concurrency}`);

  const done = loadProgress();
  const pending: FixRow[] = rows.filter(r => !done.includes(String(r.card_id) + r.orientation + (r.scenario_key || '') + (r.position_key || '')));
  console.log(`已完成 ${done.length} 行，剩餘 ${pending.length} 行`);

  if (pending.length === 0) {
    console.log('✅ 全部已完成');
    return;
  }

  // 分批
  const batches: FixRow[][] = [];
  for (let i = 0; i < pending.length; i += batchSize) {
    batches.push(pending.slice(i, i + batchSize));
  }

  let next = 0;
  let success = 0;
  let fail = 0;

  const worker = async () => {
    while (true) {
      const idx = next++;
      if (idx >= batches.length) break;
      const batch = batches[idx];
      const result = await fixBatch(batch);
      if (result) {
        // upsert 回 DB
        const rows = result.map(r => ({
          card_id: r.card_id,
          card_name: r.card_name,
          orientation: r.orientation,
          scenario_key: r.scenario_key,
          position_key: r.position_key,
          interpretation: r.interpretation,
          language: TARGET,
        }));
        const { error } = await supabase
          .from('oracle_interpretations')
          .upsert(rows, {
            onConflict: 'card_id,orientation,scenario_key,position_key,language',
            ignoreDuplicates: false,
          });
        if (error) {
          console.error(`   upsert 失敗: ${error.message}`);
          fail += batch.length;
          continue;
        }
        for (const r of batch) {
          done.push(String(r.card_id) + r.orientation + (r.scenario_key || '') + (r.position_key || ''));
        }
        saveProgress(done);
        success += batch.length;
        console.log(`  ✅ 完成 ${batch.length} 行，累計成功 ${success}`);
      } else {
        fail += batch.length;
        console.log(`  ❌ 失敗 ${batch.length} 行，累計失敗 ${fail}`);
      }
    }
  };

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`\n修復完成：成功 ${success}，失敗 ${fail}`);
}

main().catch(err => {
  console.error('執行失敗:', err);
  process.exit(1);
});
