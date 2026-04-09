import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/api/blog';
import type { BlogPost } from '@/types/blog';

import BlogPostContent from './BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 靜態生成所有文章路徑（供 output: export 使用）
export async function generateStaticParams() {
  const posts = await fetchBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await fetchBlogPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        type: 'article',
        title: post.title,
        description: post.excerpt,
        images: post.imageUrl ? [{ url: post.imageUrl }] : [],
        authors: [post.author],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: BlogPost;
  try {
    post = await fetchBlogPostBySlug(slug);
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: 'https://boomparty.tw',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '部落格',
        item: 'https://boomparty.tw/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://boomparty.tw/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <BlogPostContent post={post} />
    </>
  );
}
