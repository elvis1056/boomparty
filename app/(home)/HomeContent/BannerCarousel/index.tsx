'use client';

import dynamic from 'next/dynamic';

import { theme } from '@/constants/theme';
import { useMediaQuery } from '@/hooks';
import type { BannerContent, BannerImage } from '@/types/banner';

import BannerSkeleton from './BannerSkeleton';

const DesktopBanner = dynamic(
  () => import('@/app/(home)/HomeContent/BannerCarousel/DesktopBanner'),
  { ssr: false, loading: () => <BannerSkeleton /> }
);

const MobileBanner = dynamic(
  () => import('@/app/(home)/HomeContent/BannerCarousel/MobileBanner'),
  { ssr: false, loading: () => <BannerSkeleton /> }
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
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.tablet})`);

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
