import styles from './OrdersPage.module.scss';
import OrdersList from '../../components/Orders/OrdersList/OrdersList';
import useOrdersStore from '../../store/orders.store';
import { useEffect } from 'react';

const OrdersPage = () => {
  const { clear } = useOrdersStore();

  useEffect(() => {
    return clear;
  }, []);

  return (
    <>
      <div className={styles.main}>
        <OrdersList />
      </div>
    </>
  );
};

export default OrdersPage;
