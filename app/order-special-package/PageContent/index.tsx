'use client';

import styled from 'styled-components';

import style from './style';

interface PageContentProps {
  className?: string;
  children: React.ReactNode;
}

function PageContent({ className, children }: PageContentProps) {
  return (
    <main className={className}>
      <div className="page-header">
        <h1 className="page-title">快速訂購方案</h1>
        <p className="page-subtitle">
          選擇你喜歡的造型與數量，複製文案後前往 IG 私訊完成訂購
        </p>
      </div>
      {children}
    </main>
  );
}

export default styled(PageContent)`
  ${style}
`;
