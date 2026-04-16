import styled from 'styled-components';

import Shimmer from '@/components/Shimmer';

import style from './style';

function BannerSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Shimmer />
    </div>
  );
}

export default styled(BannerSkeleton)`
  ${style}
`;
