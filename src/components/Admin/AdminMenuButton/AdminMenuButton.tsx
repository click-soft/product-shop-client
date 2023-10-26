import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './AdminMenuButton.module.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import IconButton from '../../../ui/IconButton/IconButton';
import Drawer, { DrawerHandler } from '../../../ui/Drawer/Drawer';
import AdminMenu from '../AdminMenu/AdminMenu';
import useResizeWindow from '../../../hooks/use-resize-window';

const AdminMenuButton = () => {
  const drawerRef = useRef<DrawerHandler>(null);
  const [show, setShow] = useState(false);
  const { isMobile } = useResizeWindow();

  useEffect(() => {
    if (!isMobile) setShow(false);
  }, [isMobile]);
  return (
    <>
      {isMobile && (
        <>
          <Drawer ref={drawerRef} show={show} onClose={() => setShow(false)}>
            <AdminMenu onLinkClick={() => drawerRef.current?.close()} />
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
