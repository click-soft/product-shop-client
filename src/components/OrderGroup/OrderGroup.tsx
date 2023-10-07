import React from 'react';
import styles from './OrderGroup.module.scss';
import Card from '../../ui/Card';
import { PaymentType } from '../../interfaces/PaymentType';
import moment from 'moment';
import OrderItem from '../OrderItem/OrderItem';

interface OrderGroupProps {
  payment: PaymentType;
  onCancel: () => void;
}

const OrderGroup: React.FC<OrderGroupProps> = ({ payment, onCancel }) => {
  const longDateString = moment(payment.approvedAt).format('YYYY-MM-DD HH:mm');
  const sendTypeClasses = [styles['send-type-base']];
  let sendType = payment.sendType.toString();

  if (payment.cancel) {
    sendType = '주문 취소 됨';
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

  return (
    <Card className={styles['orders-container']}>
      <div className={styles['order-title-wrapper']}>
        <div className={styles['order-id']}>주문번호 : {payment.orderId}</div>
        <div className={sendTypeClasses.join(' ')}>{sendType}</div>
      </div>
      <div className={styles['order-body-wrapper']}>
        <ul>{orderItems}</ul>
      </div>
      <div className={styles.footer}>
        <LabelText label="주문방법" text={payment.method} />
        <LabelText label="주문일시" text={longDateString} />
        <LabelText label="총 비용" text={payment.amount.toLocaleString()} />
        {!payment.cancel && payment.sendType === '배송준비' && (
          <button className={styles['cancel-button']} onClick={onCancel}>
            주문취소
          </button>
        )}
      </div>
    </Card>
  );
};

const LabelText = ({ label, text }: { label: string; text: string }) => {
  return (
    <div className={styles['label-text']}>
      <div className={styles.label}>{label}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default OrderGroup;
