import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';

import {
  addToCart,
  clearCart,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '@/lib/api/cart';
import type { Cart, GuestCartItem } from '@/types';

interface CartStore {
  // 登入用戶的 server 購物車
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  // 未登入時的本地購物車（persist 到 localStorage）
  guestItems: GuestCartItem[];

  // Server cart actions
  loadCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearAllItems: () => Promise<void>;

  // Guest cart actions
  addGuestItem: (item: GuestCartItem) => void;
  removeGuestItem: (productId: number) => void;
  clearGuestItems: () => void;
  syncGuestCart: () => Promise<void>;

  // Computed values
  getTotalItems: () => number;
  getTotalAmount: () => number;
  getTotalGuestItems: () => number;
}

const GUEST_CART_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 天

const ttlStorage = {
  getItem: (name: string) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.savedAt > GUEST_CART_TTL_MS) {
      localStorage.removeItem(name);
      return null;
    }
    return parsed.data;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(
      name,
      JSON.stringify({ data: value, savedAt: Date.now() })
    );
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,
      guestItems: [],

      // 載入購物車
      loadCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const cart = await fetchCart();
          set({ cart, isLoading: false });
        } catch (error) {
          console.error('Failed to load cart:', error);
          set({
            error:
              error instanceof Error ? error.message : 'Failed to load cart',
            isLoading: false,
          });
        }
      },

      // 加入商品到購物車
      addItem: async (productId: number, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await addToCart({ productId, quantity });
          set({ cart, isLoading: false });
        } catch (error) {
          console.error('Failed to add item:', error);
          set({
            error:
              error instanceof Error ? error.message : 'Failed to add item',
            isLoading: false,
          });
          throw error;
        }
      },

      // 更新商品數量
      updateQuantity: async (itemId: number, quantity: number) => {
        const prevCart = get().cart;
        if (prevCart) {
          const updatedCart = {
            ...prevCart,
            items: prevCart.items.map((item) =>
              item.id === itemId
                ? { ...item, quantity, subtotal: item.productPrice * quantity }
                : item
            ),
          };
          set({ cart: updatedCart });
        }

        try {
          const cart = await updateCartItem(itemId, { quantity });
          set({ cart, error: null });
        } catch (error) {
          console.error('Failed to update quantity:', error);
          set({
            cart: prevCart,
            error:
              error instanceof Error
                ? error.message
                : 'Failed to update quantity',
          });
          throw error;
        }
      },

      // 移除商品
      removeItem: async (itemId: number) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await removeCartItem(itemId);
          set({ cart, isLoading: false });
        } catch (error) {
          console.error('Failed to remove item:', error);
          set({
            error:
              error instanceof Error ? error.message : 'Failed to remove item',
            isLoading: false,
          });
          throw error;
        }
      },

      // 清空購物車
      clearAllItems: async () => {
        set({ isLoading: true, error: null });
        try {
          await clearCart();
          set({ cart: null, isLoading: false });
        } catch (error) {
          console.error('Failed to clear cart:', error);
          set({
            error:
              error instanceof Error ? error.message : 'Failed to clear cart',
            isLoading: false,
          });
          throw error;
        }
      },

      // 加入 guest cart（相同 productId 累加數量）
      addGuestItem: (item: GuestCartItem) => {
        const existing = get().guestItems.find(
          (i) => i.productId === item.productId
        );
        if (existing) {
          set({
            guestItems: get().guestItems.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ guestItems: [...get().guestItems, item] });
        }
      },

      // 移除 guest cart 單筆
      removeGuestItem: (productId: number) => {
        set({
          guestItems: get().guestItems.filter((i) => i.productId !== productId),
        });
      },

      // 清空 guest cart（登出時呼叫）
      clearGuestItems: () => {
        set({ guestItems: [] });
      },

      // 登入後將 guest cart 同步至 server，逐一呼叫 addItem API
      // 單筆失敗不中斷，同步完成後清空 guest cart
      syncGuestCart: async () => {
        const { guestItems } = get();
        if (guestItems.length === 0) return;

        for (const item of guestItems) {
          try {
            await get().addItem(item.productId, item.quantity);
          } catch (error) {
            console.error(
              `Failed to sync guest item "${item.productName}":`,
              error
            );
          }
        }
        get().clearGuestItems();
      },

      // Getters
      getTotalItems: () => {
        return get().cart?.totalItems || 0;
      },

      getTotalAmount: () => {
        return get().cart?.totalAmount || 0;
      },

      getTotalGuestItems: () => {
        return get().guestItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'boomparty-guest-cart',
      // 只持久化 guestItems，server cart 不存 localStorage
      partialize: (state) => ({ guestItems: state.guestItems }),
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          } satisfies StateStorage;
        }
        return ttlStorage;
      }),
      skipHydration: true,
    }
  )
);
