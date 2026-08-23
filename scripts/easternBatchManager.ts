/**
 * 東方詮釋批次管理
 * 將西方神諭資料切成小批次，支援進度追蹤與續跑
 * 進度檔：data/eastern_progress.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const BATCH_DIR = path.join(DATA_DIR, 'eastern_batches');
const PROGRESS_FILE = path.join(DATA_DIR, 'eastern_progress.json');

// 每批筆數（subagent 可處理的量）
const BATCH_SIZE = 5;

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

export function loadProgress(): Progress {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    }
  } catch { /* ignore */ }
  return { total: 0, completed: 0, failed: 0, batchFiles: [] };
}

export function saveProgress(p: Progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2), 'utf8');
}

/** 將西方資料切成批次（若批次已存在則略過） */
export function createBatches(sourceFile: string): Progress {
  const progress = loadProgress();
  if (progress.batchFiles.length > 0) {
    console.log(`批次已存在（${progress.batchFiles.length} 個），跳過切分`);
    return progress;
  }

  const allData: OracleItem[] = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
  fs.mkdirSync(BATCH_DIR, { recursive: true });

  const batchFiles: string[] = [];
  for (let i = 0; i < allData.length; i += BATCH_SIZE) {
    const batch = allData.slice(i, i + BATCH_SIZE);
    const fileName = `batch_${String(Math.floor(i / BATCH_SIZE)).padStart(5, '0')}.json`;
    fs.writeFileSync(
      path.join(BATCH_DIR, fileName),
      JSON.stringify(batch, null, 1),
      'utf8'
    );
    batchFiles.push(fileName);
  }

  const newProgress = {
    total: allData.length,
    completed: 0,
    failed: 0,
    batchFiles,
  };
  saveProgress(newProgress);
  console.log(`✅ 已切分 ${allData.length} 筆 → ${batchFiles.length} 個批次`);
  return newProgress;
}

/** 取得下一個待處理的批次 */
export function getNextBatch(progress: Progress): { index: number; file: string; data: OracleItem[] } | null {
  // 從完成的檔案數量推斷進度
  for (let i = 0; i < progress.batchFiles.length; i++) {
    const file = progress.batchFiles[i];
    const outFile = path.join(DATA_DIR, `eastern_done/${file}`);
    if (!fs.existsSync(outFile)) {
      const data = JSON.parse(fs.readFileSync(path.join(BATCH_DIR, file), 'utf8'));
      return { index: i, file, data };
    }
  }
  return null;
}

// CLI 執行：切分批次
if (process.argv[2] === 'split') {
  const source = process.argv[3] || path.join(DATA_DIR, 'oracle_batches/oracle_zhTW_all.json');
  createBatches(source);
}
