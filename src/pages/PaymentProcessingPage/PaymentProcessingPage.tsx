import { useEffect } from 'react';
import PaymentSuccessProg from '../../components/PaymentSuccessProg/PaymentSuccessProg';
import styles from './PaymentProcessingPage.module.scss';
import useCheckout from '../../hooks/use-checkout';

const PaymentProcessingPage = () => {
  const { fetchCheckout } = useCheckout();

  useEffect(() => {
    fetchCheckout();
  }, []);

  return (
    <div className={styles.main}>
      <PaymentSuccessProg />
    </div>
  );
};

export default PaymentProcessingPage;
