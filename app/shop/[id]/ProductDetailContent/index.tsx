'use client';

import classnames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/features/shop/ProductCard';
import { useProductCart } from '@/hooks/useProductCart';
import { useCartStore } from '@/stores/cartStore';
import type { Product, ProductImage } from '@/types';

import style from './style';

interface ProductDetailContentProps {
  className?: string;
  product: Product;
  relatedProducts: Product[];
}

function getInitialImage(product: Product): ProductImage | null {
  if (!product.images || product.images.length === 0) return null;
  const primary = product.images.find((img) => img.isPrimary);
  return primary ? primary : product.images[0];
}

function ProductDetailContent({
  className,
  product,
  relatedProducts,
}: ProductDetailContentProps) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState<ProductImage | null>(
    getInitialImage(product)
  );
  const hasMultipleImages = product.images && product.images.length > 1;
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalCartItems = getTotalItems();

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
      {/* 麵包屑 */}
      <Breadcrumb
        items={[
          { label: '首頁', href: '/' },
          { label: '商城', href: '/shop' },
          ...(product.parentCategoryName
            ? [{ label: product.parentCategoryName }]
            : []),
          ...(product.categoryName ? [{ label: product.categoryName }] : []),
        ]}
      />

      <section className="product-section">
        {/* 左欄：商品圖片 */}
        <div className="product-image-wrapper">
          <div className="image-square">
            {activeImage ? (
              <Image
                alt={
                  activeImage.altText ? activeImage.altText : `${product.name}`
                }
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                src={activeImage.url}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <span className="image-placeholder">🎈</span>
            )}
            {product.featured && <span className="badge">熱門</span>}
            {isOutOfStock && <span className="badge out-of-stock">缺貨</span>}
          </div>

          {/* 縮圖列（多張圖片才顯示） */}
          {hasMultipleImages && (
            <div className="thumbnail-list">
              {product.images.map((img) => (
                <button
                  className={classnames('thumbnail-btn', {
                    active: activeImage && activeImage.id === img.id,
                  })}
                  key={img.id}
                  onClick={() => setActiveImage(img)}
                  type="button"
                >
                  <Image
                    alt={img.altText ? img.altText : `${product.name} 縮圖`}
                    fill
                    sizes="80px"
                    src={img.url}
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
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

          {/* 按鈕區（桌機顯示） */}
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

      {/* 固定底部購買列（手機顯示） */}
      <div className="fixed-bottom-bar">
        {/* 左側 icon 群 */}
        <div className="bar-icons">
          <button className="bar-icon-btn" type="button">
            <svg
              fill="none"
              height="22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              width="22"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>追蹤</span>
          </button>

          <button
            className="bar-icon-btn cart-btn"
            onClick={() => router.push('/cart')}
            type="button"
          >
            <div className="cart-icon-wrap">
              <svg
                fill="none"
                height="22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                width="22"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalCartItems > 0 && (
                <span className="cart-badge">
                  {totalCartItems > 99 ? '99+' : totalCartItems}
                </span>
              )}
            </div>
            <span>購物車</span>
          </button>
        </div>

        {/* 右側行動按鈕 */}
        <div className="bar-actions">
          <button
            className={classnames('fixed-add-to-cart', { added: justAdded })}
            disabled={isAdding || justAdded || isOutOfStock}
            onClick={addToCart}
            type="button"
          >
            {isAdding ? '加入中...' : justAdded ? '✓ 已加入' : '加入購物車'}
          </button>
          <button
            className="fixed-buy-now"
            disabled={isOutOfStock}
            onClick={buyNowGotoCart}
            type="button"
          >
            立即購買
          </button>
        </div>
      </div>

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
