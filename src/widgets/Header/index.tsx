import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';

import { BellIcon, CartIcon, UserIcon } from '@/shared/ui/Icon';

import styles from './Header.module.scss';

type NavItem = { label: string; href: string; isActive?: boolean };

// 스토어 외 메뉴는 범위 밖이라 링크만 둔다.
const NAV_ITEMS: NavItem[] = [
  { label: '스토어', href: '/', isActive: true },
  { label: 'AI OMR WORK', href: '#' },
  { label: '챌린지', href: '#' },
  { label: '히든카이스 소개', href: '#' },
];

type UtilityItem = {
  label: string;
  Icon: ComponentType;
  badgeCount?: number;
};

// 장바구니·알림·로그인은 UI만 구현한다. 배지 숫자는 시안 값을 그대로 쓴다.
const UTILITY_ITEMS: UtilityItem[] = [
  { label: '장바구니', Icon: CartIcon, badgeCount: 1 },
  { label: '알림', Icon: BellIcon, badgeCount: 1 },
  { label: '내 정보', Icon: UserIcon },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.svg" alt="HIDDEN KICE" width={143} height={18} preload />
        </Link>

        <nav className={styles.nav} aria-label="주요 메뉴">
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ label, href, isActive }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={styles.navLink}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.utilities}>
          {UTILITY_ITEMS.map(({ label, Icon, badgeCount }) => (
            <li key={label}>
              <a
                href="#"
                className={styles.utilityLink}
                aria-label={badgeCount ? `${label} ${badgeCount}개` : label}
              >
                <Icon />
                {badgeCount ? (
                  <span className={styles.badge} aria-hidden="true">
                    {badgeCount}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
