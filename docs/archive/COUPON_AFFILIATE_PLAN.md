# Coupon + Affiliate 完整實作計畫

## 狀態總覽

| Commit | 說明 | 狀態 |
|--------|------|------|
| 1 | 後端：Affiliate + Coupon 實體，Order 加 discount 欄位 | ✅ 完成 |
| 2 | 後端：Affiliate + Coupon Repository | ✅ 完成 |
| 3 | 後端：Affiliate + Coupon Service，整合進 Order 流程 | ✅ 完成 |
| 4 | 後端：Affiliate + Coupon Controller，更新 SecurityConfig | ✅ 完成 |
| 5 | 後端：修正 data.sql 初始化，更新 order seed 加 discount_amount | ✅ 完成 |
| 6 | 後端：refactor 術語（網紅 → 分享人）+ 後台 admin controller 拆分 | ✅ 完成 |
| 7 | 後端：後台管理（admin coupon/affiliate 路由已加入 /api/admin/**） | ✅ 完成 |
| 8 | 後端：更新設計文件反映 affiliate/coupon 系統 | ✅ 完成 |
| 9 | 後端：加入系統概覽與程式閱讀文件（CLAUDE.md） | ✅ 完成 |
| 10 | **前台**：型別 + API 函數（CouponValidateResult, validateCoupon, recordAffiliateClick） | ✅ 完成 |
| 11 | **前台**：CouponInput 元件（debounce 800ms, 防禦性錯誤訊息） | ✅ 完成 |
| 12 | **前台**：整合 CheckoutContent + OrderSummary + checkout page（ref param, sessionStorage） | ✅ 完成 |

---

## 後端已完成 Commits（對應 myprojectbackend）

```
8ae8a81 docs: add system overview and code walkthrough docs
8ae428c docs: add beginner reading and creation guides to architecture doc
5d8f55b chore: add CLAUDE.md with project rules and commit conventions
1753336 docs: update design docs to reflect affiliate and coupon system
8028594 refactor: replace 網紅 with 分享人 in all Java comments and messages
a021165 fix: enable data.sql auto-init and update order seed for discount_amount
48f78e1 feat: add affiliate and coupon controllers, update SecurityConfig
4aa4c47 feat: add affiliate and coupon service layer, integrate into order flow
79c45f9 feat: add affiliate and coupon repositories
b447b4c feat: add affiliate and coupon entities, update Order with discount fields
b434982 refactor: extract admin order and booking controllers to /api/admin/**
```

---

## 前台待完成（對應 boomparty）

### Commit 10：型別 + API 函數

**修改 `types/checkout.ts`**
- 新增 `CouponValidateResult` interface
- `CreateOrderRequest` 加 `couponCode?`, `affiliateReferralCode?`

**修改 `lib/api/orders.ts`**
- 新增 `validateCoupon(code, amount)`
- 新增 `recordAffiliateClick(referralCode)`

### Commit 11：CouponInput 元件

**新建 `app/checkout/CheckoutContent/CouponInput/index.tsx`**
- `inputRef` 儲存輸入值（不觸發 re-render）
- `status`: `'idle' | 'loading' | 'valid' | 'invalid'`
- debounce 800ms 呼叫 `validateCoupon`
- 防禦性錯誤訊息：不存在/過期/達上限 → 統一顯示「優惠碼無效或不適用」
- 金額未達門檻 → 顯示原始訊息（幫助用戶）
- `cartAmount` 變動時自動清除驗證狀態

**新建 `app/checkout/CheckoutContent/CouponInput/style.ts`**

### Commit 12：整合結帳流程

**修改 `app/checkout/page.tsx`**
- 讀取 `?ref=` URL param
- 呼叫 `recordAffiliateClick(ref)` 一次
- 存入 `sessionStorage('affiliateReferralCode')`

**修改 `app/checkout/CheckoutContent/index.tsx`**
- 加 `couponCode` state, `discountAmount` state
- `onSubmit` 從 sessionStorage 讀 `affiliateReferralCode`，帶進 orderData
- `onSubmit` 帶 `couponCode`（若有）

**修改 `app/checkout/CheckoutContent/OrderSummary/index.tsx`**
- 加 `discountAmount` prop
- 折扣 > 0 時顯示「優惠折扣 -NT$ xxx」
- 總計 = `cart.totalAmount - discountAmount + shippingFee`（最低 0）

---

## 防禦性設計備忘

- **不傳 discountAmount 給後端**，只傳 `couponCode`，後端自己算
- **affiliateReferralCode 存 sessionStorage**（關 tab 自動清除）
- **Cart 金額變動時清除 coupon state**，避免舊驗證繼續使用
- **debounce 800ms**（比一般 300ms 長，增加暴力破解摩擦）
