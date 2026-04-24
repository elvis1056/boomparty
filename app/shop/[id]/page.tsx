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
      images: product.images.length > 0 ? [{ url: product.images[0].url }] : [],
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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.length > 0 ? product.images[0].url : null,
    description: `${product.description}，由蹦娛樂 BoomParty 專業氣球佈置團隊執行。`,
    offers: {
      '@type': 'Offer',
      price: String(product.price),
      priceCurrency: 'TWD',
      availability:
        product.stock === 0
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
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
        name: '商品',
        item: 'https://boomparty.tw/shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://boomparty.tw/shop/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <ProductDetailContent
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
