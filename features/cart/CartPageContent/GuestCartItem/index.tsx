'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { useCartStore } from '@/stores/cartStore';
import type { GuestCartItem as GuestCartItemType } from '@/types';

import style from './style';

interface GuestCartItemProps {
  item: GuestCartItemType;
  className?: string;
}

function GuestCartItem({ item, className }: GuestCartItemProps) {
  const removeGuestItem = useCartStore((state) => state.removeGuestItem);

  const removeItem = () => {
    if (!confirm(`確定要移除「${item.productName}」嗎？`)) return;
    removeGuestItem(item.productId);
  };

  const subtotal = item.productPrice * item.quantity;

  return (
    <div className={className}>
      <div className="item-image">
        {item.productImageUrl ? (
          <Image
            alt={item.productName}
            fill
            src={item.productImageUrl}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <span className="image-placeholder">🎈</span>
        )}
      </div>

      <div className="item-info">
        <h3 className="item-name">{item.productName}</h3>
        <p className="item-unit-price">
          NT$ {item.productPrice.toLocaleString()} / 件
        </p>
        <p className="item-quantity-text">數量：{item.quantity}</p>
      </div>

      <div className="item-subtotal">NT$ {subtotal.toLocaleString()}</div>

      <button className="remove-btn" onClick={removeItem} type="button">
        ✕
      </button>
    </div>
  );
}

export default styled(GuestCartItem)`
  ${style}
`;
