'use client';

import debounce from 'lodash/debounce';
import { useRef, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import { validateCoupon } from '@/lib/api/orders';

import style from './style';

type CouponStatus = 'idle' | 'loading' | 'valid' | 'invalid';

const VAGUE_ERROR_KEYWORDS = ['不存在', '已停用', '已過期', '已達上限'];
const THRESHOLD_KEYWORD = '門檻';
const VAGUE_MESSAGE = '優惠碼無效或不適用';

function resolveErrorMessage(message: string): string {
  const isVague = VAGUE_ERROR_KEYWORDS.some((keyword) =>
    message.includes(keyword)
  );
  if (isVague) return VAGUE_MESSAGE;
  if (message.includes(THRESHOLD_KEYWORD)) return message;
  return VAGUE_MESSAGE;
}

interface CouponInputProps {
  className?: string;
  cartAmount: number;
  onValidated: (code: string, discount: number) => void;
  onCleared: () => void;
}

function CouponInput({
  className,
  cartAmount,
  onValidated,
  onCleared,
}: CouponInputProps) {
  const inputRef = useRef('');
  const inputElRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<CouponStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const prevCartAmountRef = useRef(cartAmount);

  // cart 金額變動時清除驗證狀態
  useEffect(() => {
    if (prevCartAmountRef.current !== cartAmount) {
      prevCartAmountRef.current = cartAmount;
      if (status === 'valid') {
        setStatus('idle');
        setFeedbackMessage('');
        onCleared();
      }
    }
  }, [cartAmount, status, onCleared]);

  const debounceCouponCheck = useMemo(
    () =>
      debounce(async () => {
        const code = inputRef.current.trim();
        if (!code) {
          setStatus('idle');
          setFeedbackMessage('');
          onCleared();
          return;
        }

        setStatus('loading');

        try {
          const result = await validateCoupon(code, cartAmount);
          if (result.valid) {
            setStatus('valid');
            setFeedbackMessage(
              `已折抵 NT$ ${result.discountAmount.toLocaleString()}`
            );
            onValidated(code, result.discountAmount);
          } else {
            setStatus('invalid');
            setFeedbackMessage(resolveErrorMessage(result.message));
            onCleared();
          }
        } catch {
          setStatus('invalid');
          setFeedbackMessage(VAGUE_MESSAGE);
          onCleared();
        }
      }, 800),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartAmount]
  );

  const clearCoupon = () => {
    inputRef.current = '';
    if (inputElRef.current) inputElRef.current.value = '';
    debounceCouponCheck.cancel();
    setStatus('idle');
    setFeedbackMessage('');
    onCleared();
  };

  const feedbackClass =
    status === 'valid'
      ? 'is-valid'
      : status === 'invalid'
        ? 'is-invalid'
        : status === 'loading'
          ? 'is-loading'
          : '';

  const inputClass =
    status === 'valid'
      ? 'coupon-input is-valid'
      : status === 'invalid'
        ? 'coupon-input is-invalid'
        : 'coupon-input';

  return (
    <div className={className}>
      <span className="coupon-label">優惠碼</span>
      <div className="coupon-row">
        <input
          className={inputClass}
          onChange={(e) => {
            inputRef.current = e.target.value;
            debounceCouponCheck();
          }}
          placeholder="輸入優惠碼"
          ref={inputElRef}
          type="text"
        />
        {status === 'valid' && (
          <button className="coupon-btn" onClick={clearCoupon} type="button">
            移除
          </button>
        )}
      </div>
      {feedbackMessage && (
        <p className={`coupon-feedback ${feedbackClass}`}>{feedbackMessage}</p>
      )}
    </div>
  );
}

export default styled(CouponInput)`
  ${style}
`;
