import React from 'react';
import styles from './AdminOrderList.module.scss';
import { useAppSelector } from '../../../store';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import useGetManagers from '../../../hooks/use-get-managers';
import useAdminOrderInfiniteQuery from '../../../hooks/adminOrder/use-admin-order-infinite-query';

const AdminOrderList = () => {
  const { observerComponent } = useAdminOrderInfiniteQuery();
  const products = useAppSelector((state) => state.adminOrder.products);
  const { managers } = useGetManagers();

  const components = products?.map((p) => {
    return <AdminOrderItem key={p.auto} product={p} managers={managers} />;
  });

  return (
    <ul className={styles.list}>
      {components}
      {observerComponent}
    </ul>
  );
};

export default AdminOrderList;
