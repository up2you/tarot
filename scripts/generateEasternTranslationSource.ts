/**
 * 產生東方詮釋的翻譯工作檔（純文字 JSON，供翻譯 subagent 使用）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EASTERN_CARD_INTERPRETATIONS } from '../data/easternInterpretations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workFile = {
  instructions: '將以下 22 張大阿爾卡納塔羅牌的「東方智慧詮釋」翻譯為目標語言。這是道家/易經/陰陽/禪的現代白話解讀，翻譯時請保持：1) 現代白話口語（非文言文）；2) 保留易經卦名、道家術語的合理轉譯（可加註或意譯）；3) 溫暖真誠、清楚易懂的語氣；4) 不要省略任何內容。',
  cards: EASTERN_CARD_INTERPRETATIONS.map(c => ({
    cardId: c.cardId,
    cardName: c.cardName,
    upright: c.upright,
    reversed: c.reversed,
  })),
};

const outPath = path.join(__dirname, '../data/eastern_translation_source.json');
fs.writeFileSync(outPath, JSON.stringify(workFile, null, 2), 'utf8');
console.log(`✅ 翻譯工作檔已寫入: ${outPath}`);
console.log(`   含 ${workFile.cards.length} 張牌`);
