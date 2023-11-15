import { GiHamburgerMenu } from 'react-icons/gi';
import ChildrenProps from '../../interfaces/children-props';
import IconButton from '../../ui/IconButton/IconButton';
import useResizeWindow from '../../hooks/use-resize-window';
import useModalStore from '../../store/modal.store';

const MenuButton: React.FC<ChildrenProps> = () => {
  const { showMenu } = useModalStore();
  const { isMobile } = useResizeWindow();

  if (!isMobile) return <></>;

  return (
    <>
      <IconButton icon={GiHamburgerMenu} onClick={showMenu} />
    </>
  );
};

export default MenuButton;
