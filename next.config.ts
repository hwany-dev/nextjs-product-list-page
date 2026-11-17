import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  sassOptions: {
    // SCSS에서도 TS의 `@/*`처럼 src 기준 경로로 불러오기 위해 추가한다.
    // 예: @use 'shared/styles/tokens' as *;
    loadPaths: [path.join(process.cwd(), 'src')],
  },
};

export default nextConfig;
