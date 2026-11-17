const priceFormatter = new Intl.NumberFormat('ko-KR');

// 64800 → '64,800원'
export function formatPrice(value: number): string {
  return `${priceFormatter.format(value)}원`;
}

// 할인율(%)을 정수로 돌려준다. 할인이 없으면 null.
// - 소수점은 버린다. 실제보다 큰 할인율을 표시하지 않기 위함이다.
// - 0.29 * 100 = 28.999… 같은 부동소수점 오차를 피하려고 정수 연산(× 100 후 나눗셈)으로 계산한다.
export function getDiscountRate(price: number, salePrice: number | null): number | null {
  if (salePrice === null || price <= 0 || salePrice >= price) {
    return null;
  }
  return Math.floor(((price - salePrice) * 100) / price);
}
