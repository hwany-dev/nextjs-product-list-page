import type { ProductType, ProductTypeFilter } from './types';

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  single: '단품',
  pass: '패스',
};

// 4열 × 3행
export const PRODUCTS_PAGE_SIZE = 12;

// 필터 탭 순서와 라벨
export const PRODUCT_TYPE_FILTERS: { value: ProductTypeFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'pass', label: PRODUCT_TYPE_LABEL.pass },
  { value: 'single', label: PRODUCT_TYPE_LABEL.single },
];

// 입력이 멈춘 뒤 이 시간이 지나야 검색 요청을 보낸다. 글자마다 요청이 나가는 것을 막는다.
export const SEARCH_DEBOUNCE_MS = 300;
