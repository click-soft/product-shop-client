import ChildrenProps from '../../../interfaces/children-props';
import styles from './RootHeader.module.scss';
import MenuButton from '../../../components/MenuButton/MenuButton';
import CartButton from '../../../components/CartButton/CartButton';
import UserButton from '../../../components/UserButton/UserButton';
import { useLocation } from 'react-router-dom';
import { MenuLink } from '@/components/MenuLink/MenuLink';
import { useRef, useState } from 'react';
import useScrollWindow from '../../../hooks/use-scroll-window';
import LinkLongLogo from '../../../components/LinkLongLogo/LinkLongLogo';

const RootHeader: React.FC<ChildrenProps> = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const [headerFixed, setHeaderFixed] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useScrollWindow(({ y }) => {
    setHeaderFixed(y > 0 ? styles.header_fixed : '');
  });

  return (
    <header style={{ position: 'relative' }}>
      {headerFixed && <div className={styles.header} style={{ height: ref.current?.clientHeight }}></div>}
      <div ref={ref} className={`${styles.header} ${headerFixed}`}>
        <div className={styles.header__container}>
          <div className={styles.header__left}>{isMainPage && <MenuButton />}</div>
          <div className={styles.header__center}>
            <LinkLongLogo />
          </div>
          <div className={styles.header__right}>
            <UserButton />
            <CartButton />
          </div>
        </div>
        <div className={`${styles.header__menu} ${headerFixed}`}>
          <MenuLink isDropdown={false} />
        </div>
      </div>
    </header>
  );
};

export default RootHeader;
