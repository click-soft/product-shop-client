import DownModal from '../../ui/DownModal/DownModal';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import MenuLink from '../MenuLink/MenuLink';

const MenuModal = () => {
  const showMenuModal = useSelector<RootState>(
    (state) => state.modal.showMenuModal,
  );

  if (!showMenuModal) {
    return <></>;
  }

  return (
    <DownModal popupLocation="left">
      <MenuLink />
    </DownModal>
  );
};

export default MenuModal;
