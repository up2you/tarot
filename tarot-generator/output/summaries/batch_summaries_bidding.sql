INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_bidding_all_upright', '【競標勝率評估：高】牌陣能量完全順暢，顯示你的準備與實力正處於絕佳狀態，得標機率相當可觀。這股順流而上的能量，意味著你的提案內容、團隊實力與策略方向，都與標案的核心需求高度契合。請務必對自己的專業抱持信心，積極展現優勢，這不僅是爭取合約，更是向市場證明自身價值的絕佳時機。保持清晰的溝通與穩健的步伐，成功已在望。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_bidding_all_reversed', '【競標勝率評估：中偏低】親愛的，這次的標案能量似乎有些凝滯，競爭態勢可能比表面更複雜，或存在你尚未看清的細節。全逆位的牌陣並非否定你的實力，而是溫柔地提醒：此刻暫停衝刺，轉向內省與檢視，會是更智慧的策略。請重新審視標案文件與自身優勢，釐清哪些環節可以更扎實，哪些潛在風險需要預先防範。當你調整好步伐，這份暫時的阻滯，將成為你釐清方向、凝聚真正力量的契機。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_bidding_one_reversed', '【競標勝率評估：中高】整體局勢對你有利，你的專業與準備已為你鋪墊了扎實的道路。然而，牌中揭示了一個需要特別留意的環節，或許是某項文件細節、報價策略，或是對評審重點的微妙解讀稍有偏差。請溫柔地檢視流程中那個令你隱約感到不安的點，它正是轉化逆位能量的關鍵。調整它，便能讓你的優勢更全面展現，穩健地接近成功。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_bidding_one_upright', '【競標勝率評估：中】這份標案確實充滿挑戰，競爭態勢可能比預期更為激烈，或存在某些不透明的規則。然而，牌中仍透出一線希望，這意味著您的核心實力或獨特優勢並未被掩蓋。請務實地審視所有競爭者與招標細節，將準備工作做到極致，特別是加強簡報的邏輯說服力與對隱性需求的回應。保持靈活與警覺，您手中的那張關鍵王牌，很可能在最後關頭為您打開局面。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;

INSERT INTO oracle_summaries (pattern_key, summary) 
VALUES ('career_bidding_mixed', '【競標勝率評估：中】這次的局勢猶如天秤，好壞能量交織，顯示競爭激烈且存在變數。你的實力與準備是重要的籌碼，但對手也可能暗藏策略或條件模糊。請務實地平衡「展現優勢」與「防範風險」：精煉你的提案亮點，同時仔細審視所有細節與合約條款。在複雜中保持清晰與彈性，正是將機率轉向你的關鍵。')
ON CONFLICT (pattern_key) DO UPDATE SET summary = EXCLUDED.summary;