import styled from 'styled-components';

import BannerCarousel from '@/app/(home)/HomeContent/BannerCarousel';
import { bannerImages } from '@/constants/bannerImages';

import style from './style';

interface BannerProps {
  className?: string;
}

const Banner = ({ className }: BannerProps) => {
  return (
    <div className={`shop-banner ${className}`}>
      <BannerCarousel
        autoplayDelay={4000}
        content={{
          title: '商店',
          subtitle: '馬年送祝福，事事都飛躍。',
          actions: [{ text: '洽詢專員', href: '#' }],
        }}
        images={bannerImages}
        showOverlay={true}
      />
    </div>
  );
};

export default styled(Banner)`
  ${style}
`;
