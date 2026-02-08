'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types';

import style from './style';

interface ProductCardProps {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // 檢查庫存
  const maxStock = product.stock ? product.stock : 99;
  const isOutOfStock = maxStock === 0;

  // 數量減少
  const decreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 數量增加
  const increaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  // 數量輸入變化
  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 允許空字串（使用者清空準備輸入）
    if (value === '') {
      setQuantity(0);
      return;
    }

    // 只允許數字
    if (!/^[0-9]+$/.test(value)) {
      return;
    }

    const numValue = Number(value);

    // 不能超過庫存
    if (numValue > maxStock) {
      setQuantity(maxStock);
      return;
    }

    setQuantity(numValue);
  };

  // 失焦時驗證
  const blurQuantity = () => {
    // 如果是 0 或空，設回 1
    if (quantity < 1) {
      setQuantity(1);
    }
  };

  // 點擊輸入框時全選
  const clickQuantityInput = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    target.select();
  };

  // 加入購物車
  const addToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    if (isAdding || justAdded || isOutOfStock) return;

    setIsAdding(true);
    try {
      await addItem(product.id, quantity);

      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('加入購物車失敗，請稍後再試');
    } finally {
      setIsAdding(false);
    }
  };

  // 立即購買：加入購物車後跳轉
  const buyNowGotoCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    if (isOutOfStock) return;

    try {
      await addItem(product.id, quantity);
      router.push('/cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('操作失敗，請稍後再試');
    }
  };

  return (
    <article className={className}>
      <div className="card-image-wrapper">
        <div className="card-image">
          {product.imageUrl ? (
            <Image
              alt={product.name}
              fill
              src={product.imageUrl}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <span className="image-placeholder">🎈</span>
          )}
        </div>
        {product.featured && <span className="badge">熱門</span>}
        {isOutOfStock && <span className="badge out-of-stock">缺貨</span>}
      </div>

      <div className="card-info">
        <h3 className="card-name">{product.name}</h3>
        <p className="card-description">{product.description}</p>

        <div className="card-price">
          <span className="price-label">NT$</span>
          <span className="price-value">{product.price.toLocaleString()}</span>
        </div>

        {/* 數量選擇器 */}
        <div className="quantity-selector">
          <span className="quantity-label">數量</span>
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              disabled={quantity <= 1 || isOutOfStock}
              onClick={decreaseQuantity}
              type="button"
            >
              −
            </button>
            <input
              className="quantity-input"
              disabled={isOutOfStock}
              onBlur={blurQuantity}
              onChange={changeQuantity}
              onClick={clickQuantityInput}
              pattern="[0-9]*"
              type="number"
              value={quantity === 0 ? '' : quantity}
            />
            <button
              className="quantity-btn"
              disabled={quantity >= maxStock || isOutOfStock}
              onClick={increaseQuantity}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        {/* 按鈕區 */}
        <div className="card-actions">
          <button
            className={`btn-add-cart ${justAdded ? 'added' : ''}`}
            disabled={isAdding || justAdded || isOutOfStock}
            onClick={addToCart}
            type="button"
          >
            {isAdding ? '加入中...' : justAdded ? '✓ 已加入' : '加入購物車'}
          </button>
          <button
            className="btn-buy-now"
            disabled={isOutOfStock}
            onClick={buyNowGotoCart}
            type="button"
          >
            立即購買
          </button>
        </div>
      </div>
    </article>
  );
}

export default styled(ProductCard)`
  ${style}
`;
