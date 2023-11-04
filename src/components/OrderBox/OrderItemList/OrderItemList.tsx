import React from 'react';
import styles from './OrderItemList.module.scss';
import { Payment } from '../../../graphql/interfaces/payment';
import OrderItem from '../OrderItem/OrderItem';

interface OrderItemListProps {
  payment: Payment;
}

const OrderItemList: React.FC<OrderItemListProps> = ({ payment }) => {
  const orderItems = payment.paymentItems.map((item, i) => {
    return <OrderItem key={item.id} item={item} setSeparator={i > 0} cancel={payment.cancel} />;
  });

  return (
    <div className={styles.wrapper}>
      <ul>{orderItems}</ul>
    </div>
  );
};

export default OrderItemList;
