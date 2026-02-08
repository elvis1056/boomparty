/**
 * 訂單相關 Types（對應後端 OrderResponse）
 */

import type { PaymentMethod } from './payment';

// 訂單狀態（對應後端 OrderStatus enum）
export type OrderStatus =
  | 'ORDER_PENDING' // 待付款
  | 'ORDER_PAID' // 已付款
  | 'ORDER_PROCESSING' // 處理中
  | 'ORDER_SHIPPED' // 已出貨
  | 'ORDER_DELIVERED' // 已送達
  | 'ORDER_COMPLETED' // 已完成
  | 'ORDER_CANCELLED'; // 已取消

// 訂單商品項目（對應後端 OrderItemResponse）
export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string | null; // 商品圖片（快照）
  unitPrice: number; // 單價
  quantity: number; // 數量
  subtotal: number; // 小計
}

// 訂單（對應後端 OrderResponse）
export interface Order {
  id: number;
  orderNumber: string; // 訂單編號（例如：ORD-20260206-0001）
  status: OrderStatus;

  // 收件資訊
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string | null;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  note: string | null; // 訂單備註

  // 付款資訊
  paymentMethod: PaymentMethod;

  // 金額
  shippingFee: number; // 運費
  totalAmount: number; // 總金額

  // 時間
  createdAt: string;
  updatedAt: string;
  paidAt: string | null; // 付款時間
  shippedAt: string | null; // 出貨時間
  completedAt: string | null; // 完成時間

  // 訂單項目
  items: OrderItem[];
}
