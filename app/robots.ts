import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/checkout', '/orders', '/login', '/register'],
    },
    sitemap: 'https://elvis1056.boomparty.tw/sitemap.xml',
  };
}
