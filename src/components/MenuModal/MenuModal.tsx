import DownModal from '../../ui/DownModal/DownModal';
import { useAppSelector } from '../../store';
import MenuLink from '../MenuLink/MenuLink';

const MenuModal = () => {
  const showMenuModal = useAppSelector((state) => state.modal.showMenuModal);

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
