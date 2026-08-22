/**
 * ============================================================
 * Oracle Multi-Language Batch Translator
 * ============================================================
 * 
 * Translates oracle_interpretations and oracle_summaries
 * from zh-TW → en, ja, ko, zh-CN via DeepSeek API.
 * 
 * Usage: node scripts/translate_oracle.cjs
 *        node scripts/translate_oracle.cjs summaries     (summaries only)
 *        node scripts/translate_oracle.cjs interpretations (interpretations only)
 *        node scripts/translate_oracle.cjs --lang en,ja  (specific languages)
 *        node scripts/translate_oracle.cjs --dry-run     (preview only)
 * 
 * Progress is auto-saved after each batch; Ctrl+C is safe.
 */

// Unbuffered stdout for real-time log visibility when output is redirected
if (process.stdout._handle && typeof process.stdout._handle.setBlocking === 'function') {
  process.stdout._handle.setBlocking(true);
}

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ============================================================
// CONFIGURATION
// ============================================================

const CONFIG = {
  // Source language
  sourceLang: 'zh-TW',

  // Target languages (can override with --lang)
  targetLangs: ['zh-CN', 'en', 'ja', 'ko'],

  // API settings
  batchSize: 25,             // interpretations per API call (default)
  batchSizeSmall: 8,         // for languages with higher token usage (ja, ko)
  highTokenLangs: ['en', 'ja', 'ko'],
  summaryBatchSize: 30,     // summaries per API call
  maxRetries: 3,            // retries on API error
  delayBetweenBatches: 800, // ms between API calls (rate limiting)

  // DeepSeek model
  model: 'deepseek-chat',
  normalMaxTokens: 32768,
  highTokenMaxTokens: 32768,

  // Progress file
  progressFile: path.join(__dirname, 'translate_progress.json'),

  // Tables to translate
  tables: {
    interpretations: {
      table: 'oracle_interpretations',
      textCol: 'interpretation',
      keyCols: ['card_id', 'card_name', 'orientation', 'scenario_key', 'position_key'],
      dedupeCol: 'interpretation', // deduplicate by this column to save API costs
    },
    summaries: {
      table: 'oracle_summaries',
      textCol: 'summary',
      keyCols: ['pattern_key'],
      dedupeCol: 'summary',
    },
  },
};

// ============================================================
// HELPERS
// ============================================================

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env file not found at', envPath);
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.substring(0, eqIdx).trim();
    const value = trimmed.substring(eqIdx + 1).trim();
    env[key] = value;
  }
  return env;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadProgress() {
  if (fs.existsSync(CONFIG.progressFile)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG.progressFile, 'utf8'));
    } catch (e) {
      console.warn('Warning: corrupted progress file, starting fresh');
      return {};
    }
  }
  return {};
}

function saveProgress(progress) {
  fs.writeFileSync(CONFIG.progressFile, JSON.stringify(progress, null, 2), 'utf8');
}

// ============================================================
// PROCESS LOCK (prevents costly duplicate runs)
// ============================================================

function isPidAlive(pid) {
  try {
    require('child_process').execSync(`tasklist /FI "PID eq ${pid}" 2>nul`, { encoding: 'utf8' });
    const result = require('child_process').execSync(`tasklist /FI "PID eq ${pid}"`, { encoding: 'utf8' });
    return result.includes(String(pid));
  } catch (_) {
    return false;
  }
}

function acquireLock(table, lang) {
  const lockFile = path.join(__dirname, `translate_lock_${table}_${lang}.lock`);
  if (fs.existsSync(lockFile)) {
    const oldPid = parseInt(fs.readFileSync(lockFile, 'utf8').trim(), 10);
    if (!isNaN(oldPid) && isPidAlive(oldPid)) {
      console.error(`\n❌ Another process (PID ${oldPid}) is already translating ${table} → ${lang}`);
      console.error(`   Remove lock file to force: ${lockFile}\n`);
      return false;
    }
    console.warn(`  Stale lock PID ${oldPid} is dead, overwriting...`);
  }
  fs.writeFileSync(lockFile, String(process.pid), 'utf8');
  console.log(`  🔒 Lock acquired (PID ${process.pid})`);
  _setHeldLock(table, lang);
  return true;
}

function releaseLock(table, lang) {
  const lockFile = path.join(__dirname, `translate_lock_${table}_${lang}.lock`);
  try { fs.unlinkSync(lockFile); } catch (_) {}
}

// Cleanup all lock files on exit (best-effort)
let _heldLock = null;
function _setHeldLock(table, lang) { _heldLock = { table, lang }; }
function _releaseHeldLock() { if (_heldLock) { releaseLock(_heldLock.table, _heldLock.lang); _heldLock = null; } }
process.on('exit', _releaseHeldLock);
process.on('SIGINT', () => { _releaseHeldLock(); process.exit(0); });
process.on('SIGTERM', () => { _releaseHeldLock(); process.exit(0); });

// ============================================================
// TRANSLATION API
// ============================================================

function buildTranslationPrompt(texts, sourceLang, targetLang) {
  const langNames = {
    'zh-CN': '簡體中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'ja': '日本語',
    'ko': '한국어',
  };

  const items = texts.map((t, i) => `[${i + 1}] ${t}`).join('\n\n---\n\n');

  return {
    model: CONFIG.model,
    messages: [
      {
        role: 'system',
        content: `你是一位專業的塔羅牌占卜翻譯師。請將以下神諭解讀從${langNames[sourceLang] || sourceLang}翻譯成${langNames[targetLang] || targetLang}。

翻譯規則：
1. 保持原文的情感語氣與溫暖感
2. 保留所有特殊標記格式：【方位：...】、【建議：...】、【最終回答：...】
3. 保留 Markdown 格式（# 標題、**粗體**、- 列表）
4. 塔羅牌名稱保持與原文一致或使用該語言通用譯名
5. 占卜術語使用該語言的自然表達方式
6. 不要添加或刪除內容，純翻譯

請以 JSON 陣列回覆，每個元素對應一筆翻譯：
[
  "第一筆翻譯結果",
  "第二筆翻譯結果",
  ...
]

只回傳 JSON 陣列，不要有其他文字。`,
      },
      {
        role: 'user',
        content: `請將以下 ${texts.length} 筆神諭解讀翻譯成${langNames[targetLang] || targetLang}：\n\n${items}`,
      },
    ],
    temperature: 0.3,
    max_tokens: CONFIG.highTokenLangs.includes(targetLang) ? CONFIG.highTokenMaxTokens : CONFIG.normalMaxTokens,
  };
}

async function translateBatch(apiKey, texts, sourceLang, targetLang, retries = 0) {
  const body = buildTranslationPrompt(texts, sourceLang, targetLang);

  // Timeout promise that rejects after 180s
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('API timeout after 180s')), 180000)
  );

  try {
    const response = await Promise.race([
      fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      }),
      timeoutPromise,
    ]);

    if (!response.ok) {
      const errText = await Promise.race([response.text(), timeoutPromise]);
      throw new Error(`API ${response.status}: ${errText.substring(0, 200)}`);
    }

    // Read full response body with timeout protection
    const rawText = await Promise.race([response.text(), timeoutPromise]);
    if (!rawText.trim()) {
      throw new Error('Empty API response');
    }

    // Parse the outer API response JSON
    const apiResponse = safeParseJSON(rawText);
    const content = apiResponse?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('Empty content in API response choices');
    }

    // Parse JSON array from the content
    // Handle potential markdown code block wrapping
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    // Debug: save raw content on parse failure
    const debugPath = path.join(__dirname, '..', `debug_${targetLang}_response.txt`);
    const translations = safeParseJSON(jsonStr, { debugPath });

    if (!Array.isArray(translations)) {
      throw new Error('Response is not an array');
    }

    return translations;
  } catch (err) {
    if (retries < CONFIG.maxRetries) {
      console.warn(`  Retry ${retries + 1}/${CONFIG.maxRetries} after error: ${err.message}`);
      await sleep(2000 * (retries + 1));
      return translateBatch(apiKey, texts, sourceLang, targetLang, retries + 1);
    }
    throw err;
  }
}

// ============================================================
// DATABASE OPERATIONS
// ============================================================

async function getUntranslatedKeys(supabase, tableInfo, sourceLang, targetLang) {
  const { table, keyCols, textCol } = tableInfo;

  const pageSize = 1000;

  // Keyset pagination on 'id' — OFFSET-based pagination triggers Postgres
  // "statement timeout" on large tables (30k+ rows), so we page by id cursor instead.
  async function fetchAll(selectCols, lang) {
    const rows = [];
    let lastId = null;
    while (true) {
      let query = supabase
        .from(table)
        .select(selectCols)
        .eq('language', lang)
        .order('id', { ascending: true })
        .limit(pageSize);
      if (lastId !== null) query = query.gt('id', lastId);
      const { data, error } = await query;
      if (error) throw error;
      if (!data || data.length === 0) break;
      rows.push(...data);
      if (data.length < pageSize) break;
      lastId = data[data.length - 1].id;
    }
    return rows;
  }

  // Get all source-language rows
  let sourceRows;
  try {
    sourceRows = await fetchAll(`${keyCols.join(',')}, ${textCol}, id`, sourceLang);
  } catch (err) {
    console.error('Error fetching source rows:', err.message);
    return [];
  }
  console.log(`  Total ${sourceLang} rows: ${sourceRows.length}`);

  // Get already-translated key sets
  const translatedKeys = new Set();
  try {
    const translatedRows = await fetchAll(`${keyCols.join(',')}, id`, targetLang);
    for (const row of translatedRows) {
      const key = keyCols.map(k => row[k]).join('|');
      translatedKeys.add(key);
    }
  } catch (err) {
    console.error('Error fetching translated rows:', err.message);
  }
  console.log(`  Already translated (${targetLang}): ${translatedKeys.size}`);

  // Filter out already-translated
  const untranslated = sourceRows.filter(row => {
    const key = keyCols.map(k => row[k]).join('|');
    return !translatedKeys.has(key);
  });

  console.log(`  Remaining to translate: ${untranslated.length}`);
  return untranslated;
}

async function insertTranslations(supabase, tableName, rows, targetLang) {
  if (rows.length === 0) return;

  const toInsert = rows.map(r => ({ ...r, language: targetLang }));

  // Use upsert to handle concurrent processes and resume scenarios
  const chunkSize = 100;
  for (let i = 0; i < toInsert.length; i += chunkSize) {
    const chunk = toInsert.slice(i, i + chunkSize);
    const { error } = await supabase.from(tableName).upsert(chunk, {
      onConflict: tableName === 'oracle_summaries'
        ? 'pattern_key, language'
        : 'card_id, orientation, scenario_key, position_key, language',
      ignoreDuplicates: false,
    });

    if (error) {
      console.error(`  Insert error (offset ${i}):`, error.message);
    }
  }
}

// ============================================================
// MAIN TRANSLATION LOGIC
// ============================================================

async function translateTable(
  supabase,
  apiKey,
  tableKey,
  targetLang,
  progress,
  options = {}
) {
  const tableInfo = CONFIG.tables[tableKey];
  if (!tableInfo) {
    console.error(`Unknown table key: ${tableKey}`);
    return;
  }

  const { table, textCol, keyCols, dedupeCol } = tableInfo;
  const batchSize = tableKey === 'summaries' ? CONFIG.summaryBatchSize
    : (CONFIG.highTokenLangs && CONFIG.highTokenLangs.includes(targetLang) ? CONFIG.batchSizeSmall : CONFIG.batchSize);

  // Acquire process lock to prevent duplicate runs
  if (!acquireLock(tableKey, targetLang)) {
    console.error('  Skipping this table+language.\n');
    return;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Translating ${table} → ${targetLang}`);
  console.log(`${'='.repeat(60)}`);

  // Get untranslated rows
  const untranslated = await getUntranslatedKeys(supabase, tableInfo, CONFIG.sourceLang, targetLang);

  if (untranslated.length === 0) {
    console.log('  ✅ All done! Nothing to translate.');
    releaseLock(tableKey, targetLang);
    return;
  }

  // Deduplicate by text content
  const textMap = new Map(); // text → [rows]
  for (const row of untranslated) {
    const text = row[textCol];
    if (!text || text.length < 10) continue;
    if (!textMap.has(text)) {
      textMap.set(text, []);
    }
    textMap.get(text).push(row);
  }

  const uniqueTexts = Array.from(textMap.keys());
  console.log(`  Unique texts to translate: ${uniqueTexts.length} (deduped from ${untranslated.length})`);

  // Progress tracks batch completion for resume safety.
  // We always process all remaining texts; upsert handles duplicates.
  const progressKey = `${table}_${targetLang}`;
  if (!progress[progressKey]) {
    progress[progressKey] = { batchesDone: 0, totalBatches: Math.ceil(uniqueTexts.length / batchSize) };
  }

  let totalInserted = 0;

  // Process in batches from 0 (DB filters already-translated, so this is the remaining set)
  for (let i = 0; i < uniqueTexts.length; i += batchSize) {
    const batchTexts = uniqueTexts.slice(i, i + batchSize);

    process.stdout.write(`  Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(uniqueTexts.length / batchSize)} `);
    process.stdout.write(`(texts ${i + 1}-${Math.min(i + batchSize, uniqueTexts.length)}/${uniqueTexts.length})... `);

    try {
      // Translate
      const translations = await translateBatch(apiKey, batchTexts, CONFIG.sourceLang, targetLang);

      // If API returned fewer translations than expected, retry missing texts in smaller batches
      let fullTranslations = translations;
      if (translations.length < batchTexts.length || translations.filter(t => !t).length > 0) {
        // Find failed/missing text indices
        const failedTexts = [];
        for (let j = 0; j < batchTexts.length; j++) {
          if (j >= translations.length || !translations[j]) {
            failedTexts.push({ index: j, text: batchTexts[j] });
          }
        }
        // Retry each failed text individually
        for (const ft of failedTexts) {
          try {
            console.error(`\n    [RETRY] text #${i + ft.index + 1} individually`);
            const retryResult = await translateBatch(apiKey, [ft.text], CONFIG.sourceLang, targetLang);
            if (retryResult && retryResult.length > 0 && retryResult[0]) {
              fullTranslations[ft.index] = retryResult[0];
            }
          } catch (retryErr) {
            console.error(`\n    [RETRY FAILED] text #${i + ft.index + 1}: ${retryErr.message}`);
          }
        }
      }

      // Map translations back to rows
      const rowsToInsert = [];
      for (let j = 0; j < batchTexts.length; j++) {
        const originalText = batchTexts[j];
        const translatedText = fullTranslations[j];

        if (!translatedText) {
          console.warn(`\n    Warning: missing translation for text #${i + j + 1}`);
          continue;
        }

        // Get all source rows that share this text
        const sourceRows = textMap.get(originalText) || [];
        for (const sourceRow of sourceRows) {
          const newRow = {};
          // Copy key columns
          for (const col of keyCols) {
            newRow[col] = sourceRow[col];
          }
          // Set translated text
          newRow[textCol] = translatedText;
          rowsToInsert.push(newRow);
        }
      }

      // Insert to DB
      if (rowsToInsert.length > 0) {
        await insertTranslations(supabase, table, rowsToInsert, targetLang);
        totalInserted += rowsToInsert.length;
      }

      console.log(`✓ (inserted ${rowsToInsert.length} rows, total: ${totalInserted})`);
    } catch (err) {
      console.error(`\n  ❌ Batch failed: ${err.message}`);
      console.error('  Saving progress and stopping. Run again to resume.');
      progress[progressKey].batchesDone = Math.floor(i / batchSize);
      progress[progressKey].lastError = err.message;
      saveProgress(progress);
      releaseLock(tableKey, targetLang);
      return;
    }

    // Save progress
    progress[progressKey].batchesDone = Math.floor(i / batchSize) + 1;
    saveProgress(progress);

    // Rate limiting
    if (i + batchSize < uniqueTexts.length) {
      await sleep(CONFIG.delayBetweenBatches);
    }
  }

  // Mark as complete
  progress[progressKey].completed = true;
  progress[progressKey].batchesDone = Math.ceil(uniqueTexts.length / batchSize);
  saveProgress(progress);

  console.log(`  ✅ ${table} → ${targetLang}: COMPLETE (${totalInserted} rows inserted)`);
  releaseLock(tableKey, targetLang);
}

// ============================================================
// ENTRY POINT
// ============================================================

async function main() {
  console.log('🃏 Aetheris Oracle Multi-Language Translator');
  console.log('============================================\n');

  // Parse arguments
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  // Determine which tables to translate
  let tables = ['summaries', 'interpretations'];
  if (args.includes('summaries') && !args.includes('interpretations')) {
    tables = ['summaries'];
  } else if (args.includes('interpretations') && !args.includes('summaries')) {
    tables = ['interpretations'];
  }

  // Custom progress file (for parallel execution)
  const progressArg = args.find(a => a.startsWith('--progress-file='));
  if (progressArg) {
    CONFIG.progressFile = progressArg.replace('--progress-file=', '');
  }

  // Determine target languages
  let targetLangs = CONFIG.targetLangs;
  const langArg = args.find(a => a.startsWith('--lang='));
  if (langArg) {
    targetLangs = langArg.replace('--lang=', '').split(',').map(s => s.trim());
  }

  // Load config
  const env = loadEnv();
  const apiKey = env.DEEPSEEK_API_KEY;

  if (!dryRun && (!apiKey || apiKey === 'your_deepseek_key_here')) {
    console.error('❌ DEEPSEEK_API_KEY not set in .env');
    console.error('   Please add your DeepSeek API key to D:\\TL\\.env');
    process.exit(1);
  }

  const supabaseUrl = env.VITE_SUPABASE_URL;
  const serviceKey = env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Supabase config missing in .env');
    process.exit(1);
  }

  if (dryRun) {
    console.log('🔍 DRY RUN MODE — no API calls, no DB writes\n');
  }

  // Connect
  const supabase = createClient(supabaseUrl, serviceKey);

  // Test connection
  const { data: test, error: testErr } = await supabase
    .from('oracle_interpretations')
    .select('id')
    .limit(1);
  if (testErr) {
    console.error('❌ Supabase connection failed:', testErr.message);
    process.exit(1);
  }
  console.log('✅ Supabase connected\n');

  // Load progress
  const progress = loadProgress();

  // Display plan
  console.log(`Target languages: ${targetLangs.join(', ')}`);
  console.log(`Tables: ${tables.join(', ')}`);
  console.log(`Batch size: ${CONFIG.batchSize} (interpretations), ${CONFIG.summaryBatchSize} (summaries)`);
  console.log(`Model: ${CONFIG.model}\n`);

  // Estimate cost
  if (!dryRun) {
    console.log('⏱️  Starting translation... (Ctrl+C to pause, run again to resume)\n');
  }

  // Process each table and language
  for (const table of tables) {
    for (const lang of targetLangs) {
      if (lang === CONFIG.sourceLang) continue;

      if (dryRun) {
        const tableInfo = CONFIG.tables[table];
        const untranslated = await getUntranslatedKeys(supabase, tableInfo, CONFIG.sourceLang, lang);
        const uniqueCount = new Set(untranslated.map(r => r[tableInfo.dedupeCol])).size;
        const batches = Math.ceil(uniqueCount / (table === 'summaries' ? CONFIG.summaryBatchSize : CONFIG.batchSize));
        console.log(`  [DRY RUN] ${table} → ${lang}: ${untranslated.length} rows, ${uniqueCount} unique texts, ~${batches} batches`);
        continue;
      }

      await translateTable(supabase, apiKey, table, lang, progress);
    }
  }

  console.log('\n✨ Translation complete!');
  console.log(`Progress saved to: ${CONFIG.progressFile}`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
function safeParseJSON(jsonStr, opts = {}) {
  // Try standard parse first
  try {
    return JSON.parse(jsonStr);
  } catch (err1) {
    // If it fails, try to fix common AI output issues:
    // 1. Unescaped newlines inside JSON string values (DeepSeek common bug)
    // 2. Trailing content after the array
    try {
      const sanitized = sanitizeJsonStrings(jsonStr);
      return JSON.parse(sanitized);
    } catch (err2) {
      // Save raw response for debugging
      if (opts.debugPath) {
        try {
          fs.writeFileSync(opts.debugPath, jsonStr, 'utf8');
          console.error(`\n    [DEBUG] Raw response saved to ${opts.debugPath} (${jsonStr.length} chars)`);
        } catch (_) {}
      }
      // Give up and throw the original error with context
      const preview = jsonStr.length > 500 ? jsonStr.substring(0, 500) + '...' : jsonStr;
      throw new Error(`${err1.message}\n  [Fallback also failed: ${err2.message}]\n  Raw preview: ${preview}`);
    }
  }
}

function sanitizeJsonStrings(str) {
  // State-machine: escape unescaped control chars & unescaped quotes inside JSON string values
  let result = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (escaped) {
      result += ch;
      escaped = false;
      continue;
    }

    if (inString) {
      if (ch === '\\') {
        escaped = true;
        result += ch;
      } else if (ch === '"') {
        // Check if this is a legitimate end-of-string quote or an unescaped literal quote
        // Look ahead for valid JSON endings (comma, closing bracket, colon, whitespace-space)
        const rest = str.substring(i + 1).trimStart();
        if (rest.startsWith(',') || rest.startsWith(']') || rest.startsWith('}') || rest.startsWith(':')) {
          // Legitimate end of string
          inString = false;
          result += ch;
        } else {
          // Unescaped literal quote inside text - escape it
          result += '\\"';
        }
      } else if (ch === '\n') {
        result += '\\n';
      } else if (ch === '\r') {
        result += '\\r';
      } else if (ch === '\t') {
        result += '\\t';
      } else {
        result += ch;
      }
    } else {
      if (ch === '"') {
        inString = true;
      }
      result += ch;
    }
  }

  return result;
}

