import React, { MouseEventHandler, useEffect } from 'react';
import styles from './Backdrop.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import ReactDOM from 'react-dom';

interface BackdropProps extends ChildrenProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter?: () => void;
  zIndex?: number;
  setPortal?: boolean;
  notScrollHidden?: boolean;
}
const Backdrop: React.FC<BackdropProps> = (props) => {
  useEffect(() => {
    if (!props.notScrollHidden) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (!props.notScrollHidden) {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);
  if (props.setPortal) {
    const data = document.getElementById('backdrop-root') as HTMLElement;

    return ReactDOM.createPortal(
      <div style={{ zIndex: props.zIndex }} className={`${styles.backdrop} ${props.className}`} onClick={props.onClick}>
        {props.children}
      </div>,
      data
    );
  } else {
    return (
      <div
        style={{ zIndex: props.zIndex }}
        className={`${styles.backdrop} ${props.className}`}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
      >
        {props.children}
      </div>
    );
  }
};

export default Backdrop;
