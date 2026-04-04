import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/api/blog';

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

  try {
    const post = await fetchBlogPostBySlug(slug);
    return <BlogPostContent post={post} />;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    notFound();
  }
}
