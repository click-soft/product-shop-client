import styles from './AdminOrderPage.module.scss';
import CircleLoading from '../../components/Loading/CircleLoading';
import { useAppSelector } from '../../store';
import AdminOrderList from '../../components/Admin/AdminOrderList/AdminOrderList';
import AdminOrderForm from '../../components/AdminOrderForm/AdminOrderForm';

const AdminOrderPage = () => {
  const state = useAppSelector((state) => state.adminOrder);

  return (
    <>
      {(state.isFetching || state.isUpdateLoading) && <CircleLoading />}
      <div className={styles.container}>
        <AdminOrderForm />
        <AdminOrderList />
      </div>
    </>
  );
};

export default AdminOrderPage;
