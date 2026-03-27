import type { Metadata } from 'next';
import { Suspense } from 'react';

import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Elvis | 工程師 · Next.js & Spring Boot',
  description:
    '嗨，我是 Elvis，軟體工程師，專注於 Next.js 前端開發與 Spring Boot 後端架構。這裡展示我的個人作品、UI 元件與技術履歷。',
  alternates: {
    canonical: 'https://boomparty.tw',
  },
};

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center' }}>載入中...</div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
