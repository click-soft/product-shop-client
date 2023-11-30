import { toast } from 'react-toastify';
import useAdminWebOrdersInfiniteQuery, {
  GET_AMDIN_PAYMENTS_KEY,
} from '../../../hooks/adminWebOrders/use-admin-web-orders-infinite-query';
import useAdminWebOrdersStore from '../../../store/admin-web-orders.store';
import OrderBox from '../../OrderBox/OrderBox';
import styles from './AdminWebOrdersList.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const AdminWebOrdersList = () => {
  const queryClient = useQueryClient();
  const { payments, cancelPayment, clear } = useAdminWebOrdersStore();
  const { observerComponent } = useAdminWebOrdersInfiniteQuery();

  const orderGroupComponents = payments?.map((p) => {
    return (
      <li className={styles.order_li} key={p.id}>
        <OrderBox
          isAdmin
          payment={p}
          onCancel={({ state, message }) => {
            toast[state](message);
            if (state === 'success') {
              cancelPayment(p);
              queryClient.removeQueries({ queryKey: [GET_AMDIN_PAYMENTS_KEY] });
            }
          }}
        />
      </li>
    );
  });

  useEffect(() => {
    return clear;
  }, [clear]);

  return (
    <ul className={styles.order_ul}>
      {orderGroupComponents}
      {observerComponent}
    </ul>
  );
};

export default AdminWebOrdersList;
