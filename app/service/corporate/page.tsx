import type { Metadata } from 'next';

import ServicePageContent from '@/features/service/ServicePageContent';

export const metadata: Metadata = {
  title: '企業活動公關｜開幕佈置 氣球 蹦娛樂 BoomParty',
  description:
    '蹦娛樂 BoomParty 專業企業活動公關服務，涵蓋開幕剪綵、尾牙活動策劃、企業氣球佈置、啟動儀式規劃，整合行銷一站包辦，台灣企業首選活動公關團隊。',
  keywords: [
    '企業活動公關',
    '開幕活動佈置',
    '台灣企業活動',
    '尾牙活動策劃',
    '開幕剪綵',
    '企業氣球佈置',
  ],
  openGraph: {
    title: '企業活動公關｜開幕佈置 氣球 蹦娛樂 BoomParty',
    description:
      '蹦娛樂 BoomParty 專業企業活動公關服務，涵蓋開幕剪綵、尾牙活動策劃、企業氣球佈置、啟動儀式規劃，整合行銷一站包辦，台灣企業首選活動公關團隊。',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '企業活動公關',
  description:
    '蹦娛樂 BoomParty 專業企業活動公關服務，涵蓋開幕剪綵、尾牙活動策劃、企業氣球佈置、啟動儀式規劃，整合行銷一站包辦。',
  provider: {
    '@type': 'Organization',
    name: '蹦娛樂 BoomParty',
    url: 'https://boomparty.tw',
  },
  areaServed: '台灣',
};

const services = [
  {
    title: '開幕剪綵活動企劃',
    description: '開幕典禮全程統籌，氣球拱門、剪綵道具、現場佈置一手包辦。',
  },
  {
    title: '企業尾牙活動策劃',
    description: '尾牙春酒氛圍佈置，搭配品牌主色設計，展現企業形象。',
  },
  {
    title: '啟動儀式佈置規劃',
    description: '產品發布、啟動球等儀式道具規劃，為品牌重要時刻加分。',
  },
  {
    title: '企業氣球背板設計',
    description: '融入企業 LOGO 與品牌色的客製化背板，適合記者會與媒體拍攝。',
  },
  {
    title: '活動整合行銷統籌',
    description: '整合場佈、流程、道具，讓企業活動順暢進行，留下完美紀錄。',
  },
];

export default function CorporateServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ServicePageContent
        description={[
          '開幕是品牌最重要的公關時刻，第一印象決定市場認知。',
          '蹦娛樂融合活動企劃與氣球佈置專業，為台灣企業提供開幕剪綵、尾牙春酒、產品發布會一站式活動公關服務。從現場佈置規劃、媒體拍攝背板到啟動儀式道具，統一整合執行。',
          '讓品牌在每個關鍵活動留下專業形象，吸引媒體曝光與客戶信任。',
        ]}
        images={[
          {
            src: '/images/service-picture/corporate-gamania.jpg',
            alt: 'Gamania 企業活動會場氣球佈置',
          },
          {
            src: '/images/service-picture/corporate-nccu.jpg',
            alt: '國立政治大學20週年活動氣球佈置',
          },
        ]}
        services={services}
        subtitle="專業活動公關，為企業品牌每個重要時刻加分"
        title="企業活動公關｜開幕佈置 尾牙活動策劃"
      />
    </>
  );
}
