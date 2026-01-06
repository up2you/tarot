INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_gender_all_upright', '【預測結果：男生】牌面中充滿了陽剛、行動與光明的能量，這股純粹而順暢的流動，正溫柔地指向一個充滿活力的男孩。這份生命的禮物，正帶著滿滿的祝福與力量前來。請懷著喜悅與期待的心，全然擁抱這份順流而下的美好，無論性別為何，這個孩子都將是宇宙賜予您最珍貴的奇蹟。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_gender_all_reversed', '【預測結果：女生】牌陣中溫柔的陰性能量如水般流動，象徵著豐盈的孕育與接納。此刻全數逆位的狀態，並非否定這份預測，而是溫柔地提醒你，關於性別的期待或許正與內在的焦慮或外在的壓力交織，使能量有些凝滯。請將這視為一個暫停與內省的邀請，放下頭腦的猜測，回歸母親與胎兒最純粹的連結。無論是男孩或女孩，這份生命本身，就是宇宙賜予你最神聖、最獨一無二的禮物。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_gender_one_reversed', '【預測結果：女生】牌面流動著溫柔的孕育能量，充滿了接納與滋養的陰性特質。這趟旅程整體是順遂的，你與寶寶的連結非常緊密。那個小小的阻礙，或許是內心對「未知」的一絲忐忑。請記得，無論是小公主或小王子，都是宇宙賜予你最獨一無二的禮物。放鬆心情，信任生命的安排，你內在的母性光輝已為這份珍貴的到來做好了最美的準備。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_gender_one_upright', '【預測結果：女生】這張牌蘊含著溫柔的孕育與滋養能量，如同大地之母的懷抱，充滿了陰性的水土特質。當前的局勢或許讓你在等待中感到一絲焦慮與不確定，但請相信，這份連結本身已是生命最珍貴的禮物。無論結果如何，這份來自宇宙的祝福，都將以最適合你們的方式到來。請懷抱希望，安心等待與這份美好生命的相遇。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('health_gender_mixed', '【預測結果：女生】因為牌面中孕育與接納的陰性能量較為顯著，如同大地之母般溫柔包容。此刻的局勢雖有些複雜，如同生命本身充滿驚喜與未知，但這正是平衡的開始。請懷著平靜與開放的心，迎接這份獨一無二的禮物。無論是小王子或小公主，這份生命的到來，都將為你的世界帶來最純粹的愛與圓滿。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;