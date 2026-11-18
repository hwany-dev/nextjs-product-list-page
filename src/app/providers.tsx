'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

// 상품 목록은 자주 바뀌지 않으므로 1분 동안은 다시 요청하지 않고 캐시를 쓴다.
const STALE_TIME_MS = 60 * 1000;

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function Providers({ children }: { children: ReactNode }) {
  // 모듈 스코프에 두면 서버 렌더링 시 여러 사용자가 캐시를 공유할 수 있어,
  // 컴포넌트마다 한 번만 만들도록 useState 초기화 함수로 생성한다.
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
