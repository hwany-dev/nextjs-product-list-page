import type { SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number;
};

// 아이콘은 장식 요소로 보고 스크린 리더에서 숨긴다.
// 의미 전달은 아이콘을 감싸는 버튼·링크의 aria-label이 맡는다.
function createIcon(displayName: string, path: string) {
  function Icon({ size = 24, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path d={path} />
      </svg>
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

export const CartIcon = createIcon(
  'CartIcon',
  'M2.05 2.05H4.05L6.71 14.47C6.81 14.925 7.06 15.331 7.43 15.62C7.79 15.908 8.24 16.06 8.71 16.05H18.49C18.95 16.049 19.39 15.893 19.74 15.608C20.1 15.322 20.34 14.925 20.44 14.48L22.09 7.05H5.12M9 21C9 21.552 8.55 22 8 22C7.45 22 7 21.552 7 21C7 20.448 7.45 20 8 20C8.55 20 9 20.448 9 21ZM20 21C20 21.552 19.55 22 19 22C18.45 22 18 21.552 18 21C18 20.448 18.45 20 19 20C19.55 20 20 20.448 20 21Z',
);

export const BellIcon = createIcon(
  'BellIcon',
  'M10.3 21C10.47 21.304 10.71 21.558 11.01 21.735C11.31 21.912 11.65 22.005 12 22.005C12.35 22.005 12.69 21.912 12.99 21.735C13.29 21.558 13.53 21.304 13.7 21M6 8C6 6.409 6.63 4.883 7.76 3.757C8.88 2.632 10.41 2 12 2C13.59 2 15.12 2.632 16.24 3.757C17.37 4.883 18 6.409 18 8C18 15 21 17 21 17H3C3 17 6 15 6 8Z',
);

export const UserIcon = createIcon(
  'UserIcon',
  'M19 21V19C19 17.939 18.58 16.922 17.83 16.172C17.08 15.421 16.06 15 15 15H9C7.94 15 6.92 15.421 6.17 16.172C5.42 16.922 5 17.939 5 19V21M16 7C16 9.209 14.21 11 12 11C9.79 11 8 9.209 8 7C8 4.791 9.79 3 12 3C14.21 3 16 4.791 16 7Z',
);
