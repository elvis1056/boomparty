# Typography Design System 規劃

> 參考：Apple Human Interface Guidelines — Typography
> 狀態：📋 待實作（大改動）

---

## 目前 theme.ts 的問題

### 1. 缺少語義化層級

目前只有尺寸命名（xs/sm/base/lg/xl/2xl/3xl），開發時不知道該用哪個。

Apple 用語義化命名：

| Token | 用途 | 對應 HTML |
|-------|------|-----------|
| display | 頁面最大標題（hero、登陸頁） | — |
| title1 | 區塊大標題 | h1 |
| title2 | 次要標題 | h2 |
| title3 | 小標題 | h3 |
| headline | 強調文字（semibold） | — |
| body | 正文（閱讀用） | p |
| callout | 輔助說明文字 | — |
| subhead | 次要說明 | — |
| caption | 圖說、標籤、小字 | label, figcaption |
| footnote | 最小文字 | — |

---

### 2. 缺少 line-height（行距）

| 用途 | line-height |
|------|-------------|
| Display / 大標題 | 1.1 ～ 1.2 |
| Title / 小標題 | 1.3 ～ 1.4 |
| Body / 正文 | 1.5 ～ 1.7 |
| Caption / 小字 | 1.3 ～ 1.5 |

---

### 3. 缺少 letter-spacing（字距）

| 用途 | letter-spacing |
|------|---------------|
| 大標題 | -0.02em ～ -0.03em（讓大字更緊緻） |
| 正文 | 0 ～ 0.01em |
| 全大寫標籤 | 0.05em ～ 0.1em |

---

### 4. spacing 少了 12px

目前：`4 → 8 → 16 → 24 → 32 → 48 → 64`

問題：跳過了 12px，按鈕 padding、icon gap 常會用到。

建議：`4 → 8 → 12 → 16 → 24 → 32 → 48 → 64`

---

### 5. 沒有響應式字體縮放

Apple Dynamic Type 核心概念：同一個語義 token，在不同裝置給不同的 px 值。

| Token | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| display | 64px | 48px | 36px |
| title1 | 40px | 32px | 28px |
| title2 | 32px | 28px | 24px |
| title3 | 24px | 22px | 20px |
| body | 16px | 16px | 15px |
| caption | 14px | 13px | 13px |

---

## 改動方案

### 方案 A（建議）：保持現有尺寸制 + 新增語義層

改動小，現有 code 不需要大量修改。

```typescript
export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'inherit',
  },

  // 現有尺寸 scale（保留不動）
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px  ← 新增
    '5xl': '3rem',    // 48px  ← 新增
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 新增：行距
  lineHeight: {
    tight: 1.1,     // 大標題
    snug: 1.3,      // 小標題
    normal: 1.5,    // 通用
    relaxed: 1.6,   // 正文
    loose: 1.8,     // 需要大空間的正文
  },

  // 新增：字距
  letterSpacing: {
    tight: '-0.02em',   // 大標題
    normal: '0em',      // 通用
    wide: '0.05em',     // 全大寫標籤
    wider: '0.1em',     // 特殊強調
  },
} as const;
```

### spacing 補 12px

```typescript
export const spacing = {
  xs: '4px',
  sm: '8px',
  md_sm: '12px',  // ← 新增
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;
```

---

### 方案 B：完整語義化 token（大改動，需調整所有現有 code）

```typescript
export const textStyles = {
  display: {
    size: { desktop: '4xl', tablet: '3xl', mobile: '2xl' },
    weight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  title1: {
    size: { desktop: '3xl', tablet: '2xl', mobile: 'xl' },
    weight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  title2: {
    size: { desktop: '2xl', tablet: 'xl', mobile: 'xl' },
    weight: 600,
    lineHeight: 1.3,
    letterSpacing: '0',
  },
  title3: {
    size: { desktop: 'xl', tablet: 'xl', mobile: 'lg' },
    weight: 600,
    lineHeight: 1.4,
    letterSpacing: '0',
  },
  body: {
    size: { desktop: 'base', tablet: 'base', mobile: 'base' },
    weight: 400,
    lineHeight: 1.6,
    letterSpacing: '0',
  },
  caption: {
    size: { desktop: 'sm', tablet: 'sm', mobile: 'sm' },
    weight: 400,
    lineHeight: 1.4,
    letterSpacing: '0',
  },
  footnote: {
    size: { desktop: 'xs', tablet: 'xs', mobile: 'xs' },
    weight: 400,
    lineHeight: 1.3,
    letterSpacing: '0.01em',
  },
} as const;
```

---

## 實作影響評估

做方案 A 時需要調整的檔案：
- `constants/theme.ts` — 新增 lineHeight、letterSpacing、補 spacing 12px
- 所有 `style.ts` — 補上 line-height 和 letter-spacing（目前都是各自寫死）
- `global.css` 或 `layout.tsx` — 設定 body 的預設字體

做方案 B 需要額外：
- 所有 `style.ts` 的字體大小改用語義 token
- 需要確認 TypeScript 支援（巢狀 token 取值方式）

---

## 參考資料

- [Apple HIG — Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [Material Design Type Scale](https://m3.material.io/styles/typography/type-scale-tokens)
- [Tailwind CSS Typography Scale](https://tailwindcss.com/docs/font-size)
