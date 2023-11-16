import dayjs from 'dayjs';
import { Payment } from '../../graphql/interfaces/payment';
import { useState } from 'react';
import { RefundType } from '../../components/RefundModal/RefundModal';
import { OrderCancelArgs } from './use-orders';
import cancelOrderMutate from '../../graphql/mutates/payment/cancel-order.mutate';
import refundOrderMutate from '../../graphql/mutates/payment/refund-order.mutate';

const useOrderGroup = (payment: Payment) => {
  const [loading, setLoading] = useState(false);
  const sendType = getSendType(payment);
  const requestedAtString = dayjs(payment.requestedAt).format('YYYY-MM-DD HH:mm');
  const isValidCancel = !payment.cancel && ['결제대기', '주문확인'].includes(sendType);

  function validRefund() {
    return payment.method === '가상계좌' && sendType !== '결제대기';
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

    try {
      await cancelOrderMutate({ payment, cancelReason: '미선택' });
      callback({ state: 'success', message: '취소되었습니다.' });
    } catch (error: any) {
      callback({ state: 'error', message: error.message });
    }

    setLoading(false);
  }

  async function refund({ bank, accountNumber, holderName }: RefundType, callback: (args: OrderCancelArgs) => void) {
    setLoading(true);

    try {
      await refundOrderMutate({
        paymentId: payment.id,
        bank,
        accountNumber: accountNumber,
        holderName,
        cancelReason: '사용자의 요청으로 인한 환불',
      });
      callback({ state: 'success', message: '환불되었습니다.' });
    } catch (error: any) {
      callback({ state: 'error', message: error.message });
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
