import { useEffect, useRef, useState } from 'react';
import Drawer, { DrawerHandler } from '../../../../ui/Drawer/Drawer';
import useResizeWindow from '../../../../hooks/use-resize-window';
import { GiHamburgerMenu } from 'react-icons/gi';
import IconButton from '../../../../ui/IconButton/IconButton';
import SettingsLeftMenu from '../../LeftMenu/SettingsLeftMenu';

const MenuButton = () => {
  const drawerRef = useRef<DrawerHandler>(null);
  const [show, setShow] = useState(false);
  const { isMobile } = useResizeWindow();

  useEffect(() => {
    if (!isMobile) setShow(false);
  }, [isMobile]);

  if (!isMobile) {
    return <></>;
  }

  return (
    <>
      <Drawer ref={drawerRef} show={show} onClose={() => setShow(false)}>
        <SettingsLeftMenu onClick={() => drawerRef.current?.close()} />
      </Drawer>
      <IconButton
        icon={GiHamburgerMenu}
        onClick={() => {
          setShow(true);
        }}
      />
    </>
  );
};

export default MenuButton;
