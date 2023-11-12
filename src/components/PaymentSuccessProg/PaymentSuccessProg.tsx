import styles from './PaymentSuccessProg.module.scss';
const PaymentSuccessProg = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.main__text}>결제가 진행 중 입니다.</div>
        <div className={styles.main__description}>잠시만 기다려주세요.</div>
      </div>
    </div>
  );
};

export default PaymentSuccessProg;
