import { useLocation } from 'react-router-dom';
import AdminMenuButton from '../../../components/Admin/AdminMenuButton/AdminMenuButton';
import styles from './AdminHeader.module.scss';
import { useEffect, useState } from 'react';

const AdminHeader = () => {
  const headerText = useGetHeaderText();

  return (
    <div className={styles.container}>
      <div>
        <AdminMenuButton />
      </div>
      <div className={styles.center}>{headerText}</div>
    </div>
  );
};

const useGetHeaderText = () => {
  const location = useLocation();
  const [headerText, setHeaderText] = useState('');

  useEffect(() => {
    if (location.pathname === '/admin/orders') {
      setHeaderText('물품 주문 내역');
    }
  }, [location]);

  return headerText;
};
export default AdminHeader;
