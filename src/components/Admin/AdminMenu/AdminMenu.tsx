import React from 'react';
import styles from './AdminMenu.module.scss';
import clickIcon from '../../../assets/images/click_icon.png';
import { BiLogOut } from 'react-icons/bi';
import IconButton2 from '../../../ui/IconButton2/IconButton2';
import { AiOutlineFileSearch, AiOutlineShop } from 'react-icons/ai';
import IconNavLink from '../../../ui/IconNavLink/IconNavLink';
import useLogout from '../../../hooks/use-logout';

interface AdminMenuProps {
  onLinkClick?: () => void;
}
const AdminMenu: React.FC<AdminMenuProps> = (props) => {
  const logout = useLogout();

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <img src={clickIcon} alt="클릭아이콘" />
        <span>Click Admin</span>
      </section>
      <section className={styles.nav_section}>
        <IconNavLink
          to="./orders"
          className={styles.nav}
          icon={AiOutlineFileSearch}
          text="주문내역"
          onClick={props.onLinkClick}
        />
        <IconNavLink
          to="./web-orders"
          className={styles.nav}
          icon={AiOutlineFileSearch}
          text="웹 주문내역"
          onClick={props.onLinkClick}
        />
      </section>
      <section className={styles.bottom_section}>
        <IconNavLink
          to="/"
          className={styles.nav}
          icon={AiOutlineShop}
          text="물품구매"
          onClick={props.onLinkClick}
        />
        <IconButton2 icon={BiLogOut} text="로그아웃" onClick={logout} />
      </section>
    </div>
  );
};



export default AdminMenu;
