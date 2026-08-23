/**
 * 東方詮釋批量轉換引擎
 * 讀取批次檔 → 呼叫 DeepSeek API 轉換為東方智慧視角 → 寫回結果 → 更新進度
 *
 * 用法：
 *   $env:DEEPSEEK_API_KEY="sk-..." npx tsx scripts/easternConvertEngine.ts [批次數]
 *   [批次數] 可選：預設處理 1 個批次；設 N 則處理 N 個批次
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const BATCH_DIR = path.join(DATA_DIR, 'eastern_batches');
const DONE_DIR = path.join(DATA_DIR, 'eastern_done');
const PROGRESS_FILE = path.join(DATA_DIR, 'eastern_progress.json');

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const API_KEY = process.env.DEEPSEEK_API_KEY;

if (!API_KEY) {
  console.error('❌ 缺少 DEEPSEEK_API_KEY 環境變數');
  process.exit(1);
}

interface OracleItem {
  card_id: number;
  card_name: string;
  orientation: 'upright' | 'reversed';
  scenario_key: string;
  position_key: string;
  interpretation: string;
}

interface Progress {
  total: number;
  completed: number;
  failed: number;
  batchFiles: string[];
}

function loadProgress(): Progress {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  } catch {
    return { total: 0, completed: 0, failed: 0, batchFiles: [] };
  }
}

function saveProgress(p: Progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2), 'utf8');
}

/** 呼叫 DeepSeek 轉換一批 */
async function convertBatch(items: OracleItem[]): Promise<OracleItem[] | null> {
  const input = items.map(it => ({
    cardId: it.card_id,
    cardName: it.card_name,
    orientation: it.orientation,
    scenario: it.scenario_key,
    position: it.position_key,
    interpretation: it.interpretation,
  }));

  const prompt = `你是一位精通塔羅牌與東方哲學（道家/易經/陰陽五行/禪）的內容創作專家。

請將以下 ${items.length} 筆西方塔羅神諭解讀，轉換為「東方智慧視角」的解讀。

【轉換要求】
1. 保持 cardId、cardName、orientation、scenario、position 不變。
2. 用東方智慧（道家/易經/陰陽五行/禪）的語言重新詮釋——引用卦象（乾卦/坤卦/未濟卦等）、陰陽消長、順勢而為、守靜致虛、上善若水等概念。
3. 現代白話口語（「親愛的朋友」口吻），溫暖真誠、清楚易懂，絕對不用文言文（汝/吾/之乎者也）。
4. 維持與原文相同的主旨與建議，長度相近（300-600字），「開場共鳴 → 深層分析（東方哲理）→ 具體建議」三段結構。
5. 不要直接翻譯原文，而是用東方智慧重新詮釋同樣的牌意與建議。

【輸入資料（JSON 陣列）】
${JSON.stringify(input, null, 1)}

【輸出格式】
只輸出 JSON 陣列（不要 markdown 程式碼塊、不要其他文字）：
[{"cardId": 對應輸入的cardId, "interpretation": "東方智慧解讀文字"}, ...]

每筆輸出的 cardId 必須與輸入一一對應，共 ${items.length} 筆，依序排列。`;

  try {
    const body = JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
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

    // 清理可能包圍的 markdown 程式碼塊
    const cleaned = content
      .replace(/^```(json)?\s*/m, '')
      .replace(/\s*```$/, '')
      .trim();

    // 容錯：從內容中擷取第一個 [ 到最後一個 ]
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

    // 組回完整資料（保留原欄位 + 新 interpretation）
    return items.map((orig, i) => ({
      ...orig,
      interpretation: parsed[i]?.interpretation || orig.interpretation,
    }));
  } catch (err) {
    console.error(`   轉換失敗: ${(err as Error).message}`);
    return null;
  }
}

async function main() {
  const maxBatches = parseInt(process.argv[2] || '1', 10);
  fs.mkdirSync(DONE_DIR, { recursive: true });

  const progress = loadProgress();
  let processed = 0;

  for (const file of progress.batchFiles) {
    if (processed >= maxBatches) break;
    const doneFile = path.join(DONE_DIR, file);
    if (fs.existsSync(doneFile)) continue; // 已完成

    const batchPath = path.join(BATCH_DIR, file);
    const items: OracleItem[] = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

    console.log(`[${file}] 轉換中 (${items.length} 筆)...`);
    const result = await convertBatch(items);

    if (result) {
      fs.writeFileSync(doneFile, JSON.stringify(result, null, 1), 'utf8');
      progress.completed += items.length;
      console.log(`  ✅ 完成，累計 ${progress.completed}/${progress.total}`);
    } else {
      progress.failed += items.length;
      console.log(`  ❌ 失敗，累計失敗 ${progress.failed}`);
    }

    saveProgress(progress);
    processed++;

    // 小憩避免限流
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n本次處理 ${processed} 個批次。總進度: ${progress.completed}/${progress.total} (失敗 ${progress.failed})`);
  if (progress.completed >= progress.total) {
    console.log('🎉 全部完成！');
  }
}

main().catch(err => {
  console.error('執行失敗:', err);
  process.exit(1);
});
