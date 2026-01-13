'use client';

import styled from 'styled-components';

import style from './style';

interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer className={className}>
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-row">
            <span className="footer-company">蹦娛樂活動整合行銷有限公司</span>
            <span className="footer-separator">|</span>
            <span>版權所有 © {new Date().getFullYear()}</span>
          </div>
          <div className="footer-row">
            <span>營業時間：08:00 - 18:00</span>
          </div>
          <div className="footer-row">
            <span>統編：90576223</span>
            <span className="footer-separator">|</span>
            <span>地址：新北市新店區平等街50號1樓</span>
          </div>
          <div className="footer-row footer-contacts">
            <span>聯絡人：林琨翔 0918-868-602</span>
            <span className="footer-separator">|</span>
            <span>林大鈞 0975-371-151</span>
            <span className="footer-separator">|</span>
            <span>吳振宇 0952-669-005</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';

export default styled(Footer)`
  ${style}
`;
