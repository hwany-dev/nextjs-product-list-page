import Image from 'next/image';

import { formatPrice, getDiscountRate } from '../../lib/price';
import { PRODUCT_TYPE_LABEL } from '../../model/constants';
import type { Product } from '../../model/types';

import styles from './ProductCard.module.scss';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { title, type, price, salePrice, thumbnailUrl } = product;
  const discountRate = getDiscountRate(price, salePrice);

  return (
    <article className={styles.card}>
      <div className={styles.thumbnail}>
        <Image src={thumbnailUrl} alt={title} fill sizes="250px" className={styles.image} />
      </div>

      <p className={styles.type}>{PRODUCT_TYPE_LABEL[type]}</p>
      <h3 className={styles.title}>{title}</h3>

      {/* 할인율이 계산될 때만 할인가가 있다는 뜻이라 salePrice null 체크를 겸한다. */}
      {discountRate !== null && salePrice !== null ? (
        <div className={styles.prices}>
          <del className={styles.originalPrice}>
            <span className={styles.srOnly}>정가 </span>
            {formatPrice(price)}
          </del>
          <p className={styles.saleRow}>
            <span className={styles.discountRate}>
              <span className={styles.srOnly}>할인율 </span>
              {discountRate}%
            </span>
            <strong className={styles.price}>
              <span className={styles.srOnly}>판매가 </span>
              {formatPrice(salePrice)}
            </strong>
          </p>
        </div>
      ) : (
        <div className={styles.prices}>
          <strong className={styles.price}>
            <span className={styles.srOnly}>판매가 </span>
            {formatPrice(price)}
          </strong>
        </div>
      )}
    </article>
  );
}
