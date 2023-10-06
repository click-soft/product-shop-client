import ChildrenProps from '../../interfaces/ChildrenProps';
import styles from './Header.module.scss';
import { BiSearch } from 'react-icons/bi';

import IconButton from '../../ui/IconButton/IconButton';
import MenuButton from '../../components/MenuButton/MenuButton';
import CartButton from '../../components/CartButton/CartButton';
import UserButton from '../../components/UserButton/UserButton';
import logo from '../../assets/images/main_logo.jpg';
import { Link } from 'react-router-dom';

const Header: React.FC<ChildrenProps> = () => {
  function logoClickHandler() {}

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <MenuButton />
          <IconButton icon={BiSearch} onClick={() => {}} />
        </div>
        <div className={styles.header__center}>
          <Link to={'/'}>
            <img
              className={styles.logo}
              src={logo}
              onClick={logoClickHandler}
            />
          </Link>
        </div>
        <div className={styles.header__right}>
          <UserButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
