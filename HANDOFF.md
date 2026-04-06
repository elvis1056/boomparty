# Agent 交接文件

> 建立日期：2026-04-04  
> 更新日期：2026-04-06  
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

### 斷點 4：商品個別頁面 `/shop/[id]`（部分完成）✅
已完成：
- `hooks/useProductCart.ts`（新增，option C：只給 ProductDetailContent 使用，ProductCard 不動）
- `app/shop/[id]/page.tsx`（Server Component + generateMetadata）
- `app/shop/[id]/ProductDetailContent/index.tsx`（Client Component）
- `app/shop/[id]/ProductDetailContent/style.ts`

尚未完成（下一個 agent 繼續）：
- `app/shop/ShopContent/index.tsx`：ProductGrid 商品卡片加 Link 連到 `/shop/${id}`
- `app/sitemap.ts`：加入商品個別頁 URL

### 斷點 9：Zustand re-render 優化 ✅
- `stores/authStore.ts`：`setAuth` 加 `isSameUser` 比較，token refresh 不換 user reference
- 8 個元件的 `useAuthStore` selector 從 `state.user`（物件）改為 scalar：
  - 只需要 auth 判斷的元件 → `state.user !== null`（boolean）
  - 需要顯示 username 的 Navbar → `state.user?.username`（string）
  - 需要 email 的 CheckoutContent → `state.user?.email`（string）

---

## 待執行斷點（按優先順序）

### 🔴 斷點 4 剩餘任務（最優先）

**1. `app/shop/ShopContent/index.tsx`（或 `features/shop/ProductGrid/index.tsx`）**

在商品卡片加上連結到詳細頁，給 Google 內部連結信號：

```tsx
// ProductGrid/index.tsx 的 map 改成：
import Link from 'next/link';

{products.map((product) => (
  <Link href={`/shop/${product.id}`} key={product.id} style={{ display: 'contents' }}>
    <ProductCard product={product} />
  </Link>
))}
```

⚠️ `display: contents` 讓 Link 的 `<a>` 不影響 grid layout。  
⚠️ ProductCard 內部的按鈕（加入購物車、立即購買）需加 `e.stopPropagation()` 阻止冒泡到 Link。  
→ 這點要先確認 ProductCard 按鈕是否已有 stopPropagation（目前已有 ✅）

**2. `app/sitemap.ts`**

```ts
import { fetchProducts } from '@/lib/api/products';

// 在 staticPages 後加：
let productPages: MetadataRoute.Sitemap = [];
try {
  const products = await fetchProducts();
  productPages = products.map((product) => ({
    url: `${BASE_URL}/shop/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
} catch {
  // mock 資料或 API 不可用時略過
}

return [...staticPages, ...blogPages, ...productPages];
```

---

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
| 商品 API | `lib/api/products.ts`，`fetchProductById(id)` 打真實 API，`fetchProducts()` 是 mock |
| 商品型別 | `types/product.ts`，有 `id`, `name`, `description`, `price`, `stock`, `imageUrl`, `categoryId`, `categoryName` |
| 認證狀態 | `stores/authStore.ts`，只需 auth 判斷時用 `state.user !== null`（boolean），避免訂閱整個 user 物件 |
| Commit 規範 | 參考 `CLAUDE.md`，禁止 Co-Authored-By，需附中英文說明與 Revert 說明 |
| 樣式系統 | styled-components，主色用 `theme.colors.primary.main`，禁止 inline style |

---

## Git 狀態

斷點 1/2/3/6 已 commit。  
斷點 4（部分）+ 斷點 9 已完成但尚未 commit，下一個 agent 接手後先 commit 再繼續。

**待 commit 清單：**

```
Commit 1 - feat: add product detail page /shop/[id]
  hooks/useProductCart.ts
  app/shop/[id]/page.tsx
  app/shop/[id]/ProductDetailContent/index.tsx
  app/shop/[id]/ProductDetailContent/style.ts

Commit 2 - perf: fix Zustand re-render on token refresh
  stores/authStore.ts
  features/shop/ProductCard/index.tsx
  components/CartButton/index.tsx
  components/Navbar/index.tsx
  app/checkout/CheckoutContent/index.tsx
  app/checkout/page.tsx
  features/cart/CartPageContent/index.tsx
  features/order/OrderListContent/index.tsx
  features/order/OrderDetailContent/index.tsx

Commit 3 - docs: update HANDOFF and SEO plan
  HANDOFF.md
  SEO_FIX_PLAN.md
```
