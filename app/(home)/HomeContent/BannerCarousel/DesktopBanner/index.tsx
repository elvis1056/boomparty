'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import type { BannerContent, BannerImage } from '@/types/banner';

import style from './style';

interface DesktopBannerProps {
  images: BannerImage[];
  content?: BannerContent;
  showOverlay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

function DesktopBanner({
  images,
  content,
  showOverlay = false,
  autoplayDelay = 4000,
  className,
}: DesktopBannerProps) {
  return (
    <div className={className}>
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
              <div className="banner-image-wrapper">
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

              {content && (
                <div className="banner-content">
                  <div className="banner-row">
                    {content.title && (
                      <div className="banner-left">
                        <h2 className="banner-main-title">{content.title}</h2>
                      </div>
                    )}
                    {(content.subtitle || content.actions) && (
                      <div className="banner-right">
                        {content.subtitle && (
                          <h1 className="banner-subtitle">
                            {content.subtitle}
                          </h1>
                        )}
                        {content.actions && content.actions.length > 0 && (
                          <div className="banner-actions">
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
                    )}
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

DesktopBanner.displayName = 'DesktopBanner';

export default styled(DesktopBanner)`
  ${style}
`;
