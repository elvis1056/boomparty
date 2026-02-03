// 透過環境變數控制 basePath，支援多環境部署
// - GitHub Pages: NEXT_PUBLIC_BASE_PATH 未設定 → 預設 '/boomparty'
// - NAS:          NEXT_PUBLIC_BASE_PATH='' → 根路徑
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : '/boomparty';

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
