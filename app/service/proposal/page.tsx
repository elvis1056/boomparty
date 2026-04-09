import type { Metadata } from 'next';
import Link from 'next/link';

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

export default function ProposalServicePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <main>
        <section>
          <h1>求婚佈置｜客製化告白驚喜氣球</h1>
          <p>
            {/* TODO: 補充求婚告白情境描述，建議 100-150 字，自然帶入：求婚佈置、告白氣球、後車廂、飯店包廂、極致浪漫、客製化 */}
          </p>
        </section>

        <section>
          <h2>求婚佈置服務項目</h2>
          <ul>
            <li>客製化求婚氣球佈置</li>
            <li>飯店包廂驚喜佈置</li>
            <li>後車廂告白佈置</li>
            <li>戶外求婚場景設計</li>
            <li>空飄氣球告白造型</li>
          </ul>
        </section>

        <section>
          <h2>求婚佈置作品案例</h2>
          {/* TODO: 放入求婚佈置案例圖片 */}
        </section>

        <section>
          <Link href="/booking">立即預約求婚諮詢</Link>
          <Link href="/shop">瀏覽求婚佈置商品</Link>
        </section>
      </main>
    </>
  );
}
