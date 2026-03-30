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
    default: '蹦娛樂 BoomParty | 台灣專業氣球佈置品牌',
    template: '%s | 蹦娛樂 BoomParty',
  },
  description:
    '蹦娛樂 BoomParty，台灣專業氣球佈置品牌。生日、婚禮、求婚、開幕等各式場合氣球佈置服務，提供造型氣球、空飄充氣、客製印刷一站式解決方案。',
  keywords: [
    '蹦娛樂',
    'BoomParty',
    '氣球佈置',
    '造型氣球',
    '生日佈置',
    '婚禮佈置',
    '求婚佈置',
    '空飄氣球',
    '台灣氣球',
  ],
  authors: [{ name: '蹦娛樂 BoomParty' }],
  icons: {
    icon: '/boomparty-logo.jpg',
    apple: '/boomparty-logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://boomparty.tw',
    siteName: '蹦娛樂 BoomParty',
    title: '蹦娛樂 BoomParty | 台灣專業氣球佈置品牌',
    description:
      '蹦娛樂 BoomParty，台灣專業氣球佈置品牌。生日、婚禮、求婚、開幕等各式場合氣球佈置服務，提供造型氣球、空飄充氣、客製印刷一站式解決方案。',
  },
  twitter: {
    card: 'summary',
    title: '蹦娛樂 BoomParty | 台灣專業氣球佈置品牌',
    description:
      '蹦娛樂 BoomParty，台灣專業氣球佈置品牌。生日、婚禮、求婚、開幕等各式場合氣球佈置服務。',
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
