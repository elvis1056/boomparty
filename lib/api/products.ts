import type { Product, ProductImage } from '@/types';

import { apiClient } from './client';

export async function fetchProducts(): Promise<Product[]> {
  const products = await apiClient.get<Product[]>('/api/products');
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL !== undefined
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : '';
  return products.map((product) => ({
    ...product,
    images: product.images?.map((image) => ({
      ...image,
      url: image.url.startsWith('/') ? `${apiBase}${image.url}` : image.url,
    })),
  }));
}

// 🔥 假資料 - 之後改成真實 API
// export async function fetchFakeProducts(): Promise<Product[]> {
//   // 模擬網路延遲
//   await new Promise((resolve) => setTimeout(resolve, 500));

//   return [
//     {
//       id: 1,
//       name: '浪漫求婚佈置',
//       description: '粉紅玫瑰花牆搭配氣球，打造浪漫求婚場景',
//       price: 8800,
//       category: 'wedding',
//       featured: true,
//       imageUrl: assetPath('/images/products/1070704 求婚佈置 1.jpg'),
//       createdAt: '2025-01-15T10:00:00Z',
//     },
//     {
//       id: 2,
//       name: '優美勝地婚禮佈置',
//       description: '典雅白色系婚禮氣球拱門，襯托幸福時刻',
//       price: 12000,
//       category: 'wedding',
//       featured: true,
//       imageUrl: assetPath('/images/products/1070616新店優美勝地婚禮1.1.jpg'),
//       createdAt: '2025-01-16T10:00:00Z',
//     },
//     {
//       id: 3,
//       name: '企業尾牙佈置 - 頂新集團',
//       description: '大型企業活動氣球佈置，營造歡樂氛圍',
//       price: 15000,
//       category: 'corporate',
//       imageUrl: assetPath(
//         '/images/products/1070129頂新集團餐飲事業群經營策略會議6.1.jpg'
//       ),
//       createdAt: '2025-01-17T10:00:00Z',
//     },
//     {
//       id: 4,
//       name: '兆豐國際商銀尾牙',
//       description: '金融業尾牙活動專業佈置',
//       price: 18000,
//       category: 'corporate',
//       featured: true,
//       imageUrl: assetPath('/images/products/1070130兆豐國際商銀尾牙1.1.jpg'),
//       createdAt: '2025-01-18T10:00:00Z',
//     },
//     {
//       id: 5,
//       name: 'Guerlain 嬌蘭尾牙',
//       description: '精品品牌尾牙活動氣球裝飾',
//       price: 16000,
//       category: 'corporate',
//       imageUrl: assetPath('/images/products/1070207 Guerlain 嬌蘭尾牙3.1.jpg'),
//       createdAt: '2025-01-19T10:00:00Z',
//     },
//     {
//       id: 6,
//       name: 'PIXNET 痞客幫尾牙',
//       description: '網路公司尾牙活動佈置',
//       price: 14000,
//       category: 'corporate',
//       imageUrl: assetPath('/images/products/1070210 PIXNET痞客幫尾牙1.1.jpg'),
//       createdAt: '2025-01-20T10:00:00Z',
//     },
//     {
//       id: 7,
//       name: '親子音樂劇佈置',
//       description: '刺點皮影親子音樂劇場景氣球佈置',
//       price: 8500,
//       category: 'party',
//       imageUrl: assetPath(
//         '/images/products/1070210 刺點皮影親子音樂劇--跟著阿嬤去旅行1.1.jpg'
//       ),
//       createdAt: '2025-01-21T10:00:00Z',
//     },
//     {
//       id: 8,
//       name: '生日抓週派對',
//       description: '寶寶生日抓週主題氣球佈置',
//       price: 6800,
//       category: 'birthday',
//       featured: true,
//       imageUrl: assetPath('/images/products/1070727 生日抓週派對4.1.jpg'),
//       createdAt: '2025-01-22T10:00:00Z',
//     },
//     {
//       id: 9,
//       name: 'PTC 家庭日活動',
//       description: '賽車餐廳家庭日氣球佈置',
//       price: 9500,
//       category: 'party',
//       imageUrl: assetPath('/images/products/1070824 賽車餐廳PTC家庭日 2.1.jpg'),
//       createdAt: '2025-01-23T10:00:00Z',
//     },
//     {
//       id: 10,
//       name: 'PWC 事務所商會',
//       description: '會計事務所商業活動佈置',
//       price: 13000,
//       category: 'corporate',
//       imageUrl: assetPath('/images/products/1070721 PWC事務所 商會1.1.jpg'),
//       createdAt: '2025-01-24T10:00:00Z',
//     },
//   ];
// }

export async function fetchProductById(id: number): Promise<Product> {
  return apiClient.get<Product>(`/api/products/${id}`);
}

export async function fetchProductImages(id: number): Promise<ProductImage[]> {
  return apiClient.get<ProductImage[]>(`/api/products/${id}/images`);
}

/**
 * 查詢特定分類的產品
 */
export async function fetchProductsByCategory(
  categoryId: number
): Promise<Product[]> {
  return apiClient.get<Product[]>(`/api/categories/${categoryId}/products`);
}

/**
 * 創建產品（ADMIN only）
 */
export async function createProduct(data: Partial<Product>): Promise<Product> {
  return apiClient.post<Product>('/api/products', data, {
    requiresAuth: true,
  });
}

/**
 * 更新產品（ADMIN only）
 */
export async function updateProduct(
  id: number,
  data: Partial<Product>
): Promise<Product> {
  return apiClient.put<Product>(`/api/products/${id}`, data, {
    requiresAuth: true,
  });
}

/**
 * 刪除產品（ADMIN only）
 */
export async function deleteProduct(id: number): Promise<void> {
  return apiClient.delete<void>(`/api/products/${id}`, {
    requiresAuth: true,
  });
}
