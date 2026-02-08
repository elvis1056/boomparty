'use client';

import debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
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

import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import ShippingForm from './ShippingForm';
import style from './style';

interface CheckoutPageContentProps {
  className?: string;
}

// 收件資訊 State
interface ShippingData {
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  note: string;
}

// 付款資訊 State
interface PaymentData {
  paymentMethod: PaymentMethodType;
}

function CheckoutPageContent({ className }: CheckoutPageContentProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { cart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 拆分 State：收件資訊
  const [shippingData, setShippingData] = useState<ShippingData>({
    recipientName: '',
    recipientPhone: '',
    recipientEmail: user?.email || '',
    city: '',
    district: '',
    postalCode: '',
    addressLine: '',
    note: '',
  });

  // 拆分 State：付款資訊
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: 'CASH_ON_DELIVERY',
  });

  // 註：購物車已由 CartButton (Navbar) 載入，此處不需重複呼叫 loadCart()

  // Debounced 更新收件資訊
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateShippingField = useCallback(
    debounce(
      (field: keyof ShippingData, value: string | number | boolean | null) => {
        setShippingData((prev) => ({
          ...prev,
          [field]: value,
        }));
      },
      FORM_VALIDATION.DEBOUNCE_DELAY
    ),
    []
  );

  // 更新付款方式（不需要 debounce，單選）
  const updatePaymentMethod = (method: PaymentMethodType) => {
    setPaymentData({ paymentMethod: method });
  };

  // 表單驗證
  const validateForm = (): boolean => {
    const requiredFields: (keyof typeof FIELD_LABELS)[] = [
      'recipientName',
      'recipientPhone',
      'recipientEmail',
      'city',
      'district',
      'postalCode',
      'addressLine',
    ];

    for (const field of requiredFields) {
      if (!shippingData[field as keyof ShippingData]) {
        alert(`請填寫 ${FIELD_LABELS[field]}`);
        return false;
      }
    }

    // 驗證 Email 格式
    if (!FORM_VALIDATION.EMAIL_REGEX.test(shippingData.recipientEmail)) {
      alert('Email 格式不正確');
      return false;
    }

    // 驗證電話格式
    if (!FORM_VALIDATION.PHONE_REGEX.test(shippingData.recipientPhone)) {
      alert('電話格式不正確');
      return false;
    }

    return true;
  };

  // 送出訂單
  const onSubmit = async () => {
    // 檢查登入
    if (!user) {
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
      // 組合訂單資料
      const orderData = {
        recipientName: shippingData.recipientName,
        recipientPhone: shippingData.recipientPhone,
        recipientEmail: shippingData.recipientEmail || undefined,
        city: shippingData.city,
        district: shippingData.district,
        postalCode: shippingData.postalCode,
        addressLine: shippingData.addressLine,
        note: shippingData.note || undefined,
        paymentMethod: paymentData.paymentMethod,
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
              onFieldChange={updateShippingField}
              shippingData={shippingData}
            />

            {/* 付款方式 */}
            <PaymentMethod
              onMethodChange={updatePaymentMethod}
              selectedMethod={paymentData.paymentMethod}
            />
          </div>

          {/* 右側：訂單摘要 */}
          <OrderSummary
            cart={cart}
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
