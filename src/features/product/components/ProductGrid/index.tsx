import { Skeleton } from '@/shared/ui/Skeleton';

import { PRODUCTS_PAGE_SIZE } from '../../model/constants';
import type { Product } from '../../model/types';
import { ProductCard } from '../ProductCard';

import styles from './ProductGrid.module.scss';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

// 실제 카드와 같은 그리드·크기로 자리를 잡아, 데이터가 들어와도 레이아웃이 밀리지 않게 한다.
export function ProductGridSkeleton() {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {Array.from({ length: PRODUCTS_PAGE_SIZE }, (_, index) => (
        <li key={index} className={styles.skeletonCard}>
          <Skeleton height="auto" className={styles.skeletonThumbnail} />
          <Skeleton width={40} height={20} />
          <Skeleton width="70%" height={20} />
          <Skeleton width="50%" height={24} />
        </li>
      ))}
    </ul>
  );
}
