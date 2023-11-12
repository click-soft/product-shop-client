import styles from './PaymentPage.module.scss';
import Card from '../../ui/Card/Card';
import { useNavigate } from 'react-router-dom';
import useTossWidget from '../../hooks/useTossWidget';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const { totalPrice, fetchCheckout } = useTossWidget();
  const navigate = useNavigate();

  function checkoutHandler() {
    fetchCheckout({
      onSuccess: () => navigate(`success`),
      onFail: (error) => toast.error(error),
    });
  }

  return (
    <main>
      <Card className={styles.payment}>
        <div id="payment-widget" />
        <div id="agreement" />
      </Card>
      <Card className={styles['checkout-container']}>
        <div className={styles['checkout-amount-wrapper']}>
          결제금액 : <span className={styles['checkout-amount']}>{totalPrice?.toLocaleString()}원</span>
        </div>
        <button className={styles['checkout-button']} onClick={checkoutHandler}>
          결제하기
        </button>
      </Card>
    </main>
  );
};

export default PaymentPage;
