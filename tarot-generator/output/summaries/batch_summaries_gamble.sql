INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_lottery_all_upright', '親愛的，這是一股全然順暢、毫無阻礙的能量流動，正環繞著你與樂透彩券的連結。此刻，宇宙的財富之流正對你敞開，非常適合以輕鬆、喜悅的心情參與其中。建議你可以採取「見好就收」的策略，像順水行舟般，在運氣正旺時積極把握，但不忘設定一個愉快的停利點，讓這份幸運成為滋養生活的禮物，而非負擔。帶著玩樂的心去體驗這份流動吧！')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_lottery_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻並非追逐外在財運的最佳時機。逆位的流動暗示著，若執意投入，可能會感到付出與收穫不成正比，或陷入患得患失的焦慮。建議你暫時「收手觀望」，將這份想以小博大的能量，轉化為對自身財務的「保守規劃」。真正的豐盛，有時始於向內沉澱，看清自己真正的需求，而非依賴瞬間的運氣。請先照顧好自己的心，穩健的腳步會為你引來更長久的富足。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_lottery_one_reversed', '親愛的朋友，這張牌顯示，你此刻的財運能量整體是流動且活躍的，有機會與幸運擦身而過。然而，逆位的光芒提醒著一個關鍵：你內心可能對「一夜致富」抱有過高的期待，這份執念反而會成為阻礙幸運降臨的薄霧。這並非不適合參與，而是建議你以「見好就收」的輕鬆心態來看待，將它視為一場遊戲，而非生活的全部。請採取「保守」的策略，設定一個小小的、不影響生活的金額，享受過程的樂趣，而非緊盯結果的得失。真正的豐盛，往往始於一顆知足與平靜的心。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_lottery_one_upright', '親愛的朋友，這張牌揭示了一個需要謹慎評估的局勢。在樂透彩券這件事上，整體能量偏向「不適合」大舉進場。這並非完全沒有希望，而是如同在迷霧中尋找微光，需要極大的耐心與精準。建議採取「保守」策略，將投入視為一種娛樂而非投資，並且務必「見好就收」。此刻的財運流動較為緩慢，與其追逐難以捉摸的大獎，不如先穩固現實的根基。請記得，真正的豐盛往往始於腳下的每一步。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_lottery_mixed', '親愛的朋友，從牌陣中我看到，關於樂透彩券的運勢，正如同潮汐般起伏不定，並非一面倒的局勢。這意味著，此刻並非一個適合大舉進場、孤注一擲的時機。牌面提醒您，需要以「平衡」的智慧來看待這場機遇遊戲。建議您採取「見好就收」的保守策略，將投入視為一種輕鬆的參與，而非改變命運的賭注。財運的流動有些複雜，小額嘗試或許能感受到它的波動，但請務必守護好您平靜的內心與穩固的根基。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_card_all_upright', '此刻，牌桌上的能量如順流而下的河水，清晰且毫無滯礙。這是一個明確的訊號：你正處於一個適合進場的時機。你的直覺與運勢正同步共振，可以採取較為積極的策略，如同在順風中揚帆，大膽押注。財運的流動是豐沛的，但請記得，真正的智慧是在浪潮頂端懂得見好就收，將這份順遂的能量，優雅地轉化為實質的收穫。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_card_all_reversed', '親愛的，這副牌的能量正溫柔地提醒你，此刻的牌桌並非你最佳的舞台。整體能量呈現停滯與內省的信號，暗示外在的運氣流動並不順暢，今日「不宜」貿然進場。這不是壞事，而是宇宙在保護你的籌碼，邀請你暫停、觀望。若你已在局中，請採取「極度保守」的策略，像守護燭火般守護本金，任何「壓大」的衝動都可能讓能量更快流失。真正的博弈有時在於，懂得何時離開牌桌，靜待風向轉變。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_card_one_reversed', '整體牌勢顯示，你正處在一場勝算頗高的牌局中，運氣的流向對你有利，適合進場。然而，這張逆位牌溫柔地提醒，過程中的主要阻礙並非來自對手，而是你內心偶爾閃過的「貪念」或「僥倖」。請採取「見好就收」的策略，像潮水有漲退，在運氣高峰時果斷收手，便能將優勢穩穩轉為實質的收穫。記住，真正的贏家是懂得駕馭自己心念的人。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_card_one_upright', '此刻的牌桌，局勢如逆風行舟，充滿挑戰與不確定性。然而，牌面顯示，在困難的迷霧中仍有一線希望之光。這並非適合大舉進攻的時刻，建議你採取「保守」策略，如同在風浪中下小錨，先穩住陣腳。運氣的流動尚不明朗，與其追逐虛幻的大勝，不如練習「見好就收」的智慧。請專注於觀察牌局流轉的節奏，等待那個屬於你的、清晰的訊號出現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_card_mixed', '親愛的，這場牌桌的局勢猶如光影交織，並非一面倒的勝負。你手握的牌組顯示，機會與風險並存，此刻並非全力衝刺的時機，而是需要精巧平衡的藝術。建議你以「見好就收」為策略核心，像謹慎的園丁，只採摘確熟果實。今日的財運流動起伏，適合小額試探水溫，而非重注押寶。請記住，真正的贏家是懂得在複雜局勢中，為自己保留退路與平靜的人。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_sport_all_upright', '親愛的，此刻牌陣的能量如溪流般清澈順暢，毫無阻滯。這是一個非常適合你「進場」的時刻，財運的流動正對你微笑。建議你可以採取「積極」的策略，像順風揚帆一般，信任你的直覺與分析。然而，請記得，即使是順流，也要為旅程設定界線。在運氣的高點「見好就收」，將豐盛的能量化為實質的收穫，會是最圓滿的智慧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_sport_all_reversed', '親愛的朋友，這組牌的能量正溫柔地提醒你，此刻的運氣流動似乎有些凝滯，並非向外追逐的時刻。這是一個明確的訊號：**今日不適合大舉進場**。請將你的注意力從輸贏的數字上收回，轉向內在的平靜。這股受阻的能量，是在邀請你暫停、觀察，並以「見好就收」甚至「只看不玩」作為今日的策略。真正的遊戲，有時是學習何時不下注的智慧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_sport_one_reversed', '整體來看，這次的投注運勢是順暢的，能量正朝向你流動，財氣有增長的跡象。然而，逆位的牌提醒著一個關鍵的阻礙：它可能來自於你過於依賴直覺，或是對某項資訊的過度解讀。這使得「積極進場」是適合的，但策略上請務必「見好就收」，將大注拆分為幾次小額的試探。就像觀察潮汐，在浪頭最高時收網，莫貪心追趕下一波。你的運氣正在流動，但需要更清醒的頭腦來承接。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_sport_one_upright', '這張牌揭示，此刻的運彩局勢如同逆風前行，充滿挑戰與不確定性。它建議你，今日並非適合大舉進場的時機，財運的流動較為晦澀。若你仍想參與，請務必採取「見好就收」的保守策略，將賭注視為一場小小的娛樂，而非致富的途徑。真正的希望，在於你能否從中學會觀察與紀律，這份智慧遠比一時的輸贏更為珍貴。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_sport_mixed', '親愛的，這次的牌陣顯示，關於運動彩券的局勢是複雜而動態的，機會與風險並存。這並非一個適合大舉進攻的時刻，建議你採取「見好就收」的保守策略。財運的流動像潮汐，有進有退，請將投注視為一種娛樂，而非孤注一擲的賭局。最重要的是保持內心的平衡，享受賽事的樂趣，而非被結果所困。你的平靜，就是最好的指引。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_casino_all_upright', '此刻，宇宙的能量正為你敞開一條順暢無阻的道路。牌陣顯示，你當下的運勢流動極佳，財氣匯聚，是**適合**進場體驗的時機。你的直覺與判斷力將格外清晰，不妨採取**積極**一些的策略，跟隨內在的靈感下注。請記得，順流而上的好運，最適合搭配「**見好就收**」的智慧。享受這股順風，但別讓貪念駐留，讓金錢如流水般自然來去，你將能優雅地滿載而歸。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_casino_all_reversed', '親愛的，此刻的牌陣能量正溫柔地提醒你，這並非一個適合大舉進場的時機。整體的運勢流動有些受阻，如同水流遇到暗礁，需要暫停觀察。這不是壞運，而是宇宙在邀請你內省：你的心是否過於急切？建議採取「見好就收」的極保守策略，將賭注視為一陣微風，輕拂而過即可，切勿追風。今日的財氣流動較為隱晦，與其強求，不如退後一步，守護好你已有的平靜與籌碼。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_casino_one_reversed', '親愛的，這次的牌面能量顯示，整體的流動對你是有利的，財氣正在匯聚，但其中一張逆位牌溫柔地提醒著一個關鍵的阻礙——它可能是一閃而過的貪念，或是過度自信的心態。這份阻礙並非為了阻擋你，而是為了保護你。因此，今日「適合」進場感受能量，但策略上請務必「見好就收」，採取「保守」的路線，像細水長流般下注。你的運氣有如潮汐，有漲有落，請在浪頭最高、內心最清明時優雅退場，將豐盛穩穩握在手中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_casino_one_upright', '此刻的賭桌，猶如一片迷霧籠罩的森林，前路並不明朗。牌面顯示，整體局勢對你而言是充滿挑戰的，直接進場搏殺並非明智之選。然而，迷霧中仍有一縷微光，代表著「見好就收」的智慧。若你執意參與，請將賭注視為投入水中的小石子，而非全部身家，採取最保守的策略，並且設定嚴格的停損點。今天的運氣如潮水，漲落不定，與其追逐大浪，不如在岸邊靜觀其變，守護好你的籌碼，便是守住了未來的希望。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_casino_mixed', '親愛的，這次的牌陣猶如賭場的輪盤，紅黑交織，正逆能量交錯。這並非一面倒的運勢，而是提醒你，機會與風險並存，此刻「不適合」大舉進場。你的策略需要像走鋼索般平衡：以小注試探水溫，採取「保守」的姿態，見好就收是關鍵。財運的流動忽明忽暗，請將專注力從「輸贏」轉移到「節奏」的掌握上，在複雜的局勢中保持清醒，便是你最大的籌碼。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_luck_all_upright', '親愛的朋友，此刻宇宙的豐盛之流正為你敞開大門，你的能量與財運的頻率完全和諧共振。這是一個非常適合「進場」或參與機會的時刻，你的直覺與手氣正處於高點。在策略上，可以採取「積極」的姿態，如同順流而下，不妨跟隨內在的靈感「壓大」。然而，請記得，豐盛的能量在於流動；在運氣鼎盛時「見好就收」，將獲利落袋為安，正是讓這股好運持續循環的智慧。享受這份順暢的喜悅吧！')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_luck_all_reversed', '親愛的朋友，這組牌的能量顯示，此刻的財氣流動正處於一個需要「暫停與沉澱」的階段。逆位的牌陣並非否定你的機會，而是溫柔地提醒：外在的機運正被內在的某些思緒或慣性所阻隔。這並非適合大舉進場或追逐高風險的時刻，建議採取「見好就收、保守觀望」的策略，像呵護一株幼苗般，先專注於整頓內在的土壤。當你釐清內心的雜音，穩住節奏，財氣的流動自會找到更順暢的出口。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_luck_one_reversed', '親愛的，這張牌顯示你的財運能量整體是流動且豐盛的，但其中有一個小小的「結」需要你溫柔地解開。這意味著，你近期的手氣偏向「見好就收」的類型，不適合過度貪心或追高。當你感覺順風時，可以採取「壓大」的積極策略，但請務必為自己設下明確的停利點；一旦出現那個「特定阻礙」的訊號（例如連續小輸或內心感到猶豫），便是宇宙提醒你該轉為「保守」，暫且觀望。記住，真正的豐盛在於流暢的收放，而非孤注一擲。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_luck_one_upright', '親愛的，這張牌揭示你目前的偏財運勢正處於一個需要謹慎評估的階段。整體能量顯示「局勢困難，但仍有一線希望」，這意味著機會之門並未完全關閉，但路上佈滿荊棘。**今日並不適合大舉進場或孤注一擲**。你的策略應如「細水長流」，採取「保守」的姿態，以小額試探水溫，並嚴格執行「見好就收」的原則。此刻的財運流動較為遲滯，強求反而易失。請將注意力放在觀察與等待上，那一線希望往往隱藏在最不起眼的細節之中，需要你極致的耐心與清醒的頭腦去發掘。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('gamble_luck_mixed', '親愛的朋友，這副牌顯示你近期的偏財運勢，猶如潮水般起伏不定，機會與風險並存。牌面能量複雜，並非一面倒的幸運，因此不建議你投入過多或孤注一擲。此刻更適合的策略是「見好就收」，將每一次嘗試視為小小的試探，而非決定性的戰役。請保持輕鬆的旁觀者心態，若感覺順暢可小試身手，但切記設定停利點；若感到阻滯，則宜收手觀望。財運的流動需要你以智慧平衡，在動與靜之間找到屬於你的節奏。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;