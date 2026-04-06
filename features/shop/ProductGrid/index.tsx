'use client';

import Link from 'next/link';
import styled from 'styled-components';

import type { Product } from '@/types';

import ProductCard from '../ProductCard';

import style from './style';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={className}>
        <div className="empty-state">
          <p>目前沒有商品</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="product-grid">
        {products.map((product) => (
          <Link
            className="product-link"
            href={`/shop/${product.id}`}
            key={product.id}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default styled(ProductGrid)`
  ${style}
`;
