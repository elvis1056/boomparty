import type { Metadata } from 'next';

import ServicePageContent from '@/features/service/ServicePageContent';

export const metadata: Metadata = {
  title: '生日氣球佈置｜派對佈置專業團隊 蹦娛樂 BoomParty',
  description:
    '讓生日派對留下最美的照片，蹦娛樂 BoomParty 提供生日氣球佈置、主題派對設計、到府專人佈置，台北及全台服務，一鍵預約輕鬆完成。',
  keywords: [
    '生日氣球佈置',
    '生日派對佈置',
    '台北生日佈置',
    '主題派對',
    '到府佈置',
    '派對氣球',
  ],
  openGraph: {
    title: '生日氣球佈置｜派對佈置專業團隊 蹦娛樂 BoomParty',
    description:
      '讓生日派對留下最美的照片，蹦娛樂 BoomParty 提供生日氣球佈置、主題派對設計、到府專人佈置，台北及全台服務，一鍵預約輕鬆完成。',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '生日氣球佈置',
  description:
    '蹦娛樂 BoomParty 提供生日氣球佈置、主題派對設計、到府專人佈置，讓生日派對留下最美的照片。',
  provider: {
    '@type': 'Organization',
    name: '蹦娛樂 BoomParty',
    url: 'https://boomparty.tw',
  },
  areaServed: '台灣',
};

const services = [
  {
    title: '主題氣球佈置設計',
    description: '依派對主題設計配色與造型，從童話風到韓系簡約，一應俱全。',
  },
  {
    title: '生日背板氣球造型',
    description: '客製化生日主視覺背板，可加入姓名、年齡、主題角色等元素。',
  },
  {
    title: '到府專人佈置服務',
    description: '專業團隊到場佈置，準時完成，讓你專心當壽星。',
  },
  {
    title: '抓周周歲佈置',
    description: '抓周專屬佈置，可愛風格搭配名字客製，記錄寶寶成長里程碑。',
  },
  {
    title: '性別揭曉派對佈置',
    description: '粉藍主題氣球驚喜佈置，和家人朋友一起迎接新生命的到來。',
  },
];

export default function BirthdayServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ServicePageContent
        description={[
          '一個充滿驚喜的生日派對，從佈置開始。',
          '蹦娛樂提供台北到府生日氣球佈置，從主題背板、氣球柱到抓周專屬場景，依主角量身打造。無論是兒童生日、成人派對或周歲抓周，兩小時內完成現場佈置，讓你輕鬆當主人。',
          '壽星一進門就驚喜滿溢，有照片有回憶，這才是生日派對的意義。',
        ]}
        images={[
          {
            src: '/images/service-picture/birthday-party-columns.jpg',
            alt: '生日派對不規則氣球柱與背板佈置',
          },
          {
            src: '/images/service-picture/birthday-party-cafe.jpg',
            alt: '咖啡廳生日派對氣球佈置',
          },
          {
            src: '/images/service-picture/birthday-zhuazhou.jpg',
            alt: '周歲生日抓周氣球佈置',
          },
          {
            src: '/images/service-picture/birthday-kids-entrance.jpg',
            alt: '親子館生日派對入口氣球佈置',
          },
        ]}
        services={services}
        subtitle="讓每個生日都成為難忘的慶典"
        title="生日氣球佈置｜主題派對專業團隊"
      />
    </>
  );
}
