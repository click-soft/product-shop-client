import dayjs from 'dayjs';
import { Payment } from '../../graphql/interfaces/payment';
import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { cancelOrder, refundOrder } from '../../store/orders-slice';
import { RefundType } from '../../components/RefundModal/RefundModal';
import { OrderCancelArgs } from './useOrders';

const useOrderGroup = (payment: Payment) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const sendType = getSendType(payment);
  const requestedAtString = dayjs(payment.requestedAt).format('YYYY-MM-DD HH:mm');
  const isValidCancel = !payment.cancel && ['결제대기', '주문확인'].includes(sendType);

  function validRefund() {
    return payment.virtual && sendType !== '결제대기';
  }

  function getSendType(payment: Payment) {
    if (payment.cancel) {
      return '주문취소';
    }

    if (['결제대기', '주문확인'].includes(payment.sendType)) {
      const items = payment.paymentItems;
      const isWaybill = items.some((pi) => pi.product?.orderCheck === '0' && pi.product?.bigo?.trim() !== '');
      if (isWaybill) {
        return '배송중';
      }

      const isOrdered = items.some((pi) => pi.product?.etc1?.startsWith('1'));
      if (isOrdered) {
        return '상품준비중';
      }
    }

    return payment.sendType;
  }

  async function cancel(callback: (args: OrderCancelArgs) => void) {
    setLoading(true);

    const response = await dispatch(cancelOrder({ payment, cancelReason: '미선택' }));
    if (response.meta.requestStatus === 'rejected') {
      callback({ state: 'error', message: (response as any).message });
    } else {
      callback({ state: 'success', message: '취소되었습니다.' });
    }

    setLoading(false);
  }

  async function refund({ bank, accountNumber, holderName }: RefundType, callback: (args: OrderCancelArgs) => void) {
    setLoading(true);

    const response = await dispatch(
      refundOrder({
        paymentId: payment.id,
        bank,
        accountNumber: accountNumber,
        holderName,
        cancelReason: '사용자의 요청으로 인한 환불',
      })
    );

    if (response.meta.requestStatus === 'rejected') {
      callback({ state: 'error', message: (response as any).error.message });
    } else {
      callback({ state: 'success', message: '환불되었습니다.' });
    }
    setLoading(false);
  }

  return {
    loading,
    sendType,
    requestedAtString,
    isValidCancel,
    validRefund,
    cancel,
    refund,
  };
};

export default useOrderGroup;
