import DownModal from '../../ui/DownModal/DownModal';
import { useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '../../store';
import styles from './UserModal.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import { BiBasket } from 'react-icons/bi';
import useLogout from '../../hooks/use-logout';
import React from 'react';
import { IconType } from 'react-icons';
import { MdManageAccounts } from 'react-icons/md';
import classNames from 'classnames'; 

const UserModal = () => {
  const logout = useLogout();
  const showUserModal = useSelector<RootState, boolean>(
    (state) => state.modal.showUserModal,
  );
  
  const user = useGetLoginedUser(showUserModal);

  if (!showUserModal) {
    return <></>;
  }

  return (
    <>
      <DownModal>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header__left}>
              <div className={styles.header__left__title}>{user?.name}</div>
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
            {user?.admin && (
              <LinkButton
                to="/admin/orders"
                text="관리자 페이지"
                icon={MdManageAccounts}
                admin
              />
            )}
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
  return (
    <li className={classNames(styles.link_li, props.admin && styles.admin)}>
      <Link
        to={props.to}
        className={styles.link}
        onClick={() => {
          store.dispatch(modalActions.closeDownAll());
        }}
      >
        <props.icon className={styles.icon} />
        <span>{props.text}</span>
      </Link>
    </li>
  );
};
export default UserModal;
