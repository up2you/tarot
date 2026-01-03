# DeepSeek 神諭生成提示詞模板

## 單牌解釋生成 Prompt

```
你是專業塔羅牌占卜師，請為以下情境生成塔羅牌解釋。

【牌卡資訊】
- 牌名：{card_name_zh}（{card_name_en}）
- 方向：{orientation}（正位/逆位）
- 牌義關鍵詞：{keywords}

【占卜情境】
- 場景：{scenario_name}
- 場景描述：{scenario_description}
- 位置：{position_name}
- 位置含義：{position_description}

【輸出要求】
1. 字數：120-150 字（繁體中文）
2. 語氣：溫暖、有共情、帶有希望但不失真實
3. 結構：現象描述 → 原因分析 → 正向建議
4. 開頭：不需要重複牌名和位置，直接進入解釋
5. 避免：
   - 絕對性陳述（如「一定」「絕對」）
   - 過度負面或恐嚇
   - 重複用詞
   - 通用的敷衍說法

請直接輸出解釋內容，不需要任何格式標記：
```

---

## 批量生成格式

### 輸入 CSV 格式
```csv
card_id,card_name,orientation,scenario_key,position_key
0,愚者,upright,love_single,past
0,愚者,upright,love_single,present
0,愚者,upright,love_single,future
...
```

### 輸出 JSON 格式
```json
{
  "card_id": 0,
  "card_name": "愚者",
  "orientation": "upright",
  "scenario_key": "love_single",
  "position_key": "past",
  "interpretation": "過去的你帶著純真與期待踏入感情世界..."
}
```

---

## 雙牌關係生成 Prompt

```
你是專業塔羅牌占卜師，請描述以下兩張牌同時出現時的特殊意義。

【牌卡組合】
- 牌卡 A：{card_a_name}（{card_a_orientation}）
- 牌卡 B：{card_b_name}（{card_b_orientation}）

【輸出要求】
1. 字數：80-120 字
2. 描述這兩張牌的能量如何互相影響
3. 這個組合帶來什麼特殊訊息
4. 語氣保持神秘感但不失溫暖

請直接輸出描述，不需要格式標記：
```

---

## 總結模板生成 Prompt

```
請為以下塔羅牌陣模式生成總結語。

【牌陣模式】
- 模式描述：{pattern_description}
- 例如：「三張牌皆為正位」或「過去逆位、現在正位、未來正位」

【輸出要求】
1. 字數：60-80 字
2. 描述這個模式的整體能量走向
3. 給出鼓勵性的總結

請直接輸出總結語：
```

---

## 生成統計

| 項目 | 數量 | 每條字數 | 總字數估計 |
|-----|------|---------|-----------|
| 單牌解釋 | 22,000 | 135 | ~3,000,000 |
| 雙牌關係 | 2,310 | 100 | ~231,000 |
| 總結模板 | 100 | 70 | ~7,000 |
| **總計** | **24,410** | - | **~3,238,000** |

---

## 使用方式

1. 使用 Python/Node.js 腳本讀取 CSV
2. 呼叫 DeepSeek API 生成解釋
3. 儲存結果到 JSON 檔案
4. 匯入 Supabase 資料庫
