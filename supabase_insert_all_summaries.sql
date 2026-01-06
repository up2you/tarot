INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_all_upright', '親愛的你，牌陣中全然順暢的能量，正是一份溫柔的提醒：此刻的你，已準備好迎接一段美好的緣分。宇宙正為你敞開大門，請帶著對自己的愛與信任，主動走向人群、參與生活。你的真誠與開放，就是最動人的吸引力。無須遲疑，屬於你的故事，正等待你親手翻開嶄新的一頁。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_all_reversed', '親愛的你，這組牌的能量正溫柔地提醒你，此刻的「暫停」並非緣分遠去，而是宇宙在邀請你向內探尋。當所有能量向內流動，或許是為了讓你更清晰地聽見自己內心的聲音——你真正渴望的，是什麼樣的連結與陪伴？請將這份等待的時光，化為滋養自己的土壤。當你與自己和解、充滿自愛時，你所散發的頻率，自然會吸引與你同頻的靈魂靠近。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_one_reversed', '親愛的，整體的緣分能量是流動且充滿希望的，但牌中這份小小的阻礙，溫柔地提醒著你：有時我們對「理想伴侶」的執著，或對過往未竟情感的留戀，會在不經意間為心門上了一道鎖。請試著放鬆那份「必須如何」的期待，先以完整而喜悅的姿態活在當下。當你專注於自身的圓滿，那份為你而來的緣分，便能更清晰、更輕盈地與你相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_one_upright', '親愛的，這張牌揭示了尋覓真愛的路上，或許有些孤獨與考驗，讓你感到不易。但請相信，這正是為了讓你更清晰自己的心之所向。那一線希望，正閃爍在你對自我的珍視與成長之中。請保持敞開，但無需急切；專注於活出你喜愛的樣子，當你內在的光足夠明亮，自然能吸引到與你同頻的靈魂。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_mixed', '親愛的，這趟尋覓緣分的旅程，正如同牌陣所揭示的，是一幅光影交織的圖景。既有美好的機遇在醞釀，也伴隨著需要你耐心梳理的課題。這並非阻礙，而是宇宙溫柔的提醒：真正的緣分始於內在的平衡。請擁抱這份複雜，它讓你的心更為完整。在向外探尋的同時，也向內扎根，當你穩穩地站在自己的中心，那最適合你的共振，自然會循光而來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_all_upright', '親愛的，這組牌的能量清澈而順暢，彷彿宇宙正溫柔地為你鋪路。你心中那份美好的情愫，並非單向的漣漪，而是有機會激起雙向迴響的共鳴。此刻的順風，正是邀請你勇敢地向前一步，將隱藏的心意化為真誠的靠近。信任這份流動的能量，你的主動不會是打擾，而會是開啟一段美麗關係的鑰匙。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_all_reversed', '親愛的，這份暗戀的能量目前正處於一個需要沉澱的階段。逆位的牌陣並非否定你的心意，而是溫柔地提醒：此刻外界的推動力較弱，正是向內觀照的好時機。請先暫停對外索求答案，轉而傾聽自己的內心——這份悸動中，有多少是對真實他的欣賞，又有多少是對愛情的憧憬？當你更清晰自己的感受，內在的力量會自然引領你，走向最適合的下一步。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_one_reversed', '這段暗戀的旅程，整體能量是支持你的，緣分的絲線已然牽起。然而，逆位的牌卡溫柔提醒，那個唯一的阻礙，或許是你內心對「不夠完美」的擔憂。請別讓這份自我審查，模糊了你真實的光芒。調整一下看待自己的眼光，你值得被看見。當你更安然地做自己，那份連結自然會更加清晰、順暢地展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_one_upright', '這份暗戀的心情，像在迷霧中前行，或許你感到阻礙重重，距離遙遠。但這張正位牌告訴我們，希望的光從未熄滅，它正藏在某個轉折處等待你。與其困在擔憂裡，不如將這份心意化為溫柔的試探，或專注於讓自己發光。當你準備好，那一線希望便會清晰起來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_mixed', '這份暗戀的滋味，如同牌陣中交織的光影，有甜蜜的期待，也有隱約的不安。這份複雜正是關係的雛形，提醒你無需急於求全。請溫柔地接納這份悸動，同時也關照自己的心，在主動與觀察間找到平衡。你的真誠本身，就是最動人的光芒。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_pursuit_all_upright', '此刻，宇宙的能量正為你鋪設一條清晰而順暢的道路。你內心的渴望與外在的機緣完美共振，這份追求本身便充滿了祝福。請信任這股流動的動力，勇敢地踏出每一步，真誠地表達你的心意。無須猶豫或過度分析，跟隨你直覺的引導，美好的回應正在前方等待著你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_pursuit_all_reversed', '親愛的，當所有牌都呈現逆位時，宇宙正溫柔地提醒你：這份追求的能量，此刻需要向內流動。這並非否定你的心意，而是邀請你暫停腳步，先與自己對話。那些看似受阻的狀況，往往是內在需要被療癒或釐清的訊號。請給自己一些安靜的時光，問問內心：這份追求的源頭，是出自豐盈的愛，還是匱乏的渴望？當你調整好內在的頻率，外在的流動自然會為你重新開啟。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_pursuit_one_reversed', '這段關係的發展整體是順暢的，你已走在正確的道路上。然而，這張逆位牌溫柔地提醒，過程中可能有一個關鍵的「心結」需要你正視——或許是過去的經驗讓你有所保留，或是對結果的過度擔憂。請別讓這份遲疑成為唯一的絆腳石。信任自己的感覺，也信任緣分的流動，當你願意以更輕鬆開放的姿態前行，那道無形的阻礙自會消散。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_pursuit_one_upright', '這段關係的追求之路，或許比你預想的更具挑戰，過程中的不確定與阻礙，正考驗著你的真心與韌性。然而，牌中透出的那一線希望之光，是真實存在的。它提醒你，真摯的情感從不會被輕易擊退。請保持你的誠懇與風度，在困難中展現你的穩健與堅持，這份「不放棄」的品質本身，就是最動人的答案。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_pursuit_mixed', '親愛的，這趟追求之旅猶如走在光影交織的小徑上，牌陣告訴我們局勢並非單純的好與壞，而是充滿了需要你細心平衡的動態能量。有些面向展現了美好的連結與機會，有些則提醒你檢視自己的步伐與內心。這不是阻礙，而是宇宙溫柔的提示：在主動向前的同時，也請關照自己的感受與界線。保持真誠與開放，但也要懂得在複雜中為自己留一片寧靜。你內在的智慧，正是引領你穿越這片風景的最佳羅盤。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_all_upright', '此刻，你們的關係正沐浴在純粹而流動的光中，所有能量都順暢無阻。這份熱戀期的美好，是宇宙對你們敞開的禮物。請全然投入這份悸動，勇敢表達你的感受，並將這份熾熱的愛化為具體的行動與承諾。信任這股順勢而下的能量，它正引領你們共同創造一段深刻而愉悅的旅程。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_all_reversed', '親愛的，這份熱戀的悸動，似乎正邀請你放慢腳步。逆位的能量並非否定這份美好，而是溫柔提醒：在投入的同時，請為自己保留一份覺察的空間。這是一段需要向內觀照的時光，檢視關係中是否有些過度付出或理想化的部分。暫停不是冷卻，而是為了讓愛在更真實的土壤裡扎根，讓你們的連結超越最初的激情，走向更深刻的理解與平衡。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_one_reversed', '親愛的，熱戀期的甜蜜與激情是如此美好，而這張牌也印證了你們之間強烈的吸引力與歡愉。然而，逆位的能量溫柔地提醒，在這份濃烈的情感中，或許有一個小小的習慣、一個未說出口的擔憂，或是一點點對未來的焦慮，正在不自覺地消耗你們的純粹快樂。請別擔心，這不是危機，而是一個讓關係更深刻的契機。試著在擁抱熱情的同時，也溫柔地覺察並溝通那個微小的阻礙，它會讓你們的連結從絢爛的火花，走向更穩定溫暖的光亮。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_one_upright', '親愛的，熱戀期的濃烈與美好，有時也會伴隨著磨合的考驗。這張牌提醒你，此刻的困難是真實的，但絕非終點。請別讓一時的摩擦熄滅了初心的火花。試著以更溫柔、更坦誠的溝通，去照亮彼此理解的道路。那份最初的吸引與希望，一直都在，它正等待你們用成熟的心，共同守護與澆灌。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_mixed', '親愛的，熱戀期的濃烈與美好，正與牌中複雜的能量交織。這份關係充滿了火花與深刻的連結，但也提醒著，在投入的同時，請為彼此保留一絲呼吸的空間。美好的感受需要用心經營，偶爾的摩擦或不安，是邀請你們學習平衡「熱情」與「清醒」。別害怕看見全貌，以溫柔的溝通代替猜測，這能讓你們的愛，在真實的土壤裡紮根，開出更穩固的花。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_conflict_all_upright', '親愛的，這組牌的能量如溪流般清澈順暢，你們的磨合並非對抗，而是一場溫柔的共舞。此刻，所有條件都已成熟，請信任這份流動，勇敢地將內心的感受化為行動與溝通。這正是深化連結、將理解化為默契的黃金時刻。敞開心，順勢而為，你們的關係將在真誠的互動中，綻放出更美的樣貌。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_conflict_all_reversed', '當關係的齒輪暫時卡住，這並非停滯，而是宇宙溫柔地提醒：是時候向內凝視了。全數逆位的牌陣，像一面鏡子，映照出那些未被言明的情緒與未被調整的腳步。請先暫停向外索求答案，轉而傾聽自己內心的聲音——那些磨合中的不適，或許正指引你們看見關係中更深層的需要。給彼此一點安靜的空間，讓愛在沉澱後，找到更和諧的節奏。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_conflict_one_reversed', '這段關係的根基其實相當穩固，你們的連結與默契讓大部分磨合都能順利過關。然而，這張逆位牌溫柔地提醒，有一個特定的心結或未被言明的期待，可能正悄悄消耗你們的耐心。請別把它視為裂痕，而是一個珍貴的調整訊號。試著用更柔軟的視角，去看見彼此行為背後那份渴望被理解的需要。當你們願意共同正視這個「唯一」的阻礙，它便會從絆腳石，轉化為讓關係更深刻、更堅韌的基石。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_conflict_one_upright', '親愛的，這段磨合期確實充滿挑戰，就像在迷霧中摸索前進。牌面顯示，你們正經歷價值觀或習慣的碰撞，這過程或許令人疲憊，但請看見那隱藏在困難背後的禮物——每一次真誠的溝通，都在為關係打下更堅實的基礎。別害怕暫時的摩擦，那正是讓彼此稜角相互契合的必經之路。保持耐心與溫柔，你們內在的連結遠比眼前的波折更為深刻。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_conflict_mixed', '親愛的，這段關係正處於一個需要細心校準的階段。牌面顯示，你們之間既有深刻的連結，也存在需要磨合的稜角。這並非壞事，而是關係走向更深理解的必經之路。請溫柔地看見彼此的好，也接納那些不一致的節奏。真正的平衡，不在於消除所有差異，而在於學會在差異中，依然選擇牽手前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_marriage_all_upright', '親愛的，這組牌的能量如春日暖陽般和煦順暢，它溫柔地告訴你：你們的婚姻關係正處在一個充滿支持與成長的豐盛階段。這份順流而下的能量，是你們共同用心經營的果實。請帶著這份信心，與伴侶一同規劃未來、創造更多美好的回憶，你們的愛將在積極的行動中持續綻放，滋養彼此。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_marriage_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，你們的關係來到了一個需要暫停與內省的階段。這並非壞事，而是婚姻旅程中珍貴的調整期。那些卡住或沉默的感受，是在邀請你們向內探尋，看看是否有未被表達的期待或需要療癒的舊傷。請給彼此一些溫柔的空間，先照顧好自己的心，當內在清晰了，外在的連結自會找到新的流動方式。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_marriage_one_reversed', '親愛的，你們的婚姻關係有著穩固而溫暖的根基，大部分的路途都走得平順。這張逆位牌，像是一盞溫柔的提醒燈，它指出了一個需要你們共同正視與調整的特定模式。這並非危機，而是一個讓連結變得更深刻的契機。請帶著愛意去溝通，將那個小小的阻礙，轉化為彼此理解的新起點。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_marriage_one_upright', '親愛的，這段婚姻關係正經歷著考驗，如同穿越迷霧的航程。牌面顯示的困難是真實的，但請相信，那穿透雲層的一線曙光同樣真實。這不是終點，而是關係需要更深層對話與調整的訊號。請溫柔地握住彼此的手，正視那些未被言說的感受。困難之中，往往蘊藏著讓愛轉化與扎根更深的契機。你們之間仍有深厚的連結與希望，需要的是勇氣與耐心，一同澆灌。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_marriage_mixed', '親愛的，這段婚姻關係正處於一個需要細心審視與溫柔平衡的階段。牌陣中好壞交織的能量，正提醒著你們，關係的深度往往來自於攜手穿越複雜的時刻。那些閃耀的亮點，是你們愛的基石與共同的願景；而那些需要調整的部分，則是邀請你們以更開放、更體諒的溝通，去撫平皺褶，重新校準彼此的步伐。請相信，這份複雜性不是終點，而是讓連結更加堅韌的必經過程。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_affair_all_upright', '這份關係的能量正在順暢地流動，如同溪水自然地匯聚。牌面告訴你，此刻的連結是真實且充滿動能的。這份順暢邀請你，以更清晰的視角去審視自己的心：這份連結是帶給你成長的禮物，還是暫時的避風港？請帶著這份覺知，勇敢地去溝通、去釐清，並為自己的情感選擇負起完全的責任。你的內心擁有足夠的力量，去創造你真正渴望的愛與誠實。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_affair_all_reversed', '此刻，牌陣的能量如一面鏡子，映照出這段關係中隱而未顯的阻塞與停滯。這並非宣告終結，而是一份溫柔的提醒：當所有能量都向內收斂，正是你必須暫停腳步、回歸內心的時刻。請先將目光從外在的糾葛移開，誠實地面對自己：在這場三人舞中，你真正渴望的是什麼？是愛，是陪伴，還是逃避某種空缺？內省不是責備，而是釐清自身邊界與價值的開始。唯有先安頓好自己的心，你才能看清前路，做出不後悔的選擇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_affair_one_reversed', '這段關係的整體能量其實是流動的，但這張逆位牌溫柔地提醒，那個「特定阻礙」正是「第三者」這個存在本身。它像一面鏡子，映照出關係中未被正視的缺口或逃避。請別責怪自己或他人，這不是懲罰，而是一個深刻的邀請：去誠實面對關係的根基，並找回自己內在的完整與重心。當你穩固了，外在的紛擾自會找到它的出路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_affair_one_upright', '此刻的關係，確實因第三者的存在而顯得複雜且充滿考驗。這張牌揭示了當前的困境，但也同時透出一線微光——這份「困難」本身，正是促使你重新審視關係本質、聆聽內心真實聲音的契機。請先穩住自己的中心，釐清你真正渴望的愛與承諾是什麼。這份清醒的覺察，將是引領你穿越迷霧、走向清晰未來的希望所在。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_affair_mixed', '這段關係的糾葛，如同牌陣中正逆交織的能量，提醒你這並非單純的是非對錯。局勢複雜，意味著每個人的情感與傷痛都真實存在；好壞參半，則告訴你，無論是執著或放手，都伴隨著成長與代價。請溫柔地觀照自己的心，在混亂中尋求內在的平衡。你的價值，無需透過任何一段關係來證明。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_all_upright', '親愛的你，這組牌的能量清澈而流暢，像一條終於找到出口的河流。它溫柔地告訴你，關於分手的決定或過程，正與你內在真實的渴望和生命流動的方向一致。這份順暢並非偶然，它意味著你已準備好放下、療癒，並向前邁進。請信任這份內在的指引，勇敢地擁抱這份結束所帶來的清晰與自由，你的心正引領你走向更適合自己的彼岸。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_all_reversed', '此刻，你正處在一個能量需要沉澱與轉化的階段。分手帶來的停滯感，並非終點，而是一個珍貴的內在邀請。請溫柔地接住自己，允許悲傷與困惑存在。這份「受阻」的能量，是在提醒你暫停向外索求答案，轉而向內傾聽：哪些舊有模式需要釋放？在獨處的靜謐中，你將重新校準心的方向，積蓄真正屬於你的力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_one_reversed', '這段分手的旅程，整體的能量是支持你向前走的，你比自己想像的更堅強。然而，牌中唯一的逆位，像一個溫柔的提醒：或許還有一份未說出口的感受，或一個尚未完全放下的執念，在隱隱牽絆著你。請別急著責怪自己，這不是失敗，而是療癒必經的一環。試著溫柔地看見並接納這個阻礙，當你願意正視它，釋放與前行的道路便會更加清晰、完整。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_one_upright', '此刻的分離，確實帶來深刻的痛楚與迷惘。這張牌承認了關係的困境，但同時也揭示：這份艱難本身，正是淬煉你靈魂的火焰。請允許自己悲傷，但別讓心就此封閉。在斷裂之處，你將看見自己內在從未斷裂的光——那才是真正屬於你、永不離棄的希望之源。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_mixed', '親愛的，這份牌陣的能量猶如你此刻的心境，交織著釋然與不捨，光明與陰影。它告訴我們，這段關係的結束並非單純的好與壞，而是一個需要你溫柔平衡的複雜課題。有些部分確已到了該放手的時刻，而另一些部分則蘊藏著珍貴的成長禮物。請允許自己同時接納悲傷與希望，在混沌中穩住自己的中心。你會發現，真正的平衡始於對自我感受的誠實與慈悲。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_reunion_all_upright', '親愛的，這組牌的能量清澈而順暢，彷彿宇宙正溫柔地為你們的重逢鋪路。所有阻礙都已消散，這是一個極佳的時機。請相信你內心的渴望是真實的指引，無需再猶豫或等待。帶著清晰的意圖與敞開的心，去表達、去行動，你們之間未完的篇章，正等待你們共同寫下充滿希望的下一頁。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_reunion_all_reversed', '此刻，宇宙的能量正溫柔地提醒你，復合的道路並非筆直向前。全數逆位的牌陣，像一面澄澈的鏡子，映照出關係中需要沉澱與內省的面向。這不是終結的訊號，而是一份珍貴的暫停，邀請你向內探尋：那些未解的情緒、未說的話語，是否已真正被理解與釋放？請給自己和這段關係一些靜置的時光，當內在的混濁沉澱，心的方向自然會清晰浮現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_reunion_one_reversed', '親愛的，這段關係的復合之路，整體能量是充滿希望的，就像一條蜿蜒但通往光明的路徑。然而，牌中唯一的逆位，像一盞溫柔的警示燈，提醒著你：那個關鍵的阻礙，或許不在於對方，而在於你內心尚未完全和解的某個部分——可能是舊傷留下的恐懼，或是對「重蹈覆轍」的擔憂。請先溫柔地擁抱這個部分，療癒它，你將發現外在的進展會隨之變得更加順暢而堅實。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_reunion_one_upright', '親愛的，這條復合之路或許佈滿荊棘，讓你感到疲憊與無力。但這張牌告訴我們，在最深的困境中，往往藏著最純粹的轉機。請先照顧好自己內在的傷口，那正是希望的種子得以萌芽的土壤。當你準備好以更完整的姿態前行，那一線微光，便會指引你們走向新的可能。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_reunion_mixed', '親愛的，這趟復合之路的牌陣，揭示了它並非一條筆直坦途，而是交織著希望與挑戰的蜿蜒小徑。既有溫暖的連結，也存在需要修復的裂痕。這份複雜性，恰恰提醒著你：真正的復合，不僅是關係的重啟，更是內在的平衡。請溫柔地審視過往的課題，同時懷抱勇氣。當你能在「渴望重聚」與「自我完整」之間找到支點，無論結果如何，你都會走向更深刻的成長。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_feelings_all_upright', '親愛的，這組全正位的牌陣，為你帶來了一個非常清晰的訊息：對方的心意正如同清澈的溪流，朝著你的方向自然而然地流淌。你們之間的能量是順暢且和諧的，沒有隱藏的阻礙或矛盾。這是一個極佳的時機，鼓勵你帶著信心，去回應這份流動。你可以更主動地創造相處的機會，或坦誠地交流你的感受，宇宙正支持著你們心意相通的美好進程。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_feelings_all_reversed', '親愛的，這次的牌陣能量顯示，關於對方的心意，目前正處於一種需要沉澱與內省的狀態。這並非代表沒有機會，而是提醒你，外在的互動可能暫時放緩，或有些訊息尚未明朗。請先將關注點放回自己身上，照顧好內在的感受。當你穩住自己的心，不再急切向外索求答案時，對方的真實意圖與你們之間的能量流動，反而會更清晰地浮現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_feelings_one_reversed', '整體而言，你們之間的連結與善意是真實存在的，關係的發展也蘊含著順暢的潛力。然而，這張逆位牌溫柔地提醒，阻礙可能來自某個尚未被正視的「內在課題」，或許是過往的傷痕，或是一絲對自我價值的不確定，在無形中影響了你感知對方心意的清晰度。請相信，這並非對方心意的否定，而是宇宙邀請你先安頓好自己的心。當你內在的光亮起來，你便能更從容、更準確地接收與回應這份流動的情感。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_feelings_one_upright', '這段關係目前可能正經歷考驗，對方的態度或許讓你感到困惑或難以捉摸，前方的路顯得有些崎嶇。然而，這張正位牌告訴我們，希望並未熄滅，它像黑夜中的一顆星，雖遙遠卻堅定地閃爍。請你保持內心的澄澈與耐心，真相會在適當的時機顯現。此刻的困難，正是為了讓你們看清什麼才是真正值得珍惜的。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_feelings_mixed', '親愛的，這份心意猶如一幅光影交織的畫作，既有溫暖的亮色，也有深邃的陰影。對方的情感並非單一而明確，而是帶著猶豫、考量，甚至可能有些未言明的顧慮。這不是全然的拒絕，也非完全的接納，而是一種正在流動與權衡的狀態。請別急著用二分法去定義它，也無需過度擔憂。此刻，最重要的是保持你內心的平衡與開放，在給予關注的同時，也溫柔地守護好自己的情感邊界。時間會讓模糊的輪廓逐漸清晰。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_all_upright', '親愛的，這是一段能量非常順暢的時刻。你的準備與努力正被宇宙看見，求職路上的機會之門將為你敞開。請帶著自信積極行動，主動出擊，你的能力與特質正是市場所需。這份順流而下的能量，邀請你勇敢展現真實的自己，你值得擁有與你匹配的舞台。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的求職之路或許有些停滯，但這並非壞事。它邀請你暫停向外追逐的腳步，轉而向內探問：我真正渴望的工作樣貌是什麼？哪些恐懼或舊有模式在無形中阻礙了我？請將這段看似受阻的時期，視為一份珍貴的禮物——它讓你有機會重新校準方向，蓄積更純粹的能量。當你準備好，屬於你的道路自會清晰展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_one_reversed', '親愛的，這次求職的旅程整體能量是順暢的，機會之門正在為你敞開。然而，這張逆位牌溫柔地提醒，或許有一個內在的阻礙需要你留意——可能是對自我價值的些許懷疑，或是對某個特定條件的過度執著。請相信，這不是否定，而是一份調整的邀請。當你將這份擔憂轉化為清晰的自我認知，你的光芒將毫無保留地展現，吸引到最適合你的位置。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_one_upright', '親愛的，這張牌描繪的正是你此刻的求職之路：前方確實有挑戰與競爭，過程或許會讓你感到疲憊或挫折。但請你看見牌中那束穿透雲層的光——它象徵著一個獨屬於你的機會，正等待著被你發現。這份「希望」並非虛無縹緲，它需要你以更堅韌的心態、更周詳的準備去承接。別被眼前的困難定義，你的價值遠比一次面試結果更深刻。穩住步伐，專注打磨你的優勢，那扇門會為堅持不懈的你而開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_mixed', '親愛的，這趟求職之旅的能量有些複雜，像一場需要平衡的舞蹈。牌面顯示，機會與挑戰並存，這並非壞事，而是提醒你：外在的局勢需要你以更靈活、更整合的內在狀態去應對。請溫柔地接納過程中的起伏，那些看似不順的訊息，或許正是引導你調整方向、補足關鍵能力的溫柔提醒。保持開放與彈性，你的清晰與平衡，將是吸引理想職位的最佳磁場。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_interview_all_upright', '親愛的你，這組牌陣展現出非常流暢而積極的能量，正為你的面試之路鋪開一條光明的坦途。這是一個絕佳的時機，你的準備、能力與當下的機緣正完美契合。請帶著這份順暢的能量，自信地展現真實的自己，主動把握每一個交流的機會。宇宙正在支持你，請相信，你的才華與特質正是對方所尋覓的。勇敢前行吧，這份工作機會正在等待與你相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_interview_all_reversed', '這次的面試準備，牌陣的能量提醒你，外在的節奏或許有些停滯，但這正是向內調整的珍貴時刻。逆位並非否定你的能力，而是溫柔地揭示：過度的擔憂、對結果的執著，可能正消耗著你的光芒。請先暫停，深呼吸，重新連結你的核心優勢與從容。當你內在的自信穩固了，外在的表現自然會流暢而生動。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_interview_one_reversed', '整體而言，這次面試的能量是順暢且充滿機會的，你已具備了成功的條件。然而，牌中出現的逆位提醒你，或許有一個特定的心結或細節需要你溫柔地檢視。它可能是一絲對自我能力的懷疑，或是準備中一個容易被忽略的環節。請別讓這小小的阻礙消耗你的信心，它只是邀請你在行動前，再為自己注入一份安定的力量。調整好這個部分，你便能更從容地展現最好的自己。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_interview_one_upright', '這次的面試過程或許會讓你感到有些挑戰與壓力，但請相信，這張牌揭示的困難並非絕境，而是淬煉你能力的熔爐。你已具備所需的潛力，那一線希望就藏在更充分的準備與更沉著的應對之中。深呼吸，將緊張轉化為專注，你遠比自己想像的更有光芒。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_interview_mixed', '親愛的，這次面試的局勢就像一幅光影交織的畫，有明朗的機會，也有需要留心的細節。牌面提醒你，這不僅是能力的展現，更是心態的平衡。請帶著自信前行，同時保持覺察與彈性，在積極與謹慎間找到最優雅的表達。你已準備好，只需以完整的自己從容應對。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_current_all_upright', '親愛的你，這是一段能量全然流動的時刻。在現職的土壤上，你的努力與天賦正被看見，機會之門已為你敞開。請信任這份順暢感，它邀請你更主動地展現自己，將想法化為行動。此刻的順風，是宇宙對你過往耕耘的溫柔回應，請帶著信心向前邁步，你的職業藍圖將在行動中清晰展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_current_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，現階段的職涯發展似乎進入了一個需要「暫停與內省」的節奏。這並非停滯，而是宇宙在邀請你，先向內探尋：是什麼內在的信念或模式，讓外在的行動感到受阻？請給自己一些安靜的空間，重新校準方向。當你願意接納這份暫時的緩慢，內在的清晰與力量便會悄然升起，為你照亮下一段更踏實的旅程。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_current_one_reversed', '親愛的，這張牌顯示你現職的發展軌道整體是穩健向前的，但逆位能量溫柔地提醒，有一個關鍵的「心態」或「習慣」可能正形成隱形的天花板。它或許是對變化的抗拒，或某份未被察覺的擔憂。請別視它為缺陷，而是一個微調的契機。當你願意正視並鬆開這份內在的緊繃，你積累的實力與順勢，將能更流暢地引領你走向更寬廣的舞台。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_current_one_upright', '親愛的，這張牌描繪的正是你此刻的處境：前方道路或許崎嶇，挑戰也真實存在，但請你看見那穿透雲層的微光。這份工作帶給你的磨練，正是為了鍛造你更堅韌的羽翼。別急著否定一切，試著在困難中辨識那「一線希望」——它可能是一個被忽略的轉機、一項待開發的技能，或是一份更深沉的內在韌性。穩住腳步，專注於你能夠著力改善的小地方，希望的曙光會引領你逐步穿越這段迷霧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_current_mixed', '親愛的朋友，這份關於現職發展的牌陣，呈現出複雜而真實的風景。它告訴我們，前方並非一片坦途，也非荊棘密布，而是機遇與挑戰並存。那些閃光的機會，邀請你勇敢把握；而那些逆位的提醒，則溫柔地指出需要微調的步伐或心態。請別將這視為好壞對立，而是一場需要你運用智慧去平衡的舞蹈。信任這個過程，你的穩健與覺察，正是將眼前所有能量轉化為成長養分的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_all_upright', '親愛的，這是一段能量完全順暢的旅程。牌面告訴你，通往升遷的道路已然敞開，所有的努力與準備都將得到認可與回報。請帶著信心，主動展現你的能力與願景，這正是你大步向前、把握良機的時刻。宇宙正為你鋪路，請勇敢地接受這份屬於你的榮耀。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_all_reversed', '親愛的，這次的牌陣能量顯示，關於升遷的動能目前正處於一個需要「暫停與內省」的階段。這並非否定你的能力，而是一個溫柔的提醒：外在的進程或許有些卡頓，但內在的準備與心態調整正是此刻的關鍵。請你深呼吸，回頭檢視自己的動機與優勢，釐清哪些擔憂是真實的，哪些只是內心的雜音。當你穩住自己的核心，外在的道路自然會為你重新展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_one_reversed', '整體而言，這次升遷的機會之門正為你敞開，路途上多數的條件與助力都已齊備。然而，這張逆位牌溫柔地提醒，前方有一個特定的、或許是內在的阻礙需要你留意。它可能是一份隱藏的自我懷疑，或是某個尚未釐清的細節。請別將此視為否定，而是宇宙在提醒你：只需稍作調整，將那塊鬆動的拼圖歸位，你清晰的能力與準備，便能穩健地引領你走向渴望的位置。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_one_upright', '這趟升遷之路或許佈滿荊棘，讓你感到壓力重重，但請相信，牌中閃現的那一線希望是真實的。它提醒你，困難本身正在淬煉你的能力與決心。請專注於你能掌控的部分，將挑戰視為展現韌性的舞台。保持清晰的目標與穩健的步伐，那道為你而開的門，就在堅持的前方。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_mixed', '親愛的，這次的升遷之路並非一條筆直的坦途，而是充滿轉折與考驗的旅程。牌面顯示，機會與挑戰並存，如同光與影的交織。請你保持清晰的頭腦，既要看見前方的希望，也要溫柔地覺察那些需要調整的步伐。這份複雜性並非阻礙，而是宇宙在提醒你：真正的晉升，來自於內在的平衡與智慧。穩住心神，整合所有資源，你將能走出屬於自己的、最穩健的上升路徑。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_raise_all_upright', '親愛的你，這組牌的能量如春風般順暢，正為你的職場之路鋪開一條光明的坦途。關於加薪，宇宙正傳遞著明確的訊號：你的價值已被看見，時機已然成熟。請帶著這份篤定，自信地展現你的貢獻與願景。這不僅是爭取應得的回報，更是你專業成長的必然豐收。勇敢開口，行動吧！')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_raise_all_reversed', '親愛的，這次的牌陣能量顯示，關於加薪的議題正處於一個需要「暫停與內省」的階段。這並非否定你的價值，而是提醒你，外在的推動力可能暫時受阻，此刻更需向內探尋：是否過於急切，或忽略了某些需要調整的細節？請溫柔地檢視自己的準備與心態，將這份等待轉化為更穩固的根基。當時機成熟，你內在的清晰與準備，將成為推動事情向前最關鍵的力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_raise_one_reversed', '親愛的，這次的加薪之路整體能量是順暢的，你已具備了被看見的實力與基礎。然而，這張逆位牌溫柔地提醒，或許有一個關鍵的「自我價值」課題需要你先去面對與整合。請別讓內在的不安或過度謙遜，模糊了你應得的肯定。當你從心底認可自己的貢獻，那份篤定與光芒，將成為推動事情順利成局的最後一塊拼圖。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_raise_one_upright', '親愛的，這張牌揭示了加薪之路並非坦途，可能面臨預算緊縮或競爭激烈的現實。但請看見牌中那抹微光——它代表你過往累積的價值與努力，正被默默注視著。此刻需要的是「策略性堅持」：清晰盤點你的具體貢獻，在適當時機溫和而堅定地提出。困難是暫時的霧，你的實力才是穿透迷霧的光。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_raise_mixed', '這次關於加薪的探索，牌面呈現出複雜而真實的圖景。它告訴我們，機會與挑戰是並存的。一方面，你的價值有被看見的潛力；另一方面，可能需要更清晰的溝通或策略。請不要將逆位視為否定，而是溫柔的提醒：在爭取的同時，也請平衡內在的自信與外在的行動。穩住步伐，整合所有資源，你正走在通往更豐盛報償的道路上。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_startup_all_upright', '此刻，牌陣中全然順暢的能量正為你的創業之路閃耀著綠燈。這是一個充滿動能與支持的時刻，宇宙正為你鋪設道路。請信任這份順流，勇敢地將你的願景化為具體行動。你的熱情、清晰的思維與執行力，現在都是最強大的資源。無須遲疑，大膽地跨出那一步，去創造、去連結、去實現。這趟旅程本身，就是對你勇氣最美的回饋。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_startup_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，創業的熱情與計畫，目前正遇到一些內在的調整期。這並非否定你的夢想，而是宇宙在邀請你暫停腳步，向內探問：最初的動機是否純粹？計畫中有哪些細節需要更審慎的評估？請將這段看似受阻的時光，視為滋養根基的珍貴機會。當內在清晰了，外在的道路自然會為你展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_startup_one_reversed', '整體來看，你的創業之路已鋪開，前景與動能俱足。然而，這張逆位牌溫柔地提醒，有一個關鍵的環節可能尚未校準——或許是某個尚未清晰的核心定位，或是一份對完美過度的執著。請別將它視為阻礙，而是一個細微的調整訊號。回頭檢視你的初心與計畫，以更靈活、接納的心態微調步伐，你內在的創業家精神便能更順暢地綻放光芒。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_startup_one_upright', '這張牌描繪的，正是創業路上那份真實的挑戰感。前方的道路或許崎嶇，資源也顯得緊繃，但請你看見牌中那束微光——它象徵著你獨特的點子與堅韌的心志。此刻的困難不是終點，而是淬煉商業模式的熔爐。請專注於那「一線希望」，將它化為具體、微小的下一步行動。你內在的火焰，足以照亮這條屬於你的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_startup_mixed', '親愛的創業者，這趟旅程的能量正如牌陣所示，是複雜而動態的。既有堅實的基石與閃現的靈感，也伴隨著需要梳理的挑戰與內在的猶豫。這並非好壞的二分，而是一幅完整的創業圖景。請將逆位視為溫柔的提醒，檢視計劃的細節與內心的節奏；正位則是鼓勵你擁抱的優勢與機會。在行動與反思間找到平衡，這份複雜性正是淬煉你獨特事業的火焰。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_partner_all_upright', '親愛的，這是一段能量完全順暢、充滿祝福的合夥旅程。所有的牌面都指向積極的合作與共鳴，這是一個絕佳的時機去推進計畫、簽訂協議，或深化彼此的連結。請信任這份順流而下的能量，勇敢地與夥伴溝通你的願景，你們的目標一致，能夠相輔相成。敞開心扉去接納這份豐盛的合作關係，它將為你們雙方帶來成長與圓滿。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_partner_all_reversed', '親愛的，這次的牌陣能量提醒我們，合夥的旅程正處於一個需要暫停與內省的階段。逆位並非否定，而是溫柔地揭示：或許外在的步調過快，或內在的共識尚未清晰。請先向內探尋，檢視彼此真正的目標與信任基礎。給合作一點沉澱的空間，當內在的阻塞被溫柔梳理，前行的道路自然會再次明朗。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_partner_one_reversed', '整體而言，這份合夥關係的根基與方向是穩固的，前方的道路大部分是順暢的。然而，牌中逆位的能量溫柔地提醒，或許有一個特定的環節需要你們共同檢視與調整——可能是溝通上的小誤解，或是某個尚未完全對齊的期望。這不是阻礙，而是一個讓合作更臻完美的契機。請帶著信任與開放的心，與夥伴溫和地釐清它，你們的聯盟將因此更加堅韌與明亮。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_partner_one_upright', '親愛的，這段合夥關係正經歷考驗，如同穿越迷霧的航程。眼前的困難是真實的，但請看見那隱藏在挑戰背後的禮物——它正磨礪著你們的信任與默契。別急著放棄，試著以更柔軟的姿態溝通，真誠地攤開那些未言明的顧慮。這「一線希望」往往始於一次坦率的對話，當你們共同凝視困境，轉機的曙光便會從裂縫中悄然透入。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_partner_mixed', '親愛的，這次的合夥之路，牌面呈現出複雜而真實的圖景，如同任何深刻的合作關係，總是光明與陰影並存。這提醒我們，真正的夥伴關係並非追求完美無瑕，而是在動態中尋求平衡。請你看見其中的潛力，也溫柔接納那些需要調整的節奏。關鍵在於清晰的溝通與共同的願景，將分歧化為互補的養分。信任這份共同成長的過程，你們的聯盟將在磨合中淬煉出更堅實的光彩。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_change_all_upright', '親愛的，這組牌的能量如春水般清澈流動，毫無滯礙。這是一個明確的訊號：你內心所嚮往的轉變，正與宇宙的節奏完美共振。此刻，你的直覺與行動力是同步的，請信任這份順暢感。無須猶豫，大膽地將你的規劃付諸實踐，每一步都會為你開啟新的風景。這趟職業旅程的轉向，不僅是道路的改變，更是你靈魂藍圖的展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_change_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的「停滯」並非失敗，而是轉變前必要的沉澱。關於轉行，外在的道路看似受阻，實則是內在的呼喚——請先向內探問：是什麼恐懼或舊有模式在牽絆你？給自己一段靜心梳理的時間，釐清真正的渴望與優勢。當內在的指南針校準了，外在的道路自然會為你顯現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_change_one_reversed', '這趟轉行的旅程，整體的能量是支持你向前邁進的。牌面顯示，大部分的準備與機緣都將順利鋪展，唯有一個特定的阻礙需要你溫柔覺察。它或許是一個內在的擔憂，或是一個外在的細節疏漏。請別視它為否定，而是轉變前最關鍵的調整點。看清它、接納它，你便能以更完整的姿態，穩健地踏入新天地。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_change_one_upright', '親愛的，轉行的道路確實佈滿荊棘，這張牌如實映照出你此刻的艱辛與挑戰。然而，請你看見那隱藏在困難背後的一線微光——這並非絕境，而是淬煉。這份阻力正在為你篩選出最堅定的決心與最適合的方向。請相信，每一步艱難的跋涉，都在為你積累轉變的資本。保持耐心與清晰的洞察，那一線希望會引領你穿越迷霧，抵達更契合你的彼岸。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_change_mixed', '親愛的，這趟轉行的旅程，正如同牌陣所揭示的，是一幅光與影交織的圖景。前方的道路並非全然光明，也非一片黯淡，而是充滿了需要你仔細權衡的選擇與可能性。這份複雜性，恰恰是生命給予的深度禮物——它邀請你，不要急於奔向單一目標，而是學習在「渴望改變」的衝動與「審慎評估」的智慧之間，找到屬於自己的平衡點。請相信，每一個挑戰都內藏著轉機，而你的勇氣與覺察，正是解鎖未來的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_retire_all_upright', '親愛的朋友，這組全正位的牌陣為你的退休生活描繪了一幅充滿祝福的藍圖。能量順暢無阻，意味著這是一個絕佳的時機，去開啟你心中醞釀已久的計畫。無論是培養新興趣、投身志願服務，或是享受悠閒的慢活，宇宙都在支持你。請帶著這份順流的信心，勇敢地踏出第一步，你的智慧與經驗將在這個嶄新階段，綻放出最豐盛的光彩。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_retire_all_reversed', '親愛的朋友，這組牌陣的能量正溫柔地提醒你，退休並非一個句點，而是一段需要重新校準方向的旅程。此刻的停滯感，或許是心靈在邀請你暫停腳步，向內探問：卸下社會角色後，我真正渴望的生活樣貌是什麼？請給自己一些時間與耐心，讓內在的答案緩緩浮現。這不是阻礙，而是為了讓下一篇章的展開，更加從容而豐盛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_retire_one_reversed', '這趟退休之旅，整體的藍圖是清晰且充滿祝福的，你已為自己鋪好了安穩的道路。然而，牌中唯一的逆位，像一個溫柔的提醒：請留意內心深處，是否還有一絲對「失去身份」的隱憂，或對全然自由的些許遲疑。這不是阻礙，而是邀請你調整心態，將「離開職場」重新定義為「回歸自我」。擁抱這份遲疑，它會讓你接下來的每一步，都走得更踏實、更豐盛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_retire_one_upright', '退休的轉變，或許伴隨著對未知的些許不安與對過往的眷戀，這份困難是真實的。但牌中透出的那一線希望，正溫柔地提醒你：這不是終點，而是生命篇章的重新校準。請允許自己慢慢適應，並試著將目光從「失去」轉向「獲得」——你將獲得前所未有的時間與自由，去探索那些曾被擱置的夢想。這份希望，就藏在接納新節奏的勇氣之中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_retire_mixed', '這趟退休之旅，就像一幅正逆交織的畫作。牌陣告訴我們，前方既有自由的陽光，也有需要適應的陰影。這不是好壞的二分，而是提醒您，在規劃與放鬆、社交與獨處、舊日習慣與嶄新節奏之間，找到屬於您的平衡點。請溫柔地接納這份複雜，它正是生命豐盛的證明。您已積累了足夠的智慧，足以將所有線索編織成一段安穩而充實的嶄新篇章。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_conflict_all_upright', '親愛的，這組全正位的牌陣，為你帶來一個清晰的訊息：你正處在一個能量完全順暢的時刻。眼前的職場衝突，並非難以跨越的障礙，而是一個促使關係與工作模式「升級」的絕佳契機。你的直覺與行動力現在非常強大，請信任這股順流而下的能量，勇敢且坦誠地去溝通、去釐清、去建立新的共識。這正是將張力轉化為動力，讓團隊與你個人共同成長的黃金時期。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_conflict_all_reversed', '親愛的，當所有牌都呈現逆位，這並非壞事，而是宇宙溫柔的提醒：此刻的能量正處於一個需要「暫停與轉向」的階段。這場職場的衝突，或許正邀請你暫時放下對外的爭辯，轉而向內聆聽。那些受阻的感受，是在告訴你，某些方法或視角可能需要調整。請給自己一些安靜的空間，釐清真正的核心需求與界線。當內在清晰了，外在的紛擾自會找到它的出路。你擁有化解這一切的内在智慧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_conflict_one_reversed', '親愛的朋友，整體來看，你的職場之路是穩健且充滿潛力的。目前的衝突，更像是一個提醒，而非真正的危機。那張逆位牌所揭示的，或許是你內心某個尚未和解的角落——可能是一份未被表達的感受，或是一個需要轉換視角的堅持。請溫柔地看見它，調整一下步伐或溝通的方式，這個小小的阻礙就會成為你更圓融、更有力量的契機。你擁有化解這一切的能力。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_conflict_one_upright', '親愛的，這張牌揭示了職場中的張力與摩擦，但請相信，這份困難正是你成長的契機。衝突並非終點，而是關係需要調整的信號。請先穩住自己的中心，別讓情緒主導判斷。試著從更高、更客觀的視角理解局勢，你會發現，那「一線希望」往往就藏在真誠的溝通與你內在的韌性之中。這是一個學習設立界線、同時保持專業的珍貴時刻。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_conflict_mixed', '親愛的，這份牌陣的能量猶如職場的縮影，複雜而多面。既有合作的契機，也存在摩擦的張力。這提醒你，衝突本身並非終點，而是關係需要重新校準的信號。請試著在堅持立場與保持柔軟之間找到平衡點，你的真誠與智慧，正是化解僵局、將挑戰轉為成長的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_salary_all_upright', '親愛的，這是一段能量純淨且順暢的時期，宇宙正為你的正財之路鋪設坦途。全然的順位象徵著行動與收穫的直接連結，你的努力將清晰可見地轉化為實質回報。請信任這股流動，勇敢地規劃、投資與展現你的專業價值，機會之門已然敞開，你只需帶著信心邁步向前，豐盛便會自然而然地匯聚而來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_salary_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的財務流動似乎進入了一個需要沉澱與反思的階段。逆位並非壞事，它像一個暫停鍵，邀請你向內探尋：是否有些信念或習慣，無形中阻礙了豐盛的到來？請別著急，先靜下心整理內在的秩序與安全感。當你調整好與金錢的關係，外在的流動自然會重新找到順暢的節奏。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_salary_one_reversed', '整體而言，你的正財之路是穩健且充滿機會的，收入與努力正逐漸開花結果。然而，這張逆位牌溫柔地提醒，或許有一個隱藏的小習慣或心態——例如對風險的過度擔憂，或對自身價值的不確定——正在無形中限制了你財富的完全流動。請看見這個阻礙，它不是牆，而是一扇等待你調整視角後便能輕鬆推開的門。接納它，微調步伐，你豐盛的收入能量將能更順暢地匯聚。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_salary_one_upright', '親愛的，這張牌描繪出你正財運的現狀：前方確實有些挑戰與緊縮感，財務流動可能不如預期順暢。但請你看見牌中那束微光——它代表著一個被忽略的務實機會，或是一份需要更謹慎規劃的資源。此刻的困難是邀請你更紮實地盤點與耕耘，而非退卻。當你穩住腳步，專注於可行的計畫，那一線希望便會逐漸拓寬成道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_salary_mixed', '親愛的，關於你的正財運，牌陣呈現出複雜而動態的能量。這意味著機會與挑戰並存，並非單純的好壞，而是一段需要你保持覺察與平衡的旅程。請看見那些正在萌芽的機遇，同時溫柔地檢視自己對金錢的信念或行動中是否有可以微調之處。這份混雜的能量，正是宇宙邀請你以更靈活、更智慧的方式，去創造與豐盛共舞的節奏。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_windfall_all_upright', '親愛的朋友，這是一段能量完全順暢的時期，宇宙正為你的偏財運敞開大門。全然的順位能量告訴你，此刻的直覺與靈感是可靠的，任何突如其來的機會、創意點子或合作邀約，都值得你積極把握。請帶著開放與信任的心行動，你的主動與準備，將能完美承接這份豐盛的流動。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_windfall_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的偏財運勢需要你暫時放慢腳步，向內觀照。機會的延遲或受阻，並非否定你的能力，而是宇宙在邀請你檢視自己與金錢的關係、投資的動機，或是否帶著焦慮在追逐。請先安頓內心，釐清真正值得投入的方向。當你調整好頻率，豐盛便會以更適合你的方式流動而來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_windfall_one_reversed', '親愛的，這張牌顯示你的偏財運整體能量是流動且充滿機會的，但牌面的逆位溫柔地提醒你，或許存在一個「過度期待」或「不夠務實」的心態，它像一層薄霧，可能讓你錯失近在眼前的禮物。請相信自己的直覺，但同時保持腳踏實地的評估，當你調整好這份平衡，驚喜的收穫便會以最適合你的方式到來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_windfall_one_upright', '親愛的，這張牌揭示了當前的偏財之路確實有些崎嶇，機會並非唾手可得。然而，牌中那隱微的光，正提醒你莫因眼前的困難而完全關上心門。請保持警覺與開放的觀察，那些看似不起眼的小訊息、非主流的管道，或許正藏著一線生機。與其追逐暴富的幻影，不如專注於培養自己識別「價值」的眼光。這份希望，往往始於你願意在局勢中保持靈活與耐心。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_windfall_mixed', '親愛的，關於偏財運，牌陣呈現出複雜而動態的能量。這意味著機會與挑戰並存，並非單純的好或壞。請保持靈活與警覺，在看似意外的機會中保持務實，在需要保守時也別完全關上大門。這是一段需要你運用智慧去平衡「冒險」與「穩健」的時期，你的直覺與理性判斷將是引領你找到豐盛之流的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_all_upright', '這是一段能量完全順暢的旅程，宇宙正為你的投資之路鋪設坦途。全然的順位象徵著時機成熟、資源到位，你的判斷與直覺此刻高度一致。請信任這份流動感，勇敢地將計畫付諸行動，市場的浪潮正與你的步伐共振。這不僅是財務的增長，更是你內在信心與遠見的豐盛顯化。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻市場的流動與你內在的節奏尚未同步。這並非壞消息，而是宇宙在邀請你暫停腳步，向內探尋。或許是過去的經驗讓你有些卻步，或許是某種擔憂模糊了清晰的判斷。請先別急著行動，給自己一些安靜的空間，重新審視你的策略與初衷。當內在的迷霧散去，你自然會知道何時、以及如何優雅地邁出下一步。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_one_reversed', '整體來看，這項投資的潛力與機會是真實的，前方的道路大部分是順暢的。然而，這張逆位牌溫柔地提醒你，可能有一個隱而未現的細節，或是一絲對風險的過度擔憂，正在形成微小的阻礙。請你深呼吸，以清晰的眼光再次審視計畫的每一個環節，特別是那些讓你隱約感到不安的部分。這不是停滯的信號，而是邀請你以更踏實、更平衡的心態去校準方向。當你調整好步伐，那份順流的能量將會更完整地支持你前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_one_upright', '此刻的投資局勢或許充滿挑戰，市場的波動讓你感到不安。但這張牌提醒你，困境中往往蘊藏著被低估的契機。請保持冷靜的觀察，專注於那些基本面穩健、卻因短期壓力而價格合理的標的。你的謹慎與耐心，正是穿越迷霧、抓住那一線希望的最佳導航。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_mixed', '親愛的，這組牌顯示你的投資局勢正處於一個需要智慧與耐心的平衡點。機遇與挑戰並存，如同光與影的交織。請不要急於全盤肯定或否定，而是細心分辨哪些是穩健的成長，哪些是需要調整步伐的訊號。保持冷靜的頭腦與開放的心，在行動與觀望間找到最適合你的節奏。這正是鍛煉你洞察力與韌性的時刻。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loan_all_upright', '親愛的，這組牌的能量清澈而順暢，顯示這次借貸的緣起與流向都處在和諧的軌道上。這是一個可以積極把握的時機，無論是作為借方或貸方，清晰的意圖與坦誠的溝通都將為這段財務關係奠定穩固的基礎。請信任這份流動的能量，帶著信心與責任感去行動，它將引領事情走向對雙方都有益的圓滿結果。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loan_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻關於借貸的決定，或許需要你暫停腳步，向內觀照。這並非否定你的需求，而是邀請你更深入地審視：這份財務流動背後，是否隱藏著壓力、未明的風險，或是需要先理清的自身狀況？請相信，暫時的停頓是為了更清晰的看見。照顧好內在的擔憂與直覺，當你準備好時，前方的道路自會以更穩健的方式為你展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loan_one_reversed', '整體而言，這筆借貸的流動是順暢的，能量支持著這項財務計畫的成形。然而，逆位的牌卡溫柔地提醒，過程中可能存在一個需要你特別留意的環節，或許是某個未釐清的細節，或是內心深處一絲對「欠負」的不安。請將這個阻礙視為一個調整的契機，仔細檢視合約或坦誠溝通，當你以清晰與平靜的心態面對，金錢的流動便會回歸和諧的軌道。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loan_one_upright', '此刻的借貸局勢或許讓你感到壓力與束縛，但這張牌揭示，困境中仍有一條務實的出路。請將這份壓力轉化為清晰的財務規劃，誠實評估自身償還能力。這不是絕路，而是一個促使你建立更穩健金錢觀的契機。勇敢面對數字，制定具體步驟，那一線希望就藏在你的謹慎與紀律之中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loan_mixed', '親愛的，這筆借貸的決定，猶如天秤的兩端，一邊是現實的需求，一邊是未來的責任。牌陣的複雜能量提醒我們，這不僅是金錢的流動，更是信任與風險的平衡。請務必以清晰的頭腦，審視合約的細節與雙方的期待；同時，以柔軟的心，照顧關係中可能因利益而生的壓力。這是一個需要智慧與誠信並行的時刻，當你周全考量，便能找到那個既務實又不失情義的支點。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_debt_all_upright', '親愛的，這組全正位的牌陣，正為你帶來一股清澈而順暢的能量。關於債務，這是一個明確的訊號：你已具備清晰的思路與行動力去面對它。此刻，規劃與執行將格外有效率，無論是開源節流、協商或按部就班地償還，宇宙都在支持你的每一步。請信任這股順流而下的力量，勇敢地採取具體行動，你正走在徹底解決問題、重獲財務自由的光明道路上。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_debt_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的財務壓力或許讓你感到停滯與無力，但這並非終點，而是一個內在的轉折點。請先暫停向外追逐或焦慮，轉而向內觀照：是什麼信念或模式，讓金錢的流動受阻？債務是表象，核心是邀請你重建與資源的關係。給自己一些靜心的空間，釐清優先次序，你會發現，真正的力量始於接納現狀後的清晰與平靜。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_debt_one_reversed', '親愛的朋友，這趟債務的旅程，整體能量是朝著解決的方向前進的。然而，那張逆位的牌，像一個溫柔的提醒，指出前方有一個特定的心結或習慣需要你留意。它或許是過度的擔憂，或是一個未被正視的財務盲點。請別責怪自己，只需溫柔地調整步伐，看清這個阻礙的本質，你便能更清晰、更有力量地走出這片迷霧，迎向財務上的輕盈與自由。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_debt_one_upright', '親愛的，這張牌誠實地映照出你此刻的壓力與束縛感，債務的現實確實沉重。但請看見牌中那微弱卻堅定的光——這「一線希望」正是你內在的韌性與清晰的覺知。它提醒你，困境並非絕境，而是要求你以更務實、更一步一腳印的態度去面對。此刻，專注於制定一個清晰的償還計畫，並允許自己尋求專業建議或坦誠溝通。這條路需要耐心與紀律，但你每踏出的一小步，都在為自己贏回自由與平靜。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_debt_mixed', '親愛的朋友，這副牌呈現出複雜而真實的圖景。債務的壓力，正像牌中正逆交織的能量，既有需要你積極面對的現實行動，也藏著需要你溫柔調整的內在焦慮。請別被混亂淹沒，這正是宇宙提醒你：真正的平衡，始於接納現狀的勇氣，與規劃未來的務實。你擁有從中梳理出清晰道路的智慧與力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_property_all_upright', '親愛的你，這組牌的能量如春水般流暢，顯示你正走在一個非常順遂的軌道上。關於買房的願景與行動，此刻幾乎沒有阻礙，是將夢想化為現實的絕佳時機。請信任這份順勢而為的能量，勇敢地去看房、議價、簽約，宇宙正在支持你築起一個安穩的家。你的決心與行動力，就是開啟這扇門最關鍵的鑰匙。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_property_all_reversed', '親愛的，當所有牌都呈現逆位時，宇宙正溫柔地提醒你，此刻的買房之路，或許需要先「向內」探尋。這並非否定你的夢想，而是邀請你暫停腳步，檢視內心是否帶著焦慮或壓力在追逐？請先安頓好內在的節奏，釐清真正渴望的「家」是什麼模樣。當內在清晰了，外在的道路自然會為你展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_property_one_reversed', '整體而言，這趟購屋之旅的藍圖已逐漸清晰，過程中的大部分環節都將順利開展。然而，牌面溫柔地提醒，可能有一個特定的環節——或許是對完美條件的執著、對財務的過度擔憂，或是一份尚未釐清的猶豫——正形成微妙的阻力。請別將它視為否定，而是調整步伐的契機。專注於核心需求，接納過程中的微小不完美，你內在的清晰與穩定，將是引領你找到理想家園最重要的指南針。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_property_one_upright', '親愛的，這段買房之路或許比想像中更崎嶇，市場的波動、條件的限制，都讓你感到壓力。但這張牌告訴我們，困境中仍有一道清晰的微光——那是屬於你的「一線希望」。請務必保持耐心與清晰的判斷，仔細評估每一個選項，不要被焦慮推著走。那個最適合你的家，正等待你在穩健的步伐中，將它辨認出來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_property_mixed', '親愛的朋友，這趟購屋之旅猶如行經一片光影交錯的森林，牌陣中正逆交織的能量，正映照出這決策的複雜與真實。它並非單純的「好」或「壞」，而是提醒您，這過程既有值得把握的機遇，也藏有需要您細心權衡的細節。請帶著這份覺察，在理性評估與內心直覺間找到平衡，這份謹慎並非阻礙，而是為了讓您最終安穩地，將鑰匙握在手中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_plan_all_upright', '親愛的，這是一段能量清澈且充滿祝福的時刻。你的財務之路正敞開，所有的牌面都指向順暢與支持。這份順遂並非偶然，而是你過往努力與清晰意圖的顯化。請信任這股流動的能量，勇敢地將你的規劃付諸行動，無論是儲蓄、投資或開源，現在都是播種與建設的絕佳時機。宇宙正在為你的務實與遠見喝采，請懷著信心，穩步前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_plan_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的財務規劃之路，或許需要先暫停、向內探尋。外在的阻滯，往往映照出內在的猶豫或尚未釐清的價值觀。這不是壞事，而是一個珍貴的契機：請先安頓內心對金錢的焦慮或匱乏感，釐清你真正想用財富守護的生活樣貌。當內在清晰了，外在的資源與流動，自然會為你重新開啟一條更穩健的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_plan_one_reversed', '親愛的，你的理財藍圖整體是穩健的，就像一艘準備好啟航的船。然而，這張逆位牌溫柔地提醒，或許有一個關於「安全感」或「過度謹慎」的念頭，正無形中限制了資金的流動性。請別擔心，這不是危機，而是一個微調的契機。試著檢視那個讓你猶豫的環節，以更開放、靈活的心態去規劃，你將發現資源能以更豐盛的方式匯聚。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_plan_one_upright', '親愛的，這張牌揭示了財務之路的挑戰，但請相信，困難中總蘊藏著轉機。它提醒你，此刻的緊縮或壓力，正是促使你重新審視、規劃與建立更穩健財務結構的契機。別被眼前的迷霧嚇退，請以務實的態度，一步一腳印地梳理收支，那條通往安穩與希望的小徑，正等待你清晰的頭腦與堅定的心去開拓。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_plan_mixed', '親愛的，這次的牌陣顯示你的財務之路並非單一色調，而是充滿了機遇與挑戰的交織。這提醒我們，理財的本質正是平衡的藝術——在積極擴張與謹慎守成之間，在把握機會與管理風險之間。請相信，這份複雜性正是你成長的契機。溫柔地檢視每個決策的兩面，像園丁般同時灌溉與修剪，你的財富花園終將在動態平衡中，綻放出穩健而豐盛的花朵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loss_all_upright', '親愛的，這組全正位的牌陣，正以一種清澈而順暢的能量告訴你：此刻的「破財」，並非厄運的警示，而更像是一種能量的流動與轉化。它邀請你以開放的心態，去看見金錢流出的背後，是否正為更重要的價值騰出空間？請信任這個過程，順應這股順暢的能量，它可能是在引導你調整財務的優先次序，或是鼓勵你為值得的目標投資。這不是損失，而是宇宙在協助你進行一場更有意識的選擇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loss_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，當前的財務波動，或許是宇宙在邀請你暫停腳步，向內探尋。這不是單純的損失，而是一個信號，提示某些舊有的消費模式、價值判斷或對資源的恐懼，需要被你看見與調整。請先別急於向外追逐或自責，給自己一段安靜的內省時光。當你釐清內在的匱乏感與真正需求，外在的豐盛流動便會重新為你開啟。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loss_one_reversed', '整體來看，你的財務流動並未陷入困境，但這張逆位牌揭示了一個關鍵的「疏漏點」。它溫柔地提醒你，或許是某個重複的消費習慣、一份輕忽的合約，或是一時衝動的決定，正悄悄讓資源流失。請別自責，這正是宇宙給你調整步伐的訊號。靜下心檢視，你會發現那個特定的阻礙，並能優雅地修正它，讓豐盛更順暢地流向你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loss_one_upright', '親愛的朋友，這張牌確實描繪了財務上的壓力與損失，這份感受是真實且沉重的。然而，牌中那「一線希望」的光芒，正溫柔地提醒你：此刻的困難，是為了讓你重新檢視與金錢的關係，學習更務實的規劃。請將這次的經驗視為一堂珍貴的理財課，它正在引導你建立更穩固的基礎。別失去信心，你內在的智慧與韌性，正是度過難關、迎向財務新平衡的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_loss_mixed', '親愛的，這組牌的能量告訴我，你正處在一個財務的十字路口。破財的經歷或許令人不安，但它也像一個信號，提醒你審視金錢的流向與價值觀。牌中既有需要你果斷止損的警示，也藏著重新規劃、穩健成長的契機。請相信，這不是單純的失去，而是一次調整步伐、讓資源與內心真正對齊的邀請。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_luck_all_upright', '親愛的，這組牌的能量如清泉般全然流暢，預示著橫財的機緣正以一種和諧且順利的姿態向你靠近。這不是偶然，而是你內在豐盛頻率與外在世界的共振。請保持開放與覺察，當靈感閃現或機會敲門時，信任這份順流，勇敢地伸出手去承接。宇宙正以一種輕鬆的方式，支持你顯化這份驚喜的禮物。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_luck_all_reversed', '親愛的，這次的牌陣能量顯示，關於橫財的機緣正處於一個需要「暫停與內省」的階段。這並非意味著幸運之門關閉，而是宇宙在溫柔提醒：過度向外追逐，可能忽略了內在的豐盛源頭。請先安頓內心對財富的焦慮或匱乏感，釐清自己真正的價值。當你回歸平靜，外在的流動才會重新順暢，意想不到的禮物往往在專注於自身成長時悄然到來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_luck_one_reversed', '這張牌顯示，橫財的機緣確實存在於你的能量場中，整體的流向是順暢的。然而，逆位提醒著一個關鍵：或許是內心深處對「不勞而獲」的隱隱不安，或是一份過於急切的心，正在形成一個小小的能量瓶頸。請溫柔地接納這份提醒，它並非否定你的幸運，而是邀請你以更放鬆、更信任的姿態去迎接。當你調整好內在的頻率，那份豐盛便能更無阻礙地流向你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_luck_one_upright', '親愛的，這張牌揭示橫財之路並非坦途，或許你正感到資源緊繃或機會渺茫。然而，牌中閃爍的那一線希望，正是宇宙在提醒你：最豐盛的禮物，往往藏在最意想不到的轉角。請保持警覺與開放，專注於提升自身的價值與準備度，當那扇窄門開啟時，你已蓄勢待發。真正的幸運，總是眷顧那些在逆境中仍不放棄希望的人。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_luck_mixed', '親愛的，這趟橫財之旅並非單純的幸運，而是一場需要智慧與平衡的考驗。牌陣中好壞交織的能量，提醒著你：機遇與風險往往並存。請保持開放的心去迎接可能性，同時也以清醒的頭腦去辨識與規劃。真正的豐盛，在於你能否穩住內心的天平，不因得失而動搖，從中學會駕馭資源的智慧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_business_all_upright', '親愛的，這是一段能量完全順暢的時刻，如同溪水匯入江河，你的生意與財富之路正展現出清晰的流動性。全然的順位牌象徵著天時、地利、人和的匯聚，所有的努力與準備都已就緒。請信任這股順勢而為的能量，大膽地將你的商業構想付諸行動，主動去連結、去擴展。這不僅是收穫的季節，更是播下更大種子的良機，你的每一步前行，都將為豐盛打下更穩固的基石。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_business_all_reversed', '親愛的，當前的牌陣能量顯示，你的生意財運正處於一個需要「暫停與內省」的階段。這並非停滯，而是宇宙溫柔地提醒你：向外衝刺的節奏需要緩一緩。請回頭檢視你的商業模式、財務流向，或是內心是否因壓力而產生了盲點。這是一個珍貴的調整期，是為了讓根基更穩固。相信這段沉澱，是為了匯聚更清晰、更順暢的豐盛能量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_business_one_reversed', '整體而言，你的生意之路正穩健前行，財務的根基也逐漸穩固。然而，這張逆位牌溫柔地提醒，前方有一個特定的「心態阻礙」——或許是對風險的過度擔憂，或是對某個決策的猶豫不決。這並非真正的困境，而是內在的調整訊號。請相信，你已擁有足夠的資源與能力，只需將這份遲疑轉化為更清晰的規劃，便能讓豐盛之流更加順暢地湧向你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_business_one_upright', '親愛的，這張牌描繪的正是你此刻的商業處境：前路或許荊棘密布，資金或客源暫時緊縮，讓你感到壓力。但請看見牌中那束穿透雲層的光——它象徵著一個獨特的轉機，或是一份被你低估的資源。此刻的困難是為了篩選出真正有韌性的計畫。請保持冷靜，專注於那「一線希望」具體是什麼，並以務實的步驟去灌溉它，這份堅持將為你的生意帶來突破性的生機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_business_mixed', '親愛的，這副牌陣呈現出一個充滿動能與挑戰的商業局面。既有成長的契機，也伴隨著需要審慎評估的風險。這並非單純的好壞，而是一個提醒：真正的財富來自於平衡。請在積極拓展的同時，保持清晰的財務紀律與風險意識。相信你的直覺，但也要務實地檢視每一個細節。當你能在「大膽行動」與「穩健守成」之間找到和諧的節奏，豐盛便會自然流動。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_admission_all_upright', '親愛的孩子，這是一段能量清澈而順暢的旅程。所有的牌都溫柔地告訴你，你正走在正確的道路上，你的努力與天賦都將被看見。請帶著這份信心，勇敢地遞出申請、準備考試，你的選擇與行動都會得到宇宙的支持。這不僅僅是升學，更是你生命藍圖中一次美好的展開，請全然信任並擁抱它。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_admission_all_reversed', '這趟升學之路，此刻的能量正邀請你暫緩腳步，向內凝視。逆位的牌陣並非否定你的能力，而是溫柔地提醒：外在的競爭與期許或許讓你感到迷失或疲憊。請先停下來，傾聽內心真正的渴望與熱情所在。這不是停滯，而是為了校準方向、積蓄力量。當你理清內在的迷霧，前行的道路自會變得清晰而堅定。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_admission_one_reversed', '整體而言，你的升學之路正朝著光明的方向前進，基礎與努力都已打下穩固的根基。然而，這張逆位牌溫柔地提醒，前方可能有一個特定的關卡或內在的猶豫需要你正視。它或許是對選擇的迷惘、對壓力的擔憂，或是一份需要微調的準備方向。請別讓這單一的阻礙模糊了你整體的優勢。靜下心來，釐清那個「特定」的癥結點，溫柔地調整步伐，你便能更輕盈、更自信地走向屬於你的學術殿堂。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_admission_one_upright', '這條升學之路或許比你想像的更崎嶇，眼前的挑戰與壓力也真實存在。但這張牌告訴我們，困境之中總藏著一道微光——或許是一個被你忽略的選項、一種不同的準備方式，或是一份內在的韌性。請相信，你的努力不會白費，這條路上仍有希望與轉機。穩住步伐，專注於你能掌握的，曙光就在堅持的前方。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_admission_mixed', '親愛的孩子，這趟升學之路的風景並非單一色調，而是光影交織。牌陣告訴我們，前方既有扎實的收穫，也伴隨著需要你停步審視的課題。這並非好壞對立，而是一場邀請你「平衡」的舞蹈——在積極爭取與耐心沉澱間，在向外追求與向內聆聽間，找到屬於你自己的節奏。請相信，這份複雜性正是為了鍛造你更完整的翅膀，助你飛往最適合你的方向。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_exam_all_upright', '親愛的，這次的牌陣能量流動非常順暢，所有的牌都為你閃耀著正位的光芒。這是一個明確的信號，告訴你目前為考試所做的準備、你的學習狀態，以及內在的專注力，都正走在最和諧的道路上。請對自己充滿信心，你已具備所需的知識與能力。現在，請將這份順暢的能量化為行動，穩健地執行你的複習計畫，並在考場上從容地展現你所學。宇宙正在支持你，這份努力終將開花結果。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_exam_all_reversed', '親愛的，這組牌的能量告訴我，你正處於一個需要「暫停與轉向」的時刻。考試的壓力可能讓你感到思緒混亂或動力受阻，這並非壞事，而是內在的提醒：或許你太急於向外追求結果，而忽略了向內整頓自己的步伐。請先溫柔地接納這份焦慮，它像一個信號，邀請你重新檢視準備方法與內在信心。給自己一點靜心的空間，調整呼吸，你會發現，清晰的思路與沉穩的力量，將從這份內省中重新湧現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_exam_one_reversed', '整體來看，這次考試的準備與進行大致是順利的，你已走在正確的道路上。然而，這張逆位牌溫柔地提醒，可能有一個特定的環節——或許是某個章節的理解、時間的分配，或臨場的心態——需要你稍作停留，給予額外的關注與調整。別擔心，這不是全盤否定，而是一個讓準備更臻完美的契機。請相信，你已擁有足夠的能力，只需將這一點點阻礙轉化為清晰的焦點，便能更從容、自信地展現你的實力。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_exam_one_upright', '這張牌揭示了考試之路的崎嶇與挑戰，它並非否定你的努力，而是如實映照出眼前的難關。請相信，這份困難中仍蘊藏著一線希望與轉機。此刻，與其被壓力淹沒，不如將焦點放在你已掌握的知識與清晰的解題步驟上。穩住呼吸，一步一腳印，那穿透雲層的微光，終將照亮你筆下的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_exam_mixed', '親愛的，這次考試的旅程就像牌陣呈現的，是一幅光影交織的圖景。既有穩固的基石，也有需要留心的波動。這提醒你，在全力以赴的同時，也要溫柔地關照自己的內心與節奏。請相信，那些看似挑戰的部分，正是為了讓你更清晰地看見自己的優勢與需要調整的方向。保持平衡，接納過程中的一切，你的努力與覺察，會引領你走向屬於你的收穫。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_cert_all_upright', '親愛的，這組牌的能量如清泉般流暢，正為你的證照考試之路注入豐沛的助力。一切準備都已就緒，知識的基石穩固，內在的專注力也達到絕佳狀態。請全然信任你至今累積的努力，這股順暢的能量正是宇宙在告訴你：勇敢地走向考場吧，你已具備將所學完美展現的能力。這不僅是一場測驗，更是你專業光芒閃耀的舞台。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_cert_all_reversed', '親愛的，這組牌的能量告訴我們，你為考試付出的努力是真實的，但此刻的能量有些受阻與內斂。這並非失敗的預兆，而是一個溫柔的提醒：或許你正背負著過多的壓力，或是在方法上需要一次深度的內省與調整。請允許自己暫停一下，深呼吸，檢視那些讓你感到焦慮或卡住的環節。這正是重新校準方向、以更清晰平靜的心態迎接挑戰的關鍵時刻。你內在的知識與力量一直都在，只是需要你溫柔地將它們重新整合。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_cert_one_reversed', '整體而言，你為這次證照考試所做的準備，其能量與方向是正確的，成功的可能性很高。然而，牌面提醒你，在「順利」的基調中，存在一個需要你特別留意的「特定阻礙」。這並非巨大的困難，更像是一個提醒：或許是某個章節的理解不夠透徹，或是臨場應試時容易緊張的心態。請溫柔地檢視自己的準備過程，找出那個小小的癥結點，並專注地調整它。當你正視並化解了這個小阻礙，你清晰的思路與穩健的實力，便能毫無滯礙地完全發揮。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_cert_one_upright', '這張牌描繪的，正是你此刻面對證照考試的心境：前方道路崎嶇，壓力如影隨形，但請你看見牌中那盞微光——它象徵著你過去累積的紮實努力，以及內心深處未曾熄滅的決心。困難是真實的，但希望也同樣真實。請將焦點從「有多難」轉移到「下一步能做什麼」，把龐大的目標分解成一個個你能掌握的小任務。你的堅持，正在為那線希望鋪路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_cert_mixed', '親愛的，這次的證照考試之路，能量有些複雜，如同牌陣中正逆交織的訊息。這告訴我們，既有扎實的基礎與清晰的目標，也存在著需要你溫柔覺察的內在波動。請將這份複雜視為一份地圖，它指引你：在全力衝刺的同時，也要關照自己的壓力與節奏。這不僅是一場知識的測驗，更是一次內在的平衡練習。相信你已走在正確的道路上，只需穩住心神，整合所有資源，你內在的智慧足以引領你穿越任何考驗，走向屬於你的認可與成就。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_abroad_all_upright', '親愛的孩子，這趟留學之旅的牌陣閃耀著全然順暢的光芒，彷彿宇宙正為你鋪設一條發光的道路。所有的能量都在支持你、推動你向前。這是一個清晰的訊號：你內心的渴望與外在的機緣已完美對齊。請信任這份順流而下的勇氣，大膽地擁抱遠方的學習與生活。這不僅是知識的追尋，更是一場靈魂的壯遊，你已準備好展翅高飛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_abroad_all_reversed', '親愛的，這趟留學之旅的藍圖，目前似乎籠罩著一層薄霧，能量正溫柔地提醒你：暫停，是為了更清晰的出發。這並非否定你的夢想，而是邀請你向內探尋，那些關於恐懼、準備或動機的細微雜音。請先安頓內心，釐清真正渴望的學習與成長是什麼。當內在的指南針校準了，外界的道路自然會為你顯現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_abroad_one_reversed', '這趟留學之旅的整體能量是支持你的，大部分準備與過程都將順利開展。然而，逆位的牌提醒你，前方有一個特定的阻礙，它可能不是外在的困難，而是內在的某種擔憂或尚未理清的思緒。請溫柔地檢視自己，是否對陌生環境有隱隱的恐懼，或是在某個申請細節上有所遲疑？接納這份提醒，它會成為你行前最寶貴的調整。當你安頓好心，前方的道路自然會為你清晰展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_abroad_one_upright', '這段留學之路或許比你想像的更崎嶇，無論是申請的挑戰、環境的適應，或是內心的徬徨，都讓你感到沉重。但請相信，這張正位牌正是一盞微光——它告訴你，所有的努力與堅持都不會白費。眼前的困難是為了淬煉你的韌性，而那「一線希望」正是你內在的勇氣與清晰的目標。請專注於你能掌控的每一步，即使緩慢，也終將抵達你想望的遠方。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_abroad_mixed', '親愛的，這趟留學之旅的牌陣，正如同遠行的行囊，裝載著期待與挑戰。既有機會的曙光，也有需要留心的暗流。這提醒你，在追逐學術與新生活的同時，也請溫柔地關照自己的內心平衡。擁抱那些成長的喜悅，也接納過程中的顛簸與思鄉。這是一段關於外在探索與內在扎根的雙重旅程，當你學會平衡兩者，異國的天空將為你展開最遼闊的風景。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_thesis_all_upright', '親愛的，這是一段非常順暢的旅程。你的論文寫作正處於一個能量流動、靈感充沛的階段，所有的努力都將順利地轉化為紮實的成果。請信任這股順流而下的力量，大膽地推進你的研究、書寫與論述。此刻，行動就是最好的祝福，你的專注與熱情會像鑰匙一樣，為你開啟學術殿堂的大門。勇敢前行吧，你正走在完全屬於你的道路上。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_thesis_all_reversed', '這組牌的能量正溫柔地提醒你，論文的進程或許暫時放緩，但這並非停滯，而是宇宙在邀請你進行一次必要的內在整理。那些卡住的部分，可能源於過度緊繃的思緒、對完美的執著，或是方向需要微調。請先暫停向外衝刺，轉而向內傾聽。給自己一個安靜的午後，重新梳理邏輯與初心，你會發現，阻礙將化為讓研究更扎實、更貼近你靈魂的養分。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_thesis_one_reversed', '這趟論文之旅的整體能量是順暢的，你已走在正確的道路上。然而，這張逆位牌溫柔地提醒，前方有一個特定的阻礙，它可能來自某個細節的疏忽，或是內心一絲對「不夠完美」的焦慮。請別讓這小小的卡頓動搖你的信心，它只是邀請你稍作調整，重新校準方向。你擁有完成它的所有能力，只需以更溫柔、接納的態度擁抱這個過程。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_thesis_one_upright', '這張牌描繪出論文之路的崎嶇，資料的迷宮、思緒的瓶頸，都讓你感到沉重。但請看見牌中那微弱卻堅定的光——它代表你內在的學術直覺與尚未被發掘的清晰路徑。此刻的困難並非終點，而是深度思考必經的淬煉。請信任這個過程，並在感到最困惑時，回頭檢視最初的研究初心，那裡藏著突破的鑰匙。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_thesis_mixed', '親愛的，這趟論文之旅正處於一個需要智慧與平衡的階段。牌面顯示，你的研究既有穩固的基礎與清晰的洞見，也伴隨著一些內在的焦慮或外在的干擾。這並非壞事，而是提醒你：在專注向前衝刺的同時，也要溫柔地照顧自己的節奏與心緒。請相信，這些複雜的能量正是為了淬煉出更深刻、更完整的成果。接納過程中的高低起伏，你已走在正確的道路上。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_skill_all_upright', '此刻，宇宙的能量正為你的學習之路鋪設一條全然順暢的康莊大道。所有的牌面都閃耀著積極的光芒，這是一個絕佳的時機，請毫不猶豫地投入你的熱情與行動。知識的大門已為你敞開，靈感與領悟力將如泉水般湧現。信任這份流動，勇敢地實踐與探索，你正在走的每一步，都在穩固地構築屬於你的專業殿堂。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_skill_all_reversed', '此刻的停滯並非失敗，而是學習旅程中珍貴的內在調整期。能量逆位提醒你，或許是方法、節奏，或內心對「完美掌握」的執著，暫時遮蔽了流動的靈感。請溫柔地接納這個暫停，它邀請你向內探問：是該轉換途徑、深化基礎，還是單純需要一份對自我的耐心？當你願意與阻力共處而非對抗，真正的領悟與突破，往往就在這份靜謐的覺察中悄然萌芽。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_skill_one_reversed', '這趟學習之旅的整體能量是流動且充滿潛力的，你已走在正確的道路上。逆位的出現，像是一個溫柔的提醒，它並非否定你的能力，而是指出一個需要你稍作停留、細心調整的「心態」或「習慣」。或許是對完美的執著，或是對進度的焦慮，暫時遮蔽了學習本身的樂趣。請接納這個小阻礙，它正是讓你技能更扎實、心態更成熟的關鍵轉折點。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_skill_one_upright', '這趟學習之路或許比預期更崎嶇，知識的迷宮讓你偶感孤單與挫敗。但請相信，這張牌正提醒你：真正的突破往往始於最艱難的練習。那「一線希望」不在遠方，就在你每一次專注呼吸、每一次重複嘗試的當下。別急著征服整座山，先溫柔地肯定自己今日又向前踏出的一小步。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_skill_mixed', '親愛的，這趟學習之旅就像一幅光影交織的畫。有些牌閃耀著天賦與熱情，有些則溫柔提醒著過程中的起伏。這並非阻礙，而是邀請你以更平衡的姿態前行——在專注精進時也允許自己喘息，在追求完美時也擁抱練習中的不完美。信任這個過程，你積累的每一分努力，都會在適當的時機，匯聚成屬於你的獨特光芒。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_compete_all_upright', '親愛的，這組牌的能量如清泉般純粹流暢，毫無阻滯。在這次競賽中，宇宙正為你鋪設一條清晰的道路，所有條件都已悄然就位。請全然信任這份順遂的能量，勇敢地展現你積累的實力與才華。這不是被動等待的時刻，而是主動出擊、盡情閃耀的舞台。你的努力與天賦將在此刻完美共振，帶著信心去享受這個過程吧，勝利正在前方溫柔地等候著你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_compete_all_reversed', '親愛的，這組牌的能量告訴我們，此刻的競賽之路似乎有些顛簸，外界的節奏與你內在的流動尚未同步。這並非失敗的預兆，而是一個清晰的訊號：是時候暫停衝刺，向內探尋了。請溫柔地檢視，那份渴望勝利的動力中，是否夾雜了過多的自我苛責或外在比較？逆位邀請你將焦點從「擊敗他人」暫時轉回「完善自己」。當你調整好呼吸與心態，這份暫時的阻滯，將會化為你最深厚的底蘊與從容。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_compete_one_reversed', '整體來看，你為這場競賽所做的準備與實力，已為你鋪設了一條順遂的道路。然而，這張逆位牌溫柔地提醒，前方可能有一個特定的心結或細節需要你回頭檢視。它或許是過度的求勝心，讓你忽略了過程的樂趣；也可能是一個未被妥善處理的技術環節。請別擔心，這並非否定你的能力，而是邀請你微調步伐，以更從容、完整的姿態，穩健地走向屬於你的舞台。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_compete_one_upright', '這趟競賽之路或許比預期更崎嶇，你正經歷著考驗與壓力，但請相信，這張牌揭示的「困難」正是淬煉你實力的熔爐。別被眼前的挑戰淹沒，那一線希望就藏在你的專注與韌性裡。調整步伐，聚焦於你能掌控的每個細節，困難中往往孕育著突破的契機。保持信念，你遠比自己想像的更有力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('study_compete_mixed', '親愛的，這場競賽的局勢就像一幅光影交織的畫，有明朗的優勢，也有需要留神的暗角。牌陣告訴我們，這不是一條單純的坦途，而是一場需要智慧與平衡的舞蹈。請擁抱你已展現的實力，那是你的光；同時溫柔檢視那些逆位牌的提醒，它們不是障礙，而是幫你調整步伐、避開碎石的地圖。保持專注與靈活，在進取與沉穩間找到你的節奏，你內在的韌性將引領你穿越複雜，走向屬於你的舞台。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_body_all_upright', '親愛的，這是一段身體與能量和諧共振的美好時期。牌面顯示你的健康正處於順暢流動的狀態，身體的自我修復力與活力都相當充沛。請信任這份順流，並積極地將這股能量化為行動，無論是開始一項新的運動、調整更滋養的飲食，或是單純地多走進大自然。你的身體正準備好回應你的照顧，請把握這股順勢而為的力量，它將引領你走向更穩固的安康。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_body_all_reversed', '這組全逆位的牌陣，像一面溫柔的鏡子，映照出身體正以「能量受阻」的方式，輕聲呼喚你的關注。它並非警示危機，而是提醒：是時候暫停向外追逐，轉向內在聆聽了。請將這份「停滯感」視為身體懇切的邀請，去檢視那些被忽略的疲憊、壓抑的情緒，或失衡的生活節奏。當你願意向內調整，為身心創造安靜復原的空間，阻塞的能量便會重新開始流動，回歸自然的平衡與健康。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_body_one_reversed', '親愛的朋友，整體而言，你的身體基礎是穩固的，生命能量也在流動之中。然而，這張逆位牌溫柔地提醒，或許有一個被你忽略的微小訊號，或是一種積累的疲憊感，需要你停下腳步去傾聽與關照。它不是嚴重的警告，而是一份邀請，請你將對外界的關注，稍稍轉回自己身上，用更細膩的覺知去調整生活的節奏。當你正視並接納這個小小的阻礙，它便會成為你恢復平衡、邁向更完整健康的契機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_body_one_upright', '親愛的朋友，這張牌揭示出你的身體正經歷一段需要格外關注的時期，或許有些疲憊或不適正悄悄浮現。請別灰心，這正是身體發出的溫柔提醒。困難中蘊藏著轉機，請相信你內在的復原力。從一個微小的、滋養自己的行動開始，無論是傾聽身體的聲音，或是尋求專業的指引，那線希望之光就會為你照亮前行的路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_body_mixed', '親愛的朋友，這副牌陣呈現出複雜而真實的狀態，如同身體本身，既有活力，也有需要修復之處。牌面提醒你，健康並非單一面向，而是身、心、靈的整體平衡。請溫柔地覺察身體發出的細微訊號，那些小小的不適是善意的提醒，而非警告。在積極調養與適度休息之間找到屬於你的節奏，接納當下的狀態，並帶著信心去滋養它。你的身體是你最忠實的夥伴，傾聽它，便是愛自己的開始。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_mental_all_upright', '親愛的，這組全正位的牌陣，像一道清澈的光，溫柔地照進你的內心世界。它告訴我，你內在的療癒力與自我覺察正處於非常順暢、和諧的狀態。這是一個絕佳的時機，請信任這股內在的流動，勇敢地將你對自我的關懷，化為具體的滋養行動。無論是開始一段諮商、建立新的靜心習慣，或是更坦然地表達感受，宇宙都在支持你。請把握這股順風的能量，主動擁抱更完整、平靜的自己。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_mental_all_reversed', '親愛的，當所有牌都呈現逆位，這並非壞事，而是心靈在對你輕聲呼喚。它告訴我們，內在的能量正經歷一段沉潛與重整的時期。或許你感到思緒紛亂、動力停滯，但請將此視為一個珍貴的暫停鍵。這正是你與自己深度對話的時刻，去溫柔檢視那些被忽略的感受與壓力源頭。不必急於「修復」或「前進」，允許自己靜下來，單純地呼吸與存在。當內在的渾沌被耐心梳理，清晰與力量自會從你心中重新甦醒。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_mental_one_reversed', '親愛的，你的內在旅程整體是穩健且充滿成長的，這張逆位牌並非否定你的努力，而是溫柔地提醒：在通往平靜的路上，有一個被忽略的「心結」需要你回頭關照。它可能是一個重複的負面念頭，或是一份未被接納的情緒。請別急著推開它，試著以接納的態度與之共處。當你願意溫柔地直視這個阻礙，它便會從絆腳石，化為你心靈地圖中最有智慧的路標。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_mental_one_upright', '親愛的朋友，這張牌揭示了你內在的風暴，那些沉重與掙扎都是真實且值得被看見的。請相信，這份困難並非終點，而是心靈深處正在呼喚你溫柔的關注。那「一線希望」正是你內在的韌性與自我覺察的光，它從未熄滅。此刻，請允許自己放慢腳步，像對待珍貴的朋友一樣，接納當下的每一種感受。你不需要立刻解決所有問題，單單是願意正視這一切，便是邁向療癒最勇敢、最重要的一步。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_mental_mixed', '親愛的朋友，這副牌陣呈現出你內在世界的真實樣貌——它並非單一色調，而是光明與陰影交織的複雜圖景。這正是心靈成長的必經之路。請溫柔地接納此刻的混亂與矛盾，它們並非敵人，而是提醒你：真正的平衡不在於消滅任何一種情緒，而在於學習與它們共處。你擁有足夠的智慧去梳理這一切，給自己多一點耐心與空間，療癒便會在接納中悄然發生。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_surgery_all_upright', '親愛的朋友，這組全正位的牌陣，為你的手術之路帶來了一股清澈而順暢的能量。它彷彿在說，這是一個「對的時機」，醫療團隊、你的身體與內在意志，正和諧地朝著康復的目標前進。請信任這個過程，也信任你自己。這份順暢的能量，是宇宙在鼓勵你，帶著信心與平靜，穩穩地走過這一步，迎接新生。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_surgery_all_reversed', '此刻，你正站在一個需要深度暫停與內省的關口。手術不僅是身體的修復，更是心靈的梳理。牌陣的能量提醒我們，外在的進程或許有所延遲，但這正是為了讓內在的準備更為周全。請溫柔地接納這份暫停，它並非阻礙，而是為了匯聚更清晰、更穩定的力量。信任這個過程，你內在的智慧與身體的復原力，將引領你安然度過。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_surgery_one_reversed', '親愛的朋友，這張牌顯示手術的整體過程將會順利，但有一個關鍵的阻礙需要你溫柔地覺察。它或許不是技術上的困難，而是一份隱藏的擔憂或未完全放下的緊繃。請相信醫療團隊，也請你在此刻，將那份對未知的恐懼，轉化為對身體復原力的深深信任。你內在的平靜，將是支持你順利度過的最重要力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_surgery_one_upright', '這張牌描繪的，是手術這條路上必然的艱辛與挑戰，它誠實地告訴你，前方確實需要勇氣與忍耐。但請你看見牌中那束微光——它象徵著醫療技術的精準、你內在的韌性，以及康復的明確路徑。這不是輕鬆的旅程，卻是一條充滿希望的道路。請信任你的醫療團隊，更要信任你身體強大的自癒力，你正走在正確的治療方向上。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_surgery_mixed', '親愛的朋友，這副牌陣呈現出複雜而真實的樣貌，正如手術本身，是身體與心靈的一次深度調整。牌中既有堅實的守護力量，也提醒著潛在的波動。這並非單純的好壞，而是一個需要你保持平衡與覺察的過程。請信任專業的醫療團隊，也請照顧好自己的情緒。在康復之路上，允許自己既有堅強，也有柔軟；既遵循醫囑，也傾聽內在的聲音。你正走在療癒的正確道路上，每一步都算數。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_recovery_all_upright', '親愛的你，這組全正位的牌陣，為你的康復之路鋪開了一條清晰而明亮的道路。所有能量都順暢流動，毫無阻礙，這是一個極其珍貴的訊號——你的身心正處於一個高度和諧、極易接納療癒的狀態。請信任這股順勢而為的力量，主動擁抱那些能滋養你的事物，無論是新的習慣、溫暖的支持，還是內在的平靜。此刻，行動就是最好的藥方，每一步向前的嘗試，都會被宇宙溫柔地承接與放大。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_recovery_all_reversed', '此刻，所有牌卡都溫柔地提醒你，康復的節奏需要放慢。能量看似受阻，實則是宇宙在邀請你向內凝視，聆聽身體與心靈深處最真實的呼求。這不是停滯，而是必要的沉澱。請允許自己暫停，像大地在冬日休養生息。真正的療癒，往往始於接納當下的脆弱，並從中看見內在的韌性。你正走在對的路上，只是需要多一點耐心與溫柔。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_recovery_one_reversed', '親愛的，這張牌顯示你的康復之路整體是向前的，只是有一個細微的阻礙，像是一縷思緒或一個舊習慣，在拉扯你的復原節奏。請溫柔地覺察它，那不是失敗，而是提醒你：真正的痊癒，有時需要你稍微鬆開緊握的拳頭，接納過程中的小小停頓。你已走在正確的路上，只需多給自己一點耐心與寬容。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_recovery_one_upright', '親愛的，這段康復之路或許比你想像的更漫長、更考驗耐心，但請相信，牌中那微弱卻堅定的光，正映照著你內在的韌性。此刻的困難，是身體或心靈正在進行深層修復的證明。請允許自己以最溫柔的步調前進，接納過程中的起伏。那一線希望，就藏在你不放棄的每一個呼吸裡，以及你願意尋求支持與自我疼惜的微小決定中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_recovery_mixed', '親愛的，這段康復之路並非一條筆直的坦途，牌陣中正逆交織的能量，正映照出你此刻複雜的心境與處境。既有值得欣慰的進展，也有需要耐心面對的起伏。這並非壞事，而是提醒你，真正的療癒在於平衡——接納脆弱與慶祝堅強同等重要。請溫柔地協調內在的各種聲音，在需要行動時勇敢，在需要休養時坦然。你正走在對的路上，每一步，無論大小，都在引領你走向更完整的自己。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_pregnancy_all_upright', '親愛的，這組牌的能量如春水般流暢，正溫柔地告訴你：此刻正是迎接新生命的美好時機。宇宙正為你鋪設一條順遂的道路，請信任身體與心靈的節奏，勇敢地擁抱這份生命的禮物。你的內在準備與外在條件已和諧共振，只需懷著喜悅與信心向前邁步，美好的旅程正在展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_pregnancy_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，關於新生命的旅程，此刻需要的是向內傾聽與沉澱。或許外在的期待或內心的焦慮形成了無形的壓力，讓這份渴望暫時受阻。請別將此視為否定，而是宇宙在邀請你：先好好安頓自己的身心，像大地在冬季休養生息。當你準備好，內在的土壤會自然變得豐沃，迎接最恰當的時機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_pregnancy_one_reversed', '這趟孕育之旅的整體能量是豐盛且充滿希望的，但牌中溫柔地提醒，或許有一個內在的擔憂或外在的細節需要你稍作調整。這不是阻礙，而是一個讓你準備得更周全的契機。請信任生命自然的流動，也關照好自己的身心。當你以平靜與接納的心去迎接，那份隱隱的顧慮便會化為更深層的準備與力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_pregnancy_one_upright', '親愛的，這趟孕育生命的旅程，或許正經歷著一些考驗與等待，讓你感到些許疲憊與不確定。這張牌告訴我們，過程雖有挑戰，但希望的種子從未消失。請相信，你內在的韌性與身體的智慧，遠比你想像的強大。試著將焦點從焦慮轉向對自己的溫柔照護，滋養身心，保持信念。那一線曙光，正來自於你持續不放棄的愛與期待。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_pregnancy_mixed', '親愛的，這趟孕育生命的旅程，正像牌陣所揭示的，是一幅光明與陰影交織的動人圖景。既有新生的喜悅與祝福，也可能伴隨著身體的變化和內心的忐忑。請別擔心，這份複雜正是生命本身的真實模樣。邀請你，在期待中保持一份覺察，在擔憂裡看見成長的契機。試著平衡你的喜悅與務實，照顧好身心，這份內在的穩定，將是你與寶寶最溫柔的搖籃。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_birth_all_upright', '親愛的，這組牌的能量如此流暢而飽滿，正溫柔地告訴你：這趟生產之旅，正被宇宙的祝福所環繞。你的身心與即將到來的生命，正處在和諧的共鳴之中。請全然信任這份順遂的能量，信任你的身體與直覺，它們知道如何完美地完成這神聖的創造。這是一段充滿力量與支持的旅程，你只需放鬆、迎接，並擁抱這份即將圓滿的愛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_birth_all_reversed', '親愛的，這趟生產之旅的能量正處於一個內在調整的階段。牌陣的逆位並非否定，而是溫柔地提醒你，身體與心靈可能需要暫停、傾聽與整合。請將這份「受阻」視為一個神聖的間隙，去信任身體的智慧，釋放對「完美過程」的掌控。當你向內安頓好自己，那份孕育生命的原始力量，自會找到最順暢的流動方式。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_birth_one_reversed', '親愛的，這趟生產之旅整體的能量是順暢且受到支持的，但牌面溫柔地提醒，過程中可能有一個小小的、需要你特別留意的環節。這或許是身體上需要多一分耐心，或是心態上需要釋放一絲緊張。請相信，這並非阻礙，而是宇宙在提醒你更細膩地照顧自己。你與寶寶的連結無比堅韌，只要保持覺知與柔軟，一切終將圓滿匯流。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_birth_one_upright', '親愛的，這趟生產之旅或許比預期更為艱辛，過程中的不適與未知可能讓你感到疲憊。但請相信，這張牌正告訴你，在最深的挑戰裡，蘊藏著最純粹的生命力。你內在的韌性與母性的力量，就是那穿越黑暗的一線光明。請專注於呼吸，信任你的身體與醫療團隊，每一個艱難的收縮，都在將你與寶寶推向圓滿的相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_birth_mixed', '親愛的，這趟生產之旅的能量正如生命本身，交織著光明與陰影。牌陣告訴我們，過程中有順遂的祝福，也可能有需要耐心克服的關卡。這並非好壞對立，而是提醒你：真正的力量來自於接納這份複雜性。請信任你的身體與直覺，在積極準備的同時，也允許自己感受並釋放擔憂。你內在的平衡，將是迎接新生命最穩固的搖籃。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_family_all_upright', '親愛的，這是一段能量和諧流動的時刻。家庭關係正處在一個充滿理解與支持的順暢週期，彼此的心意能夠清晰傳達，愛與關懷的流動毫無阻礙。請你帶著信心，主動去深化這份連結，組織一次家庭聚會，或真誠表達你的感謝。此刻的行動，將為家的根基澆灌最溫暖的養分，讓這份美好的能量持續綻放。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_family_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，家庭關係中的某些流動暫時放緩了。這不是壞事，而是宇宙在邀請你暫停腳步，向內觀照。或許是未說出口的感受、或慣性的相處模式需要被重新審視。請給自己和家人一些靜默的空間，在內省中，你將找到讓愛重新順暢流動的鑰匙。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_family_one_reversed', '整體而言，家庭的連結與溫暖依然穩固地支持著你，這份關係的根基是充滿祝福的。然而，逆位的能量溫柔地提醒，或許有一個未被說出口的期待，或是一個重複出現的小摩擦，正悄悄消耗著彼此的心力。請試著以更柔軟的視角看待這個卡住的點，它並非障礙，而是一個讓愛更深入、讓理解更完整的契機。當你願意調整自己內在的頻率，外在的和諧便會自然流動開來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_family_one_upright', '親愛的，這張牌描繪出家庭關係中此刻的張力與挑戰，它誠實地映照出那些難以言說的隔閡或舊傷。請別灰心，這份困難正是為了讓你看清，是什麼在阻礙著愛的自由流動。牌中同時蘊含著一線希望——它可能是一個等待被說出口的道歉、一次願意傾聽的嘗試，或僅僅是你看待家人視角的微小轉變。請相信，只要有一方願意先伸出和解的觸角，僵局便會開始鬆動。家的本質是韌性，而非完美。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_family_mixed', '親愛的，這副牌描繪出家庭關係中真實而複雜的圖景，如同光與影的交織。有些連結溫暖而堅實，有些則需要耐心梳理。這並非好壞之分，而是提醒我們，家是練習平衡的場域——在付出與界限、期待與接納之間，找到讓彼此都能自在呼吸的節奏。請帶著溫柔的洞察力前行，你內在的智慧足以照亮前路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_friend_all_upright', '親愛的朋友，這是一段充滿和諧與順暢能量的友誼旅程。所有的牌都為正位，意味著你們之間的連結真誠而流動，彼此的支持與理解都處在一個非常良好的狀態。這是一個絕佳的時機，去深化這份情誼，主動分享你的感受，或共同規劃一次美好的相聚。請信任這份純粹的連結，並帶著感恩的心，去創造更多屬於你們的溫暖回憶。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_friend_all_reversed', '親愛的朋友，這組牌的能量正溫柔地提醒你，在友誼的流動中，或許有些話語、期待或互動模式，暫時未能順暢地傳遞與接收。這並非關係的終點，而是一段珍貴的內省時光。請允許自己與朋友都稍作停頓，向內探問：是哪些未被言明的情緒或界線，形成了這片寧靜的薄霧？當你願意先釐清自己的感受，那份清澈的理解，終將為你們的連結帶來更深的滋養與新的流向。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_friend_one_reversed', '這段友誼的根基其實相當穩固，你們共享的快樂與默契是真實的。那張逆位牌，像是一面溫柔的鏡子，提醒你留意關係中某個未被言明、或已悄悄失衡的角落。它或許是一個未解的心結、一種單方面的付出，或是一段需要設立的小小界線。請相信，正因為整體能量是順暢的，這個小小的阻礙才特別值得你溫柔檢視與調整。當你以更清晰的愛與尊重去面對它，這段連結將變得更為通透與堅韌。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_friend_one_upright', '這段友誼的旅程，或許正經歷著考驗與距離，讓你感到些許孤單或困惑。這張牌提醒你，真摯的連結從不畏懼暫時的風雨。請相信，困難之中仍有一線明亮的希望，它可能藏在一次真誠的對話，或是一個願意先踏出的步伐裡。給彼此一點時間與空間，但別放棄溝通的心。溫暖的曙光，往往在堅持理解後悄然來臨。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_friend_mixed', '親愛的朋友，這趟友誼之旅的風景並非單一色調，而是光影交織。牌陣告訴我們，這段關係中既有溫暖的連結，也存在需要磨合的稜角。這並非壞事，而是提醒我們，最真實的情誼往往在平衡中成長。請溫柔地接納其中的複雜性，像照顧一株植物，既欣賞盛開的花朵，也耐心修剪多餘的枝椏。信任你們之間積累的美好，並以開放的心溝通那些小小的不諧和音，這將使你們的連結更加深刻而堅韌。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_colleague_all_upright', '親愛的，這組牌的能量如溪流般清澈順暢，顯示你與同事間的關係正處在和諧且充滿支持的階段。這是一個絕佳的時機，可以主動深化合作、分享想法，或是在團隊中擔任更積極的角色。請相信你此刻的善意與行動，都能在職場中開出美好的花朵，讓這份順流的能量，成為你專業成長的溫暖助力。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_colleague_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻職場上的互動，或許正映照出你內在需要沉澱與梳理的部分。關係中的卡頓或誤解，並非全是外在的課題，有時是內心疲憊或界線模糊的訊號。請給自己一點暫停的空間，向內探問：是什麼讓你在合作中感到耗竭？你需要為自己守護什麼？當你安頓好自己，外在的流動也將隨之輕盈起來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_colleague_one_reversed', '整體而言，你與同事間的相處是流暢且和諧的，工作上的默契與支持是穩固的基礎。然而，這張逆位牌溫柔地提醒，或許有一個未被言明的小心結，或是一個重複出現的溝通小盲點，正在無形中消耗你的能量。請別將它視為阻礙，而是一個珍貴的調整契機。試著以更柔軟的視角觀察，並在適當的時機，用真誠的對話為這段關係注入新的理解，你們的合作將會更加圓融。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_colleague_one_upright', '這段關係的張力，或許正提醒著你職場中的人際邊界。困難是真實的，但牌中那隱微的光，暗示轉機往往藏在真誠的溝通裡。請先穩住自己的核心，不捲入情緒漩渦，而是以清晰、溫和的態度表達立場。當你像錨一樣穩定，周圍的波瀾自會逐漸平息，甚至可能化為彼此理解的契機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_colleague_mixed', '親愛的，這份牌陣描繪出同事關係中既合作又競爭的複雜圖景。既有溫暖的支持，也存在需要磨合的稜角。這提醒我們，職場如同一個生態系統，無需追求絕對的和諧，而是學習在差異中保持平衡。請帶著覺知，珍視那些真誠的連結，同時以柔軟的界線保護自己的能量。你內在的智慧，足以讓你在這片人際的田野中，優雅前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_client_all_upright', '親愛的，這是一段充滿流動與和諧的時期。牌面顯示，你與客戶之間的信任與合作能量正處於順暢的巔峰，所有的溝通、提案與共識都將如溪流般自然匯聚。請務必把握這股順風，主動深化連結，將共識化為具體的行動與承諾。此刻，你的真誠與專業就是最強大的磁石，能吸引來穩固且互惠的長期夥伴關係。放心地去拓展、去創造吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_client_all_reversed', '這組牌的能量提醒我們，關係的流動偶爾會遇到瓶頸。此刻的客戶互動，或許正需要你暫停向外追逐，轉而向內聆聽。那些溝通上的延遲或阻滯，並非全然的否定，更像是一面鏡子，映照出關係中需要調整的節奏或未被言明的期待。請溫柔地接納這個「暫停」，它給予你空間去釐清自己的服務核心與界限。當內在的意圖清晰了，外在的連結自會找到新的流動方式。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_client_one_reversed', '整體而言，您與客戶間的連結是穩固且流動的，基礎相當良好。然而，這張逆位牌溫柔地提醒，或許有一個未被察覺的「溝通落差」或「期望未明」的小石頭，正悄悄卡在關係的齒輪中。請別擔心，這並非根本性的問題，而是邀請您以更細膩的傾聽，去校準雙方的頻率。當您主動照亮這個小角落，流動便會重新順暢起來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_client_one_upright', '這段關係目前正經歷一段考驗期，溝通可能有些阻滯，或信任需要重新建立。這張正位牌告訴我們，困難是真實的，但希望的火種並未熄滅。請試著以更柔軟、更真誠的姿態去理解對方的立場與需求，一個微小的、善意的行動，往往就是破冰的開始。你內在的韌性，正是穿越這段迷霧最好的指引。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_client_mixed', '親愛的，這段客戶關係正處於一個需要細心平衡的階段。牌面顯示既有合作的契機，也存在需要磨合的細節。這提醒我們，在積極推進的同時，也要保持一份柔軟的覺察，去傾聽彼此未言明的需求。請相信，這份複雜性正是關係深化與成長的土壤，帶著耐心與真誠去經營，你將找到最和諧的共舞節奏。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_neighbor_all_upright', '親愛的，這組牌的能量如春日暖陽般和煦順暢。鄰里之間正流淌著一份難得的善意與和諧，這份連結本身就是一份禮物。請信任這份順流，主動釋出你的溫暖與開放，一個簡單的微笑或問候，都可能讓這份美好的鄰里情誼，開出更豐盛的花朵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_neighbor_all_reversed', '親愛的朋友，這組牌的能量顯示，在鄰里關係中，一些無形的隔閡或未說出口的感受，正讓彼此的能量流動暫時停滯。這並非壞事，而是一個溫柔的提醒：或許我們需要先向內看，暫停向外索求或擔憂。檢視自己是否因過往經驗而預設立場，或對小事過於掛心。給彼此一點空間與時間，當你的內心恢復平靜，外在的互動自然會找到新的、更舒適的節奏。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_neighbor_one_reversed', '親愛的，這張牌顯示你們的鄰里關係整體是友善且流動的，就像社區裡和煦的陽光。然而，那個小小的阻礙，或許是某次未說開的誤會，或是一點習慣上的不同，正需要你溫柔地看見。它不是高牆，而是一扇虛掩的門。試著以開放的心，先釋出善意，一個微笑或一句問候，往往就能讓能量的結自然鬆開。你內在的平和，會是化解任何微小隔閡的最好橋樑。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_neighbor_one_upright', '親愛的，這張牌描繪了鄰里關係中那堵無形的牆，它確實存在，也帶來隔閡與不便。然而，牌中透出的微光告訴我們，這並非絕境。困難往往源於缺乏理解與溝通。請試著放下防備，從一個微小的善意開始——或許是一句問候，或一次主動的分享。這份善意，正是破冰的關鍵，能為緊繃的關係帶來意想不到的轉機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_neighbor_mixed', '親愛的，牌陣顯示鄰里間的互動就像交織的光與影，有溫暖的時刻，也可能存在需要磨合的稜角。這份複雜提醒我們，關係的平衡是一門溫柔的藝術。請帶著善意與清晰的界線去互動，欣賞那些美好的交集，也接納彼此的不同。當你以平靜的心去理解與溝通，這份日常的緣分便能轉化為安穩而舒適的鄰里之情。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_elder_all_upright', '親愛的，這組牌的能量是如此流暢而溫暖。它告訴你，與長輩之間那份珍貴的連結，正處於一個充滿理解與和諧的階段。這份順暢是你們彼此敞開心扉的禮物。請信任這份流動，主動分享你的生活與想法，把握當下輕鬆相處的時光，讓這份美好的連結在自然的互動中，持續滋養你們雙方的心靈。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_elder_all_reversed', '親愛的，這組牌的能量告訴我們，此刻與長輩的關係正處於一個需要「暫停與內省」的階段。那些溝通上的阻滯或感受上的距離，並非關係的終點，而是一個溫柔的提醒：或許我們都需要先向內看，照顧好自己內在那個渴望被理解的小孩。請給彼此一些空間，也給自己的心一些溫柔。當內在的紛擾沉澱下來，你將能以更清澈、平靜的視角，重新看見連結的可能。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_elder_one_reversed', '這段關係的根基其實是穩固的，你們之間有著深厚的連結與善意。逆位的出現，像是一個溫柔的提醒，或許是某個未被言明的期待，或是一次溝通中的小小誤解，形成了當前的阻礙。請別將它視為鴻溝，它更像一扇需要被輕輕推開的門。試著以更柔軟的視角去理解長輩行為背後的關懷，你的接納與微調，將能讓這份珍貴的緣分流動得更加順暢。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_elder_one_upright', '親愛的，這段關係的張力或許讓你感到疲憊，但這張牌正溫柔地提醒你：所有堅硬的冰層下，都流動著渴望被理解的暖意。困難是真實的，但那一線希望就藏在「不強求立刻改變對方」的接納裡。試著以晚輩的柔軟，去承接長輩那份或許用責備包裹的關心，你們之間那座看似對立的高牆，便可能從你這一側，悄然打開一扇溝通的窗。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_elder_mixed', '親愛的，這段關係的牌陣能量交織著溫暖與挑戰，如同生命本身。既有需要珍惜的連結，也有需要耐心梳理的結。這提醒我們，與長輩的相處，往往是一場關於愛與界線的溫柔練習。請帶著理解的心去看待彼此的差異，在關懷與自我之間找到平衡。你的接納與穩定，將是化解複雜、滋養這段關係最重要的力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_rival_all_upright', '親愛的，這組牌的能量如此順暢明亮，正清晰地告訴你：此刻，你正處於一個充滿力量與優勢的時刻。競爭並非威脅，而是激發你潛能的絕佳舞台。你的思路清晰，行動力充沛，請毫不猶豫地展現你的實力與光芒。這股順流的能量是你的最佳盟友，信任它，勇敢地向前邁進，勝利的天秤正穩穩地向你傾斜。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_rival_all_reversed', '當前的競爭局面，能量似乎有些凝滯與內捲。這並非失敗的預兆，而是宇宙在提醒你：向外衝刺的腳步需要暫緩，此刻的功課是向內探尋。請先放下對「輸贏」的執著，回頭檢視自己的初心與策略。真正的對手，有時是內心的焦慮或舊有模式。靜下來，整頓自己，你將發現這份「受阻」是為了醞釀更清晰、更有力的方向。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_rival_one_reversed', '整體而言，你在這場競爭中擁有優勢，局勢正朝對你有利的方向發展。然而，這張逆位牌溫柔地提醒，阻礙可能來自你內在的某個念頭——或許是過度在意對手的動向，或是對自身實力的些許懷疑。請將目光從「比較」收回，專注於穩固自己的核心與節奏。當你安頓好內在，那份外在的順遂便會自然顯化，引領你穩健前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_rival_one_upright', '眼前的競爭確實充滿挑戰，對手或許強勢，局勢也顯得緊繃。但這張正位牌告訴我們，困難中往往蘊藏著轉機。請你穩住陣腳，專注於自身的優勢與節奏。那一線希望，正來自於你內在的韌性與清晰的策略。這不是退縮的時刻，而是需要你更沉著、更智慧地去行動，將壓力轉化為前進的動力。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('relation_rival_mixed', '親愛的，這場競爭的棋局並非單純的勝負，牌面顯示它更像是一場深刻的共舞。既有激勵你前進的推力，也有提醒你審視的鏡子。請別將對手僅僅視為障礙，他們也可能是映照出你盲點的契機。在行動與反思間取得平衡，專注於完善自己的步伐，而非僅僅擊敗對方。這場競逐最終是為了讓你更認識自己的韌性與智慧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_all_upright', '親愛的，這組全正位的牌陣，為你帶來了一股清晰而順暢的能量。它告訴你，尋找的線索與方向其實已經存在，宇宙正為你鋪平道路。請相信你的直覺，並積極地採取行動去詢問、去回想、去那些你內心浮現的地點看看。這份順遂的能量是對你行動的鼓勵，保持信心，你與你所尋求的人事物，正處在一個容易重新連結的頻率之中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_all_reversed', '親愛的，這組牌的能量告訴我們，尋找的過程似乎暫時遇到了停滯。這並非意味著失去希望，而是一個溫柔的提醒：或許我們需要先暫緩外部的焦急搜尋，轉而向內沉澱。請靜下心來，回憶那些被忽略的細節或內心的直覺，答案可能就藏在某段記憶或某個被你匆匆掠過的角落。當你安頓好內心的紛擾，前方的迷霧自會漸漸清晰。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_one_reversed', '整體而言，尋找的過程是順利的，線索與指引會自然地浮現。然而，這張逆位牌溫柔地提醒，阻礙可能來自一個被忽略的細節，或是一絲急躁的心緒。請試著放慢腳步，回溯記憶中那些看似無關的片段，或轉換一下尋找的方向。當你內心平靜下來，那遺失的人事物，與你重逢的路徑會變得更加清晰。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_one_upright', '這趟尋找的旅程或許比預期更為曲折，讓你感到些許疲憊與迷茫。牌面揭示的困難是真實的，但請相信，那一線希望如同黑夜中的微光，始終存在。它可能指引你轉換搜尋的方向，或提醒你留意曾被忽略的細節。請保持耐心與信念，有時我們尋找的，會在內心最平靜的時刻悄然浮現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_mixed', '這次的尋覓之旅，牌面呈現出複雜的圖景，如同光與影的交織。這意味著線索與阻礙可能同時存在，好消息與延遲或許會交錯而來。請不要灰心，這正是宇宙提醒你，需要以更平衡、更開放的心態去探尋。一方面保持積極的行動與直覺，另一方面也接納過程中的不確定性。你所尋找的，正引導你學習耐心與信任的課題。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_all_upright', '這趟旅程正以最順暢的姿態向你展開，所有的牌面都閃耀著支持與祝福的光芒。這是一個絕佳的時機，請信任內心的召喚，勇敢地踏出步伐。旅途中的每一處風景、每一次相遇，都將是滋養你靈魂的禮物。敞開心胸去擁抱未知，讓這股流動的能量帶你前往更遼闊的天地。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_all_reversed', '親愛的，這趟旅程的能量正處於一個需要暫停與內省的階段。逆位牌並非否定你的渴望，而是溫柔地提醒：或許外在的行程需要調整，或許內在的準備尚未就緒。請先向內探問，是什麼在阻礙你輕盈出發？是未釐清的擔憂，還是過於急促的腳步？給自己一點靜心的時間，當內在的迷霧散去，道路自然會清晰展現。這不是停止，而是為了更順暢、更覺知地前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_one_reversed', '這趟旅程的整體能量是流動且充滿可能性的，前方的道路大部分是順暢的。然而，逆位的牌卡溫柔地提醒，或許有一個小小的環節需要你多一份留意——可能是行程中一個未確定的細節，或是內心一絲對未知的遲疑。請別讓這一點點阻礙放大成焦慮，它更像是一個貼心的預告，邀請你在出發前，用平靜的心再做一次確認與調整。當你準備好，旅途的風景將會以美好的姿態迎接你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_one_upright', '這趟旅程或許會遇到一些挑戰，路途可能不如預期順暢，但請相信，牌中閃現的那一線希望，正是為你照亮前路的微光。這份困難不是為了阻擋你，而是為了讓你更珍惜即將抵達的風景。放慢腳步，保持靈活與耐心，你內在的韌性將引領你穿越迷霧，看見更開闊的天地。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_mixed', '親愛的旅人，這次的旅程猶如一幅光影交織的畫卷，既有明朗的風景，也潛藏著需要留意的轉折。牌面提醒你，這趟出行並非全然順遂，卻也絕非阻礙重重；它更像一場需要你保持覺察與彈性的冒險。請在規劃與隨性之間找到平衡，擁抱計畫外的美好，也溫柔地關照那些提醒你放慢腳步的訊號。帶著開放的心啟程吧，旅途的意義，往往藏在這些看似矛盾的風景之中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_all_upright', '親愛的朋友，這組全正位的牌陣，為你的法律事務帶來了一股清澈而順暢的能量。這是一個積極的信號，意味著相關的流程、溝通與證據鏈都將清晰明朗地展開。請你帶著信心，積極地與你的法律夥伴合作，有條不紊地推進每一步。正義的天秤正在向你傾斜，此刻的行動與準備，都將為你奠定堅實的基礎。信任這個過程，也信任為此努力的自己。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_all_reversed', '這趟法律旅程的能量正處於一個需要暫停與內省的階段。逆位的牌陣並非宣告失敗，而是溫柔地提醒你，外在的進程或許受阻，但內在的清晰與策略調整正是此刻的關鍵。請給自己一些空間，重新審視所有文件、策略與內心的真實立場。當你穩住心緒，釐清盲點，這份暫時的停滯將轉化為更堅實、更有利的準備。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_one_reversed', '整體來看，這次的法律進程正朝著對你有利的方向發展，能量是順暢的。然而，這張逆位牌溫柔地提醒，過程中可能存在一個「非實質性」的阻礙，它或許源於內心的焦慮、對細節的輕忽，或是溝通上的微小誤解。請相信，這並非無法跨越的關卡。調整一下步伐，更細心地檢視文件與言詞，並安撫自己內在的不安，你清晰而穩定的心念，將是引領事情圓滿落幕的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_one_upright', '親愛的，這張牌描繪的正是你此刻面對的局勢——法律程序如同荊棘之路，充滿挑戰與壓力。然而，請看見牌面中那束穿透雲層的光，它象徵著正義的基石與規則的保護。這條路雖艱難，但並非絕境。請務必信任專業的協助，並以耐心與清晰的邏輯，一步一腳印地守護你的權益。希望，就藏在對程序與事實的堅持之中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_mixed', '這趟法律旅程，如同牌陣中正逆交織的能量，既有堅實的立足點，也潛藏著需要審慎以對的變數。請相信，這份複雜性並非壞事，它正提醒你：在堅持原則的同時，也需要保持策略的彈性。將你的理性與直覺結合，像一位智慧的調停者，在攻守之間找到最平衡的支點。每一步深思熟慮的調整，都是在為你的正義之路鋪墊更穩固的基石。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_all_upright', '親愛的，這是一段充滿祝福與順流的旅程。牌面清澈的能量告訴你，此刻的遷移決定，正與你靈魂深處的渴望完美共振。前方的道路已為你敞開，每一步都將踏在豐盛的節奏上。請信任這份流動，勇敢地展開行動，你的新家園不僅是物理空間的轉換，更將成為滋養你生命新篇章的沃土。跟隨這股順風，擁抱改變吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，關於搬遷的計畫，此刻或許需要暫緩腳步，向內聆聽。外在的阻滯，往往映照著內心的猶疑或未準備好的部分。這不是壞事，而是宇宙在邀請你，先安頓好內在的「家」。請給自己一些時間沉澱，釐清真正渴望的生活樣貌。當內在清晰了，外在的道路自然會為你展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_one_reversed', '這次的遷移之旅，整體能量是支持你向前邁進的。然而，這張逆位牌溫柔地提醒，過程中可能有一個內在的顧慮或外在的小阻礙需要你留意。它並非否定你的決定，而是邀請你稍作停頓，檢視那個讓你感到遲疑的環節。或許是對未知的些許不安，或許是某個尚未妥善安排的細節。請相信，當你正視並調整它，前方的道路將更加清晰順暢。你擁有讓這次搬遷圓滿發生的力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_one_upright', '親愛的，搬遷之路或許比預想中更崎嶇，過程中的挑戰與不確定性讓你感到疲憊。這張牌提醒你，困難是真實的，但希望也同樣真實。請相信，每一次的整理與告別，都在為新的生活鋪路。專注於你能掌控的下一步，那份微光會引領你穿越迷霧，抵達更適合你的地方。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_mixed', '親愛的，這次搬遷的旅程猶如牌陣中正逆交織的能量，並非單純的好與壞，而是一幅需要你細心平衡的風景。前方既有嶄新的機會在閃爍，也潛藏著需要你審慎評估的細節。請別將任何挑戰視為阻礙，它們更像是地圖上的提醒標誌。信任這個過程，在行動與觀察間取得優雅的平衡，你內在的智慧會引領你，將這次遷移化為一次深刻的成長與扎根。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_all_upright', '此刻，宇宙的能量正為你順暢流動，時機已然成熟。這是一段行動力與機緣完美契合的時期，請信任這份順遂的流動。你所思所想的計劃，現在正是付諸實踐的最佳時刻。勇敢地邁出步伐，主動把握眼前浮現的機會，你的行動將會得到豐盛的回應。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的「停滯」並非壞事。宇宙的時機彷彿被按下了暫停鍵，邀請你向內探尋。那些看似受阻的計劃，其實是為了讓你更清晰地看見內在需要調整的信念與節奏。請別急著向外衝撞，先好好安頓自己的心。當你準備好了，屬於你的最佳時機，自然會以更成熟的樣貌到來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_one_reversed', '整體的運勢流動是順暢的，時機也正為你鋪開道路。然而，這張逆位牌像一個溫柔的提醒，指出前方有一個特定的、需要你稍作停留的轉折點。它並非阻擋，而是邀請你檢視某個內在的信念或外在的節奏。請相信，當你願意正視並微調這個部分，前方的順遂將會更加圓滿，你也能更從容地把握住屬於你的時機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_one_upright', '此刻的運勢，如同穿越一條漫長的隧道，前方或許還看不見出口的光，但請相信，你腳下的每一步都堅實地通往希望。困難的局勢並非終點，而是淬煉你內在力量的熔爐。請保持耐心與覺察，那一線希望往往藏在最微小的轉機裡。當你準備好，時機便會以最適合你的方式悄然顯現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_mixed', '親愛的朋友，這是一段需要你保持覺察與平衡的時期。整體運勢並非單一的好或壞，而是像交織的光影，機會與挑戰並存。請相信，每一個「逆位」的提醒，都是為了讓你更穩健地走向「正位」的禮物。無需急於求成，也無需過度擔憂，關鍵在於看清局勢，調整步伐，在行動與等待之間找到最和諧的節奏。時機正在醞釀，你的智慧將是引領一切的最好嚮導。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_all_upright', '親愛的朋友，這是一幅充滿祝福的畫面。所有牌卡都以正位展現，意味著你前方的道路能量順暢，機會之門正為你敞開。這不是偶然，而是你內在準備與外在機緣的完美共振。請帶著信心大步向前，你的行動將與宇宙的流動同步，將美好的願景化為現實。勇敢地去創造、去擁抱吧！')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_all_reversed', '親愛的，這組牌的能量正在溫柔地提醒你，關於未來的道路，此刻或許需要先慢下腳步。外在的進展看似停滯，實則是內在的邀請，邀請你向內觀照，釐清那些消耗你熱情的隱形阻礙。這不是停滯，而是為了更清晰的遠見所做的必要沉澱。請相信，當你願意正視並調整內在的節奏，生命自會為你重新校準方向，蓄積的能量將引領你走向更適合的未來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_one_reversed', '親愛的朋友，這張牌為你的未來描繪了一幅充滿希望的藍圖，整體的旅程將是順遂且富有成長性的。然而，牌中溫柔地提醒，有一個特定的、內在的阻礙——或許是一份猶豫，或一個尚未放下的舊模式——正悄悄消耗你的能量。請別擔憂，這並非否定你的道路，而是邀請你稍作停留，溫柔檢視並調整這個小環節。當你以更清晰的內在狀態前行，前方的風景將為你全然展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_one_upright', '親愛的，這張牌描繪的未來之路或許有些崎嶇，前方可能會有需要你鼓起勇氣去面對的挑戰。但請你看見牌中那束微光——它象徵著困境中蘊藏的生機與轉機。這並非一條輕鬆的道路，卻是一條能讓你內在力量得以淬煉與展現的途徑。保持信念，專注於你能夠掌控的每一步，那一線希望將引領你穿越迷霧，走向更堅實的成長。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_mixed', '親愛的朋友，這趟關於未來的旅程，正逆交織的牌陣猶如一幅光影並存的風景畫。它告訴我們，前方並非坦途，但也絕非荊棘滿布。你會同時遇見成長的契機與需要學習的課題。請別將逆位視為阻礙，而是溫柔的提醒——它邀請你在積極前行的同時，也保持內心的彈性與覺察。在行動與反思之間、在把握機會與調整步伐之間，找到屬於你的平衡點。這份複雜性，正是你靈魂成長的沃土。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_all_upright', '親愛的，這是一段能量完全順暢的時刻。你的思緒清晰，內外環境都為你的決策鋪好了道路。牌陣告訴我們，這正是採取行動、信任直覺的絕佳時機。無需過度猶豫或等待，你的每一個選擇都將如順流而下的船隻，自然地引領你前往應許之地。請帶著信心向前，宇宙正溫柔地支持著你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_all_reversed', '親愛的，當前的能量正溫柔地提醒你，此刻並非急於決斷的時刻。逆位的牌陣猶如一面澄澈的鏡子，映照出內在的猶豫與外在的阻滯。請先暫停向外尋求答案，轉而向內聆聽：是什麼讓你感到不安或束縛？這份停頓不是失敗，而是為了讓你看清真正重要的核心。給自己一些靜心的空間，當內在的迷霧散去，屬於你的道路自然會清晰浮現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_one_reversed', '整體來看，這項決策的發展路徑是清晰且充滿支持力的，你已具備了前進所需的大部分條件。然而，牌中微妙的阻礙提醒你，或許有一個內在的顧慮（如過度擔憂、完美主義）或一個未被正視的外部細節，正需要你溫柔地檢視。請相信，這並非否定你的方向，而是宇宙輕聲的提示：稍作調整，理清那唯一的糾結，你的道路便會更加順暢明亮。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_one_upright', '此刻的決策之路或許有些崎嶇，眼前的選項似乎都伴隨著挑戰。但請相信，這張正位牌正溫柔地提醒你：困境中始終存在著一道微光，那是屬於你的希望與轉機。無需急於強求突破，而是靜下心來，辨認那道光的方向——它往往隱藏在最真誠的直覺，或是最被忽略的細節裡。你擁有穿越迷霧的內在力量，只需一步一腳印，朝著光前進。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_mixed', '親愛的，這次的牌陣告訴我，你正面臨一個需要審慎權衡的十字路口。局勢中既有明朗的機遇，也藏著需要留意的細節，這正是生活給予我們智慧與彈性的考驗。請別急著二分好壞，而是像調和一杯溫潤的茶，接納所有訊息。你的內在智慧足以引導你，在行動與觀察之間找到最適合你的平衡點，每一步都會是穩健的成長。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_all_upright', '親愛的，這組牌的能量如清泉般全然流暢，毫無滯礙。此刻的你正處於一個極佳的狀態，所有的準備與努力都已就位。請帶著這份順暢的能量，自信地投入這場競技吧。這不是需要猶豫的時刻，而是行動與展現的舞台。你的實力與機緣正完美共振，勇敢地向前邁進，勝利的光芒已在前方為你引路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_all_reversed', '親愛的，當前的牌陣能量顯示，這場競爭的節奏似乎需要你暫時放慢腳步。這並非否定你的實力，而是提醒你，外在的衝刺可能遇到了內在的調整期。請先向內觀照，檢視自己的動機是否純粹，策略是否需要微調。這份「暫停」是為了積蓄更清晰、更和諧的力量。當你與內在的節奏重新校準，前方的道路自會為你展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_one_reversed', '整體來看，你在這場競爭中的準備與實力是足夠的，前方的道路大部分是順暢的。然而，這張逆位牌溫柔地提醒，可能有一個特定的心結或習慣——例如過度在意對手、或對結果的焦慮——正在無形中消耗你的專注力。請相信，這個阻礙不是為了擊倒你，而是為了讓你調整步伐，將目光從外在的比較收回，穩固內在的自信。你已走在對的路上，只需輕輕轉個念，力量就會回到你手中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_one_upright', '眼前的競爭局勢或許比預期更艱難，讓你感到壓力重重。這張牌提醒你，真正的對手有時並非他人，而是內心的自我懷疑。請相信，那份「希望」就藏在你的專注與韌性裡。調整呼吸，將目光從勝負移回過程本身，你已擁有的實力與經驗，正是突破困境的鑰匙。穩住步伐，這條賽道終會引領你到達屬於你的位置。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_mixed', '親愛的，這次的競爭局勢就像一場需要平衡的舞蹈，既有優勢也有挑戰。牌面提醒你，勝利不僅僅是擊敗對手，更是與自己的合作。請溫柔地接納過程中的起伏，將壓力轉化為專注，把焦慮調整為策略。你的實力是真實的，而此刻的複雜性能量，正是要教你以更靈活、更完整的心態去展現它。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_all_upright', '此刻，你與環境的能量正處於和諧共振的狀態，這是一個極佳的時機。無論是調整居家風水，或是與無形界建立連結，宇宙都在為你敞開順暢的通道。請信任你的直覺，大膽地進行空間清理、能量佈置或心靈上的淨化儀式。這份流動的能量將支持你的意圖，為生活帶來清明與庇護。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_all_reversed', '當下的能量流動似乎有些凝滯，這份「受阻」的感覺，或許正是空間與心靈在向你發出暫停的訊號。它並非凶兆，而是提醒你，在關注外在風水或無形存在之前，請先向內安頓自己的磁場。靜下心來，檢視是否有未化解的情緒或信念，阻塞了你與環境間的和諧共鳴。當內在清明，外在的流動自然會重新為你開啟。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_one_reversed', '整體而言，你與空間的能量流動是順暢和諧的，環境正在支持你。然而，這張逆位牌溫柔地提醒，可能有一處被忽略的細節或一份潛藏的執念，形成了微小的能量淤塞。它邀請你以更清明的覺察，去檢視家中某個角落，或內心某個關於「保護」的念頭。無需擔憂，這只是一個調整的契機。當你以平靜的心去梳理與淨化，那份阻滯便會化為流動的祝福。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_one_upright', '此刻的空間，或許正承載著無形的壓力，讓你感到些許不安。這張牌揭示的困難，並非不可解，而是提醒你，環境的能量確實需要被正視與梳理。請相信，只要懷抱敬意與覺察，從一個微小的調整開始——無論是清理雜物、引入光線，或是單純在心中許下安寧的意願——那股停滯的能量便會開始流動，為你打開一線希望與轉機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_mixed', '這片空間的能量場域，正處於一種微妙的動態平衡中。牌面顯示，既有滋養與守護的力量在流動，也夾雜著一些停滯或紊亂的氣息。這並非凶兆，而是提醒你，環境與無形界正與你的內在狀態共鳴。請保持內心的澄澈與尊重，透過整理、淨化或引入一道溫暖的光，你便能成為這股複雜能量的協調者，引導其趨向和諧與安定。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_all_upright', '此刻，牌陣的能量如清泉般全然流動，毫無滯礙。這顯示你正處於一個「順勢而為」的時刻，無論是策略的判斷、時機的掌握，或是風險的評估，你的直覺與理性都處在和諧的狀態。然而，請記得，順暢的能量是禮物，而非依賴。將這份清明與果敢，視為一種對自身判斷力的鍛鍊。在投入的同時，保持一份清醒的覺察，享受過程中的心智博弈，遠比緊盯結果更為珍貴。願你在流動的機遇中，始終穩住內心的平衡與優雅。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_all_reversed', '親愛的，當下的牌陣能量顯示，這條路上充滿了內在的阻滯與警示。這並非否定你的渴望，而是宇宙溫柔地提醒：此刻並非向外追逐的時機。請你暫停腳步，向內觀照，是什麼樣的不安、僥倖或執念，正驅使著你？真正的博弈，是與自己內心的對話。先安頓好這份躁動，清晰與力量才會從中升起。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_one_reversed', '整體的運勢流動對你是有利的，但這張逆位牌溫柔地提醒，真正的阻礙可能來自內在的「得失心」。當你過於執著於結果，那份焦慮反而會模糊你的判斷。請記得，博弈的精髓在於清醒的選擇與優雅的進退，而非孤注一擲的征服。保持心靈的輕盈與覺察，你將能繞開那個唯一的陷阱，穩健前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_one_upright', '此刻的牌面能量，顯示這是一場充滿挑戰的博弈。前方的路或許荊棘密布，勝算看似渺茫，但請你看見那隱藏在困難背後的一線微光。這份希望並非鼓勵你孤注一擲，而是提醒你：真正的轉機，往往來自於極度清醒的頭腦與精準的節制。請將這份「希望」視為一個訊號，引導你重新評估策略、設定明確的底線，智慧地守護你的資源，方能穿越迷霧，看見不同的可能性。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_mixed', '親愛的，這副牌顯示的局勢猶如賭桌上的籌碼，既有潛在的收益，也伴隨著可見的風險。它提醒你，真正的博弈智慧不在於孤注一擲，而在於精準衡量「投入」與「底線」的平衡。請帶著清醒的覺知前行，將每一次選擇都視為對自己心態的修煉，而非僅僅對運氣的依賴。守護好內心的平靜，那才是你最穩固的籌碼。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_all_upright', '親愛的，這次的牌陣能量非常清晰且順暢，這是一個絕佳的時機。你心中關於購車的藍圖與現實的條件正和諧共振，彷彿宇宙也在為你鋪路。請信任這份順流的指引，勇敢地採取行動去試駕、比較與議價。你的選擇將會為生活帶來嶄新的自由度與喜悅，放心地駛向你嚮往的旅程吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_all_reversed', '親愛的，這次的牌陣能量提醒我們，關於購車這件事，目前似乎存在一些需要釐清的內在聲音或外在阻礙。這不是壞事，而是宇宙溫柔地按下了暫停鍵，邀請你回頭審視：這份渴望背後，是真正的需求，還是一時的衝動？請給自己一點時間，讓答案從心底浮現，你會找到最適合自己的方向與時機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_one_reversed', '整體而言，這次購車的旅程是順暢的，你已走在正確的道路上。然而，牌面提醒，過程中的小阻礙，或許是某個細節的疏忽、一份合約的模糊，或是一絲對「完美選擇」的執著。請溫柔地檢視這些環節，這並非否定你的決定，而是宇宙在提醒你：放慢腳步，將那份對完美的急切轉化為周詳的核對。當你以清晰、務實的心態面對，那輛與你共譜旅程的夥伴，自然會穩穩地駛入你的生命。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_one_upright', '親愛的，這段購車的旅程或許比預期中更具挑戰，過程中的抉擇與等待可能讓你感到些許疲憊。這張牌提醒你，眼前的困難是真實的，但絕非終點。請相信，那份對自由移動與嶄新開始的渴望，本身就是一盞明燈。保持耐心，仔細評估每一個選項，那條最適合你的道路，正隱藏在看似複雜的局勢之中，等待你以清晰的洞察去發現它。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_mixed', '這次購車的旅程，牌面呈現出複雜交織的能量。這提醒你，這不僅是挑選一台交通工具，更是一個平衡「理性」與「渴望」的過程。牌中既有值得把握的契機，也隱含著需要你放慢腳步、仔細評估的細節。請相信，這份複雜性正是為了引導你做出最周全的決定。在熱情與謹慎之間找到你的平衡點，你將能駕馭這個選擇，駛向真正符合你需求的未來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_all_upright', '這份禮物或驚喜，正乘著全然順暢的能量向你而來。宇宙正為你鋪設一條充滿祝福的道路，請敞開心胸，以喜悅和期待去迎接。這份美好的流動邀請你主動參與，帶著信心去接收，並將這份豐盈的能量分享出去。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_all_reversed', '親愛的你，這次的占卜圍繞著「禮物」與「驚喜」展開，而牌面呈現的能量，正溫柔地提醒我們：有時，最美的驚喜藏在暫停與內省之中。當外在的流動似乎受阻，這並非代表禮物不會到來，而是邀請你將目光轉向內在——那份你早已擁有，卻可能遺忘的自我接納與平靜。請給自己一些空間，清理內心的雜音，當你準備好時，生命的饋贈會以更深刻、更適合你的方式，悄然抵達。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_one_reversed', '這份禮物或驚喜的到來，整體能量是流動且充滿善意的。它像一份精心準備的包裹，大部分都包裹得完美，只是其中一個小結需要你溫柔地解開。這並非否定，而是提醒：或許你對「驚喜」的定義過於狹隘，或內心有一絲「不配得」的遲疑。請敞開心，接納生命以各種形式送來的禮物，那份小小的阻礙，正是為了讓你更深刻地體會收穫的甜美。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_one_upright', '這份禮物或驚喜，或許包裹著一層你未曾預料的挑戰外衣，過程可能不如想像中順遂。但請相信，這份「困難」本身，正是宇宙為你精心準備的成長契機。請保持耐心與覺察，在看似停滯的局勢中，那份希望之光從未熄滅，它正等待你以更成熟、更接納的心態去開啟。當你準備好時，真正的驚喜將不僅僅是禮物本身，更是你穿越迷霧後所獲得的內在力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_mixed', '親愛的，這次的禮物與驚喜，就像一盒包裝精美的巧克力，你無法預知下一顆的滋味。牌陣中正逆交織的能量，提醒著這份「驚喜」本身便蘊含著雙面性——它可能帶來意料之外的祝福，也可能需要你以智慧去拆解包裝。請保持開放與平衡的心，在喜悅中保有覺察，在複雜中看見禮物的本質。無論驚喜以何種形式到來，它最終都是為了引領你更靠近生命的豐盛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_all_upright', '親愛的，這份全然的順暢能量，正是一份清晰的邀請。你心中所牽掛的聯絡，或正在經歷的等待，其背後的能量流動是開放且無阻的。這並非被動的靜候，而是宇宙在鼓勵你，可以主動伸出觸角，或懷抱全然信任的心去迎接。那份連結的橋樑已然架好，請帶著你的真誠與溫暖向前一步，美好的交流與圓滿的回應，正順著這股順流，自然地向你而來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_all_reversed', '親愛的你，這組牌的能量正溫柔地提醒你，此刻的「等待」並非停滯，而是一段珍貴的內在整理期。當所有能量向內收斂，或許是宇宙在告訴你，暫時的靜默與距離，是為了讓你看清自己真正的渴望與恐懼。請先安頓好自己的心，當內在清晰了，外在的聯繫自然會以更真誠、更流動的方式重新展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_one_reversed', '親愛的，這次的占卜顯示，關於「聯絡」或「等待」的整體能量是流動且充滿希望的，大部分的路徑都為你敞開。然而，牌中那張逆位牌溫柔地提醒，或許有一個小小的、內在的顧慮或外在的時機點，正需要你多一點耐心與覺察。這不是阻斷，而是宇宙請你稍作停留，調整呼吸，看清那個細微的環節。當你準備好，那份連結自會以最適合的方式到來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_one_upright', '這段等待的時光，或許讓你感到焦灼與不確定，彷彿訊息沉入寂靜的深海。牌面揭示，當前的連結確實存在著阻滯與考驗，這份困難是真實的。然而，請看見那穿透雲層的一線微光——希望並未熄滅，它只是需要更深的耐心與更澄澈的意圖來滋養。此刻，與其被動地讓時間流逝，不如將這份等待轉化為向內的整理與準備，讓你的心成為一個更穩定、更敞開的容器。當時機成熟，你內在準備好的寧靜，將會成為連結最有力的橋樑。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_mixed', '親愛的朋友，這份關於「聯絡」與「等待」的牌陣，呈現出複雜而真實的樣貌。它告訴我們，有些連結正在醞釀，有些回應則需要時間沉澱。這並非單純的好與壞，而是一幅需要你用心平衡的圖景。請在主動表達與耐心靜候之間，找到屬於你的節奏。信任這個過程，即使當下模糊不清，每一步都是在為清晰的答案鋪路。你的真誠，終將引領你走向最合適的相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_all_upright', '親愛的朋友，這組牌陣的能量如晴空般明朗順暢，為你的活動計畫帶來極佳的祝福。這是一個絕佳的時機，無論是戶外踏青、朋友聚會，或是任何你期待已久的行程，都請放心大膽地去實踐。宇宙正為你鋪設一條順遂的道路，讓你的熱情與行動力能與美好的天氣和氛圍完美共振。請懷抱信心，積極地擁抱這個充滿活力的當下，去創造屬於你的精彩回憶吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_all_reversed', '親愛的朋友，這組牌的能量正溫柔地提醒你，關於天氣或活動的計畫，此刻可能需要一點「暫停」的智慧。外在的條件或許尚未成熟，或內在的直覺正呼籲你緩一緩腳步。這不是阻礙，而是宇宙在為你調整最適宜的節奏。請向內聆聽，順應這份暫緩的提示，它將幫助你在寧靜中，醞釀出更清晰的方向與更從容的喜悅。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_one_reversed', '整體而言，這次的天氣與活動安排將會相當順利，請你帶著期待的心情去迎接。然而，逆位的能量提醒我們，可能會有一個小小的變數，例如突如其來的天氣變化或行程上的小延誤。這並非阻礙，而是一個溫柔的提示，邀請你為美好的計畫準備一份靈活的備案。保持開放與彈性，你的從容將能化解任何意外，讓整個體驗更加圓滿。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_one_upright', '親愛的朋友，這張牌提醒你，外在的天氣或活動安排，或許正經歷一些波折與考驗，像是突如其來的風雨打亂了計畫。然而，牌中蘊藏的希望之光告訴我們，困境中總有轉機。請保持內心的彈性與樂觀，準備好替代方案，並相信無論天氣如何變化，你都能在其中找到屬於自己的晴朗時刻與美好體驗。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_mixed', '親愛的朋友，這趟旅程的天氣圖景並非單一色調，而是晴雨交織。牌陣提醒你，活動的整體能量是動態且需要智慧的。你可能會遇到計畫外的變化，或感受到某些環節不如預期順暢，但同時也存在著意想不到的驚喜與轉機。請保持靈活與開放，像一位經驗豐富的旅人，既準備好雨具，也不忘抬頭欣賞穿透雲層的陽光。在準備與隨性之間找到你的平衡點，這份複雜性能將你的體驗雕琢得更加深刻而難忘。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_all_upright', '親愛的，這組牌的能量如溪流般清澈順暢，預示著這份合作或契約的緣分已然成熟。此刻，你心中所想的夥伴關係或協議，正處於一個充滿信任、共識與光明前景的階段。請相信你的直覺與判斷，這是一個適合積極推進、敞開心扉簽訂承諾的時刻。宇宙正支持著你，勇敢地邁出那一步，與對方共創雙贏的未來吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，當前的合作或契約關係，可能正處於一個需要「暫停與內省」的階段。逆位並非否定，而是邀請你向內探尋：是否有些隱而未顯的顧慮、未釐清的期待，或內在的不安全感，正在無形中阻礙了能量的順暢流動？請先別急於向前推進，給彼此一點空間沉澱與反思。當內在的意圖清晰了，外在的協作之路自然會重新為你敞開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_one_reversed', '這次的合作關係整體正朝著穩健的方向發展，你們的共識與基礎是堅實的。然而，這張逆位牌溫柔地提醒，或許有一個關於「信任」或「細節承諾」的環節尚未完全對齊。它不是阻斷，而是一盞警示燈，邀請你們在向前邁進前，再真誠地溝通一次，將模糊地帶化為清晰的共識。當這個小小的結被解開，契約將成為保護雙方、共創雙贏的堅固橋樑。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_one_upright', '這段合作關係正經歷考驗，如同在迷霧中前行。契約的細節或彼此的信任可能需要更謹慎的梳理，過程或許不輕鬆。但請看見，這張牌正位的核心，是「堅持」與「誠信」所帶來的曙光。困難是為了讓根基更穩固。請保持開放溝通，將條款與期待逐一釐清，那份珍貴的共識與互信，正隱藏在真誠的努力之後，等待你們共同發現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_mixed', '這份合作契約的旅程，正如同牌陣中正逆交織的能量，是一場需要智慧與平衡的共舞。其中既有穩固的基石與閃光的機會，也隱含著需要細心校準的節奏與潛在的誤解。請別將逆位視為阻礙，而是溫柔的提醒：在邁步向前的同時，記得停下來檢視細節、真誠溝通，並照顧好彼此的邊界。當你能擁抱這份複雜性，以清晰與彈性去應對，便能將這份合約，導向真正互惠共好的平衡之境。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;