# Shop API 後續修補計畫

> 建立日期：2026-04-28
> 狀態：完成

## 背景

本次對話已完成三個已知問題的修補：
- #1（圖片 URL 補全）：`fetchProducts()` 加上 apiBase 前綴，已 commit `fb3ff38`
- #2（N+1 查詢）：`getAllProducts()` 批次 JOIN 圖片，已 commit `e8bae35`
- #3（Next.js 圖片最佳化）：`unoptimized: isStatic`，已 commit `1b01fa6`

但深入檢視後發現四個衍生問題，需要繼續處理。

---

## 斷點執行順序

### 斷點 1：修復 `fetchProductById()` 圖片 URL 補全

**嚴重度：🔴 致命**

**範圍：** `lib/api/products.ts`

**做什麼：**
- `fetchProductById()` 目前直接回傳 API 原始資料，圖片 URL 是相對路徑（`/media/uuid.jpg`）
- 和 `fetchProducts()` 一樣，加上 apiBase 補全邏輯
- 商品詳細頁 `/shop/[id]` 圖片才不會全部 404

**注意事項：**
- `fetchProductById()` 回傳單筆 `Product`（非陣列），補全邏輯略有不同
- 確認 `Product.images` 型別允許 undefined/null（optional chaining）

---

### 斷點 2：修復後端 `getActiveProducts()` / `getFeaturedProducts()` N+1

**嚴重度：🟡 效能**

**範圍：** `myprojectbackend/.../service/ProductService.java`、`repository/ProductImageRepository.java`（已有 `findAllByProductIdsWithMediaAsset`，可直接複用）

**做什麼：**
- `getActiveProducts()`、`getFeaturedProducts()`、`searchProducts()` 目前仍使用單筆版 `convertToResponse(Product)`，N+1 依然存在
- 改為和 `getAllProducts()` 相同的批次模式：先取所有商品 ID → 批次查圖片 → Map 分組 → 批次版 convertToResponse
- 抽出共用的 `batchLoadImages(List<Product>)` helper，避免三個方法各自複製貼上相同邏輯

**注意事項：**
- 抽出 helper 後，`getAllProducts()` 也一起改用，確保邏輯統一
- 改完後 `clean compile` 確認沒有編譯錯誤

---

### 斷點 3：評估並決定 `next.config.ts` 圖片最佳化是否回退

**嚴重度：🟡 需驗證**

**範圍：** `next.config.ts`、NAS docker-compose 設定（觀察）

**做什麼：**
- 部署後，在 `https://boomparty.tw/shop` 確認圖片是否正常顯示
- 開 Chrome DevTools → Network，確認圖片走的是 `/_next/image?url=...`（最佳化路由）而非直接打 `api.boomparty.tw`
- 如果圖片出現 timeout 或 500，代表 NAS frontend container 無法順利存取 `api.boomparty.tw`（繞 Cloudflare 太慢）→ 回退到 `unoptimized: true`
- 長遠解法：docker-compose 加 internal network，frontend 直接打 `http://backend:8080`

**注意事項：**
- 此斷點需要「部署完成」後才能執行，不能在本機驗證
- 若圖片壞掉，優先 revert `1b01fa6`，不要卡住部署

---

### 斷點 4：更新 HANDOFF.md 問題狀態欄

**嚴重度：🟢 文件**

**範圍：** `HANDOFF.md`

**做什麼：**
- 把原本「已知問題（三個）」表格的三個 ⏳ 全部改為 ✅
- 把「Shop 真實 API」計畫 section 的「尚未 commit」改為已完成狀態
- 把整個計畫從「進行中」移進「已完成」

---

## 技術重點

| 項目 | 說明 |
|------|------|
| 圖片 URL 補全 | `NEXT_PUBLIC_API_BASE_URL` 環境變數必須在 docker-compose 設好，否則補全結果是空字串 |
| 批次 JOIN | `findAllByProductIdsWithMediaAsset()` 已在 `ProductImageRepository` 實作，可直接複用 |
| Next.js 圖片最佳化 | NAS frontend container 存取 api.boomparty.tw 走 Cloudflare Tunnel，有繞遠路的風險 |
| `convertToResponse` 兩個版本 | 單筆版（自查圖片）供 getById/create/update；批次版（傳入預載圖片）供所有列表方法 |

## Revert 說明

- 斷點 1：可單獨 revert，商品詳細頁圖片回到 404，不影響商品列表
- 斷點 2：可單獨 revert，效能退化但功能不受影響
- 斷點 3：如需 revert，執行 `git revert 1b01fa6`，圖片最佳化關閉，其他功能不受影響
- 斷點 4：純文件，無功能影響
