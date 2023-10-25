import React, { useEffect, useState } from 'react';
import styles from './Drawer.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import Backdrop from '../Backdrop/Backdrop';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

interface DrawerProps extends ChildrenProps {
  show: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  zIndex?: number;
  overflow?: 'hidden' | 'auto' | 'scroll';
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const [disp, setDisp] = useState(false);
  const [closeCalled, setCloseCalled] = useState(false);
  const anchor = props.anchor ?? 'left';
  const overflow = props.overflow ?? 'hidden';

  const animationType =
    anchor === 'left' || anchor === 'right' ? 'width' : 'height';

  useEffect(() => {
    setDisp(props.show);
    setCloseCalled(!props.show);
  }, [props.show]);

  function close() {
    setCloseCalled(true);
    setTimeout(() => {
      props.onClose();
    }, 300);
  }

  if (!disp) {
    return <></>;
  }

  const rootElement = document.getElementById('drawer-root') as HTMLElement;
  const portal = ReactDOM.createPortal(
    <>
      <Backdrop onClick={close} zIndex={props.zIndex} setPortal={true} />
      <div
        className={classNames(
          styles.drawer,
          styles[anchor],
          closeCalled
            ? styles[`close_${animationType}`]
            : styles[`open_${animationType}`],
        )}
        style={{
          zIndex: props.zIndex ? props.zIndex + 1 : undefined,
          overflow,
        }}
      >
        {props.children}
      </div>
    </>,
    rootElement,
  );

  return portal;
};

export default Drawer;
