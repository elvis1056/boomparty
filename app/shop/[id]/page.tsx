import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { mockProducts } from '@/constants/mockProducts';
import { fetchProductById, fetchProductsByCategory } from '@/lib/api/products';
import type { Product } from '@/types';

import ProductDetailContent from './ProductDetailContent';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 用 mock 資料預先靜態生成已知商品頁面
// 等 fetchProducts() 串接真實 API 後，將 mockProducts 替換為 await fetchProducts()
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const fetched = await fetchProductById(Number(id)).catch(() => null);
  const product = fetched
    ? fetched
    : mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | 台灣氣球佈置 蹦娛樂 BoomParty`,
    description: `${product.description}，由蹦娛樂 BoomParty 專業氣球佈置團隊執行。`,
    openGraph: {
      title: `${product.name} | 台灣氣球佈置 蹦娛樂 BoomParty`,
      description: `${product.description}，由蹦娛樂 BoomParty 專業氣球佈置團隊執行。`,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const fetched = await fetchProductById(Number(id)).catch(() => null);
  const product = fetched
    ? fetched
    : mockProducts.find((p) => p.id === Number(id));

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
