import { FC } from 'react';
import styles from '../styles/loadingOverlay.module.css';

const LoadingOverlay: FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader_inner}>
        <div className={styles.loader_line_wrap}>
          <div className={styles.loader_line}></div>
        </div>
        <div className={styles.loader_line_wrap}>
          <div className={styles.loader_line}></div>
        </div>
        <div className={styles.loader_line_wrap}>
          <div className={styles.loader_line}></div>
        </div>
        <div className={styles.loader_line_wrap}>
          <div className={styles.loader_line}></div>
        </div>
        <div className={styles.loader_line_wrap}>
          <div className={styles.loader_line}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
