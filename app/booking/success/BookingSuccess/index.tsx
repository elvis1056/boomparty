'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

import { useBookingStore } from '@/stores/bookingStore';

import style from './style';

interface BookingSuccessProps {
  className?: string;
}

function BookingSuccess({ className }: BookingSuccessProps) {
  const router = useRouter();
  const { bookingReference, customerInfo, resetBooking } = useBookingStore();

  useEffect(() => {
    if (!bookingReference) {
      router.replace('/booking/service');
    }
  }, [bookingReference, router]);

  if (!bookingReference) return null;

  const reBook = () => {
    resetBooking();
    router.push('/booking/service');
  };

  return (
    <div className={className}>
      <div className="success-container">
        <div className="success-icon">
          <svg fill="none" height="80" viewBox="0 0 80 80" width="80">
            <circle cx="40" cy="40" fill="#00CED1" fillOpacity="0.1" r="40" />
            <circle cx="40" cy="40" fill="#00CED1" r="32" />
            <path
              d="M55 30L35 50L25 40"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
          </svg>
        </div>

        <h2>預約成功！</h2>

        <p className="success-message">
          我們已收到您的預約申請，專員將在 24 小時內與您聯繫確認細節。
        </p>

        <div className="booking-reference">
          <div className="reference-label">預約編號</div>
          <div className="reference-number">{bookingReference}</div>
        </div>

        <div className="success-info">
          <div className="info-item">
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
              <path
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                stroke="#00CED1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>確認信已寄送至 {customerInfo?.email}</span>
          </div>
          <div className="info-item">
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
              <path
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C7.82 21 2 15.18 2 8V7a2 2 0 012-2z"
                stroke="#00CED1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>專員將致電 {customerInfo?.phone} 確認</span>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn-home" onClick={() => router.push('/')}>
            回到首頁
          </button>
          <button className="btn-booking" onClick={reBook}>
            再次預約
          </button>
        </div>
      </div>
    </div>
  );
}

export default styled(BookingSuccess)`
  ${style}
`;
