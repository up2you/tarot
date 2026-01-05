# Tarot Oracle QA 系統使用指南

本目錄包含針對塔羅神諭場景判斷的自動化測試工具。這些工具能協助開發者確保 `detectScenario` 函數的準確性。

## 📁 核心檔案

| 檔案 | 描述 | 指令 |
|------|------|------|
| `src/oracleQA.ts` | **AI 語意測試**：使用 DeepSeek API 判斷場景是否符合語意。準確度高，需 API Key。 | `npm run qa` |
| `src/testFixes.ts` | **本地邏輯測試**：使用寫死的測試案例進行快速回歸測試。無需 API Key，速度快。 | `npm run qa:local` |
| `output/qa_report.md` | `npm run qa` 產生的詳細測試報告。 | - |

## 🚀 如何使用

### 1. 本地快速驗證 (推薦開發時使用)
當您修改了匹配邏輯後，請先跑本地測試確保沒有破壞已知的邊界案例。
```bash
npm run qa:local
```

### 2. AI 完整語意驗證 (發布前使用)
這會跑更廣泛的自然語言測試，確保 AI 能理解使用者的各種問法。
**前置作業**：確保 `.env` 檔案中有設定 `DEEPSEEK_API_KEY`。
```bash
npm run qa
```

## ⚠️ 重要：同步至主程式

測試通過後，`src/oracleQA.ts` 中的 `detectScenario` 函數邏輯 **必須** 手動同步至主程式 (例如 `F:\TL\App.tsx`)。
目前的 QA 系統位於獨立的生成器專案中，與前端主程式是分開的。

**同步步驟**：
1. 開啟 `src/oracleQA.ts`
2. 複製 `detectScenario` 函數的完整內容
3. 貼上覆蓋 `App.tsx` 中的同名函數

## 🛠️ 新增測試案例

若要新增測試案例，請編輯 `src/oracleQA.ts` 中的 `TEST_QUESTIONS` 陣列。
格式如下：
```typescript
{ q: "您的問題", expected: "預期場景key" }
```
