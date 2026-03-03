'use client';

import { useRef, useState } from 'react';
import styled from 'styled-components';

import { getBookingByReference } from '@/lib/api/booking';
import type { BookingApiResponse } from '@/types/booking';

import style from './style';

interface BookingStatusCheckProps {
  className?: string;
}

const STATUS_LABEL: Record<BookingApiResponse['status'], string> = {
  PENDING: '待確認',
  CONFIRMED: '已確認',
  CANCELLED: '已取消',
};

const STATUS_CLASS: Record<BookingApiResponse['status'], string> = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
};

function BookingStatusCheck({ className }: BookingStatusCheckProps) {
  const inputRef = useRef('');
  const [result, setResult] = useState<BookingApiResponse | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  };

  const searchBooking = async () => {
    const ref = inputRef.current.trim();
    if (!ref) return;

    setIsLoading(true);
    setResult(null);
    setIsNotFound(false);

    try {
      const data = await getBookingByReference(ref);
      setResult(data);
    } catch {
      setIsNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="status-container">
        <div className="header">
          <h2>查詢預約狀態</h2>
          <p>請輸入您的預約編號進行查詢</p>
        </div>

        <div className="search-form">
          <input
            defaultValue=""
            onChange={(e) => {
              inputRef.current = e.target.value;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') searchBooking();
            }}
            placeholder="例：BP-12345678"
            type="text"
          />
          <button
            className="btn-search"
            disabled={isLoading}
            onClick={searchBooking}
          >
            {isLoading ? '查詢中...' : '查詢'}
          </button>
        </div>

        {result && (
          <div className="result-card">
            <div className="result-reference">
              <div className="label">預約編號</div>
              <div className="value">{result.bookingReference}</div>
            </div>

            <div className="result-status">
              <div className="label">目前狀態</div>
              <span className={`status-badge ${STATUS_CLASS[result.status]}`}>
                {STATUS_LABEL[result.status]}
              </span>
            </div>

            <div className="result-date">
              <div className="label">預約建立時間</div>
              <div className="value">{formatDate(result.createdAt)}</div>
            </div>
          </div>
        )}

        {isNotFound && (
          <div className="not-found">
            <p>查無此預約編號，請確認編號是否正確。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default styled(BookingStatusCheck)`
  ${style}
`;
