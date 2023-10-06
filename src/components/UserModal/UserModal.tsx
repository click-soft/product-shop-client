import DownModal from '../../ui/DownModal/DownModal';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import styles from './UserModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import { logout } from '../../graphql/mutates/auth';

const UserModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const showUserModal = useSelector<RootState, boolean>(
    (state) => state.modal.showUserModal,
  );
  const user = useGetLoginedUser(showUserModal);

  const logoutHandler = async () => {
    await logout();
    await dispatch(modalActions.closeDownAll());
    navigate('/login');
  };

  if (!showUserModal) {
    return <></>;
  }

  return (
    <DownModal>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header__left}>
            <div className={styles.header__left__title}>{user?.name}</div>
            <div className={styles.header__left__sub}>{user?.ykiho}</div>
            <div className={styles.header__left__sub}>{user?.saupkiho}</div>
          </div>
          <div>
            <button className={styles['shop-button']} onClick={logoutHandler}>
              {/* <BsCartCheck className={styles['shop-icon']} /> */}
              로그아웃
            </button>
          </div>
        </div>
        {/* <div className={styles.body}>주문목록</div> */}
      </div>
    </DownModal>
  );
};

export default UserModal;
