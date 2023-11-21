import styles from './OrdersList.module.scss';
import useOrdersInfiniteQuery from '../../../hooks/orders/use-orders-infinite-query';
import OrderBox from '../../OrderBox/OrderBox';
import useOrders from '../../../hooks/orders/use-orders';

const OrdersList = () => {
  const { cancelHandler, reorderHandler } = useOrders();
  const { payments, observerComponent } = useOrdersInfiniteQuery();
  const orderGroupsComponents = payments?.map((p) => {
    return (
      <li key={p.id}>
        <OrderBox payment={p} onCancel={(args) => cancelHandler(p, args)} onReorder={() => reorderHandler(p)} />
      </li>
    );
  });

  return (
    <ul className={styles.order_ul}>
      {orderGroupsComponents}
      <li>{observerComponent}</li>
    </ul>
  );
};

export default OrdersList;
