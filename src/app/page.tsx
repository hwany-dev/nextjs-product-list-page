import { ProductListSection } from '@/features/product';
import { HeroBanner } from '@/widgets/HeroBanner';

import styles from './page.module.scss';

// 레이아웃 조립만 한다. 상품 데이터는 ProductListSection(클라이언트 컴포넌트)이 CSR로 불러온다.
export default function Home() {
  return (
    <main>
      <h1 className={styles.srOnly}>히든카이스 스토어</h1>
      <HeroBanner />
      <ProductListSection />
    </main>
  );
}
