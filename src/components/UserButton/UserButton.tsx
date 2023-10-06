import React from 'react';
import IconButton from '../../ui/IconButton/IconButton';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { modalActions } from '../../store/modal-slice';

const UserButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clickHandler = () => {
    dispatch(modalActions.showUser());
  };

  return (
    <>
      <IconButton icon={AiOutlineUser} onClick={clickHandler} />
    </>
  );
};

export default UserButton;
