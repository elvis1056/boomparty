# 前台 Next.js 結帳流程：Coupon + Affiliate 整合計畫

## Context
後端 Coupon + Affiliate API 已完成，後台管理頁也完成。
現在要在前台結帳頁加入：優惠碼輸入、Affiliate 點擊追蹤、下單時帶這兩個欄位。
用戶擔心優惠碼被濫用，需要防禦性設計。

---

## 防禦性設計決策

### 前端能做的
1. **Debounce validate 800ms**（比一般表單 300ms 更長），增加暴力破解摩擦
2. **不傳 discountAmount 給後端**，只傳 `couponCode`，後端自己算折扣
3. **模糊化錯誤訊息**：
   - 優惠碼不存在 → 顯示「優惠碼無效或不適用」（避免暴露是否存在）
   - 已過期、已達上限 → 同上
   - 金額未達門檻 → 顯示具體金額（對合法用戶有幫助，無安全風險）
4. **affiliateReferralCode 存 sessionStorage**（關 tab 清除，不用 localStorage）
5. **Cart 金額變動時清除已驗證的 coupon state**，避免舊驗證結果繼續使用

### 後端已有的保護（前端無需重複）
- usedCount 並發安全由後端處理
- createOrder 時後端重新驗證 couponCode（前端 validate 只是 preview）

---

## 實作範圍

### 新建
- `app/checkout/CheckoutContent/CouponInput/index.tsx`
- `app/checkout/CheckoutContent/CouponInput/style.ts`

### 修改
- `types/checkout.ts` — 加 `couponCode?`, `affiliateReferralCode?`, `CouponValidateResult` interface
- `lib/api/orders.ts` — 加 `validateCoupon()`, `recordAffiliateClick()`
- `app/checkout/CheckoutContent/index.tsx` — 整合 coupon state + affiliate
- `app/checkout/CheckoutContent/OrderSummary/index.tsx` — 加折扣顯示行
- `app/checkout/page.tsx` — 讀取 `?ref=` URL param，呼叫 click API

---

## Commit 1：型別 + API 函數

### `types/checkout.ts` 新增
```typescript
export interface CouponValidateResult {
  valid: boolean;
  discountAmount: number;
  message: string;
}

// CreateOrderRequest 加兩個欄位
export interface CreateOrderRequest {
  // ... 現有欄位不變 ...
  couponCode?: string;
  affiliateReferralCode?: string;
}
```

### `lib/api/orders.ts` 新增
```typescript
export async function validateCoupon(
  code: string,
  amount: number
): Promise<CouponValidateResult> {
  return apiClient.get(`/api/coupons/validate?code=${encodeURIComponent(code)}&amount=${amount}`, {
    requiresAuth: true,
  });
}

export async function recordAffiliateClick(referralCode: string): Promise<void> {
  return apiClient.post(`/api/affiliates/${referralCode}/click`, {});
}
```

---

## Commit 2：CouponInput 元件

**路徑：** `app/checkout/CheckoutContent/CouponInput/index.tsx`

**邏輯：**
- `inputRef` 儲存輸入值（不觸發 re-render）
- `status`: `'idle' | 'loading' | 'valid' | 'invalid'`
- `discountAmount`: number（後端回傳，父元件用）
- debounce 800ms 呼叫 `validateCoupon`
- 錯誤訊息處理（見防禦邏輯）：
  - 後端 message 包含「不存在」「已停用」「已過期」「已達上限」→ 統一顯示「優惠碼無效或不適用」
  - 後端 message 包含「門檻」→ 顯示原始訊息（幫助用戶知道要消費多少）
- Props：`onValidated(code: string, discount: number)`, `onCleared()`, `cartAmount: number`
- 當 `cartAmount` 變動（比較 prev）→ 自動清除驗證狀態，呼叫 `onCleared()`

---

## Commit 3：整合進 CheckoutContent + OrderSummary + checkout page

### `app/checkout/page.tsx`
```
- 讀取 searchParams 的 ref 參數
- 若存在 → 呼叫 recordAffiliateClick(ref)
- 將 ref 存入 sessionStorage('affiliateReferralCode')
- 使用 useEffect + 只執行一次（避免重複記錄）
```

### `CheckoutContent/index.tsx`
新增：
- `couponCode` state（string, 空字串表示無）
- `discountAmount` state（number）
- `couponValidated` callback：`setCouponCode(code); setDiscountAmount(discount)`
- `couponCleared` callback：`setCouponCode(''); setDiscountAmount(0)`
- `onSubmit` 時從 sessionStorage 讀取 `affiliateReferralCode`，加進 orderData
- `onSubmit` 的 orderData 加 `couponCode`（若有）

### `OrderSummary/index.tsx`
新增 props：`discountAmount: number`
顯示折扣行：
```
商品小計    NT$ xxx
優惠折扣   -NT$ xxx    ← 只在 discountAmount > 0 時顯示
運費        NT$ xxx
─────────────────
總計        NT$ xxx
```
總計計算：`cart.totalAmount - discountAmount + shippingFee`（最低 0）

---

## 驗證清單

- [ ] 輸入不存在的 code → 顯示「優惠碼無效或不適用」
- [ ] 輸入金額未達門檻的 code → 顯示「訂單金額未達最低門檻 NT$xxx」
- [ ] 輸入有效 code → 顯示綠色 + 折扣金額
- [ ] 修改購物車數量 → coupon 狀態清除
- [ ] 下單 request body 只有 couponCode，無 discountAmount
- [ ] 帶 `?ref=JOLIN10` 進結帳頁 → affiliate_clicks 新增紀錄
- [ ] 下單成功 → orders 有 affiliate_referral_code 欄位
- [ ] SessionStorage 在關 tab 後清除
