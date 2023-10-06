import React from 'react';
import styles from './BuyArea.module.scss';
import { formatCurrency } from '../../utils/strings';

interface BuyAreaProps {
  totalPrice: number;
  onBuy: () => void;
}

const BuyArea: React.FC<BuyAreaProps> = ({ totalPrice, onBuy }) => {
  return (
    <div className={styles['buy-container']}>
      <div className={styles['buy-wrapper']}>
        <div className={styles['buy-amount-wrapper']}>
          <div className={styles['buy-amount-title']}>총 주문금액</div>
          <div className={styles['buy-amount']}>
            {formatCurrency(totalPrice)}원
          </div>
        </div>
        <button className={styles['buy-amount-button']} onClick={onBuy}>
          구매하기
        </button>
      </div>
    </div>
  );
};

export default BuyArea;
