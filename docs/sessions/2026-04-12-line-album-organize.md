# LINE_ALBUM 圖片整理 + 造型氣球商品補齊 計畫

> 建立日期：2026-04-12
> 整合自：2026-04-11-balloon-shapes-50.md（已廢棄，以此計畫為準）
> 狀態：進行中

## 背景

兩個任務合併執行，因為本質上是同一件事：

1. **圖片整理**：`public/images/shop/` 根目錄下有 69 張 `LINE_ALBUM_造型圖庫_260412_*.jpg`，
   全是造型氣球作品照，堆在根目錄、檔名無意義
2. **商品補齊**：商城「造型氣球」分類（id=2）目前只有 1 個商品（花朵），
   10 個子分類全部空白，需補齊至少 55 種造型商品

整合後：以實際圖片驅動商品清單，有圖的商品用真實路徑，沒有圖的用 Shimmer 佔位。

**關於版權**：造型氣球是師傅手工捏製的獨創作品，使用角色名稱（龍貓、米奇）作為描述沒有問題。

---

## 分類對照表（categoryId）

| id  | 名稱           | 目標數量 |
| --- | -------------- | -------- |
| 19  | 動物造型       | 15       |
| 54  | 花朵系列       | 5        |
| 20  | 公主系列       | 5        |
| 21  | 手拿棒系列     | 5        |
| 22  | 武器系列       | 5        |
| 23  | 配件系列       | 5        |
| 24  | 卡通造型       | 10+      |
| 25  | 手環系列       | 3        |
| 26  | 編織系列       | 3        |
| 27  | 其他系列       | 4        |

**合計：≥55 種**（加原有花朵 = 56 種）

---

## 斷點執行順序

### 斷點 1：逐張看完 69 張圖，建立分類 + 商品對照表

**範圍：** `public/images/shop/LINE_ALBUM_造型圖庫_260412_*.jpg`（69 張）

**做什麼：**
- Read 讀取所有圖片
- 為每張圖決定：新檔名、目標資料夾、對應商品名稱、建議價格
- 建立完整對照表（格式如下）：

```
| 原始檔名 | 新檔名 | 目標資料夾 | 商品名稱 | categoryId | 建議價格 |
```

- 新檔名規則：`[角色或描述]-balloon.jpg`（全小寫、連字號、英文為主）
- 目標資料夾（現有，不新增）：
  - `造型氣球/卡通造型/`（Sanrio、Disney、Pixar、Marvel、日本動漫等）
  - `造型氣球/動物造型/`（純動物造型）
  - `造型氣球/公主系列/`（公主、少女、仙女造型）
  - `造型氣球/其他系列/`（無法歸類的）
- 概覽拼圖圖片（多角色拼排）放 `造型氣球/卡通造型/overview-*.jpg`

**注意事項：**
- 同角色有多張時加編號（`hello-kitty-balloon-1.jpg`）
- 不確定的描述外觀（`green-round-character-balloon.jpg`）
- 這個斷點產出的對照表是斷點 2、4 的輸入

---

### 斷點 2：批次移動 + 重新命名

**範圍：** `public/images/shop/`

**做什麼：**
- 用 Bash `mv` 指令批次搬移 + 重命名
- 驗證：確認根目錄下已無 `LINE_ALBUM_*` 檔案

**注意事項：**
- 只搬移（`mv`），不刪除原始檔
- 不動原有的 `balloondog-*.png`、`balloon-flower-*.png`

---

### 斷點 3：ProductCard 圖片 fallback 改用 Shimmer

**範圍：** `features/shop/ProductCard/index.tsx`、`features/shop/ProductCard/style.ts`

**做什麼：**
- import `Shimmer` from `@/components/Shimmer`
- `imageUrl` 為空時，把 `<span className="image-placeholder">🎈</span>` 換成 `<Shimmer />`
- style.ts 刪除 `.image-placeholder` 樣式（不再需要）

**注意事項：**
- Shimmer 填滿 `.card-image`（已是 `position: absolute; width: 100%; height: 100%`，直接放入即可）
- 此斷點與斷點 2 獨立，可以先做

---

### 斷點 4：以實際圖片重建造型氣球商品清單

**範圍：** `constants/mockProducts.ts`

**前置條件：** 斷點 1 對照表、斷點 2 搬移完成

**核心原則：圖片驅動，而非想像驅動**

現有 id 200–254 的 55 筆資料是依舊計畫想像出來的，不對應真實圖片，
分類也未必符合實際庫存。此斷點**全部替換**，以斷點 1 建立的對照表為唯一依據。

---

**做什麼：**

1. **刪除** `mockProducts.ts` 中 id 200–254 的全部舊資料
2. **依斷點 1 對照表**逐筆新增商品，規則如下：
   - 每個獨立造型 → 一筆商品
   - 同造型有多張圖（不同角度）→ 選最清晰那張當 imageUrl，其餘略過
   - 圖片路徑：`assetPath('/images/shop/造型氣球/[子資料夾]/[新檔名].jpg')`
   - 無對應圖片的分類（如某些手拿棒、武器）→ 仍可新增 1–2 筆代表性商品，`imageUrl: null`
3. **id 分配**：從 200 起，按分類排列（動物 → 花朵 → 公主 → 手拿棒 → 武器 → 配件 → 卡通 → 手環 → 編織 → 其他）
4. **共用欄位**：`parentCategoryId: 2`、`parentCategoryName: '造型氣球'`、`stock: 50`、`active: true`、`featured: false`

---

**定價參考（依製作複雜度）：**

| 複雜度 | 範例 | 建議價格 |
| --- | --- | --- |
| 基礎（單泡、簡單造型） | 氣球狗、劍、戒指 | 40–60 |
| 中等（多泡組合） | 動物、花朵、手拿棒 | 60–120 |
| 進階（立體造型、多色） | 獨角獸、美人魚、卡通角色 | 120–200 |
| 複雜（大型、全身立體） | 龍、鳳凰、站立恐龍 | 200–350 |

---

**中文名稱轉換規則（從英文檔名推）：**

| 英文關鍵字 | 中文 | 分類 |
| --- | --- | --- |
| `dog` / `doggie` | 氣球狗 | 動物 |
| `rabbit` / `bunny` | 氣球兔子 | 動物 |
| `bear` / `teddy` | 氣球小熊 | 動物 |
| `swan` | 氣球天鵝 | 動物 |
| `butterfly` | 氣球蝴蝶 | 動物 |
| `unicorn` | 氣球獨角獸 | 動物 |
| `dragon` | 氣球龍 | 其他 |
| `dinosaur` | 氣球恐龍 | 其他 |
| `flower` / `rose` | 依花種命名 | 花朵 |
| `crown` | 氣球皇冠 | 公主或配件 |
| `sword` / `gun` / `bow` | 依武器命名 | 武器 |
| `hat` / `glasses` / `ring` | 依配件命名 | 配件 |
| `wristband` / `bracelet` | 氣球手環 | 手環 |
| `woven` / `weave` | 編織系列 | 編織 |
| `kitty` / `mickey` / `totoro` 等 | 對應卡通名稱 | 卡通造型 |

---

**執行後對照表格式（斷點 1 輸出，斷點 4 直接用）：**

```
| id  | 中文名稱 | categoryId | categoryName | imageUrl 路徑 | 價格 |
```

> 此格式由斷點 1 產出，斷點 4 直接轉成程式碼，不重新判斷

---

## 技術重點

| 項目            | 說明                                                      |
| --------------- | --------------------------------------------------------- |
| 圖片 fallback   | ProductCard 無 imageUrl 時顯示 `<Shimmer />`              |
| imageUrl 有圖時 | `assetPath('/images/shop/造型氣球/[子資料夾]/[檔名].jpg')` |
| imageUrl 無圖時 | `null`                                                    |
| 商品 id         | 200–259，不與現有 mock data 衝突                          |
| parentCategoryId | 全部設為 `2`（造型氣球）                                 |
| 命名格式        | `[角色或描述]-balloon.jpg`，全小寫，連字號                |

---

## Revert 說明

- 斷點 1：純分析，無異動，無需 revert
- 斷點 2：`mv` 回原路徑即可；可用 `git restore` 恢復 git 追蹤狀態
- 斷點 3：還原 `features/shop/ProductCard/index.tsx` 與 `style.ts` 即可
- 斷點 4：刪除 mockProducts.ts 中 id 200–259 的商品即可
- 斷點 2、3、4 互相獨立，可分開 revert
