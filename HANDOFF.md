# Agent 交接文件

> 建立日期：2026-04-04  
> 更新日期：2026-04-07  
> 專案：boomparty（Next.js 電商前台）  
> 路徑：`/Users/elvis1056/Desktop/nasweb/boomparty`

---

## 本次工作摘要

為 boomparty.tw 進行 SEO 改善，並修正 Zustand re-render 問題。

**完整計畫文件：** `SEO_FIX_PLAN.md`（專案根目錄）

---

## 已完成斷點

### 斷點 1：靜態頁面 Metadata ✅
- `app/shop/page.tsx`
- `app/blog/page.tsx`
- `app/about/page.tsx`
各自加入 `export const metadata`

### 斷點 2：Blog 文章動態 Metadata ✅
- `app/blog/[slug]/page.tsx`：新增 `generateMetadata`
- `lib/api/blog.ts`：`fetchBlogPosts` 用 `React.cache()` 包住，避免同一請求週期雙重 fetch

### 斷點 3：Sitemap + Robots 修正 ✅
- `app/sitemap.ts`：移除 `/components/pill`
- `app/robots.ts`：新增 booking 流程頁面 disallow

### 斷點 6：Layout 地區關鍵字 ✅
- `app/layout.tsx`：title 加入「活動公關」，keywords 補充台北/台灣在地關鍵字

### 斷點 4：商品個別頁面 `/shop/[id]` ✅
- `hooks/useProductCart.ts`（新增，只給 ProductDetailContent 使用，ProductCard 不動）
- `app/shop/[id]/page.tsx`（Server Component + generateMetadata + generateStaticParams）
- `app/shop/[id]/ProductDetailContent/index.tsx`（Client Component）
- `app/shop/[id]/ProductDetailContent/style.ts`
- `features/shop/ProductGrid/index.tsx`：每張卡片加 Link 連至 `/shop/${id}`
- `app/sitemap.ts`：加入商品個別頁 URL

**`generateStaticParams` 說明：**
目前用 `mockProducts` 預先靜態生成已知商品頁面。`dynamicParams = true`（Next.js 預設），mock 沒有的 ID 自動動態渲染，不會 404。等 `fetchProducts()` 串接真實 API 後，將 `mockProducts` 替換為 `await fetchProducts()` 即可，一行修改。

### 斷點 4.1：`/shop/[id]` API 失敗時 404 修正 ✅
- `app/shop/[id]/page.tsx`：`generateMetadata` 和 `ProductPage` 都加 mock fallback，API 失敗時自動用 `mockProducts.find()` 渲染

### 斷點 4.2：麵包屑 + metadata description 補完 ✅（未 commit）
- `components/Breadcrumb/index.tsx`（新增，可複用）
- `components/Breadcrumb/style.ts`（手機版 `max-width: 140px` truncate）
- `app/shop/[id]/ProductDetailContent/index.tsx`：引入 `<Breadcrumb>` 取代 inline nav
- `app/shop/[id]/page.tsx`：description 格式改為 `${product.description}，由蹦娛樂 BoomParty 專業氣球佈置團隊執行。`

### 手機版固定底部購買列（未 commit）
- `app/shop/[id]/ProductDetailContent/index.tsx`：新增 fixed bottom bar（高度 56px）
  - 左側 icon 群：追蹤（heart SVG）、購物車（cart SVG + 紅色 badge 數量，點擊跳 `/cart`）
  - 右側：加入購物車、立即購買
- 手機版隱藏右欄 `.product-actions`，改用 fixed bar；桌機不顯示 fixed bar

### 斷點 9：Zustand re-render 優化 ✅
- `stores/authStore.ts`：`setAuth` 加 `isSameUser` 比較，token refresh 不換 user reference
- 8 個元件的 `useAuthStore` selector 從 `state.user`（物件）改為 scalar：
  - 只需要 auth 判斷的元件 → `state.user !== null`（boolean）
  - 需要顯示 username 的 Navbar → `state.user?.username`（string）
  - 需要 email 的 CheckoutContent → `state.user?.email`（string）

---

## 待執行斷點（按優先順序）

### 🔴 斷點 4.5：useProductCart hook 整合 ProductCard（路線 2）

**背景：** 目前 `hooks/useProductCart.ts` 只被 `ProductDetailContent` 使用（option C）。ProductCard 仍有一份獨立的購物車邏輯（約 80 行）。未來整合可消除重複。

**路線 2 整合步驟（按此順序執行）：**

1. **修改 `hooks/useProductCart.ts`**：移除所有函式裡的 `e.stopPropagation()`
   - `addToCart`、`buyNowGotoCart` 移除 `e.stopPropagation()` 和 `e` 參數
   - `decreaseQuantity`、`increaseQuantity`、`clickQuantityInput` 移除 `e.stopPropagation()`
   - interface `UseProductCartReturn` 對應更新函式簽名

2. **更新 `ProductDetailContent/index.tsx`**：按鈕 onClick 不需要改（本來就沒有父層 onClick）

3. **修改 `features/shop/ProductCard/index.tsx`**：
   - 刪除 `useRouter`、`useAuthStore`、`useCartStore` import
   - 刪除所有 local state（quantity、isAdding、justAdded）和函式
   - 加入 `useProductCart(product)` 呼叫
   - 按鈕改成 `onClick={(e) => { e.stopPropagation(); addToCart(); }}`（元件層加 stopPropagation）
   - 修正圖片 alt：`` `${product.name} 氣球佈置 蹦娛樂 BoomParty` ``

4. **修改 `features/shop/ProductCard/style.ts`**：加入 `.card-image-link { display: block; }`

5. **更新 `hooks/index.ts`**：確認已 export `useProductCart`

6. **Lint + 測試**

⚠️ Revert 說明：若 ProductCard 行為異常，revert 步驟 3 即可，hook 和 ProductDetailContent 不受影響。

---

### 🟡 斷點 5：商品描述內容優化（用戶手動）

**這是內容工作，不是程式碼工作。**
用戶需要進資料庫將每個商品的 `description` 改成情境化描述（50-150 字）。
Agent 不需要動程式碼，提醒用戶補充即可。

---

### 🟡 斷點 7：服務場景落地頁（純靜態）

新增四個落地頁（HTML 骨架由 agent 建，文字內容由用戶補充）：
- `app/service/wedding/page.tsx`
- `app/service/birthday/page.tsx`
- `app/service/corporate/page.tsx`
- `app/service/proposal/page.tsx`
- `app/sitemap.ts`：加入以上四頁

**每頁結構：** H1（含關鍵字）→ 服務說明段落 → 案例圖片 → CTA 按鈕

---

### 🟡 斷點 8：JSON-LD 結構化資料（依賴斷點 4）

斷點 4 完成後執行：
- `app/shop/[id]/page.tsx`：加入 `Product` + `BreadcrumbList` JSON-LD
- `app/blog/[slug]/page.tsx`：加入 `Article` + `BreadcrumbList` JSON-LD

目標：Google SERP 顯示價格、庫存（rich result），提升 CTR

---

## 技術重點提醒

| 項目 | 說明 |
|------|------|
| 購物車 store | `stores/cartStore.ts`，`addItem(productId, quantity)` |
| 商品 API | `lib/api/products.ts`，`fetchProductById(id)` 打真實 API，`fetchProducts()` 是 mock。`generateStaticParams` 目前用 mock，換成真實 API 只需改一行 |
| 商品型別 | `types/product.ts`，有 `id`, `name`, `description`, `price`, `stock`, `imageUrl`, `categoryId`, `categoryName` |
| 認證狀態 | `stores/authStore.ts`，只需 auth 判斷時用 `state.user !== null`（boolean），避免訂閱整個 user 物件 |
| Commit 規範 | 參考 `CLAUDE.md`，禁止 Co-Authored-By，需附中英文說明與 Revert 說明 |
| 樣式系統 | styled-components，主色用 `theme.colors.primary.main`，禁止 inline style |

---

## Git 狀態

**已 commit：**
- 斷點 1/2/3/6
- 斷點 9：Zustand re-render 優化
- 斷點 4：商品個別頁面（含 generateStaticParams）
- 斷點 4.1：mock fallback 修正 404
- Footer 移至 `(home)` layout（首頁限定）
- 首頁 Banner 手機版 `min-width` 破版修正

**未 commit（本次對話改動）：**
- 斷點 4.2：`components/Breadcrumb/`（新增）、`ProductDetailContent` 引入麵包屑、metadata description 格式
- 手機版固定底部購買列（`ProductDetailContent` index + style）
- `CLAUDE.md` commit message 規範補充
