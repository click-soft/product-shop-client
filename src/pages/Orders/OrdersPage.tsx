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
import RefundModal from '../../components/RefundModal/RefundModal';
import CircleLoading from '../../components/Loading/CircleLoading';
import { addToCart, cartActions } from '../../store/cart-slice';
import { useLazyQuery } from '@apollo/client';
import { GET_PAYMENT_ITEM_CODE } from '../../graphql/queries/payment-item';

type RefundType = {
  show: boolean;
  payment: PaymentType;
};

const OrdersPage = () => {
  const { toast, toastConatiner } = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [getPaymentItemCode] = useLazyQuery(GET_PAYMENT_ITEM_CODE);
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

    setLoading(true);
    dispatch(cancelOrder({ payment, cancelReason: '미선택' }))
      .unwrap()
      .catch((error) => {
        toast.error(error.message);
        // showToast('error', error.message);
      })
      .then(() => setLoading(false));
  }

  function reorderHandler(p: PaymentType) {
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;
    async function reorder() {
      for (const item of p.paymentItems) {
        const result = await getPaymentItemCode({ variables: { id: item.id } });
        const code = result.data?.getPaymentItemById?.code;
        if (!code) continue;

        await dispatch(
          addToCart({
            code: code,
            fit: item.fit,
            quantity: item.quantity,
          }),
        );
      }
    }
    reorder();
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
    setLoading(true);
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
        toast.error(error.message);
      });

    setRefundData(undefined);
    setLoading(false);
  }

  const orderGroupsComponents = payments?.map((p) => {
    return (
      <li key={p.id}>
        <OrderGroup
          payment={p}
          onCancel={(isRefund) => cancelHandler(isRefund, p)}
          onReorder={() => reorderHandler(p)}
        />
      </li>
    );
  });

  return (
    <>
      {loading && <CircleLoading />}
      {toastConatiner}
      {refundData?.show && (
        <RefundModal
          onClose={() => setRefundData(undefined)}
          onRefund={refundClickHandler}
        />
      )}
      <div className={styles.main}>
        <ul className={styles['order-ul']}>{orderGroupsComponents}</ul>
      </div>
    </>
  );
};

export default OrdersPage;
