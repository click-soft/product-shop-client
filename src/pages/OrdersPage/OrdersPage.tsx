import styles from './OrdersPage.module.scss';
import OrdersList from '../../components/Orders/OrdersList/OrdersList';
import useOrdersStore from '../../store/orders.store';
import { useEffect } from 'react';
import useClearModal from '../../hooks/use-clear-modal';

const OrdersPage = () => {
  const { clear } = useOrdersStore();
  useClearModal();
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
