# BannerCarousel 延遲顯示根因分析與修正計畫

> 建立日期：2026-04-16
> 狀態：進行中

## 背景

使用者觀察到 BannerCarousel 版位顯示比 ServicesSection 慢，懷疑是圖片問題。
實際根因是**架構設計造成三層 client-side 延遲**，與圖片無關。

---

## 根因分析

### 為什麼 ServicesSection 很快？

```
Server 渲染 → HTML 直接帶完整 DOM → 圖片有 priority（preload） → 視覺立即出現
```

ServicesSection 是純 SSR 元件，Server 回傳的 HTML 裡已有完整結構，
瀏覽器拿到 HTML 就能畫，priority 圖片也同步預載。

### 為什麼 BannerCarousel 慢？三層延遲：

```
1. ssr: false     → HTML 裡沒有 Banner 的 DOM，空白佔位
2. dynamic()      → JS 要額外下載 DesktopBanner/MobileBanner bundle
3. useMediaQuery  → initializeWithValue: false 讓 isMobile 先是 undefined，
                    確定裝置後才真正決定渲染哪個版本
```

**渲染時序對比：**

| 時間點 | ServicesSection | BannerCarousel |
|--------|----------------|----------------|
| HTML 到達 | ✅ 完整 DOM 已在 | ❌ 空白（ssr: false） |
| JS hydration | 已可見 | ⏳ 還在等 bundle |
| JS bundle 載入 | — | ⏳ dynamic import 才開始下載 |
| useMediaQuery 解析 | — | ⏳ isMobile 確定後才選版本 |
| 圖片載入 | ✅ priority preload | 才剛開始 |

圖片本身不是原因，是圖片連「開始載入」的時機都比 ServicesSection 晚很多。

---

## 斷點執行順序

### 斷點 1：加 loading skeleton 消除空白閃爍（視覺體驗最快改善）

**範圍：**
- `app/(home)/HomeContent/BannerCarousel/index.tsx`

**做什麼：**
- 在兩個 `dynamic()` 加上 `loading` option，顯示佔位骨架
- 骨架尺寸與 BannerCarousel 的容器高度一致，避免版面跳動（CLS）

```tsx
const DesktopBanner = dynamic(
  () => import('@/app/(home)/HomeContent/BannerCarousel/DesktopBanner'),
  {
    ssr: false,
    loading: () => <div className="banner-skeleton" />,
  }
);
```

**注意事項：**
- skeleton 高度要跟 DesktopBanner/MobileBanner 的實際高度一致
- 顏色用 shimmer 或簡單的灰色背景都可以

---

### 斷點 2：評估是否能移除 `initializeWithValue: false`（減少決策延遲）

**範圍：**
- `app/(home)/HomeContent/BannerCarousel/index.tsx`
- `hooks/useMediaQuery.ts`（確認 hook 的行為）

**做什麼：**
- 確認 `initializeWithValue: false` 的目的：防止 SSR hydration mismatch
- 由於已經 `ssr: false`，hydration mismatch 根本不會發生（元件完全在 client 渲染）
- 可以安全地改為 `initializeWithValue: true` 或移除這個選項
- 如果移除後 `isMobile` 立刻用正確值，就少一次 re-render

**注意事項：**
- `ssr: false` 元件不走 SSR，所以不存在 server/client 值不一致的問題
- 改完要確認在 mobile 和 desktop 寬度都正確顯示

---

### 斷點 3：（選做）Banner 第一張圖加 `priority`

**範圍：**
- `app/(home)/HomeContent/BannerCarousel/DesktopBanner/index.tsx`
- `app/(home)/HomeContent/BannerCarousel/MobileBanner/index.tsx`

**做什麼：**
- 確認目前的 `priority={image.id === 1}` 是否正確（已有，但因為 ssr:false，priority 的 preload 效果會更晚觸發）
- 斷點 1、2 完成後，圖片會更快開始載入，priority 的加速效果才更明顯

**注意事項：**
- 此斷點是加乘效果，需要斷點 1 完成後意義才大
- `ssr: false` 下 `priority` 的 preload link 不會出現在 SSR HTML 的 `<head>` 裡，只能靠 client JS 觸發

---

## 技術重點

| 項目 | 說明 |
|------|------|
| 主要根因 | `ssr: false` 讓 HTML 無 Banner DOM，一切從 JS 執行才開始 |
| 次要根因 | `dynamic()` 額外 bundle 下載 + `initializeWithValue: false` 多一次 re-render |
| 圖片責任 | 圖片本身不慢，是「開始下載」的時間點被架構延遲 |
| ServicesSection 快的原因 | SSR + priority 圖片，不依賴 JS |
| 根本解法 | 移除 `ssr: false`（但 Swiper 不支援 SSR，需要額外處理）|
| 現實解法 | 加 skeleton 消除空白 + 減少不必要的延遲 |

## 為什麼不直接開 SSR？

Swiper（carousel 套件）直接用 window/document，在 Node.js 環境（SSR）會報錯。
要支援 SSR 需要額外包一層 `useEffect` + `useState(false)` 控制 mounted 狀態，
改動較大且有風險，不建議現在做。

---

## Revert 說明

- 斷點 1：獨立，移除 `loading` option 即可還原
- 斷點 2：獨立，改回 `initializeWithValue: false` 即可，不影響其他功能
- 斷點 3：獨立，加/移除 `priority` 不影響功能
