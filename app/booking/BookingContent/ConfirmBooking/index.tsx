'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { PAYMENT_METHOD } from '@/constants/booking-constants';
import { useBookingStore } from '@/stores/bookingStore';

import style from './style';

interface ConfirmBookingProps {
  className?: string;
}

function ConfirmBooking({ className }: ConfirmBookingProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    selectedService,
    selectedPerformer,
    completionTime,
    performanceStart,
    performanceEnd,
    customerInfo,
    paymentMethod,
    totalPrice,
  } = useBookingStore();

  const hasTimeInfo =
    completionTime !== null ||
    (performanceStart !== null && performanceEnd !== null);
  const canConfirm =
    selectedService !== null &&
    hasTimeInfo &&
    customerInfo !== null &&
    paymentMethod !== null;

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const weekdays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 ${weekday}`;
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getPaymentMethodText = () => {
    if (paymentMethod === PAYMENT_METHOD.ONLINE) return '線上轉帳';
    if (paymentMethod === PAYMENT_METHOD.ONSITE) return '現場付現';
    return '-';
  };

  const confirmBooking = async () => {
    setIsSubmitting(true);

    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={className}>
        <div className="confirm-booking-container">
          <div className="success-card">
            <div className="success-icon">
              <svg fill="none" height="80" viewBox="0 0 80 80" width="80">
                <circle
                  cx="40"
                  cy="40"
                  fill="#00CED1"
                  fillOpacity="0.1"
                  r="40"
                />
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
              <div className="reference-number">
                BP-{new Date().getTime().toString().slice(-8)}
              </div>
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
              <button
                className="btn-booking"
                onClick={() => router.push('/booking/service')}
              >
                再次預約
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="confirm-booking-container">
        <div className="header">
          <h2>確認預約資訊</h2>
          <p>請確認以下預約資訊是否正確</p>
        </div>

        {/* 完整預約摘要 */}
        <div className="booking-details">
          {/* 服務項目 */}
          <div className="detail-section">
            <h3>
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                <rect
                  height="18"
                  rx="2"
                  stroke="#00CED1"
                  strokeWidth="2"
                  width="18"
                  x="3"
                  y="3"
                />
                <path
                  d="M9 11l3 3 5-5"
                  stroke="#00CED1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              服務項目
            </h3>
            <div className="service-list">
              {selectedService && (
                <div className="service-item">
                  <div className="service-name">{selectedService.name}</div>
                  <div className="service-info">
                    <span className="service-duration">
                      {selectedService.duration} 分鐘
                    </span>
                    <span className="service-price">
                      NT$ {selectedService.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 表演者資訊 */}
          {selectedPerformer && (
            <div className="detail-section">
              <h3>
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                  <path
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                    stroke="#00CED1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                表演者
              </h3>
              <div className="staff-info">
                <div className="staff-name">{selectedPerformer.name}</div>
                <div className="staff-title">{selectedPerformer.title}</div>
              </div>
            </div>
          )}

          {/* 時間資訊 */}
          <div className="detail-section">
            <h3>
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  stroke="#00CED1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              {selectedService?.bookingType === 'completion'
                ? '完成時間'
                : '表演時段'}
            </h3>
            <div className="datetime-info">
              {selectedService?.bookingType === 'completion' &&
                completionTime && (
                  <div className="datetime-value">
                    {formatDate(completionTime)} {formatTime(completionTime)}
                  </div>
                )}
              {selectedService?.bookingType === 'timeSlot' &&
                performanceStart &&
                performanceEnd && (
                  <div className="datetime-value">
                    {formatDate(performanceStart)}
                    <br />
                    {formatTime(performanceStart)} -{' '}
                    {formatTime(performanceEnd)}
                  </div>
                )}
            </div>
          </div>

          {/* 聯絡資訊 */}
          <div className="detail-section">
            <h3>
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke="#00CED1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              聯絡資訊
            </h3>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-label">姓名</span>
                <span className="contact-value">{customerInfo?.name}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">電話</span>
                <span className="contact-value">{customerInfo?.phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span className="contact-value">{customerInfo?.email}</span>
              </div>
              {customerInfo?.notes && (
                <div className="contact-item notes">
                  <span className="contact-label">備註</span>
                  <span className="contact-value">{customerInfo.notes}</span>
                </div>
              )}
            </div>
          </div>

          {/* 付款方式 */}
          <div className="detail-section">
            <h3>
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                <rect
                  height="14"
                  rx="2"
                  stroke="#00CED1"
                  strokeWidth="2"
                  width="20"
                  x="2"
                  y="5"
                />
                <path d="M2 10h20" stroke="#00CED1" strokeWidth="2" />
              </svg>
              付款方式
            </h3>
            <div className="payment-info">
              <div className="payment-method">{getPaymentMethodText()}</div>
              {paymentMethod === PAYMENT_METHOD.ONLINE && (
                <div className="payment-note">
                  請於收到確認信後 3 日內完成轉帳，並回傳帳號末 5 碼
                </div>
              )}
              {paymentMethod === PAYMENT_METHOD.ONSITE && (
                <div className="payment-note">
                  請於活動當天攜帶現金，建議準備零錢
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 總金額 */}
        <div className="total-price">
          <div className="total-content">
            <span className="total-label">預約總金額</span>
            <span className="total-amount">
              NT$ {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 重要提醒 */}
        <div className="notice-box">
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
            <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
            <path
              d="M12 8v4m0 4h.01"
              stroke="#F59E0B"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
          <div className="notice-content">
            <div className="notice-title">重要提醒</div>
            <ul className="notice-list">
              <li>送出後，我們的專員將在 24 小時內與您聯繫確認預約細節</li>
              <li>如需修改預約，請於預約日 3 天前來電通知</li>
              <li>如有急件需求，請直接致電：0800-123-456</li>
            </ul>
          </div>
        </div>

        {/* 導航按鈕 */}
        <div className="action-buttons">
          <button
            className="btn-prev"
            onClick={() => router.push('/booking/form')}
          >
            上一步
          </button>
          <button
            className="btn-confirm"
            disabled={!canConfirm || isSubmitting}
            onClick={confirmBooking}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                處理中...
              </>
            ) : (
              '確認送出預約'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default styled(ConfirmBooking)`
  ${style}
`;
