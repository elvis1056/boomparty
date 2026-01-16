'use client';

import styled from 'styled-components';

import PerformerShowcase from './PerformerShowcase';
import PersonalInfo from './PersonalInfo';
import style from './style';

interface AboutContentProps {
  className?: string;
}

function AboutContent({ className }: AboutContentProps) {
  return (
    <main className={className}>
      <PerformerShowcase />
      <PersonalInfo />
    </main>
  );
}

export default styled(AboutContent)`
  ${style}
`;
