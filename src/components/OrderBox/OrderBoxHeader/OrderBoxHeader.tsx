import React, { useState } from 'react';
import styles from './OrderBoxHeader.module.scss';
import { Payment } from '../../../graphql/interfaces/payment';
import classNames from 'classnames';
import DropDown from '../../../ui/DropDown/DropDown';

interface Props {
  payment: Payment;
  sendType: string;
}
const OrderBoxHeader: React.FC<Props> = ({ payment, sendType }) => {
  const sendTypeClasses = getSendTypeClassNames(sendType);

  return (
    <>
      <div className={styles.wrapper}>
        <div>주문번호 : {payment.orderId}</div>
        <div className={classNames(...sendTypeClasses)}>{sendType}</div>
      </div>
      {payment.test && <div className={styles.test_order}>[테스트{payment.test}] 환경에서 생성되었습니다.</div>}
    </>
  );
};

function getSendTypeClassNames(sendType: string) {
  const sendTypeClasses = [styles.send_type_base];

  switch (sendType) {
    case '주문취소':
      return sendTypeClasses.concat(styles.send_type_cancel);
    case '상품준비중':
    case '배송중':
      return sendTypeClasses.concat(styles.send_type_ing);
    case '배송완료':
      return sendTypeClasses.concat(styles.send_type_end);
  }

  return sendTypeClasses;
}

export default OrderBoxHeader;
