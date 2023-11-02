import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import BaseLayout from '../BaseLayout/BaseLayout';
import AdminHeader from './Header/AdminHeader';

const AdminLayout = () => {
  return (
    <>
      <BaseLayout
        headerComponent={<AdminHeader />}
        // footerComponent={}
        leftMenuComponent={<AdminMenu />}
      />
    </>
  );
};

export default AdminLayout;
