import styles from './PaymentHeader.module.scss';
import clickIcon from '../../../assets/images/click_icon.png';
import { useNavigate } from 'react-router-dom';

const PaymentHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <img src={clickIcon} alt="click icon" onClick={() => navigate('/')} />
      </div>
      <div className={styles.header__center}>
        <h3>주문/결제하기</h3>
      </div>
      <div className={styles.header__right}></div>
    </header>
  );
};

export default PaymentHeader;
