import type { Order, CreateOrderRequest, CouponValidateResult } from '@/types';

import { apiClient } from './client';

/**
 * 建立訂單
 */
export async function createOrder(data: CreateOrderRequest): Promise<Order> {
  return apiClient.post<Order>('/api/orders', data, {
    requiresAuth: true,
  });
}

/**
 * 查詢我的訂單列表
 */
export async function fetchMyOrders(): Promise<Order[]> {
  return apiClient.get<Order[]>('/api/orders', { requiresAuth: true });
}

/**
 * 查詢單一訂單
 */
export async function fetchOrderById(id: number): Promise<Order> {
  return apiClient.get<Order>(`/api/orders/${id}`, { requiresAuth: true });
}

/**
 * 驗證優惠碼（preview 用途，後端下單時會再次驗證）
 */
export async function validateCoupon(
  code: string,
  amount: number
): Promise<CouponValidateResult> {
  return apiClient.get<CouponValidateResult>(
    `/api/coupons/validate?code=${encodeURIComponent(code)}&amount=${amount}`,
    { requiresAuth: true }
  );
}

/**
 * 記錄 Affiliate 點擊
 */
export async function recordAffiliateClick(
  referralCode: string
): Promise<void> {
  return apiClient.post<void>(`/api/affiliates/${referralCode}/click`, {});
}

/**
 * 取消訂單
 */
export async function cancelOrder(id: number): Promise<Order> {
  return apiClient.post<Order>(
    `/api/orders/${id}/cancel`,
    {},
    {
      requiresAuth: true,
    }
  );
}
