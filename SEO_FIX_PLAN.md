# SEO 修復計畫

> 狀態：進行中（斷點 1、2、3、4、6、9 完成）
> 建立日期：2026-04-04
> 背景：Google Search Console 顯示 62 頁未被索引、8 頁已索引、總點擊數 1 次

---

## 問題診斷

| 優先 | 問題 | 影響 |
|------|------|------|
| 🔴 | `blog/[slug]/page.tsx` 無 `generateMetadata` | 每篇文章標題重複，Google 拒絕索引或降權 |
| 🔴 | 商品無個別頁面，Google 無法爬到單一商品 | 商品完全不存在於搜尋引擎 |
| 🟡 | `shop/page.tsx`、`blog/page.tsx`、`about/page.tsx` 無 metadata | SERP 顯示錯誤標題與描述 |
| 🟡 | `sitemap.ts` 混入 `/components/pill`（開發頁面） | 污染 sitemap |
| 🟡 | `robots.ts` 未 disallow booking 流程頁面 | 爬蟲浪費在無意義頁面 |

---

## 執行優先順序

| 順序 | 斷點 | 狀態 | 理由 |
|------|------|------|------|
| 1st | 斷點 2：Blog 文章動態 Metadata | ✅ 完成 | 內容頁面最有機會被搜尋，直接影響索引數量 |
| 2nd | 斷點 3：Sitemap + Robots 修正 | ✅ 完成 | 讓 Google 重新爬正確頁面，成本最低效益最快 |
| 3rd | 斷點 1：靜態頁面 Metadata | ✅ 完成 | 改善既有頁面在 SERP 的點擊率 |
| 4th | 斷點 6：Layout 地區關鍵字 | ✅ 完成 | 獨立且快，全站立即受益 |
| 5th | 斷點 4：商品個別頁面 | ✅ 完成 | 工程量最大，長期 SEO 效益最高（含相關商品、alt 優化） |
| 6th | 斷點 5：商品描述內容優化 | 待執行（你手動） | 最直接影響 AI 搜尋排名，需補充資料庫描述文字 |
| 7th | 斷點 8：JSON-LD 結構化資料 | 待執行（依賴斷點 4） | 大型電商模式，rich result 提升 CTR |
| 8th | 斷點 7：服務場景落地頁 | 待執行 | 增加索引頁面數，捕捉場景搜尋（需你補充文字） |

---

## 修復斷點

---

### ✅ 斷點 1：靜態頁面 Metadata

**範圍：**
- `app/shop/page.tsx`
- `app/blog/page.tsx`
- `app/about/page.tsx`

**修復內容：**

`shop/page.tsx`
```
title: '氣球佈置商品 | 蹦娛樂 BoomParty'
description: '瀏覽蹦娛樂 BoomParty 全系列氣球佈置商品，造型氣球、空飄氣球、婚禮求婚生日佈置一站購足。'
```

`blog/page.tsx`
```
title: '氣球佈置教學與活動紀錄 | 蹦娛樂 BoomParty'
description: '蹦娛樂 BoomParty 部落格，分享氣球佈置技巧、活動公關案例、婚禮婚宴佈置紀錄。'
```

`about/page.tsx`
```
title: '關於我們 | 蹦娛樂 BoomParty 活動公關'
description: '蹦娛樂 BoomParty 是台灣專業活動公關與氣球佈置團隊，提供婚禮、企業尾牙、生日派對、演唱會等各式活動整體規劃與執行。'
keywords: 活動公關, 活動策劃, 婚禮公關, 企業活動, 台灣活動公關
```

---

### ✅ 斷點 2：Blog 文章動態 Metadata

**範圍：**
- `app/blog/[slug]/page.tsx`
- `lib/api/blog.ts`

**修復內容：**

`app/blog/[slug]/page.tsx` — 新增 `generateMetadata`，從 `fetchBlogPostBySlug(slug)` 取得：
- `title` → `post.title`
- `description` → `post.excerpt`
- `openGraph.images` → `post.imageUrl`
- `openGraph.type` → `'article'`
- `openGraph.authors` → `post.author`

`lib/api/blog.ts` — 用 `React.cache()` 包住 `fetchBlogPosts()`：
- `generateMetadata` 和 `BlogPostPage` 都會呼叫 `fetchBlogPostBySlug`，兩者都內部呼叫 `fetchBlogPosts()`
- 不加 cache 會在同一個請求週期載入兩次全部文章的 markdown
- `cache` 是 React 18 Server Component 專用 API，同一請求內相同呼叫只執行一次
- 加在 `fetchBlogPosts` 即可，`fetchBlogPostBySlug` / `fetchBlogPostById` 自動受益

```ts
// lib/api/blog.ts
import { cache } from 'react';

export const fetchBlogPosts = cache(async (): Promise<BlogPost[]> => {
  // ...
});
```

---

### ✅ 斷點 3：Sitemap + Robots 修正

**範圍：**
- `app/sitemap.ts`
- `app/robots.ts`

**sitemap.ts 修復內容：**
- 移除 `/components/pill`（開發頁面，不應出現在 sitemap）
- 商品個別頁面待斷點 4 完成後加入（`/shop/[id]`）

**robots.ts 修復內容：**
新增 disallow：
```
/booking/confirm
/booking/success
/booking/status
/booking/form
```

---

### ✅ 斷點 4：商品個別頁面 `/shop/[id]`

**範圍：**
- 新增 `hooks/useProductCart.ts`（共用購物車邏輯 hook）
- 新增 `app/shop/[id]/page.tsx`（Server Component）
- 新增 `app/shop/[id]/ProductDetailContent/index.tsx`（Client Component）
- 新增 `app/shop/[id]/ProductDetailContent/style.ts`
- `features/shop/ProductCard/index.tsx`：改用 `useProductCart` hook
- `app/shop/ShopContent/index.tsx`：商品卡片加上 `<Link href="/shop/${id}">`
- `app/sitemap.ts`：加入商品個別頁 URL

**⚠️ 注意事項：**
- `fetchProducts()` 目前回傳 mock 資料，`fetchProductById(id)` 才打真實 API
- `generateStaticParams` 需要真實商品列表，**等 `fetchProducts()` 串接真實 API 後才能正確靜態生成**
- 目前先用動態渲染（不加 `generateStaticParams`），等 API 完成後補上

**page.tsx metadata 內容（長尾關鍵字格式，參考麋鹿/芝加哥氣球競品）：**
- `title` → `${product.name} | 台灣氣球佈置 蹦娛樂 BoomParty`
- `description` → `${product.description}，由蹦娛樂 BoomParty 專業氣球佈置團隊執行。`
- `openGraph.images` → `product.imageUrl`

**購物車邏輯（useProductCart hook）管理：**
- `quantity` state（數量選擇）
- `isAdding`、`justAdded` state（按鈕狀態）
- `addToCart()`：呼叫 `useCartStore.addItem`，未登入跳 `/login`
- `buyNowGotoCart()`：加入購物車後跳轉 `/cart`

**ProductDetailContent 版面（桌機左右欄 / 手機單欄）：**
```
桌機：
┌─────────────────────────────────────────────┐
│  首頁 > 商品 > [商品名稱]                    │ ← 麵包屑
├─────────────────┬───────────────────────────┤
│                 │  [分類標籤]                │
│  商品主圖       │  商品名稱 H1              │
│  （1:1 正方形） │  NT$ 價格                 │
│                 │  商品描述                  │
│                 │  數量選擇器               │
│                 │  [加入購物車] [立即購買]   │
└─────────────────┴───────────────────────────┘
─────────────────────────────────────────────
你可能也喜歡（同分類商品，4 格）
[商品A]  [商品B]  [商品C]  [商品D]

手機：
┌──────────────────────────┐
│ 首頁 > 商品 > 商品名稱   │
│ 商品主圖（全寬 1:1）     │
│ [分類標籤]               │
│ 商品名稱 H1              │
│ NT$ 價格                 │
│ 商品描述                 │
│ 數量選擇器               │
│ [加入購物車] [立即購買]  │ ← 並排全寬平分
──────────────────────────
你可能也喜歡（2x2 格）
[商品A]  [商品B]
[商品C]  [商品D]
└──────────────────────────┘
```

**相關商品（你可能也喜歡）實作方式：**
- 從同 `categoryId` 的商品中取最多 4 筆（排除當前商品）
- 使用現有 mock 資料，不需額外 API
- 點擊跳轉到對應 `/shop/[id]`（內部連結，SEO + 轉換雙效益）

**圖片 alt 優化（一起做）：**
- 商品主圖：`alt="${product.name} 氣球佈置 蹦娛樂 BoomParty"`
- 同步修正 `features/shop/ProductCard/index.tsx` 的 alt

---

### 斷點 5：商品描述內容優化（內容層面，需你手動補充）

**依據：** 2026 AI 搜尋引擎重視「情境描述」，短描述幾乎不會被索引或推薦

**你需要做的事（非程式碼）：**
進資料庫將每個商品的 `description` 改成情境化描述，格式參考：

```
情境 + 風格 + 適用場合 + 服務特色
```

**改寫前後範例：**
```
❌ 現在：「亮眼花瓣顏色」
✅ 改後：「[你補充]」

❌ 現在：「主題背板佈置，兩側玫瑰金與白色有機氣球柱」
✅ 改後：「[你補充]」
```

**優先補充的商品（流量潛力高）：**
- [ ] 婚禮 / 求婚類商品
- [ ] 企業尾牙 / 開幕類商品
- [ ] 生日 / 派對類商品

**描述建議長度：** 50-150 字，自然帶入 2-3 個關鍵字即可，不要刻意堆砌

---

### 斷點 6：Layout 加入地區關鍵字

**競品依據：** 麋鹿氣球全站 title 帶「台北台中」，捕捉在地搜尋

**範圍：**
- `app/layout.tsx`

**修復內容：**
- `title.default` 加入「台灣」：`蹦娛樂 BoomParty | 台灣專業氣球佈置與活動公關`
- `keywords` 補充地區關鍵字：台北氣球佈置、台灣活動公關、台北活動佈置

---

### 斷點 7：服務場景落地頁

**競品依據：** 芝加哥氣球為每個服務場景建立獨立頁面，大幅增加被索引頁面數

**範圍（全部純靜態，不需 API）：**
- 新增 `app/service/wedding/page.tsx`（婚禮佈置）
- 新增 `app/service/birthday/page.tsx`（生日派對）
- 新增 `app/service/corporate/page.tsx`（企業開幕）
- 新增 `app/service/proposal/page.tsx`（求婚告白）
- `app/sitemap.ts`：加入以上四頁

**每頁結構：**
- H1：明確服務名稱（含關鍵字）
- 服務說明段落（關鍵字密度）
- 案例作品展示（可複用現有商品圖）
- CTA：立即預約 / 前往選購

**各頁 title / keywords 規劃：**
```
婚禮佈置：婚禮氣球佈置, 婚禮活動公關, 台灣婚禮佈置
生日派對：生日氣球佈置, 生日派對佈置, 台北生日佈置
企業開幕：企業活動公關, 開幕活動佈置, 台灣企業活動
求婚告白：求婚佈置, 告白氣球, 台北求婚佈置
```

---

### 斷點 8：JSON-LD 結構化資料（大型電商模式）

**競品依據：** momo / 蝦皮等大型電商使用 Product Schema + BreadcrumbList，
讓 Google SERP 顯示價格、庫存、麵包屑路徑（rich result），直接提升 CTR

**範圍：**
- `app/shop/[id]/page.tsx`：加入 Product + BreadcrumbList JSON-LD
- `app/blog/[slug]/page.tsx`：加入 Article + BreadcrumbList JSON-LD

**商品頁 JSON-LD 結構（最小可行）：**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "商品名稱",
  "image": "商品圖片URL",
  "description": "商品描述",
  "offers": {
    "@type": "Offer",
    "price": "8800",
    "priceCurrency": "TWD",
    "availability": "https://schema.org/InStock"
  }
}
```

**BreadcrumbList JSON-LD：**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://boomparty.tw" },
    { "@type": "ListItem", "position": 2, "name": "商品", "item": "https://boomparty.tw/shop" },
    { "@type": "ListItem", "position": 3, "name": "商品名稱", "item": "https://boomparty.tw/shop/[id]" }
  ]
}
```

**⚠️ 注意：** 斷點 4 完成後才能做斷點 8（商品頁要存在）

---

## 執行注意

- 斷點 1、2、3 已完成
- 斷點 4 完成後更新 sitemap（加商品 URL）
- 斷點 5（商品描述）：你手動更新資料庫內容，無時序限制
- 斷點 6 獨立，可任意時間執行
- 斷點 7 在斷點 4 之後執行（sitemap 一起更新）
- 斷點 8 依賴斷點 4（商品頁需存在）
- 每個斷點完成後 commit 一次
