import type { Tables } from '@/types/database.types';

import { PRODUCT_TYPES, type Product, type ProductType } from './types';

type ProductRow = Tables<'products'>;

// DB의 type 컬럼은 TS에서 string이라, 도메인의 'single' | 'pass'로 좁혀야 한다.
function isProductType(value: string): value is ProductType {
  return (PRODUCT_TYPES as readonly string[]).includes(value);
}

// DB row(snake_case) → 도메인(camelCase).
// DB 컬럼 이름이 바뀌어도 이 함수만 고치면 UI 코드는 영향을 받지 않는다.
export function toProduct(row: ProductRow): Product {
  // DB CHECK 제약으로 막혀 있어 정상이라면 일어나지 않는다. 일어나면 데이터 오류이므로 숨기지 않는다.
  if (!isProductType(row.type)) {
    throw new Error(`알 수 없는 상품 타입입니다: ${row.type} (id: ${row.id})`);
  }

  return {
    id: row.id,
    title: row.title,
    type: row.type,
    price: row.price,
    salePrice: row.sale_price,
    thumbnailUrl: row.thumbnail_url,
    season: row.season,
  };
}
