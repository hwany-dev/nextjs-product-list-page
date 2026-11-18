import type { ProductType } from './types';

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  single: '단품',
  pass: '패스',
};

// 4열 × 3행
export const PRODUCTS_PAGE_SIZE = 12;
