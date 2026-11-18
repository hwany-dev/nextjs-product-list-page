'use client';

import { Suspense, useEffect, useRef, type ReactNode } from 'react';

import { Button } from '@/shared/ui/Button';
import { Pagination } from '@/shared/ui/Pagination';
import { StatusMessage } from '@/shared/ui/StatusMessage';

import { useProducts } from '../../hooks/useProducts';
import { useProductSearchParams } from '../../hooks/useProductSearchParams';
import type { ProductTypeFilter } from '../../model/types';
import { ProductFilter, getProductFilterTabId } from '../ProductFilter';
import { ProductGrid, ProductGridSkeleton } from '../ProductGrid';
import { ProductSearch } from '../ProductSearch';

import styles from './ProductListSection.module.scss';

const PANEL_ID = 'product-list-panel';

function SectionShell({ children }: { children: ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby="product-list-heading">
      <h2 id="product-list-heading" className={styles.srOnly}>
        교재 목록
      </h2>
      {children}
    </section>
  );
}

function ProductListContent() {
  const { params, updateParams } = useProductSearchParams();
  const { data, isPending, isError, isFetching, isPlaceholderData, refetch } = useProducts(params);
  const panelRef = useRef<HTMLDivElement>(null);

  // 주소창에 없는 페이지(예: 3페이지까지인데 ?page=10)를 넣으면 마지막 페이지로 보정한다.
  useEffect(() => {
    if (data && data.totalPages > 0 && params.page > data.totalPages) {
      updateParams({ page: data.totalPages }, { replace: true });
    }
  }, [data, params.page, updateParams]);

  // 조건이 바뀌면 결과가 달라지므로 1페이지부터 다시 보여 준다.
  function handleTypeChange(type: ProductTypeFilter) {
    updateParams({ type, page: 1 });
  }

  function handleKeywordChange(keyword: string) {
    if (keyword === params.keyword) return;
    updateParams({ keyword, page: 1 }, { replace: true });
  }

  function handlePageChange(page: number) {
    updateParams({ page });
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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

    return (
      <>
        {/* 이전 페이지 데이터를 보여 주는 동안 흐리게 처리해 새 결과를 불러오는 중임을 알린다. */}
        <div className={isPlaceholderData ? styles.stale : undefined}>
          <ProductGrid products={data.items} />
        </div>
        <div className={styles.pagination}>
          <Pagination
            page={params.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  }

  return (
    <SectionShell>
      <div className={styles.toolbar} ref={panelRef}>
        <ProductSearch keyword={params.keyword} onKeywordChange={handleKeywordChange} />
        <ProductFilter value={params.type} onChange={handleTypeChange} panelId={PANEL_ID} />
      </div>

      {/* 스크린 리더에 결과 개수 변화를 알린다. */}
      <p className={styles.srOnly} role="status">
        {data ? `교재 ${data.totalCount}개` : ''}
      </p>

      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={getProductFilterTabId(params.type)}
        aria-busy={isFetching}
        className={styles.panel}
      >
        {renderContent()}
      </div>
    </SectionShell>
  );
}

// 상품 데이터를 CSR로 불러오는 클라이언트 섹션.
// useSearchParams는 정적 렌더링 시점에 값을 알 수 없어 Suspense 경계가 필요하다.
// 그 사이에는 같은 크기의 스켈레톤을 보여 줘 레이아웃이 밀리지 않게 한다.
export function ProductListSection() {
  return (
    <Suspense
      fallback={
        <SectionShell>
          <div className={styles.toolbarPlaceholder} />
          <div className={styles.panel}>
            <ProductGridSkeleton />
          </div>
        </SectionShell>
      }
    >
      <ProductListContent />
    </Suspense>
  );
}
