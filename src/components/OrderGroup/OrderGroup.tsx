import React from 'react';
import styles from './OrderGroup.module.scss';
import Card from '../../ui/Card';
import moment from 'moment';
import OrderItem from '../OrderItem/OrderItem';
import { PaymentType } from '../../graphql/interfaces/payment';
import bankData from '../../data/bankData';

interface OrderGroupProps {
  payment: PaymentType;
  onCancel: (isRefund: boolean) => void;
  onReorder: () => void;
}

const OrderGroup: React.FC<OrderGroupProps> = ({
  payment,
  onCancel,
  onReorder,
}) => {
  const longDateString = moment(payment.requestedAt).format('YYYY-MM-DD HH:mm');
  const sendTypeClasses = [styles['send-type-base']];
  const canRefund = !!payment.virtual && payment.sendType === '주문확인';

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

  const canCancel =
    !payment.cancel && ['결제대기', '주문확인'].includes(payment.sendType);

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

        {payment.virtual &&
          payment.sendType === '결제대기' &&
          !payment.cancel && (
            <Card className={`${styles.virtual_info}`}>
              <div className={styles.virtual_info__title}>가상계좌</div>
              <LabelText
                label="은행"
                text={bankData[payment.virtual.bankCode]}
              />
              <LabelText
                label="계좌번호"
                text={payment.virtual?.accountNumber}
              />
              <LabelText
                label="만료일시"
                text={moment(payment.virtual.dueDate).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              />
            </Card>
          )}

        {canCancel ? (
          <button
            className={styles['cancel-button']}
            onClick={onCancel.bind(null, canRefund)}
          >
            주문취소
          </button>
        ) : (
          <button className={styles['reorder-button']} onClick={onReorder}>
            재주문
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
