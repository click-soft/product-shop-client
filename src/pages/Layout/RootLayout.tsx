import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import styles from './RootLayout.module.scss';
import Footer from './Footer';
import UserModal from '../../components/UserModal/UserModal';
import CartModal from '../../components/CartModal/CartModal';
import ProductModal from '../../components/ProductModal/ProductModal';
import MenuModal from '../../components/MenuModal/MenuModal';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const RootLayout = () => {
  ScrollToTop();
  return (
    <>
      <UserModal />
      <CartModal />
      <ProductModal />
      <MenuModal />
      <Header />
      <main className={`${styles.main}`}>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default RootLayout;
