import IconButton from '../../ui/IconButton/IconButton';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { modalActions } from '../../store/modal-slice';
import useResizeWindow from '../../hooks/use-resize-window';
import styles from './UserButton.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UserModal from '../UserModal/UserModal';

const UserButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isMobile } = useResizeWindow();
  const [mouseEntered, setMouseEntered] = useState(false);
  const showUserModal = useSelector<RootState>(
    (state) => state.modal.showUserModal,
  );

  function showModal() {
    dispatch(modalActions.showUser());
  }

  function closeModal() {
    dispatch(modalActions.closeUser());
  }

  useEffect(() => {
    if (!showUserModal) {
      setMouseEntered(false);
    }
  }, [showUserModal]);

  useEffect(() => {
    if (isMobile) return;
    if (mouseEntered) {
      showModal();
    } else {
      closeModal();
    }
  }, [mouseEntered]);
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
    >
      <IconButton
        icon={AiOutlineUser}
        onClick={showModal}
        text={isMobile ? '' : '계정'}
      ></IconButton>
      <UserModal />
    </div>
  );
};

export default UserButton;
