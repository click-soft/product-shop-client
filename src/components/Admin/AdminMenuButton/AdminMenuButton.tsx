import React, { useEffect, useMemo, useState } from 'react';
import styles from './AdminMenuButton.module.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import IconButton from '../../../ui/IconButton/IconButton';
import Drawer from '../../../ui/Drawer/Drawer';
import AdminMenu from '../AdminMenu/AdminMenu';
import useResizeWindow from '../../../hooks/use-resize-window';

const AdminMenuButton = () => {
  const [show, setShow] = useState(false);
  const { isMobile } = useResizeWindow();

  useEffect(() => {
    if (!isMobile) setShow(false);
  }, [isMobile]);
  return (
    <>
      {isMobile && (
        <>
          <Drawer show={show} onClose={() => setShow(false)}>
            <AdminMenu />
          </Drawer>
          <IconButton
            icon={GiHamburgerMenu}
            onClick={() => {
              setShow(true);
            }}
          />
        </>
      )}
    </>
  );
};

export default AdminMenuButton;
