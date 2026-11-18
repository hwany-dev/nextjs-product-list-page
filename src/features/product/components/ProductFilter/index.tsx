'use client';

import { Fragment } from 'react';

import { PRODUCT_TYPE_FILTERS } from '../../model/constants';
import type { ProductTypeFilter } from '../../model/types';

import styles from './ProductFilter.module.scss';

type ProductFilterProps = {
  value: ProductTypeFilter;
  onChange: (value: ProductTypeFilter) => void;
  panelId: string; // 탭이 제어하는 목록 영역의 id
};

export const getProductFilterTabId = (value: ProductTypeFilter) => `product-filter-tab-${value}`;

export function ProductFilter({ value, onChange, panelId }: ProductFilterProps) {
  return (
    <div role="tablist" aria-label="교재 유형" className={styles.tabs}>
      {PRODUCT_TYPE_FILTERS.map((filter, index) => (
        <Fragment key={filter.value}>
          {/* 구분자를 버튼 밖에 둬서 클릭 영역과 스크린 리더 낭독에서 빠지게 한다. */}
          {index > 0 ? (
            <span className={styles.divider} aria-hidden="true">
              |
            </span>
          ) : null}
          <button
            type="button"
            role="tab"
            id={getProductFilterTabId(filter.value)}
            aria-selected={filter.value === value}
            aria-controls={panelId}
            className={styles.tab}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
