'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import style from './style';

interface Product {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  tags?: string[];
  href: string;
}

interface ProductCarouselProps {
  className?: string;
  products: Product[];
}

function ProductCarousel({ className, products }: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!products || products.length === 0) return <></>;

  const prev = () =>
    setCurrent((c) => (c - 1 + products.length) % products.length);
  const next = () => setCurrent((c) => (c + 1) % products.length);

  const product = products[current];

  return (
    <section className={className}>
      <div className="showcase">
        <div className="showcase-text">
          {product.tags && product.tags.length > 0 && (
            <div className="showcase-tags">
              {product.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="showcase-name">{product.title}</h3>
          {product.subtitle && (
            <p className="showcase-subtitle">{product.subtitle}</p>
          )}
          <div className="showcase-nav">
            <button aria-label="上一張" className="nav-btn" onClick={prev}>
              ←
            </button>
            <span className="nav-count">
              {current + 1} / {products.length}
            </span>
            <button aria-label="下一張" className="nav-btn" onClick={next}>
              →
            </button>
          </div>
        </div>
        <div className="showcase-image">
          <Image
            alt={product.title}
            fill
            key={product.id}
            sizes="(max-width: 768px) 100vw, 55vw"
            src={product.image}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}

export default styled(ProductCarousel)`
  ${style}
`;
