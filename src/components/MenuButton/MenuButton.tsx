import { GiHamburgerMenu } from 'react-icons/gi';
import ChildrenProps from '../../interfaces/ChildrenProps';
import IconButton from '../../ui/IconButton/IconButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { modalActions } from '../../store/modal-slice';
import { useState } from 'react';
import useResizeWindow from '../../hooks/use-resize-window';

const MenuButton: React.FC<ChildrenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
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
