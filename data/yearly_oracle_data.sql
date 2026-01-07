-- Yearly Oracle Data (Shared Monthly)
-- Generated script
-- Scene: yearly
-- Position: monthly (Fallback for all months)


INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'upright', 'yearly', 'monthly', '【本月運勢】愚者（正位）\n這個月的主題是「新的開始、冒險、樂觀」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到新的開始的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'reversed', 'yearly', 'monthly', '【本月運勢】愚者（逆位）\n這個月你需要留意「魯莽、風險、不成熟」的課題。逆位的愚者顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'upright', 'yearly', 'monthly', '【本月運勢】魔術師（正位）\n這個月的主題是「創造力、技能、顯化」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到創造力的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'reversed', 'yearly', 'monthly', '【本月運勢】魔術師（逆位）\n這個月你需要留意「欺騙、缺乏計劃、潛能未發」的課題。逆位的魔術師顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女教皇', 'upright', 'yearly', 'monthly', '【本月運勢】女教皇（正位）\n這個月的主題是「直覺、潛意識、神秘」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到直覺的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女教皇', 'reversed', 'yearly', 'monthly', '【本月運勢】女教皇（逆位）\n這個月你需要留意「封閉、忽視直覺、秘密」的課題。逆位的女教皇顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '皇后', 'upright', 'yearly', 'monthly', '【本月運勢】皇后（正位）\n這個月的主題是「豐盛、自然、創造力」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到豐盛的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '皇后', 'reversed', 'yearly', 'monthly', '【本月運勢】皇后（逆位）\n這個月你需要留意「依賴、創造力受阻、停滯」的課題。逆位的皇后顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'upright', 'yearly', 'monthly', '【本月運勢】皇帝（正位）\n這個月的主題是「權威、結構、穩定」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到權威的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'reversed', 'yearly', 'monthly', '【本月運勢】皇帝（逆位）\n這個月你需要留意「專制、缺乏紀律、僵化」的課題。逆位的皇帝顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'upright', 'yearly', 'monthly', '【本月運勢】教皇（正位）\n這個月的主題是「傳統、學習、指導」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到傳統的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'reversed', 'yearly', 'monthly', '【本月運勢】教皇（逆位）\n這個月你需要留意「反叛、打破常規、迷信」的課題。逆位的教皇顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'upright', 'yearly', 'monthly', '【本月運勢】戀人（正位）\n這個月的主題是「選擇、和諧、關係」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到選擇的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'reversed', 'yearly', 'monthly', '【本月運勢】戀人（逆位）\n這個月你需要留意「不和、錯誤選擇、分離」的課題。逆位的戀人顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'upright', 'yearly', 'monthly', '【本月運勢】戰車（正位）\n這個月的主題是「意志力、勝利、行動」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到意志力的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'reversed', 'yearly', 'monthly', '【本月運勢】戰車（逆位）\n這個月你需要留意「失控、阻礙、方向迷失」的課題。逆位的戰車顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'upright', 'yearly', 'monthly', '【本月運勢】力量（正位）\n這個月的主題是「內在力量、勇氣、耐心」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到內在力量的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'reversed', 'yearly', 'monthly', '【本月運勢】力量（逆位）\n這個月你需要留意「自我懷疑、軟弱、衝動」的課題。逆位的力量顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱士', 'upright', 'yearly', 'monthly', '【本月運勢】隱士（正位）\n這個月的主題是「內省、孤獨、尋求引導」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到內省的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱士', 'reversed', 'yearly', 'monthly', '【本月運勢】隱士（逆位）\n這個月你需要留意「孤立、拒絕溝通、迷失」的課題。逆位的隱士顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'upright', 'yearly', 'monthly', '【本月運勢】命運之輪（正位）\n這個月的主題是「轉變、運氣、循環」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到轉變的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'reversed', 'yearly', 'monthly', '【本月運勢】命運之輪（逆位）\n這個月你需要留意「厄運、抗拒改變、停滯」的課題。逆位的命運之輪顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (11, '正義', 'upright', 'yearly', 'monthly', '【本月運勢】正義（正位）\n這個月的主題是「公平、真相、因果」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到公平的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (11, '正義', 'reversed', 'yearly', 'monthly', '【本月運勢】正義（逆位）\n這個月你需要留意「不公、偏見、逃避責任」的課題。逆位的正義顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (12, '倒吊人', 'upright', 'yearly', 'monthly', '【本月運勢】倒吊人（正位）\n這個月的主題是「犧牲、新視角、等待」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到犧牲的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (12, '倒吊人', 'reversed', 'yearly', 'monthly', '【本月運勢】倒吊人（逆位）\n這個月你需要留意「無謂犧牲、停滯不前、掙扎」的課題。逆位的倒吊人顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (13, '死亡', 'upright', 'yearly', 'monthly', '【本月運勢】死亡（正位）\n這個月的主題是「結束、轉化、重生」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到結束的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (13, '死亡', 'reversed', 'yearly', 'monthly', '【本月運勢】死亡（逆位）\n這個月你需要留意「恐懼改變、僵局、無法放下」的課題。逆位的死亡顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (14, '節制', 'upright', 'yearly', 'monthly', '【本月運勢】節制（正位）\n這個月的主題是「平衡、耐心、融合」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到平衡的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (14, '節制', 'reversed', 'yearly', 'monthly', '【本月運勢】節制（逆位）\n這個月你需要留意「失衡、過度、缺乏和諧」的課題。逆位的節制顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (15, '惡魔', 'upright', 'yearly', 'monthly', '【本月運勢】惡魔（正位）\n這個月的主題是「束縛、物質主義、誘惑」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到束縛的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (15, '惡魔', 'reversed', 'yearly', 'monthly', '【本月運勢】惡魔（逆位）\n這個月你需要留意「掙脫束縛、覺醒、重獲自由」的課題。逆位的惡魔顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (16, '高塔', 'upright', 'yearly', 'monthly', '【本月運勢】高塔（正位）\n這個月的主題是「驟變、崩塌、覺醒」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到驟變的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (16, '高塔', 'reversed', 'yearly', 'monthly', '【本月運勢】高塔（逆位）\n這個月你需要留意「勉強維持、恐懼災難、內在動盪」的課題。逆位的高塔顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (17, '星星', 'upright', 'yearly', 'monthly', '【本月運勢】星星（正位）\n這個月的主題是「希望、靈感、療癒」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到希望的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (17, '星星', 'reversed', 'yearly', 'monthly', '【本月運勢】星星（逆位）\n這個月你需要留意「絕望、缺乏信心、黯淡」的課題。逆位的星星顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (18, '月亮', 'upright', 'yearly', 'monthly', '【本月運勢】月亮（正位）\n這個月的主題是「幻覺、不安、潛意識」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到幻覺的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (18, '月亮', 'reversed', 'yearly', 'monthly', '【本月運勢】月亮（逆位）\n這個月你需要留意「幻覺破滅、釋放恐懼、混亂」的課題。逆位的月亮顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (19, '太陽', 'upright', 'yearly', 'monthly', '【本月運勢】太陽（正位）\n這個月的主題是「快樂、成功、活力」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到快樂的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (19, '太陽', 'reversed', 'yearly', 'monthly', '【本月運勢】太陽（逆位）\n這個月你需要留意「短暫快樂、過度樂觀、陰影」的課題。逆位的太陽顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (20, '審判', 'upright', 'yearly', 'monthly', '【本月運勢】審判（正位）\n這個月的主題是「覺醒、召喚、決定」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到覺醒的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (20, '審判', 'reversed', 'yearly', 'monthly', '【本月運勢】審判（逆位）\n這個月你需要留意「猶豫不決、自我懷疑、逃避」的課題。逆位的審判顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (21, '世界', 'upright', 'yearly', 'monthly', '【本月運勢】世界（正位）\n這個月的主題是「完成、整合、旅行」。這張牌象徵著一股正向的流動能量進入你的生活。在工作與生活上，你將會感受到完成的契機。這是一個適合展現行動力與信心的時候，順應這股能量，你將能順利推動計畫。\n\n【行動建議】\n保持開放的心態，積極把握眼前的機會。適度的自信將是你本月最大的資產。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (21, '世界', 'reversed', 'yearly', 'monthly', '【本月運勢】世界（逆位）\n這個月你需要留意「未完成、延遲、缺乏收尾」的課題。逆位的世界顯示能量可能會有些受阻或過度，導致你在處理事務時感到些許不順或內在的矛盾。這並非壞事，而是宇宙在提醒你需要重新調整步伐，檢視內在真實的需求。\n\n【行動建議】\n請放慢腳步，避免衝動行事。給自己多一點反思的時間，調整心態後再出發會更順利。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation;
