import type { Metadata } from 'next';
import Link from 'next/link';

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

export default function WeddingServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <main>
        <section>
          <h1>婚禮氣球佈置｜台灣專業婚禮活動公關</h1>
          <p>
            {/* TODO: 補充婚禮佈置情境描述，建議 100-150 字，自然帶入：婚禮氣球佈置、婚禮背板、氣球拱門、客製化、台灣婚禮 */}
          </p>
        </section>

        <section>
          <h2>婚禮佈置服務項目</h2>
          <ul>
            <li>婚禮氣球背板設計</li>
            <li>氣球拱門客製化</li>
            <li>婚禮現場整體佈置</li>
            <li>迎賓區氣球造型</li>
            <li>婚禮活動公關統籌</li>
          </ul>
        </section>

        <section>
          <h2>婚禮佈置作品案例</h2>
          {/* TODO: 放入婚禮佈置案例圖片，可參考 /images/shop/ 目錄下的背板佈置、氣球拱門圖片 */}
        </section>

        <section>
          <Link href="/booking">立即預約婚禮諮詢</Link>
          <Link href="/shop">瀏覽婚禮佈置商品</Link>
        </section>
      </main>
    </>
  );
}
