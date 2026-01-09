const basePath = '/boomparty'; // 移除 /boomparty，部署到根路徑

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
