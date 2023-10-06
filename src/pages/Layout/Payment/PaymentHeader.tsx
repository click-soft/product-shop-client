import React from 'react';
import styles from './PaymentHeader.module.scss';
import clickIcon from '../../../assets/images/click_icon.png';

const PaymentHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <img src={clickIcon} alt="click icon" />
      </div>
      <div className={styles.header__center}>
        <h3>주문/결제하기</h3>
      </div>
      <div className={styles.header__right}></div>
    </header>
  );
};

export default PaymentHeader;
