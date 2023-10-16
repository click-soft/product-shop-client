import React, { MouseEventHandler } from 'react';
import styles from './Backdrop.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import ReactDOM from 'react-dom';

interface BackdropProps extends ChildrenProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter?: () => void;
}
const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <div
      className={`${styles.backdrop} ${props.className}`}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
    >
      {props.children}
    </div>
  );
  // const data = document.getElementById('backdrop-root') as HTMLElement;

  // return ReactDOM.createPortal(
  //   <div
  //     className={`${styles.backdrop} ${props.className}`}
  //     onClick={props.onClick}
  //   >
  //     {props.children}
  //   </div>,
  //   data,
  // );
};

export default Backdrop;
