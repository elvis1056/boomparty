'use client';

import debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';
import { useRef, useState, useMemo } from 'react';
import styled from 'styled-components';

import {
  SHIPPING_FEE,
  FORM_VALIDATION,
  FIELD_LABELS,
} from '@/constants/checkout';
import { createOrder } from '@/lib/api/orders';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import type { PaymentMethod as PaymentMethodType } from '@/types';

import CouponInput from './CouponInput';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import ShippingForm from './ShippingForm';
import style from './style';

interface CheckoutPageContentProps {
  className?: string;
}

// 付款資訊 State
interface PaymentData {
  paymentMethod: PaymentMethodType;
}

function CheckoutPageContent({ className }: CheckoutPageContentProps) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.user !== null);
  const userEmail = useAuthStore((state) => state.user?.email);
  const { cart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // 使用 useRef 儲存表單值（不觸發 re-render）
  const recipientNameRef = useRef('');
  const recipientPhoneRef = useRef('');
  const recipientEmailRef = useRef(userEmail || '');
  const cityRef = useRef('');
  const districtRef = useRef('');
  const postalCodeRef = useRef('');
  const addressLineRef = useRef('');
  const noteRef = useRef('');

  // 錯誤訊息用 state（需要顯示）
  const [recipientNameError, setRecipientNameError] = useState('');
  const [recipientPhoneError, setRecipientPhoneError] = useState('');
  const [recipientEmailError, setRecipientEmailError] = useState('');
  const [cityError, setCityError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [addressLineError, setAddressLineError] = useState('');

  // 付款資訊
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: 'CASH_ON_DELIVERY',
  });

  // 每個欄位獨立的 debounced 驗證函數
  const debounceNameCheck = useMemo(
    () =>
      debounce(() => {
        const value = recipientNameRef.current;
        setRecipientNameError(
          value ? '' : `請填寫 ${FIELD_LABELS.recipientName}`
        );
      }, FORM_VALIDATION.DEBOUNCE_DELAY),
    []
  );

  const debouncePhoneCheck = useMemo(
    () =>
      debounce(() => {
        const value = recipientPhoneRef.current;
        if (!value) {
          setRecipientPhoneError('請填寫聯絡電話');
        } else if (!FORM_VALIDATION.PHONE_REGEX.test(value)) {
          setRecipientPhoneError('電話格式不正確');
        } else {
          setRecipientPhoneError('');
        }
      }, FORM_VALIDATION.DEBOUNCE_DELAY),
    []
  );

  const debounceEmailCheck = useMemo(
    () =>
      debounce(() => {
        const value = recipientEmailRef.current;
        if (!value) {
          setRecipientEmailError('請填寫 Email');
        } else if (!FORM_VALIDATION.EMAIL_REGEX.test(value)) {
          setRecipientEmailError('Email 格式不正確');
        } else {
          setRecipientEmailError('');
        }
      }, FORM_VALIDATION.DEBOUNCE_DELAY),
    []
  );

  const debounceCityCheck = useMemo(
    () =>
      debounce(() => {
        const value = cityRef.current;
        setCityError(value ? '' : `請填寫 ${FIELD_LABELS.city}`);
      }, FORM_VALIDATION.DEBOUNCE_DELAY),
    []
  );

  const debounceDistrictCheck = useMemo(
    () =>
      debounce(() => {
        const value = districtRef.current;
        setDistrictError(value ? '' : `請填寫 ${FIELD_LABELS.district}`);
      }, FORM_VALIDATION.DEBOUNCE_DELAY),
    []
  );

  const debouncePostalCodeCheck = useMemo(
    () =>
      debounce(() => {
        const value = postalCodeRef.current;
        setPostalCodeError(value ? '' : `請填寫 ${FIELD_LABELS.postalCode}`);
      }, FORM_VALIDATION.DEBOUNCE_DELAY),
    []
  );

  const debounceAddressLineCheck = useMemo(
    () =>
      debounce(() => {
        const value = addressLineRef.current;
        setAddressLineError(value ? '' : `請填寫 ${FIELD_LABELS.addressLine}`);
      }, FORM_VALIDATION.DEBOUNCE_DELAY),
    []
  );

  // 更新付款方式
  const updatePaymentMethod = (method: PaymentMethodType) => {
    setPaymentData({ paymentMethod: method });
  };

  const couponValidated = (code: string, discount: number) => {
    setCouponCode(code);
    setDiscountAmount(discount);
  };

  const couponCleared = () => {
    setCouponCode('');
    setDiscountAmount(0);
  };

  // 最終提交驗證（不延遲，立即顯示所有錯誤）
  const validateForm = (): boolean => {
    // 立即驗證所有欄位
    debounceNameCheck.flush();
    debouncePhoneCheck.flush();
    debounceEmailCheck.flush();
    debounceCityCheck.flush();
    debounceDistrictCheck.flush();
    debouncePostalCodeCheck.flush();
    debounceAddressLineCheck.flush();

    // 檢查是否有錯誤
    const hasError =
      !recipientNameRef.current ||
      !recipientPhoneRef.current ||
      !recipientEmailRef.current ||
      !cityRef.current ||
      !districtRef.current ||
      !postalCodeRef.current ||
      !addressLineRef.current ||
      !FORM_VALIDATION.EMAIL_REGEX.test(recipientEmailRef.current) ||
      !FORM_VALIDATION.PHONE_REGEX.test(recipientPhoneRef.current);

    if (hasError) {
      alert('請檢查表單欄位是否填寫正確');
      return false;
    }

    return true;
  };

  // 送出訂單
  const onSubmit = async () => {
    // 檢查登入
    if (!isLoggedIn) {
      alert('請先登入');
      router.push('/login');
      return;
    }

    // 檢查購物車
    if (!cart || cart.items.length === 0) {
      alert('購物車是空的');
      router.push('/cart');
      return;
    }

    // 驗證表單
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 從 refs 讀取表單資料
      const affiliateReferralCode =
        sessionStorage.getItem('affiliateReferralCode') || undefined;

      const orderData = {
        recipientName: recipientNameRef.current,
        recipientPhone: recipientPhoneRef.current,
        recipientEmail: recipientEmailRef.current || undefined,
        city: cityRef.current,
        district: districtRef.current,
        postalCode: postalCodeRef.current,
        addressLine: addressLineRef.current,
        note: noteRef.current || undefined,
        paymentMethod: paymentData.paymentMethod,
        couponCode: couponCode || undefined,
        affiliateReferralCode,
      };

      // 呼叫後端 API 建立訂單
      const order = await createOrder(orderData);

      alert('訂單建立成功！');

      // 導向訂單詳情頁
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert(
        error instanceof Error ? error.message : '訂單建立失敗，請稍後再試'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <div className="container">
        <h1 className="page-title">結帳</h1>

        <div className="checkout-layout">
          {/* 左側：表單區 */}
          <div className="checkout-forms">
            {/* 收件資訊 */}
            <ShippingForm
              addressLineError={addressLineError}
              addressLineRef={addressLineRef}
              cityError={cityError}
              cityRef={cityRef}
              debounceAddressLineCheck={debounceAddressLineCheck}
              debounceCityCheck={debounceCityCheck}
              debounceDistrictCheck={debounceDistrictCheck}
              debounceEmailCheck={debounceEmailCheck}
              debounceNameCheck={debounceNameCheck}
              debouncePhoneCheck={debouncePhoneCheck}
              debouncePostalCodeCheck={debouncePostalCodeCheck}
              districtError={districtError}
              districtRef={districtRef}
              noteRef={noteRef}
              postalCodeError={postalCodeError}
              postalCodeRef={postalCodeRef}
              recipientEmailError={recipientEmailError}
              recipientEmailRef={recipientEmailRef}
              recipientNameError={recipientNameError}
              recipientNameRef={recipientNameRef}
              recipientPhoneError={recipientPhoneError}
              recipientPhoneRef={recipientPhoneRef}
            />

            {/* 付款方式 */}
            <PaymentMethod
              onMethodChange={updatePaymentMethod}
              selectedMethod={paymentData.paymentMethod}
            />

            {/* 優惠碼 */}
            <CouponInput
              cartAmount={cart ? cart.totalAmount : 0}
              onCleared={couponCleared}
              onValidated={couponValidated}
            />
          </div>

          {/* 右側：訂單摘要 */}
          <OrderSummary
            cart={cart}
            discountAmount={discountAmount}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            shippingFee={SHIPPING_FEE}
          />
        </div>
      </div>
    </div>
  );
}

export default styled(CheckoutPageContent)`
  ${style}
`;
