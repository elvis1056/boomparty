# 首頁 LCP 改善計畫

> 建立日期：2026-04-11
> 狀態：進行中

## 背景

首頁目前有幾個明顯的 LCP（Largest Contentful Paint）傷害點：

1. **body `opacity: 0` fade-in**：等 `window.load`（所有資源載完）才顯示頁面，是最嚴重的 LCP 殺手
2. **ServicesSection 圖片無 `priority`**：首屏第一區塊的 4 張服務圖片全部 lazy load，LCP element 候選者
3. **BannerCarousel 用 `dynamic()` import**：code splitting 延遲 Swiper 渲染
4. **`images: { unoptimized: true }`**：靜態匯出限制，圖片無法自動縮放，需要人工確保圖片尺寸合理

## 斷點執行順序

### 斷點 1：移除 body opacity fade-in（最高優先）

**範圍：**
- `app/layout.tsx`

**做什麼：**
- 移除 `body { opacity: 0; transition: ... }` 的 inline style 注入
- 移除 `window.addEventListener('load', ...)` 的 script 注入
- 若有淡入動畫需求，改用 CSS `@keyframes` 從 `animation` 觸發（不等 JS load 事件）

**注意事項：**
- 確認移除後視覺上無白閃（FOUC）
- 若有其他頁面依賴此機制，一併確認

---

### 斷點 2：ServicesSection 圖片加 `priority`

**範圍：**
- `app/home/ServicesSection/index.tsx`（或 `app/(home)/HomeContent/` 路徑下同名元件）

**做什麼：**
- 找到 ServicesSection 中的 `<Image>` 元件
- 全部加上 `priority` prop（4 張卡片首屏全可見）
- 確認 `sizes` 設定正確（目前已有 `sizes="(max-width: 640px) 50vw, 25vw"`，維持）

**注意事項：**
- `priority` 只加在首屏可見的圖片，不要加在需要 scroll 才看到的
- 若 ProductCarousel 的第一張圖也在首屏可見範圍，一併加

---

### 斷點 3：BannerCarousel 移除不必要的 dynamic import

**範圍：**
- `app/(home)/HomeContent/BannerCarousel/index.tsx`

**做什麼：**
- 確認 `dynamic()` import 的必要性
- 若只是避免 SSR Swiper hydration 問題，改用 `dynamic(..., { ssr: false })` 並評估是否能改為靜態 import + `'use client'`
- 若 Swiper 必須 client-only，確保 `loading: 'eager'`（`dynamic` 的選項）避免懶載入

**注意事項：**
- Swiper 本身是 client-side 套件，SSR 會報錯，需保留某種程度的 client-only 隔離
- 此斷點風險較低，若不確定就維持現狀，優先做斷點 1、2

---

### 斷點 4：Preload 關鍵圖片（選做）

**範圍：**
- `app/(home)/layout.tsx` 或 `app/(home)/page.tsx`

**做什麼：**
- 在 `<head>` 加入 `<link rel="preload" as="image">` 指向 ServicesSection 的圖片（前 2-4 張）
- 可在 Next.js 的 metadata 或直接在 layout 的 `<head>` 插入

**注意事項：**
- `unoptimized: true` 下圖片路徑固定，可直接硬編碼路徑
- 只 preload above-the-fold 的圖片，不要過度 preload

---

## 技術重點

| 項目 | 說明 |
|------|------|
| 最大 LCP 殺手 | `body { opacity: 0 }` + `window.load` 等待所有資源才顯示 |
| 圖片優化限制 | `next.config.ts` 的 `unoptimized: true`（靜態匯出需要），不能改 |
| 圖片路徑工具 | `lib/utils/asset-path.ts` 的 `assetPath()`，preload 時要用同樣的路徑邏輯 |
| ServicesSection 位置 | 首頁第一區塊，所有圖片都在首屏（above-the-fold） |
| BannerCarousel 位置 | 首頁第三區塊，不在第一屏視野，優先順序低 |

## Revert 說明

- 斷點 1：獨立，移除 layout.tsx 兩段 inline script/style，不影響其他功能
- 斷點 2：獨立，加 `priority` prop，移除即可還原
- 斷點 3：有風險，若 Swiper SSR 問題復發需還原 dynamic import
- 斷點 4：獨立，移除 preload link 即可
