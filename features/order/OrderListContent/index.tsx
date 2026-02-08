'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchMyOrders } from '@/lib/api/orders';
import { useAuthStore } from '@/stores/authStore';
import type { Order, OrderStatus } from '@/types';

import style from './style';

interface OrderListContentProps {
  className?: string;
}

// 訂單狀態對應的中文和顏色
const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; color: string }> =
  {
    ORDER_PENDING: { label: '待付款', color: '#f59e0b' },
    ORDER_PAID: { label: '已付款', color: '#3b82f6' },
    ORDER_PROCESSING: { label: '處理中', color: '#8b5cf6' },
    ORDER_SHIPPED: { label: '已出貨', color: '#06b6d4' },
    ORDER_DELIVERED: { label: '已送達', color: '#10b981' },
    ORDER_COMPLETED: { label: '已完成', color: '#22c55e' },
    ORDER_CANCELLED: { label: '已取消', color: '#ef4444' },
  };

function OrderListContent({ className }: OrderListContentProps) {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 載入訂單列表
  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMyOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setError('無法載入訂單，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // 未登入
  if (!user) {
    return (
      <div className={className}>
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🔒</div>
            <h2 className="empty-title">請先登入</h2>
            <p className="empty-description">登入後即可查看訂單記錄</p>
            <Link className="action-btn" href="/login">
              前往登入
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 載入中
  if (isLoading) {
    return (
      <div className={className}>
        <div className="container">
          <div className="loading">載入中...</div>
        </div>
      </div>
    );
  }

  // 錯誤
  if (error) {
    return (
      <div className={className}>
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">❌</div>
            <h2 className="empty-title">載入失敗</h2>
            <p className="empty-description">{error}</p>
            <button
              className="action-btn"
              onClick={() => window.location.reload()}
            >
              重新載入
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 沒有訂單
  if (orders.length === 0) {
    return (
      <div className={className}>
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h2 className="empty-title">目前沒有訂單</h2>
            <p className="empty-description">快去選購喜歡的商品吧！</p>
            <Link className="action-btn" href="/shop">
              前往商城
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="container">
        <h1 className="page-title">我的訂單</h1>

        <div className="order-list">
          {orders.map((order) => {
            const statusInfo = ORDER_STATUS_MAP[order.status];
            return (
              <Link
                className="order-card"
                href={`/orders/${order.id}`}
                key={order.id}
              >
                <div className="order-header">
                  <span className="order-number">{order.orderNumber}</span>
                  <span
                    className="order-status"
                    style={{ backgroundColor: statusInfo.color }}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <div className="order-info">
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="order-items-count">
                    共 {order.items.length} 項商品
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-recipient">
                    收件人：{order.recipientName}
                  </div>
                  <div className="order-total">
                    NT$ {order.totalAmount.toLocaleString()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default styled(OrderListContent)`
  ${style}
`;
