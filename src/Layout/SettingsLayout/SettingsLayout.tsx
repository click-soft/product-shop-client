import React, { useEffect } from 'react';
import styles from './SettingsLayout.module.scss';
import BaseLayout from '../BaseLayout/BaseLayout';
import SettingsHeader from './Header/SettingsHeader';
import SettingsLeftMenu from './LeftMenu/SettingsLeftMenu';
import { useNavigate } from 'react-router-dom';

const SettingsLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/settings/profile');
  }, [navigate]);

  return (
    <>
      <BaseLayout
        headerComponent={<SettingsHeader />}
        leftMenuComponent={<SettingsLeftMenu />}
        footerComponent={<div>footer</div>}
      />
    </>
  );
};

export default SettingsLayout;
