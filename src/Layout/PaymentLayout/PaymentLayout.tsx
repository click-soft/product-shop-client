import React from 'react';
import styles from './PaymentLayout.module.scss';
import { Outlet } from 'react-router-dom';
import PaymentHeader from './Header/PaymentHeader';
import RootFooter from '../RootLayout/Footer/RootFooter';

const PaymentLayout = () => {
  return (
    <>
      <PaymentHeader />
      <main className={`${styles.main}`}>
        <Outlet />
        <RootFooter />
      </main>
    </>
  );
};

export default PaymentLayout;
