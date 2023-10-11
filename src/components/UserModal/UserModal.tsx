import DownModal from '../../ui/DownModal/DownModal';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import styles from './UserModal.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import { logout } from '../../graphql/mutates/auth';
import { BiBasket } from 'react-icons/bi';
import useToast from '../../hooks/use-toast';

const UserModal = () => {
  const navigate = useNavigate();
  const { showToast, toastComponet } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const showUserModal = useSelector<RootState, boolean>(
    (state) => state.modal.showUserModal,
  );
  const user = useGetLoginedUser(showUserModal);

  const logoutHandler = async () => {
    await logout().catch((err) => {
      showToast('error', err.message);
    });
    await dispatch(modalActions.closeDownAll());
    navigate('/login');
  };

  if (!showUserModal) {
    return <></>;
  }

  return (
    <>
      {toastComponet}
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
          <ul className={styles.list}>
            <li>
              <Link
                to="/orders"
                onClick={() => {
                  dispatch(modalActions.closeDownAll());
                }}
              >
                <BiBasket className={styles.icon} />
                <span>주문 내역 보기</span>
              </Link>
            </li>
          </ul>
        </div>
      </DownModal>
    </>
  );
};

export default UserModal;
