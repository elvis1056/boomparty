import type { Metadata } from 'next';

import ServicePageContent from '@/features/service/ServicePageContent';

export const metadata: Metadata = {
  title: '求婚佈置｜告白氣球 台北 蹦娛樂 BoomParty',
  description:
    '打造屬於你們的極致浪漫，蹦娛樂 BoomParty 提供求婚氣球佈置、告白驚喜設計、後車廂佈置、飯店包廂佈置，客製化求婚方案，讓告白成為永恆的回憶。',
  keywords: [
    '求婚佈置',
    '告白氣球',
    '台北求婚佈置',
    '求婚驚喜',
    '後車廂佈置',
    '飯店求婚佈置',
  ],
  openGraph: {
    title: '求婚佈置｜告白氣球 台北 蹦娛樂 BoomParty',
    description:
      '打造屬於你們的極致浪漫，蹦娛樂 BoomParty 提供求婚氣球佈置、告白驚喜設計、後車廂佈置、飯店包廂佈置，客製化求婚方案，讓告白成為永恆的回憶。',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '求婚佈置',
  description:
    '蹦娛樂 BoomParty 提供求婚氣球佈置、告白驚喜設計、後車廂佈置、飯店包廂佈置，客製化求婚方案，讓告白成為永恆的回憶。',
  provider: {
    '@type': 'Organization',
    name: '蹦娛樂 BoomParty',
    url: 'https://boomparty.tw',
  },
  areaServed: '台灣',
};

const services = [
  {
    title: '客製化求婚氣球佈置',
    description: '依求婚場景量身設計，玫瑰紅、香檳金、純白等色系任你選配。',
  },
  {
    title: '飯店包廂驚喜佈置',
    description: '事先進場佈置，讓另一半推開門的瞬間，成為最難忘的畫面。',
  },
  {
    title: '後車廂告白佈置',
    description: '浪漫後車廂氣球佈置，簡單卻令人心動的告白方式。',
  },
  {
    title: '戶外求婚場景設計',
    description: '公園、天台、海邊等戶外場地，打造夢幻求婚佈置。',
  },
  {
    title: '客製化文字氣球',
    description: '「嫁給我好嗎」、名字縮寫等文字氣球，說出你最想說的話。',
  },
];

export default function ProposalServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ServicePageContent
        description={[
          '求婚只有一次，你值得一個不留遺憾的浪漫瞬間。',
          '蹦娛樂專注求婚佈置多年，從飯店包廂驚喜佈置、後車廂告白場景到戶外求婚氣球造型，每個方案保密規劃、準時到場。',
          '我們了解求婚的緊張與期待，提供完整諮詢陪你設計那一刻，讓對方推開門的瞬間，成為你們一生最美的記憶。',
        ]}
        images={[
          {
            src: '/images/service-picture/proposal-room.jpg',
            alt: '房間求婚驚喜氣球佈置',
          },
        ]}
        services={services}
        subtitle="用最浪漫的氣球佈置，說出你的心意"
        title="求婚佈置｜客製化告白驚喜氣球"
      />
    </>
  );
}
