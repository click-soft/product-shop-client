import styles from './AdminOrderPage.module.scss';
import CircleLoading from '../../components/Loading/CircleLoading';
import AdminOrderList from '../../components/Admin/AdminOrderList/AdminOrderList';
import AdminOrderForm from '../../components/Admin/AdminOrderForm/AdminOrderForm';
import useAdminOrderStore from '../../store/admin-order.store';

const AdminOrderPage = () => {
  const { isFetching, isUpdateLoading } = useAdminOrderStore();

  return (
    <>
      {(isFetching || isUpdateLoading) && <CircleLoading />}
      <div className={styles.container}>
        <AdminOrderForm />
        <AdminOrderList />
      </div>
    </>
  );
};

export default AdminOrderPage;
