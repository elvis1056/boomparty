'use client';

import styled from 'styled-components';

import { assetPath } from '@/lib/utils/asset-path';

import style from './style';

interface PersonalInfoProps {
  className?: string;
}

function PersonalInfo({ className }: PersonalInfoProps) {
  return (
    <section className={className}>
      <div
        className="personal-bg"
        style={{
          backgroundImage: `url(${assetPath('/images/about/background.jpeg')})`,
        }}
      />
      <div className="personal-section-wrapper">
        <div className="personal-spacer" />
        <div className="personal-main">
          <div className="personal-left">
            <div className="personal-description">
              <h1>Elvis Lin 大鈞</h1>
              <h4>A little bit about me</h4>
              <ul>
                <li>
                  <ul className="personal-description-text-block">
                    <li>
                      <b>NAME</b>
                    </li>
                    <li>{"I'M ELVIS LIN"}</li>
                  </ul>
                </li>
                <li>
                  <ul className="personal-description-text-block">
                    <li>
                      <b>PHONE </b>
                    </li>
                    <li>+886 975 371 151</li>
                  </ul>
                </li>
                <li>
                  <ul className="personal-description-text-block">
                    <li>
                      <b>E-MAIL </b>
                    </li>
                    <li>
                      <a href="mailto:john800116@gmail.com">
                        john800116@gmail.com
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="personal-right">
            <div className="personal-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Elvis Lin"
                src={assetPath('/images/about/background.jpeg')}
              />
            </div>
          </div>
        </div>
        <div className="personal-spacer" />
      </div>
    </section>
  );
}

export default styled(PersonalInfo)`
  ${style}
`;
