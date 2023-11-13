import React from 'react';
import styles from './OrderBoxFooter.module.scss';
import { Payment } from '../../../graphql/interfaces/payment';
import bankData from '../../../data/bank-data';
import dayjs from 'dayjs';
import Card from '../../../ui/Card/Card';

interface Props {
  payment: Payment;
  isAdmin?: boolean;
  requestedAtString?: string;
  isValidCancel?: boolean;
  onCancel: () => void;
  onReorder: () => void;
}
const OrderBoxFooter: React.FC<Props> = ({
  isAdmin,
  payment,
  requestedAtString,
  isValidCancel,
  onCancel,
  onReorder,
}) => {
  return (
    <div className={styles.footer}>
      {isAdmin && (
        <>
          <LabelText label="요양기호" text={payment.ykiho} />
          <LabelText label="거래처명칭" text={payment.cs?.myung} />
        </>
      )}
      <LabelText label="주문방법" text={payment.method} />
      <LabelText label="주문일시" text={requestedAtString} />
      <LabelText label="총 비용" text={payment.amount.toLocaleString()} />

      {payment.virtual && payment.sendType === '결제대기' && !payment.cancel && (
        <Card className={`${styles.virtual_info}`}>
          <div className={styles.virtual_info__title}>가상계좌</div>
          <LabelText label="은행" text={bankData[payment.virtual.bankCode]} />
          <LabelText label="계좌번호" text={payment.virtual?.accountNumber} />
          <LabelText label="만료일시" text={dayjs(payment.virtual.dueDate).format('YYYY-MM-DD HH:mm:ss')} />
        </Card>
      )}

      {!isAdmin && isValidCancel && <CancelButton onCancel={onCancel} />}
      {isAdmin && !payment.cancel && <CancelButton onCancel={onCancel} />}

      {!isValidCancel && !isAdmin && (
        <button className={styles.reorder_button} onClick={onReorder}>
          재주문
        </button>
      )}
    </div>
  );
};

const LabelText = ({ label, text }: { label: string; text?: string }) => {
  return (
    <div className={styles.label_text}>
      <div className={styles.label}>{label}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

const CancelButton = ({ onCancel }: { onCancel: () => void }) => {
  const cancelHandler = () => {
    if (!window.confirm('주문을 취소하시겠습니까?')) return;
    onCancel();
  };

  return (
    <button className={styles.cancel_button} onClick={cancelHandler}>
      주문취소
    </button>
  );
};

export default OrderBoxFooter;
