'use client';

import dynamic from 'next/dynamic';

import { theme } from '@/constants/theme';
import { useMediaQuery } from '@/hooks';
import type { BannerContent, BannerImage } from '@/types/banner';

// Dynamic import for code splitting (static export compatible)
const DesktopBanner = dynamic(
  () => import('@/app/(home)/HomeContent/BannerCarousel/DesktopBanner')
);

const MobileBanner = dynamic(
  () => import('@/app/(home)/HomeContent/BannerCarousel/MobileBanner')
);

interface BannerCarouselProps {
  images: BannerImage[];
  content?: BannerContent;
  showOverlay?: boolean;
  autoplayDelay?: number;
}

export default function BannerCarousel({
  images,
  content,
  showOverlay = false,
  autoplayDelay = 4000,
}: BannerCarouselProps) {
  // For static export: use initializeWithValue: false to avoid hydration mismatch
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.tablet})`, {
    initializeWithValue: false,
  });

  return isMobile ? (
    <MobileBanner
      autoplayDelay={autoplayDelay}
      content={content}
      images={images}
      showOverlay={showOverlay}
    />
  ) : (
    <DesktopBanner
      autoplayDelay={autoplayDelay}
      content={content}
      images={images}
      showOverlay={showOverlay}
    />
  );
}
