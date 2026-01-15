import { mockCategories } from '@/constants/mockCategories';
import type { ShopCategory, CategoryChild, CategoryRequest } from '@/types';

import { apiClient } from './client';

/**
 * 查詢所有分類
 */
export async function fetchCategories(): Promise<ShopCategory[]> {
  // 模擬網路延遲
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCategories;

  // 真實 API（已註解）
  // return apiClient.get<ShopCategory[]>('/api/categories');
}

/**
 * 查詢所有頂層分類
 */
export async function fetchTopLevelCategories(): Promise<ShopCategory[]> {
  // 模擬網路延遲
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCategories.filter((cat) => cat.isTopLevel);

  // 真實 API（已註解）
  // return apiClient.get<ShopCategory[]>('/api/categories/top-level');
}

/**
 * 查詢單一分類
 */
export async function fetchCategoryById(id: number): Promise<ShopCategory> {
  return apiClient.get<ShopCategory>(`/api/categories/${id}`);
}

/**
 * 查詢特定分類的子分類
 */
export async function fetchCategoryChildren(
  parentId: number
): Promise<CategoryChild[]> {
  return apiClient.get<CategoryChild[]>(`/api/categories/${parentId}/children`);
}

/**
 * 創建分類（ADMIN only）
 */
export async function createCategory(
  data: CategoryRequest
): Promise<ShopCategory> {
  return apiClient.post<ShopCategory>('/api/categories', data, {
    requiresAuth: true,
  });
}

/**
 * 更新分類（ADMIN only）
 */
export async function updateCategory(
  id: number,
  data: CategoryRequest
): Promise<ShopCategory> {
  return apiClient.put<ShopCategory>(`/api/categories/${id}`, data, {
    requiresAuth: true,
  });
}

/**
 * 刪除分類（ADMIN only）
 */
export async function deleteCategory(id: number): Promise<void> {
  return apiClient.delete<void>(`/api/categories/${id}`, {
    requiresAuth: true,
  });
}
