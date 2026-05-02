# 造型氣球訂購計算機 計畫

> 建立日期：2026-04-28
> 狀態：進行中

## 背景

主打「少量造型氣球」客群：生日派對個人、學校班級、公司活動小物。
設計概念：選造型數量 → 選取貨方式 → 自動算價 → 複製訂單 → IG 私訊。
不做金流、不做帳號。宅配不是主力，主要是面交/自取。

入口設計：
1. 獨立頁面 `/order-special-package`（Navbar 直連）
2. 首頁加一個 CTA 區塊（非計算機，只是品牌介紹 + 立即訂購按鈕）

## 已確認規格

### 商品造型（✅ 全部確認）

| 造型 | 定價 | 單位 |
|------|------|------|
| 寶劍 | NT$15 | /支 |
| 水槍 | NT$40 | /支 |
| 六瓣花 | NT$60 | /支 |
| 狗狗 | NT$30 | /隻 |
| 小熊 | NT$50 | /隻 |

> 未來計畫新增棒狀氣球產品線（熊頭棒 $100、兔兔頭棒 $100），常數設計預留擴充空間。

### 取貨方式（✅ 確認）

| 方式 | 費用 | 說明 |
|------|------|------|
| 自取 | $0 | 捷運西門站 |
| 親送 | $500 | 台北市內統一費率 |
| 代叫外送（Lalamove） | 另計 | 頁面顯示「費用另計」，複製後私訊確認 |

### 聯絡方式（✅ 確認）
- IG：@boom.com_studio
- 私訊連結：`https://ig.me/m/boom.com_studio`

### UI 規格（✅ 確認）
- 每個造型有獨立示意圖（另外拍攝，圖片備好後替換 placeholder）
- 獨立頁面 `/order-special-package`
- 首頁 CTA 區塊（非計算機，只有品牌介紹 + 按鈕）

### 不做的功能
- ❌ 日期選擇
- ❌ 急單邏輯（急單統一「另外報價」）
- ❌ 折扣機制
- ❌ 金流/結帳
- ❌ 帳號/登入

---

## 確認版型（✅ 已決定）

### 訂購頁 `/order-special-package`

**桌機：5欄橫排**
```
[頁面標題 + 流程說明]
┌──────┬──────┬──────┬──────┬──────┐
│[圖]  │[圖]  │[圖]  │[圖]  │[圖]  │
│寶劍  │水槍  │六瓣花│狗狗  │小熊  │
│$15/支│$40/支│$60/支│$30/隻│$50/隻│
│ − 0 +│ − 0 +│ − 0 +│ − 0 +│ − 0 +│
└──────┴──────┴──────┴──────┴──────┘
[取貨方式 radio]
[黏底：小計 + 運費 = 總計 | 重設 | 複製並私訊 IG]
```

**手機：2欄卡片 + 黏底列**
```
[狗狗][六瓣花]
[小熊][水槍]
[寶劍]（置中，單欄）
[取貨方式]
[黏底：總計 | 重設 | 複製]
```

### 首頁 CTA 區塊（BalloonOrderCta）

參考知名網站精選區版型：標題左 + 文字連結右，圖片橫排佔主版面。

**桌機**
```
快速訂購方案                                         （eyebrow）
造型氣球·送禮新方式                  立即訂購 →      （標題左 + 文字連結右）
生日·公司·學校·畢業·情人節                           （subtitle）

┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
│    │ │    │ │    │ │    │ │    │ │    │   （全部6款一排，圖片為主）
└────┘ └────┘ └────┘ └────┘ └────┘ └────┘
 寶劍   水槍  六瓣花  狗狗   小熊  金屬狗
 $15    $40   $60    $30    $50    $50
```

**手機**
```
快速訂購方案                                         （eyebrow）
造型氣球·送禮新方式               立即訂購 →         （標題左 + 文字連結右）

┌────┐┌────┐┌────┐┌─                               （橫向滑動，右側微露出下一張）
│    ││    ││    ││
│    ││    ││    ││
└────┘└────┘└────┘└─
 寶劍  水槍  六瓣花 ...
 $15   $40   $60
```

**規格說明：**
- subtitle（生日·公司...）手機版不顯示，讓空間給圖片
- 右側「立即訂購 →」為文字連結 style（無背景按鈕）
- 圖片區：全部 6 款商品，每張可點擊 → 進入 `/order-special-package`
- 手機橫滑：`overflow-x: auto`，右側預留半張卡露出，暗示可繼續滑動

---

## 待確認事項

| # | 問題 | 影響 |
|---|------|------|
| 1 | 五個造型示意圖何時備好？ | 斷點 2 可先用 placeholder，圖備好後替換 |
| 2 | 首頁 CTA 區塊位置（ProductCarousel 後？頁尾前？） | 斷點 4 前確認 |

---

## 斷點執行順序

### 斷點 1：商品與配送常數

**範圍：** `constants/balloonShapes.ts`、`constants/deliveryOptions.ts`

**做什麼：**
- 定義造型氣球資料：`{ id, name, price, unit, imageSrc, description }`
- 定義取貨方式資料：`{ id, label, fee, note }`
- 圖片先填 placeholder 路徑

**注意事項：**
- `fee` 用 `number | null`，null 代表「另計」

---

### 斷點 2：OrderCalculator 核心元件

**範圍：** `features/order/OrderCalculator/`（index.tsx + style.ts）

**做什麼：**

造型選擇區：
- 每個造型一張卡片（圖片 + 名稱 + 單價 + +/- 數量 + 小計）
- 桌機 5 欄，手機 2 欄

取貨方式區：
- Radio button 群組
- 選親送或代叫外送時顯示地址輸入欄
- 選 Lalamove 顯示「費用另計，複製後私訊確認」

底部固定欄（sticky bottom）：
- 商品小計 ＋ 運費（另計時顯示 +?） ＝ 總計
- `[重設]` `[複製並私訊 IG]` 按鈕
- 數量全為 0 時複製按鈕 disabled
- 複製後顯示「已複製 ✓」2 秒 feedback，同時開 IG 私訊連結

**複製後訂單格式：**
```
【Boom 蹦娛樂 訂單】

商品：
• 狗狗 × 5　NT$150
• 六瓣花 × 3　NT$180
商品小計：NT$330

取貨方式：親送
地址：（待填）
運費：NT$500

總計：NT$830

備註：

---
請將此訊息私訊至 IG @boom.com_studio，我們會盡快確認！
急單或特殊需求歡迎直接說明。
```

**注意事項：**
- 手機版底部固定欄加足夠 `padding-bottom` 避免擋內容
- 地址欄為 `<textarea>`，placeholder 提示「台北市...區...路...」

---

### 斷點 3：`/order-special-package` 頁面

**範圍：** `app/order-special-package/page.tsx`、`app/order-special-package/OrderPageContent/`

**做什麼：**
- 建立頁面，引入 OrderCalculator
- 頁面頂部加流程說明（選造型 → 選取貨 → 複製 → 私訊）
- SEO metadata
- Navbar 加「訂購」連結入口

---

### 斷點 4：首頁 CTA 區塊

**範圍：** `app/(home)/HomeContent/`，新增 `BalloonOrderCta/`（index.tsx + style.ts）

**做什麼：**
- 標題：「造型氣球，送禮新方式」
- 副標：適合 生日派對 ✦ 班級活動 ✦ 公司小物
- 展示 3 個造型縮圖（狗狗、六瓣花、小熊）+ 價格標示
- CTA 按鈕：「立即訂購 →」→ `/order-special-package`
- 區塊位置待確認

**注意事項：**
- 此區塊是靜態的，不含計算邏輯

---

### 斷點 5：示意圖替換 + 樣式收尾

**範圍：** `public/images/balloon-shapes/`、各元件 style.ts

**做什麼：**
- 實際照片備好後替換 placeholder
- 確認手機版排版
- 配色沿用 `theme.colors.primary.main`

---

---

### 斷點 6：首頁 Banner CTA 調整

**範圍：** `app/(home)/HomeContent/BannerCarousel/MobileBanner/`、`DesktopBanner/`

**問題：**
手機版「探索商品 ↗」獨立浮在圖片下方，視覺割裂、不符合 UX。
參考知名電商做法：整張 banner 圖片本身即為可點擊連結，不另設圖片外的文字連結。

**做什麼：**

手機版（`MobileBanner`）：
- 將每個 `SwiperSlide` 包在 `<Link href="/shop">` 內，整張圖可點
- 移除圖片下方的 `.mobile-banner-actions` 區塊
- `BannerContent.actions` 在手機版不渲染

桌機版（`DesktopBanner`）：
- ✅ 保留 overlay 內的 `.banner-link` 按鈕，桌機空間足夠，視覺合理，不動

**注意事項：**
- `SwiperSlide` 包 `<Link>` 需確認 Swiper 滑動手勢不會誤觸連結（可加 `draggable={false}` 或用 `onClick` 判斷）
- 桌機版如保留 overlay 按鈕，需確保點擊區域不互相干擾

---

## 技術重點

| 項目 | 說明 |
|------|------|
| 狀態管理 | 純 `useState`，頁面級即可 |
| 複製 API | `navigator.clipboard.writeText()` |
| 底部固定欄 | `position: sticky; bottom: 0` + 內容區 `padding-bottom` |
| 取貨 radio | `<input type="radio">` |
| 數量選擇 | 自製 +/- 元件，min 0，無上限 |
| IG 私訊 | `https://ig.me/m/boom.com_studio` |
| 未來擴充 | `balloonShapes.ts` 直接新增項目即可加產品 |

## Revert 說明

- 斷點 1：純常數，可單獨 revert
- 斷點 2：核心元件，revert 後頁面空白
- 斷點 3：revert 後頁面 404，Navbar 連結消失
- 斷點 4：revert 後首頁 CTA 消失，不影響訂購頁
- 斷點 5：純靜態資源 + 樣式，revert 後圖片回 placeholder
