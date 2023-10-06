import React from 'react';
import styles from './OrdersPage.module.scss';
import { useQuery } from '@apollo/client';
import { GET_PAYMENT_WITH_ITEMS } from '../../graphql/queries/payment';
import { PaymentType } from '../../interfaces/PaymentType';
import OrderGroup from '../../components/OrderGroup/OrderGroup';

const OrdersPage = () => {
  const { data } = useQuery(GET_PAYMENT_WITH_ITEMS);

  const payments: PaymentType[] = data?.getPaymentWithItems;

  const orderGroupsComponents = payments?.map((p) => {
    return (
      <li key={p.id}>
        <OrderGroup payment={p} />
      </li>
    );
  });

  return (
    <div className={styles.main}>
      <ul className={styles['order-ul']}>{orderGroupsComponents}</ul>
    </div>
  );
};

export default OrdersPage;
