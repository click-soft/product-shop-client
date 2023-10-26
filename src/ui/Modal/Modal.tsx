import React from 'react';
import ChildrenProps from '../../interfaces/ChildrenProps';
import styles from './Modal.module.scss';
import Card from '../Card';
import Backdrop from '../Backdrop/Backdrop';
import ReactDOM from 'react-dom';

interface ModalProps extends ChildrenProps {
  className?: string;
  onBackdropClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const modalElement = document.getElementById('modal-root') as HTMLElement;

  return (
    <>
      <Backdrop onClick={props.onBackdropClick} />
      {ReactDOM.createPortal(
        <Card className={`${styles.modal} ${props.className}`}>{props.children}</Card>,
        modalElement
      )}
    </>
  );
};

export default Modal;
