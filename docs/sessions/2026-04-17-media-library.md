# 媒體庫系統設計計畫

> 建立日期：2026-04-17
> 涉及專案：myprojectbackend、boomparty-pure-admin、boomparty
> 狀態：🟡 規劃中

---

## 一、最終架構決策

### 圖片儲存策略

```
後台上傳 → Spring Boot 接收 → 存入 /app/media/{uuid}.jpg
                                      ↓
                    NAS Docker volume 掛載：/volume1/media → /app/media
                                      ↓
                    Spring Boot expose：GET https://api.boomparty.tw/media/{filename}
                                      ↓
                    前台 Next.js：<Image src="https://api.boomparty.tw/media/xxx.jpg">
```

**開發期間**：`media_asset.url` 指向 Next.js public 資料夾路徑（`/images/shop/xxx.jpg`）
**生產上線後**：透過後台重新上傳 → URL 更新為 `https://api.boomparty.tw/media/{uuid}.jpg`

### 商品多圖

- 新增 `product_image` 表（`id, product_id, media_asset_id, sort_order, is_primary`）
- 支援拖曳排序 + 設定主圖
- Product entity 的 `imageUrl` 保留但標為廢用，migration 時轉入 `product_image`

### Tag 系統

| 類型 | 例子 | 用途 |
|------|------|------|
| CONTENT（內容） | 氣球拱門、氣球柱、泡泡球 | 標記圖片裡有什麼物件 |
| STYLE（風格） | 粉色系、夢幻系、海洋系 | 描述圖片整體風格 |
| OCCASION（場合） | 生日、婚禮、企業、聖誕節 | 標記適用場合 |

Tag 與 Category 是獨立概念：
- **Category**：商城篩選層級結構（2層，parent/child）
- **Tag**：扁平標籤，一張圖可多個，跨越分類邊界

---

## 二、圖片盤點與清理計畫

### 現有 public/images/ 資料夾狀況

| 資料夾 | 內容 | 行動 |
|--------|------|------|
| `shop/` | 商品實際圖片（舊分類結構） | ✅ 保留，用於 seed data |
| `service-picture/` | 服務落地頁圖片（英文命名，乾淨） | ✅ 保留，靜態頁面用 |
| `about/` | 關於頁圖片 | ✅ 保留 |
| `banner/` | 首頁 banner 圖片 | ✅ 保留 |
| `blog/` | 部落格文章圖片 | ✅ 保留 |
| `booking/` | 預約頁圖片 | ✅ 保留 |
| `performers/` | 表演者圖片 | ✅ 保留 |
| `products/` | **混亂，大量重複 banner/ 的圖，且未被任何 mockProduct 引用** | ❌ 刪除 |
| `banner-backup/` | banner/ 的完整備份 | ❌ 刪除 |
| `about-backup/` | about/ 的備份 | ❌ 刪除 |
| `blog-backup/` | blog/ 的備份 | ❌ 刪除 |
| `resume/` | 履歷頁圖片（非 boomparty 功能） | ❌ 刪除 |
| `resume-backup/` | 履歷備份 | ❌ 刪除 |

### 現有商品圖片（shop/ 資料夾）與商品對應表

以下為 mockProducts 實際引用的圖片路徑：

| 商品 id | 商品名稱 | 圖片路徑 |
|--------|---------|---------|
| 2 | 花朵 | `/images/shop/造型氣球/花朵系列/balloon-flower-removebg-preview.png` |
| 3 | Team Taiwan 年終派對背板 | `/images/shop/主題佈置/背板佈置/2024-03-02-team-taiwan.jpg` |
| 4 | 婚宴廳簡約氣球拱門 | `/images/shop/婚禮求婚/婚禮佈置/2024-03-02-婚禮簡約拱門.jpg` |
| 5 | 幼兒園開學 WELCOME 拱門 | `/images/shop/主題佈置/童話系佈置/2024-03-02-幼兒園開學.jpg` |
| 6 | 深海海洋生日背板 | `/images/shop/主題佈置/海洋系佈置/2024-03-02-生日海洋造型.jpg` |
| 7 | TPAC 企業接待台佈置 | `/images/shop/企業商用/其他企業商用佈置/2024-03-02-TPAC-正面-手機橫向.jpg` |
| 8 | TPAC 企業接待台佈置（全景） | `/images/shop/企業商用/其他企業商用佈置/2024-03-02-TPAC-正面-手機直立.jpg` |
| 9 | 玫瑰金圓形金屬氣球柱 | `/images/shop/企業商用/氣球柱/2024-03-02-圓形金屬氣球柱.jpg` |
| 10 | 畢業典禮 CONGRATS 氣球矮柱 | （待確認） |
| ... | ...（其餘商品參考 mockProducts.ts） | |

### 尚未有圖的商品分類（需補）
造型氣球類以外的多數子分類（鋁箔素材、乳膠氣球素材、工具配件、折氣球表演、氣球教學、客製印刷）目前都沒有對應的商品圖片，需要之後透過後台上傳補齊。

---

## 三、資料模型（Database Schema）

```sql
-- 媒體資產（圖庫）
CREATE TABLE media_asset (
  id            BIGSERIAL PRIMARY KEY,
  filename      VARCHAR(255) NOT NULL,          -- UUID 命名的實體檔案名稱
  original_name VARCHAR(500),                   -- 上傳時的原始檔名
  url           VARCHAR(500) NOT NULL,          -- 對外 URL
  file_size     BIGINT,                         -- bytes
  mime_type     VARCHAR(100),                   -- image/jpeg, image/png...
  width         INT,
  height        INT,
  alt_text      VARCHAR(500),                   -- SEO 用
  uploaded_by   BIGINT REFERENCES users(id),
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 標籤
CREATE TABLE tag (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL UNIQUE,
  slug       VARCHAR(100) NOT NULL UNIQUE,      -- url-safe 名稱
  type       VARCHAR(20) NOT NULL,              -- CONTENT | STYLE | OCCASION
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 圖片 ↔ 標籤（多對多）
CREATE TABLE media_asset_tag (
  media_asset_id BIGINT NOT NULL REFERENCES media_asset(id) ON DELETE CASCADE,
  tag_id         BIGINT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
  PRIMARY KEY (media_asset_id, tag_id)
);

-- 商品多圖
CREATE TABLE product_image (
  id             BIGSERIAL PRIMARY KEY,
  product_id     BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  media_asset_id BIGINT NOT NULL REFERENCES media_asset(id),
  sort_order     INT NOT NULL DEFAULT 0,
  is_primary     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Category 加欄位
ALTER TABLE category ADD COLUMN cover_image_id BIGINT REFERENCES media_asset(id);
```

---

## 四、API 端點設計

### 媒體庫

| Method | Path | 權限 | 說明 |
|--------|------|------|------|
| POST | `/api/admin/media/upload` | ADMIN | 上傳圖片 |
| GET | `/api/admin/media` | ADMIN | 查詢圖庫（含分頁） |
| GET | `/api/admin/media/{id}` | ADMIN | 查詢單張 |
| PATCH | `/api/admin/media/{id}/alt-text` | ADMIN | 更新 alt text |
| DELETE | `/api/admin/media/{id}` | ADMIN | 刪除（有使用保護） |
| GET | `/media/{filename}` | 公開 | Serve 靜態檔案 |

### 標籤

| Method | Path | 權限 | 說明 |
|--------|------|------|------|
| POST | `/api/admin/tags` | ADMIN | 新增 tag |
| GET | `/api/tags` | 公開 | 查詢所有 tag |
| DELETE | `/api/admin/tags/{id}` | ADMIN | 刪除 tag |
| POST | `/api/admin/media/{id}/tags` | ADMIN | 幫圖片加 tag |
| DELETE | `/api/admin/media/{id}/tags/{tagId}` | ADMIN | 移除圖片的 tag |

### 商品多圖

| Method | Path | 權限 | 說明 |
|--------|------|------|------|
| GET | `/api/products/{id}/images` | 公開 | 查詢商品所有圖片 |
| POST | `/api/admin/products/{id}/images` | ADMIN | 為商品加圖 |
| DELETE | `/api/admin/products/{productId}/images/{imageId}` | ADMIN | 移除商品某張圖 |
| PATCH | `/api/admin/products/{productId}/images/{imageId}/primary` | ADMIN | 設為主圖 |
| PATCH | `/api/admin/products/{productId}/images/reorder` | ADMIN | 更新排序 |

### 分類封面圖

| Method | Path | 權限 | 說明 |
|--------|------|------|------|
| PATCH | `/api/admin/categories/{id}/cover-image` | ADMIN | 設定封面圖 |
| DELETE | `/api/admin/categories/{id}/cover-image` | ADMIN | 移除封面圖 |

---

## 五、三專案執行順序

```
1. myprojectbackend  ← 先做，admin 和前台都依賴後端 API
2. boomparty-pure-admin  ← 其次，需要後端 API 才能測試上傳
3. boomparty (Next.js)   ← 最後，顯示層等 API 和管理工具就緒
```

---

## 六、完整 Commit 計畫

### ▌ Phase 0：清理現有圖片資料夾（boomparty）

**Commit 0-A** — `boomparty`
```
chore: remove unused and duplicate image folders from public/images
```
- 刪除 `public/images/products/`（未被任何 mockProduct 引用，混亂）
- 刪除 `public/images/banner-backup/`（`banner/` 完整備份，重複）
- 刪除 `public/images/about-backup/`
- 刪除 `public/images/blog-backup/`
- 刪除 `public/images/resume/`（非 boomparty 功能）
- 刪除 `public/images/resume-backup/`
- 依賴項：無
- 影響：無現有功能受影響（確認 mockProducts 未引用 products/ 資料夾）

---

### ▌ Phase 1：後端（myprojectbackend）

**Commit 1-A** — `myprojectbackend`
```
feat: add MediaAsset entity and repository
```
- 新增 `entity/MediaAsset.java`
  - 欄位：`id, filename, originalName, url, fileSize, mimeType, width, height, altText, uploadedBy, createdAt`
  - `@PrePersist` 設 `createdAt`
- 新增 `repository/MediaAssetRepository.java`
  - `findAllByOrderByCreatedAtDesc()`
  - `existsByFilename()`

---

**Commit 1-B** — `myprojectbackend`
```
feat: add Tag entity, TagType enum, and repository
```
- 新增 `entity/TagType.java`（enum：CONTENT / STYLE / OCCASION）
- 新增 `entity/Tag.java`（`id, name, slug, type, createdAt`）
- 在 `MediaAsset.java` 加 `@ManyToMany List<Tag> tags`（join table: `media_asset_tag`）
- 新增 `repository/TagRepository.java`
  - `findByType(TagType type)`
  - `existsByName(String name)`

---

**Commit 1-C** — `myprojectbackend`
```
feat: add ProductImage entity and repository
```
- 新增 `entity/ProductImage.java`
  - 欄位：`id, product(FK), mediaAsset(FK), sortOrder, isPrimary, createdAt`
- 新增 `repository/ProductImageRepository.java`
  - `findByProductIdOrderBySortOrder(Long productId)`
  - `findByProductIdAndIsPrimaryTrue(Long productId)`
  - `countByMediaAssetId(Long mediaAssetId)`（刪除保護用）

---

**Commit 1-D** — `myprojectbackend`
```
feat: add coverImageId column to Category entity
```
- `Category.java` 加 `@ManyToOne(fetch = LAZY) @JoinColumn(name = "cover_image_id") MediaAsset coverImage`
- 更新 `CategoryResponse.java`：加 `coverImageUrl` 欄位（從 `coverImage.url` 取）
- 更新 `CategoryService.convertToResponse()`：填入 `coverImageUrl`

---

**Commit 1-E** — `myprojectbackend`
```
feat: add MediaAssetResponse, TagRequest/Response, ProductImageResponse DTOs
```
- 新增 `dto/MediaAssetResponse.java`
- 新增 `dto/TagRequest.java`（`name, type`）
- 新增 `dto/TagResponse.java`
- 新增 `dto/ProductImageResponse.java`（`id, mediaAssetId, url, altText, sortOrder, isPrimary`）

---

**Commit 1-F** — `myprojectbackend`
```
feat: add MediaAssetService with file upload and local storage
```
- 新增 `service/MediaAssetService.java`
  - `upload(MultipartFile file, String altText, Long userId)` → 存到 `/app/media/{uuid}.{ext}`，計算寬高，建 `MediaAsset` record
  - `findAll()` / `findById()` / `updateAltText()`
  - `delete(id)` → 先檢查 `product_image` 和 `category.cover_image_id` 有無引用，有則拋例外
  - `addTag(mediaId, tagId)` / `removeTag(mediaId, tagId)`
- `application.properties` 加 `media.upload-dir=/app/media`（dev 可設本機路徑）

---

**Commit 1-G** — `myprojectbackend`
```
feat: add MediaController for upload, library management, and static file serving
```
- 新增 `controller/MediaController.java`
  - `POST /api/admin/media/upload`
  - `GET /api/admin/media`
  - `GET /api/admin/media/{id}`
  - `PATCH /api/admin/media/{id}/alt-text`
  - `DELETE /api/admin/media/{id}`
- 設定 Spring Boot 靜態資源：`GET /media/**` serve `${media.upload-dir}`
  （在 `WebMvcConfigurer` 加 `addResourceHandlers`）

---

**Commit 1-H** — `myprojectbackend`
```
feat: add TagService and TagController
```
- 新增 `service/TagService.java`
  - `createTag()` / `getAllTags()` / `getTagsByType()` / `deleteTag()`
  - `addTagToMedia()` / `removeTagFromMedia()`
- 新增 `controller/TagController.java`
  - `POST /api/admin/tags`
  - `GET /api/tags`
  - `DELETE /api/admin/tags/{id}`
  - `POST /api/admin/media/{id}/tags`
  - `DELETE /api/admin/media/{id}/tags/{tagId}`

---

**Commit 1-I** — `myprojectbackend`
```
feat: add ProductImageService and multi-image product endpoints
```
- 新增 `service/ProductImageService.java`
  - `addImageToProduct(productId, mediaAssetId)`
  - `removeImageFromProduct(productId, imageId)`
  - `setPrimaryImage(productId, imageId)`（同時清除同商品其他 isPrimary）
  - `reorderImages(productId, List<{imageId, sortOrder}>)`
- 在 `ProductController.java` 新增：
  - `GET /api/products/{id}/images`（公開）
  - `POST /api/admin/products/{id}/images`
  - `DELETE /api/admin/products/{productId}/images/{imageId}`
  - `PATCH /api/admin/products/{productId}/images/{imageId}/primary`
  - `PATCH /api/admin/products/{productId}/images/reorder`

---

**Commit 1-J** — `myprojectbackend`
```
feat: add category cover image endpoints
```
- 在 `CategoryService.java` 新增：
  - `setCoverImage(categoryId, mediaAssetId)`
  - `removeCoverImage(categoryId)`
- 在 `CategoryController.java` 新增：
  - `PATCH /api/admin/categories/{id}/cover-image`
  - `DELETE /api/admin/categories/{id}/cover-image`

---

**Commit 1-K** — `myprojectbackend`
```
feat: update ProductResponse to include images array
```
- 更新 `ProductResponse.java`：加 `List<ProductImageResponse> images`
- 更新 `ProductService.convertToResponse()`：查 `productImageRepository` 填入 images

---

**Commit 1-L** — `myprojectbackend`
```
feat: migrate existing product imageUrl to product_image records in dev-seed
```
- 更新 `dev-seed.sql`：
  - 新增 `INSERT INTO media_asset` for 每一筆 mock 商品的現有圖片（url 指向 `/images/shop/...`）
  - 新增 `INSERT INTO product_image (product_id, media_asset_id, sort_order, is_primary)` for 每一筆商品
  - 新增 預設 tag seed data（10-15 個常用 tag）

---

**Commit 1-M** — `myprojectbackend`
```
chore: update SecurityConfig for media, tag, and product image endpoints
```
- 更新 `SecurityConfig.java`：
  - `GET /media/**` → 公開
  - `GET /api/tags` → 公開
  - `GET /api/products/*/images` → 公開
  - 其餘 `POST/PATCH/DELETE /api/admin/**` → ADMIN only

---

### ▌ Phase 2：後台（boomparty-pure-admin）

**Commit 2-A** — `boomparty-pure-admin`
```
chore: install vuedraggable for drag-and-drop image reordering
```
- `pnpm add vuedraggable@next`
- 確認 `pnpm lint` 通過

---

**Commit 2-B** — `boomparty-pure-admin`
```
feat: add media library API module
```
- 新增 `src/api/media.ts`
  - `MediaAsset` type、`uploadMedia(file, altText)`、`getMediaList()`、`getMedia(id)`、`updateAltText(id, text)`、`deleteMedia(id)`
  - `addTagToMedia(mediaId, tagId)`、`removeTagFromMedia(mediaId, tagId)`

---

**Commit 2-C** — `boomparty-pure-admin`
```
feat: add tag API module
```
- 新增 `src/api/tag.ts`
  - `Tag` type、`getTags()`、`createTag(data)`、`deleteTag(id)`

---

**Commit 2-D** — `boomparty-pure-admin`
```
feat: add media library page
```
- 新增 `src/views/media/index.vue`
  - 圖片 Grid（縮圖 + alt text + tag chips）
  - 上傳區（el-upload，drag-and-drop，多選）
  - 點圖片開右側 Drawer：顯示詳情、編輯 alt text、管理 tags、刪除
  - 搜尋/篩選（按 tag type）

---

**Commit 2-E** — `boomparty-pure-admin`
```
feat: add media library router module
```
- 新增 `src/router/modules/media.ts`（`meta.rank` 排在商品後面）

---

**Commit 2-F** — `boomparty-pure-admin`
```
feat: add tag management page and router
```
- 新增 `src/views/tag/index.vue`（tag 列表、新增 tag with name + type、刪除）
- 新增 `src/router/modules/tag.ts`

---

**Commit 2-G** — `boomparty-pure-admin`
```
feat: add MediaPickerDialog shared component
```
- 新增 `src/components/MediaPickerDialog.vue`
  - Props：`modelValue（mediaAsset | null）`、`multiple（boolean）`
  - 顯示圖庫（可搜尋）
  - 支援上傳新圖
  - 選完 emit `update:modelValue`

---

**Commit 2-H** — `boomparty-pure-admin`
```
feat: update ProductForm with multi-image management and drag-and-drop reorder
```
- 更新 `src/views/product/ProductForm.vue`：
  - 移除舊 `imageUrl` 文字框
  - 新增「商品圖片」區塊：
    - 用 `vuedraggable` 包圖片列表，支援拖曳排序
    - 每張圖片卡：縮圖 + 「設為主圖」按鈕 + 「移除」按鈕
    - 主圖有 ★ 標示
    - 「+ 新增圖片」按鈕 → 開 `MediaPickerDialog`
  - 拖曳結束後 call `PATCH /api/admin/products/{id}/images/reorder`
- 更新 `src/api/product.ts`：
  - 加 `getProductImages(id)`、`addProductImage(productId, mediaAssetId)`、`removeProductImage(productId, imageId)`、`setProductPrimaryImage(productId, imageId)`、`reorderProductImages(productId, orders)`

---

**Commit 2-I** — `boomparty-pure-admin`
```
feat: update CategoryForm with cover image picker
```
- 更新 `src/views/category/CategoryForm.vue`：
  - 新增「封面圖」區塊：顯示目前封面圖縮圖 + 「選擇圖片」按鈕（開 `MediaPickerDialog`）+ 「移除」按鈕
- 更新 `src/api/category.ts`：
  - 加 `setCategoryCoverImage(id, mediaAssetId)`、`removeCategoryCoverImage(id)`
  - `Category` type 加 `coverImageUrl: string | null`

---

### ▌ Phase 3：前台（boomparty）

**Commit 3-A** — `boomparty`
```
chore: allow backend media domain in next.config.js
```
- `next.config.js` 加：
  ```js
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'api.boomparty.tw' }]
  }
  ```
- 這個 commit 必須在任何引用後端 URL 圖片的改動之前

---

**Commit 3-B** — `boomparty`
```
feat: update Product and Category types for multi-image and cover
```
- `types/product.ts`：新增 `ProductImage` interface（`id, url, altText, sortOrder, isPrimary`），`Product` 加 `images: ProductImage[]`
- `types/category.ts`：`ShopCategory` 加 `coverImageUrl: string | null`
- `lib/api/products.ts`：新增 `fetchProductImages(id: number)`

---

**Commit 3-C** — `boomparty`
```
feat: update ProductCard to use primary image with fallback chain
```
- `features/shop/ProductCard/index.tsx`：
  - 取圖優先順序：`images.find(isPrimary)?.url` → `images[0]?.url` → `imageUrl`（舊欄位 fallback）→ Shimmer
  - `alt` 使用 `images.find(isPrimary)?.altText` 或商品名稱

---

**Commit 3-D** — `boomparty`
```
feat: add image gallery to product detail page
```
- `app/shop/[id]/ProductDetailContent/index.tsx`：
  - 主圖大圖顯示（點擊切換）
  - 下方縮圖列（`images` 陣列，點縮圖換主圖）
  - 若只有一張圖則不顯示縮圖列

---

**Commit 3-E** — `boomparty`
```
feat: show category cover image in DesktopFilter and MobileFilter
```
- `features/shop/DesktopFilter/index.tsx`：頂層分類若有 `coverImageUrl`，顯示小縮圖（24x24）在 icon 位置；沒有則 fallback 到 Lucide icon
- `features/shop/MobileFilter/index.tsx`：category chip 若有 `coverImageUrl`，左側加小縮圖

---

## 七、執行前確認清單

- [ ] 後端 `application.properties` 的 `media.upload-dir` 開發時設本機路徑（例如 `/tmp/boomparty-media`）
- [ ] `docker-compose.yml` 新增 volume 掛載（生產部署時）
- [ ] 確認 commit 0-A 刪除的資料夾內容確實未被任何程式碼引用

---

## 八、尚待補齊的商品圖片

以下商品分類尚無實際圖片，需後續透過後台上傳：

- 鋁箔素材（鋁箔氣球、數字字母、泡泡氣球）
- 乳膠氣球素材（圓型、心型、長條160/260/350、特殊形狀）
- 工具配件（手動打氣筒、電動充氣機、氣球棒/底座/緞帶、氦氣罐出租）
- 折氣球表演（現場折氣球、氣球達人、氣球表演秀）
- 氣球教學（折氣球入門、佈置工作坊）
- 客製印刷（氣球印刷、廣告氣球）
- 空飄充氣系列（除泡泡球套組外）
- 造型氣球（動物造型外的系列需要授權確認後才能補）
