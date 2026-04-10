import type { Metadata } from 'next';

import ServicePageContent from '@/features/service/ServicePageContent';

export const metadata: Metadata = {
  title: '婚禮氣球佈置｜台北婚禮活動公關 蹦娛樂 BoomParty',
  description:
    '蹦娛樂 BoomParty 提供婚禮氣球佈置、婚禮背板設計、氣球拱門客製化，融合活動公關專業，打造高質感婚禮現場，全台服務，歡迎諮詢報價。',
  keywords: [
    '婚禮氣球佈置',
    '婚禮活動公關',
    '台灣婚禮佈置',
    '婚禮背板',
    '氣球拱門',
    '客製化婚禮',
  ],
  openGraph: {
    title: '婚禮氣球佈置｜台北婚禮活動公關 蹦娛樂 BoomParty',
    description:
      '蹦娛樂 BoomParty 提供婚禮氣球佈置、婚禮背板設計、氣球拱門客製化，融合活動公關專業，打造高質感婚禮現場，全台服務，歡迎諮詢報價。',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '婚禮氣球佈置',
  description:
    '蹦娛樂 BoomParty 提供婚禮氣球佈置、婚禮背板設計、氣球拱門客製化，融合活動公關專業，打造高質感婚禮現場。',
  provider: {
    '@type': 'Organization',
    name: '蹦娛樂 BoomParty',
    url: 'https://boomparty.tw',
  },
  areaServed: '台灣',
};

const services = [
  {
    title: '婚禮氣球背板',
    description: '客製化婚禮主視覺背板，結合花卉與氣球，打造浪漫儀式感。',
  },
  {
    title: '氣球拱門',
    description: '迎賓入口氣球拱門，色系依婚禮主題訂製，讓賓客留下深刻印象。',
  },
  {
    title: '桌面氣球佈置',
    description: '婚宴桌面氣球花束，與整體風格呼應，細節決定婚禮質感。',
  },
  {
    title: '手持空飄氣球',
    description: '手持空飄氣球拍照道具，為婚禮添加童趣與活潑感。',
  },
  {
    title: '活動公關統籌',
    description: '整合氣球佈置與活動流程，讓婚禮現場運作順暢無虞。',
  },
];

export default function WeddingServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ServicePageContent
        description={[
          '婚禮是一生一次的場景，氣球佈置決定了賓客進場的第一印象。',
          '蹦娛樂以活動公關視角切入婚禮現場，從婚禮背板、氣球拱門到空飄氣球道具，完整規劃每一個拍照焦點。服務過台北、新北、桃園百場婚禮，了解新人預算壓力，提供彈性套餐搭配。',
          '讓有限預算創造最大視覺效果，歡迎諮詢客製方案。',
        ]}
        images={[
          {
            src: '/images/service-picture/wedding-balloon.jpg',
            alt: '婚禮手持空飄氣球佈置',
          },
          {
            src: '/images/service-picture/wedding-table.jpg',
            alt: '婚禮禮桌區氣球佈置',
          },
        ]}
        services={services}
        subtitle="為你們的幸福時刻，打造最美的氣球佈置"
        title="婚禮氣球佈置｜台灣專業婚禮活動公關"
      />
    </>
  );
}
