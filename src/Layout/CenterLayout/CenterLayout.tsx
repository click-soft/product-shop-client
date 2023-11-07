import React from 'react';
import styles from './CenterLayout.module.scss';
import { Outlet } from 'react-router-dom';
import Card from '../../ui/Card/Card';

const CenterLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Outlet />
      </Card>
    </div>
  );
};

export default CenterLayout;
