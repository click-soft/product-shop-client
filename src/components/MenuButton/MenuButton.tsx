import { GiHamburgerMenu } from 'react-icons/gi';
import ChildrenProps from '../../interfaces/ChildrenProps';
import IconButton from '../../ui/IconButton/IconButton';
import styles from './MenuButton.module.scss';
import { useState } from 'react';
import MenuModal from '../MenuModal/MenuModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { modalActions } from '../../store/modal-slice';

const MenuButton: React.FC<ChildrenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  function clickHandler() {
    dispatch(modalActions.showMenu());
  }

  return (
    <>      
      <IconButton icon={GiHamburgerMenu} onClick={clickHandler} />
    </>
  );
};

export default MenuButton;
