import styles from './PaymentSuccessPage.module.scss';
import PaymentSuccessComplete from '../../components/PaymentSuccessComplete/PaymentSuccessComplete';

const PaymentSuccessPage = () => {
  return (
    <div className={styles.main}>
      <PaymentSuccessComplete />
    </div>
  );
};

export default PaymentSuccessPage;
