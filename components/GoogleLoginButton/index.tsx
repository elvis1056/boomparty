'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/authStore';

import style from './style';

interface GoogleLoginButtonProps {
  className?: string;
}

function GoogleLoginButton({ className }: GoogleLoginButtonProps) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const loginWithGoogle = async (credentialResponse: CredentialResponse) => {
    try {
      console.log('Google login success, sending to backend...');

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
        const errorText = await response.text();
        console.error('Backend response error:', errorText);
        throw new Error('Google 登入失敗');
      }

      const data = await response.json();
      console.log('Backend response:', data);

      // 儲存 token 和用戶資訊
      setAuth(data);

      // 導向首頁
      router.push('/');
    } catch (error) {
      console.error('Google login error:', error);
      alert('Google 登入失敗，請稍後再試');
    }
  };

  const showError = () => {
    console.error('Google login failed');
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
