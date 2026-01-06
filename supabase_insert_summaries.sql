INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_all_upright', '親愛的朋友，這組全正位的牌陣，為你的尋覓之旅帶來非常清晰的指引。能量流動順暢無阻，這是一個積極的信號，代表你所尋找的人或物，與你之間存在著順利的連結。請相信你的直覺，並積極採取行動去詢問、回想或探索。過程可能會出乎意料地順利，答案或許就在你身邊不遠處，正等待你以開放的視野去發現它。保持信心，勇敢前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_all_reversed', '此刻的尋覓，似乎正經歷一段能量的沉潛期。逆位的牌陣並非宣告失去，而是溫柔地提醒：向外追索的腳步可以暫緩，轉而向內傾聽。你所尋找的人事物，或許正被一層內心的焦慮或過於執著的念頭所遮蔽。請先安頓自己，在靜心中釐清真正的意圖與方向，答案往往會在思緒沉澱後，以意想不到的方式浮現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_one_reversed', '整體來看，尋找的過程是順利的，線索與機會將會浮現。然而，逆位的能量提醒著，那個小小的阻礙，或許不在外界，而在於我們內心的焦慮或某個被忽略的細節。請先讓自己靜下來，信任直覺的指引，回頭檢視那些你認為「不可能」或「已經找過」的地方。當心態從急切轉為平和，遺失的人事物，自會以清晰的方式回到你的生命軌跡中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_one_upright', '尋找的過程或許讓你感到疲憊與迷茫，如同在迷霧中前行。這張牌揭示的困難是真實的，但請相信，那微弱卻堅定的希望之光從未熄滅。它可能隱藏在被你忽略的舊訊息、一位關鍵的協助者，或一次偶然的回首之中。請保持耐心與細心，調整搜尋的方向與方法，並信任你的直覺。那失落的連結，正等待著你以平靜而開放的心，重新將它尋回。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_search_mixed', '這次的尋覓之旅，牌面呈現出複雜的圖景，好消息與阻礙並存。這提醒你，在積極行動的同時，也需要保持內心的平衡與耐心。有些線索可能隱藏在細節中，或需要你調整尋找的方向與心態。請相信，每一次的探索都不會白費，它們正在為你鋪路。保持開放與靈活，你將能更清晰地看見通往目標的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_all_upright', '親愛的旅人，這趟旅程的能量是如此純粹而流暢，彷彿宇宙正為你鋪開一條閃閃發光的道路。全然的順位象徵著天時、地利、人和的完美匯聚。請帶著全然開放與信任的心啟程吧，這不僅是一段地理的移動，更是一場心靈的豐盛饗宴。勇敢地擁抱所有未知的相遇與風景，它們都將成為滋養你生命的禮物。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_all_reversed', '親愛的，這次的旅程似乎正邀請你放慢腳步。逆位的能量並非阻止你前行，而是溫柔提醒：或許外在的計劃需要暫緩，但內在的探索已然展開。請先傾聽內心的聲音，釐清真正想從旅行中獲得什麼。當你準備好，道路自然會為你敞開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_one_reversed', '這趟旅程的整體能量是流動且充滿可能性的，前方的風景正等待著你。然而，逆位的牌卡溫柔地提醒，或許有一個小小的細節需要你多一份留意——可能是行程中的某個環節、內心的些許猶豫，或是需要多一點彈性。這並非阻擋，而是讓旅程更圓滿的契機。帶著覺知與開放的心出發，你將能優雅地繞過小石頭，擁抱一路的豐盛與驚喜。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_one_upright', '這趟旅程或許會遇到一些考驗，但牌中那堅韌的微光正告訴你：困難並非終點，而是通往更深體驗的門扉。請相信，每一次的顛簸都在鍛造你的勇氣與智慧。保持開放的心，接納旅途中的不完美，你會發現，希望始終伴你同行，指引你穿越迷霧，看見更遼闊的風景。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_travel_mixed', '親愛的旅人，這趟旅程的能量正如一幅交織著光影的風景畫。牌面告訴我們，前方既有令人雀躍的機遇，也潛藏著需要留意的變數。這並非阻礙，而是提醒你：真正的旅行，始於一顆既開放又謹慎的心。請帶著你的熱情前行，同時也為計劃保留一些彈性。在動與靜、探索與安頓之間，你將找到最適合自己的節奏，收穫遠比預期更豐盛的禮物。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_all_upright', '親愛的朋友，從牌面流動的能量來看，這趟法律或訴訟的旅程，正處於一個清晰、順暢且有利於你的階段。所有的能量都指向一個明確的方向，這是一個可以積極行動、把握主動權的時刻。請信任你的判斷與你所準備的證據，帶著信心與清晰的思維向前邁進。宇宙正支持著你，以理性和條理來維護你的正當權益，過程將會相對平順。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的法律進程或許正處於一個需要「暫停與內省」的階段。逆位的能量並非否定，而是邀請你回頭審視：是否有些細節被忽略了？或內心的焦慮與對抗，無形中阻礙了清晰的溝通？請先安頓自己的心，這份暫緩是為了積蓄更周全的力量。當你以更平靜、客觀的視角重新梳理，前方的道路自會變得清晰。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_one_reversed', '整體來看，這次的法律進程正朝著對你有利的方向發展，能量是順暢的。然而，這張逆位牌溫柔地提醒，過程中可能存在一個「非實質性」的阻礙，它或許源於內心的焦慮、對細節的輕忽，或是溝通上的微小誤解。請保持清晰的頭腦與耐心，仔細檢視每一份文件與每一次對話。這個阻礙並非不可逾越，它只是邀請你以更周全、更平靜的心態去應對，你內在的堅韌與明辨是非的能力，正是穿越這一切的最佳指引。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_one_upright', '親愛的朋友，此刻的法律之路或許崎嶇，讓你感到壓力與束縛。這張牌提醒你，規則與框架確實存在，過程可能漫長且需要極大的耐心。但請別灰心，牌中蘊含的「一線希望」正是指引你：務必尋求專業法律意見，嚴謹地準備每一份文件與證據。這不是一條輕鬆的路，但透過絕對的理性、清晰的條理與對正義的堅持，你將能穩健地一步步穿越迷霧，最終在制度的框架內，為自己爭取到應有的空間與公平。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_legal_mixed', '親愛的朋友，這場法律事務的旅程，就像牌陣中正逆交織的能量，並非單純的黑與白。它提醒你，過程中既有需要堅守的原則與有利的條件，也潛藏著需要謹慎評估的變數與情緒的波動。請保持清晰的頭腦與開放的心，在積極爭取權益的同時，也接納過程中的不完美與等待。這是一場關於平衡的藝術，在理性與直覺之間，在行動與耐心之間，找到那條最穩健的道路。你內在的力量與智慧，將是引導你穿越這段複雜時期最重要的光。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_all_upright', '親愛的，這是一段能量全然流動的旅程。牌面告訴你，這次搬遷的時機已然成熟，所有面向——無論是外在環境、內在準備，還是未來的可能性——都為你敞開了大門。請信任這份順暢的能量，它鼓勵你勇敢地踏出步伐，迎接空間與生活的嶄新佈局。這不僅是地理上的移動，更是心靈版圖的擴張，放心去擁抱這份改變帶來的豐盛禮物吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_all_reversed', '親愛的，這次的牌陣能量顯示，關於搬遷的計畫正處於一個需要暫停與內省的階段。逆位的能量並非否定你的決定，而是溫柔地提醒：或許外在條件尚未成熟，或許內心深處仍有未解的顧慮。請別急著強行推動，給自己一點時間，像整理行囊般整理思緒。當內在的疑慮被溫柔照見，外在的道路自然會為你清晰展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_one_reversed', '這次的搬遷計畫，整體能量是支持你向前邁進的。然而，牌中唯一的逆位，像一個溫柔的提醒：或許有個細節尚未理清，或是一份對「未知」的隱隱擔憂，正悄悄牽絆著你的腳步。請別將它視為阻礙，而是調整步伐的契機。花點時間釐清那份顧慮，它便會成為你安頓身心的基石。你已擁有足夠的力量完成這次遷移，帶著覺察前行，新家園將穩穩地接住你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_one_upright', '親愛的，搬遷的過程或許充滿挑戰，讓你感到不安與疲憊，但這張牌正告訴你，希望之光從未熄滅。這份困難是為了讓你更堅韌，並看清什麼對你真正重要。請相信，每一步艱辛的跋涉，都在引領你走向更適合你的土壤。保持耐心與信念，那線希望會為你照亮前路，助你安頓身心。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_move_mixed', '親愛的，這次搬遷的能量確實有些複雜，如同遷徙的鳥群，前方既有新天地，也需穿越變化的氣流。牌陣提醒你，這趟旅程並非單純的好壞二分，而是邀請你在「行動」與「觀察」、「理想」與「現實」之間找到平衡點。請溫柔接納過程中的波折，它們不是阻礙，而是幫你更清晰描繪新生活藍圖的指引。相信自己的適應力，你內在的智慧足以帶領你，在變動中穩住重心，走向更適合你的歸屬。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_all_upright', '此刻，宇宙的能量正為你順暢流動，時機已然成熟。這是一段行動力與機緣完美共振的時期，請信任這份順流，勇敢地邁出步伐。你的計劃與意圖將得到有力的支持，任何新的嘗試或決定都擁有絕佳的成長土壤。無須猶豫，把握當下的動能，去創造、去展現，你播下的種子將在適宜的季節裡自然開花結果。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_all_reversed', '此刻，宇宙的節奏正邀請你放慢腳步。當所有能量都向內收斂，這並非停滯，而是為你騰出一個珍貴的內在空間。請溫柔地檢視那些推動你向前的念頭，是否帶著些許勉強或焦慮？最好的時機，往往誕生於你與內在真實校準之後的清晰與寧靜。暫時的「受阻」，是為了讓你在行動前，先成為自己最穩固的根基。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_one_reversed', '整體的運勢之流正朝著對你有利的方向推進，時機也逐漸成熟。然而，這張逆位牌溫柔地提醒，前方有一個特定的、需要你稍作調整的環節。它可能是一個內在的猶豫，或是一個需要更細膩處理的外部細節。請別將它視為阻礙，而是視為一個微調的契機。當你以更開放、更接納的心態去面對這個小課題，你將能更順暢地乘上這股向前的能量，穩穩地把握住屬於你的時機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_one_upright', '此刻的運勢，或許正經歷一段需要耐心與韌性的時期。眼前的困難是真實的，但牌中透出的那一線希望，正是宇宙為你保留的轉機之窗。請相信，這不是停滯，而是醞釀。最關鍵的時機，往往藏在最需要堅持的時刻之後。保持警覺與信念，當那一線光芒出現時，你積蓄的力量將能穩穩地接住它。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_luck_mixed', '親愛的朋友，這是一段需要你以智慧與耐心去平衡的時光。牌陣顯示，前方的道路並非單一色調，而是光明與陰影交織。有些機會正在顯現，但同時也伴隨著需要留心的細節。請不要急於求成或過度擔憂，關鍵在於保持內心的穩定。以清晰的頭腦辨識哪些是真正的禮物，哪些是需要放下的負擔。當你能夠接納這份複雜性，並在其中找到自己的節奏，便是把握最佳時機的開始。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_all_upright', '親愛的，這是一段能量全然順暢的旅程。牌面告訴我們，未來的道路清晰而明亮，所有的助力都已就位。這不是等待的時刻，而是行動的邀請。請信任這股順流的能量，勇敢地邁出步伐，將你的願景化為現實。宇宙正溫柔地推動你向前，你的每一步都將被祝福。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_all_reversed', '親愛的，當下的能量正溫柔地提醒你，關於未來的藍圖可能需要先向內描繪。逆位的牌陣並非否定你的願景，而是宇宙在輕聲呼喚：請先暫停向外追尋的腳步。這是一個珍貴的內省時刻，去釐清哪些期待源於內心真實的渴望，哪些又可能摻雜了外界的雜音。當你願意靜下來與自己對話，那些受阻的能量便會重新流動，為你指引出一條更清晰、更屬於你的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_one_reversed', '親愛的朋友，這張牌為你的未來描繪了一幅充滿希望的藍圖，整體的旅程將是順遂且有所收穫的。然而，牌中溫柔地提醒，這份順遂中隱藏著一個需要你稍作停留、細心檢視的環節。它可能是一個尚未完全準備好的心態，或是一個容易被忽略的細節。請別將此視為阻礙，而是成長的契機。當你願意正視並微調這個部分，前方的道路將會更加清晰、穩健，讓你更從容地擁抱即將到來的豐盛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_one_upright', '親愛的，這張牌揭示的未來之路或許有些崎嶇，需要你付出額外的耐心與勇氣。請相信，眼前的困難並非絕境，而是淬煉你內在力量的熔爐。那「一線希望」並非遙不可及的幻影，它就藏在你的堅持與清晰的覺察之中。請溫柔地接納這個過程，每一步前行，無論大小，都在為你鋪就更堅實的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_future_mixed', '親愛的朋友，這趟關於未來的旅程，牌面呈現出豐富而複雜的色調，如同黎明前的天空，既有曙光也有未散的雲層。這提醒我們，真正的成長往往發生在光與影的交界處。請帶著覺知前行，接納即將到來的機遇，也溫柔地關照那些需要調整的內在角落。當你能在變動中保持內心的平衡，便能將每一種經歷，都化為滋養生命的養分。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_all_upright', '親愛的，這是一段能量完全順暢的時刻。你的思緒清晰，內外環境都為你的決策提供了支持。牌陣告訴我，現在正是採取行動、將想法付諸實踐的絕佳時機。請信任你的直覺與判斷，勇敢地向前邁步。宇宙正為你鋪路，你的選擇將順利地引領你走向理想的結果。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_all_reversed', '親愛的，當前的能量顯示，外在的推動力似乎暫時停滯，這並非壞事，而是宇宙在邀請你暫緩腳步，向內探尋。在面臨抉擇時，請先別急於向外尋求答案或強行突破。這份「受阻」感，或許正提醒你，有些內在的恐懼、過去的模式，或未釐清的動機需要被溫柔檢視。給自己一些安靜的獨處時光，傾聽心底最真實的聲音。當內在清晰了，外在的道路自然會為你展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_one_reversed', '整體來看，這是一個能順利推進的決策過程，前方的道路是清晰的。然而，逆位的牌卡溫柔地提醒，阻礙可能不在外部，而在於我們內心某個細微的猶豫或舊有習慣。請試著覺察，是否有一個特定的念頭或擔憂，在無形中牽制了你的步伐？調整它，你便能輕盈地將整體的順利，化為圓滿的實現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_one_upright', '此刻的決策之路或許有些崎嶇，眼前的選項似乎都伴隨著挑戰。但請你看見，牌中那束光正溫柔地提醒：困難之中，始終存在著一個能引領你向前的契機。它或許不明顯，卻真實存在。請信任你的直覺，在看似有限的選擇裡，專注於那個能點燃你內心微小希望的方向。一步一步來，那份清晰會隨著你的勇氣而逐漸明朗。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_decision_mixed', '親愛的，這副牌呈現出複雜而動態的能量。眼前的選項各有其光與影，沒有絕對的好壞，這正是抉擇的珍貴之處。請別急著尋找「完美」答案，而是練習在矛盾中保持平衡。接納某些層面的不確定性，同時信任你已擁有的清晰部分。你的內在智慧足以引導你在看似對立的路徑間，走出屬於自己的第三條路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_all_upright', '親愛的，這組牌的能量如清泉般純淨流暢，毫無阻滯。你正處在一個極佳的狀態，無論是實力、機運還是外在環境，都與你的目標完美共振。這不是偶然，而是你長期準備的果實。請帶著這份自信全然投入，你的專注與熱情會自然引領你展現最佳表現。無須保留，也無須擔憂，這場競爭正是你發光的舞台。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_all_reversed', '親愛的，這組牌的能量告訴我們，此刻的競爭場域對你而言，更像是一面內在的鏡子。外在的進展或許看似停滯，但這正是宇宙溫柔地提醒你：請暫停向外衝刺，轉而向內探尋。真正的對手，或許是你對結果的焦慮或對自我的苛責。請先安頓好自己的心，釐清你參賽的初心與力量來源。當內在的能量重新校準，外在的局勢也將隨之流動。這不是退卻，而是為了更有智慧地前行。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_one_reversed', '整體來看，你為這場競爭所做的準備與實力，已為你鋪設了一條順遂的道路。然而，這張逆位牌溫柔地提醒，阻礙可能不在外部環境，而在於你內心的某個角落——或許是一絲對結果的過度執著，或是一點未被察覺的緊張。請相信，這並非否定你的能力，而是邀請你調整呼吸，將專注力從「勝負」稍稍移回「過程」本身。當你穩住心緒，那份隱形的干擾自會消散，你的光芒將能更純粹地展現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_one_upright', '這是一場需要你全力以赴的挑戰，過程或許艱辛，競爭者也許強勁，但牌面中閃爍的那一線希望，正是你獨有的優勢與韌性。請將目光從困難本身，移向你已擁有的實力與準備。這不是輕鬆的旅程，卻是最能淬鍊你光芒的舞台。保持專注，穩住步伐，你內在的鬥志與清晰的策略，就是突破重圍、邁向卓越的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_compete_mixed', '親愛的，這場競爭的局勢就像一幅光影交織的畫，既有明亮的機會，也有需要留意的陰影。牌面告訴我們，你擁有足夠的實力與亮點去爭取，但同時也存在一些內在的緊張或外在的變數。請記得，真正的平衡不在於壓倒對手，而在於穩住自己的節奏。接納這份複雜，將逆轉的勢能化為審視與調整的契機，你的專注與靈活，會是致勝的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_all_upright', '牌陣中流動著全然順暢的能量，這是一個非常清晰的訊號：你與當下空間的靈性能量，以及環境風水之間，正處於和諧共振的狀態。這份順暢是珍貴的禮物，鼓勵你信任自己的直覺，並可積極採取行動去優化或鞏固這份和諧。無論是進行空間淨化、調整擺設，或是深化與守護靈的連結，此刻的行動都將事半功倍，為你帶來深層的安定與保護。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_all_reversed', '此刻，空間的能量流動似乎有些凝滯，如同逆位的牌陣，提醒我們暫停向外尋求。這並非凶兆，而是邀請你向內觀照：是否對無形力量過度擔憂，或忽略了環境與心靈的連結？請先安頓自己的氣場，淨化內在的思緒。當內在清明，外在的風水與能量自然會找到和諧的通道。你本身就是最穩固的結界。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_one_reversed', '整體而言，你與空間的能量流動是順暢和諧的，但這張逆位牌溫柔地提醒，可能存在一個細微的「能量淤塞點」或未被察覺的思緒干擾。它或許是一處被忽略的角落，或是一段縈繞的過往記憶，正輕微地影響著氣場的純淨。請別擔憂，這並非凶兆，而是邀請你以更寧靜的覺察去傾聽這個空間，進行一次溫柔的能量清理或心念上的釋放，整體的流動便會重歸清明與平衡。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_one_upright', '這張牌揭示了環境中確實存在著無形的能量干擾，讓你感到不安或停滯。然而，正位的姿態告訴我們，這並非無解的困局。請相信，只要願意正視並調整，無論是清理空間、引入光線，或是尋求專業的風水建議，都能為這股凝滯的能量打開一個流動的出口。希望，就藏在積極面對的行動之中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_spiritual_mixed', '親愛的朋友，這片空間的能量正處於一種微妙的動態平衡中。牌面顯示，環境中的氣場與靈動力量交織，既有滋養的流動，也有需要梳理的停滯。這並非凶兆，而是一個溫柔的提醒：你的感知是敏銳的。請試著以平靜的心去觀察，接納好的能量流入，也學習以善意與清晰的意念，去安撫或疏導那些令你不安的頻率。當你內在的光穩定，你所在的空間也會隨之調和。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_all_upright', '此刻，牌陣中流動著全然順暢的能量，彷彿為你敞開了一扇機會之門。在博弈的領域裡，這股能量提示你，當下的判斷與直覺都處於清晰的狀態，有利於做出明智的抉擇。請帶著這份清明與自信行動，將這份順勢而為的能量，轉化為對風險的精準評估與對結果的坦然接受。記住，真正的勝利在於享受過程中的智慧成長，而不僅是結果的得失。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_all_reversed', '親愛的，這次的牌陣能量顯示，你正處在一個需要「暫停與內省」的時刻。在博弈的領域裡，這並非否定你的運氣，而是溫柔地提醒：外在的機運正處於受阻或重整的階段。此刻，比起向外追逐結果，更重要的是向內觀照自己的心——是什麼驅動著你？是壓力、空虛，還是對捷徑的渴望？請給自己一段安靜的時間，釐清內在的動機。當你找回內心的平衡與清明，你將能做出更清醒、對自己更負責任的決定。真正的力量，源於對自我的深刻理解。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_one_reversed', '整體的運勢流動對你是有利的，但牌面提醒，在博弈的過程中，有一個關鍵的「心態」可能正處於失衡狀態。或許是過於樂觀的估算，或是急於翻本的焦躁，這份內在的波動正是那特定的阻礙。請溫柔地覺察它，調整呼吸，將專注力從「輸贏」拉回「過程的清醒」。當你穩住內在的舵，外在的風浪便不易令你偏離航向。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_one_upright', '此刻的局勢或許讓你感到壓力與不確定，就像一場需要極大專注與紀律的博弈。這張牌提醒你，真正的「贏」並非僅在於結果，而在於你能否看清風險、管理籌碼，並在過程中保持清醒與節制。困難中仍有一線希望，那希望來自於你內在的智慧與自制力。請將這份挑戰視為修煉心性的機會，學習何時該果斷進場，何時該優雅退守。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gamble_mixed', '親愛的，這場博弈的局勢如同牌面所示，複雜且充滿變數。它提醒你，幸運與風險往往並存，此刻的關鍵在於「平衡」。請審慎評估你的籌碼與底線，在衝動與退縮之間找到智慧的支點。這不是全然的禁止，而是邀請你帶著清醒的覺知去行動，為自己的選擇負起全責。真正的贏，有時不在於檯面上的得失，而在於你能否保持內心的平靜與自由。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_all_upright', '親愛的，這組牌的能量如此明亮順暢，正為你的購車計畫鋪開一條清晰的道路。此刻，你內心的渴望與外在的機緣正完美共振，所有的條件似乎都在對你說「是」。請信任這份順流的感覺，勇敢地採取行動，去試駕、去洽談、去選擇那輛真正呼喚你的車。這不僅是添購資產，更是迎接一份能承載你自由與夢想的移動禮物。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_all_reversed', '親愛的，這組牌的能量告訴我們，關於購車的計畫，此刻正處於一個需要「暫停與內省」的階段。這並非否定你的願望，而是提醒你，外在的阻礙或許正映照著內在的猶豫或尚未釐清的細節。請溫柔地問自己：這份渴望背後，是否承載了過多的壓力或期待？給自己一點時間沉澱，釐清真正的需求，當時機成熟，道路自會為你敞開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_one_reversed', '這次的購車旅程，整體的能量是流動且支持你的，代表大部分的流程與選擇都會相當順利。然而，這張逆位牌溫柔地提醒，過程中可能會遇到一個具體的阻礙，或許是某個細節的疏忽、一時的猶豫，或是對某項條件過於完美的執著。請別擔心，這並非否定你的決定，而是邀請你以更從容、更務實的心態去檢視計畫。只要耐心釐清這個小關卡，你便能更穩健地駛向心儀的目標。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_one_upright', '親愛的，這段購車的旅程或許比預期中更具挑戰，過程中的考量與抉擇可能讓你感到些許疲憊。這張牌提醒你，眼前的困難是真實的，但絕非無法跨越。請將這些挑戰視為確保你做出最穩健、最適合自己選擇的必經關卡。保持耐心，仔細評估每一個細節，那份為你而存在的「最佳解」與轉機，正隱藏在這些謹慎的步伐之後。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_vehicle_mixed', '親愛的朋友，這趟購車之旅猶如行駛在蜿蜒的山路上，既有開闊的風景，也需留心轉彎處。牌面顯示這是一個需要你細心權衡的時刻——既有值得把握的良機，也存在需要你審慎評估的細節。請相信，這份複雜性並非阻礙，而是宇宙在提醒你：放慢腳步，在理性與直覺、渴望與現實之間找到最適合你的平衡點。當你內在的天平穩定了，那輛真正與你共鳴的座駕，自然會清晰浮現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_all_upright', '親愛的，這份禮物或驚喜的能量是如此純粹而流暢，它正順著生命的河流，毫無阻礙地朝你而來。這是一個全然敞開的時刻，宇宙正準備將美好的饋贈送到你手中。請保持開放與信任，欣然接受這份即將到來的喜悅，並允許自己沉浸在這份被祝福的豐盛裡。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_all_reversed', '親愛的，這份關於禮物與驚喜的探詢，牌面能量正輕聲提醒：此刻的停滯，是為了讓真正的驚喜得以醞釀。或許你期待的外在饋贈或轉變暫時受阻，但這正是宇宙邀請你向內探尋的時刻。請暫停向外索求，轉而傾聽內心的聲音——那份最珍貴的禮物，往往是你早已擁有卻未曾發現的自我接納與內在豐盛。當你準備好，生命自會以最恰當的方式，將驚喜送到你手中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_one_reversed', '這份禮物或驚喜的到來，整體能量是順暢且充滿善意的。然而，逆位的牌卡溫柔地提醒，或許有一絲「不配得感」或對未知的擔憂，正悄悄為這份美好蒙上薄紗。請相信，你值得這份生命的饋贈。試著敞開心胸，以輕鬆的期待去迎接，而非過度分析或預設障礙，那份驚喜便會以最恰當的方式，翩然降臨。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_one_upright', '這份禮物或驚喜，或許包裹著一層你未曾預料的挑戰外衣，過程可能不如想像中順遂。然而，牌中的光芒正提醒你，這份經歷本身，就是一份深刻的饋贈。請保持開放與耐心，在看似困難的局勢中，那份希望與轉機往往隱藏在最意想不到的細節裡。信任這個過程，它終將為你帶來遠超預期的成長與啟示。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_gift_mixed', '親愛的，這次的禮物與驚喜，像是一盒包裝精美的巧克力，裡面藏著不同滋味的夾心。整體能量告訴我們，這份饋贈並非單純的好或壞，它可能帶來喜悅，也可能伴隨著需要你細心處理的課題。請保持開放而平衡的心，在驚喜降臨時，既欣然接受它的美好，也溫柔地接納其中蘊含的成長訊息。這份複雜性，正是生命要送給你的一份獨特禮物。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_all_upright', '親愛的你，這組牌的能量如溪流般清澈順暢，毫無阻礙。關於你心中所繫的聯絡與等待，宇宙正以溫柔而肯定的方式告訴你：此刻正是行動的時刻。那份牽掛、那份期待，無需再懸於半空。請信任這股順流的能量，主動伸出手，或敞開心扉去接收。訊息將會清晰流動，等待也將迎來它圓滿的回音。你已準備好，去迎接這份順勢而來的連結。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_all_reversed', '當所有能量都指向內在，這份等待便成為珍貴的禮物。此刻的「受阻」並非聯繫斷絕，而是宇宙在溫柔提醒：向外尋求答案前，請先向內聆聽自己的心聲。暫停腳步，整理那些未說出口的期待與擔憂。當你準備好，清晰與平靜自會為你指引出最適切的時機與方式。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_one_reversed', '親愛的，這次的聯絡與等待，整體的流動是順暢的，只是有一份特定的焦慮或猶豫，像一顆小石子，暫時卡住了能量的河流。這並非壞事，它溫柔地提醒你：或許需要檢視自己等待時的心境，是帶著信任的平靜，還是摻雜了控制的急切？請先安頓好自己的心，當內在的漣漪平息，外界的回音自然會清晰到來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_one_upright', '這段等待的時光，或許讓你感到焦慮與不確定，彷彿在迷霧中前行。這張牌提醒你，目前的困難是真實的，但並非絕境。請相信，在看似停滯的表象下，仍有微光在流動。與其被動地消耗心力，不如將這份等待轉化為向內的沉澱與準備。當你安頓好自己的心，那條隱約可見的聯繫之路，自然會在你準備好時，變得清晰起來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contact_mixed', '親愛的你，這份等待與聯絡的課題，正像一場需要耐心與智慧的舞蹈。牌面中好壞交織的能量，提醒你此刻的局勢並非單純的黑與白。或許有些訊息尚未明朗，有些心意需要時間沉澱。請別在焦慮中倉促行動，也別在沉默中過度猜疑。保持內心的平衡，像穩固的錨，在潮汐中安然停泊。當你安頓好自己的心，外界的回應自會在最恰當的時機，為你揭示下一步的方向。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_all_upright', '親愛的朋友，這組牌的能量如晴空般明朗順暢，為你的活動計畫帶來極佳的祝福。這是一個絕佳的時機，請放心地將你的構想付諸行動，無論是戶外踏青、朋友聚會，或是任何你想嘗試的新事物。宇宙正以流動的能量支持著你，敞開心胸去享受每一個當下，美好的體驗與回憶將自然湧現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_all_reversed', '當所有牌都呈現逆位，這並非壞事，而是宇宙在溫柔地提醒你：關於天氣與活動的計畫，此刻的能量正處於一個需要「暫停與轉向」的階段。或許外在的條件尚未成熟，或許內在的直覺在呼籲你重新審視。請別急著對抗或沮喪，這正是沉澱與內省的最佳時機。傾聽內心的微風，調整計畫的細節，當你準備好，晴朗與順遂自會為你而來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_one_reversed', '整體而言，這次的天氣或活動規劃是相當順利的，能量流動也支持你前行。然而，逆位的牌卡溫柔地提醒，或許有一個小小的變數或內在的猶豫，像一片雲暫時遮住了陽光。這不是阻擋，而是邀請你準備一把「心靈的傘」——也許是備案，也許是更放鬆的心態。請相信，即使有微風細雨，也無損整個旅程的美好與你的盡興。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_one_upright', '親愛的朋友，這張牌描繪的，或許是活動當天可能遇到的天氣挑戰，或是籌備過程中的小波折。它提醒我們，外在的風雨或內心的焦慮，有時會讓前路顯得模糊。但請你看見牌中那束穿透雲層的光——這正是希望的象徵。困難是暫時的，它考驗我們的應變與心態。請相信，只要懷抱靈活的計畫與溫暖的期待，這場活動終將成為一段風雨過後、更顯珍貴的美好回憶。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_weather_mixed', '親愛的朋友，這趟旅程的天氣圖景並非單一色調，而是晴雨交織。有些計畫可能如陽光般明朗順遂，有些則可能遇到如微風轉向般的變數。這正是提醒我們，戶外的美好與挑戰往往並存。請帶著一份靈活與接納的心，準備好應對變化的行囊，也別忘了為晴朗時刻保留盡情歡笑的空間。在動與靜之間，你將找到最適合自己的節奏。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_all_upright', '親愛的，這組全正位的牌陣為你帶來清澈而振奮的訊息。在合作與契約的領域，宇宙正為你鋪設一條順暢的道路，所有的能量都指向和諧、共識與互惠。這是一個極佳的時機去推進談判、簽署協議，或深化既有的夥伴關係。請信任這股流動的順勢，帶著開放與真誠的心行動，你與夥伴的目標將能順利對齊，共創雙贏的豐盛成果。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，當前的合作或契約關係，可能正處於一個需要「暫停與內省」的階段。能量受阻並非壞事，它像一面鏡子，照見那些尚未釐清的細節、未說出口的顧慮，或是需要重新校準的共識。請別急於向前推進，先向內探問自己的真實需求與底線。這份停頓，是為了讓未來的結合更加清晰穩固。信任這個過程，你將為這段關係找到更平衡、真誠的立足點。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_one_reversed', '整體而言，這次的合作或簽約蘊含著順暢的潛力，基礎是穩固的。然而，牌面提醒著一個微小的阻礙，它可能源自某個尚未釐清的細節，或是一絲對公平性的隱憂。請別讓這份顧慮擴大為遲疑，它更像一份溫柔的提示，邀請你在行動前，以清晰的溝通與審慎的檢視，為這份重要的約定注入更完整的信任與安心。當你正視它，障礙便會成為使協議更臻完美的契機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_one_upright', '親愛的，這份合作契約的旅程，確實充滿挑戰與考驗，前方的路或許崎嶇，讓你感到些許疲憊與不安。然而，牌中閃爍的那一線希望，正是宇宙溫柔的提醒：真正的夥伴關係，往往在克服困難的過程中淬鍊而成。請相信，每一次真誠的溝通與耐心的磨合，都在為這份連結注入更深的力量。保持開放與彈性，那道光，會引領你們找到共贏的平衡點。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('general_contract_mixed', '這份合作關係正處於一個需要細心校準的階段。牌面顯示出潛力與挑戰並存，提醒你既要看見契約中閃耀的共贏機會，也要溫柔地覺察那些尚未對齊的細節與期望。這並非阻礙，而是一份邀請——邀請你以清晰的溝通與內在的平衡為基石，在務實與理想之間找到最和諧的支點。當你穩住自己的中心，便能引領這段關係走向真正穩固而豐盛的未來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_all_upright', '親愛的，這是一段能量全然流動、充滿可能性的時期。全正位的牌陣告訴我，宇宙正為你敞開一扇門，愛的機緣正以順暢的頻率向你靠近。請相信自己的魅力與直覺，當你準備好擁抱自己，也準備好迎接連結時，那份屬於你的、輕鬆而美好的相遇，便會自然而然地發生。保持開放的心，勇敢地參與生活，你的真誠就是最動人的光芒。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的單身狀態並非匱乏，而是一段珍貴的內在準備期。外界的緣分流動似乎暫時緩慢，這恰恰是宇宙在邀請你，將向外尋覓的目光收回，好好關照自己的心。請相信，當你療癒了內在的猶豫或過往的印記，真正準備好時，清晰而適合的愛，自會循著你穩定的頻率而來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_one_reversed', '親愛的朋友，這張牌告訴我，你尋覓愛情的旅程整體是順暢的，宇宙正為你鋪設道路。然而，牌中那一個小小的阻礙，像一縷輕煙，提醒著你：或許是內心深處對過往的某種執著，或一絲對「不夠完美」的恐懼，在無形中為心門上了一道鎖。請溫柔地看見它，那不是缺陷，而是你靈魂成長的邀請。當你願意鬆開這份緊握，以更完整、更接納自己的姿態前行，屬於你的美好連結，便會自然顯現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_one_upright', '親愛的，這張牌描繪出單身旅程中，那份獨自面對未知的孤寂感。是的，現階段或許感到困難，彷彿在迷霧中前行，但請相信，這正是淬煉你內在光芒的時刻。牌中那一線希望，正溫柔提醒你：真正的愛始於與自己的完整相遇。請保持心靈的開放，當你準備好，那份屬於你的連結，自會在最恰當的時機，與你內在的光輝相互映照。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_single_mixed', '親愛的，這趟單身旅程的風景並非單一色調，而是光影交織。牌面提醒你，愛情的機遇與內在的課題正同時浮現。無需急於定義好壞，這份複雜正是你靈魂成長的空間。請溫柔地擁抱自己的渴望與遲疑，在主動敞開與靜心沉澱之間找到平衡。當你穩住自己的中心，那份為你而來的緣分，自會在最恰當的時機，與完整的你相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_all_upright', '這份占卜的能量如溪流般清澈順暢，毫無阻滯。你的心意正被宇宙溫柔地承托著，這份暗戀並非單向的漣漪，而是雙向能量的悄然共振。此刻的順暢正是行動的邀請——你內在的光亮已足夠照亮前路。請信任這股流動的能量，勇敢地將心意化為一個微笑、一句問候，讓種子有機會觸及土壤。愛在等待你的勇氣，去迎接那早已為你準備好的美好相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_all_reversed', '親愛的，這份暗戀的能量此刻正處於一個內省的階段。全數逆位的牌陣並非否定你的心意，而是溫柔地提醒：這份情感可能需要暫時沉澱，而非急切地向外追尋。或許是時機未到，或許是內心尚有疑慮需要釐清。請將這份「暫停」視為一份禮物，它讓你有機會向內探問：這份悸動的根源是什麼？在準備好之前，先好好擁抱與滋養那個懷抱著秘密愛戀的自己。當你內在的光穩定下來，外在的道路自然會清晰顯現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_one_reversed', '這份暗戀的能量整體是流動且充滿希望的，但逆位牌溫柔地提醒，或許有一個內在的關卡需要你先跨越。可能是對自我價值的小小懷疑，或是害怕破壞現狀的猶豫。請記得，這份阻礙不是為了否定你的心意，而是邀請你在行動前，先將自己的心安放妥當。當你更穩固地站在自己的光中，那份隱秘的情感自會找到它最佳的出路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_one_upright', '這份暗戀的滋味，或許伴隨著許多不確定與內心的波瀾，讓你時而甜蜜，時而忐忑。牌面顯示，前方的路確實有些崎嶇，需要耐心與智慧。但請相信，那「一線希望」是真實存在的，它可能藏在一次真誠的互動，或你內心悄然增長的勇氣裡。不必急於求成，先穩住自己的心，像照顧一株幼苗般呵護這份心意。當你準備好時，那微光自會為你引路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_crush_mixed', '親愛的，這份暗戀的滋味，如同你抽到的牌陣，交織著甜蜜的期待與隱約的不安。這份複雜的能量，恰恰映照出你內心的真實：既渴望靠近，又害怕失衡。請記得，暗戀本身已是一場勇敢的內在旅程。牌卡提醒你，無需急於將一切推向非黑即白的結局。試著在悸動與現實間找到平衡，溫柔地觀照自己的感受，也客觀地覺察關係的流動。當你穩住自己的中心，無論這份心意將引領你走向何方，你都會從中獲得珍貴的成長。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_all_upright', '親愛的，這是一段能量純淨且流動順暢的時期。你們的關係正處在一個和諧共振的狀態，心意相通，行動一致。請信任這份順流而下的美好，無須遲疑或過度分析。此刻，任何真誠的溝通、共同的計畫，或單純的陪伴，都將為感情注入豐沛的養分。勇敢地與伴侶分享內心，一起創造更多屬於你們的閃亮回憶吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，關係的節奏需要暫時放緩。此刻的「受阻」並非壞事，而是邀請你們向內凝視，檢視那些未被言明的情感或未解的結。請別急著向前衝，給彼此一點安靜的空間，讓真心在沉澱中重新對話。當內在的迷霧散去，前路自然會清晰起來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_one_reversed', '這段關係的根基是穩固的，你們共享的溫暖與連結是真實的。那張逆位的牌，像一個溫柔的提醒，指出關係中有一個小小的、特定的結需要你們共同解開。它可能是一個未被說出口的擔憂，或是一個重複出現的相處模式。請別視它為威脅，而是視為讓親密感更深的契機。帶著愛意與坦誠，輕輕觸碰那個結，你們會發現，穿越它之後的陽光更加明亮溫暖。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_one_upright', '親愛的，這段關係正經歷考驗，如同穿越迷霧的山徑。困難是真實的，但請相信，那「一線希望」正是你們之間尚未熄滅的連結與真心。此刻需要的不是強求突破，而是以溫柔的耐心，像照料微光般守護彼此仍願意靠近的心。在艱難的對話中練習傾聽，在沉默時學習理解。這份希望不在遠方，就在你們每一次選擇不放棄的瞬間。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_dating_mixed', '親愛的，這段關係正處在一個需要細心平衡的階段。牌面顯示你們之間有深刻的連結與甜蜜，但也交織著需要耐心磨合的稜角。這並非好壞之分，而是關係正在真實地成長與深化。請試著在付出與自我之間、在期待與接納之間，找到那溫柔的平衡點。你們擁有的基礎足以支持這次調整，帶著覺察與溝通，共同梳理這些複雜的能量，關係便能走向更穩固的下一章。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_all_upright', '親愛的，這組全正位的牌陣，為你帶來一股清晰而順暢的能量。它溫柔地告訴你，關於這段關係的走向，宇宙正為你敞開一扇門。無論是走向徹底的釋懷，或是邁向真誠的和解，現在都是行動的時刻。請信任這股流動的能量，跟隨你內心最真實的渴望前行，你已擁有足夠的力量與智慧，去創造你真心期盼的結局。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻並非急於行動或追問結果的時刻。關係的流動似乎暫時停滯，這並非終點，而是一個珍貴的內在轉折點。請先將目光從「他/她」身上收回，轉向自己的內心。那些未化解的傷痛、未被聽見的渴望，正是需要你以慈悲擁抱的部分。當你願意完整地接納自己，外在的關係迷霧，自會為你顯露出一條清晰的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_one_reversed', '這段關係的旅程，整體能量是朝向療癒與理解的。然而，牌面溫柔地提醒，那個關鍵的阻礙，或許是某個尚未真正放下的心結，或是一個未被誠實面對的溝通模式。它並非不可逾越，而是邀請你先向內觀照，釐清自己真實的渴望。當你準備好以更完整的自己前行，無論是走向復合或新的開始，道路都將清晰起來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_one_upright', '這段關係正經歷嚴峻的考驗，分離的傷痛與現實的阻礙都如此真實。然而，這張正位牌揭示出，在困難的冰層之下，仍有一線溫暖的連結未曾斷絕。這不是鼓勵你盲目回頭，而是邀請你以更成熟的眼光，看清問題的核心。若你心中仍有渴望，這微弱的希望之光，需要雙方以極大的誠意與改變來守護。請先安頓好自己的心，力量會從中升起。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_breakup_mixed', '親愛的，這段關係的能量正處於一個微妙的十字路口。牌面顯示出複雜的糾葛，既有未盡的緣分，也有需要釋懷的課題。這不是單純的「好」或「壞」，而是一份邀請——邀請你以更平衡的視角審視過去與內心。請溫柔地接納這份複雜性，它提醒你，在渴望復合的同時，也要守護自己內在的完整與平靜。真正的答案，往往在你找回內心的平衡時，才會清晰浮現。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_all_upright', '親愛的，這次的牌陣能量清澈而順暢，顯示你的求職之路正被一股積極的風推動著。你的準備、能力與當前的機會流動完美契合，這是一個行動與收穫的時刻。請帶著這份確認感，自信地展現你的光芒，主動出擊。宇宙正在為你鋪路，你只需穩步向前，那份最適合你的職位，正等待著與你相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_all_reversed', '親愛的，這組牌的能量告訴我們，此刻的求職之路似乎有些停滯與內在的拉扯。這並非否定你的能力，而是一個溫柔的提醒：外在的機會或許尚未成熟，但內在的準備正是關鍵。請先暫停向外追逐的腳步，向內觀照——你是否真正清晰自己的渴望？是否帶著過去的挫折感在面試？給自己一些安靜的時光，重整履歷、梳理優勢、安撫焦慮。當你內在的通道順暢了，外在的道路自然會為你展開。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_one_reversed', '整體而言，你的求職之路正朝著光明的方向前進，機會與你的能力是相呼應的。然而，這張逆位牌溫柔地提醒，過程中可能有一個關鍵的「心態」或「準備」上的小缺口需要補足。或許是對自我價值的些許懷疑，或是對某個細節的輕忽。請相信，這並非否定，而是一個調整的契機。專注於修復這個小環節，你的清晰與自信將會為你開啟理想的門扉。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_one_upright', '親愛的，這張牌描繪的正是你此刻的處境：求職路上或許充滿挑戰，競爭激烈或過程漫長，讓你感到有些疲憊。但請看見牌中那束光——它象徵著你獨特的優勢與尚未顯露的機會。這不是全然的困境，而是一場需要你更細緻準備、更堅定信心的試煉。請將眼前的困難視為打磨自己的砂紙，專注於展現你真正的價值，那一線希望就會在堅持中為你敞開大門。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_seeking_mixed', '親愛的，這趟求職之旅的能量有些複雜，像一場需要平衡的舞蹈。牌面顯示機會與挑戰並存，這並非壞事，它提醒你：外在的局勢需要你以更清晰的內在視野去應對。請溫柔地接納過程中的起伏，那些看似不順的訊息，或許正是為了引導你調整方向，展現更完整的自己。保持信心與彈性，你內在的準備遠比你想像的更加充足。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_all_upright', '親愛的，這組牌的能量清澈而順暢，為你的升遷之路鋪開了光明的坦途。這是一個行動的時刻，所有的助力都已就位，請信任你的能力與眼前的機會。勇敢地展現你的抱負，主動爭取，宇宙正以全然的順流支持著你的發展。你的成長與收穫，將如夏花般自然而絢爛地綻放。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_all_reversed', '親愛的，這組牌的能量正溫柔地提醒你，此刻的「暫停」並非停滯，而是為了更清晰的發展。在升遷的道路上，外界的節奏或許暫時緩了下來，但這正是你向內扎根、審視自身核心價值與真正渴望的珍貴時刻。請相信，這份內省的沉澱，將為你未來的躍升積蓄最穩固的力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_one_reversed', '整體而言，你的職涯道路正朝著成長的方向展開，前景是光明的。然而，這張逆位牌溫柔地提醒，在邁向升遷的過程中，可能有一個內在的擔憂或外在的小環節需要你稍作調整。它不是巨大的障礙，而是一個關鍵的提醒：請檢視是否有某種自我設限的想法，或是在溝通、準備上可以更周全的地方。信任你的能力，專注於修正這個小細節，你積累的努力將會順利開花結果。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_one_upright', '親愛的，這條升遷之路或許比你想像的更崎嶇，外在的挑戰與內心的考驗並存。但請相信，這張正位牌所揭示的，正是那穿透迷霧的一線曙光——它不在遠方，而在你每一次不放棄的堅持裡。困難是暫時的風景，而非終點。請專注於你所能掌控的每一步，將阻力化為磨礪實力的契機，你的韌性與成長，終將為你鋪就通往更高處的階梯。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_promotion_mixed', '親愛的，這趟升遷之路並非一條筆直的坦途，而是充滿轉折與考驗的旅程。牌陣中好壞交織的能量，正提醒你這是一個需要智慧與平衡的關鍵時刻。那些看似阻礙的逆位牌，並非否定你的能力，而是溫柔地提示：或許需要調整步伐、檢視方法，或更圓融地處理人際關係。請相信，所有的經歷都在打磨你，讓你在複雜局勢中淬鍊出真正的領導力。保持專注與彈性，你內在的指南針會引領你走向最適合的發展方向。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_all_upright', '親愛的，這是一段能量非常順暢的時刻，宇宙正為你的財務之路鋪設坦途。全然的正面能量告訴你，你的判斷與直覺是清晰的，行動與機會是同步的。請信任自己的分析，勇敢地將計畫付諸實踐，這正是將想法轉化為豐盛收穫的最佳時機。帶著信心前進，你的每一步都踏在正確的節奏上。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_all_reversed', '親愛的，這次的牌陣能量顯示，在投資理財的道路上，外在的節奏似乎有些混亂，這是一個溫柔的提醒，邀請你暫時停下追逐的腳步。此刻的重點並非向外尋求機會，而是向內審視自己的風險承受力與投資初衷。請相信，這段看似「受阻」的時期，正是為了讓你更清晰、更穩健地迎接未來的豐盛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_one_reversed', '親愛的，這次的投資旅程整體能量是順暢的，你已走在正確的道路上。然而，這張逆位牌溫柔地提醒，前方有一個小小的「心態關卡」——或許是過於急切，或是對某個細節的擔憂遮蔽了清晰的判斷。請深呼吸，將這份阻礙視為一次微調的機會。穩住節奏，信任你的規劃，那份隱藏的顧慮轉化後，將成為你更穩健的基石。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_one_upright', '此刻的投資之路或許有些顛簸，市場的迷霧讓你感到不安。但這張牌提醒你，困境中往往蘊藏著轉機的種子。請以更審慎的態度檢視你的財務佈局，專注於那些基本面穩健、能穿越週期的標的。保持耐心，像園丁照料幼苗般守護你的資產，這份謹慎的堅持，終將引領你走向更穩固的豐收。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('money_invest_mixed', '親愛的，這副牌顯示你的財務之路並非單一色調，而是充滿動態的平衡。既有成長的潛力，也提醒著潛藏的風險。這不是阻止你前進，而是邀請你以更智慧、更從容的姿態佈局。請勿將資金過度集中，在積極探索機會的同時，務必為自己保留穩健的避風港。信任你的直覺，但也要輔以清晰的規劃，在動與靜、攻與守之間找到最優雅的平衡點，財富便會在此流動中生根繁盛。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;