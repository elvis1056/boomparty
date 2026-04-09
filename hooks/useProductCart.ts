import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types';

interface UseProductCartReturn {
  quantity: number;
  isAdding: boolean;
  justAdded: boolean;
  maxStock: number;
  isOutOfStock: boolean;
  isLoggedIn: boolean;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  changeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blurQuantity: () => void;
  clickQuantityInput: (e: React.MouseEvent<HTMLInputElement>) => void;
  addToCart: () => Promise<void>;
  buyNowGotoCart: () => Promise<void>;
}

export function useProductCart(product: Product): UseProductCartReturn {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.user !== null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const maxStock = product.stock ? product.stock : 99;
  const isOutOfStock = maxStock === 0;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setQuantity(0);
      return;
    }

    if (!/^[0-9]+$/.test(value)) {
      return;
    }

    const numValue = Number(value);

    if (numValue > maxStock) {
      setQuantity(maxStock);
      return;
    }

    setQuantity(numValue);
  };

  const blurQuantity = () => {
    if (quantity < 1) {
      setQuantity(1);
    }
  };

  const clickQuantityInput = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.select();
  };

  const addToCart = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (isAdding || justAdded || isOutOfStock) return;

    setIsAdding(true);
    try {
      await addItem(product.id, quantity);
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('加入購物車失敗，請稍後再試');
    } finally {
      setIsAdding(false);
    }
  };

  const buyNowGotoCart = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (isOutOfStock) return;

    try {
      await addItem(product.id, quantity);
      router.push('/cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('操作失敗，請稍後再試');
    }
  };

  return {
    quantity,
    isAdding,
    justAdded,
    maxStock,
    isOutOfStock,
    isLoggedIn,
    decreaseQuantity,
    increaseQuantity,
    changeQuantity,
    blurQuantity,
    clickQuantityInput,
    addToCart,
    buyNowGotoCart,
  };
}
