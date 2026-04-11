import type { Metadata } from 'next';
import { Suspense } from 'react';

import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: '蹦娛樂 BoomParty | 台灣專業氣球佈置品牌',
  description:
    '蹦娛樂 BoomParty，台灣專業氣球佈置品牌。生日、婚禮、求婚、開幕等各式場合氣球佈置服務，提供造型氣球、空飄充氣、客製印刷一站式解決方案。',
  alternates: {
    canonical: 'https://boomparty.tw',
  },
};

export default function HomePage() {
  return (
    <>
      <link
        as="image"
        href="/images/service-picture/wedding-balloon.jpg"
        rel="preload"
      />
      <link
        as="image"
        href="/images/service-picture/birthday-party-columns.jpg"
        rel="preload"
      />
      <link
        as="image"
        href="/images/service-picture/corporate-gamania.jpg"
        rel="preload"
      />
      <link
        as="image"
        href="/images/service-picture/proposal-room.jpg"
        rel="preload"
      />
      <Suspense
        fallback={
          <div style={{ padding: '2rem', textAlign: 'center' }}>載入中...</div>
        }
      >
        <HomeContent />
      </Suspense>
    </>
  );
}
