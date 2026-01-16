'use client';

import styled from 'styled-components';

import PerformerCard from '@/app/about/AboutContent/PerformerShowcase/PerformerCard';
import { mockPerformers } from '@/constants/mockPerformers';

import style from './style';

interface PerformerShowcaseProps {
  className?: string;
}

function PerformerShowcase({ className }: PerformerShowcaseProps) {
  return (
    <section className={className}>
      <div className="showcase-container">
        <header className="showcase-header">
          <h2 className="showcase-title">
            我們的<span className="title-highlight">專業表演者</span>
          </h2>
          <p className="showcase-description">
            經驗豐富的表演團隊，為您的活動帶來精彩表演與歡樂氣氛
          </p>
        </header>

        <div className="performers-scroll-wrapper">
          <div className="performers-list">
            {mockPerformers.map((performer) => (
              <PerformerCard key={performer.id} performer={performer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default styled(PerformerShowcase)`
  ${style}
`;
