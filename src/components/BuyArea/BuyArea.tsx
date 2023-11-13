import React from 'react';
import styles from './BuyArea.module.scss';
import CheckBox from '../../ui/CheckBox/CheckBox';
import useBuyArea from '../../hooks/cartView/use-buy-area';

const BuyArea: React.FC = () => {
  const { useBNPL, disabled, checkBNPL, currencyTotalPrice, handleBuy, handleBNPLChange } = useBuyArea();

  return (
    <div className={styles.buy_container}>
      <div className={styles.buy_wrapper}>
        <div className={styles.buy_amount_wrapper}>
          <div className={styles.buy_amount_title}>총 주문금액</div>
          <div className={styles.buy_amount}>{currencyTotalPrice}원</div>
        </div>
        <div className={styles.inner_right_wrapper}>
          {useBNPL && (
            <CheckBox className={styles.check_bnpl} text="후불결제" checked={checkBNPL} onChange={handleBNPLChange} />
          )}
          <button className={styles.buy_amount_button} onClick={handleBuy} disabled={disabled}>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyArea;
