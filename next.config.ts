import type { NextConfig } from 'next';

// 根據環境變數決定是否靜態導出
const isStatic = process.env.NEXT_PUBLIC_BUILD_MODE === 'static';

const nextConfig: NextConfig = {
  // GitHub Pages 靜態模式 / NAS 動態模式
  ...(isStatic && { output: 'export' }),
  // 兩種模式都部署到根目錄
  basePath: '',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.boomparty.tw',
        pathname: '/media/**',
      },
    ],
  },
  turbopack: {},
  webpack: (config) => {
    // 允許 import .md 檔案為字串（使用 Webpack 5 內建的 asset/source）
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
