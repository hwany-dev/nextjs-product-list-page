import Image from 'next/image';

import styles from './HeroBanner.module.scss';

// 시안의 배너 이미지(문구 포함)는 1장뿐이라 캐러셀 없이 고정 배너로 보여 준다.
export function HeroBanner() {
  return (
    <section className={styles.hero} aria-label="메인 배너">
      <Image
        src="/images/hero/hero-banner.png"
        alt="히든카이스 — 모두가 푸는 건 이유가 있습니다. 상위권이 선택한 문제집, 결과로 증명된 실전 대비서"
        fill
        sizes="100vw"
        preload
        className={styles.image}
      />
    </section>
  );
}
