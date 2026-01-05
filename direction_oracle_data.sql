-- ============================================
-- 新增「方位指引」神諭資料
-- 場景：general_direction
-- 涵蓋：22 張大阿爾克那 x 2 (正/逆) = 44 筆
-- ============================================

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation) VALUES
-- 0 愚者 The Fool
(0, '愚者', 'upright', 'general_direction', 'single', '【方位：東方】\n愚者象徵新的開始。請大膽向東方前進，那裡有未知的機遇在等你。不要想太多，出發就對了！'),
(0, '愚者', 'reversed', 'general_direction', 'single', '【方位：留在原地】\n現在不是冒險這時候。請暫時停留在原地，檢查你的裝備和計畫，避免因魯莽而迷失方向。'),

-- 1 魔術師 The Magician
(1, '魔術師', 'upright', 'general_direction', 'single', '【方位：東方】\n魔術師代表創造力與行動。東方是你施展才華的舞台，資源已經齊備，往東走能找到解決方案。'),
(1, '魔術師', 'reversed', 'general_direction', 'single', '【方位：南方】\n當前能量受阻，建議往南方尋找熱情或轉機。你需要重新連結你的內在動力。'),

-- 2 女祭司 The High Priestess
(2, '女祭司', 'upright', 'general_direction', 'single', '【方位：北方】\n北方是冷靜與智慧的方位。現在不需要躁進，往北方或安靜的地方尋找答案，直覺會指引你。'),
(2, '女祭司', 'reversed', 'general_direction', 'single', '【方位：後退】\n你可能忽略了某些內在的聲音。試著後退一步，重新審視情況，不要急著向外尋求。'),

-- 3 皇后 The Empress
(3, '皇后', 'upright', 'general_direction', 'single', '【方位：南方】\n南方充滿溫暖與豐盛的能量。去享受生活，或者接近大自然，那個方向會帶給你療癒與收穫。'),
(3, '皇后', 'reversed', 'general_direction', 'single', '【方位：西方】\n情感可能有些匱乏。往西方尋求情感的流動，或者回到你熟悉的舒適區稍作休息。'),

-- 4 皇帝 The Emperor
(4, '皇帝', 'upright', 'general_direction', 'single', '【方位：北方】\n北方代表穩固與秩序。前往北方，建立你的疆域，或者尋求有權威的人士協助。'),
(4, '皇帝', 'reversed', 'general_direction', 'single', '【方位：後退】\n現在的基礎不穩，強行前進只會遭遇阻力。請後退重整旗鼓，這不是硬碰硬的時候。'),

-- 5 教皇 The Hierophant
(5, '教皇', 'upright', 'general_direction', 'single', '【方位：西方】\n西方代表傳統與學習。尋求長輩或導師的指引，或是前往圖書館、學校等與知識有關的地方。'),
(5, '教皇', 'reversed', 'general_direction', 'single', '【方位：北方】\n打破常規的時候到了。往北方尋找非傳統的路徑，不要被舊有的規則限制住。'),

-- 6 戀人 The Lovers
(6, '戀人', 'upright', 'general_direction', 'single', '【方位：東方】\n東方是合作與選擇的方位。往東走，你可能會遇到重要的夥伴，或是做出一個關鍵的決定。'),
(6, '戀人', 'reversed', 'general_direction', 'single', '【方位：留在原地】\n關係或選擇出現了不和諧。留在原地釐清你的價值觀，現在不是做決定的好時機。'),

-- 7 戰車 The Chariot
(7, '戰車', 'upright', 'general_direction', 'single', '【方位：前進】\n目標就在前方！集中你的意志力，排除萬難直線前進，勝利就在眼前，不要猶豫。'),
(7, '戰車', 'reversed', 'general_direction', 'single', '【方位：西方】\n失控的風險很高。往西方尋求緩衝，你需要放慢速度，重新掌握韁繩。'),

-- 8 力量 Strength
(8, '力量', 'upright', 'general_direction', 'single', '【方位：南方】\n南方是勇氣與熱情的來源。以柔克剛，帶著自信往南方走，你能馴服眼前的困難。'),
(8, '力量', 'reversed', 'general_direction', 'single', '【方位：留在原地】\n你現在缺乏信心或力量。留在原地積蓄能量，不要勉強自己面對無法負荷的挑戰。'),

-- 9 隱士 The Hermit
(9, '隱士', 'upright', 'general_direction', 'single', '【方位：北方】\n北方適合獨處與內省。遠離人群，往高處或安靜的北方走，答案在你的內心深處。'),
(9, '隱士', 'reversed', 'general_direction', 'single', '【方位：前進】\n孤獨太久了，是時候走出洞穴。向前邁進，與世界重新連結，不要害怕尋求幫助。'),

-- 10 命運之輪 Wheel of Fortune
(10, '命運之輪', 'upright', 'general_direction', 'single', '【方位：東方】\n機遇之輪正在轉動，變化即將發生。往東方迎接新的循環，順勢而為將帶來好運。'),
(10, '命運之輪', 'reversed', 'general_direction', 'single', '【方位：後退】\n運氣似乎不在你這邊。暫時後退，等待這一波低潮過去，不要逆勢而行。'),

-- 11 正義 Justice
(11, '正義', 'upright', 'general_direction', 'single', '【方位：北方】\n北方代表冷靜的判斷。保持客觀公正，往北方尋求法律或規則的釐清，真理會顯現。'),
(11, '正義', 'reversed', 'general_direction', 'single', '【方位：南方】\n天秤傾斜了。往南方尋求平衡，你也許對自己太苛刻，需要多一點溫暖與寬容。'),

-- 12 倒吊人 The Hanged Man
(12, '倒吊人', 'upright', 'general_direction', 'single', '【方位：留在原地】\n現在是換個角度看世界的時候。留在原地，犧牲小我，等待時機成熟，行動只會徒勞無功。'),
(12, '倒吊人', 'reversed', 'general_direction', 'single', '【方位：前進】\n掙脫束縛的時刻到了。不用再等待，向前邁進，採取行動來改變現狀。'),

-- 13 死神 Death
(13, '死神', 'upright', 'general_direction', 'single', '【方位：西方】\n西方象徵日落與結束。接受這段旅程的終點，往西方去告別舊事物，唯有結束才能迎來新生。'),
(13, '死神', 'reversed', 'general_direction', 'single', '【方位：東方】\n你拒絕改變，但改變勢在必行。試著轉向東方，尋找新生的曙光，不要沉溺於過去。'),

-- 14 節制 Temperance
(14, '節制', 'upright', 'general_direction', 'single', '【方位：南方】\n尋求調和與流動。往南方走，尋找水流或能讓你身心平衡的地方，保持中庸之道。'),
(14, '節制', 'reversed', 'general_direction', 'single', '【方位：北方】\n失衡的狀態需要修正。往北方冷靜下來，你需要重新調整生活的步調與比例。'),

-- 15 惡魔 The Devil
(15, '惡魔', 'upright', 'general_direction', 'single', '【方位：後退】\n前方是誘惑與枷鎖。請立刻後退，遠離那些讓你沈迷或失去自由的人事物。'),
(15, '惡魔', 'reversed', 'general_direction', 'single', '【方位：前進】\n鎖鏈已經鬆動。勇敢向前衝，現在是你擺脫束縛、重獲自由的最佳時機。'),

-- 16 塔 The Tower
(16, '塔', 'upright', 'general_direction', 'single', '【方位：東方】\n突如其來的改變將至。雖然震撼，但這是重建的契機。往東方尋求新的地基。'),
(16, '塔', 'reversed', 'general_direction', 'single', '【方位：後退】\n災難雖然減輕，但餘波盪漾。暫時後退避風頭，不要急著收拾殘局。'),

-- 17 星星 The Star
(17, '星星', 'upright', 'general_direction', 'single', '【方位：北方】\n跟隨希望之星。往北方走，你會找到靈感與指引，保持信心，願望將會實現。'),
(17, '星星', 'reversed', 'general_direction', 'single', '【方位：西方】\n你感到迷惘與失望。往西方尋求內在的平靜，重新點燃你心中的希望之火。'),

-- 18 月亮 The Moon
(18, '月亮', 'upright', 'general_direction', 'single', '【方位：西方】\n前方道路模糊不清，充滿幻象。往西方探索潛意識，但要小心腳下，相信你的直覺。'),
(18, '月亮', 'reversed', 'general_direction', 'single', '【方位：東方】\n迷霧逐漸散去，真相浮現。往東方走，那裡有清晰的光明，恐懼將會消失。'),

-- 19 太陽 The Sun
(19, '太陽', 'upright', 'general_direction', 'single', '【方位：南方】\n前途一片光明！往南方，那裡有最燦爛的陽光與喜悅。成功就在那個方向。'),
(19, '太陽', 'reversed', 'general_direction', 'single', '【方位：東方】\n雖然有些雲層遮擋，但太陽依然存在。往東方等待日出，保持樂觀，好運遲早會來。'),

-- 20 審判 Judgement
(20, '審判', 'upright', 'general_direction', 'single', '【方位：前進】\n這是覺醒與召喚的時刻。聽到號角聲了嗎？毫不猶豫地向前進，回應命運的呼喚。'),
(20, '審判', 'reversed', 'general_direction', 'single', '【方位：後退】\n你還沒準備好面對結果。暫時後退，反省過去的錯誤，你需要更多時間準備。'),

-- 21 世界 The World
(21, '世界', 'upright', 'general_direction', 'single', '【方位：前進】\n旅程圓滿，世界在你腳下。繼續向前，你將到達理想的終點，享受完整與合一。'),
(21, '世界', 'reversed', 'general_direction', 'single', '【方位：留在原地】\n還有最後一塊拼圖未完成。留在原地檢視缺漏，不要急著結束，亦步亦趨才能圓滿。');
