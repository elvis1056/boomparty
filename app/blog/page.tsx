import type { Metadata } from 'next';
import { Suspense } from 'react';

import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: '分享紀錄',
  description: '蹦娛樂 BoomParty 部落格，分享紀錄。',
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center' }}>載入中...</div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
