import type { ReactNode } from 'react';

import styles from './StatusMessage.module.scss';

type StatusMessageProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  // 에러는 바로 읽어 주고(alert), 빈 결과는 읽던 내용을 끊지 않고 알린다(status).
  role?: 'status' | 'alert';
};

// 빈 결과, 에러처럼 목록 대신 보여 줄 안내 문구
export function StatusMessage({ title, description, action, role = 'status' }: StatusMessageProps) {
  return (
    <div className={styles.container} role={role}>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
