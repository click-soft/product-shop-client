import styles from './PaymentSuccessComplete.module.scss';
import Card from '../../ui/Card';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Payment } from '../../graphql/interfaces/payment';
import bankData from '../../data/bankData';

interface PaymentSuccessCompleteProps {
  orderData: Payment;
}
const PaymentSuccessComplete: React.FC<PaymentSuccessCompleteProps> = ({ orderData }) => {
  // const { checkoutData } = useCheckout({ isSession: true });
  // const checkoutState = checkoutData?.checkoutState;
  const ymd = moment(orderData.requestedAt).format('YYYY-MM-DD');
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>주문이 완료되었습니다.</div>
        <div className={styles.order_id}>주문번호: {orderData.orderId}</div>

        <Card className={styles.detail}>
          <section className={styles.detail_section}>
            <LabelText label="주문일시" text={ymd} />
            <LabelText label="주문방법" text={orderData.method} />
          </section>
          <div className={styles.separator} />
          <section className={styles.detail_section}>
            <LabelText label="총 수량" text={orderData.quantity} />
            <LabelText label="주문금액" text={orderData.amount.toLocaleString() + '원'} highlight={true} />
          </section>
        </Card>

        {orderData.virtual && (
          <Card className={`${styles.detail} ${styles.virtual_info}`}>
            <section className={styles.detail_section}>
              <div className={styles.virtual_info__title}>가상계좌</div>
              <LabelText label="은행" text={bankData[orderData.virtual?.bankCode]} />
              <LabelText label="계좌번호" text={orderData.virtual?.accountNumber} />
              <LabelText label="만료일시" text={moment(orderData.virtual?.dueDate).format('YYYY-MM-DD HH:mm:ss')} />
            </section>
          </Card>
        )}
      </div>
      <nav className={styles.nav_wrapper}>
        <NavLink to={'/orders'} className={styles.nav_orders}>
          주문내역 확인
        </NavLink>
        <NavLink to={'/'} className={styles.nav_main}>
          메인으로
        </NavLink>
      </nav>
    </>
  );
};

const LabelText = (props: { label: string; text: string | number | undefined; highlight?: boolean }) => {
  return (
    <div className={styles.label_text}>
      <div className={styles.label}>{props.label}</div>
      <div className={`${styles.text} ${props.highlight && styles.highlight_text}`}>{props.text}</div>
    </div>
  );
};
export default PaymentSuccessComplete;
