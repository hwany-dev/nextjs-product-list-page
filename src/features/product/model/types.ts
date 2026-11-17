// 상품 도메인 타입. UI는 DB row 대신 이 타입만 사용한다.

export const PRODUCT_TYPES = ['single', 'pass'] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

// 필터 탭 값. 'all'은 DB 값이 아니라 "필터 없음"을 뜻한다.
export type ProductTypeFilter = 'all' | ProductType;

export type Product = {
  id: string;
  title: string;
  type: ProductType;
  price: number;
  salePrice: number | null;
  thumbnailUrl: string;
  season: number | null;
};
