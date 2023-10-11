import React, { useEffect, useState } from 'react';
import styles from './OrdersPage.module.scss';
import OrderGroup from '../../components/OrderGroup/OrderGroup';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  cancelOrder,
  getPaymentWithItems,
  refundOrder,
} from '../../store/orders-slice';
import { useSelector } from 'react-redux';
import useToast from '../../hooks/use-toast';
import { PaymentType } from '../../graphql/interfaces/payment';
import { modalActions } from '../../store/modal-slice';
import RefundModal from '../../components/RefundModal/RefundModal';

type RefundType = {
  show: boolean;
  payment: PaymentType;
};

const OrdersPage = () => {
  const { toastComponet, showToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [refundData, setRefundData] = useState<RefundType>();
  const payments = useSelector<RootState, PaymentType[]>(
    (state) => state.orders.payments,
  );

  useEffect(() => {
    dispatch(getPaymentWithItems({ isInit: true }));
  }, [getPaymentWithItems]);

  function cancelHandler(isRefund: boolean, payment: PaymentType) {
    if (!window.confirm('주문을 취소하시겠습니까?')) return;

    if (isRefund) {
      setRefundData({ show: true, payment });
      return;
    }

    dispatch(cancelOrder({ payment, cancelReason: '미선택' }))
      .unwrap()
      .catch((error) => {
        showToast('error', error.message);
      });
  }

  function refundClickHandler({
    bank,
    accountNumber,
    holderName,
  }: {
    bank: string;
    accountNumber: string;
    holderName: string;
  }): void {
    dispatch(
      refundOrder({
        paymentId: refundData?.payment.id!,        
        bank,
        accountNumber: accountNumber,
        holderName,
        cancelReason: '사용자의 요청으로 인한 환불',
      }),
    )
      .unwrap()
      .catch((error) => {
        showToast('error', error.message);
      });

    setRefundData(undefined);
  }

  const orderGroupsComponents = payments?.map((p) => {
    return (
      <li key={p.id}>
        <OrderGroup
          payment={p}
          onCancel={(isRefund) => cancelHandler(isRefund, p)}
        />
      </li>
    );
  });

  return (
    <>
      {refundData?.show && (
        <RefundModal
          onClose={() => setRefundData(undefined)}
          onRefund={refundClickHandler}
        />
      )}
      {toastComponet}
      <div className={styles.main}>
        <ul className={styles['order-ul']}>{orderGroupsComponents}</ul>
      </div>
    </>
  );
};

export default OrdersPage;
