import styles from './PaymentSuccessComplete.module.scss';
import Card from '../../ui/Card';
import moment from 'moment';
import useCheckout from '../../hooks/use-checkout';
import { NavLink } from 'react-router-dom';

const PaymentSuccessComplete = () => {
  const { checkoutData } = useCheckout({ isSession: true });
  const checkoutState = checkoutData?.checkoutState;
  const ymd = moment(checkoutData?.approvedAt).format('YYYY-MM-DD');
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>주문이 완료되었습니다.</div>
        <div className={styles.order_id}>주문번호: {checkoutData?.orderId}</div>

        <Card className={styles.detail}>
          <section className={styles.detail_section}>
            <LabelText label="주문일시" text={ymd} />
            <LabelText label="주문방법" text={checkoutData?.method} />
          </section>
          <div className={styles.separator}/>
          <section className={styles.detail_section}>
            <LabelText label="총 수량" text={checkoutState?.totalQuantity} />
            <LabelText
              label="주문금액"
              text={checkoutState?.totalPrice?.toLocaleString() + '원'}
              highlight={true}
            />
          </section>
        </Card>
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

const LabelText = (props: {
  label: string;
  text: string | number | undefined;
  highlight?: boolean;
}) => {
  return (
    <div className={styles.label_text}>
      <div className={styles.label}>{props.label}</div>
      <div
        className={`${styles.text} ${props.highlight && styles.highlight_text}`}
      >
        {props.text}
      </div>
    </div>
  );
};
export default PaymentSuccessComplete;
