import styles from './AdminWebOrdersPage.module.scss';
import CircleLoading from '../../components/Loading/CircleLoading';
import useAdminWebOrdersStore from '../../store/admin-web-orders.store';
import AdminWebOrdersForm from '../../components/Admin/AdminWebOrdersForm/AdminWebOrdersForm';
import AdminWebOrdersList from '../../components/Admin/AdminWebOrdersList/AdminWebOrdersList';

const AdminWebOrdersPage = () => {
  const { isFetching } = useAdminWebOrdersStore();

  return (
    <div className={styles.container}>
      {isFetching && <CircleLoading />}
      <AdminWebOrdersForm />
      <AdminWebOrdersList />
    </div>
  );
};

export default AdminWebOrdersPage;
