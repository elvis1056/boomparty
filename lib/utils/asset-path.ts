// 透過環境變數控制 basePath，支援多環境部署
// - 預設：根目錄 ''
// - GitHub Pages: 設定 NEXT_PUBLIC_BASE_PATH='/boomparty'
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : '';

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
