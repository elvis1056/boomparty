/**
 * 結帳相關 Types
 */

import type { DeliveryTimeSlot, PaymentMethod } from './payment';

// 收件地址（會員常用地址）
export interface Address {
  id: number;
  userId: number;
  recipientName: string;
  recipientPhone: string;
  city: string; // 縣市
  district: string; // 鄉鎮市區
  postalCode: string; // 郵遞區號
  addressLine: string; // 詳細地址
  isDefault: boolean; // 是否為預設地址
  createdAt: string;
  updatedAt: string;
}

// 建立地址請求
export interface CreateAddressRequest {
  recipientName: string;
  recipientPhone: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  isDefault?: boolean;
}

// 優惠碼驗證結果
export interface CouponValidateResult {
  valid: boolean;
  discountAmount: number;
  message: string;
}

// 建立訂單請求（對應後端 CreateOrderRequest）
export interface CreateOrderRequest {
  // 收件資訊
  recipientName: string;
  recipientPhone: string;
  recipientEmail?: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  note?: string;

  // 付款方式
  paymentMethod: PaymentMethod;

  // 優惠碼（選填，後端自行計算折扣）
  couponCode?: string;

  // Affiliate 推薦碼（選填）
  affiliateReferralCode?: string;
}

// 結帳表單資料（前端使用）
export interface CheckoutFormData {
  // 收件資訊
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  deliveryTimeSlot: DeliveryTimeSlot;
  note: string;

  // 付款方式
  paymentMethod: PaymentMethod;

  // 地址相關
  selectedAddressId: number | null; // 選擇的常用地址 ID
  saveAddress: boolean; // 是否儲存為常用地址
  setAsDefaultAddress: boolean; // 是否設為預設地址
}
