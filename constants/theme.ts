export const colors = {
  // Primary - 蒂芙尼藍系列（清新、優雅、海洋風）
  primary: {
    main: '#00CED1', // 蒂芙尼藍
    light: '#40E0D0', // 淺藍綠
    dark: '#008B8B', // 深青色
    50: '#E0F7F8', // 最淺（淡藍白）
    100: '#B3EFEF', // 很淺
    200: '#40E0D0', // 淺色
    300: '#00CED1', // 主色
    400: '#008B8B', // 深色
    500: '#006666', // 最深
  },

  // Secondary - 溫暖橘色系列（點綴、活力）
  secondary: {
    main: '#FFB366', // 溫暖橘
    light: '#FFCC99', // 淺橘
    dark: '#FF9933', // 深橘
  },

  // Accent - 燭光橘與沙灘色點綴
  accent: {
    main: '#FFA040', // 燭光橘
    light: '#FFB570', // 淺燭光
    dark: '#FF8820', // 深燭光
    sand: '#D4C4A8', // 沙灘色
  },

  // Neutral - 中性色
  neutral: {
    white: '#FFFFFF',
    gray50: '#F8F8F8',
    gray100: '#F0F0F0',
    gray200: '#E5E5E5',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray900: '#111827',
    black: '#000000',
  },

  // Semantic - 語意色
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#00CED1', // 使用主色調

  // Background
  background: {
    default: '#FFFFFF', // 純白
    paper: '#F8F8F8', // 卡片背景淡灰白
    hover: '#F0F0F0', // hover 淺灰
  },

  // Border
  border: {
    light: '#E0F7F8', // 淺藍白
    main: '#40E0D0', // 淺藍綠
    dark: '#00CED1', // 蒂芙尼藍
  },

  // Text
  text: {
    primary: '#2C3E50', // 主要文字：深灰藍
    secondary: '#7F8C8D', // 次要文字：中灰
    disabled: '#BDC3C7', // 禁用文字：淺灰
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'inherit',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 206, 209, 0.06)', // 蒂芙尼藍陰影
  md: '0 2px 8px rgba(0, 206, 209, 0.1)',
  lg: '0 4px 16px rgba(0, 206, 209, 0.15)',
} as const;

export const zIndex = {
  base: 1,
  dropdown: 10,
  navbar: 100,
  mobileMenu: 101,
  modal: 200,
  modalBackdrop: 199,
  notification: 300,
  overlay: 1000,
} as const;

export const theme = {
  colors,
  spacing,
  typography,
  breakpoints,
  shadows,
  zIndex,
} as const;
