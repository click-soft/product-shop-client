import AdminMenuButton from '../../../components/Admin/AdminMenuButton/AdminMenuButton';
import UserButton from '../../../components/UserButton/UserButton';
import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  return (
    <div className={styles.container}>
      <div>
        <AdminMenuButton/>
      </div>
      <div className={styles.center}>
        Admin Page
      </div>
      <div>
        <UserButton/>
      </div>
    </div>
  );
};

export default AdminHeader;
