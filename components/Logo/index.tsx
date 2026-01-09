'use client';

import Image from 'next/image';

import { assetPath } from '@/lib/utils/asset-path';

import { LogoWrapper } from './style';

export function Logo() {
  return (
    <LogoWrapper>
      <div className="logo-wrapper">
        <div className="desktop-logo">
          <Image
            alt="BoomParty Logo"
            height={60}
            src={assetPath('/boomparty-logo.jpg')}
            width={60}
          />
        </div>
        <div className="mobile-logo">
          <Image
            alt="BoomParty Logo"
            height={40}
            src={assetPath('/boomparty-logo.jpg')}
            width={40}
          />
        </div>
      </div>
    </LogoWrapper>
  );
}
