'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import style from './style';

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceImage {
  src: string;
  alt: string;
}

interface ServicePageContentProps {
  title: string;
  subtitle: string;
  description: string[];
  services: ServiceItem[];
  images?: ServiceImage[];
  bookingHref?: string;
  shopHref?: string;
  className?: string;
}

function ServicePageContent({
  className,
  title,
  subtitle,
  description,
  services,
  images = [],
  bookingHref = '/booking',
  shopHref = '/shop',
}: ServicePageContentProps) {
  const featuredImage = images[0];
  const galleryImages = images.slice(1);

  return (
    <div className={className}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          <div className="hero-actions">
            <Link className="btn-primary" href={bookingHref}>
              立即預約
            </Link>
            <Link className="btn-outline light" href={shopHref}>
              瀏覽商品
            </Link>
          </div>
        </div>
      </section>

      {/* 情境描述 */}
      <section className="description-section">
        <div className="container">
          <div className="description-layout">
            <div className="description-text">
              <h2 className="section-title">關於此服務</h2>
              {description.map((paragraph, index) => (
                <p className="description-body" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            {featuredImage ? (
              <div className="description-image">
                <Image
                  alt={featuredImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={featuredImage.src}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div className="description-image-placeholder">
                <span>案例照片補充中</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 服務項目 */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title centered">服務項目</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">🎈</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 案例圖片 */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title centered">作品案例</h2>
          <div className="gallery-grid">
            {galleryImages.length > 0
              ? galleryImages.map((image, index) => (
                  <div className="gallery-item" key={index}>
                    <Image
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      src={image.src}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))
              : [1, 2, 3].map((i) => (
                  <div className="gallery-placeholder" key={i}>
                    <span>照片即將上架</span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">準備好了嗎？</h2>
          <p className="cta-subtitle">讓蹦娛樂為你打造專屬的氣球佈置</p>
          <div className="cta-actions">
            <Link className="btn-primary" href={bookingHref}>
              立即預約諮詢
            </Link>
            <Link className="btn-outline light" href={shopHref}>
              瀏覽商品
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default styled(ServicePageContent)`
  ${style}
`;
