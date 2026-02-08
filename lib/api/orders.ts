import type { Order, CreateOrderRequest } from '@/types';

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
