import React, { useEffect } from 'react';
import styles from './OrdersPage.module.scss';
import { useQuery } from '@apollo/client';
import { GET_PAYMENT_WITH_ITEMS } from '../../graphql/queries/payment';
import { PaymentType } from '../../interfaces/PaymentType';
import OrderGroup from '../../components/OrderGroup/OrderGroup';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { cancelOrder, getPaymentWithItems } from '../../store/orders-slice';
import { useSelector } from 'react-redux';
import useToast from '../../hooks/use-toast';

const OrdersPage = () => {
  const { toastComponet, showToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const payments = useSelector<RootState, PaymentType[]>(
    (state) => state.orders.payments,
  );

  useEffect(() => {
    dispatch(getPaymentWithItems({ isInit: true }));
  }, [getPaymentWithItems]);

  function cancelHandler(payment: PaymentType) {
    if (!window.confirm('주문을 취소하시겠습니까?')) return;

    dispatch(cancelOrder({ payment, cancelReason: '미선택' }))
      .unwrap()
      .catch((error) => {
        showToast('error', error.message);
      });
  }

  const orderGroupsComponents = payments?.map((p) => {
    return (
      <li key={p.id}>
        <OrderGroup payment={p} onCancel={cancelHandler.bind(null, p)} />
      </li>
    );
  });

  return (
    <>
      {toastComponet}
      <div className={styles.main}>
        <ul className={styles['order-ul']}>{orderGroupsComponents}</ul>
      </div>
    </>
  );
};

export default OrdersPage;
