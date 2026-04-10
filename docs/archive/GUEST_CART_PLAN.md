# Guest Cart 計畫

> 建立日期：2026-04-10
> 目標：未登入也能加入購物車，登入後自動同步至 server

---

## 背景與設計決策

**現況：** `useProductCart` 的 `addToCart` / `buyNowGotoCart` 在未登入時直接 `router.push('/login')`，使用者無法在未登入狀態累積購物車。

**選擇 A 方案（本地暫存）理由：**
- 使用者點「加入購物車」→ 存進 localStorage（Zustand persist）
- 登入後自動呼叫 API 同步，不需使用者手動重複操作
- 合併策略：直接把 guestItems 逐一呼叫 `addItem` API（boomparty 場景不需要複雜合併）

---

## 型別

`types/cart.ts` 新增：

```typescript
export interface GuestCartItem {
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string | null;
  quantity: number;
}
```

---

## 斷點執行順序

---

### ✅ 斷點 1：cartStore 加入 guest cart 狀態

**範圍：** `stores/cartStore.ts`、`types/cart.ts`

**`types/cart.ts`：**
- 新增 `GuestCartItem` interface

**`stores/cartStore.ts`：**
- 加 `zustand/middleware` 的 `persist`，僅 `partialize` 持久化 `guestItems`
- 新增 state：`guestItems: GuestCartItem[]`
- 新增 actions：
  - `addGuestItem(productId, quantity, product)` — 若已有相同 productId 則累加數量
  - `removeGuestItem(productId)` — 移除單筆
  - `clearGuestItems()` — 清空（登出時呼叫）
  - `syncGuestCart()` — 逐一呼叫 `addItem` API，同步後 `clearGuestItems()`
- 新增 getter：`getTotalGuestItems()` — guestItems 所有 quantity 加總

**注意：** `persist` 只包 `guestItems`，`cart`（server cart）不持久化，避免顯示舊資料。

---

### ✅ 斷點 2：useProductCart 移除登入擋關

**範圍：** `hooks/useProductCart.ts`

- 移除 `if (!isLoggedIn) { router.push('/login'); return; }` 判斷
- `addToCart`：
  - 已登入 → 原本的 `addItem` API 路徑
  - 未登入 → `addGuestItem(product.id, quantity, product)`（從 cartStore）
- `buyNowGotoCart`：
  - 已登入 → 加入後 `router.push('/cart')`
  - 未登入 → `addGuestItem` 後 `router.push('/cart')`（顯示 guest cart）
- `justAdded` / `isAdding` 狀態兩條路徑都要正確更新

---

### ✅ 斷點 3：登入後同步 guest cart

登入有三個入口，全部要加 `syncGuestCart()`：

| 入口 | 檔案 |
|------|------|
| 帳號密碼登入 | `app/login/LoginContent/index.tsx` |
| Google OAuth | `components/GoogleLoginButton/index.tsx` |

**每個入口的 `setAuth(response)` 之後加：**
```typescript
const syncGuestCart = useCartStore((state) => state.syncGuestCart);
// setAuth(response) 之後
await syncGuestCart();
```

**錯誤處理：** `syncGuestCart` 內部逐一 try/catch，單筆失敗（如庫存不足）不影響其他品項繼續同步，失敗品項記錄起來，同步完成後顯示提示。

---

### ✅ 斷點 4：登出時清除 guest cart

**範圍：** 找到所有呼叫 `clearAuth()` 的地方，加上 `clearGuestItems()`

目前 `clearAuth` 的呼叫位置：（待確認，grep `clearAuth`）

---

### ✅ 斷點 5：Cart 頁面支援 guest cart

**範圍：** `app/cart/`（待確認是否已存在）

- 已登入 → 顯示 server cart（現有邏輯）
- 未登入 → 顯示 `guestItems`，可調整數量、移除品項
- 未登入的 cart 頁要有 CTA：「登入後結帳」按鈕（導向 `/login`）

---

## 技術重點

| 項目 | 說明 |
|------|------|
| Zustand persist | `import { persist } from 'zustand/middleware'`，`partialize: (state) => ({ guestItems: state.guestItems })` |
| 防止 hydration mismatch | persist 需要搭配 `skipHydration` 或在 client 初始化，避免 SSR/CSR 不一致 |
| 同裝置多帳號問題 | 登出時 `clearGuestItems()`，避免下一個使用者看到前一個人的 guest cart |
| syncGuestCart 冪等 | 同步完成後一定要 `clearGuestItems()`，避免重複加入 |

---

## 已確認

- `app/cart/` 不存在，斷點 5 需要新建
- `clearAuth()` 只在 `components/Navbar/index.tsx:45`（登出按鈕）呼叫
- 登入入口共兩個（Facebook OAuth 見 `FACEBOOK_OAUTH_PLAN.md`，完成後補加）：
  - 帳號密碼：`app/login/LoginContent/index.tsx` → `setAuth(response)` 後 `router.push('/')`
  - Google：`components/GoogleLoginButton/index.tsx` → `setAuth(data)` 後 `router.push('/')`

---

## Revert 說明

各斷點彼此獨立程度：
- 斷點 1 可獨立 revert（只新增 state，不改行為）
- 斷點 2 依賴斷點 1（需要 `addGuestItem` 存在）
- 斷點 3 依賴斷點 1（需要 `syncGuestCart` 存在）
- 斷點 4 獨立
- 斷點 5 獨立（UI 層）
