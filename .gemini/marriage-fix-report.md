# 婚姻情境判斷邏輯修正報告

## 📋 問題描述

**原始提問：** 「我能在35歲前結婚嗎？」

**問題分析：**
- 這是一個關於**未來婚姻可能性**的預測性問題
- 提問者可能是單身或有對象但未婚
- 焦點在於「能否找到對象並結婚」+ 時間限制

**原有錯誤：**
- 舊邏輯將所有包含「結婚」的問題都判斷為 `love_marriage`
- `love_marriage` scenario 的描述是「已婚或長期伴侶關係」
- 導致解讀內容假設提問者已有穩定伴侶，出現「你們的關係」、「與伴侶坦誠分享」等不符合情境的描述

---

## ✅ 修正方案

### 1. 情境分類邏輯

將婚姻相關問題分為兩類：

| 類型 | Scenario Key | 適用情況 | 範例問題 |
|------|-------------|---------|---------|
| **未來婚姻可能性** | `love_single` | 包含時間條件或預測性詞彙 | • 我能在35歲前結婚嗎？<br>• 何時會結婚？<br>• 今年內能結婚嗎？ |
| **現有婚姻關係** | `love_marriage` | 討論已婚關係、婆媳、夫妻相處 | • 婚姻關係如何？<br>• 婆媳相處會改善嗎？<br>• 結婚後會幸福嗎？ |

### 2. 關鍵字判斷規則

```typescript
// 未來婚姻可能性 → love_single
if ((lower.includes('結婚') || lower.includes('求婚') || lower.includes('訂婚')) &&
    (lower.includes('歲') || lower.includes('年內') || lower.includes('何時') || 
     lower.includes('能不能') || lower.includes('會不會') || lower.includes('可以') ||
     lower.includes('能在') || lower.includes('會在') || lower.includes('幾歲') ||
     lower.includes('多久') || lower.includes('什麼時候') || lower.includes('時候'))) {
  return 'love_single';
}

// 現有婚姻關係 → love_marriage
if (lower.includes('婚姻') || lower.includes('婆媳') || 
    lower.includes('夫妻') || lower.includes('配偶') ||
    (lower.includes('結婚') && (lower.includes('後') || lower.includes('生活') || lower.includes('相處')))) {
  return 'love_marriage';
}
```

---

## 🧪 測試結果

所有 9 個測試案例 **全部通過** ✅

### 未來婚姻可能性測試 (love_single)
- ✅ 我能在35歲前結婚嗎？
- ✅ 我何時會結婚？
- ✅ 我會不會結婚？
- ✅ 我今年內能結婚嗎？
- ✅ 我們什麼時候可以結婚？

### 現有婚姻關係測試 (love_marriage)
- ✅ 婚姻關係如何？
- ✅ 婆媳關係會好嗎？
- ✅ 結婚後會幸福嗎？
- ✅ 夫妻相處如何？

---

## 📊 解讀內容對比

### 修正前 (love_marriage - 錯誤)
> **現在】死亡（正位）**
> 此刻**你們的關係**正經歷深刻的轉變期...請溫柔地接納這份改變的能量。試著**與伴侶坦誠分享**彼此對關係的期待與恐懼...

❌ 問題：假設提問者已有伴侶，答非所問

### 修正後 (love_single - 正確)
> 親愛的你，牌陣中全然順暢的能量，正是一份溫柔的提醒：此刻的你，**已準備好迎接一段美好的緣分**。宇宙正為你敞開大門，請帶著對自己的愛與信任，**主動走向人群**、參與生活...

✅ 正確：聚焦於單身求緣，提供尋找對象的建議

---

## 📂 修改文件

### 主要修改
- **檔案：** `f:\TL\App.tsx`
- **函數：** `detectScenario` (line 573-587)
- **複雜度：** 7/10

### 測試文件
- **檔案：** `f:\TL\test-marriage-detection.js`
- **用途：** 驗證婚姻判斷邏輯

---

## 🎯 影響範圍

### Oracle 資料覆蓋
- ✅ `love_single` 已有完整資料
  - all_upright / all_reversed / one_upright / one_reversed / mixed
  - 位於 `supabase_insert_all_summaries.sql`
  
- ✅ `love_marriage` 已有完整資料
  - 適用於已婚關係的各種情境

### 相關 Scenario
不影響其他愛情相關 scenario：
- `love_crush` (暗戀對象)
- `love_pursuit` (追求中)
- `love_dating` (熱戀期)
- `love_breakup` (分手)
- `love_reunion` (復合)
- 等等

---

## 📝 建議

### 後續優化建議
1. **QA 測試更新**
   - 將婚姻相關問題加入 `oracleQA.ts` 的測試集
   - 確保邊界案例都能正確判斷

2. **關鍵字持續優化**
   - 收集真實用戶提問
   - 補充遺漏的時間相關詞彙（如「幾時」、「多快」等）

3. **考慮新增子 Scenario**
   - `love_marriage_future` - 專門處理「何時結婚」的預測
   - 但目前使用 `love_single` 已足夠應對

---

## ✨ 結論

此次修正成功解決了「我能在35歲前結婚嗎？」這類問題的情境判斷錯誤。通過區分**未來婚姻可能性**和**現有婚姻關係**，確保：

1. ✅ 提問情境判斷準確
2. ✅ 解讀內容契合提問者狀況
3. ✅ 不會出現「答非所問」的情況
4. ✅ 所有測試案例通過

修正已完成並可立即使用。
