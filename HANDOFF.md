# Agent 交接文件

> 更新日期：2026-04-28
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

### 🟡 Blog 內容更新

Blog 文章 sitemap 索引目前關閉（`app/sitemap.ts`）。
待 blog 補充氣球 / 活動相關文章後重新開啟。

---

## 已完成（摘要）

詳細內容可查 git log 或 `docs/archive/`，以下為功能摘要：

| 功能 | 說明 |
|------|------|
| Shop 真實 API 完整上線 | API 切換、圖片 URL 補全（fetchProducts + fetchProductById）、N+1 全修、部署驗證；Cloudflare Cf-Cache-Status HIT 確認；`commits fb3ff38 e8bae35 1b01fa6 b4f6203 96b5ec7` |
| 媒體庫系統（三專案） | backend entity/repo/service/controller 全完成；admin 媒體庫、Tag 管理、商品多圖、分類封面圖 UI 全完成；前台商品卡片主圖 fallback、商品詳細頁圖片 gallery 全完成 |
| Google OAuth | `GoogleLoginButton` 元件、`GoogleOAuthProvider` root layout、登入頁整合，全部完成 |
| 首頁 section-wrapper 間距統一 | desktop/tablet 1.5rem、mobile 1rem，移除 ServicesSection 內部 padding，間距全部由 wrapper 控制 |
| BannerCarousel 首頁移至最上方 | BannerCarousel 為首頁第一區塊，ServicesSection、ProductCarousel 依序排後 |
| BannerCarousel 視覺體驗 | 加 BannerSkeleton（shimmer 骨架），移除多餘 initializeWithValue: false |
| LCP 改善 | 移除 body fade-in、ServicesSection 圖片加 priority、Banner 第一張圖加 preload |
| SEO 修正 | 刪除錯誤 public/sitemap.xml（Java/Docker 文章）、新增 robots.txt、補全 og:image / twitter:image |
| Blog sitemap 索引關閉 | 內容與品牌不符，待更新後重開 |
| SEO 優化 | metadata（靜態/動態）、sitemap、robots、layout 台北/台灣關鍵字、JSON-LD（Product + Article + Service schema） |
| 商品個別頁 `/shop/[id]` | generateStaticParams、Breadcrumb、手機版底部購買列、useProductCart hook |
| Zustand re-render 優化 | authStore selector 改為 scalar，避免不必要的 re-render |
| Guest Cart | 未登入購物車 persist（localStorage 7天TTL）+ 登入後 syncGuestCart |
| 服務落地頁 | `/service/wedding\|birthday\|corporate\|proposal`，含 Hero/描述/服務項目/Gallery/CTA |
| 首頁版型重設計 | ServicesSection（4卡片）+ ProductCarousel（左文右圖）+ section-wrapper 統一寬度 |
| 造型氣球商品 | 動物造型 5 筆上架（附真實圖片），卡通 IP 52 筆暫放 copyrightProducts 待授權 |
| ProductCard Shimmer | imageUrl 為 null 時改顯示 Shimmer，移除 emoji 佔位 |
| LINE_ALBUM 圖片整理 | 批次搬移 + 重命名至 `造型氣球/` 子資料夾 |
| shop 照片整理 | 刪除無語意檔名、空格改連字號、補地點資訊、刪除卡通/公主系列 46 張；65 張已 migration 完成 |
| 分類架構確認 | `docs/shop-categories.md` 記錄最終分類，依年齡 6→3 組，造型氣球刪 4 子分類 |

---

## 技術重點提醒

| 項目 | 說明 |
|------|------|
| 購物車 store | `stores/cartStore.ts`，`addItem(productId, quantity)` |
| 商品 API | `lib/api/products.ts`，所有函式已打真實 API；`fetchProducts()` 含 image URL 補全（相對路徑 → 完整 URL） |
| 認證狀態 | `stores/authStore.ts`，只需 auth 判斷時用 `state.user !== null`（boolean） |
| Commit 規範 | 參考 `CLAUDE.md`，禁止 Co-Authored-By，需附中英文說明與 Revert 說明 |
| 樣式系統 | styled-components，主色 `theme.colors.primary.main`，禁止 inline style |
| JSON-LD | Server Component 直接 `<script dangerouslySetInnerHTML>` 輸出 |
| Blog 頁結構 | `return notFound()` early return，fetch 後 TypeScript 可推斷 `post` 有值 |
| 首頁寬度 | 三個區塊統一用 `HomeContent` 的 `.section-wrapper`（max-width: 1400px） |
| Blog sitemap | `app/sitemap.ts` 的 blogPages 目前為空陣列，開啟時還原 fetchBlogPosts 邏輯 |
