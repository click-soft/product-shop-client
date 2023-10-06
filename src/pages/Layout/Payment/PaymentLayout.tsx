import React from 'react';
import styles from './PaymentLayout.module.scss';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import PaymentHeader from './PaymentHeader';

const PaymentLayout = () => {
  return (
    <>
      <PaymentHeader />
      <main className={`${styles.main}`}>
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default PaymentLayout;
