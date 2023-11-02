import { toast } from 'react-toastify';
import useAdminWebOrdersInfiniteQuery, {
  GET_AMDIN_PAYMENTS_KEY,
} from '../../../hooks/adminWebOrders/useAdminWebOrdersInfiniteQuery';
import useAdminWebOrdersStore from '../../../store/adminWebOrdersStore';
import OrderGroup from '../../OrderGroup/OrderGroup';
import styles from './AdminWebOrdersList.module.scss';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';

const AdminWebOrdersList = () => {
  const queryClient = useQueryClient();
  const { payments, cancelPayment, clear } = useAdminWebOrdersStore();
  const { observerComponent } = useAdminWebOrdersInfiniteQuery();

  const orderGroupComponents = payments?.map((p) => {
    return (
      <li className={styles.order_li} key={p.id}>
        <OrderGroup
          isAdmin
          payment={p}
          onCancel={(state, message) => {
            toast[state](message);
            if (state === 'success') {
              queryClient.removeQueries(GET_AMDIN_PAYMENTS_KEY);
              cancelPayment(p);
            }
          }}
        />
      </li>
    );
  });

  useEffect(() => {
    return clear;
  }, []);

  return (
    <ul className={styles.order_ul}>
      {orderGroupComponents}
      {observerComponent}
    </ul>
  );
};

export default AdminWebOrdersList;
