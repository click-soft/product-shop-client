import React from 'react';
import styles from './OrderItem.module.scss';
import { PaymentItemType } from '../../interfaces/PaymentItemType';

interface OrderItemProps {
  item: PaymentItemType;
  setSeparator: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, setSeparator }) => {
  const totalAmount = item.amount * item.quantity;
  return (
    <li className={`${styles.container} ${setSeparator && styles.separator}`}>
      <div>
        <div className={styles.name}>
          {item.name}
          {item.quantity > 1 && <span>x {item.quantity}</span>}
        </div>
        <div className={styles.info}>
          {item.fit && <div className={styles.fit}>맞춤</div>}
          {/* {item. <div className={styles.box}>BOX</div>} */}
        </div>
      </div>
      <div className={styles.amount}>{totalAmount.toLocaleString()}원</div>
    </li>
  );
};

export default OrderItem;
