import BaseLayout from '../BaseLayout/BaseLayout';
import AdminHeader from './Header/AdminHeader';

const AdminLayout = () => {
  return (
    <BaseLayout
      headerComponent={<AdminHeader />}
      footerComponent={<div>foooter</div>}
      leftMenuComponent={
        <div style={{ backgroundColor: 'red' }}>left range ▣</div>
      }
    />
  );
};

export default AdminLayout;
