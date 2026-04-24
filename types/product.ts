export interface ProductImage {
  id: number;
  url: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
  active: boolean;
  categoryId: number | null;
  categoryName: string;
  parentCategoryId: number | null;
  parentCategoryName: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
