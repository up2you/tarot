
import * as fs from 'fs';
import * as path from 'path';

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
    upright: (card: any) => {
        // 根據不同牌卡提供針對性建議
        const adviceMap: Record<number, string> = {
            0: '勇敢踏出新的一步，嘗試你一直想做的事情。保持樂觀與好奇心。',
            1: '發揮你的創造力與技能，主動展現你的才能。這是實現計劃的好時機。',
            2: '傾聽你的直覺，給自己安靜思考的時間。答案就在內心深處。',
            3: '滋養自己與他人，享受生活的豐盛。創造力將帶來美好成果。',
            4: '建立穩定的結構與規劃，展現你的領導力與決策能力。',
            5: '向經驗豐富的人學習，尊重傳統但也保持開放的態度。',
            6: '做出重要的選擇，傾聽內心的真實想法。和諧關係需要用心經營。',
            7: '保持專注與決心，克服障礙。你的意志力將帶你走向勝利。',
            8: '以溫柔與耐心面對挑戰，內在的力量比外在的強硬更有效。',
            9: '給自己獨處與反思的時間。尋求內在的智慧與指引。',
            10: '順應變化的自然節奏，把握轉機。好運正在眷顧你。',
            11: '做出公正的決定，面對真相。為你的選擇負責。',
            12: '換個角度看問題，有時暫停與等待反而是最好的策略。',
            13: '勇敢結束不再適合的事物，為新生創造空間。轉化正在發生。',
            14: '保持平衡與耐心，融合不同面向。中庸之道帶來和諧。',
            15: '認清束縛你的東西，做出改變的決定。你有力量掙脫限制。',
            16: '接受必要的改變，舊秩序的崩塌將帶來新的覺醒。',
            17: '保持希望與信念，療癒過去的傷痛。美好的未來正在等待。',
            18: '面對你的不安與恐懼，信任你的直覺引導你穿越迷霧。',
            19: '享受當下的快樂與成功，讓你的熱情與活力感染他人。',
            20: '回應內在的召喚，做出重要的決定。這是覺醒與重生的時刻。',
            21: '完成你的目標，慶祝成就。這是豐收與整合的時期。'
        };

        const advice = adviceMap[card.id] || '保持開放的心態，積極把握眼前的機會。';

        return `【本月運勢】${card.nameZh}（正位）
這個月的主題是「${card.meaning}」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到${card.meaning.split('、')[0]}的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。

【行動建議】
${advice}`;
    },

    reversed: (card: any) => {
        // 根據不同牌卡提供針對性建議
        const adviceMap: Record<number, string> = {
            0: '避免魯莽行事，在行動前先做好規劃。謹慎評估風險。',
            1: '檢視你的計劃是否完善，避免過度承諾。誠實面對自己的能力。',
            2: '重新連結你的直覺，不要忽視內心的聲音。開放心胸接受真相。',
            3: '照顧好自己的需求，不要過度依賴他人。重新點燃創造力。',
            4: '放鬆過度的控制慾，建立彈性的規則。剛柔並濟更有效。',
            5: '質疑不合時宜的傳統，找到適合自己的道路。',
            6: '延遲重要決定，先釐清內心真實想法。修復不和諧的關係。',
            7: '重新檢視方向，不要一味蠻幹。適時調整策略。',
            8: '面對內在的軟弱，重建自信。給自己休息與療癒的時間。',
            9: '走出孤立，與他人連結。獨處與社交需要平衡。',
            10: '接受暫時的停滯，不要抗拒改變。耐心等待新的循環。',
            11: '面對不公正的情況，為自己發聲。檢視是否逃避責任。',
            12: '停止無謂的犧牲，重新評估你的付出。行動起來而非停滯。',
            13: '面對你對改變的恐懼，學習放下。僵局需要被打破。',
            14: '重新找回平衡，避免極端。調整過度或不足的部分。',
            15: '覺察你的束縛模式，採取行動改變。自由需要勇氣。',
            16: '不要迴避必要的改變，面對內在的動盪。接受重建的過程。',
            17: '重拾信心與希望，不要放棄夢想。小步前進也是進步。',
            18: '釐清幻覺與真實，釋放內在的恐懼。尋求清晰與穩定。',
            19: '檢視過度樂觀的部分，面對現實。真實的快樂更持久。',
            20: '不要逃避重要的決定，傾聽內在的呼喚。給自己時間但不拖延。',
            21: '完成未竟之事，不要留下遺憾。為下階段做好準備。'
        };

        const advice = adviceMap[card.id] || '請放慢腳步，避免衝動行事。給自己多一點反思的時間。';

        return `【本月運勢】${card.nameZh}（逆位）
這個月你需要留意「${card.reversed}」的課題。逆位的${card.nameZh}顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。

【行動建議】
${advice}`;
    }
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
