import { Suspense } from 'react';

import HomeContent from './HomeContent';

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
