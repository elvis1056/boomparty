# 媒體庫 DB Migration

**日期**：2026-04-23
**狀態**：完成（程式碼面全部完成，待在 NAS 上實際執行 migration）
**標籤**：database、backend、deployment

---

## 背景

照片整理已完成（65 張，位於 `boomparty/public/images/shop/`），分類架構已在 `docs/shop-categories.md` 確認。現在要正式把照片匯入後端 DB，讓前端改從 API 拿圖片，而不是指向靜態 Next.js public 路徑。

此任務橫跨三個層面：
- 後端 DB：建立正式 category 結構 + 匯入 media_asset 記錄
- NAS ops：照片實體搬移到 Docker volume
- 後端 Java：清掉已廢棄的 `Product.imageUrl` 欄位

## 決策

**分類結構**：採用 `docs/shop-categories.md` 確認的 9 個一級分類，不沿用 `dev-seed.sql` 的結構（dev-seed 是 H2 測試資料，與照片分類是兩套不同系統）。

**照片搬移方式**：本機 SCP 到 NAS staging 目錄 → bash script 在 NAS 上執行 `docker cp` 進 backend container → batch INSERT 到 DB。不透過後台 API 上傳（檔案數量大，且無需 thumbnail 處理）。

**imageUrl 移除時機**：Step 3 只清後端（entity + seed SQL），前端改為從 `images[]` 陣列拿圖是 Step 4（下一個對話）。Admin 前端有 imageUrl 的型別定義，不在此次範圍內（不會 runtime 錯誤）。

**19+歲佈置 照片處理**：`202103-新莊-運時通-91歲生日佈置.jpg` 映射到 `18+佈置` 分類（91歲合理歸屬 18+）。

## 執行步驟

- [x] Step 1：產 `myprojectbackend/src/main/resources/migration/01-categories.sql`
- [x] Step 2：產 `scripts/migrate-shop-photos.sh`
- [x] Step 3：移除後端 `Product.imageUrl`（Product.java、ProductRequest.java、ProductResponse.java、ProductService.java、data.sql、dev-seed.sql）
- [x] Step 4：前端 shop 頁面改從 `images[]` API 拿圖片（types/product.ts、mockProducts.ts、useProductCart.ts、ProductCard、ProductDetailContent、shop/[id]/page.tsx）

## 操作指令

### 在 NAS 上執行 migration（Step 1 + 2）

```bash
# 1. 先把照片 SCP 到 NAS（在 Mac terminal 執行，不是 SSH session）
# 注意：macOS 新版 scp 需加 -O 才能走舊協議（Synology 未開 SFTP subsystem）
# 注意：目的地要先手動建立資料夾（SCP 不會自動建）
ssh admin123@192.168.1.111 "mkdir -p /var/services/homes/admin123/shop-photos"
scp -O -r /Users/elvis1056/Desktop/nasweb/boomparty/public/images/shop/ admin123@192.168.1.111:/var/services/homes/admin123/shop-photos/
# 傳完後照片路徑為：/var/services/homes/admin123/shop-photos/shop/

# 2. SSH 進 NAS
ssh admin123@192.168.1.111
cd /var/services/homes/nasweb

# 3. 執行 category SQL
sudo docker cp myprojectbackend/src/main/resources/migration/01-categories.sql boomparty-postgres:/tmp/
sudo docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" boomparty-postgres \
    psql -U dbuser -d boomparty -f /tmp/01-categories.sql

# 4. 執行照片 migration script
bash scripts/migrate-shop-photos.sh /var/services/homes/admin123/shop-photos/shop
```

## 注意事項

- `01-categories.sql` 執行時會先 `UPDATE product SET category_id = NULL` 再 `DELETE FROM category`，避免 FK 衝突。在生產上執行前確認商品是否有對應分類需要保留。
- `migrate-shop-photos.sh` 執行後，category 封面圖（`category.cover_image_id`）需到後台媒體庫手動設定。
- `dev-seed.sql` 裡的 `image_url` 欄位已在此次一併清除（H2 create-drop 模式下欄位不存在會報錯）。
- Admin 前端（`boomparty-pure-admin`）的 `Product` / `ProductForm` type 還保有 `imageUrl`，移除是 Step 4 之後的後續工作。
