-- Yearly Oracle Data (Shared Monthly)
-- Generated script
-- Scene: yearly
-- Position: monthly (Fallback for all months)


INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'upright', 'yearly', 'monthly', '【本月運勢】愚者（正位）\n這個月的主題是「新的開始、冒險、樂觀」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到新的開始的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n勇敢踏出新的一步，嘗試你一直想做的事情。保持樂觀與好奇心。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'reversed', 'yearly', 'monthly', '【本月運勢】愚者（逆位）\n這個月你需要留意「魯莽、風險、不成熟」的課題。逆位的愚者顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n避免魯莽行事，在行動前先做好規劃。謹慎評估風險。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'upright', 'yearly', 'monthly', '【本月運勢】魔術師（正位）\n這個月的主題是「創造力、技能、顯化」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到創造力的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n發揮你的創造力與技能，主動展現你的才能。這是實現計劃的好時機。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'reversed', 'yearly', 'monthly', '【本月運勢】魔術師（逆位）\n這個月你需要留意「欺騙、缺乏計劃、潛能未發」的課題。逆位的魔術師顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n檢視你的計劃是否完善，避免過度承諾。誠實面對自己的能力。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女教皇', 'upright', 'yearly', 'monthly', '【本月運勢】女教皇（正位）\n這個月的主題是「直覺、潛意識、神秘」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到直覺的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n傾聽你的直覺，給自己安靜思考的時間。答案就在內心深處。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女教皇', 'reversed', 'yearly', 'monthly', '【本月運勢】女教皇（逆位）\n這個月你需要留意「封閉、忽視直覺、秘密」的課題。逆位的女教皇顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n重新連結你的直覺，不要忽視內心的聲音。開放心胸接受真相。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '皇后', 'upright', 'yearly', 'monthly', '【本月運勢】皇后（正位）\n這個月的主題是「豐盛、自然、創造力」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到豐盛的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n滋養自己與他人，享受生活的豐盛。創造力將帶來美好成果。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '皇后', 'reversed', 'yearly', 'monthly', '【本月運勢】皇后（逆位）\n這個月你需要留意「依賴、創造力受阻、停滯」的課題。逆位的皇后顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n照顧好自己的需求，不要過度依賴他人。重新點燃創造力。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'upright', 'yearly', 'monthly', '【本月運勢】皇帝（正位）\n這個月的主題是「權威、結構、穩定」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到權威的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n建立穩定的結構與規劃，展現你的領導力與決策能力。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'reversed', 'yearly', 'monthly', '【本月運勢】皇帝（逆位）\n這個月你需要留意「專制、缺乏紀律、僵化」的課題。逆位的皇帝顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n放鬆過度的控制慾，建立彈性的規則。剛柔並濟更有效。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'upright', 'yearly', 'monthly', '【本月運勢】教皇（正位）\n這個月的主題是「傳統、學習、指導」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到傳統的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n向經驗豐富的人學習，尊重傳統但也保持開放的態度。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'reversed', 'yearly', 'monthly', '【本月運勢】教皇（逆位）\n這個月你需要留意「反叛、打破常規、迷信」的課題。逆位的教皇顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n質疑不合時宜的傳統，找到適合自己的道路。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'upright', 'yearly', 'monthly', '【本月運勢】戀人（正位）\n這個月的主題是「選擇、和諧、關係」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到選擇的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n做出重要的選擇，傾聽內心的真實想法。和諧關係需要用心經營。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'reversed', 'yearly', 'monthly', '【本月運勢】戀人（逆位）\n這個月你需要留意「不和、錯誤選擇、分離」的課題。逆位的戀人顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n延遲重要決定，先釐清內心真實想法。修復不和諧的關係。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'upright', 'yearly', 'monthly', '【本月運勢】戰車（正位）\n這個月的主題是「意志力、勝利、行動」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到意志力的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持專注與決心，克服障礙。你的意志力將帶你走向勝利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'reversed', 'yearly', 'monthly', '【本月運勢】戰車（逆位）\n這個月你需要留意「失控、阻礙、方向迷失」的課題。逆位的戰車顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n重新檢視方向，不要一味蠻幹。適時調整策略。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'upright', 'yearly', 'monthly', '【本月運勢】力量（正位）\n這個月的主題是「內在力量、勇氣、耐心」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到內在力量的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n以溫柔與耐心面對挑戰，內在的力量比外在的強硬更有效。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'reversed', 'yearly', 'monthly', '【本月運勢】力量（逆位）\n這個月你需要留意「自我懷疑、軟弱、衝動」的課題。逆位的力量顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n面對內在的軟弱，重建自信。給自己休息與療癒的時間。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱士', 'upright', 'yearly', 'monthly', '【本月運勢】隱士（正位）\n這個月的主題是「內省、孤獨、尋求引導」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到內省的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n給自己獨處與反思的時間。尋求內在的智慧與指引。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱士', 'reversed', 'yearly', 'monthly', '【本月運勢】隱士（逆位）\n這個月你需要留意「孤立、拒絕溝通、迷失」的課題。逆位的隱士顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n走出孤立，與他人連結。獨處與社交需要平衡。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'upright', 'yearly', 'monthly', '【本月運勢】命運之輪（正位）\n這個月的主題是「轉變、運氣、循環」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到轉變的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n順應變化的自然節奏，把握轉機。好運正在眷顧你。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'reversed', 'yearly', 'monthly', '【本月運勢】命運之輪（逆位）\n這個月你需要留意「厄運、抗拒改變、停滯」的課題。逆位的命運之輪顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n接受暫時的停滯，不要抗拒改變。耐心等待新的循環。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (11, '正義', 'upright', 'yearly', 'monthly', '【本月運勢】正義（正位）\n這個月的主題是「公平、真相、因果」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到公平的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n做出公正的決定，面對真相。為你的選擇負責。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (11, '正義', 'reversed', 'yearly', 'monthly', '【本月運勢】正義（逆位）\n這個月你需要留意「不公、偏見、逃避責任」的課題。逆位的正義顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n面對不公正的情況，為自己發聲。檢視是否逃避責任。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (12, '倒吊人', 'upright', 'yearly', 'monthly', '【本月運勢】倒吊人（正位）\n這個月的主題是「犧牲、新視角、等待」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到犧牲的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n換個角度看問題，有時暫停與等待反而是最好的策略。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (12, '倒吊人', 'reversed', 'yearly', 'monthly', '【本月運勢】倒吊人（逆位）\n這個月你需要留意「無謂犧牲、停滯不前、掙扎」的課題。逆位的倒吊人顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n停止無謂的犧牲，重新評估你的付出。行動起來而非停滯。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (13, '死亡', 'upright', 'yearly', 'monthly', '【本月運勢】死亡（正位）\n這個月的主題是「結束、轉化、重生」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到結束的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n勇敢結束不再適合的事物，為新生創造空間。轉化正在發生。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (13, '死亡', 'reversed', 'yearly', 'monthly', '【本月運勢】死亡（逆位）\n這個月你需要留意「恐懼改變、僵局、無法放下」的課題。逆位的死亡顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n面對你對改變的恐懼，學習放下。僵局需要被打破。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (14, '節制', 'upright', 'yearly', 'monthly', '【本月運勢】節制（正位）\n這個月的主題是「平衡、耐心、融合」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到平衡的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持平衡與耐心，融合不同面向。中庸之道帶來和諧。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (14, '節制', 'reversed', 'yearly', 'monthly', '【本月運勢】節制（逆位）\n這個月你需要留意「失衡、過度、缺乏和諧」的課題。逆位的節制顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n重新找回平衡，避免極端。調整過度或不足的部分。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (15, '惡魔', 'upright', 'yearly', 'monthly', '【本月運勢】惡魔（正位）\n這個月的主題是「束縛、物質主義、誘惑」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到束縛的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n認清束縛你的東西，做出改變的決定。你有力量掙脫限制。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (15, '惡魔', 'reversed', 'yearly', 'monthly', '【本月運勢】惡魔（逆位）\n這個月你需要留意「掙脫束縛、覺醒、重獲自由」的課題。逆位的惡魔顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n覺察你的束縛模式，採取行動改變。自由需要勇氣。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (16, '高塔', 'upright', 'yearly', 'monthly', '【本月運勢】高塔（正位）\n這個月的主題是「驟變、崩塌、覺醒」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到驟變的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n接受必要的改變，舊秩序的崩塌將帶來新的覺醒。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (16, '高塔', 'reversed', 'yearly', 'monthly', '【本月運勢】高塔（逆位）\n這個月你需要留意「勉強維持、恐懼災難、內在動盪」的課題。逆位的高塔顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n不要迴避必要的改變，面對內在的動盪。接受重建的過程。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (17, '星星', 'upright', 'yearly', 'monthly', '【本月運勢】星星（正位）\n這個月的主題是「希望、靈感、療癒」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到希望的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持希望與信念，療癒過去的傷痛。美好的未來正在等待。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (17, '星星', 'reversed', 'yearly', 'monthly', '【本月運勢】星星（逆位）\n這個月你需要留意「絕望、缺乏信心、黯淡」的課題。逆位的星星顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n重拾信心與希望，不要放棄夢想。小步前進也是進步。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (18, '月亮', 'upright', 'yearly', 'monthly', '【本月運勢】月亮（正位）\n這個月的主題是「幻覺、不安、潛意識」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到幻覺的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n面對你的不安與恐懼，信任你的直覺引導你穿越迷霧。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (18, '月亮', 'reversed', 'yearly', 'monthly', '【本月運勢】月亮（逆位）\n這個月你需要留意「幻覺破滅、釋放恐懼、混亂」的課題。逆位的月亮顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n釐清幻覺與真實，釋放內在的恐懼。尋求清晰與穩定。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (19, '太陽', 'upright', 'yearly', 'monthly', '【本月運勢】太陽（正位）\n這個月的主題是「快樂、成功、活力」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到快樂的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n享受當下的快樂與成功，讓你的熱情與活力感染他人。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (19, '太陽', 'reversed', 'yearly', 'monthly', '【本月運勢】太陽（逆位）\n這個月你需要留意「短暫快樂、過度樂觀、陰影」的課題。逆位的太陽顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n檢視過度樂觀的部分，面對現實。真實的快樂更持久。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (20, '審判', 'upright', 'yearly', 'monthly', '【本月運勢】審判（正位）\n這個月的主題是「覺醒、召喚、決定」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到覺醒的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n回應內在的召喚，做出重要的決定。這是覺醒與重生的時刻。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (20, '審判', 'reversed', 'yearly', 'monthly', '【本月運勢】審判（逆位）\n這個月你需要留意「猶豫不決、自我懷疑、逃避」的課題。逆位的審判顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n不要逃避重要的決定，傾聽內在的呼喚。給自己時間但不拖延。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (21, '世界', 'upright', 'yearly', 'monthly', '【本月運勢】世界（正位）\n這個月的主題是「完成、整合、旅行」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到完成的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n完成你的目標，慶祝成就。這是豐收與整合的時期。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (21, '世界', 'reversed', 'yearly', 'monthly', '【本月運勢】世界（逆位）\n這個月你需要留意「未完成、延遲、缺乏收尾」的課題。逆位的世界顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n完成未竟之事，不要留下遺憾。為下階段做好準備。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;
