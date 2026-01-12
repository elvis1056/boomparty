'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import type { BannerContent, BannerImage } from '@/types/banner';

import style from './style';

interface MobileBannerProps {
  images: BannerImage[];
  content?: BannerContent;
  showOverlay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

function MobileBanner({
  images,
  content,
  showOverlay = false,
  autoplayDelay = 4000,
  className,
}: MobileBannerProps) {
  return (
    <div className={className}>
      {/* Title 區塊（圖片上方） */}
      {content && (content.title || content.subtitle) && (
        <div className="mobile-banner-title">
          {content.title && <h2 className="banner-title">{content.title}</h2>}
          {content.subtitle && (
            <h1 className="banner-subtitle">{content.subtitle}</h1>
          )}
        </div>
      )}

      {/* 圖片輪播區 */}
      <div className="mobile-banner-image">
        <Swiper
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          className="banner-swiper"
          loop={true}
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          spaceBetween={0}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="banner-slide">
                <Image
                  alt={image.alt}
                  className="banner-image"
                  fill
                  priority={image.id === 1}
                  src={image.src}
                  style={{ objectFit: showOverlay ? 'cover' : 'contain' }}
                />
                {showOverlay && <div className="banner-overlay" />}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Actions 區塊（圖片下方） */}
      {content && content.actions && content.actions.length > 0 && (
        <div className="mobile-banner-actions">
          {content.actions.map((action, index) => (
            <a
              className="banner-link"
              href={action.href}
              key={index}
              rel="noopener noreferrer"
              target="_blank"
            >
              {action.text}
              <span className="icon-external">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

MobileBanner.displayName = 'MobileBanner';

export default styled(MobileBanner)`
  ${style}
`;
