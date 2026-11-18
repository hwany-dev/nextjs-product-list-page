import type { GetProductsParams } from '../api/getProducts';

import { PRODUCT_TYPES, type ProductTypeFilter } from './types';

// URL 쿼리스트링 ↔ 조회 조건 변환. 예: ?type=pass&q=시즌&page=2
// 주소창은 누구나 고칠 수 있으므로 잘못된 값은 기본값으로 되돌린다.

type ReadonlySearchParams = Pick<URLSearchParams, 'get'>;

function parseType(value: string | null): ProductTypeFilter {
  return PRODUCT_TYPES.find((type) => type === value) ?? 'all';
}

function parsePage(value: string | null): number {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function parseProductSearchParams(searchParams: ReadonlySearchParams): GetProductsParams {
  return {
    type: parseType(searchParams.get('type')),
    keyword: (searchParams.get('q') ?? '').trim(),
    page: parsePage(searchParams.get('page')),
  };
}

// 기본값(전체, 검색어 없음, 1페이지)은 URL에 쓰지 않아 주소를 짧게 유지한다.
export function toProductSearchString({ type, keyword, page }: GetProductsParams): string {
  const searchParams = new URLSearchParams();
  if (type !== 'all') searchParams.set('type', type);
  if (keyword) searchParams.set('q', keyword);
  if (page > 1) searchParams.set('page', String(page));
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}
