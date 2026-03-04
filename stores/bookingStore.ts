import { create } from 'zustand';

import type { Service, Staff, CustomerInfo } from '@/types/booking';

interface BookingState {
  // ===== 流程控制 =====
  currentStep: number;

  // ===== 服務選擇 =====
  selectedService: Service | null;
  totalPrice: number;

  // ===== 表演者 =====
  selectedPerformer: Staff | null;

  // ===== 時間資訊 =====
  // 佈置類：完成時間點
  completionTime: Date | null;

  // 表演類：表演時段
  performanceStart: Date | null;
  performanceEnd: Date | null;

  // ===== 客戶資料 =====
  customerInfo: CustomerInfo | null;

  // ===== 付款方式 =====
  paymentMethod: 'online' | 'onsite' | null;

  // ===== 預約結果 =====
  bookingReference: string | null;

  // ===== Actions =====
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelectedService: (service: Service | null) => void;
  setSelectedPerformer: (performer: Staff | null) => void;
  setCompletionTime: (time: Date | null) => void;
  setPerformanceTime: (start: Date | null, end: Date | null) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setPaymentMethod: (method: 'online' | 'onsite') => void;
  setBookingReference: (ref: string) => void;
  resetFormFields: () => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  // ===== Initial State =====
  currentStep: 1,
  selectedService: null,
  totalPrice: 0,
  selectedPerformer: null,
  completionTime: null,
  performanceStart: null,
  performanceEnd: null,
  customerInfo: null,
  paymentMethod: null,
  bookingReference: null,

  // ===== Actions =====
  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 4),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  setSelectedService: (service) =>
    set({
      selectedService: service,
      totalPrice: service ? service.price : 0,
      // 切換服務時清空表演者和時間
      selectedPerformer: null,
      completionTime: null,
      performanceStart: null,
      performanceEnd: null,
    }),

  setSelectedPerformer: (performer) => set({ selectedPerformer: performer }),

  setCompletionTime: (time) => set({ completionTime: time }),

  setPerformanceTime: (start, end) =>
    set({ performanceStart: start, performanceEnd: end }),

  setCustomerInfo: (info) => set({ customerInfo: info }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  setBookingReference: (ref) => set({ bookingReference: ref }),

  resetFormFields: () =>
    set({
      currentStep: 1,
      selectedService: null,
      totalPrice: 0,
      selectedPerformer: null,
      completionTime: null,
      performanceStart: null,
      performanceEnd: null,
      customerInfo: null,
      paymentMethod: null,
      // bookingReference 保留，讓成功頁繼續顯示
    }),

  resetBooking: () =>
    set({
      currentStep: 1,
      selectedService: null,
      totalPrice: 0,
      selectedPerformer: null,
      completionTime: null,
      performanceStart: null,
      performanceEnd: null,
      customerInfo: null,
      paymentMethod: null,
      bookingReference: null,
    }),
}));
