import styles from './Footer.module.scss';

const POLICY_LINKS = ['회사소개', '이용약관', '개인정보처리방침'];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav aria-label="회사 정보 및 약관">
          <ul className={styles.links}>
            {POLICY_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className={styles.info}>
          <p>
            (주)히든카이스 | 대표: 안영호 | 사업자등록번호: 735-87-02522 (
            <a href="#" className={styles.underline}>
              사업자정보확인
            </a>
            )
          </p>
          <p>
            주소: 경기도 고양시 일산서구 일현로 97-11, 56F | 통신판매업신고: 제 2024-고양일산서-1209
            | 이메일: Hidden_kice@naver.com
          </p>
        </address>

        <p className={styles.copyright}>Copyright © 2026 히든카이스. All rights reserved.</p>
      </div>
    </footer>
  );
}
