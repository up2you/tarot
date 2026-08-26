/**
 * 東方詮釋批量翻譯引擎（zh-TW → en / ja / ko / zh-CN）
 * 讀取 data/eastern_done 的繁中已完成批次 → 呼叫 DeepSeek 翻譯為目標語言 → 寫入 data/eastern_done_{lang}
 *
 * 用法：
 *   $env:DEEPSEEK_API_KEY="sk-..." npx tsx scripts/easternTranslateEngine.ts <lang> [批次數] [並行度] [合併數]
 *   lang 必填：en | ja | ko | zh-CN
 *   [批次數] 可選：預設處理 1 個批次；設 N 則處理 N 個批次
 *   [並行度] 可選：預設 1（串行）；設 4 則同時處理 4 個批次（注意 API 速率限制）
 *   [合併數] 可選：預設 1；設 2 則每個 API 請求合併 2 個批次檔（10 筆），吞吐更高（max_tokens 8000 上限約 10 筆）
 *
 * 匯入時使用：
 *   $env:EASTERN_LANG=en npx tsx scripts/easternImportEngine.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const SRC_DONE_DIR = path.join(DATA_DIR, 'eastern_done');

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const API_KEY = process.env.DEEPSEEK_API_KEY;

const LANG_NAMES: Record<string, string> = {
  en: '英文（English）',
  ja: '日文（日本語）',
  ko: '韓文（한국어）',
  'zh-CN': '简体中文',
};

const TARGET_LANG = process.argv[2]?.trim();

if (!TARGET_LANG || !LANG_NAMES[TARGET_LANG]) {
  console.error('❌ 請指定目標語言：en | ja | ko | zh-CN');
  process.exit(1);
}
if (!API_KEY) {
  console.error('❌ 缺少 DEEPSEEK_API_KEY 環境變數');
  process.exit(1);
}

const DONE_DIR = path.join(DATA_DIR, `eastern_done_${TARGET_LANG}`);
const PROGRESS_FILE = path.join(DATA_DIR, `eastern_translate_${TARGET_LANG}_progress.json`);

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

/** 呼叫 DeepSeek 翻譯一批 */
async function translateBatch(items: OracleItem[]): Promise<OracleItem[] | null> {
  const input = items.map(it => ({
    cardId: it.card_id,
    cardName: it.card_name,
    orientation: it.orientation,
    scenario: it.scenario_key,
    position: it.position_key,
    interpretation: it.interpretation,
  }));

  const prompt = `你是一位精通塔羅牌與東方哲學（道家/易經/陰陽五行/禪）的專業翻譯。
請將以下 ${items.length} 筆繁體中文的「東方智慧塔羅詮釋」翻譯為${LANG_NAMES[TARGET_LANG]}。

【翻譯要求】
1. 保持 cardId、cardName、orientation、scenario、position 不變。
2. 現代口語、溫暖真誠，保持原文「親愛的朋友」式的親切口吻（用目標語言的自然對應表達）。
3. 保留易經卦名、道家術語的合理轉譯（如 乾卦→Hexagram Qian / Qian hexagram、陰陽→yin and yang、上善若水→the highest good is like water），讓不懂中文的讀者也能理解。
4. 保持「開場共鳴 → 深層分析（東方哲理）→ 具體建議」三段結構，長度與原文相近。
5. 絕對不要用文言文/古語/生硬直譯，要像母語者寫給朋友的溫暖建議。

【輸入資料（JSON 陣列）】
${JSON.stringify(input, null, 1)}

【輸出格式】
只輸出 JSON 陣列（不要 markdown 程式碼塊、不要其他文字）：
[{"cardId": 對應輸入的cardId, "interpretation": "目標語言詮釋文字"}, ...]

每筆輸出的 cardId 必須與輸入一一對應，共 ${items.length} 筆，依序排列。`;

  try {
    const body = JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
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

    // 組回完整資料（保留原欄位 + 翻譯後的 interpretation）
    return items.map((orig, i) => ({
      ...orig,
      interpretation: parsed[i]?.interpretation || orig.interpretation,
    }));
  } catch (err) {
    console.error(`   翻譯失敗: ${(err as Error).message}`);
    return null;
  }
}

async function main() {
  const maxBatches = parseInt(process.argv[3] || '1', 10);
  const concurrency = Math.max(1, parseInt(process.argv[4] || '1', 10));
  const mergeCount = Math.max(1, parseInt(process.argv[5] || '1', 10));
  fs.mkdirSync(DONE_DIR, { recursive: true });

  const srcFiles = fs
    .readdirSync(SRC_DONE_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  // 初始化進度（以來源批次為準）
  const progress = loadProgress();
  if (progress.batchFiles.length !== srcFiles.length) {
    progress.batchFiles = srcFiles;
    progress.total = 0;
    // 統計已完成：有 done 檔的批次
    const existing = fs.readdirSync(DONE_DIR).filter(f => f.endsWith('.json'));
    progress.completed = existing.length * 5;
    saveProgress(progress);
  }

  let processed = 0;
  const pending: string[] = [];

  // 收集待處理批次
  for (const file of progress.batchFiles) {
    if (processed >= maxBatches) break;
    const doneFile = path.join(DONE_DIR, file);
    if (fs.existsSync(doneFile)) continue; // 已翻譯
    const batchPath = path.join(SRC_DONE_DIR, file);
    if (!fs.existsSync(batchPath)) continue;
    pending.push(file);
    processed++;
  }

  console.log(`待翻譯 ${pending.length} 個批次，並行度 ${concurrency}，合併 ${mergeCount} 檔/請求...`);

  // 並行處理（簡單 worker pool）
  let next = 0;
  const worker = async () => {
    while (true) {
      const start = next;
      next += mergeCount;
      if (start >= pending.length) break;
      const files = pending.slice(start, start + mergeCount);
      const todo = files.filter(f => !fs.existsSync(path.join(DONE_DIR, f)));
      if (todo.length === 0) continue;

      // 合併多個批次檔為一次 API 請求
      const merged: { file: string; items: OracleItem[] }[] = [];
      for (const file of todo) {
        const items: OracleItem[] = JSON.parse(fs.readFileSync(path.join(SRC_DONE_DIR, file), 'utf8'));
        merged.push({ file, items });
      }
      const allItems = merged.flatMap(m => m.items);

      console.log(`[${todo.join(', ')}] 翻譯中 (${allItems.length} 筆)...`);
      const result = await translateBatch(allItems);

      if (result) {
        // 依序分配回各批次檔
        let offset = 0;
        for (const m of merged) {
          const slice = result.slice(offset, offset + m.items.length);
          offset += m.items.length;
          fs.writeFileSync(path.join(DONE_DIR, m.file), JSON.stringify(slice, null, 1), 'utf8');
        }
        progress.completed += allItems.length;
        console.log(`  ✅ 完成，累計 ${progress.completed}`);
      } else {
        progress.failed += allItems.length;
        console.log(`  ❌ 失敗，累計失敗 ${progress.failed}`);
      }
      saveProgress(progress);
      // 小憩避免限流
      await new Promise(r => setTimeout(r, 300));
    }
  };

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`\n本次處理 ${processed} 個批次（${TARGET_LANG}）。總進度: ${progress.completed}/${progress.total || '?'} (失敗 ${progress.failed})`);
}

main().catch(err => {
  console.error('執行失敗:', err);
  process.exit(1);
});
