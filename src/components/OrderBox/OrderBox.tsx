import React, { useState } from 'react';
import styles from './OrderBox.module.scss';
import Card from '../../ui/Card/Card';
import { Payment } from '../../graphql/interfaces/payment';
import CircleLoading from '../Loading/CircleLoading';
import RefundModal, { RefundType } from '../RefundModal/RefundModal';
import { OrderCancelArgs } from '../../hooks/orders/use-orders';
import useOrderGroup from '../../hooks/orders/use-order-group';
import OrderItemList from './OrderItemList/OrderItemList';
import OrderBoxHeader from './OrderBoxHeader/OrderBoxHeader';
import OrderBoxFooter from './OrderBoxFooter/OrderBoxFooter';

interface Props {
  payment: Payment;
  onCancel: (args: OrderCancelArgs) => void;
  onReorder?: () => void;
  isAdmin?: boolean;
}

const OrderBox: React.FC<Props> = ({ payment, onCancel, onReorder, isAdmin }) => {
  const { loading, sendType, requestedAtString, isValidCancel, validRefund, cancel, refund } = useOrderGroup(payment);
  const [showRefundModal, setShowRefundModal] = useState(false);

  async function cancelOrderHandler() {
    if (validRefund()) {
      return setShowRefundModal(true);
    }
    cancel(onCancel);
  }

  function refundHandler(refundType: RefundType): void {
    refund(refundType, (args) => {
      if (args.state === 'success') setShowRefundModal(false);
      onCancel(args);
    });
  }

  return (
    <>
      {loading && <CircleLoading />}
      {showRefundModal && <RefundModal onClose={() => setShowRefundModal(false)} onRefund={refundHandler} />}
      <Card className={styles['orders-container']}>
        <OrderBoxHeader payment={payment} sendType={sendType} />
        <OrderItemList payment={payment} />
        <OrderBoxFooter
          payment={payment}
          isAdmin={isAdmin}
          isValidCancel={isValidCancel}
          requestedAtString={requestedAtString}
          onCancel={cancelOrderHandler}
          onReorder={() => onReorder?.()}
        />
      </Card>
    </>
  );
};

export default OrderBox;
