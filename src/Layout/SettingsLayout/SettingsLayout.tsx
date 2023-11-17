import React, { useEffect } from 'react';
import BaseLayout from '../BaseLayout/BaseLayout';
import SettingsHeader from './Header/SettingsHeader';
import SettingsLeftMenu from './LeftMenu/SettingsLeftMenu';
import { useLocation, useNavigate } from 'react-router-dom';

const SettingsLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('/settings/profile');
    }
  }, [location.pathname]);

  return (
    <BaseLayout
      headerComponent={<SettingsHeader />}
      leftMenuComponent={<SettingsLeftMenu />}
      footerComponent={<div>footer</div>}
    />
  );
};

export default SettingsLayout;
