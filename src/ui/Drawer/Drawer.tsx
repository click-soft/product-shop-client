import React, { useEffect, useState } from 'react';
import styles from './Drawer.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import Backdrop from '../Backdrop/Backdrop';
import classNames from 'classnames';

interface DrawerProps extends ChildrenProps {
  show: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const [disp, setDisp] = useState(false);
  const [closeCalled, setCloseCalled] = useState(false);

  useEffect(() => {
    setDisp(!props.show);
    setCloseCalled(!props.show);
  }, [props.show]);

  function close() {
    setCloseCalled(true);
    setTimeout(() => {
      props.onClose();
    }, 300);
  }

  if (disp) {
    return <></>;
  }

  return (
    <>
      <Backdrop onClick={close} />
      <div
        className={classNames(
          styles.drawer,
          closeCalled ? styles.close : styles.open,
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default Drawer;
