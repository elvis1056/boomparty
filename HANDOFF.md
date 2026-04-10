# Agent 交接文件

> 建立日期：2026-04-04  
> 更新日期：2026-04-09  
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
- `hooks/useProductCart.ts`（新增，供 ProductDetailContent 與 ProductCard 共用）
- `app/shop/[id]/page.tsx`（Server Component + generateMetadata + generateStaticParams + JSON-LD）
- `app/shop/[id]/ProductDetailContent/index.tsx`（Client Component）
- `app/shop/[id]/ProductDetailContent/style.ts`
- `features/shop/ProductGrid/index.tsx`：每張卡片加 Link 連至 `/shop/${id}`
- `app/sitemap.ts`：加入商品個別頁 URL

**`generateStaticParams` 說明：**
目前用 `mockProducts` 預先靜態生成已知商品頁面。`dynamicParams = true`（Next.js 預設），mock 沒有的 ID 自動動態渲染，不會 404。等 `fetchProducts()` 串接真實 API 後，將 `mockProducts` 替換為 `await fetchProducts()` 即可，一行修改。

### 斷點 4.1：`/shop/[id]` API 失敗時 404 修正 ✅
- `app/shop/[id]/page.tsx`：`generateMetadata` 和 `ProductPage` 都加 mock fallback，API 失敗時自動用 `mockProducts.find()` 渲染

### 斷點 4.2：麵包屑 + metadata description 補完 ✅
- `components/Breadcrumb/index.tsx`（新增，可複用）
- `components/Breadcrumb/style.ts`（手機版 `max-width: 140px` truncate）
- `app/shop/[id]/ProductDetailContent/index.tsx`：引入 `<Breadcrumb>` 取代 inline nav
- `app/shop/[id]/page.tsx`：description 格式改為 `${product.description}，由蹦娛樂 BoomParty 專業氣球佈置團隊執行。`

### 手機版固定底部購買列 ✅
- `app/shop/[id]/ProductDetailContent/index.tsx`：新增 fixed bottom bar（高度 56px）
  - 左側 icon 群：追蹤（heart SVG）、購物車（cart SVG + 紅色 badge 數量，點擊跳 `/cart`）
  - 右側：加入購物車、立即購買
- 手機版隱藏右欄 `.product-actions`，改用 fixed bar；桌機不顯示 fixed bar

### 斷點 4.5：useProductCart hook 整合 ProductCard ✅
- `hooks/useProductCart.ts`：移除所有函式的 `e.stopPropagation()`，函式簽名改為無 `e` 參數（`clickQuantityInput` 保留 `e` 供 `target.select()`）
- `features/shop/ProductCard/index.tsx`：
  - 刪除 local 的 `useRouter`、`useAuthStore`、`useCartStore`、state、函式
  - 改用 `useProductCart(product)`
  - 按鈕 onClick 在元件層加 `e.stopPropagation()`（避免冒泡至外層 `<Link>`）
  - 圖片 alt 改為 `` `${product.name} 氣球佈置 蹦娛樂 BoomParty` ``
- `features/shop/ProductCard/style.ts`：加入 `.card-image-link { display: block; }`

### 斷點 8：JSON-LD 結構化資料 ✅
- `app/shop/[id]/page.tsx`：加入 Product + BreadcrumbList JSON-LD（`<script type="application/ld+json">`）
- `app/blog/[slug]/page.tsx`：加入 Article + BreadcrumbList JSON-LD
  - 重構為 `return notFound()` early return 模式，JSON-LD 建構在 try-catch 外層，結構清楚

### 斷點 7：服務場景落地頁 ✅（骨架完成，文字待補）
- `app/service/wedding/page.tsx`（婚禮氣球佈置）
- `app/service/birthday/page.tsx`（生日派對佈置）
- `app/service/corporate/page.tsx`（企業活動公關）
- `app/service/proposal/page.tsx`（求婚告白佈置）
- `app/sitemap.ts`：加入以上四頁
- 每頁包含：metadata（title/description/keywords/og）、JSON-LD Service schema、H1、服務項目清單、CTA 連結
- **各頁都有 `{/* TODO */}` 標記**，待補充：情境描述文字（100-150字）、案例圖片

### 斷點 9：Zustand re-render 優化 ✅
- `stores/authStore.ts`：`setAuth` 加 `isSameUser` 比較，token refresh 不換 user reference
- 8 個元件的 `useAuthStore` selector 從 `state.user`（物件）改為 scalar：
  - 只需要 auth 判斷的元件 → `state.user !== null`（boolean）
  - 需要顯示 username 的 Navbar → `state.user?.username`（string）
  - 需要 email 的 CheckoutContent → `state.user?.email`（string）

---

### Guest Cart（未登入購物車）✅（⚠️ lint 尚未確認）

完整計畫：`GUEST_CART_PLAN.md`

**架構：**
- 未登入 → `addGuestItem` 存進 Zustand（persist 到 `localStorage` key: `boomparty-guest-cart`）
- 登入後 → `syncGuestCart()` 逐一呼叫 `addItem` API，同步完成後 `clearGuestItems()`
- 登出 → `clearGuestItems()`（防止不同帳號看到前一個人的 guest cart）

**注意事項：**
- `cartStore` 使用 `zustand/middleware` 的 `persist`，`partialize` 只持久化 `guestItems`，server `cart` 不存 localStorage
- SSR 防護：storage 用 `typeof window === 'undefined'` 判斷，SSR 時回傳 no-op storage
- `syncGuestCart` 逐一 try/catch，單筆失敗不中斷，同步後一定 `clearGuestItems()`
- `CartButton` 未登入時顯示 `getTotalGuestItems()`，已登入顯示 `getTotalItems()`

**Facebook OAuth：** 計畫見 `FACEBOOK_OAUTH_PLAN.md`，需等後端 `POST /api/auth/facebook/login` + Facebook App ID，前端完成後在登入 callback 加 `syncGuestCart()`

---

## 待執行（你手動）

### 🟡 斷點 5：商品描述內容優化

**這是內容工作，不是程式碼工作。**
進資料庫將每個商品的 `description` 改成情境化描述（50-150 字）。
格式：情境 + 風格 + 適用場合 + 服務特色

**優先補充（流量潛力高）：**
- [ ] 婚禮 / 求婚類商品
- [ ] 企業尾牙 / 開幕類商品
- [ ] 生日 / 派對類商品

### 🟡 斷點 7 內容補完（進行中，未 commit）

四個落地頁已完成：
- ✅ 共用元件 `features/service/ServicePageContent/`（index.tsx + style.ts）
- ✅ 情境描述文字（三段式分段，SEO 友好）
- ✅ 服務項目內容（各頁 5 項）
- ✅ 案例圖片接入（真實照片，9 張已重新命名至 `public/images/service-picture/`）
- ✅ Hero、描述區、服務項目、Gallery、CTA 版型完成

**尚未完成（下一個 agent 接手）：**
- [ ] **斷點 7-A：service-icon 對應**
  - `ServiceItem` 介面加 `icon: string` 欄位
  - 各 page.tsx 傳入對應 emoji（見下方對照表）
  - 元件改用 `{service.icon}` 取代寫死的 🎈

  ```
  婚禮：💒 背板 / 🌟 拱門 / 🌸 桌花 / 🎈 空飄 / 📋 公關統籌
  生日：🎨 主題設計 / 🎂 背板 / 🚗 到府佈置 / 👶 抓周 / 🎊 性別揭曉
  企業：✂️ 開幕剪綵 / 🥂 尾牙 / 🚀 啟動儀式 / 📸 媒體背板 / 📊 整合行銷
  求婚：💍 客製佈置 / 🏨 飯店包廂 / 🚗 後車廂 / 🌿 戶外場景 / 💌 文字氣球
  ```

- [ ] **斷點 7-B：Navbar 服務 dropdown**
  - `navLinks` 加入「服務」項目，帶 dropdown 展開四個子頁
  - 參考現有 `user-menu-dropdown` 實作（Navbar 第 121-138 行）
  - 子連結：`/service/wedding`、`/service/birthday`、`/service/corporate`、`/service/proposal`

- [ ] **斷點 7-C：首頁服務區塊**
  - 在首頁加「我們的服務」section，四個卡片連到四個落地頁
  - 位置：ProductCarousel 下方
  - 風格參考：`features/shop/ProductCard/style.ts`

- [ ] **斷點 7-D：commit 所有未 commit 的改動**
  - `features/service/ServicePageContent/`（新增）
  - `app/service/*/page.tsx`（四頁更新）
  - `public/images/service-picture/`（9 張照片重新命名）
  - `HANDOFF.md`

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
| JSON-LD 模式 | Server Component 直接 `<script dangerouslySetInnerHTML>` 輸出，不需 client JS |
| Blog 頁結構 | `return notFound()` early return，fetch 後 TypeScript 可推斷 `post` 有值 |

---

## Git 狀態

**全部已 commit（截至 2026-04-10）：**
- 斷點 1/2/3/6
- 斷點 9：Zustand re-render 優化
- 斷點 4：商品個別頁面（含 generateStaticParams）
- 斷點 4.1：mock fallback 修正 404
- Footer 移至 `(home)` layout（首頁限定）
- 首頁 Banner 手機版 `min-width` 破版修正
- 斷點 4.5：useProductCart 整合 ProductCard
- 斷點 8：JSON-LD（shop + blog）
- 斷點 7：服務場景落地頁（四頁 + sitemap）
- SEO_FIX_PLAN.md 搬至 `docs/archive/`
- Guest Cart 全部斷點：`GuestCartItem` 型別、cartStore persist + 7 天 TTL、useProductCart、LoginContent/GoogleLoginButton/Navbar/CartButton 整合、CartPageContent guest 顯示
- fix: Zustand persist hydration error（`skipHydration: true` + `CartButton` 手動 rehydrate）
- fix: /shop 頁按鈕點擊跳轉問題（Link 移進 ProductCard，只包圖片和商品名稱）

**未 commit（本次對話，下一個 agent 需先 lint 再 commit）：**
- `features/service/ServicePageContent/index.tsx`（新增）
- `features/service/ServicePageContent/style.ts`（新增）
- `app/service/wedding/page.tsx`（更新）
- `app/service/birthday/page.tsx`（更新）
- `app/service/corporate/page.tsx`（更新）
- `app/service/proposal/page.tsx`（更新）
- `public/images/service-picture/`（9 張照片重新命名，untracked）
- `HANDOFF.md`（本文件）
