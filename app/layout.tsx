import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';

import 'github-markdown-css/github-markdown-light.css';

import { AuthInit } from '@/components/AuthInit';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import { QueryProvider } from './query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Elvis | 工程師 · Next.js & Spring Boot',
    template: '%s | Elvis',
  },
  description:
    '嗨，我是 Elvis，軟體工程師，專注於 Next.js 前端開發與 Spring Boot 後端架構。這裡展示我的個人作品、UI 元件與技術履歷。',
  keywords: [
    'Elvis',
    'Next.js',
    'Spring Boot',
    '前端工程師',
    '軟體工程師',
    '全端工程師',
    '作品集',
  ],
  authors: [{ name: 'Elvis' }],
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://boomparty.tw',
    siteName: 'Elvis | 個人作品集',
    title: 'Elvis | 全端工程師 · Next.js & Spring Boot',
    description:
      '嗨，我是 Elvis，軟體工程師，專注於 Next.js 前端開發與 Spring Boot 後端架構。這裡展示我的個人作品、UI 元件與技術履歷。',
  },
  twitter: {
    card: 'summary',
    title: 'Elvis | 工程師 · Next.js & Spring Boot',
    description:
      '嗨，我是 Elvis，軟體工程師，專注於 Next.js 前端開發與 Spring Boot 後端架構。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <meta
          content="hce2ToOyyPUu1SFJ41CA6EpBz1rqcIqFFYfWKO5MKSM"
          name="google-site-verification"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              opacity: 0;
              transition: opacity .5s ease-in;
            }
            body.loaded {
              opacity: 1;
            }
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.addEventListener('load', () => {
              document.body.classList.add('loaded');
            });
          `,
          }}
        />
      </head>
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <QueryProvider>
            <AuthInit />
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
