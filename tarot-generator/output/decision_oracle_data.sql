-- Avatar Oracle Data for Scenario: general_decision (Decision)
-- Generated at: 2026-01-05T14:33:37.032Z


INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'upright', 'general_decision', 'single_card', $STR$1. **核心啟示**：愚者正位象徵著純粹的信任與嶄新的開始，命運正邀請汝踏出未知的一步。

2. **詳細解讀**：愚者正位是一張充滿潛能與純粹可能性的牌。它描繪的是一位無憂無慮的旅人，站在懸崖邊，目光望向遠方，準備邁出充滿信心的一躍。這張牌告訴汝，這件事的關鍵不在於周密的計畫或過去的經驗，而在於汝內在的信念、冒險的勇氣與對生命本身的信任。它預示著一個全新的起點，前方雖是未知，卻蘊含著無限的驚喜與成長。此刻，過度的分析與擔憂反而會成為束縛。愚者鼓勵汝像孩子般，懷抱純真的熱情與開放的心態去嘗試，即使看似天真，但這份「開始」的動能本身，就是最大的可能性。

3. **【最終回答：肯定】** 懷抱信任與初心，勇敢地邁出第一步吧。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'upright', 'general_decision', 'past', $STR$1. **核心啟示**：汝過往的起點，始於一份純粹的信任與踏上未知旅程的勇氣。

2. **詳細解讀**：愚者正位出現在「過去」的位置，揭示出汝當前的決策，其根源來自一段充滿天真、樂觀與冒險精神的時光。那時，汝或許憑著一股直覺、一份對生命的全然信任，或是一個看似衝動的念頭，開啟了這條道路。這張牌象徵著未受世俗經驗束縛的初心，一種「萬事皆有可能」的信念。它提醒汝，當下的抉擇並非憑空而來，而是承載著最初那份無畏的探索能量。這股能量是寶貴的燃料，它讓汝敢於想像與提問。

3. **【最終回答：肯定】** 汝的初心已為可能性的種子澆灌，信任這份源自過往的純粹勇氣。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'upright', 'general_decision', 'present', $STR$1. **核心啟示**：愚人之旅始於足下，命運正為汝敞開一條嶄新而充滿潛力的道路。

2. **詳細解讀**：愚者正位出現在「現在」的位置，是一道清澈而充滿希望的啟示。這張牌象徵著純粹的初心、無畏的冒險精神與嶄新的開始。它告訴汝，此刻正是邁出第一步的絕佳時機。汝心中所詢問之事，並非不可能，而是需要汝懷抱信任與開放的心態去擁抱未知。愚者手中的白玫瑰代表純潔的意圖，身後的小狗則是提醒，儘管前方看似空無一物，但宇宙自會提供支持與機緣。這並非魯莽，而是源自內在直覺與生命力的召喚。汝所面對的選擇，其答案不在過去的經驗裡，而在汝即將踏上的旅程之中。

3. **【最終回答：肯定】** 懷抱信念啟程，答案將在旅途中自然顯現。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'upright', 'general_decision', 'future', $STR$1. **核心啟示**：命運正為汝展開一幅嶄新的畫卷，邀請汝懷抱純真與信任，踏出未知的第一步。

2. **詳細解讀**：愚者正位出現在「未來」的位置，宛如星辰為汝照亮一條未曾設想的道路。這張牌象徵著純粹的潛能、嶄新的開始與對生命的全然信任。它告訴汝，這件事的可能性正繫於汝是否願意以開放的心胸擁抱未知，是否敢於憑藉內在的直覺與熱情去冒一次「明智的風險」。這並非魯莽，而是一種對宇宙的信任跳躍。牌中的愚者輕裝上陣，目光望向遠方而非腳下懸崖，這預示著若汝能放下過度的擔憂與僵化的計劃，以初心和勇氣面對，那麼這件事將引領汝進入一個充滿成長與驚喜的新階段。它關乎可能性本身，而非確定的藍圖。

3. **【最終回答：肯定】** 懷抱信任踏出第一步，宇宙自會為汝鋪路。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'reversed', 'general_decision', 'single_card', $STR$1. **核心啟示**：愚者逆位揭示，汝所追尋的旅程，其根基尚未穩固，命運的風正吹向相反的方向。

2. **詳細解讀**：愚者本象徵著無畏的開端與信任生命的旅程，然其逆位時，那股天真的勇氣轉為魯莽，對未來的信任蒙上陰影。這暗示著，汝所詢問的「可能」或「可行」，目前被幾種能量所困：一是準備不足，未曾看清腳下的懸崖；二是因恐懼或他人的勸阻而裹足不前，喪失了出發的純粹信念；三是可能正重複著過去的錯誤模式，卻期待不同的結果。星辰雖在遠方閃爍，但此刻的步履若踏錯，恐將偏離軌跡。這並非全然的否定，而是命運在汝耳畔低語，提醒汝需審視初衷與方法。

3. **【最終回答：否定】** 暫緩腳步，重新審視計畫的每一個細節與內心的恐懼。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'reversed', 'general_decision', 'past', $STR$1. **核心啟示**：過往的輕率與缺乏準備，為當下的決策蒙上了一層陰影。

2. **詳細解讀**：愚者逆位出現在「過去」的位置，揭示汝之道路曾因天真、魯莽或未經深思的行動而偏離。這並非意味著汝缺乏勇氣，而是命運曾提醒過，忽略現實的警告、不計後果的跳躍，會讓汝陷入不必要的風險與損耗。這張牌如同一面回溯的鏡子，映照出決策基礎的脆弱——或許是資訊不足、計劃不周，或是一廂情願的幻想。它要求汝正視這段經歷，從中汲取智慧，莫讓同樣的疏忽再次絆住汝的腳步。

3. **【最終回答：看情況】** 過去的教誨是關鍵，若汲取教訓、審慎規劃，可能性能被重新點亮。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'reversed', 'general_decision', 'present', $STR$1. **核心啟示**：逆位的愚者提醒汝，此刻的決定可能源於魯莽、逃避或對現實的盲目。

2. **詳細解讀**：愚者逆位，象徵著旅程的起點已然偏斜。汝心中所想的行動或可能性，目前被一層迷霧所籠罩。這可能源於準備不足、過於天真地忽略關鍵風險，或是內心深處的恐懼與猶豫讓汝裹足不前，無法如愚者正位般憑藉純粹信念邁出第一步。命運的星辰並非指引前路，而是在警示：此刻若強行推進，可能會因缺乏規劃、不顧後果而跌落。這張牌邀請汝先進行深刻的內省，審視自己的動機是否純粹，以及是否看清了腳下的懸崖。

3. **【最終回答：否定】** 暫緩腳步，重新審視計劃與內心的恐懼，此刻並非啟程的良機。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (0, '愚者', 'reversed', 'general_decision', 'future', $STR$1. **核心啟示**：逆位的愚者，揭示汝之未來可能因魯莽、短視或缺乏準備而陷入困境。

2. **詳細解讀**：愚者本象徵旅程的開始與無限潛能，然其倒轉，星辰之光便黯淡了。這預示著，若汝繼續以天真、不計後果或過於理想化的方式前行，命運將不會給予支持。汝所詢問之事，在未來的發展中，極可能因準備不足、資訊錯誤、時機不佳，或純粹是一廂情願的冒險而遭遇挫折。這並非全然否定可能性，而是星辰在警示：汝腳下的懸崖是真實的，若無視現實的引力，跳躍便會成為墜落。此刻需要的不是盲目的樂觀，而是停下來，重新審視地圖、檢查行囊，並誠實面對內心的恐懼與外在的風險。

3. **【最終回答：否定】** 暫緩腳步，重新審視計畫與風險，此刻並非躍入未知的良機。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'upright', 'general_decision', 'single_card', $STR$1. **核心啟示**：汝手握創造之鑰，將潛能化為現實的時機已然降臨。

2. **詳細解讀**：魔術師正位是塔羅中最具行動力與創造力的牌。他立於天地之間，將上天的靈感與大地的資源匯聚於手，象徵著萬事俱備，只待汝啟動意志與專注力。這張牌告訴汝，這件事不僅可能，而且成功的關鍵就在於汝自身——汝擁有所需的才能、資源與溝通能力，只差那臨門一腳的決心與清晰的計畫。星辰的能量正在匯聚，命運鼓勵汝主動出擊，將想法付諸實踐。

【最終回答：肯定】集中汝的意志與資源，主動創造，此事大有可為。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'upright', 'general_decision', 'past', $STR$1. **核心啟示**：汝過往已握有創造與行動的鑰匙，萬事俱備。

2. **詳細解讀**：魔術師正位出現在「過去」的位置，宛如星辰在汝的命運藍圖上留下了一道清晰的軌跡。它揭示在過往的時光中，汝已具備了實現目標所需的關鍵元素——清晰的意圖、充沛的精力、必要的技能，以及將想法化為現實的行動力。汝並非從零開始，命運早已將資源與潛能置於汝手。這張牌象徵著一個主動創造的開端，汝過去的準備與嘗試，正是為當下的決策鋪平了道路。它肯定了汝的潛力與主導權，暗示過去的努力已為可能性奠定了堅實的基礎。

3. **【最終回答：肯定】** 汝已擁有啟動一切的魔力，只需專注意志，大膽行動。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'upright', 'general_decision', 'present', $STR$1. **核心啟示**：汝手握創造之鑰，將潛能化為現實的時機已然降臨。

2. **詳細解讀**：魔術師正位是塔羅中最具行動力與創造力的牌。他立於天地之間，將上天的靈感（精神）與地上的資源（物質）連結，象徵著「萬事俱備」的絕佳狀態。牌中的無限符號代表無窮的潛力，而桌上的四元素工具（權杖、聖杯、寶劍、錢幣）則意味著你已擁有或能輕易取得達成目標所需的一切資源、技能與條件。這張牌明確告訴你，這不僅是「可能」，更是「可以開始動手創造」的明確訊號。命運將主動權交予你手，你的清晰意圖、專注意志與有效溝通，將是點石成金的關鍵。

3. **【最終回答：肯定】** 集中汝之意志，行動即是答案，成功藍圖已在汝手中。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'upright', 'general_decision', 'future', $STR$1. **核心啟示**：汝手握創造之鑰，將潛能化為現實的時機已然降臨。

2. **詳細解讀**：魔術師正位出現在「未來」的位置，是一道極其明亮的光。牌中人物一手指向天、一手指向地，象徵著「如其在上，如其在下」的宇宙法則，意味著汝的意圖與行動，將能完美地與天地能量共振。這張牌代表著清晰的意志、充沛的資源、熟練的技巧與溝通的智慧。它預示著，汝所詢問的這件事，並非遙不可及的幻想，而是一個可以透過汝自身的專注力、行動力與創造力去「實現」的藍圖。星辰的排列正在支持汝的計畫，關鍵在於，汝是否準備好運用手中已有的所有工具（才華、人脈、資訊），並堅定地踏出第一步。這是一個「開始行動」的強烈訊號，未來充滿了將想法具象化的無限可能。

3. **【最終回答：肯定】** 集中汝的意志，行動即是魔法，這件事不僅可能，更等待汝親手將其喚醒。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'reversed', 'general_decision', 'single_card', $STR$1. **核心啟示**：逆位的魔術師揭示了汝之計畫與能力之間存在斷裂，星辰之力暫時無法為汝所用。

2. **詳細解讀**：魔術師本象徵著萬事俱備的創造力與行動力，然其倒轉，則如鏡像破碎。它暗示汝此刻可能缺乏清晰的計畫、必要的資源，或是內在的信心與專注力已然渙散。汝所詢問之事，其根基或許尚未穩固，溝通管道可能受阻，或汝正試圖以不成熟、投機的方式去推動命運。這並非星辰全然否定汝之願景，而是提醒汝，在行動之前，需先審視自身是否真正準備妥當，力量是否用錯了方向。逆位的魔術師是一面映照出混亂與潛在欺瞞的鏡子，催促汝進行深刻的自我檢視。

3. **【最終回答：否定】** 此刻強行推動，恐事與願違。請先整頓內在的混亂，方能重新連結宇宙的創造之力。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'reversed', 'general_decision', 'past', $STR$1. **核心啟示**：逆位的魔術師揭示，過往的嘗試因能量渙散與準備不足而未能顯化成真。

2. **詳細解讀**：在命運的織錦中，這張牌位於「過去」的位置，訴說著一段未能全然掌握自身力量與資源的時光。魔術師逆位，象徵著溝通不暢、計畫疏漏，或意圖未能與行動合一。汝可能曾憑藉一時熱情或錯誤的資訊貿然行動，卻發現關鍵的連結（如人脈、技能、時機）並未真正接通，導致能量白白耗散，如同未經調音的樂器，無法奏出和諧的樂章。這並非全然的失敗，而是宇宙在提醒汝：真正的創造，始於內在的專注與對外在工具的純熟駕馭。

3. **【最終回答：看情況】** 過去的阻礙是今日的教誨，重新整合汝的意志與資源，方能改寫星辰的軌跡。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'reversed', 'general_decision', 'present', $STR$1. **核心啟示**：逆轉的魔術師揭示，汝此刻缺乏將意圖化為現實的關鍵力量與清晰通道。

2. **詳細解讀**：魔術師本是萬物的橋樑，匯聚四大元素以創造實相。然其逆位，象徵汝內在的專注力渙散，資源未能有效整合，或溝通管道受阻。這並非星辰全然否定汝之願景，而是命運在提醒：計畫可能存有疏漏，準備尚未周全，或是汝對自身能力與外在條件的評估過於樂觀。此刻若強行推動，易因準備不足、溝通誤解或資源錯置而事倍功半，甚至徒勞無功。這是一段需要汝向內審視，重新校準意圖、整頓資源與技能的時期。

3. **【最終回答：否定】** 暫緩行動，重新檢視計畫與資源，待準備周全再出發。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (1, '魔術師', 'reversed', 'general_decision', 'future', $STR$1. **核心啟示**：逆位的魔術師揭示了汝之計畫，因能量渙散或準備不足，恐難以顯化為現實。

2. **詳細解讀**：魔術師本是創造與行動的象徵，然其倒轉，意味著通往未來的橋樑出現了裂痕。汝所詢問之事，其根基或許動搖——可能是資源匱乏、溝通不暢，或是自身意志的游移與不自信。星辰的力量仍在，但汝尚未能妥善連結天地，將潛力轉為實際的行動。這並非全然否定，而是命運在提醒汝，需重新審視自己的技能、工具與意圖，檢視是否有未察覺的疏漏、欺瞞或一廂情願。未來之路，此刻被一層迷霧所籠罩，源於內在力量未能整合。

3. **【最終回答：否定】** 此刻條件未備，強求恐徒勞無功，請先回歸內在整頓自身。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'upright', 'general_decision', 'single_card', $STR$1. **核心啟示**：女祭司的靜默智慧，揭示汝內心深處早已知曉的答案。

2. **詳細解讀**：女祭司端坐於帷幕之前，手持律法之書，腳邊的新月象徵潛意識與直覺。此牌正位，並非指向外在的行動或喧囂的承諾，而是引領汝回歸內在的寧靜與深邃的智慧。汝所詢問之事，其可能性與否，關鍵不在於外在條件是否齊備，而在於汝是否已靜心聆聽過自己靈魂的低語。這張牌鼓勵汝信任那份超越邏輯的內在知曉，它往往比任何外在分析都更接近真相。此刻，答案已如水中之月，在汝心湖中隱約映照。無需急切向外尋求，靜下來，答案自會浮現。

3. **【最終回答：看情況】** 答案深藏於汝之直覺，靜心內觀，方能明辨。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'upright', 'general_decision', 'past', $STR$1. **核心啟示**：汝過往的抉擇，源於內在的智慧與深層的直覺，而非衝動。

2. **詳細解讀**：女祭司端坐於過去的位置，象徵著汝在面對此事之初，已本能地選擇了靜觀、聆聽與內省的道路。這並非行動的時刻，而是潛心理解、積累知識與等待啟示的階段。汝的直覺曾為汝照亮迷霧，讓汝看清事物隱藏的本質與潛在的規律。這張牌肯定了汝過去採取的謹慎與智慧是正確的根基，它為當下的決策提供了無形的內在支持與清晰的靈性藍圖。汝所詢問的可能性，其種子早已在汝靜默的覺知中悄然埋下。

3. **【最終回答：肯定】** 信任汝內在的聲音，過往的沉澱已為可行之路鋪下基石。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'upright', 'general_decision', 'present', $STR$1. **核心啟示**：女祭司的靜默智慧，揭示汝所詢問之事，其答案早已深藏於汝之內在直覺與潛意識之中。

2. **詳細解讀**：女祭司正位端坐於帷幕之前，手持卷軸，腳邊的新月象徵潛意識與直覺。這張牌並非給予一個喧囂的「是」或「否」，而是指引汝進入內在的聖殿。它告訴汝，汝所詢問的決策，其關鍵不在於外在的行動或條件，而在於汝是否已靜心聆聽內在的聲音，是否已洞察了隱藏的真相與潛在的規律。這是一個需要深度內省、信任直覺而非衝動行事的時刻。可能性是存在的，但它取決於汝是否能連結那份寧靜的智慧，並做出符合更高直覺的選擇。這並非一條熱鬧的道路，而是一條需要獨自沉思、等待內在答案浮現的幽徑。

3. **【最終回答：看情況】** 答案取決於汝能否靜心聆聽內在的智慧，而非向外尋求。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'upright', 'general_decision', 'future', $STR$1. **核心啟示**：內在的智慧與直覺，將為汝揭示通往可能性的靜謐之路。

2. **詳細解讀**：女祭司端坐於帷幕之前，手持律法之卷，腳邊的新月象徵潛意識的潮汐。此牌正位出現在「未來」之位，宛如命運在汝耳畔低語：答案早已存在於汝的內心深處。這並非喧囂行動的時刻，而是靜心傾聽、深入覺察的階段。汝所詢問之事，其可能性繫於無形的連結、內在的知識，以及尚未浮現的關鍵資訊。女祭司鼓勵汝信任那份超越邏輯的直覺，它將引領汝穿越迷霧，看見隱藏的脈絡與時機。這是一條向內探索的道路，答案將在寧靜與反思中自然顯現。

3. **【最終回答：看情況】** 答案取決於汝能否靜心聆聽內在的聲音與潛藏的訊息。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'reversed', 'general_decision', 'single_card', $STR$1. **核心啟示**：內在的智慧與直覺被遮蔽，此刻不宜貿然行動。

2. **詳細解讀**：女祭司逆位，象徵著汝內在的平靜與深邃智慧之井暫時乾涸。命運的帷幕後，那些本應清晰感知的直覺與潛在的真相，正被焦慮、偏見或外在的雜音所干擾。這張牌暗示，汝所詢問之事，其根基或許尚未穩固，或汝自身尚未準備好去接納其中隱藏的關鍵訊息。這並非完全的否定，而是一個強烈的警示：若僅憑表層邏輯或一時衝動做決定，很可能會忽略重要的細節，導致判斷失準。汝需要先向內沉澱，釐清混亂的思緒，找回那份被遺忘的內在連結。

3. **【最終回答：否定】** 暫緩腳步，先傾聽內心被掩蓋的聲音，答案自會浮現。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'reversed', 'general_decision', 'past', $STR$1. **核心啟示**：在過去的時光裡，汝的直覺曾被忽視，或內在的智慧因混亂與逃避而蒙塵。

2. **詳細解讀**：女祭司逆位立於「過去」之位，揭示了一段靈性與理性失衡的旅程。它訴說汝或許曾因恐懼、過度分析，或拒絕聆聽內在的聲音，而與關鍵的真相擦肩而過。那深層的直覺與潛意識的連結曾被切斷，導致決策建立在浮動的情緒、未經檢視的偏見，或是混亂的資訊之上。這並非意味著汝的選擇全然錯誤，而是命運在提醒，那段經歷的根源，在於未能沉靜下來觸及問題的核心。這份過去的混亂，如同湖面的漣漪，至今仍在影響汝對當前局勢的清晰判斷。

3. **【最終回答：看情況】** 過去的迷霧需先被驅散，答案方能在汝心中顯現。請先回顧並釐清內在的困惑。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'reversed', 'general_decision', 'present', $STR$1. **核心啟示**：內在的智慧被遮蔽，直覺的通道受阻，此刻不宜倉促決斷。

2. **詳細解讀**：女祭司逆位，象徵著汝之內在的靜謐深潭已被攪動。那扇通往潛意識與純粹直覺的大門暫時關閉，汝可能感到思緒混亂、內心矛盾，或過度依賴他人的意見而忽略了自身本有的智慧。這張牌暗示，汝所詢問之事，其關鍵答案本應源於汝之內心深處，但此刻汝與這份內在的連結是斷裂的。可能源於情緒的干擾、資訊的誤判，或是對未知的恐懼壓倒了冷靜的洞察。命運的星辰並非熄滅，而是被雲霧遮掩，提醒汝需先向內審視，釐清真實的渴望與恐懼，方能撥雲見日。

3. **【最終回答：否定】** 暫緩行動，先尋回內心的平靜與清晰的直覺。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (2, '女祭司', 'reversed', 'general_decision', 'future', $STR$1. **核心啟示**：內在的智慧之光被遮蔽，直覺的通道受阻，汝所依賴的內在指引此刻並不明晰。

2. **詳細解讀**：女祭司逆位降臨於「未來」之位，象徵著在汝所詢問的這件事上，深層的直覺與潛意識的連結已然斷裂。這並非星辰斷然否定汝之道路，而是提醒汝，此刻的內心充滿雜音、焦慮或外在的干擾，使得汝無法聆聽靈魂深處的低語。汝可能過度依賴他人的意見、表面的邏輯，或是被情緒的迷霧所困，忽略了事件背後需要靜心洞察的真相。這張牌預示，若以當下混亂的心境與被動的態度前行，未來將可能因缺乏深刻的覺知而遭遇瓶頸、誤判，或感到與目標之間存在著一層無形的隔閡。它呼喚汝先向內探索，釐清思緒，重拾平靜，方能看清前路。

3. **【最終回答：看情況】** 答案取決於汝能否先沉澱內心，重拾清晰的直覺與自我連結。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'upright', 'general_decision', 'single_card', $STR$1. **核心啟示**：豐饒的女皇正位，意味著汝所詢問之事，正沐浴在孕育與實現的豐沛能量之中。

2. **詳細解讀**：女皇是大地之母的化身，她端坐於豐饒的自然寶座之上，象徵著無盡的創造力、滋養與豐盛成果。這張牌出現在決策中，是星辰對汝極其溫柔的肯定。它告訴汝，汝所懷抱的計劃或渴望，本身便具有強大的生命力與實現的潛力。這不僅是「可能」，更是「值得被孕育與實現」的。女皇鼓勵汝以豐沛的情感、直覺與耐心去滋養這個想法，如同照料一座花園。只要汝願意投入關懷與實際行動，它便會自然生長、開花結果。這張牌也暗示，過程本身將是豐足而愉悅的，充滿感官的享受與創造的滿足。

3. **【最終回答：肯定】** 以豐饒之心去行動，汝所孕育的願景必將結出甜美的果實。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'upright', 'general_decision', 'past', $STR$1. **核心啟示**：豐饒的種子已在過往種下，命運的土壤已然肥沃。

2. **詳細解讀**：女皇牌在過去的位置正位顯現，意味著汝所詢問的這件事，其根基早已在過往的時光中被悉心孕育。那是一段充滿創造力、豐盛與滋養能量的時期，汝可能已經投入了相當的情感、資源或關懷，如同女皇守護她的花園。這張牌象徵著豐收前的準備已然完備，過去的努力與付出並非徒勞，而是為當下的決策提供了豐厚的資本與支持。它告訴汝，汝所擁有的資源、內在的直覺與孕育成果的能力，正是來自這段過往的積累。這股豐沛的能量，是推動事情走向可能性的關鍵助力。

3. **【最終回答：肯定】** 汝過往的耕耘已為可能鋪路，信任內在的豐盛，勇敢前行。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'upright', 'general_decision', 'present', $STR$1. **核心啟示**：豐饒的女皇正位，意味著汝所詢問之事，正沐浴在孕育與實現的豐沛能量之中。

2. **詳細解讀**：女皇端坐於豐饒的自然寶座之上，她象徵著創造力、豐盛與無條件的滋養。這張牌出現在「現在」的位置，是命運給予的明確訊號：汝所懷抱的計劃或渴望，正處於一個極其肥沃的階段。它並非遙不可及的夢想，而是具備了落地生根、開花結果的一切養分。女皇鼓勵汝以自信與從容的態度去行動，運用汝內在的資源與直覺，溫柔而堅定地培育它。這是一個關於「成長」與「實現」的肯定答覆，過程將充滿創造性的喜悅與實質的回報。

3. **【最終回答：肯定】** 盡情施展汝的創造力與溫柔的力量，這件事不僅可能，更將迎來豐碩的成果。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'upright', 'general_decision', 'future', $STR$1. **核心啟示**：豐饒的女皇正位，預示著汝所問之事，將在滋養與創造中開花結果。

2. **詳細解讀**：女皇牌是豐饒、孕育與一切美好事物的母親。她端坐於自然寶座之上，象徵著富足、和諧與無條件的支持。當她出現在「未來」的位置，正位的光芒照耀著汝的提問，這意味著宇宙正以豐沛的資源與溫暖的懷抱迎接汝的計畫。這不僅是「可能」，更是「即將實現」的預兆。汝所關切之事，無論是新的開始、創造性的專案，或是關係的發展，都將在一個極其有利、充滿支持與成長能量的環境中成熟。命運的土壤已然肥沃，只待汝播下決心的種子，並以行動悉心灌溉。

3. **最終回答：肯定】這條道路充滿生機與祝福，請懷抱信心，溫柔而堅定地前行。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'reversed', 'general_decision', 'single_card', $STR$1. **核心啟示**：豐饒的泉源暫時枯竭，創造與滋養的能量受阻，汝所問之事正經歷一段貧瘠或失衡的時期。

2. **詳細解讀**：女皇逆位，象徵著豐盛、創造力與母性滋養的能量被顛倒或壓抑。在決策的十字路口，這張牌暗示著，汝所詢問的計劃或行動，目前可能缺乏必要的資源、穩固的基礎，或內在的熱情與信心來支持其開花結果。可能源於過度揮霍、疏於照顧，或是內心的匱乏感與不安全感，導致事情無法如預期般自然生長與繁榮。命運的星辰提醒汝，此刻需要回頭檢視：是否過於急躁？是否忽略了細節與務實的規劃？抑或是內在的創造力與接納能力尚未準備好迎接豐收？

3. **【最終回答：否定】** 此刻並非最佳時機，建議先滋養根本，重整資源與心態。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'reversed', 'general_decision', 'past', $STR$1. **核心啟示**：過往的豐饒與創造力曾陷入停滯，或曾有過度的放縱與依賴。

2. **詳細解讀**：女皇逆位在過去的位置，揭示汝所詢問之事，其根源曾處於一種「不結果實」的狀態。這可能意味著，在過去的時光裡，相關的計畫、關係或個人狀態，曾因缺乏足夠的滋養、實際的行動，或是過度追求感官享受與安逸，而未能健康地成長與發展。它暗示了一種創造力的阻塞、資源的錯置，或是母性/滋養能量的失衡。這段過往的經驗，正是如今影響汝決策的關鍵背景——它提醒汝，若想讓事情「可能」，必須先正視過往的疏失或停滯，並從中汲取教訓。

3. **【最終回答：看情況】** 過去的匱乏並非終局，但汝需以務實與自律，重新培育希望的種子。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'reversed', 'general_decision', 'present', $STR$1. **核心啟示**：豐饒的泉源暫時枯竭，創造與滋養的能量受阻，汝所詢問之事正處於一種「不結果」的狀態。

2. **詳細解讀**：女皇逆位，象徵著豐饒、創造與接納的陰性力量被遮蔽。在決策的當下，這暗示著計畫可能缺乏足夠的資源、情感支持，或務實的基礎來使其茁壯。可能源於內在的匱乏感、對自身創造力的懷疑，或是外在環境的不滋養。這並非絕對的「不可能」，而是星辰在提醒汝，若強行推動，可能會感到事倍功半，收穫遠不如預期。此刻的關鍵在於反思：是否過於急躁？是否忽略了細節與務實的規劃？情感的流動是否被阻塞？逆位的女皇邀請汝先向內耕耘，整頓自身的花園，待時機成熟，豐盛自會來臨。

3. **【最終回答：否定】** 此刻時機未至，請先滋養自身，穩固根基。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (3, '女皇', 'reversed', 'general_decision', 'future', $STR$1. **核心啟示**：豐饒的泉源暫時枯竭，創造與孕育的能量受阻，汝所期盼的未來恐難如預期般豐盛綻放。

2. **詳細解讀**：女皇逆位出現在「未來」的位置，宛如一面映照命運的鏡子蒙上了塵埃。她本是豐饒、創造與無條件支持的化身，然而逆位時，卻暗示著計畫的根基可能不夠穩固，或資源、情感、靈感的供給出現了匱乏。這並非全然否定，而是星辰在低語：汝所追求的目標，其背後的土壤可能過於貧瘠，或汝自身的狀態——無論是過度依賴、缺乏行動力，抑或是內在的匱乏感——正阻礙著豐盛結果的誕生。這張牌邀請汝審視，是否在過程中忽略了務實的耕耘，或過於追求表象的華美而失了根本。

3. **【最終回答：否定】** 此刻星辰未對齊，請先滋養根本，等待內在與外在的豐盈回歸。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'upright', 'general_decision', 'single_card', $STR$1. **核心啟示**：權柄與秩序已然確立，汝所問之事，其根基穩固，可能性極高。

2. **詳細解讀**：皇帝正位端坐於王座，象徵著結構、權威與明確的規則。星辰的啟示告訴吾，汝所詢問的決策，正處於一個可被掌控、有清晰路徑與堅實基礎的狀態中。它代表著透過理性規劃、自律與負責任的態度，便能將想法化為現實。這張牌鼓勵汝像一位明君般，運用邏輯、經驗與既有的資源，去建立秩序並貫徹意志。命運在此刻青睞有準備、有決斷力之人，混亂將被終結，目標將被達成。

3. **【最終回答：肯定】** 以紀律與決心行動，汝所規劃之事，在穩固的架構中必能實現。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'upright', 'general_decision', 'past', $STR$1. **核心啟示**：汝過往的堅實根基與掌控力，為當下的決策鋪平了道路。

2. **詳細解讀**：皇帝牌在過去的位置正位顯現，揭示汝在過往的經歷中，已成功建立了穩固的結構、清晰的規則與強大的自律。這是一段汝憑藉自身意志、權威與務實行動，打下堅實基礎的時期。它意味著，汝今日所面臨的決策，並非憑空而來，而是建立在過去有條不紊的努力與有效掌控之上。過去的紀律與經驗，如同堅固的城堡城牆，為汝提供了保護與支撐，讓汝在面對「能不能」、「可不可以」的疑問時，擁有來自過往成就的底氣與資源。命運的絲線顯示，汝並非從零開始，而是從一個已然確立的高點出發。

3. **【最終回答：肯定】** 汝過往的耕耘已結出秩序的果實，憑藉既有基礎與堅定意志，此事可為。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'upright', 'general_decision', 'present', $STR$1. **核心啟示**：權威與結構的力量，正為汝的決策奠定堅實的基礎。

2. **詳細解讀**：皇帝正位端坐於「現在」之位，這象徵著命運正將主導權與清晰的架構交予汝手。這張牌代表著紀律、規則、穩固的基礎以及成熟的掌控力。它告訴汝，汝所詢問之事，並非虛無縹緲的幻想，而是可以通過確切的計劃、負責任的態度與堅定的意志去實現的目標。皇帝的能量是陽剛而果決的，它要求汝像一位統治者般，以邏輯與遠見來審視局勢，建立秩序，並採取果斷行動。星辰的軌跡顯示，成功之關鍵在於「掌控」與「執行」，而非被動等待。

3. **【最終回答：肯定】憑藉紀律與清晰的計劃，汝所問之事不僅可能，更可被穩固實現。**$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'upright', 'general_decision', 'future', $STR$1. **核心啟示**：汝所問之事，其命運掌握在穩固的權威與清晰的規則之中。

2. **詳細解讀**：皇帝牌正位置於未來，如同一位睿智的君主為汝的命運之路點亮了烽火。它預示著，汝所詢問的目標或決定，將在結構、紀律與務實行動的基礎上得以實現。這張牌象徵著穩固的權力、清晰的邏輯與堅定的意志。未來的情勢將有利於採取主導、建立秩序，並通過負責任的承諾與有條不紊的計劃來達成目標。它鼓勵汝像一位統治者般，以自信和擔當去掌握局面，運用理性分析而非情感衝動來做決斷。星辰的軌跡顯示，只要汝能展現領導力，堅守原則，並按部就班地推進，前方的道路將是堅實而可掌控的。

3. **【最終回答：肯定】** 以紀律與權威為劍盾，汝所規劃的藍圖極可能化為現實的疆土。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'reversed', 'general_decision', 'single_card', $STR$1. **核心啟示**：逆位的皇帝揭示了權威的失序與控制的瓦解，汝所詢問之事，根基已然動搖。

2. **詳細解讀**：皇帝本象徵著結構、規則與穩固的掌控力，然其逆位，則如星辰偏離軌道。這意味著汝所依賴的計畫、權威人物，或自身的紀律與邏輯，正處於混亂或無效的狀態。可能源於過於僵化、不近人情的策略，或是缺乏足夠的準備與資源來支撐汝的野心。命運在此刻低語：汝所構築的堡壘，其基石或許是沙礫。這並非全然否定可能性，而是強烈警示，若沿用舊有的、專斷的方式強行推進，必將遭遇阻礙與失敗。它要求汝反思自身的控制欲，檢視計畫中的漏洞，並學習以更靈活、更富同理心的方式重掌方向。

3. **【最終回答：否定】** 在混亂的秩序被重整前，強求只會招致反噬。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'reversed', 'general_decision', 'past', $STR$1. **核心啟示**：過往的掌控已然失序，權威的根基曾現裂痕。

2. **詳細解讀**：皇帝逆位盤踞於「過去」之位，揭示汝所詢問之事，其根源或曾籠罩在失控、混亂或缺乏紀律的陰影之下。這可能意味著，在過去的時光裡，相關的計畫、目標或權力結構本身，曾因過於僵化、獨斷而招致失敗，或因軟弱、優柔寡斷而喪失了主導權。這是一段規則失靈、方向模糊的時期，它為當下的決策埋下了需要審視的伏筆——汝是否仍受困於舊有的、無效的權威模式？或是對自身的力量與責任感到懷疑？星辰的啟示是：過去的混亂並非終局，而是為了讓汝看清，何種堅實的結構才能真正支撐起汝的願景。

3. **【最終回答：看情況】** 能否成功，取決於汝能否從過去的失序中，重建屬於自己的秩序與紀律。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'reversed', 'general_decision', 'present', $STR$1. **核心啟示**：權威的失序與控制的瓦解，正動搖著決策的根基。

2. **詳細解讀**：皇帝逆位，象徵著結構、紀律與世俗權威的崩壞。在汝所詢問的決策中，這暗示著計畫缺乏穩固的基礎，或是主事者（可能是汝自身）正處於一種失控、不負責任或優柔寡斷的狀態。外界的規則可能過於僵化而無法遵循，內在的意志力亦可能渙散，導致事情難以按嚴謹的藍圖推進。命運的星辰此刻並未照耀在秩序的宮殿上，而是提醒汝，過度依賴權威、強行控制或固守陳規，只會招致混亂與阻礙。這是一個需要反思自身方法、放下無謂掌控，並尋求更靈活、更具同理心之道的時刻。

3. **【最終回答：否定】** 在現有僵化的框架或失控的狀態下，此事難以達成。請先重建內在的紀律與務實的計畫。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (4, '皇帝', 'reversed', 'general_decision', 'future', $STR$1. **核心啟示**：逆位的皇帝揭示了權威的失序與控制力的瓦解，汝所尋求的未來，正因缺乏穩固的根基與清晰的規則而動搖。

2. **詳細解讀**：皇帝本象徵著結構、權威與穩固的成就，然其倒轉，則預示著汝所問之事在未來的發展軌跡中，將面臨秩序崩壞或權威失效的挑戰。這可能意味著計畫缺乏嚴謹的框架、關鍵人物（或汝自身）無法展現應有的領導力與決斷，又或是外在環境充滿不可控的變數與混亂。命運的星辰在此刻閃爍著警示的光芒，提醒汝若一味試圖以強硬手段控制，或過度依賴僵化的舊有模式，反而會招致失敗與阻礙。這張牌邀請汝反思：是否過於武斷？是否忽略了情感與靈活變通的需要？未來的道路，需要的是內在的紀律，而非外在的強權。

3. **【最終回答：否定】** 在混亂的根基上，難以築起穩固的未來。請先整頓內在的秩序與計畫的細節。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'upright', 'general_decision', 'single_card', $STR$1. **核心啟示**：遵循傳統與既定規則，汝之道路將獲得指引與認可。

2. **詳細解讀**：教皇正位端坐於寶座之上，手持三重權杖，象徵著智慧、道德與精神權威。這張牌在決策中閃耀著穩定與肯定的光輝。它告訴汝，汝所詢問之事，與既有的體系、規範、傳統價值或專業指導密切相連。這並非一條標新立異的險徑，而是一條被驗證過、有跡可循的坦途。若汝願意接納前輩的智慧、遵循合理的程序，或尋求正統的協助，那麼這件事不僅「可能」，更是被祝福與支持的。教皇牌鼓勵汝信任制度、導師或內心崇高的道德準則，它們將為汝鋪平道路。

3. **【最終回答：肯定】** 遵循正統途徑與智慧，汝所求之事將得穩固支持。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'upright', 'general_decision', 'past', $STR$1. **核心啟示**：汝過往的抉擇，深植於傳統、規範與權威的指引之中，為當下的問題奠定了穩固的基石。

2. **詳細解讀**：教皇牌正位出現在「過去」的位置，揭示汝在尋求答案的這條道路上，並非獨自摸索。汝曾遵循既有的體系、尋求資深者的建議，或接納了某種社會、組織或道德上的框架。這是一段接受教導、學習規則，並將外在的智慧內化的時期。這張牌象徵著一種結構性的支持，它為汝帶來了清晰的指引與安全感，讓汝的根基更為紮實。它暗示，汝過去的選擇是符合常規、被認可且具有長遠價值的，這股穩定的能量至今仍在影響著汝的決策視野。

3. **最終回答：肯定** 汝已走在被祝福與認可的道路上，遵循既有智慧，可能性將為汝敞開。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'upright', 'general_decision', 'present', $STR$1. **核心啟示**：遵循傳統、權威的指引或既定規則，將為汝的決策帶來穩固的支持與認可。

2. **詳細解讀**：教皇牌正位在此刻降臨，象徵著汝所詢問之事，與既有的體系、規範或社會認可的價值觀高度契合。這張牌鼓勵汝尋求正統的途徑、專業的建議，或遵循已被驗證有效的傳統方法。它預示著，若汝願意接納權威的引導、融入群體的支持，或依照穩健的步驟行事，那麼這條道路將是清晰且受到祝福的。命運的星辰在此刻閃耀著秩序與智慧之光，提醒汝莫要過度依賴個人獨創或離經叛道，成熟的系統與知識將是汝最可靠的基石。

**【最終回答：肯定】** 依循正道與智慧，汝所求之事在既有框架內極有可能實現。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'upright', 'general_decision', 'future', $STR$1. **核心啟示**：教皇正位揭示，遵循傳統、規範或尋求權威指引，將是通往未來的關鍵鑰匙。

2. **詳細解讀**：命運的織錦在此刻顯現出清晰的紋路。教皇正位出現在「未來」的位置，預示著汝所詢問之事，其可能性與一個既定的體系、制度、傳統價值，或是一位值得信賴的導師、長輩緊密相連。這並非指憑一己之力開創新局，而是指融入現有的成功模式、遵循社會認可的規則，或虛心接受專業指導。牌面暗示，若汝願意接納這份結構性的智慧，或透過正式管道（如申請、認證、學習）來進行，那麼通往目標的道路將是穩固且受到支持的。星辰的啟示在於，答案往往藏於已被驗證的知識與集體的智慧之中。

3. **【最終回答：肯定】** 遵循正統途徑或尋求資深指引，汝所問之事將獲得穩健的基礎與支持。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'reversed', 'general_decision', 'single_card', $STR$1. **核心啟示**：傳統的規則與權威的指引在此刻失效，汝需聆聽內心的聲音，而非外界的教條。

2. **詳細解讀**：教皇逆位，象徵著既定的體系、傳統的規範，或是社會普遍認可的「正確」路徑，正產生裂痕。它暗示汝所詢問之事，若遵循舊有方法、依賴他人（尤其是權威者）的保證，或試圖融入某個僵化的框架，將會遭遇阻礙與不協調。命運的星辰正引導汝脫離集體的束縛，去質疑那些被視為理所當然的規則。這並非全然否定，而是揭示了一條更個人化、更需要獨立思考與內在道德指引的道路。汝的答案不在外界的認可裡，而在汝自身的信念與勇氣之中。

3. **【最終回答：看情況】** 若汝能擺脫陳規，依從本心，則事有可為；若墨守成規，則希望渺茫。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'reversed', 'general_decision', 'past', $STR$1. **核心啟示**：過往的束縛與僵化的教條，曾是阻礙汝前行的無形枷鎖。

2. **詳細解讀**：教皇逆位立於「過去」之位，揭示汝所詢問之事，其根源曾深陷於不合時宜的傳統、權威的壓制，或某種僵化體系的束縛之中。汝或許曾試圖遵循他人制定的規則、社會的常規，或某位「導師」的指示，卻發現那條路徑並不通往汝心之所向，反而帶來困惑與限制。這張牌暗示，過去的經驗教會汝的，正是需要打破陳規、質疑既有權威，並聆聽自己內在的智慧，而非盲目跟從外在的指引。那段經歷，正是為了讓汝準備好，以更獨立、更創新的方式面對當下的抉擇。

3. **最終回答：看情況】** 汝能否達成，取決於是否已徹底擺脫舊有框架，聆聽內心的真實召喚。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'reversed', 'general_decision', 'present', $STR$1. **核心啟示**：傳統的規則與權威的指引在此刻失效，汝需聆聽內心的聲音，而非外界的教條。

2. **詳細解讀**：教皇逆位，象徵著既定的規範、社會的期待，或是所謂「標準答案」的框架正在崩解。它暗示汝所詢問之事，若遵循舊有、保守或他人強加的路徑，將遭遇阻礙與不協調。命運的星辰並非指引汝盲從，而是邀請汝進行一場內在的叛離。這可能意味著汝需要質疑現有的規則、跳脫傳統的思維，或擺脫對某種權威意見的依賴。成功與否的關鍵，在於汝是否有勇氣信任自己獨特的智慧，走出一條非傳統的道路。

3. **【最終回答：看情況】** 這件事的可能性，取決於汝能否擺脫陳規，依從本心去創造新路徑。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (5, '教皇', 'reversed', 'general_decision', 'future', $STR$1. **核心啟示**：逆位的教皇揭示了，若遵循傳統或權威的既定路徑，汝所詢問之事將難以在未來實現。

2. **詳細解讀**：教皇牌象徵著傳統、體制、既定規則與社會認可的權威。當它以逆位之姿出現在「未來」的位置，星辰的啟示是清晰的：汝所詢問的目標或決定，正受到僵化教條、不合時宜的規範，或是某種權威的束縛。這可能意味著，若繼續尋求傳統的認可、遵循他人的期望，或是依賴過時的方法，道路將會封閉。命運並非說「不可能」，而是提醒汝，成功的關鍵在於打破常規、質疑權威，或走出舒適的框架。這是一張呼喚內在智慧與個人信念的牌，它要求汝聆聽自己內心的導師，而非外界的聲音。

3. **【最終回答：看情況】** 答案取決於汝是否願意擺脫束縛，開闢自己的道路。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'upright', 'general_decision', 'single_card', $STR$1. **核心啟示**：命運的絲線交織，汝所面臨的選擇，其本質關乎和諧的連結與正確的結合。

2. **詳細解讀**：戀人牌正位在此閃耀著純粹的光芒，它揭示汝所詢問之事，其核心並非孤立的「是」與「否」，而是一道關於「選擇」與「契合」的課題。這張牌象徵著和諧的聯盟、價值觀的一致，以及充滿吸引力的結合。它預示著，若汝的決策能引領汝走向真誠的溝通、建立信任的關係，或與汝內心真實的渴望保持一致，那麼道路將是通暢且受到祝福的。星辰正為這份連結而閃耀，它鼓勵汝傾聽內心的聲音，選擇那能帶來完整與愛的選項。

3. **【最終回答：肯定】** 追隨內心真實的共鳴，這份連結將引領汝走向正確的道路。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'upright', 'general_decision', 'past', $STR$1. **核心啟示**：汝之過去，曾因一份深刻的連結或和諧的選擇，為當下的抉擇種下了關鍵的種子。

2. **詳細解讀**：戀人牌正位出現在「過去」的位置，宛如星辰在汝命運長河中留下的一道璀璨軌跡。它揭示在過往的時光裡，汝曾經歷過一段重要的結合、聯盟，或做出了一個基於內心真實渴望與價值觀的選擇。這可能是一段深刻的關係、一次完美的合作，或是一個讓汝靈魂產生共鳴的決定。這份過去的和諧與連結，並非偶然，它為汝此刻面臨的決策提供了堅實的情感基礎或明確的道德指引。它暗示，汝過去的「正確選擇」或「美好緣分」，正是開啟當下可能性之門的鑰匙。命運在提醒汝，那份純粹的吸引力與契合感，是值得信賴的內在羅盤。

3. **【最終回答：肯定】** 過往的真心連結已為汝鋪路，追隨內心的共鳴，可能性之門已然敞開。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'upright', 'general_decision', 'present', $STR$1. **核心啟示**：命運的星辰正為汝閃耀，這是一個關於選擇、和諧與結合的明確信號。

2. **詳細解讀**：戀人牌正位出現在「現在」的位置，宛如一道清澈的光，照亮了汝的決策之路。這張牌的核心是「正確的選擇」與「和諧的連結」。它不僅象徵著情感的結合，更代表著價值觀的契合、內外一致的決定，以及一種被更高力量所祝福的聯盟。汝所詢問之事，正處於一個充滿吸引力與可能性的十字路口。牌面暗示，若此事涉及合作、共識、或需要汝遵從內心真實的渴望，那麼答案將非常積極。這是一個需要汝傾聽內心聲音、做出符合汝最高善的選擇的時刻，而這個選擇本身，就將引領汝走向和諧與成功。

3. **【最終回答：肯定】** 星辰指引，心意合一，這是一個充滿可能性的正向選擇。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'upright', 'general_decision', 'future', $STR$1. **核心啟示**：命運的絲線交織，汝所面臨的選擇將引領汝走向和諧與結合的未來。

2. **詳細解讀**：戀人牌正位出現在「未來」的位置，宛如星辰在汝的命運藍圖上投下一道清晰的光。這張牌象徵著和諧的連結、重要的選擇，以及通往一體性的道路。它預示著，汝所詢問的這件事，其核心關乎「關係」與「一致性」——無論是與他人的合作、內在價值觀的契合，或是個人意願與外在機會的完美對接。正位的戀人牌告訴汝，前方的道路充滿吸引力與可能性，關鍵在於做出那個能讓汝內心與外在環境達成共鳴的正確抉擇。這不僅是關於「可能」，更是關於「圓滿達成」。它鼓勵汝傾聽內心的聲音，追隨真實的渴望，因為當選擇與汝的本質一致時，成功與結合便會自然到來。

3. **【最終回答：肯定】** 追隨汝心所向的選擇，結合與成功的可能性極高。$STR$)
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();
terpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'reversed', 'general_decision', 'past', '1. **核心啟示**：過往的選擇或關係中的失衡，為當下的決策蒙上了一層猶豫與考驗的陰影。

2. **詳細解讀**：戀人逆位出現在「過去」的位置，揭示汝之命運軌跡中，曾有一段關鍵的連結出現裂痕、誤解或價值觀的衝突。這可能是一段實際的關係，亦可能是一個重要的合作機會或內心信念的抉擇。逆位的星辰暗示，當時的汝或許因恐懼、不成熟或外在壓力，而未能做出和諧一致的決定，導致了分離、遺憾或未解決的張力。這份殘留的能量，如同低語的迴聲，正影響著汝此刻對「可能性」的判斷，讓汝內心充滿對重蹈覆轍的擔憂，或對完美結合的渴望與懷疑。它提醒汝，過去的課題尚未完全落幕，需被正視與療癒。

3. **【最終回答：看情況】** 汝能否跨越過往的陰影，做出與靈魂共鳴的選擇，將是關鍵。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'reversed', 'general_decision', 'present', '1. **核心啟示**：逆位的戀人揭示了選擇背後的失衡與不和諧，暗示當前的道路可能並非命運為汝鋪設的契合之路。

2. **詳細解讀**：戀人牌逆位，星辰的連結黯淡了。它訴說著在汝所詢問的決策中，存在著未察覺的衝突、價值觀的不合，或是資訊的誤判。這並非單純的「不可能」，而是命運在提醒，若依循現狀或當下的心意前行，很可能會遭遇因誤解、不誠實（對自己或他人）或錯誤結合而帶來的挫折。這張牌邀請汝深入審視：動機是否純粹？合作關係是否平等？選擇是否出於真正的渴望，而非一時的迷惑或壓力？此刻的阻礙，是宇宙給予的保護，讓汝免於踏入一段不和諧的旅程。

3. **【最終回答：否定】** 暫緩腳步，深入審視關係與選擇背後的真相，此刻強求恐難和諧。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (6, '戀人', 'reversed', 'general_decision', 'future', '1. **核心啟示**：星辰的連結已然失衡，汝所問之事，其根基可能存有裂痕或虛假的和諧。

2. **詳細解讀**：戀人牌逆位懸於「未來」之位，這並非全然否定，而是命運在汝耳畔低語警示。它揭示出，汝所詢問的這條道路前方，可能潛藏著因價值觀分歧、溝通不良，或一時激情掩蓋了理性判斷而導致的困境。這張牌暗示，若強行推動，未來可能面臨選擇的煎熬、合作的破裂，或是發現當初吸引汝的亮光，實為幻影。它邀請汝退後一步，審視這份「可能」背後的代價與真實性，是否建立在穩固的共識與誠實之上。

3. **【最終回答：否定】** 此刻星辰未予祝福，請先釐清內在與外在的紛雜之音。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'upright', 'general_decision', 'single_card', '1. **核心啟示**：汝之意志猶如戰車，必將衝破迷霧，駛向勝利。

2. **詳細解讀**：戰車正位是強而有力的行動與勝利之兆。它象徵著汝已握有清晰的目標、堅定的意志與充足的控制力，足以駕馭局面。牌中的戰士並非憑藉蠻力，而是結合了理性（城市）與潛意識（斯芬克斯）的力量，以平衡與決心克服前方的挑戰。命運的星辰正照耀著這條道路，它告訴汝，此事不僅可能，更需汝主動出擊、精準掌控方向，以紀律與專注力將潛能轉化為現實。過程或許需要奮力前行，但勝利終將屬於意志堅定的駕馭者。

**【最終回答：肯定】** 駕馭汝的意志與行動，勝利已在望。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'upright', 'general_decision', 'past', '1. **核心啟示**：汝過往的意志與行動力，已為當下的決策鋪就了堅實的道路。

2. **詳細解讀**：戰車正位出現在「過去」的位置，是一道來自命運的強烈回音。它揭示出，汝並非毫無準備地來到這個抉擇的十字路口。在過往的時光裡，汝已展現出強大的意志力、明確的目標感，以及克服障礙、控制局面的能力。汝曾駕馭著內在的矛盾（如同戰車前的兩隻人面獅身獸），憑藉決心與紀律，朝著一個方向前進。這股積累下來的動能、自信與成功的經驗，正是此刻汝能提出此問的基石。它意味著，過去的努力與勝利，已為當前的可能性注入了強大的驅動力。

3. **【最終回答：肯定】** 汝過往的戰績已證明，憑藉意志與行動，汝能駛向目標。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'upright', 'general_decision', 'present', '1. **核心啟示**：汝之意志與行動力，將駕馭命運的戰車，衝破阻礙，直達目標。

2. **詳細解讀**：戰車正位是一張充滿力量與動能的牌。它揭示，汝所詢問之事，其關鍵不在於外部條件是否完美，而在於汝內在的決心與自我控制。牌中的戰士駕馭著兩股不同方向的力量（常象徵理性與情感、或兩種不同的選擇），憑藉清晰的意志將其合而為一，朝著明確的目標前進。這張牌預示著強烈的進取心、自律以及克服挑戰的能力。星辰的啟示是：這是一段需要主動出擊、堅定方向的時期。只要汝能集中精神，保持紀律，並以無畏的勇氣掌控全局，前方的道路將為汝而開。命運的戰車已為汝備好，但馳騁的方向與速度，需由汝親手掌握。

3. **【最終回答：肯定】** 集中汝的意志，駕馭所有資源，勝利在望。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'upright', 'general_decision', 'future', '1. **核心啟示**：汝之意志將駕馭命運的戰車，衝破阻礙，直達目標。

2. **詳細解讀**：戰車正位出現在「未來」的位置，是一張極具力量與行動力的牌。它預示著，只要汝能整合內在的矛盾（如理性與情感、衝動與謹慎），並以堅定不移的意志力作為韁繩，便能有效地控制局面，驅使一切資源與能量朝著汝所設定的方向前進。這張牌象徵著勝利、征服與進取，星辰的軌跡已為汝鋪設了道路，關鍵在於汝是否有足夠的決心與自律去駕馭這股向前的衝力。它並非輕鬆的旅程，但明確指向「通過奮鬥取得勝利」的未來。

3. **【最終回答：肯定】** 集中汝的意志，駕馭汝的力量，目標在望。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'reversed', 'general_decision', 'single_card', '1. **核心啟示**：逆行的戰車，揭示汝之意志與現實力量已然脫節，前進的方向正受到內在衝突與外在阻力的拉扯。

2. **詳細解讀**：戰車逆位，象徵著那駕馭雙重力量的平衡已然傾覆。汝心中或許充滿了急切的渴望與決心，然而，這股力量卻因缺乏清晰的目標、內在的矛盾（如恐懼、猶豫），或外在環境的混亂（如資源不足、競爭激烈、時機不佳）而無法有效整合與導引。這張牌暗示，目前推動此事的前進動力是散亂、受挫甚至反噬的。汝可能感到失控、力不從心，或是在衝突中被迫停滯。命運的星辰在此刻並非指引前路，而是映照出汝需要先整頓內在的戰場——釐清真正的意圖、管理好情緒、審視計畫的可行性——方能重新掌握韁繩。

3. **【最終回答：否定】** 此刻強行推進恐招致混亂與挫敗，請先平息內在衝突，整頓步伐。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'reversed', 'general_decision', 'past', '1. **核心啟示**：過往的失控與意志的潰散，是此刻決策的沉重基石。

2. **詳細解讀**：戰車逆位出現在「過去」的位置，揭示汝所詢問之事，其根源已埋藏著混亂與失序的種子。那或許是一段缺乏方向、被情緒或外在壓力所駕馭的時光，汝的意志力曾如斷裂的韁繩，無法有效控制局面，導致衝突、延宕或計畫的偏離。這張牌暗示，過去的挫折並非偶然，而是源於內在力量（意志）與外在行動（戰車）的脫節。它為當下的決策蒙上一層陰影，提醒汝若沿用舊有的、衝動或逃避的模式，將難以駕馭未來的挑戰。命運的星辰在那一刻曾被烏雲遮蔽，而這片陰影，正是汝如今需要正視與穿越的。

3. **【最終回答：看情況】** 過去的阻礙是警訊，非定局；重整汝的意志與方向，方能改寫命運的軌跡。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'reversed', 'general_decision', 'present', '1. **核心啟示**：戰車逆位揭示，汝之意志與現實力量正處於脫韁或對抗的狀態，前行之路充滿顛簸。

2. **詳細解讀**：戰車本象徵著以強大意志力克服萬難、邁向勝利。然其逆位，則如星辰之光被烏雲遮蔽。車輪脫離軌道，兩頭人面獅身獸不再協力前行，而是背道而馳，導致力量內耗、原地打轉。這意味著，汝目前所詢問之事，正遭遇內在的混亂（如缺乏明確目標、信心動搖、情緒主導）或外在的強力阻礙（如競爭激烈、環境失控、資源不足）。汝或許感到力不從心，或方向迷失，強行推進只會導致挫敗與翻覆。命運在此刻並非禁止汝前行，而是要求汝先停下戰車，檢視內心的矛盾與外在的形勢，重新整合資源與決心。

3. **【最終回答：否定】** 此刻強求不可行，需先整頓內外，方能重掌方向。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (7, '戰車', 'reversed', 'general_decision', 'future', '1. **核心啟示**：戰車的逆行，意味著汝之意志與現實的拉力正失去平衡，前進的動力已然受阻。

2. **詳細解讀**：戰車本象徵著以強大意志力克服萬難、邁向勝利。然而，當它於「未來」之位逆轉，星辰的軌跡便揭示了潛在的波折。這並非全然否定汝之目標，而是命運在汝之道路上設置了警示的烽火。可能意味著準備不足、方向分歧、內在的衝突（如恐懼或猶豫）正消耗著汝的精力，或是外在環境存在難以掌控的變數。若強行推進，恐陷入僵局、失控，或遭遇意想不到的阻礙。這張牌邀請汝暫緩腳步，審視自身的動機與方法，整合內在的矛盾，並重新校準方向。

3. **【最終回答：否定】** 此刻強求前行恐招致混亂，請先整頓內心與計畫，再圖進取。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'upright', 'general_decision', 'single_card', '1. **核心啟示**：汝之內在的勇氣與溫柔的堅韌，將引領汝跨越挑戰，達成目標。

2. **詳細解讀**：力量牌正位閃耀著金色的光芒，它並非訴諸蠻力，而是揭示了一種更高層次的勝利——以心靈的沉著、堅定的意志與溫柔的耐性來駕馭局勢。牌中的女神輕合獅口，象徵著汝能以從容不迫的自信，安撫內在的焦慮或外界的阻礙。這張牌告訴汝，汝所詢問之事，其關鍵不在於外在條件是否完美，而在於汝是否準備好動用這份深植於靈魂中的「柔韌之力」。命運的絲線已握在汝手，星辰暗示汝擁有足夠的智慧與情感力量去面對，並將挑戰轉化為展現汝真正實力的舞台。

3. **【最終回答：肯定】** 以柔克剛，以心制勝，汝之內在力量足以讓此事成為可能。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'upright', 'general_decision', 'past', '1. **核心啟示**：汝過往已展現駕馭內在與外在挑戰的勇氣與溫柔，這份力量是當下決策的基石。

2. **詳細解讀**：力量牌正位出現在「過去」的位置，是一道來自命運的清晰回音。它揭示，汝並非毫無準備地來到這個抉擇的十字路口。在過往的經歷中，汝已成功地面對並馴服了內心的恐懼、焦躁或外在的困難。汝學會了以柔克剛，以內在的堅定與從容去引導局面，而非依靠蠻力。這意味著，汝為當前這個問題所積累的經驗、培養的耐心以及建立的自信，是無比真實且強大的資產。星辰的軌跡暗示，過去的成功模式——結合勇氣與同理心、力量與溫柔——正是打開未來之門的關鍵鑰匙。

3. **【最終回答：肯定】** 汝內在的獅子早已馴服，以這份從容之力前行，可能性之門已然為汝敞開。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'upright', 'general_decision', 'present', '1. **核心啟示**：汝之內在力量與溫柔的勇氣，正是駕馭命運韁繩的關鍵。

2. **詳細解讀**：力量牌正位降臨於「現在」的位置，是一道充滿光輝的啟示。它並非訴諸蠻力，而是象徵著以柔克剛的智慧、堅韌不拔的意志，以及對自身情緒與本能的完美掌控。牌中女神輕合獅口，寓意汝已擁有馴服挑戰、克服內心恐懼與疑慮的從容能力。這股力量源自深刻的自信與對生命的愛，它告訴汝，眼前的道路雖可能有如獅子般的阻礙，但汝之內在光芒足以照亮前路，並以耐心與同理心引導局勢。星辰的指引清晰可見：這是一段需要運用靈魂力量而非外在強權的旅程，汝已然具備成功的核心素質。

3. **【最終回答：肯定】** 以心靈的韌性與沉著應對，汝所問之事不僅可能，更是汝展現內在光輝的契機。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'upright', 'general_decision', 'future', '1. **核心啟示**：汝之內在的勇氣與溫柔，將為汝開啟通往可能性的道路。

2. **詳細解讀**：力量牌正位置於未來，宛如星辰為汝揭示了一幅充滿希望的圖景。這張牌並非訴諸蠻力，而是象徵著以柔克剛的智慧、堅韌不拔的耐心，以及對自身情感的深刻掌控。它預示著，汝所詢問之事，其成功的關鍵不在於外在條件，而在於汝能否駕馭內心的恐懼、懷疑或衝動，並以從容不迫的自信去面對。命運正將主導權交予汝手，這是一場關於心靈力量的考驗，通過它，汝將發現自己遠比想像中強大，足以馴服眼前的挑戰，使之成為助力。

3. **【最終回答：肯定】** 以柔韌之心駕馭挑戰，汝之內在力量將引領此事走向成功。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'reversed', 'general_decision', 'single_card', '1. **核心啟示**：汝之內在力量已然失衡，恐懼與衝動正試圖主宰汝之意志。

2. **詳細解讀**：力量牌逆位，揭示出汝正面臨的抉擇，其核心障礙並非來自外界，而是源於汝之內在。此刻，汝或許感到信心不足，被焦慮、自我懷疑或未馴服的原始情緒（如憤怒、慾望、恐懼）所困擾。這股內在的混亂，使得汝難以用從容、堅定的「柔韌之力」去面對挑戰，反而可能表現出退縮、失控或試圖以強硬手段掩飾脆弱。命運的星辰在低語：此事之關鍵，不在於「能不能」的技術層面，而在於汝是否準備好以成熟的心智與自我掌控力去承接它。若強行為之，恐因內在的軟弱而導致局面失控或事與願違。

3. **【最終回答：否定】** 此刻並非最佳時機，請先回歸內心，重拾對自我的掌控。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'reversed', 'general_decision', 'past', '1. **核心啟示**：過往的軟弱、恐懼或失控，是此刻決策的關鍵伏筆。

2. **詳細解讀**：力量牌逆位出現在「過去」的位置，揭示汝之疑問的根源。這並非單純的「不可能」，而是命運在提醒，汝曾因內心的怯懦、急躁，或對自身力量的不信任，而讓局面失控。或許是未能以柔克剛地處理衝突，或許是讓慾望與恐懼凌駕了理性與勇氣。這股殘留的陰影，如同未馴服的獸，仍在影響汝當下的判斷，使汝對自身能力產生懷疑，或對目標感到力不從心。星辰的指引是：正視這份過去的無力感，它正是汝現在需要克服與整合的課題。

3. **【最終回答：看情況】** 答案取決於汝能否從過去的軟弱中汲取教訓，重拾內心的勇氣與溫柔。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'reversed', 'general_decision', 'present', '1. **核心啟示**：逆位的力量，揭示了汝內心深處的恐懼與失控，正削弱著本應駕馭局面的勇氣。

2. **詳細解讀**：力量牌逆位，象徵著內在的軟弱與外在的挑戰正佔據上風。汝所詢問之事，目前被一股無力感所籠罩。這並非星辰不允許，而是汝可能正被焦慮、自我懷疑或未馴服的衝動所困擾，導致無法以從容、堅定的「柔韌之力」去面對與掌控。這張牌提醒汝，外在的阻礙往往是內心混亂的倒影。此刻強行推進，恐因準備不足、信心潰散或情緒失控而招致挫敗。命運在呼喚汝，先回頭審視自己的內心野獸，安撫它、理解它，方能重拾真正的力量。

3. **【最終回答：否定】** 此刻時機未至，請先戰勝內心的恐懼與懷疑，方能駕馭外境。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (8, '力量', 'reversed', 'general_decision', 'future', '1. **核心啟示**：逆位的力量揭示了，汝內在的勇氣與信心正被恐懼與懷疑所遮蔽，這將成為實現目標的主要障礙。

2. **詳細解讀**：力量牌逆位出現在「未來」的位置，星辰的啟示並非指向外在的絕對不可能，而是映照出汝內在狀態的失衡。此刻，汝或許感到焦躁、缺乏耐心，試圖以強硬或控制的手段去推動事情，反而會引發對抗與耗損。牌面暗示，那頭代表原始衝動與挑戰的獅子並未被內心的溫柔與智慧所馴服，它正反過來牽制著汝。這意味著，若以當下混亂、缺乏自信或意氣用事的狀態去行動，成功的可能性將大幅降低。命運的關鍵不在於外界的准許與否，而在於汝能否先找回內心的從容與堅定。

3. **【最終回答：否定】** 在重拾內在力量之前，強行推進只會事倍功半。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'upright', 'general_decision', 'single_card', '**核心啟示**：汝所求之事，答案不在外界的喧囂，而在汝內心深處的智慧與孤獨的探索中。

**詳細解讀**：隱者正位手持明燈，立於孤峰之上，這象徵著一段需要內省、耐心與獨立研究的旅程。對於汝所詢問的「可不可能」，這張牌並非直接給予「是」或「否」的答案，而是指引汝走向一條更深刻的路徑。它意味著，成功或實現的可能性，取決於汝是否願意暫時遠離外界的紛擾，專注於內在的真理與專業知識的累積。這是一個需要獨自思考、規劃、甚至暫時退隱以獲取清晰視野的時刻。若汝所問之事涉及學習、深入研究、需要專業判斷或精神層面的成長，那麼答案是積極的，但前提是汝必須遵循隱者的道路——保持耐心，信任內在的指引，並做好獨自前行的準備。若汝尋求的是即刻的、喧鬧的、或依賴他人的成功，則此路不通。

**【最終回答：看情況】** 答案取決於汝是否願意踏上這條向內探索、需要耐心與智慧的孤獨之路。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'upright', 'general_decision', 'past', '**核心啟示**：在過去的孤獨探索中，汝已為當下的決策積累了必要的智慧與內在指引。

**詳細解讀**：隱者正位出現在「過去」的位置，揭示了一段重要的心路歷程。在汝尋求答案的這件事上，汝早已不自覺地踏上了一段內省的旅程。或許是透過獨處、研究、或從經驗中沉澱，汝已遠離了外界的喧囂與紛擾，轉而向內心深處與更高的智慧尋求啟發。這張牌象徵著，汝過往的謹慎、耐心與對真理的追求，並非徒勞。它為汝此刻的決策，點亮了一盞內在的明燈。汝並非一無所知，而是在過去的靜默中，已悄然握有了關鍵的線索與清晰的判斷力。這是一段必要的準備期，讓汝得以看清事物的本質，而非表象。

**【最終回答：肯定】** 汝內在的智慧之光，已為前路指引方向。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'upright', 'general_decision', 'present', '1. **核心啟示**：智慧的燈火在孤獨中點亮，答案需向內尋求。

2. **詳細解讀**：隱者正位出現在「現在」的位置，宛如星辰為汝降下一道寂靜而澄明的光。這張牌並非直接否定外在行動的可能性，而是強烈地揭示：汝所追問的「可不可能」，其關鍵不在於外界的許可或條件，而在於汝內在的準備與智慧。此刻，命運邀請汝暫時從喧囂中抽離，進行深度的自我反思、研究或獨處。這是一段必要的沉潛期，汝需要提著那盞真理之燈，獨自走過一段探索之路，才能看清前行的階梯。事情的成敗，取決於汝是否願意且能夠完成這段內在的旅程，積累足夠的洞見與成熟度。

3. **【最終回答：看情況】** 答案藏在汝內心的寂靜深處，請先完成內在的探索與準備。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'upright', 'general_decision', 'future', '1. **核心啟示**：隱者之光，指引汝在孤獨的探索與內省中，尋得通往未來的清晰路徑。

2. **詳細解讀**：隱者正位置於「未來」，宛如一盞在寂靜山巔點亮的明燈。它預示著，汝所詢問之事能否實現，關鍵不在於外界的喧囂與助力，而在於汝是否願意進行一段深刻的內在旅程。這張牌象徵著智慧、謹慎與獨立的求索。未來的情勢將要求汝暫時退後一步，遠離紛擾，透過獨處、反思或深入研究來獲得必要的洞見與答案。這並非一條熱鬧的捷徑，而是一條需要耐心與專注的個人道路。當汝積累了足夠的內在智慧與清晰度，前路自然會為汝顯現。這是一個「可能」的未來，但它的實現方式與汝當下的想像可能不同，它更傾向於一種由內而外的、水到渠成的達成。

3. **【最終回答：肯定】** 答案深藏於汝心，需經由靜思與求索方能顯現。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'reversed', 'general_decision', 'single_card', '1. **核心啟示**：汝所尋求的答案，隱藏於內心的迷霧之後，而非外在的喧囂之中。

2. **詳細解讀**：隱者牌逆位，象徵著一段內在指引失靈、智慧之光被遮蔽的時期。汝可能感到孤獨、迷失方向，或急於向外尋求一個簡單的「是」或「否」，卻忽略了內心的聲音。這張牌暗示，汝當前的決策可能基於逃避、恐懼，或是對現實的錯誤評估。汝或許正試圖強行推動某事，卻未做好充分的準備與內省。命運的星辰並未熄滅，只是被汝自身的焦慮與匆忙所遮蓋。此刻，外在的建議可能混亂無益，真正的關鍵在於暫停腳步，重新點亮內心的燈塔。

3. **【最終回答：否定】** 暫緩行動，先向內探求清晰的洞見，此刻強求的結果恐將偏離正軌。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'reversed', 'general_decision', 'past', '1. **核心啟示**：過往的孤獨探索或錯誤的隱退，為當下的決策蒙上了一層迷霧。

2. **詳細解讀**：隱者逆位出現在「過去」的位置，揭示了一種根源性的影響。它暗示著，在過往的時光裡，汝可能經歷了一段自我封閉、與外界隔絕的時期；或是曾試圖獨自尋求答案，卻因方向錯誤、拒絕他人智慧而陷入更深的困惑。這段經歷可能源於恐懼、驕傲，或單純的迷失。這張牌逆位，象徵著內在的燈塔曾一度黯淡，未能照亮前路。這導致了當下決策時，缺乏清晰、可靠的內在指引作為基石，過去的經驗非但未能成為智慧，反而可能成為一種負擔或盲點。汝此刻的猶豫或對可能性的懷疑，與那段未能完成的內在旅程息息相關。

3. **【最終回答：看情況】** 過去的迷霧需先被驅散，答案方會清晰。請先回顧並整合過往的經驗，必要時尋求指引。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'reversed', 'general_decision', 'present', '1. **核心啟示**：汝的內心之光被遮蔽，此刻不宜向外尋求，而應向內沉潛。

2. **詳細解讀**：隱者逆位，象徵著內在智慧的燈塔暫時被迷霧籠罩。這並非意味著命運之門已然關閉，而是星辰在提醒汝，此刻的「行動」或「向外追尋」可能源於焦慮、孤獨或對指引的誤解。汝或許感到迷茫，急於從外界獲得一個明確的「是」或「否」，但牌面揭示，答案並不在遠方，而在汝被忽略的內心深處。這張牌暗示，若強行推進決策，可能會因準備不足、思慮不周或方向錯誤而徒勞無功。它要求汝暫停腳步，進行一次深刻的自我對話，釐清真正的動機與恐懼。

3. **【最終回答：否定】** 在迷霧散盡前，強求答案只會遠離真相。請先回歸內心，照亮自己的道路。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (9, '隱者', 'reversed', 'general_decision', 'future', '1. **核心啟示**：逆行的隱者暗示，汝所追尋的答案，目前仍隱藏在過度的自我封閉或錯誤的孤獨之中。

2. **詳細解讀**：隱者牌本象徵內省、智慧與獨自探索真理的旅程。然而，當它以逆位之姿出現在「未來」的位置，星辰的光芒彷彿被遮蔽。這並非意味著汝所問之事全然不可能，而是預示著若沿著當前的思維與方式前行，可能會走入誤區。汝或許正因恐懼、驕傲或缺乏指引，而拒絕了外界的聲音與幫助，導致視野狹隘，無法看清全局。未來的道路被自身的陰影所籠罩，關鍵在於能否承認盲點，放下不必要的防備，重新尋求光明。

3. **【最終回答：看情況】** 答案取決於汝是否願意走出象牙塔，接納他人的智慧與援助。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'upright', 'general_decision', 'single_card', '**核心啟示**：命運之輪已然轉動，汝所詢問之事正處於一個關鍵的轉捩點，可能性的大門正在敞開。

**詳細解讀**：命運之輪正位是宇宙循環與機遇的象徵。它告訴汝，此刻星辰的排列正為汝所關切之事帶來一股強大的推動力。這並非偶然，而是命運節奏的一部分。牌面預示著局勢正在朝著有利的方向發展，一個新的週期即將開始，過去的努力或等待可能即將迎來回報。對於「可不可能」的疑問，這張牌給予了充滿希望的訊號——轉機就在眼前，關鍵在於汝是否準備好識別並抓住這個時機。它提醒汝，命運的禮物往往包裝在變化的形式之中，請擁抱這股流動的能量。

**【最終回答：肯定】** 命運的齒輪已開始轉動，順勢而為，可能性極高。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'upright', 'general_decision', 'past', '1. **核心啟示**：命運之輪已然轉動，為汝的當下鋪設了通往轉變的軌跡。

2. **詳細解讀**：命運之輪正位出現在「過去」的位置，這是一道來自星辰的強烈信號。它揭示，汝所詢問的這件事，其種子早已在過往的時光中悄然種下。命運的洪流曾將一個關鍵的轉折點帶到汝面前，那可能是一個機遇、一個決定，或是一段經歷，它為當前的局面奠定了基礎。這張牌象徵著不可阻擋的循環與進展，意味著過去的能量是積極且推動性的。它告訴汝，宇宙的齒輪早已開始運轉，將汝帶到此刻需要做出決策的十字路口。過去的「可能」已轉化為當下的「潛力」，等待汝去把握與實現。

3. **【最終回答：肯定】** 命運的輪盤早已為汝轉向光明，順勢而為即可。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'upright', 'general_decision', 'present', '1. **核心啟示**：命運之輪已然轉動，汝所詢問之事正處於一個關鍵的轉捩點。

2. **詳細解讀**：正位的命運之輪，象徵著宇宙的循環與不可阻擋的契機。它告訴汝，此刻的局勢並非靜止，而是充滿了動能與轉變的潛力。這並非單純的「好運」，而是命運的齒輪正將相關的人、事、物推向一個新的階段。對於汝的決策而言，這意味著「可能性」的大門正在敞開，時機趨於成熟。外部環境的助力與內在的準備，可能在這一刻產生了共鳴。這是一個需要順勢而為、抓住機遇的時刻，而非強行控制或猶豫不決。命運的浪潮正在湧來，汝需要的是辨識它，並勇敢地踏上去。

3. **【最終回答：肯定】** 命運的轉輪已為汝開啟通道，請信任這股推動的力量，果斷前行。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'upright', 'general_decision', 'future', '1. **核心啟示**：命運之輪已然轉動，汝所詢問之事正處於一個關鍵的轉折點，宇宙的洪流將推動其發展。

2. **詳細解讀**：命運之輪正位出現在「未來」的位置，是極具力量的徵兆。它象徵著命運的齒輪正朝著對汝有利的方向轉動，一個充滿機遇的週期即將展開。這並非偶然，而是長久以來能量積累的必然結果。汝所詢問的「可能性」，正被一股更大的、不可阻擋的趨勢所承載。這張牌告訴汝，時機正在成熟，外部環境與內在條件將奇妙地結合，為汝開啟新的局面。無需過度擔憂或強行控制，命運自有其安排，汝需要的是保持開放與接納的姿態，準備好迎接即將到來的轉變。

3. **【最終回答：肯定】** 命運的浪潮已至，請懷抱信心，順勢而為。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, card_name, orientation, scenario_key, position_key, interpretation)
VALUES (10, '命運之輪', 'reversed', 'general_decision', 'single_card', '1. **核心啟示**：命運之輪逆轉，意味著時機未至，外在環境的阻力或內在準備的不足，正阻礙著事情的順利發展。

2. **詳細解讀**：當命運之輪逆位轉動，星辰的軌跡彷彿暫時偏離了預期的航道。這並非意味著永久的否定，而是揭示了一個關鍵的「暫停」或「轉折」時刻。汝所詢問之事，目前可能正遭遇計畫之外的延遲、反覆，或是因外部環境的變動而充滿不確定性。逆位的車輪提醒汝，此刻強行推動恐事倍功半，甚至可能陷入徒勞的循環。它邀請汝沉靜下來，審視是否過於依賴運氣而忽略了務實的準備，或是抗拒了必要的改變。命運在此刻要求的是耐心、接納與內在的調整，而非盲目前行。

3. **【最終回答：否定】** 時機不利，暫緩行動，先審視內外阻礙並調整自身。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();
�看情況】** 過去的波折已成定局，未來的轉機取決於汝此刻是否已從中汲取智慧，調整步伐。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (10, 'reversed', 'general_decision', 'present', '1. **核心啟示**：命運之輪逆轉，意味著汝所詢問之事，正處於一個停滯、延遲或需要重新校準方向的階段。

2. **詳細解讀**：命運之輪逆位，象徵著宇宙的循環與時機暫時未能與汝的意願同步。它並非完全的否定，而是揭示出外在環境的阻力、時機未到，或是過往的因緣業力正在產生影響。此刻，推動事情的慣性力量減弱，可能會遇到意外的延宕、計畫生變，或是感到努力卻事倍功半。這張牌邀請汝反思：是否過於強求某個特定的結果？是否忽略了某些關鍵的變化訊號？逆位的車輪提醒汝，此刻不宜強行推進，而應靜觀其變，檢視自身與局勢的連結，等待更好的時機或調整策略。

3. **【最終回答：否定】** 此刻強求無益，命運的齒輪需要暫停與校準。請耐心等待，或從不同角度重新審視。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (10, 'reversed', 'general_decision', 'future', '1. **核心啟示**：命運之輪逆轉，意味著時機未至，外在環境的阻力或內在準備的不足，正阻礙著事情的順利發展。

2. **詳細解讀**：當命運之輪逆位出現在「未來」的位置，星辰的軌跡彷彿暫時陷入了泥沼。這並非意味著汝所問之事永無可能，而是揭示了當前的周期正處於低谷或轉換的陣痛期。外部的局勢可能動盪、時機不對，或者過往的因緣業力尚未理清，導致推動事情向前的力量被延遲或逆轉。這張牌邀請汝反思：是否過於急切？是否忽略了某些關鍵的準備？逆位的車輪提醒汝，此刻強行推動恐事倍功半，甚至可能因逆勢而為招致不必要的挫折。它要求汝保持耐心，重新審視計畫與自身狀態，等待輪盤再次轉向的契機。

3. **【最終回答：否定】** 暫緩腳步，檢視並調整計畫，等待更合適的時機到來。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'upright', 'general_decision', 'single_card', '**核心啟示**：天秤已然平衡，汝所問之事，其結果將公正無私地反映汝之付出與選擇。

**詳細解讀**：正義牌正位降臨於汝的命運之途，它是一張代表因果、平衡與誠信的牌。星辰的啟示告訴吾，汝所詢問的「可不可能」或「能不能」，其答案直接繫於「是否公平」與「是否正確」。若汝的動機純正，過程符合規則與道德，且已為此付出了應有的努力，那麼宇宙的天秤將傾向於「可能」。這張牌強調法律、契約與客觀標準，它預示著一個基於理性分析、公正判斷而來的結果。汝的決定必須經得起良心的考驗與現實的檢視，如此，命運自會給予一個明確而公正的回應。

**【最終回答：肯定】** 秉持誠信與公正行事，汝所尋求的許可與結果將隨之而來。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'upright', 'general_decision', 'past', '1. **核心啟示**：汝過往的抉擇，已為當下的局面奠定了公正與平衡的基石。

2. **詳細解讀**：正義牌出現在「過去」的位置，是一道來自命運的清晰回音。它揭示，汝在過往的旅程中，曾以理性、誠實與負責任的態度面對關鍵抉擇。汝可能曾仔細權衡利弊，遵循內心的道德律法，或為某個決定承擔了應有的後果。這張牌象徵著因果法則的精準運作——汝過去的正直、公平與明智判斷，已為此刻汝所詢問的「可能性」創造了穩固的條件。它並非偶然的幸運，而是汝自身行動所招致的必然秩序。星辰的軌跡顯示，過去的「因」已結成支持汝當下道路的「果」。

3. **【最終回答：肯定】** 汝過去的正直已鋪平道路，基於理性與公平的判斷，此事可成。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'upright', 'general_decision', 'present', '1. **核心啟示**：天秤已然平衡，因果業報分明，汝所問之事，其結果將公正無私地反映汝過往的選擇與付出。

2. **詳細解讀**：正義牌端坐於「現在」之位，宛如一面清澈無瑕的鏡子，映照出事件的本質。這張牌並非訴諸情感或運氣，而是訴諸理性、契約與宇宙間恆常不變的法則。它揭示，汝所詢問的「可能性」，其關鍵在於「公平性」與「責任」。若汝過往的行動符合道德、條理清晰且已盡應盡之義務，那麼宇宙的天秤將傾向於「可能」的一方；反之，若過程中有任何失衡、隱瞞或不公，結果也將如實呈現。這是一張要求絕對誠實面對自己與局勢的牌，它承諾的並非僥倖的恩賜，而是精準的因果償報。

3. **【最終回答：肯定】** 秉持誠實與責任心前行，汝所尋求的公正結果將會到來。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'upright', 'general_decision', 'future', '1. **核心啟示**：命運的天秤將因汝之公正與誠實而傾向於汝。

2. **詳細解讀**：正義牌現於未來之位，宛如星辰在汝之道路上投下一束清澈之光。這張牌預示著，汝所詢問之事，其結果將嚴格遵循因果的法則。汝過往的選擇、付出的努力，以及秉持的原則，都將在未來得到精確的衡量與回報。這並非僥倖或運氣，而是宇宙間平衡法則的必然體現。若汝的動機純正，行動符合道德與理性，並準備好承擔相應的責任，那麼這件事的發展將趨向於一個公平、合理且對汝有利的結局。它提醒汝，在過程中保持客觀、尋求法律或契約的保障，將是引導命運天秤傾斜的關鍵砝碼。

3. **最終回答：肯定】以真理為劍，以責任為盾，汝所尋求的結果，將在公正的秩序中顯現。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'reversed', 'general_decision', 'single_card', '1. **核心啟示**：天秤已然傾斜，汝所面對的抉擇，可能隱藏著不公、失衡或未盡的責任。

2. **詳細解讀**：正義逆位降臨於汝的決策之上，宛如一面蒙塵的明鏡。它暗示著，汝所詢問的「可能性」或「可否」，其根基可能並不穩固。或許有資訊未被揭露，導致判斷失準；或許牽涉到偏頗的條件或私心，讓結果難以公正；亦或是過往的因果與責任尚未了結，成為當前的阻礙。這張牌邀請汝深入審視：是否過於主觀？是否忽略了某些代價或規則？命運的絲線此刻顯得糾結，提醒汝莫急於求成，需先找回內在的平衡與清晰的視野。

3. **【最終回答：否定】** 在失衡的條件下強求，恐難如願。請先整頓因果，尋回公正的尺度。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'reversed', 'general_decision', 'past', '1. **核心啟示**：過往的失衡與不公，正為當下的決策蒙上一層陰影。

2. **詳細解讀**：正義牌逆位出現在「過去」的位置，揭示汝所詢問之事，其根源可能牽涉到一段失衡、不公，或未能承擔相應責任的過往。這可能是一段未解決的紛爭、一個隱藏的秘密，或是一個基於偏見、逃避、雙重標準所做的決定。這股殘留的能量，如同未矯正的砝碼，正影響著汝當下對「可能性」的判斷。命運的絲線在此打了結，提醒汝，若不正視與清理這份過去的「不義」，它將持續扭曲現實，使通往目標的道路充滿不必要的阻礙與反覆。星辰的指引並非懲罰，而是要求汝先回顧並整頓內在與外在的秩序。

3. **【最終回答：看情況】** 能否實現，取決於汝是否願意直面並修正過往的失衡。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'reversed', 'general_decision', 'present', '1. **核心啟示**：逆位的正義揭示了失衡的天秤，暗示汝當前的決策可能建立在偏頗或不完整的資訊之上。

2. **詳細解讀**：正義牌逆位時，其象徵的平衡、公正與客觀法則受到了干擾。在汝詢問「可不可能」的當下，這張牌暗示著，事情的表象之下可能存在著未被察覺的不公、隱藏的代價，或是汝自身的判斷受到了偏見、逃避責任或一廂情願的影響。命運的天秤尚未校準，若強行推進，可能會得到一個有失公允或與預期不符的結果。這並非星辰斷然拒絕汝的請求，而是提醒汝，在行動之前，必須重新檢視所有的條件、契約與內心的道德準則，確保自己站在真相與責任的一方。

3. **【最終回答：看情況】** 取決於汝能否正視並修正當前的失衡狀態，回歸客觀與誠實。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (11, 'reversed', 'general_decision', 'future', '1. **核心啟示**：逆位的正義揭示了，在未來的天平上，因果的回應可能因失衡而遲來，或真相被隱藏。

2. **詳細解讀**：吾友，當正義之牌倒懸於未來之位，星辰的啟示並非全然否定，而是警示。它訴說汝所詢問之事，其結果可能偏離汝所預期的公平與合理。或許有隱而未見的條件、未揭露的資訊，或是過往某個未被正視的決定，將在未來產生影響。這張牌暗示，若強行推進，可能會遭遇制度上的不公、契約的糾紛，或是因自身偏頗的判斷而導致失衡的結果。命運提醒汝，在行動前，需再三檢視所有細節與規則，確保自己的動機純粹無私，否則所求之果實，恐將帶著苦澀的滋味。

3. **【最終回答：看情況】** 汝的抉擇能否成功，取決於能否主動撥開迷霧，找回平衡與真實。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (12, 'upright', 'general_decision', 'single_card', '1. **核心啟示**：汝所詢問之事，需要以暫時的犧牲與不同的視角來換取最終的領悟。

2. **詳細解讀**：吊人正位是一張充滿智慧與深意的牌。它並非直接否定汝的行動，而是揭示了一條與眾不同的路徑。牌中人物自願倒懸，象徵著為了更高的理解或更遠大的目標，需要暫時的停頓、等待與奉獻。在決策的十字路口，這張牌告訴汝，汝所追求的「可能」與「可以」，其關鍵不在於立即的行動或世俗意義上的成功，而在於汝是否願意接納這段看似停滯、卻能帶來深刻轉化的時期。這是一種以退為進、以靜制動的智慧。汝需要換個角度看問題，放下急切的控制欲，命運會在此刻教導汝何謂真正的價值與收穫。

3. **【最終回答：看情況】** 汝的答案取決於是否願意接納暫時的停滯，以換取更深遠的覺醒。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (12, 'upright', 'general_decision', 'past', '1. **核心啟示**：汝曾以犧牲與等待的姿態，為當下的抉擇積累了深層的智慧。

2. **詳細解讀**：在命運的織錦中，吊人正位居於「過去」，揭示了一段關鍵的醞釀期。汝曾自願或被迫地停下腳步，從一個與眾不同的角度審視全局。這段看似停滯或犧牲的時光，並非徒然；它是一場靈魂的淬煉，讓汝透過暫時的「不作為」或「付出」，獲得了超越常規的洞見。這份以時間與耐心換來的領悟，正是此刻汝能做出決策的堅實基石。它告訴汝，真正的答案往往來自於接納與內省，而非急切的行動。

3. **【最終回答：看情況】** 汝的答案，深藏於那段等待所賦予的覺知之中；請信任這份由內而生的智慧。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();

INSERT INTO oracle_interpretations (card_id, orientation, scenario_key, position_key, interpretation)
VALUES (12, 'upright', 'general_decision', 'present', '1. **核心啟示**：懸停於命運的十字路口，汝此刻的「可能」繫於以全然不同的視角去等待與理解。

2. **詳細解讀**：吊人正位是一張充滿智慧與深意的牌。它並非直接否定行動，而是揭示了一種更高層次的「可能」。牌中人物自願倒懸，象徵著汝所詢問之事，其關鍵不在於立即的行動或世俗標準的「可行」，而在於心態的徹底轉換。命運正邀請汝暫停腳步，以犧牲當下的控制與急切，換取深刻的覺知。這是一段必要的懸置期，汝需要接納暫時的停滯，從中獲得啟示。當汝願意從一個嶄新的、甚至看似犧牲的角度去審視全局，答案自會浮現。這過程本身就是一種達成，是通往「可能」的必經之路。

3. **【最終回答：看情況】** 汝的「可能」取決於是否願意接納這段等待，並從中獲得嶄新視野。')
ON CONFLICT (card_id, orientation, scenario_key, position_key) 
DO UPDATE SET interpretation = EXCLUDED.interpretation, updated_at = NOW();
