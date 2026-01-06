INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_farming_all_upright', '這是一段能量完全順暢的豐收旅程。大地與你的努力已形成完美的共鳴，從播種、耕耘到收成，每一個環節都充滿祝福。請懷抱信心，順應這股豐沛的流動，大膽規劃與行動。你的付出將被土地溫柔地倍數回饋，眼前的繁盛景象，正是宇宙對你勤懇與耐心最直接的禮讚。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_farming_all_reversed', '這片土地正經歷一段能量的沉潛期，豐收的節奏暫時放緩。逆位的牌陣並非否定你的耕耘，而是溫柔地提醒：外在的果實需要內在的滋養。請暫停對產量的焦慮，轉而檢視土壤的狀態、種子的品質，或灌溉的方式。這是一個向內扎根、調整農法的珍貴時機。當你順應這份內省的召喚，大地將以更豐盈的饋贈回應你的耐心與智慧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_farming_one_reversed', '這片土地正孕育著豐饒的能量，整體的耕耘與氣候都朝著豐收的方向前進。然而，逆位的牌卡溫柔地提醒，或許有一個環節需要你特別關注——可能是灌溉的時機、土壤的養分，或是收成後的儲藏。這不是挫折，而是豐盛前最後的微調。請帶著信心檢視你的農作流程，那個小小的阻礙，正是為了讓最終的果實更加飽滿甜美。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_farming_one_upright', '這片土地正經歷一段艱辛的耕耘期，氣候的考驗或資源的緊繃，讓豐收的願景看似遙遠。然而，這張牌揭示土地深處的生命力從未消失。請保持耐心與觀察，調整灌溉或輪作的節奏，一線希望往往藏在最樸實的堅持裡。當你悉心照料每一株幼苗，大地終將以它的方式，回報你穩健而甜美的果實。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_farming_mixed', '親愛的，這次的豐收之旅，如同田間的氣候，並非總是晴空萬里。牌面揭示了豐饒與挑戰並存的複雜能量。有些努力已結出甜美的果實，值得你欣喜；同時，也提醒著灌溉與守護的平衡。請溫柔檢視你的田地與方法，適時調整步伐，接納自然的節奏。豐收不僅是終點的穀倉滿溢，更是整個耕作週期中，你與土地共舞的智慧與耐心。保持信心，你已走在正確的道路上。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_fishery_all_upright', '這片海洋正以最豐沛的姿態回應你的努力。牌陣中全然順暢的能量，預示著從準備、出海到收穫的每一環節都將和諧運轉。這不僅是豐收的承諾，更是邀請你懷抱信心，積極行動。請信任你的經驗與直覺，果斷地撒網，廣闊的豐饒正在等待你滿載而歸。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_fishery_all_reversed', '親愛的，這片海洋此刻顯得有些平靜，甚至帶著一絲停滯的氣息。這並非意味著沒有魚群，而是提醒我們，豐收的節奏需要暫時放緩。或許是外在的風浪，或許是內心的焦慮，讓能量暫時受阻。請將這視為一個珍貴的訊號：是時候向內檢視你的漁網（方法）、船隻（工具）與航向（目標）。暫停，是為了校準；內省，是為了積蓄更深的力量。當你調整好呼吸與步伐，下一次撒網，將迎來更為踏實、屬於你的豐盈。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_fishery_one_reversed', '這趟豐收的旅程，整體的洋流與風向都對你有利，漁獲的訊號已然閃爍。然而，逆位的能量提醒你，在滿懷期待撒網的同時，請留意一個小小的、可能被忽略的環節——或許是過於急躁的節奏，或是對既有方法的過度依賴。這不是阻礙，而是大海溫柔的提示：只需微調你的航向與心態，那份屬於你的豐盛，將更圓滿地入網。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_fishery_one_upright', '親愛的，這片海洋的豐饒從未遠離，只是暫時被風浪遮蔽。眼前的挑戰如同洶湧的浪潮，考驗著你的經驗與耐心，但請相信，你過往的積累與對海洋的敬畏，正是那盞穿透迷霧的燈塔。調整你的網，觀察潮汐的細微變化，在最艱難的時刻，往往隱藏著最珍貴的魚群。保持信念，穩住船舵，豐收的契機就在你堅持的方向裡。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_fishery_mixed', '親愛的，這片海洋的豐饒與你內心的渴望正在共鳴。牌陣顯示，收穫的浪潮確實湧動，但其中也夾雜著需要留意的暗流。這提醒我們，真正的豐收不僅在於滿載而歸，更在於與海洋節奏的和諧共舞。請保持耐心與覺察，在行動與等待間找到平衡，你的智慧將引領航向既豐盛又永續的彼岸。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_forestry_all_upright', '親愛的，這是一段能量完全順暢、充滿祝福的豐收時刻。你的投入與守護，如同陽光、雨水與沃土，已為這片森林（無論是實際的林場或你耕耘的事業）帶來了最和諧的循環。請全然信任這股順流而下的能量，大膽地規劃採收、擴展或播下新種子。此刻，你的每一個行動都將得到大地最豐盛的回饋，請懷著感恩與信心，擁抱這份即將圓滿的收成。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_forestry_all_reversed', '這片豐收的林地，此刻正處於能量的沉潛期。逆位的牌陣提醒我們，自然的循環並非總是直線向上，有時需要暫停與內省。或許是氣候的變遷、土壤的養分需要重新積累，或是收成的時機尚未成熟。請溫柔地檢視你的規劃與方法，這不是失敗，而是大地在邀請你更深入地理解它的節奏。當你願意調整步伐，給予耐心，豐饒的能量將在適當的時機，以更穩健的方式重新流動。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_forestry_one_reversed', '這片豐收的林場，整體的能量是豐沛而流動的，如同林木正穩健地生長。然而，逆位的能量提醒著，在採收的喜悅中，或許有一個環節需要你更細心地檢視——可能是資源的分配、時機的掌握，或是一份對自然節律的過度急切。請溫柔地調整步伐，這個小小的阻礙並非否定你的耕耘，而是為了讓最終的豐碩，能更圓滿、更持久地歸於你手中。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_forestry_one_upright', '這片森林正經歷著風雨的考驗，如同豐收前的試煉。眼前的困難或許是土壤的養分調整，或是氣候的變遷，但請相信，每一棵樹木的根系都在默默扎根更深。保持耐心與觀察，在最艱難的時刻，往往蘊藏著轉變的契機。你的守護與堅持，終將讓這片林地迎來更豐盈、更堅韌的生生不息。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_forestry_mixed', '這片森林的豐收，正如同牌陣的能量，是複雜而真實的。既有陽光灑落的沃土，也有需要細心照料的暗處。請你看見成長的喜悅，也接納過程中的挑戰。這份「好壞參半」並非阻礙，而是大自然最誠實的教導——提醒你在行動與觀察、收穫與永續之間，找到那溫柔而堅定的平衡。你的耕耘，終將結成獨特的果實。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_livestock_all_upright', '這是一段能量完全順暢、充滿祝福的豐收時期。你所付出的每一分照料與耐心，都將在牧場與土地上結出豐碩的果實。請懷抱信心，順應這股流動的能量，積極擴展你的計劃。無論是畜群的繁衍、飼育的優化，還是與自然的和諧共處，此刻都是行動與收穫的最佳時機。敞開心胸，迎接這份來自大地慷慨的贈禮吧。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_livestock_all_reversed', '此刻的豐收之路，或許正經歷著一段能量的沉潛。畜牧的循環提醒我們，土地需要休耕，生命需要喘息。逆位的牌陣並非否定你的耕耘，而是溫柔地提示：暫時的停頓，是為了更深刻地連結你與這片土地、這些生命。請向內觀照，檢視流程中是否積累了無形的壓力或消耗。當你調整好內在的節奏，外在的豐饒自然會以更和諧的方式到來。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_livestock_one_reversed', '整體而言，你的畜牧事業正走在豐收的道路上，基礎穩固，前景可期。然而，逆位的能量提醒著，這份豐盛可能被一個具體的「疏忽」所影響，或許是某個環節的細節管理，或是對資源的過度樂觀。請溫柔地檢視你的流程，這不是挫折，而是為了讓收成更加圓滿而進行的微調。保持覺察，你便能將這份阻礙轉化為更穩健的祝福。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_livestock_one_upright', '在畜牧的道路上，你或許正經歷著飼養的辛勞、天候的考驗，或收成不如預期的困境。這張正位牌告訴我們，豐收的願景從未消失，它藏在每一次耐心的照料與應變之中。請專注於你能掌控的細節，守護好現有的根基，那一線希望正來自你日復一日的堅持與對生命的信任。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_livestock_mixed', '親愛的，這片豐收的田野正映照著你耕耘的成果，牌陣中交織的光影提醒著：豐饒與挑戰並存。請溫柔地檢視你的牧場與心田，有些環節需要你更細膩的平衡與照料。這不是阻礙，而是豐盛前的必要調整。信任你的雙手與直覺，在給予與收穫之間找到和諧的節奏，豐碩的果實將在耐心與智慧中穩穩成熟。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_garden_all_upright', '親愛的園丁，這是一段能量全然流動、充滿祝福的時光。你的土地肥沃，陽光與雨水都恰到好處，每一顆埋下的種子都正順應著自然的韻律生長。請你懷抱信心，持續耕耘，你的專注與耐心將直接轉化為豐碩的果實。現在正是擴大計劃、分享收穫的最佳時刻，宇宙正以全然的順暢支持著你的豐盛願景。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_garden_all_reversed', '親愛的園丁，這片花園的能量正處於一個沉靜的轉折期。逆位的牌陣並非預示失敗，而是溫柔地提醒你，豐收的節奏有時需要暫停。土壤需要休養，種子需要醞釀。請先向內探尋，檢視你的照料方式或內心是否帶著焦慮。這不是停滯，而是為了讓未來的果實，能紮根得更深、更甜美。相信自然的韻律，你的耐心澆灌，終將迎來屬於你的季節。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_garden_one_reversed', '親愛的園丁，你的耕耘已讓生命的花園充滿生機，豐收的果實就在眼前。這張逆位牌並非否定你的努力，而是溫柔提醒：或許有一株特別的植物需要你更細心的照料，或是一個被忽略的細節正等待調整。請相信，這小小的阻礙是豐收前最後的微調，只要以耐心與覺察去滋養它，你的花園將以最豐美的姿態回報你。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_garden_one_upright', '親愛的園丁，此刻你的園圃或許正經歷著乾旱或風雨，讓豐收的願景顯得遙遠。這張牌提醒你，真正的豐收不僅是果實的累積，更是耐心與信念的耕耘。請相信，每一滴汗水都在滋養著土壤深處的生命力。保持照料，那看似艱難的局勢中，正有一株最頑強的希望，在靜靜等待破土而出的時機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('harvest_garden_mixed', '親愛的園丁，你的豐收之園正處於一個微妙的平衡點。牌陣顯示，既有茁壯成長的嫩芽，也有需要細心修剪的枝節。這並非好壞分明，而是提醒你，真正的豐收來自於接納過程中的陽光與風雨。請保持耐心與觀察，在灌溉與放手之間找到智慧，你的付出終將結出獨特而甜美的果實。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;