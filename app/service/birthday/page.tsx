import type { Metadata } from 'next';
import Link from 'next/link';

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

export default function BirthdayServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <main>
        <section>
          <h1>生日氣球佈置｜主題派對專業團隊</h1>
          <p>
            {/* TODO: 補充生日派對情境描述，建議 100-150 字，自然帶入：生日氣球佈置、主題派對、到府佈置、台北、氛圍感 */}
          </p>
        </section>

        <section>
          <h2>生日派對服務項目</h2>
          <ul>
            <li>主題氣球佈置設計</li>
            <li>生日背板氣球造型</li>
            <li>到府專人佈置服務</li>
            <li>空飄氣球外送</li>
            <li>性別揭曉派對佈置</li>
          </ul>
        </section>

        <section>
          <h2>生日佈置作品案例</h2>
          {/* TODO: 放入生日佈置案例圖片，可參考 /images/shop/ 目錄下的童話系、花朵系圖片 */}
        </section>

        <section>
          <Link href="/booking">立即預約生日佈置</Link>
          <Link href="/shop">瀏覽生日佈置商品</Link>
        </section>
      </main>
    </>
  );
}
