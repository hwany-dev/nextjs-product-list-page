import { supabase } from '@/shared/lib/supabase/client';

import { PRODUCTS_PAGE_SIZE } from '../model/constants';
import { toProduct } from '../model/mapper';
import type { Product, ProductTypeFilter } from '../model/types';

export type GetProductsParams = {
  type: ProductTypeFilter;
  keyword: string;
  page: number; // 1부터 시작
};

export type ProductsPage = {
  items: Product[];
  totalCount: number;
  totalPages: number;
};

// 요청한 범위가 전체 개수를 넘을 때 PostgREST가 돌려주는 에러 코드 (예: 3페이지까지인데 ?page=10)
const RANGE_NOT_SATISFIABLE = 'PGRST103';

// 검색어의 %, _ 는 LIKE에서 와일드카드라서, 사용자가 입력한 그대로 찾도록 이스케이프한다.
function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

// 목록 조회와 개수 조회가 같은 조건을 쓰도록 필터를 한곳에서 만든다.
function buildQuery({ type, keyword }: Omit<GetProductsParams, 'page'>, head = false) {
  let query = supabase.from('products').select('*', { count: 'exact', head });

  if (type !== 'all') {
    query = query.eq('type', type);
  }

  const trimmed = keyword.trim();
  if (trimmed) {
    query = query.ilike('title', `%${escapeLikePattern(trimmed)}%`);
  }

  return query;
}

function toTotalPages(totalCount: number): number {
  return Math.ceil(totalCount / PRODUCTS_PAGE_SIZE);
}

export async function getProducts(
  params: GetProductsParams,
  signal?: AbortSignal,
): Promise<ProductsPage> {
  const from = (params.page - 1) * PRODUCTS_PAGE_SIZE;
  const to = from + PRODUCTS_PAGE_SIZE - 1;

  let query = buildQuery(params)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .range(from, to);

  // 검색어를 빠르게 바꿀 때 이전 요청을 취소할 수 있게 한다.
  if (signal) {
    query = query.abortSignal(signal);
  }

  const { data, count, error } = await query;

  if (error?.code === RANGE_NOT_SATISFIABLE) {
    // 없는 페이지를 요청한 경우. 에러 대신 빈 목록과 실제 전체 개수를 돌려줘
    // 화면에서 마지막 페이지로 보정할 수 있게 한다.
    const { count: totalCount, error: countError } = await buildQuery(params, true);
    if (countError) throw countError;
    const total = totalCount ?? 0;
    return { items: [], totalCount: total, totalPages: toTotalPages(total) };
  }

  if (error) throw error;

  const totalCount = count ?? 0;
  return {
    items: data.map(toProduct),
    totalCount,
    totalPages: toTotalPages(totalCount),
  };
}
