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

const headerTextData: { [key: string]: string } = {
  '/admin/orders': '물품 주문 내역',
  '/admin/web-orders': '웹 주문 내역',
};
const useGetHeaderText = () => {
  const location = useLocation();
  const [headerText, setHeaderText] = useState('');

  useEffect(() => {
    const headerText = headerTextData[location.pathname];

    setHeaderText(headerText);
  }, [location]);

  return headerText;
};
export default AdminHeader;
