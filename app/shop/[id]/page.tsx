import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchProductById, fetchProductsByCategory } from '@/lib/api/products';
import type { Product } from '@/types';

import ProductDetailContent from './ProductDetailContent';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await fetchProductById(Number(id)).catch(() => null);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | 台灣氣球佈置 蹦娛樂 BoomParty`,
    description: product.description,
    openGraph: {
      title: `${product.name} | 台灣氣球佈置 蹦娛樂 BoomParty`,
      description: product.description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await fetchProductById(Number(id)).catch(() => null);

  if (!product) {
    notFound();
  }

  let relatedProducts: Product[] = [];
  if (product.categoryId !== null) {
    const all = await fetchProductsByCategory(product.categoryId).catch(
      () => []
    );
    relatedProducts = all.filter((p) => p.id !== product.id).slice(0, 4);
  }

  return (
    <ProductDetailContent product={product} relatedProducts={relatedProducts} />
  );
}
