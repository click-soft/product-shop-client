import React from 'react';
import styles from './AdminMenuButton.module.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import IconButton from '../../../ui/IconButton/IconButton';

const AdminMenuButton = () => {
  return <IconButton icon={GiHamburgerMenu} />;
};

export default AdminMenuButton;
