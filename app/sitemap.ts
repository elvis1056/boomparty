import type { MetadataRoute } from 'next';

import { fetchBlogPosts } from '@/lib/api/blog';
import { fetchProducts } from '@/lib/api/products';

const BASE_URL = 'https://boomparty.tw';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/service/wedding`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/service/birthday`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/service/corporate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/service/proposal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 動態載入所有 blog 文章
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchBlogPosts();
    blogPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {
    // 後端不可用時略過動態文章，靜態頁面仍正常輸出
  }

  // 動態載入所有商品頁
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await fetchProducts();
    productPages = products.map((product) => ({
      url: `${BASE_URL}/shop/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // API 不可用時略過，靜態頁面仍正常輸出
  }

  return [...staticPages, ...blogPages, ...productPages];
}
