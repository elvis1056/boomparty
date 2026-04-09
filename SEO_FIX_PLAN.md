# SEO 修復計畫

> 狀態：程式碼工作全部完成，剩內容補充（斷點 5、7 文字/圖片）
> 建立日期：2026-04-04
> 更新日期：2026-04-09
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

| 順序 | 斷點 | 狀態 |
|------|------|------|
| 1st | 斷點 2：Blog 文章動態 Metadata | ✅ 完成 |
| 2nd | 斷點 3：Sitemap + Robots 修正 | ✅ 完成 |
| 3rd | 斷點 1：靜態頁面 Metadata | ✅ 完成 |
| 4th | 斷點 6：Layout 地區關鍵字 | ✅ 完成 |
| 5th | 斷點 4：商品個別頁面（含 4.1、4.2、4.5、手機底部列） | ✅ 完成 |
| 6th | 斷點 8：JSON-LD 結構化資料 | ✅ 完成 |
| 7th | 斷點 7：服務場景落地頁 | ✅ 骨架完成，文字/圖片待補 |
| 8th | 斷點 9：Zustand re-render 優化 | ✅ 完成 |
| — | 斷點 5：商品描述內容優化 | 🔲 你手動（資料庫補充） |

---

## 修復斷點

---

### ✅ 斷點 1：靜態頁面 Metadata

- `app/shop/page.tsx`
- `app/blog/page.tsx`
- `app/about/page.tsx`

---

### ✅ 斷點 2：Blog 文章動態 Metadata

- `app/blog/[slug]/page.tsx`：新增 `generateMetadata`
- `lib/api/blog.ts`：`React.cache()` 包住 `fetchBlogPosts()`

---

### ✅ 斷點 3：Sitemap + Robots 修正

- `app/sitemap.ts`：移除 `/components/pill`
- `app/robots.ts`：新增 booking 流程 disallow

---

### ✅ 斷點 4：商品個別頁面 `/shop/[id]`

- Server Component + generateMetadata + generateStaticParams（mock，換真實 API 只需改一行）
- ProductDetailContent（Client Component）
- 麵包屑元件（`components/Breadcrumb/`，可複用）
- 手機版固定底部購買列
- 相關商品（你可能也喜歡，同分類最多 4 筆）
- `app/sitemap.ts`：加入商品 URL

### ✅ 斷點 4.5：useProductCart 整合 ProductCard

- `hooks/useProductCart.ts`：移除 `e.stopPropagation()`，hook 不依賴 DOM event
- `features/shop/ProductCard/index.tsx`：改用 hook，stopPropagation 在元件層處理
- 圖片 alt 補充關鍵字

---

### ✅ 斷點 6：Layout 加入地區關鍵字

- `app/layout.tsx`：title 加「活動公關」，keywords 補台北/台灣

---

### ✅ 斷點 7：服務場景落地頁（骨架完成）

**範圍：**
- `app/service/wedding/page.tsx`（婚禮氣球佈置）
- `app/service/birthday/page.tsx`（生日派對佈置）
- `app/service/corporate/page.tsx`（企業活動公關）
- `app/service/proposal/page.tsx`（求婚告白佈置）
- `app/sitemap.ts`：已加入以上四頁

**各頁 metadata（根據競品 SEO 分析制定）：**

| 頁面 | Title | 核心 Keywords |
|------|-------|--------------|
| wedding | 婚禮氣球佈置｜台北婚禮活動公關 蹦娛樂 BoomParty | 婚禮氣球佈置, 婚禮背板, 氣球拱門 |
| birthday | 生日氣球佈置｜派對佈置專業團隊 蹦娛樂 BoomParty | 生日氣球佈置, 主題派對, 台北生日佈置 |
| corporate | 企業活動公關｜開幕佈置 氣球 蹦娛樂 BoomParty | 企業活動公關, 開幕剪綵, 尾牙活動策劃 |
| proposal | 求婚佈置｜告白氣球 台北 蹦娛樂 BoomParty | 求婚佈置, 後車廂佈置, 飯店求婚佈置 |

**待補充（你手動）：**
- 各頁 100-150 字情境描述（`{/* TODO */}` 標記處）
- 案例圖片（可從 `/images/shop/` 取用對應分類圖片）

---

### ✅ 斷點 8：JSON-LD 結構化資料

- `app/shop/[id]/page.tsx`：Product + BreadcrumbList JSON-LD
- `app/blog/[slug]/page.tsx`：Article + BreadcrumbList JSON-LD（`return notFound()` early return 結構）
- `app/service/*/page.tsx`：Service schema JSON-LD

---

### 🔲 斷點 5：商品描述內容優化（你手動）

進資料庫將每個商品的 `description` 改成情境化描述（50-150 字）。

**格式：** 情境 + 風格 + 適用場合 + 服務特色

**優先補充：**
- [ ] 婚禮 / 求婚類商品
- [ ] 企業尾牙 / 開幕類商品
- [ ] 生日 / 派對類商品

---

### ✅ 斷點 9：Zustand re-render 優化

- `stores/authStore.ts`：`isSameUser` 比較避免不必要 re-render
- 8 個元件 selector 改為 scalar（boolean / string）

---

## 執行注意

- 所有程式碼工作已完成，未 commit 部分見 `HANDOFF.md`
- 斷點 5（商品描述）：你手動更新資料庫，無時序限制
- 斷點 7 文字補充後可直接 commit，不影響其他功能
