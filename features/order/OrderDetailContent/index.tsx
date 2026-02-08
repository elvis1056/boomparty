'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { cancelOrder, fetchOrderById } from '@/lib/api/orders';
import { useAuthStore } from '@/stores/authStore';
import type { Order, OrderStatus, PaymentMethod } from '@/types';

import style from './style';

interface OrderDetailContentProps {
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

// 付款方式對應的中文
const PAYMENT_METHOD_MAP: Record<PaymentMethod, string> = {
  CREDIT_CARD: '信用卡',
  CASH_ON_DELIVERY: '貨到付款',
};

function OrderDetailContent({ className }: OrderDetailContentProps) {
  const params = useParams();
  const orderId = Number(params.id);
  const user = useAuthStore((state) => state.user);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // 載入訂單詳情
  useEffect(() => {
    if (!user || !orderId) return;

    const loadOrder = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error('Failed to load order:', err);
        setError('無法載入訂單，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [user, orderId]);

  // 取消訂單
  const doCancelOrder = async () => {
    if (!order) return;
    if (!confirm('確定要取消此訂單嗎？')) return;

    try {
      setIsCancelling(true);
      const updatedOrder = await cancelOrder(order.id);
      setOrder(updatedOrder);
      alert('訂單已取消');
    } catch (err) {
      console.error('Failed to cancel order:', err);
      alert('取消訂單失敗，請稍後再試');
    } finally {
      setIsCancelling(false);
    }
  };

  // 是否可以取消訂單
  const canCancel =
    order &&
    (order.status === 'ORDER_PENDING' || order.status === 'ORDER_PAID');

  // 未登入
  if (!user) {
    return (
      <div className={className}>
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🔒</div>
            <h2 className="empty-title">請先登入</h2>
            <p className="empty-description">登入後即可查看訂單詳情</p>
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

  // 錯誤或找不到訂單
  if (error || !order) {
    return (
      <div className={className}>
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">❌</div>
            <h2 className="empty-title">找不到訂單</h2>
            <p className="empty-description">
              {error ? error : '此訂單不存在或您沒有權限查看'}
            </p>
            <Link className="action-btn" href="/orders">
              返回訂單列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = ORDER_STATUS_MAP[order.status];

  return (
    <div className={className}>
      <div className="container">
        {/* 返回按鈕 */}
        <Link className="back-link" href="/orders">
          ← 返回訂單列表
        </Link>

        {/* 訂單標題 */}
        <div className="order-header">
          <div className="header-left">
            <h1 className="order-number">{order.orderNumber}</h1>
            <span className="order-date">
              {new Date(order.createdAt).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <span
            className="order-status"
            style={{ backgroundColor: statusInfo.color }}
          >
            {statusInfo.label}
          </span>
        </div>

        <div className="order-content">
          {/* 商品列表 */}
          <section className="section">
            <h2 className="section-title">訂購商品</h2>
            <div className="items-list">
              {order.items.map((item) => (
                <div className="item-card" key={item.id}>
                  <div className="item-image">
                    {item.productImage ? (
                      <Image
                        alt={item.productName}
                        fill
                        src={item.productImage}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="no-image">無圖片</div>
                    )}
                  </div>
                  <div className="item-info">
                    <div className="item-name">{item.productName}</div>
                    <div className="item-price">
                      NT$ {item.unitPrice.toLocaleString()} x {item.quantity}
                    </div>
                  </div>
                  <div className="item-subtotal">
                    NT$ {item.subtotal.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 收件資訊 */}
          <section className="section">
            <h2 className="section-title">收件資訊</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">收件人</span>
                <span className="info-value">{order.recipientName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">電話</span>
                <span className="info-value">{order.recipientPhone}</span>
              </div>
              {order.recipientEmail && (
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{order.recipientEmail}</span>
                </div>
              )}
              <div className="info-item full-width">
                <span className="info-label">地址</span>
                <span className="info-value">
                  {order.postalCode} {order.city}
                  {order.district}
                  {order.addressLine}
                </span>
              </div>
              {order.note && (
                <div className="info-item full-width">
                  <span className="info-label">備註</span>
                  <span className="info-value">{order.note}</span>
                </div>
              )}
            </div>
          </section>

          {/* 付款資訊 */}
          <section className="section">
            <h2 className="section-title">付款資訊</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">付款方式</span>
                <span className="info-value">
                  {PAYMENT_METHOD_MAP[order.paymentMethod]}
                </span>
              </div>
              {order.paidAt && (
                <div className="info-item">
                  <span className="info-label">付款時間</span>
                  <span className="info-value">
                    {new Date(order.paidAt).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* 金額摘要 */}
          <section className="section summary-section">
            <div className="summary-row">
              <span className="summary-label">商品小計</span>
              <span className="summary-value">
                NT$ {(order.totalAmount - order.shippingFee).toLocaleString()}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">運費</span>
              <span className="summary-value">
                NT$ {order.shippingFee.toLocaleString()}
              </span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span className="summary-label">訂單總額</span>
              <span className="summary-value">
                NT$ {order.totalAmount.toLocaleString()}
              </span>
            </div>
          </section>

          {/* 操作按鈕 */}
          {canCancel && (
            <div className="actions">
              <button
                className="cancel-btn"
                disabled={isCancelling}
                onClick={doCancelOrder}
              >
                {isCancelling ? '取消中...' : '取消訂單'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default styled(OrderDetailContent)`
  ${style}
`;
