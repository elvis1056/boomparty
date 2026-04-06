'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

import CartItem from './CartItem';
import style from './style';

interface CartPageContentProps {
  className?: string;
}

function CartPageContent({ className }: CartPageContentProps) {
  const isLoggedIn = useAuthStore((state) => state.user !== null);
  const { cart, isLoading, loadCart, clearAllItems } = useCartStore();

  // 載入購物車
  useEffect(() => {
    if (isLoggedIn) {
      loadCart();
    }
  }, [isLoggedIn, loadCart]);

  // 清空購物車
  const clearCart = async () => {
    if (!confirm('確定要清空購物車嗎？')) return;

    try {
      await clearAllItems();
    } catch (error) {
      console.error('Failed to clear cart:', error);
      alert('清空購物車失敗，請稍後再試');
    }
  };

  // 未登入
  if (!isLoggedIn) {
    return (
      <div className={className}>
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🔒</div>
            <h2 className="empty-title">請先登入</h2>
            <p className="empty-description">登入後即可查看購物車內容</p>
            <Link className="continue-shopping-btn" href="/login">
              前往登入
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 載入中
  if (isLoading && !cart) {
    return (
      <div className={className}>
        <div className="container">
          <div className="loading">載入中...</div>
        </div>
      </div>
    );
  }

  // 購物車為空
  if (!cart || cart.items.length === 0) {
    return (
      <div className={className}>
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2 className="empty-title">購物車是空的</h2>
            <p className="empty-description">快去挑選喜歡的商品吧！</p>
            <Link className="continue-shopping-btn" href="/shop">
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
        <div className="cart-header">
          <h1 className="cart-title">購物車</h1>
          <button className="clear-btn" onClick={clearCart}>
            清空購物車
          </button>
        </div>

        <div className="cart-layout">
          {/* 商品列表 */}
          <div className="cart-items">
            {cart.items.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          {/* 結帳摘要 */}
          <div className="cart-summary">
            <h2 className="summary-title">訂單摘要</h2>

            <div className="summary-row">
              <span className="summary-label">商品數量</span>
              <span className="summary-value">{cart.totalItems} 項</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">商品總數</span>
              <span className="summary-value">{cart.totalQuantity} 件</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total">
              <span className="summary-label">總計</span>
              <span className="summary-value">
                NT$ {cart.totalAmount.toLocaleString()}
              </span>
            </div>

            <Link className="checkout-btn" href="/checkout">
              前往結帳
            </Link>

            <Link className="continue-shopping-link" href="/shop">
              繼續購物
            </Link>
          </div>
        </div>

        {/* 手機版/平板固定底部結帳區 */}
        <div className="mobile-checkout-bar">
          <div className="mobile-checkout-total">
            <span className="mobile-total-label">總計</span>
            <span className="mobile-total-value">
              NT$ {cart.totalAmount.toLocaleString()}
            </span>
          </div>
          <Link className="mobile-checkout-btn" href="/checkout">
            前往結帳
          </Link>
        </div>
      </div>
    </div>
  );
}

export default styled(CartPageContent)`
  ${style}
`;
