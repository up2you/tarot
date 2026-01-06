INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_cheating_all_upright', '【外遇風險評估：低】牌陣中未出現欺瞞或背叛的高風險信號，能量流動順暢無阻。這或許指向一段坦誠的連結，或是一個需要你鼓起勇氣正視內心真實渴望的時刻。全正位的能量在鼓勵你，若這是追尋真實自我的道路，請帶著覺知與誠實前行，為自己的選擇負起完全的責任。你的心靈擁有足夠的光明，可以引領你走向清晰與整合。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_cheating_all_reversed', '【外遇風險評估：高】牌陣中逆位的能量，暗示著關係中可能存在未坦誠的隱患或複雜的情感糾葛。親愛的，此刻的能量並非終局判決，而是一個清晰的內在訊號，邀請你暫停腳步，溫柔地看向自己與關係的核心。那些被隱藏或壓抑的感受，正是需要被正視與梳理的起點。請給自己一些安靜的空間，釐清內心的真實渴望與界線，這份內省的勇氣，將為你帶來最清澈的指引與力量。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_cheating_one_reversed', '【外遇風險評估：中】整體關係的流動尚稱平穩，但牌中逆位的能量暗示，有一個特定的隱患或未坦承的心結正在形成阻礙。這未必指向實際的行動，更可能是一種情感上的疏離或信任的裂痕。請溫柔地檢視關係中那些難以啟齒的對話，誠實的面對彼此的感受，這份阻礙會是讓你們走向更深理解與承諾的關鍵契機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_cheating_one_upright', '【外遇風險評估：中高】牌面顯示關係中存在著隱瞞與不誠實的能量，局勢確實艱難，信任的裂痕帶來深刻的痛苦。然而，正位牌也揭示了一線希望：這是一個迫使關係走向真實的關鍵時刻。請先穩住自己內心的風暴，真相的浮現雖痛，卻也是療癒與重建的起點。無論最終選擇為何，這份經歷都將引領你走向更清醒、更尊重自我的道路。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('love_cheating_mixed', '【外遇風險評估：中】牌陣中好壞交織的能量，顯示局勢並非單純的背叛或忠誠，而是充滿複雜的個人情感與未解的課題。這份混亂中，或許藏著未被坦誠面對的慾望、孤獨，或關係中早已存在的裂痕。請不要急於定罪或絕望，這正是宇宙邀請你深呼吸，在情緒的風暴中心尋找平衡。先穩住自己的心，你才有清晰的視野去辨識：哪些是外來的誘惑，哪些是內心真實的渴求，以及這段關係是否還值得你賦予信任與努力。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;