'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getProducts, type GetProductsParams } from '../api/getProducts';

// queryKey를 한곳에서 만든다. 조건(필터·검색어·페이지)이 키에 들어가므로
// 조건마다 캐시가 따로 저장되고, 한 번 본 페이지로 돌아가면 다시 요청하지 않는다.
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: GetProductsParams) => [...productKeys.lists(), params] as const,
};

export function useProducts(params: GetProductsParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ signal }) => getProducts(params, signal),
    // 페이지·필터를 바꾸는 동안 이전 목록을 유지해 화면이 스켈레톤으로 깜빡이지 않게 한다.
    placeholderData: keepPreviousData,
  });
}
