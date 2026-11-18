import type { CSSProperties } from 'react';

import styles from './Skeleton.module.scss';

type SkeletonProps = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  className?: string;
};

// 로딩 중 자리를 잡아 두는 회색 블록. 콘텐츠가 들어올 때 레이아웃이 밀리지 않게 한다.
export function Skeleton({ width = '100%', height = '1em', className }: SkeletonProps) {
  return (
    <span
      className={className ? `${styles.skeleton} ${className}` : styles.skeleton}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
