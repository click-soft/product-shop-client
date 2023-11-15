import IconButton from '../../ui/IconButton/IconButton';
import { AiOutlineUser } from 'react-icons/ai';
import useResizeWindow from '../../hooks/use-resize-window';
import { useEffect, useState } from 'react';
import UserModal from '../UserModal/UserModal';
import useModalStore from '../../store/modal.store';

const UserButton = () => {
  const { isMobile } = useResizeWindow();
  const [mouseEntered, setMouseEntered] = useState(false);
  const { showUserModal, showUser, closeUser } = useModalStore();

  useEffect(() => {
    if (!showUserModal) {
      setMouseEntered(false);
    }
  }, [showUserModal]);

  useEffect(() => {
    if (isMobile) return;
    if (mouseEntered) {
      showUser();
    } else {
      closeUser();
    }
  }, [mouseEntered]);

  return (
    <IconButton
      icon={AiOutlineUser}
      onClick={showUser}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
      text={isMobile ? '' : '계정'}
      modalComponent={<UserModal />}
    ></IconButton>
  );
};

export default UserButton;
