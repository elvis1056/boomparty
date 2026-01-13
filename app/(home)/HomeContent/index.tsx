'use client';

import styled from 'styled-components';

import BannerCarousel from '@/app/(home)/HomeContent/BannerCarousel';
import ProductCarousel from '@/app/home/ProductCarousel';
import { bannerImages } from '@/constants/bannerImages';
import { assetPath } from '@/lib/utils/asset-path';

import style from './style';

// 精選活動案例
const sampleProducts = [
  {
    id: '1',
    title: '頂新集團餐飲事業群',
    image: '/images/banner/1070129頂新集團餐飲事業群經營策略會議6.jpg',
    subtitle: '經營策略會議佈置',
    tags: ['企業活動', '會議佈置'],
    href: '/shop',
  },
  {
    id: '2',
    title: '兆豐國際商銀',
    image: '/images/banner/1070130兆豐國際商銀尾牙1.jpg',
    subtitle: '年度尾牙活動',
    tags: ['尾牙', '企業活動'],
    href: '/shop',
  },
  {
    id: '3',
    title: 'Guerlain 嬌蘭',
    image: '/images/banner/1070207 Guerlain 嬌蘭尾牙3.jpg',
    subtitle: '精品品牌尾牙佈置',
    tags: ['尾牙', '精品活動'],
    href: '/shop',
  },
  {
    id: '4',
    title: 'PIXNET 痞客幫',
    image: '/images/banner/1070210 PIXNET痞客幫尾牙1.jpg',
    subtitle: '科技公司尾牙',
    tags: ['尾牙', '企業活動'],
    href: '/shop',
  },
  {
    id: '5',
    title: '浪漫求婚',
    image: '/images/banner/1070704 求婚佈置 1.jpg',
    subtitle: '求婚現場佈置',
    tags: ['求婚', '浪漫佈置'],
    href: '/shop',
  },
  {
    id: '6',
    title: '溫馨婚禮',
    image: '/images/banner/1070616新店優美勝地婚禮1.jpg',
    subtitle: '新店優美勝地婚禮',
    tags: ['婚禮', '婚宴佈置'],
    href: '/shop',
  },
];

function HomeContent({ className }: { className?: string }) {
  return (
    <main className={className}>
      <div className="home-banner">
        <BannerCarousel
          content={{
            title: '活動',
            subtitle: '為特別時刻，增添繽紛色彩',
            actions: [
              { text: '探索商品', href: `${assetPath('/shop')}` },
              // { text: '查看案例', href: '#' },
            ],
          }}
          images={bannerImages}
          showOverlay={true}
        />
      </div>
      <ProductCarousel products={sampleProducts} />
    </main>
  );
}

export default styled(HomeContent)`
  ${style}
`;
