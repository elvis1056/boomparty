'use client';

import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import Shimmer from '@/components/Shimmer';
import { useProductCart } from '@/hooks/useProductCart';
import type { Product } from '@/types';

import style from './style';

interface ProductCardProps {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const {
    quantity,
    isAdding,
    justAdded,
    maxStock,
    isOutOfStock,
    decreaseQuantity,
    increaseQuantity,
    changeQuantity,
    blurQuantity,
    clickQuantityInput,
    addToCart,
    buyNowGotoCart,
  } = useProductCart(product);

  return (
    <article className={className}>
      <Link className="card-image-link" href={`/shop/${product.id}`}>
        <div className="card-image-wrapper">
          <div className="card-image">
            {product.imageUrl ? (
              <Image
                alt={`${product.name} 氣球佈置 蹦娛樂 BoomParty`}
                fill
                src={product.imageUrl}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <Shimmer />
            )}
          </div>
          {product.featured && <span className="badge">熱門</span>}
          {isOutOfStock && <span className="badge out-of-stock">缺貨</span>}
        </div>
      </Link>

      <div className="card-info">
        <Link className="card-name-link" href={`/shop/${product.id}`}>
          <h3 className="card-name">{product.name}</h3>
        </Link>
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
              className="quantity-decrease"
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
              className="quantity-increase"
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
            className={classnames('add-to-cart', { added: justAdded })}
            disabled={isAdding || justAdded || isOutOfStock}
            onClick={addToCart}
            type="button"
          >
            {isAdding ? '加入中...' : justAdded ? '✓ 已加入' : '加入購物車'}
          </button>
          <button
            className="buy-now"
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
