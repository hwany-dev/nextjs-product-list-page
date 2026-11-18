import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/ui/Icon';

import styles from './Pagination.module.scss';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
};

// 현재 페이지를 가운데 두고 최대 maxVisible개 번호를 보여 준다.
// 예: 총 10페이지, 현재 6 → [4, 5, 6, 7, 8]
export function getVisiblePages(page: number, totalPages: number, maxVisible: number): number[] {
  const count = Math.min(maxVisible, totalPages);
  const start = Math.min(Math.max(page - Math.floor(count / 2), 1), totalPages - count + 1);
  return Array.from({ length: count }, (_, index) => start + index);
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(page, totalPages, maxVisiblePages);

  return (
    <nav className={styles.pagination} aria-label="페이지 이동">
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((pageNumber) => {
        const isCurrent = pageNumber === page;
        return (
          <button
            key={pageNumber}
            type="button"
            className={styles.button}
            onClick={() => onPageChange(pageNumber)}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={`${pageNumber}페이지`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="다음 페이지"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
