'use client';

import { Button } from '@/shared/ui/Button';
import { StatusMessage } from '@/shared/ui/StatusMessage';

import { useProducts } from '../../hooks/useProducts';
import type { GetProductsParams } from '../../api/getProducts';
import { ProductGrid, ProductGridSkeleton } from '../ProductGrid';

import styles from './ProductListSection.module.scss';

// 필터·검색·페이지는 8단계에서 URL 쿼리스트링과 연결한다. 지금은 첫 페이지 전체 목록을 보여 준다.
const DEFAULT_PARAMS: GetProductsParams = { type: 'all', keyword: '', page: 1 };

// 상품 데이터를 CSR로 불러오는 클라이언트 섹션.
// page.tsx는 서버 컴포넌트로 두고, 데이터가 필요한 부분만 여기서 클라이언트로 분리한다.
export function ProductListSection() {
  const { data, isPending, isError, isFetching, refetch } = useProducts(DEFAULT_PARAMS);

  function renderContent() {
    if (isPending) {
      return <ProductGridSkeleton />;
    }

    if (isError) {
      return (
        <StatusMessage
          role="alert"
          title="상품을 불러오지 못했어요"
          description="잠시 후 다시 시도해 주세요."
          action={
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
              다시 시도
            </Button>
          }
        />
      );
    }

    if (data.items.length === 0) {
      return (
        <StatusMessage
          title="조건에 맞는 교재가 없어요"
          description="다른 검색어나 필터로 다시 찾아보세요."
        />
      );
    }

    return <ProductGrid products={data.items} />;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="product-list-heading"
      aria-busy={isFetching}
    >
      <h2 id="product-list-heading" className={styles.heading}>
        교재 목록
      </h2>
      {renderContent()}
    </section>
  );
}
