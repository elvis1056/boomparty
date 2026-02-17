// 服務分類
export const SERVICE_CATEGORY = {
  ALL: 'all',
  VENUE: 'venue',
  BALLOON: 'balloon',
  BACKDROP: 'backdrop',
  // PLANNING: 'planning',
  // PHOTOGRAPHY: 'photography',
  // HOSTING: 'hosting',
  // OTHER: 'other',
} as const;

// 付款方式
export const PAYMENT_METHOD = {
  ONLINE: 'online',
  ONSITE: 'onsite',
} as const;

// 預約步驟
export const BOOKING_STEP = {
  SERVICE: 1,
  STAFF: 2,
  FORM: 3,
  CONFIRM: 4,
} as const;

// 預約步驟標籤
export const BOOKING_STEP_LABELS = [
  { number: BOOKING_STEP.SERVICE, label: '選擇服務' },
  { number: BOOKING_STEP.STAFF, label: '選擇表演者' },
  { number: BOOKING_STEP.FORM, label: '填寫資料' },
  { number: BOOKING_STEP.CONFIRM, label: '確認預約' },
];

// TypeScript 類型導出
export type ServiceCategoryType =
  (typeof SERVICE_CATEGORY)[keyof typeof SERVICE_CATEGORY];
export type PaymentMethodType =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
export type BookingStepType = (typeof BOOKING_STEP)[keyof typeof BOOKING_STEP];
