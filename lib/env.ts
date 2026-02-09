// 建構模式檢測（編譯時常數）
// 在編譯時，Next.js 會將 process.env.NEXT_PUBLIC_BUILD_MODE 替換成實際值
// 靜態建構：IS_STATIC_MODE = true
// 動態建構：IS_STATIC_MODE = false
export const IS_STATIC_MODE = process.env.NEXT_PUBLIC_BUILD_MODE === 'static';
