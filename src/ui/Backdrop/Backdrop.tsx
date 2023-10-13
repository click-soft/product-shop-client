import React, { MouseEventHandler } from 'react';
import styles from './Backdrop.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import ReactDOM from 'react-dom';

interface BackdropProps extends ChildrenProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Backdrop: React.FC<BackdropProps> = (props) => {
  const data = document.getElementById('backdrop-root') as HTMLElement;

  return ReactDOM.createPortal(
    <div className={`${styles.backdrop} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </div>,
    data,
  );
};

export default Backdrop;
