'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

import style from './style';

interface GoogleLoginButtonProps {
  className?: string;
}

function GoogleLoginButton({ className }: GoogleLoginButtonProps) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const syncGuestCart = useCartStore((state) => state.syncGuestCart);

  const loginWithGoogle = async (credentialResponse: CredentialResponse) => {
    try {
      // 發送 ID Token 到後端驗證
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 包含 cookies
          body: JSON.stringify({
            idToken: credentialResponse.credential,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Google 登入失敗');
      }

      // 儲存 token 和用戶資訊
      const data = await response.json();
      setAuth(data);
      await syncGuestCart();
      router.push('/');
    } catch {
      alert('Google 登入失敗，請稍後再試');
    }
  };

  const showError = () => {
    alert('Google 登入失敗');
  };

  return (
    <div className={className}>
      <GoogleLogin
        onError={showError}
        onSuccess={loginWithGoogle}
        shape="rectangular"
        size="large"
        text="signin_with"
        theme="outline"
        width="100%"
      />
    </div>
  );
}

export default styled(GoogleLoginButton)`
  ${style}
`;
