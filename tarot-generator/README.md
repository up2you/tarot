# 🔮 Tarot Card Image Generator

專業級塔羅牌圖片自動生成工具，使用 Google Gemini AI 生成商業品質的塔羅牌藝術圖片。

## ✨ 功能特點

- **12 種商業級藝術風格** - 從巴洛克到賽博龐克
- **完整 78 張牌支援** - 22 張大阿爾克那 + 56 張小阿爾克那
- **批量生成模式** - 高效利用每日 1000 張圖片配額
- **精確視覺描述** - 每張牌都有詳細的視覺元素描述
- **進度追蹤** - 即時顯示生成進度
- **中英雙語支援** - 牌名同時有英文和繁體中文

## 📦 安裝

```bash
cd tarot-generator
npm install
```

## 🔑 設定 API Key

複製環境變數範本：
```bash
cp .env.example .env
```

編輯 `.env` 檔案，填入您的 Google AI API Key：
```
GOOGLE_API_KEY=your_api_key_here
```

或在執行時使用 `--api-key` 參數。

## 🚀 使用方式

### 查看所有風格
```bash
npm run gen list-styles
```

### 查看所有牌
```bash
npm run gen list-cards
npm run gen list-cards --major-only  # 只看大阿爾克那
```

### 預覽生成 prompt
```bash
npm run gen preview --style baroque_divine --card 0
npm run gen preview --style cyberpunk_oracle --card 13
```

### 生成牌組

```bash
# 生成巴洛克風格的大阿爾克那 (22張 + 牌背)
npm run gen generate --style baroque_divine --major-only

# 生成完整 78 張牌組
npm run gen generate --style art_nouveau_ethereal --full-deck

# 生成特定牌 (例如: The Fool, The Magician, The High Priestess)
npm run gen generate --style dark_fantasy --cards 0,1,2

# 自訂輸出目錄
npm run gen generate --style celestial_dreams --major-only --output ./my-cards

# 不生成牌背
npm run gen generate --style minimalist_zen --major-only --no-back
```

### 批量生成多風格 (善用每日 1000 張配額)

```bash
# 生成所有風格的大阿爾克那 (每風格 23 張)
npm run gen batch --major-only

# 指定風格
npm run gen batch --styles baroque_divine,cyberpunk_oracle,celestial_dreams

# 設定每日配額限制
npm run gen batch --quota 500 --major-only
```

## 🎨 可用風格

### 經典藝術
| ID | 名稱 | 說明 |
|---|---|---|
| `baroque_divine` | Baroque Divine | 17世紀巴洛克宮廷風格 |
| `renaissance_mystical` | Renaissance Mystical | 文藝復興神秘主義風格 |

### 現代藝術
| ID | 名稱 | 說明 |
|---|---|---|
| `art_nouveau_ethereal` | Art Nouveau Ethereal | 新藝術運動慕夏風格 |
| `art_deco_luxe` | Art Deco Luxe | 1920年代裝飾藝術 |

### 奇幻風格
| ID | 名稱 | 說明 |
|---|---|---|
| `dark_fantasy` | Dark Fantasy | 暗黑哥特奇幻 |
| `celestial_dreams` | Celestial Dreams | 星空宇宙夢境 |

### 數位風格
| ID | 名稱 | 說明 |
|---|---|---|
| `cyberpunk_oracle` | Cyberpunk Oracle | 賽博龐克霓虹 |
| `minimalist_zen` | Minimalist Zen | 極簡日式禪意 |

### 傳統風格
| ID | 名稱 | 說明 |
|---|---|---|
| `vintage_botanical` | Vintage Botanical | 復古維多利亞植物學 |
| `watercolor_dreams` | Watercolor Dreams | 夢幻水彩 |

### 創意風格
| ID | 名稱 | 說明 |
|---|---|---|
| `stained_glass` | Stained Glass Cathedral | 教堂彩色玻璃 |
| `psychedelic_vision` | Psychedelic Vision | 60年代迷幻藝術 |

## 📊 生成效率

| 模式 | 張數 | 風格數 | 所需時間 (約) |
|---|---|---|---|
| 單風格大阿爾克那 | 23 | 1 | ~1 分鐘 |
| 單風格完整牌組 | 79 | 1 | ~3 分鐘 |
| 批量所有風格大阿爾克那 | 276 | 12 | ~15 分鐘 |

每日 1000 張配額可以生成約 **12 套完整大阿爾克那牌組** 或 **43 套風格各異的全牌組**！

## 📁 輸出結構

```
output/
├── baroque_divine/
│   ├── back.png
│   ├── 00_the_fool.png
│   ├── 01_the_magician.png
│   └── ...
├── cyberpunk_oracle/
│   ├── back.png
│   └── ...
└── ...
```

## 🔧 進階選項

```bash
# 自訂 API 呼叫間隔 (避免 rate limiting)
npm run gen generate --style baroque_divine -r 3000  # 3秒間隔

# 直接指定 API Key
npm run gen generate --style baroque_divine --api-key YOUR_KEY
```

## 📝 授權

MIT License - 生成的圖片可用於商業用途
