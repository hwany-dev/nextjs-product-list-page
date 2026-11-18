'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import type { GetProductsParams } from '../api/getProducts';
import { parseProductSearchParams, toProductSearchString } from '../model/searchParams';

type UpdateOptions = {
  // 검색어 입력처럼 연속으로 바뀌는 값은 뒤로 가기 기록을 쌓지 않도록 replace한다.
  replace?: boolean;
};

// 필터·검색어·페이지의 "단일 출처"는 URL이다.
// 새로고침하거나 링크를 공유해도 같은 목록이 보이고, 뒤로 가기로 이전 조건에 돌아갈 수 있다.
export function useProductSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = useMemo(() => parseProductSearchParams(searchParams), [searchParams]);

  const updateParams = useCallback(
    (next: Partial<GetProductsParams>, { replace = false }: UpdateOptions = {}) => {
      const merged = { ...params, ...next };
      const url = `${pathname}${toProductSearchString(merged)}`;
      if (replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [params, pathname, router],
  );

  return { params, updateParams };
}
