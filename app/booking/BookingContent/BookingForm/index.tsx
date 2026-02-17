'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useMemo, useEffect } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';
import { PAYMENT_METHOD } from '@/constants/booking-constants';
import { generateTimeSlots } from '@/constants/booking-data';
import { useBookingStore } from '@/stores/bookingStore';

import style from './style';

interface BookingFormProps {
  className?: string;
}

// 驗證函數
const validateName = (name: string): string => {
  if (!name || name.trim().length === 0) {
    return '請輸入姓名';
  }
  if (name.trim().length < 2) {
    return '姓名至少需要 2 個字元';
  }
  return '';
};

const validatePhone = (phone: string): string => {
  if (!phone || phone.trim().length === 0) {
    return '請輸入聯絡電話';
  }
  const phoneRegex = /^09\d{8}$/;
  if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
    return '請輸入有效的手機號碼（09 開頭，10 碼）';
  }
  return '';
};

const validateEmail = (email: string): string => {
  if (!email || email.trim().length === 0) {
    return '請輸入 Email';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '請輸入有效的 Email 格式';
  }
  return '';
};

// Debounce 函數
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function BookingForm({ className }: BookingFormProps) {
  const router = useRouter();
  const {
    selectedService,
    selectedPerformer,
    completionTime,
    performanceStart,
    performanceEnd,
    customerInfo,
    paymentMethod,
    totalPrice,
    setCompletionTime,
    setPerformanceTime,
    setCustomerInfo,
    setPaymentMethod,
  } = useBookingStore();

  // 日曆選擇的日期
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  // 選擇的時間（完成時間點用）
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // 選擇的開始時間（表演時段用）
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
    null
  );
  // 摘要展開/收合狀態
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  // 客戶資料 refs
  const nameRef = useRef(customerInfo?.name || '');
  const phoneRef = useRef(customerInfo?.phone || '');
  const emailRef = useRef(customerInfo?.email || '');
  const notesRef = useRef(customerInfo?.notes || '');

  // 錯誤訊息 state
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // 檢查是否有填寫資料（用於決定是否顯示離開警告）
  const hasUserInput = () => {
    return (
      selectedTime !== null ||
      selectedStartTime !== null ||
      nameRef.current.length > 0 ||
      phoneRef.current.length > 0 ||
      emailRef.current.length > 0 ||
      notesRef.current.length > 0 ||
      paymentMethod !== null
    );
  };

  // 防止意外離開頁面
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 只有在用戶有填寫資料時才顯示警告
      if (hasUserInput()) {
        e.preventDefault();
        e.returnValue = ''; // Chrome 需要這個
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  // Debounced 驗證函數
  const debounceNameCheck = useMemo(
    () =>
      debounce(() => {
        const result = validateName(nameRef.current);
        setNameError(result);
      }, 300),
    []
  );

  const debouncePhoneCheck = useMemo(
    () =>
      debounce(() => {
        const result = validatePhone(phoneRef.current);
        setPhoneError(result);
      }, 300),
    []
  );

  const debounceEmailCheck = useMemo(
    () =>
      debounce(() => {
        const result = validateEmail(emailRef.current);
        setEmailError(result);
      }, 300),
    []
  );

  // 輸入處理函數
  const updateName = (value: string) => {
    nameRef.current = value;
    if (submitAttempted) {
      debounceNameCheck();
    }
  };

  const updatePhone = (value: string) => {
    phoneRef.current = value;
    if (submitAttempted) {
      debouncePhoneCheck();
    }
  };

  const updateEmail = (value: string) => {
    emailRef.current = value;
    if (submitAttempted) {
      debounceEmailCheck();
    }
  };

  const updateNotes = (value: string) => {
    notesRef.current = value;
  };

  // 格式化日期
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const weekdays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 ${weekday}`;
  };

  // 格式化時間
  const formatTime = (date: Date | null) => {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 時間選擇處理（佈置類：完成時間點）
  const selectCompletionTime = (time: string) => {
    setSelectedTime(time);
    // 組合日期和時間
    const [hours, minutes] = time.split(':').map(Number);
    const datetime = new Date(calendarDate);
    datetime.setHours(hours, minutes, 0, 0);
    setCompletionTime(datetime);
  };

  // 時間選擇處理（表演類：表演時段）
  const selectPerformanceTime = (startTime: string) => {
    setSelectedStartTime(startTime);
    // 計算結束時間
    if (selectedService) {
      const [hours, minutes] = startTime.split(':').map(Number);
      const start = new Date(calendarDate);
      start.setHours(hours, minutes, 0, 0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + selectedService.duration);

      setPerformanceTime(start, end);
    }
  };

  // 檢查日期是否可選
  const tileDisabled = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    if (date < today || date > maxDate) return true;

    // 如果有選擇表演者，檢查是否是可用日
    if (selectedPerformer) {
      const dayOfWeek = date.getDay();
      return !selectedPerformer.availableDays.includes(dayOfWeek);
    }

    return false;
  };

  // 表單提交
  const submitForm = () => {
    setSubmitAttempted(true);

    // 驗證時間選擇
    let timeValid = false;
    if (selectedService?.bookingType === 'completion') {
      timeValid = completionTime !== null;
    } else if (selectedService?.bookingType === 'timeSlot') {
      timeValid = performanceStart !== null && performanceEnd !== null;
    }

    if (!timeValid) {
      alert('請選擇時間');
      return;
    }

    // 驗證客戶資料
    const nameErr = validateName(nameRef.current);
    const phoneErr = validatePhone(phoneRef.current);
    const emailErr = validateEmail(emailRef.current);

    setNameError(nameErr);
    setPhoneError(phoneErr);
    setEmailError(emailErr);

    if (nameErr || phoneErr || emailErr) {
      return;
    }

    // 驗證付款方式
    if (!paymentMethod) {
      alert('請選擇付款方式');
      return;
    }

    // 儲存客戶資料
    setCustomerInfo({
      name: nameRef.current.trim(),
      phone: phoneRef.current.trim(),
      email: emailRef.current.trim(),
      notes: notesRef.current.trim(),
    });

    // 進入確認頁
    router.push('/booking/confirm');
  };

  // 檢查是否可以返回（如果不需要表演者，返回服務選擇；如果需要，返回表演者選擇）
  const getPrevUrl = () => {
    if (selectedService?.requiresPerformer) {
      return '/booking/staff';
    }
    return '/booking/service';
  };

  if (!selectedService) {
    return (
      <div className={className}>
        <div className="booking-form-container">
          <div className="error-message">請先選擇服務</div>
          <div className="action-buttons">
            <button
              className="btn-prev"
              onClick={() => router.push('/booking/service')}
            >
              返回選擇服務
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCompletionType = selectedService.bookingType === 'completion';
  const timeSlots = generateTimeSlots(calendarDate);

  return (
    <div className={className}>
      <div className="booking-form-wrapper">
        <div className="header">
          <h2>填寫預約資料</h2>
          <p>請填寫完整資訊以完成預約</p>
        </div>

        <div className="booking-form-container">
          <div className="form-content">
            {/* 時間選擇區 */}
            <div className="section">
              <h3 className="section-title">
                {isCompletionType ? '選擇完成時間' : '選擇表演時段'}
              </h3>

              {/* 表演者資訊 */}
              {selectedPerformer && (
                <div className="performer-info">
                  <span className="label">表演者：</span>
                  <span className="name">{selectedPerformer.name}</span>
                  <span className="title">（{selectedPerformer.title}）</span>
                </div>
              )}

              <div className="datetime-selector">
                {/* 日曆 */}
                <div className="calendar-section">
                  <Calendar
                    locale="zh-TW"
                    maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    minDate={new Date()}
                    onChange={(value) => {
                      const date = value as Date;
                      setCalendarDate(date);
                      setSelectedTime(null);
                      setSelectedStartTime(null);
                    }}
                    tileDisabled={tileDisabled}
                    value={calendarDate}
                  />
                </div>

                {/* 時段選擇 */}
                <div className="timeslot-section">
                  <div className="selected-date-display">
                    {formatDate(calendarDate)}
                  </div>
                  <div className="timeslot-grid">
                    {timeSlots.map((slot) => {
                      const isSelected = isCompletionType
                        ? selectedTime === slot
                        : selectedStartTime === slot;

                      return (
                        <button
                          className={`timeslot-btn ${isSelected ? 'selected' : ''}`}
                          key={slot}
                          onClick={() => {
                            if (isCompletionType) {
                              selectCompletionTime(slot);
                            } else {
                              selectPerformanceTime(slot);
                            }
                          }}
                        >
                          {slot}
                          {!isCompletionType && selectedStartTime === slot && (
                            <span className="duration-hint">
                              ({selectedService.duration}分鐘)
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 客戶資料區 */}
            <div className="section">
              <h3 className="section-title">聯絡資訊</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  姓名 <span className="required">*</span>
                </label>
                <input
                  className={`form-input ${nameError ? 'error' : ''}`}
                  defaultValue={nameRef.current}
                  id="name"
                  onBlur={() => {
                    setSubmitAttempted(true);
                    debounceNameCheck();
                  }}
                  onChange={(e) => updateName(e.target.value)}
                  placeholder="請輸入您的姓名"
                  type="text"
                />
                {nameError && <div className="form-error">{nameError}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  聯絡電話 <span className="required">*</span>
                </label>
                <input
                  className={`form-input ${phoneError ? 'error' : ''}`}
                  defaultValue={phoneRef.current}
                  id="phone"
                  onBlur={() => {
                    setSubmitAttempted(true);
                    debouncePhoneCheck();
                  }}
                  onChange={(e) => updatePhone(e.target.value)}
                  placeholder="0912-345-678"
                  type="tel"
                />
                {phoneError && <div className="form-error">{phoneError}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  className={`form-input ${emailError ? 'error' : ''}`}
                  defaultValue={emailRef.current}
                  id="email"
                  onBlur={() => {
                    setSubmitAttempted(true);
                    debounceEmailCheck();
                  }}
                  onChange={(e) => updateEmail(e.target.value)}
                  placeholder="example@email.com"
                  type="email"
                />
                {emailError && <div className="form-error">{emailError}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="notes">
                  備註說明
                </label>
                <textarea
                  className="form-textarea"
                  defaultValue={notesRef.current}
                  id="notes"
                  onChange={(e) => updateNotes(e.target.value)}
                  placeholder="請告訴我們您的特殊需求或想法（選填）"
                  rows={4}
                />
              </div>
            </div>

            {/* 付款方式區 */}
            <div className="section">
              <h3 className="section-title">付款方式</h3>

              <div className="payment-grid">
                <div
                  className={`payment-card ${
                    paymentMethod === PAYMENT_METHOD.ONLINE ? 'selected' : ''
                  }`}
                  onClick={() => setPaymentMethod(PAYMENT_METHOD.ONLINE)}
                >
                  <div className="payment-icon">
                    <svg fill="none" height="32" viewBox="0 0 24 24" width="32">
                      <rect
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        width="20"
                        x="2"
                        y="5"
                      />
                      <path
                        d="M2 10h20"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <rect
                        fill="currentColor"
                        height="2"
                        width="4"
                        x="6"
                        y="14"
                      />
                    </svg>
                  </div>
                  <div className="payment-info">
                    <h4>線上轉帳</h4>
                    <p>ATM 或網路銀行轉帳</p>
                  </div>
                </div>

                <div
                  className={`payment-card ${
                    paymentMethod === PAYMENT_METHOD.ONSITE ? 'selected' : ''
                  }`}
                  onClick={() => setPaymentMethod(PAYMENT_METHOD.ONSITE)}
                >
                  <div className="payment-icon">
                    <svg fill="none" height="32" viewBox="0 0 24 24" width="32">
                      <path
                        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="payment-info">
                    <h4>現場付現</h4>
                    <p>活動當天現金支付</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右側摘要欄（桌面版）*/}
          <div className="summary-sidebar desktop-only">
            <div className="summary-sticky">
              <h3>預約摘要</h3>

              <div className="summary-section">
                <div className="summary-item">
                  <span className="summary-label">服務項目</span>
                  <span className="summary-value">{selectedService.name}</span>
                </div>

                {selectedPerformer && (
                  <div className="summary-item">
                    <span className="summary-label">表演者</span>
                    <span className="summary-value">
                      {selectedPerformer.name}
                    </span>
                  </div>
                )}

                <div className="summary-item">
                  <span className="summary-label">服務時長</span>
                  <span className="summary-value">
                    {selectedService.duration} 分鐘
                  </span>
                </div>

                {isCompletionType && completionTime && (
                  <div className="summary-item">
                    <span className="summary-label">完成時間</span>
                    <span className="summary-value">
                      {formatDate(completionTime)}
                      <br />
                      {completionTime.getHours().toString().padStart(2, '0')}:
                      {completionTime.getMinutes().toString().padStart(2, '0')}
                    </span>
                  </div>
                )}

                {!isCompletionType && performanceStart && performanceEnd && (
                  <div className="summary-item">
                    <span className="summary-label">表演時段</span>
                    <span className="summary-value">
                      {formatDate(performanceStart)}
                      <br />
                      {performanceStart.getHours().toString().padStart(2, '0')}:
                      {performanceStart
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      - {performanceEnd.getHours().toString().padStart(2, '0')}:
                      {performanceEnd.getMinutes().toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              <div className="summary-total">
                <span className="total-label">總金額</span>
                <span className="total-amount">
                  NT$ {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* 導航按鈕 */}
              <div className="action-buttons">
                <button
                  className="btn-prev"
                  onClick={() => router.push(getPrevUrl())}
                >
                  上一步
                </button>
                <button className="btn-next" onClick={submitForm}>
                  確認預約
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 手機版固定底部摘要欄 */}
        <div className="mobile-summary-footer">
          <div
            className={`summary-compact ${isSummaryExpanded ? 'expanded' : ''}`}
          >
            {!isSummaryExpanded ? (
              // 收合狀態：簡化顯示
              <div
                className="summary-simple"
                onClick={() => setIsSummaryExpanded(true)}
              >
                <div className="summary-info">
                  <div className="service-name">
                    {selectedService.name}
                    {!isCompletionType &&
                      performanceStart &&
                      performanceEnd && (
                        <span className="time-brief">
                          {' '}
                          {formatDate(performanceStart).split(' ')[0]}{' '}
                          {formatTime(performanceStart)}
                        </span>
                      )}
                    {isCompletionType && completionTime && (
                      <span className="time-brief">
                        {' '}
                        {formatDate(completionTime).split(' ')[0]}{' '}
                        {formatTime(completionTime)}
                      </span>
                    )}
                  </div>
                  <div className="price-row">
                    <span className="total-price">
                      NT$ {totalPrice.toLocaleString()}
                    </span>
                    <span className="expand-icon">👁️</span>
                  </div>
                </div>
              </div>
            ) : (
              // 展開狀態：完整詳情
              <div className="summary-detail">
                <div className="summary-header">
                  <h4>預約詳情</h4>
                  <button
                    className="close-btn"
                    onClick={() => setIsSummaryExpanded(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="summary-content">
                  <div className="detail-item">
                    <span className="label">服務項目</span>
                    <span className="value">
                      {selectedService.name} ({selectedService.duration}分鐘)
                    </span>
                  </div>

                  {selectedPerformer && (
                    <div className="detail-item">
                      <span className="label">表演者</span>
                      <span className="value">
                        {selectedPerformer.name} ({selectedPerformer.title})
                      </span>
                    </div>
                  )}

                  {isCompletionType && completionTime && (
                    <div className="detail-item">
                      <span className="label">完成時間</span>
                      <span className="value">
                        {formatDate(completionTime)}{' '}
                        {formatTime(completionTime)}
                      </span>
                    </div>
                  )}

                  {!isCompletionType && performanceStart && performanceEnd && (
                    <div className="detail-item">
                      <span className="label">表演時段</span>
                      <span className="value">
                        {formatDate(performanceStart)}
                        <br />
                        {formatTime(performanceStart)} -{' '}
                        {formatTime(performanceEnd)}
                      </span>
                    </div>
                  )}

                  {customerInfo && (
                    <>
                      <div className="detail-item">
                        <span className="label">聯絡人</span>
                        <span className="value">{customerInfo.name}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">電話</span>
                        <span className="value">{customerInfo.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Email</span>
                        <span className="value">{customerInfo.email}</span>
                      </div>
                    </>
                  )}

                  {paymentMethod && (
                    <div className="detail-item">
                      <span className="label">付款方式</span>
                      <span className="value">
                        {paymentMethod === PAYMENT_METHOD.ONLINE
                          ? '線上轉帳'
                          : '現場付現'}
                      </span>
                    </div>
                  )}

                  <div className="detail-total">
                    <span className="label">總金額</span>
                    <span className="value">
                      NT$ {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 按鈕區（手機版固定底部）*/}
            <div className="mobile-action-buttons">
              <button
                className="btn-prev"
                onClick={() => router.push(getPrevUrl())}
              >
                ← 上一步
              </button>
              <button className="btn-next" onClick={submitForm}>
                確認預約 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(BookingForm)`
  ${style}
`;
