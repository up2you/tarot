# 人際關係 Oracle 資料生成指南

## 📋 概述

這個生成器將為 7 個人際關係 scenarios 生成完整的塔羅牌解讀資料：

1. **relation_family** - 家庭關係（父母、兄弟姊妹、親戚）
2. **relation_friend** - 朋友關係
3. **relation_colleague** - 同事關係
4. **relation_client** - 客戶關係
5. **relation_neighbor** - 鄰居關係
6. **relation_elder** - 長輩關係（上司、老師、前輩）
7. **relation_rival** - 對手競爭

## 📊 生成數據量

- **每個 scenario**: 22 張牌 × 2 方向 × 10 個位置 = 440 條解讀
- **總計**: 7 scenarios × 440 = **3,080 條解讀**
- **預估時間**: 約 40-60 分鐘（DeepSeek API 速度較快）

## 🎯 生成器特色

### 1. 針對人際關係優化的 Prompt
- 聚焦於雙方互動、情感連結與溝通
- 避免批判，保持中立與包容
- 提供實際可行的溝通技巧

### 2. 位置專用指引
每個位置都有針對人際關係的特殊說明：
- **自己**: 提問者的態度、情緒與行為模式
- **對方**: 對方的心理狀態、想法與行為傾向
- **連結**: 雙方的情感紐帶與信任基礎
- **阻礙**: 溝通問題、誤解或外在因素
- 等等...

### 3. 情境化解讀
根據不同的關係類型（家庭、朋友、同事等）調整解讀內容：
- 家庭關係：世代衝突、家庭責任、情感連結
- 朋友關係：信任問題、社交圈變化
- 同事關係：職場協作、團隊氛圍
- 客戶關係：商業信任、專業形象

## 🚀 使用方法

### 前置準備

確認 DEEPSEEK_API_KEY 已設定在 `.env` 文件中：
```
DEEPSEEK_API_KEY=your_api_key_here
```

### 運行生成器

```bash
cd f:\TL\tarot-generator
npm run relation
```

### 監控進度

生成器會：
1. 實時顯示進度在終端
2. 創建進度追蹤文件：`output/relation_scenarios/relation_generation_progress.md`
3. 每個 scenario 完成後自動保存 SQL 文件

## 📁 輸出文件結構

```
output/relation_scenarios/
├── relation_family.sql              # 家庭關係解讀
├── relation_friend.sql              # 朋友關係解讀
├── relation_colleague.sql           # 同事關係解讀
├── relation_client.sql              # 客戶關係解讀
├── relation_neighbor.sql            # 鄰居關係解讀
├── relation_elder.sql               # 長輩關係解讀
├── relation_rival.sql               # 競爭對手解讀
├── all_relation_scenarios.sql       # 合併所有解讀
└── relation_generation_progress.md  # 進度追蹤
```

## 📥 導入資料庫

生成完成後，將 SQL 文件導入 Supabase：

### 方法 1：使用 Supabase Dashboard
1. 登入 Supabase Dashboard
2. 進入 SQL Editor
3. 複製 `all_relation_scenarios.sql` 內容並執行

### 方法 2：使用 psql 命令行
```bash
psql -h your-supabase-url -U postgres -d postgres -f output/relation_scenarios/all_relation_scenarios.sql
```

## ⚠️ 注意事項

### API 使用
- DeepSeek API 有請求限制（通常是每分鐘 60-120 請求）
- 生成器已設定 500ms 間隔，符合限制
- 如遇到 429 錯誤，會自動記錄並繼續

### 中斷恢復
- 生成器會保存每個 scenario 的進度
- 如果中斷，可以手動跳過已完成的 scenarios
- 修改 `main()` 函數中的循環起始索引即可

### 成本預估
- DeepSeek API 費用非常低
- 預估約 $0.5-1.0 USD for 3,080 條解讀
- 具體費用請參考 DeepSeek 官方定價

## ✨ 範例輸出

### 家庭關係 - 戰車（正位）- 自己位置

> 戰車正位出現在「自己」位置，顯示你在家庭關係中正展現積極主動、希望掌控局面的態度。你可能正努力推動家庭內部的某些改變，或試圖在家人間建立更明確的界限與規則。這股意志力雖然有助於突破僵局，但也可能讓其他家人感到壓力或抗拒。
>
> 這種強勢的態度往往源於內心對家庭和諧的渴望，或是對過往混亂的補償心理。你希望用自己的方式帶領家庭走向更好的方向，但有時可能忽略了家庭成員各有不同的節奏與需求。這份控制感背後，可能藏著對失控的恐懼。
>
> 建議你在保持行動力的同時，練習聆聽家人的聲音。試著將「我認為應該怎麼做」轉為「我們可以怎麼做」，邀請家人共同參與決策。真正的家庭和諧不是來自一人的掌控，而是來自每個成員都能感到被尊重與理解。溫柔地放下一些控制，關係將更流暢地前進。

## 🔄 進度追蹤範例

| # | scenario_key | 狀態 | 已完成/總數 |
|---|--------------|------|------------|
| 1 | relation_family | ✅ 完成 | 440/440 |
| 2 | relation_friend | 🔄 進行中 | 220/440 |
| 3 | relation_colleague | ⏳ 等待中 | 0/440 |
| 4 | relation_client | ⏳ 等待中 | 0/440 |
| 5 | relation_neighbor | ⏳ 等待中 | 0/440 |
| 6 | relation_elder | ⏳ 等待中 | 0/440 |
| 7 | relation_rival | ⏳ 等待中 | 0/440 |

## 🎉 完成後

生成完成後，系統將自動解決以下問題：

1. ✅ **「我和姊姊的關係能改善嗎？」** 不再顯示通用運勢解讀
2. ✅ 每張牌都有針對家庭關係的專業解讀
3. ✅ 總體指引會正確結合牌面內容
4. ✅ 所有 7 個人際關係 scenarios 都有完整資料

---

**準備好了嗎？運行以下命令開始生成：**

```bash
cd f:\TL\tarot-generator
npm run relation
```

祝生成順利！🌟
