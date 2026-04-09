import type { Metadata } from 'next';
import Link from 'next/link';

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

export default function CorporateServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <main>
        <section>
          <h1>企業活動公關｜開幕佈置 尾牙活動策劃</h1>
          <p>
            {/* TODO: 補充企業活動情境描述，建議 100-150 字，自然帶入：企業活動公關、開幕剪綵、尾牙、氣球佈置、整合行銷 */}
          </p>
        </section>

        <section>
          <h2>企業活動服務項目</h2>
          <ul>
            <li>開幕剪綵活動企劃</li>
            <li>企業尾牙活動策劃</li>
            <li>啟動儀式佈置規劃</li>
            <li>企業氣球背板設計</li>
            <li>活動整合行銷統籌</li>
          </ul>
        </section>

        <section>
          <h2>企業活動案例</h2>
          {/* TODO: 放入企業活動案例圖片，可參考 /images/shop/企業商用/ 目錄下的圖片 */}
        </section>

        <section>
          <Link href="/booking">立即預約企業活動諮詢</Link>
          <Link href="/shop">瀏覽企業佈置商品</Link>
        </section>
      </main>
    </>
  );
}
