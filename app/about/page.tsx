import type { Metadata } from 'next';

import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: '關於我們',
  description:
    '蹦娛樂 BoomParty 是台灣專業活動公關與氣球佈置團隊，提供婚禮、企業尾牙、生日派對、演唱會等各式活動整體規劃與執行。',
  keywords: ['活動公關', '活動策劃', '婚禮公關', '企業活動', '台灣活動公關'],
};

export default function AboutPage() {
  return <AboutContent />;
}
