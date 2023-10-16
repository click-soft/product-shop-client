import styles from './PaymentFailPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const PaymentFailPage = () => {
  const [params] = useSearchParams();
  const errorCode = params.get('code');
  const errorMessage = params.get('message');
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>결제에 실패하였습니다.</h2>
        <div className={styles.detail_container}>
          <div className={styles.error_container}>
            <div className={styles.error_label}>에러 코드</div>
            <div className={styles.error_text}>{errorCode}</div>
          </div>
          <div className={styles.error_container}>
            <div className={styles.error_label}>에러 내용</div>
            <div className={styles.error_text}>{errorMessage}</div>
          </div>
        </div>
      </div>
      <div>
        <nav className={styles.nav_wrapper}>
          <Link to={'/cart-view'} className={styles.to_cart_view}>
            장바구니로
          </Link>
          <Link to={'/'} className={styles.to_main}>
            메인으로
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default PaymentFailPage;
