import DownModal from '../../ui/DownModal/DownModal';
import { MenuLink } from '../MenuLink/MenuLink';
import useModalStore from '../../store/modal.store';

const MenuModal = () => {
  const { showMenuModal } = useModalStore();

  if (!showMenuModal) {
    return <></>;
  }

  return (
    <DownModal popupLocation="left">
      <MenuLink isDropdown={true} />
    </DownModal>
  );
};

export default MenuModal;
