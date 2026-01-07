"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// Define the cards and their basic meanings for generation
const MAJOR_ARCANA = [
    { id: 0, name: "The Fool", nameZh: "愚者", meaning: "新的開始、冒險、樂觀", reversed: "魯莽、風險、不成熟" },
    { id: 1, name: "The Magician", nameZh: "魔術師", meaning: "創造力、技能、顯化", reversed: "欺騙、缺乏計劃、潛能未發" },
    { id: 2, name: "The High Priestess", nameZh: "女教皇", meaning: "直覺、潛意識、神秘", reversed: "封閉、忽視直覺、秘密" },
    { id: 3, name: "The Empress", nameZh: "皇后", meaning: "豐盛、自然、創造力", reversed: "依賴、創造力受阻、停滯" },
    { id: 4, name: "The Emperor", nameZh: "皇帝", meaning: "權威、結構、穩定", reversed: "專制、缺乏紀律、僵化" },
    { id: 5, name: "The Hierophant", nameZh: "教皇", meaning: "傳統、學習、指導", reversed: "反叛、打破常規、迷信" },
    { id: 6, name: "The Lovers", nameZh: "戀人", meaning: "選擇、和諧、關係", reversed: "不和、錯誤選擇、分離" },
    { id: 7, name: "The Chariot", nameZh: "戰車", meaning: "意志力、勝利、行動", reversed: "失控、阻礙、方向迷失" },
    { id: 8, name: "Strength", nameZh: "力量", meaning: "內在力量、勇氣、耐心", reversed: "自我懷疑、軟弱、衝動" },
    { id: 9, name: "The Hermit", nameZh: "隱士", meaning: "內省、孤獨、尋求引導", reversed: "孤立、拒絕溝通、迷失" },
    { id: 10, name: "Wheel of Fortune", nameZh: "命運之輪", meaning: "轉變、運氣、循環", reversed: "厄運、抗拒改變、停滯" },
    { id: 11, name: "Justice", nameZh: "正義", meaning: "公平、真相、因果", reversed: "不公、偏見、逃避責任" },
    { id: 12, name: "The Hanged Man", nameZh: "倒吊人", meaning: "犧牲、新視角、等待", reversed: "無謂犧牲、停滯不前、掙扎" },
    { id: 13, name: "Death", nameZh: "死亡", meaning: "結束、轉化、重生", reversed: "恐懼改變、僵局、無法放下" },
    { id: 14, name: "Temperance", nameZh: "節制", meaning: "平衡、耐心、融合", reversed: "失衡、過度、缺乏和諧" },
    { id: 15, name: "The Devil", nameZh: "惡魔", meaning: "束縛、物質主義、誘惑", reversed: "掙脫束縛、覺醒、重獲自由" },
    { id: 16, name: "The Tower", nameZh: "高塔", meaning: "驟變、崩塌、覺醒", reversed: "勉強維持、恐懼災難、內在動盪" },
    { id: 17, name: "The Star", nameZh: "星星", meaning: "希望、靈感、療癒", reversed: "絕望、缺乏信心、黯淡" },
    { id: 18, name: "The Moon", nameZh: "月亮", meaning: "幻覺、不安、潛意識", reversed: "幻覺破滅、釋放恐懼、混亂" },
    { id: 19, name: "The Sun", nameZh: "太陽", meaning: "快樂、成功、活力", reversed: "短暫快樂、過度樂觀、陰影" },
    { id: 20, name: "Judgement", nameZh: "審判", meaning: "覺醒、召喚、決定", reversed: "猶豫不決、自我懷疑、逃避" },
    { id: 21, name: "The World", nameZh: "世界", meaning: "完成、整合、旅行", reversed: "未完成、延遲、缺乏收尾" },
];
const TEMPLATES = {
    upright: (card) => `【本月運勢】${card.nameZh}（正位）
這個月的主題是「${card.meaning}」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到${card.meaning.split('、')[0]}的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。

【行動建議】
保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。`,
    reversed: (card) => `【本月運勢】${card.nameZh}（逆位）
這個月你需要留意「${card.reversed}」的課題。逆位的${card.nameZh}顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。

【行動建議】
請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。`
};
const generateSql = () => {
    let sql = `-- Yearly Oracle Data (Shared Monthly)
-- Generated script
-- Scene: yearly
-- Position: monthly (Fallback for all months)

`;
    MAJOR_ARCANA.forEach(card => {
        // Upright
        const uprightText = TEMPLATES.upright(card);
        sql += `
INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (${card.id}, '${card.nameZh}', 'upright', 'yearly', 'monthly', '${uprightText.replace(/'/g, "''").replace(/\n/g, "\\n")}')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;
`;
        // Reversed
        const reversedText = TEMPLATES.reversed(card);
        sql += `
INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (${card.id}, '${card.nameZh}', 'reversed', 'yearly', 'monthly', '${reversedText.replace(/'/g, "''").replace(/\n/g, "\\n")}')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;
`;
    });
    return sql;
};
const outputPath = path.resolve(process.cwd(), '../data/yearly_oracle_data.sql');
fs.writeFileSync(outputPath, generateSql());
console.log(`Generated yearly oracle data at ${outputPath}`);
