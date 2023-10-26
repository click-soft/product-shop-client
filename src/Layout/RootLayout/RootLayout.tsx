import { Outlet, useLocation } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import ProductModal from '../../components/ProductModal/ProductModal';
import MenuModal from '../../components/MenuModal/MenuModal';
import { useEffect } from 'react';
import RootHeader from './Header/RootHeader';
import RootFooter from './Footer/RootFooter';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RootLayout = () => {
  ScrollToTop();
  return (
    <>
      <ProductModal />
      <MenuModal />
      <RootHeader />
      <main className={`${styles.main}`}>
        <Outlet />
      </main>
      <RootFooter />
    </>
  );
};

export default RootLayout;
