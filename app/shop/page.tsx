import type { Metadata } from 'next';
import { Suspense } from 'react';

import ShopContent from './ShopContent';

export const metadata: Metadata = {
  title: '氣球佈置商品',
  description:
    '瀏覽蹦娛樂 BoomParty 全系列氣球佈置商品，造型氣球、空飄氣球、婚禮求婚生日佈置一站購足。',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center' }}>載入中...</div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
