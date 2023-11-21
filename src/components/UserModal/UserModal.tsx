import DownModal from '../../ui/DownModal/DownModal';
import styles from './UserModal.module.scss';
import { Link } from 'react-router-dom';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import { BiBasket } from 'react-icons/bi';
import useLogout from '../../hooks/use-logout';
import React from 'react';
import { IconType } from 'react-icons';
import { MdManageAccounts } from 'react-icons/md';
import classNames from 'classnames';
import { IoSettingsOutline } from 'react-icons/io5';
import useModalStore from '../../store/modal.store';

const UserModal = () => {
  const logout = useLogout();
  const { showUserModal } = useModalStore();
  const user = useGetLoginedUser();

  if (!showUserModal) {
    return <></>;
  }

  return (
    <>
      <DownModal>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header__left}>
              <div className={styles.header__left__title}>
                <div>{user?.name}</div>
                <Link to={'/settings/profile'} className={styles.setting_link}>
                  <IoSettingsOutline />
                </Link>
              </div>
              <div className={styles.header__left__sub}>{user?.ykiho}</div>
              <div className={styles.header__left__sub}>{user?.saupkiho}</div>
            </div>
            <div>
              <button className={styles['shop-button']} onClick={logout}>
                {/* <BsCartCheck className={styles['shop-icon']} /> */}
                로그아웃
              </button>
            </div>
          </div>
          <ul className={styles.link_ul}>
            {user?.admin && <LinkButton to="/admin/orders" text="관리자 페이지" icon={MdManageAccounts} admin />}
            <LinkButton to="/orders" text="주문 내역 보기" icon={BiBasket} />
          </ul>
        </div>
      </DownModal>
    </>
  );
};

interface LinkButtonProps {
  icon: IconType;
  to: string;
  text: string;
  admin?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { clear } = useModalStore();
  return (
    <li className={classNames(styles.link_li, props.admin && styles.admin)}>
      <Link to={props.to} className={styles.link} onClick={clear}>
        <props.icon className={styles.icon} />
        <span>{props.text}</span>
      </Link>
    </li>
  );
};
export default UserModal;
