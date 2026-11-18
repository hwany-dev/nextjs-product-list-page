import type { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ');
  return <button type={type} className={classNames} {...props} />;
}
