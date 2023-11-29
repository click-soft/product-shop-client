import React, { useState } from 'react';
import styles from './OrderItem.module.scss';
import { PaymentItem } from '../../../interfaces/payment-item';
import useDeliveryTracking, { TrackingType } from '../../../hooks/use-delivery-tracking';
import TrackingModal from '../../TrackingModal/TrackingModal';

interface OrderItemProps {
  item: PaymentItem;
  setSeparator: boolean;
  cancel: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, setSeparator, cancel }) => {
  const [open, setOpen] = useState(false);
  const [tracking, setTracking] = useState<TrackingType>();
  const { convertBigoToTrackings } = useDeliveryTracking();
  const deliveries = convertBigoToTrackings(item.product?.bigo);
  const totalAmount = item.amount * item.quantity;

  async function trackingHandler(tracking: TrackingType) {
    setOpen(true);
    setTracking(tracking);
  }

  const deliveryComponents =
    !cancel &&
    deliveries?.map((d) => {
      const text = `${d.name} ${d.trackingNumber}`;
      return (
        <div key={text} className={styles.box} onClick={trackingHandler.bind(null, d)}>
          {text}
        </div>
      );
    });

  return (
    <>
      <TrackingModal open={open} onClose={() => setOpen(false)} tracking={tracking} />
      <li className={`${styles.container} ${setSeparator && styles.separator}`}>
        <div>
          <div className={styles.name}>
            {item.name}
            {item.quantity > 1 && <span>x {item.quantity}</span>}
          </div>
          <div className={styles.info}>
            {item.fit && <div className={styles.fit}>맞춤</div>}
            {deliveryComponents}
          </div>
        </div>
        <div className={styles.amount}>{totalAmount.toLocaleString()}원</div>
      </li>
    </>
  );
};

export default OrderItem;
