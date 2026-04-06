'use client';

import classnames from 'classnames';
import Image from 'next/image';
import styled from 'styled-components';

import ProductCard from '@/features/shop/ProductCard';
import { useProductCart } from '@/hooks/useProductCart';
import type { Product } from '@/types';

import style from './style';

interface ProductDetailContentProps {
  className?: string;
  product: Product;
  relatedProducts: Product[];
}

function ProductDetailContent({
  className,
  product,
  relatedProducts,
}: ProductDetailContentProps) {
  const {
    quantity,
    isAdding,
    justAdded,
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
    <div className={className}>
      <section className="product-section">
        {/* 左欄：商品圖片 */}
        <div className="product-image-wrapper">
          <div className="image-square">
            {product.imageUrl ? (
              <Image
                alt={`${product.name} 氣球佈置 蹦娛樂 BoomParty`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                src={product.imageUrl}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <span className="image-placeholder">🎈</span>
            )}
            {product.featured && <span className="badge">熱門</span>}
            {isOutOfStock && <span className="badge out-of-stock">缺貨</span>}
          </div>
        </div>

        {/* 右欄：商品資訊 */}
        <div className="product-info">
          {product.categoryName && (
            <p className="product-category">{product.categoryName}</p>
          )}

          <h1 className="product-name">{product.name}</h1>

          <div className="product-price">
            <span className="price-label">NT$</span>
            <span className="price-value">
              {product.price.toLocaleString()}
            </span>
          </div>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          <div className="divider" />

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
                disabled={quantity >= (product.stock || 99) || isOutOfStock}
                onClick={increaseQuantity}
                type="button"
              >
                +
              </button>
            </div>
          </div>

          {/* 按鈕區 */}
          <div className="product-actions">
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
      </section>

      {/* 你可能也喜歡 */}
      {relatedProducts.length > 0 && (
        <section className="related-section">
          <h2 className="related-title">你可能也喜歡</h2>
          <div className="related-grid">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default styled(ProductDetailContent)`
  ${style}
`;
