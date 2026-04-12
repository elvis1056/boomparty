# Agent 交接文件

> 更新日期：2026-04-11  
> 專案：boomparty（Next.js 電商前台）  
> 路徑：`/Users/elvis1056/Desktop/nasweb/boomparty`

---

## 🔧 工作流程（新 agent 請先看這裡）

```
/new-plan <功能名稱>   ← 開始新功能，在 docs/sessions/ 建計畫檔
（做事）
/handoff               ← 結束，commit + 更新此文件 + 輸出摘要
```

計畫檔位置：`docs/sessions/`  
已完成計畫：`docs/archive/`

---

## 進行中計畫

### 🟡 LINE_ALBUM 圖片整理 + 造型氣球商品補齊（進行中）

計畫文件：[`docs/sessions/2026-04-12-line-album-organize.md`](docs/sessions/2026-04-12-line-album-organize.md)
（整合自 `2026-04-11-balloon-shapes-50.md`，舊計畫已廢棄）

- [x] 斷點 1：逐張讀取圖片，建立分類對照表（以實際檔案結構取代）
- [x] 斷點 2：批次搬移 + 重命名至 `造型氣球/` 子資料夾（完成，根目錄 4 張廣告圖忽略）
- [x] 斷點 3：ProductCard `imageUrl` 為空時改用 `<Shimmer />`
- [x] 斷點 4：以實際圖片重建商品清單（動物造型 5 筆上架，卡通 IP 52 筆暫放 `copyrightProducts`）

---

### 🟡 首頁 LCP 改善（進行中）

計畫文件：[`docs/sessions/2026-04-11-homepage-lcp.md`](docs/sessions/2026-04-11-homepage-lcp.md)

- [ ] 斷點 1：移除 body opacity fade-in（`app/layout.tsx`）
- [ ] 斷點 2：ServicesSection 圖片加 `priority`
- [ ] 斷點 3：BannerCarousel 移除不必要的 dynamic import
- [ ] 斷點 4：Preload 關鍵圖片（選做）

---

### 🟡 Facebook OAuth
計畫文件：[`docs/sessions/2026-04-10-facebook-oauth.md`](docs/sessions/2026-04-10-facebook-oauth.md)

**前置條件（需等後端，前端無法進行）：**
- [ ] 後端完成 `POST /api/auth/facebook/login`
- [ ] 取得 Facebook App ID（Facebook Developer Console）

**前端斷點（後端完成後執行）：**
- [ ] 斷點 1：安裝 `@greatsumini/react-facebook-login`，加 `NEXT_PUBLIC_FACEBOOK_APP_ID`
- [ ] 斷點 2：更新 `lib/api/auth.ts` 的 `loginWithFacebook()`
- [ ] 斷點 3：新增 `components/FacebookLoginButton/`
- [ ] 斷點 4：更新 `app/login/LoginContent/index.tsx`
- [ ] 斷點 5：Facebook Developer Console 設定（手動）

登入成功後記得加 `syncGuestCart()`（Guest Cart 已完成）

---

## 待執行（手動內容工作）

### 🟡 商品描述內容優化

進資料庫將每個商品的 `description` 改成情境化描述（50-150 字）。  
格式：情境 + 風格 + 適用場合 + 服務特色

優先補充（流量潛力高）：
- [ ] 婚禮 / 求婚類商品
- [ ] 企業尾牙 / 開幕類商品
- [ ] 生日 / 派對類商品

---

## 已完成（摘要）

詳細內容可查 git log，以下為功能摘要：

| 功能 | 說明 |
|------|------|
| SEO 優化 | metadata（靜態/動態）、sitemap、robots、layout 台北/台灣關鍵字、JSON-LD（Product + Article + Service schema） |
| 商品個別頁 `/shop/[id]` | generateStaticParams、Breadcrumb、手機版底部購買列、useProductCart hook |
| Zustand re-render 優化 | authStore selector 改為 scalar，避免不必要的 re-render |
| Guest Cart | 未登入購物車 persist（localStorage 7天TTL）+ 登入後 syncGuestCart |
| 服務落地頁 | `/service/wedding\|birthday\|corporate\|proposal`，含 Hero/描述/服務項目/Gallery/CTA |
| 首頁版型重設計 | ServicesSection（4卡片）+ ProductCarousel（左文右圖）+ section-wrapper 統一寬度 |

---

## 技術重點提醒

| 項目 | 說明 |
|------|------|
| 購物車 store | `stores/cartStore.ts`，`addItem(productId, quantity)` |
| 商品 API | `lib/api/products.ts`，`fetchProductById(id)` 打真實 API，`fetchProducts()` 是 mock |
| 認證狀態 | `stores/authStore.ts`，只需 auth 判斷時用 `state.user !== null`（boolean） |
| Commit 規範 | 參考 `CLAUDE.md`，禁止 Co-Authored-By，需附中英文說明與 Revert 說明 |
| 樣式系統 | styled-components，主色 `theme.colors.primary.main`，禁止 inline style |
| JSON-LD | Server Component 直接 `<script dangerouslySetInnerHTML>` 輸出 |
| Blog 頁結構 | `return notFound()` early return，fetch 後 TypeScript 可推斷 `post` 有值 |
| 首頁寬度 | 三個區塊統一用 `HomeContent` 的 `.section-wrapper`（max-width: 1400px） |

---

## Git 狀態

**全部已 commit（截至 2026-04-11）**，無未完成項目。
