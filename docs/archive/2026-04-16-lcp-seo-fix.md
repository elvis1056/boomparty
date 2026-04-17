# LCP 修正 + SEO 補完計畫

> 建立日期：2026-04-16
> 狀態：進行中

## 背景

全面診斷首頁 LCP 和站內 SEO 後，發現以下問題：
1. Banner 第一張圖未 preload，LCP 圖片下載時機太晚
2. `public/sitemap.xml`（程式開發文章）覆蓋了正確的 `app/sitemap.ts`
3. 沒有 `robots.txt`
4. 所有頁面 OpenGraph 缺少 `og:image`，社群分享沒有預覽圖

---

## 斷點執行順序

### 斷點 1：preload Banner 第一張圖

**範圍：** `app/(home)/page.tsx`

**做什麼：**
- 在現有 preload links 最前面加入 Banner 第一張圖的 preload
- 使用 `assetPath('/images/banner/000.jpg')` 確保路徑與實際渲染一致

**注意事項：**
- `ssr: false` 下 preload 效果有限（圖片仍然要等 JS render 後才顯示），但可以讓圖片在 bundle 下載期間同步下載，減少最終顯示延遲
- `assetPath` 從 `@/lib/utils/asset-path` 匯入（server component 可直接呼叫）

---

### 斷點 2：刪除 `public/sitemap.xml`

**範圍：** `public/sitemap.xml`（刪除）

**做什麼：**
- 直接刪除，讓 `app/sitemap.ts` 接管 `/sitemap.xml` 路由
- `app/sitemap.ts` 已有正確的靜態頁清單 + 動態 blog/product 撈取

**注意事項：**
- Next.js 的 `public/` 靜態檔案會蓋過 app router 的 route handler，所以必須刪除才能讓動態 sitemap 生效
- 刪除後要確認 `/sitemap.xml` 仍能訪問（動態版本接手）

---

### 斷點 3：新增 `robots.txt`

**範圍：** `public/robots.txt`（新增）

**做什麼：**
- 允許所有爬蟲，指向 sitemap

```
User-agent: *
Allow: /
Sitemap: https://boomparty.tw/sitemap.xml
```

---

### 斷點 4：補全 `og:image`

**範圍：** `app/layout.tsx`

**做什麼：**
- 在 `openGraph` 加入 `images`（使用 `/boomparty-logo.jpg`，絕對路徑）
- 在 `twitter` 加入 `images`

**注意事項：**
- `og:image` 需要絕對 URL（`https://boomparty.tw/boomparty-logo.jpg`）
- 理想尺寸 1200×630px；logo 可能不符，這是快速修正，後續可換成專屬 OG 圖
- 各 service 頁若有特定 OG 圖更好，但目前先讓所有頁都有預設圖

---

## 技術重點

| 項目 | 說明 |
|------|------|
| sitemap 衝突 | `public/` 靜態檔優先，`app/sitemap.ts` 在靜態檔存在時完全無效 |
| og:image 格式 | 必須絕對 URL，不接受相對路徑 |
| preload 限制 | Banner `ssr: false` 導致 preload 只能讓圖片「更早下載」，仍要等 JS 渲染才顯示 |
| Blog 內容問題 | `public/sitemap.xml` 包含程式開發文章，與品牌無關，需用戶確認 blog 定位後處理 |

## Revert 說明

- 斷點 1：獨立，移除 preload link 即可
- 斷點 2：可還原（git restore），注意 `public/sitemap.xml` 還原後會再度覆蓋動態版本
- 斷點 3：獨立，刪除 robots.txt 即可
- 斷點 4：獨立，移除 openGraph images 欄位即可
