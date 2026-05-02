'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import Shimmer from '@/components/Shimmer';
import { BALLOON_SHAPES, BalloonShape } from '@/constants/balloonShapes';

import style from './style';

function ShapeImage({ shape }: { shape: BalloonShape }) {
  if (!shape || shape.image === null) return <Shimmer />;

  return (
    <Image
      alt={shape.name}
      fill
      sizes="(max-width: 768px) 100px, 120px"
      src={shape.image}
      style={{ objectFit: 'cover' }}
    />
  );
}

function BalloonOrderCta({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="inner">
        <div className="header-row">
          <div className="header-left">
            <p className="eyebrow">快速訂購方案</p>
            <h2 className="title">造型氣球 · 送禮新方式</h2>
            <p className="subtitle">生日 · 公司 · 學校 · 畢業 · 情人節</p>
          </div>
          <Link className="cta-link" href="/order-special-package">
            立即訂購 →
          </Link>
        </div>

        <div className="shapes-row">
          {BALLOON_SHAPES.map((shape) => (
            <Link
              className="shape-item"
              href="/order-special-package"
              key={shape.id}
            >
              <div className="shape-image-wrapper">
                <ShapeImage shape={shape} />
              </div>
              <span className="shape-name">{shape.name}</span>
              <span className="shape-price">${shape.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default styled(BalloonOrderCta)`
  ${style}
`;
