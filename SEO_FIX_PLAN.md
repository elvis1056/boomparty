# SEO 修復計畫

> 狀態：進行中（斷點 1、2、3 完成）
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

| 順序 | 斷點 | 理由 |
|------|------|------|
| 1st | 斷點 2：Blog 文章動態 Metadata | 內容頁面最有機會被搜尋，直接影響索引數量 |
| 2nd | 斷點 3：Sitemap + Robots 修正 | 讓 Google 重新爬正確頁面，成本最低效益最快 |
| 3rd | 斷點 1：靜態頁面 Metadata | 改善既有頁面在 SERP 的點擊率 |
| 4th | 斷點 4：商品個別頁面 | 工程量最大，但長期 SEO 效益最高 |

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
- 新增 `app/shop/[id]/page.tsx`（Server Component）
- 新增 `app/shop/[id]/ProductDetailContent/index.tsx`（Client Component）
- 新增 `app/shop/[id]/ProductDetailContent/style.ts`
- `app/shop/ShopContent/index.tsx`：商品卡片加上 `<Link href={/shop/${id}}>`
- `app/sitemap.ts`：加入商品個別頁 URL

**⚠️ 注意事項：**
- `fetchProducts()` 目前回傳 mock 資料，`fetchProductById(id)` 才打真實 API
- `generateStaticParams` 需要真實商品列表，**等 `fetchProducts()` 串接真實 API 後才能正確靜態生成**
- 目前先用動態渲染（不加 `generateStaticParams`），等 API 完成後補上

**page.tsx metadata 內容：**
- `title` → `post.name`
- `description` → `post.description`
- `openGraph.images` → `post.imageUrl`

**ProductDetailContent 頁面元素（最小可行）：**
- 商品圖片
- 商品名稱
- 商品描述
- 價格
- 加入購物車按鈕
- 麵包屑導航：首頁 > 商品 > [商品名稱]

---

## 執行注意

- 斷點 1、2、3 互相獨立，可任意順序執行
- 斷點 4 需在斷點 3 之前完成（sitemap 要加商品 URL）
- 每個斷點完成後 commit 一次
