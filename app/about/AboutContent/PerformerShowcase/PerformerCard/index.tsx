'use client';

import Image from 'next/image';
import styled from 'styled-components';

import type { Performer } from '@/types';

import style from './style';

interface PerformerCardProps {
  performer: Performer;
  className?: string;
}

function PerformerCard({ performer, className }: PerformerCardProps) {
  return (
    <div className={className}>
      <div className="card-content">
        <div className="card-inner">
          <figure className="card-image">
            <Image
              alt={`${performer.name} - ${performer.category}`}
              fill
              sizes="(max-width: 768px) 168px, 200px"
              src={performer.image}
            />
          </figure>
          <div className="card-info">
            <div className="info-header">
              <div className="name-section">
                <p className="performer-name">{performer.name}</p>
                <p className="performer-category">{performer.category}</p>
              </div>
              <svg
                aria-hidden="true"
                className="arrow-icon"
                fill="none"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.75L20.25 12L14 18.25M19.5 12H3.75"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <p className="performer-description">{performer.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(PerformerCard)`
  ${style}
`;
