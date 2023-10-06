import React from 'react';
import styles from './CartItem.module.scss';
import CartProduct from '../../interfaces/CartItem';
import { formatCurrency } from '../../utils/strings';

interface CartItemProps {
  item: CartProduct;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const item = props.item;
  const formatedPrice = formatCurrency(item.product?.danga! * item.quantity);

  return (
    <li className={styles.item}>
      <div className={styles.title}>
        <div>{item.product?.smMyung}</div>
        {item.fit && <p className={styles.fit}>맞춤주문</p>}
      </div>
      <div className={styles.detail}>
        <div className={styles.detail__left}>
          <div>수량 : {item.quantity}</div>
          <div>단위 : {item.product?.danwi}</div>
        </div>
        <div className={styles.detail__right}>₩{formatedPrice}</div>
      </div>
    </li>
  );
};

export default CartItem;
