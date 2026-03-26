'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { recordAffiliateClick } from '@/lib/api/orders';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

import CheckoutContent from './CheckoutContent';
import CheckoutEmpty from './CheckoutEmpty';

export default function CheckoutPage() {
  const user = useAuthStore((state) => state.user);
  const { cart } = useCartStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;

    sessionStorage.setItem('affiliateReferralCode', ref);
    recordAffiliateClick(ref).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 未登入
  if (!user) {
    return <CheckoutEmpty type="not-logged-in" />;
  }

  // 購物車為空
  if (!cart || cart.items.length === 0) {
    return <CheckoutEmpty type="empty-cart" />;
  }

  // 正常結帳流程
  return <CheckoutContent />;
}
