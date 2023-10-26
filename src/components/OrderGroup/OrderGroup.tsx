import React, { useState } from 'react';
import styles from './OrderGroup.module.scss';
import Card from '../../ui/Card';
import moment from 'moment';
import OrderItem from '../OrderItem/OrderItem';
import { Payment } from '../../graphql/interfaces/payment';
import bankData from '../../data/bankData';
import CircleLoading from '../Loading/CircleLoading';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { cancelOrder, refundOrder } from '../../store/orders-slice';
import RefundModal from '../RefundModal/RefundModal';

interface OrderGroupProps {
  payment: Payment;
  onCancel: (state: 'success' | 'error', message: string) => void;
  onReorder?: () => void;
  isAdmin?: boolean;
}

const OrderGroup: React.FC<OrderGroupProps> = ({ payment, onCancel, onReorder, isAdmin }) => {
  const longDateString = moment(payment.requestedAt).format('YYYY-MM-DD HH:mm');
  const sendTypeClasses = [styles['send-type-base']];
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  let sendType = payment.sendType.toString();

  if (payment.cancel) {
    sendType = '주문 취소';
    sendTypeClasses.push(styles['send-type-cancel']);
  } else {
    switch (payment.sendType) {
      case '배송중':
        sendTypeClasses.push(styles['send-type-ing']);
        break;
      case '배송완료':
        sendTypeClasses.push(styles['send-type-end']);
        break;
    }
  }

  const orderItems = payment.paymentItems.map((item, i) => {
    return <OrderItem key={item.id} item={item} setSeparator={i > 0} />;
  });

  const canCancel = !payment.cancel && ['결제대기', '주문확인'].includes(payment.sendType);

  const cancelButtonComponent = (
    <button className={styles['cancel-button']} onClick={cancelOrderHandler}>
      주문취소
    </button>
  );

  function cancel() {
    setLoading(true);

    dispatch(cancelOrder({ payment, cancelReason: '미선택' }))
      .unwrap()
      .then(() => {
        onCancel('success', '취소되었습니다.');
      })
      .catch((error) => onCancel('error', error.message))
      .then(() => setLoading(false));
  }

  function refundHandler({
    bank,
    accountNumber,
    holderName,
  }: {
    bank: string;
    accountNumber: string;
    holderName: string;
  }) {
    setLoading(true);

    dispatch(
      refundOrder({
        paymentId: payment.id,
        bank,
        accountNumber: accountNumber,
        holderName,
        cancelReason: '사용자의 요청으로 인한 환불',
      })
    )
      .unwrap()
      .then(() => {
        onCancel('success', '환불되었습니다.');
        setShowRefundModal(false);
      })
      .catch((error) => onCancel('error', error.message))
      .then(() => setLoading(false));
  }

  async function cancelOrderHandler() {
    if (!window.confirm('주문을 취소하시겠습니까?')) return;

    if (payment.virtual) {
      setShowRefundModal(true);
    } else {
      cancel();
    }
  }

  return (
    <>
      {loading && <CircleLoading />}
      {showRefundModal && <RefundModal onClose={() => setShowRefundModal(false)} onRefund={refundHandler} />}
      <Card className={styles['orders-container']}>
        <div className={styles['order-title-wrapper']}>
          <div className={styles['order-id']}>주문번호 : {payment.orderId}</div>
          <div className={sendTypeClasses.join(' ')}>{sendType}</div>
        </div>
        <div className={styles['order-body-wrapper']}>
          <ul>{orderItems}</ul>
        </div>
        <div className={styles.footer}>
          {isAdmin && (
            <>
              <LabelText label="요양기호" text={payment.ykiho} />
              <LabelText label="거래처명칭" text={payment.cs?.myung} />
            </>
          )}
          <LabelText label="주문방법" text={payment.method} />
          <LabelText label="주문일시" text={longDateString} />
          <LabelText label="총 비용" text={payment.amount.toLocaleString()} />

          {payment.virtual && payment.sendType === '결제대기' && !payment.cancel && (
            <Card className={`${styles.virtual_info}`}>
              <div className={styles.virtual_info__title}>가상계좌</div>
              <LabelText label="은행" text={bankData[payment.virtual.bankCode]} />
              <LabelText label="계좌번호" text={payment.virtual?.accountNumber} />
              <LabelText label="만료일시" text={moment(payment.virtual.dueDate).format('YYYY-MM-DD HH:mm:ss')} />
            </Card>
          )}

          {!isAdmin && canCancel && cancelButtonComponent}
          {isAdmin && !payment.cancel && cancelButtonComponent}

          {!canCancel && !isAdmin && (
            <button className={styles['reorder-button']} onClick={onReorder}>
              재주문
            </button>
          )}
        </div>
      </Card>
    </>
  );
};

const LabelText = ({ label, text }: { label: string; text?: string }) => {
  return (
    <div className={styles['label-text']}>
      <div className={styles.label}>{label}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default OrderGroup;
