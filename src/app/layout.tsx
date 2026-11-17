import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Header } from '@/widgets/Header';

import './globals.scss';

// 한글 웹폰트는 용량이 커서, 자주 쓰는 한글(KS X 1001)만 담은 서브셋을 직접 호스팅한다.
// 디자인에서 쓰는 굵기(400·500·600·700)만 포함했다.
const pretendard = localFont({
  src: [
    { path: './fonts/Pretendard-Regular.subset.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Pretendard-Medium.subset.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Pretendard-SemiBold.subset.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Pretendard-Bold.subset.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '히든카이스 스토어',
  description: '히든카이스(HIDDEN KICE) 교재 스토어',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
