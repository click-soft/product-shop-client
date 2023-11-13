import { GiHamburgerMenu } from 'react-icons/gi';
import ChildrenProps from '../../interfaces/children-props';
import IconButton from '../../ui/IconButton/IconButton';
import { useAppDispatch } from '../../store';
import { modalActions } from '../../store/modal-slice';
import useResizeWindow from '../../hooks/use-resize-window';

const MenuButton: React.FC<ChildrenProps> = () => {
  const dispatch = useAppDispatch();
  const { isMobile } = useResizeWindow();
  function clickHandler() {
    dispatch(modalActions.showMenu());
  }

  if (!isMobile) {
    return <></>;
  }

  return (
    <>
      <IconButton icon={GiHamburgerMenu} onClick={clickHandler} />
    </>
  );
};

export default MenuButton;
