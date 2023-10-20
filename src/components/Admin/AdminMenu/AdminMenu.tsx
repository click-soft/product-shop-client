import React from 'react';
import styles from './AdminMenu.module.scss';
import clickIcon from '../../../assets/images/click_icon.png';
import { BiLogOut } from 'react-icons/bi';
import IconButton2 from '../../../ui/IconButton2/IconButton2';
import { AiOutlineFileSearch } from 'react-icons/ai';
import IconNavLink from '../../../ui/IconNavLink/IconNavLink';
import useLogout from '../../../hooks/use-logout';

const AdminMenu = () => {
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
        />
        <IconNavLink
          to="./info"
          className={styles.nav}
          icon={AiOutlineFileSearch}
          text="테스트"
        />
      </section>
      <section className={styles.bottom_section}>
        <IconButton2 icon={BiLogOut} text="로그아웃" onClick={logout} />
      </section>
    </div>
  );
};

export default AdminMenu;
