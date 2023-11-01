import ChildrenProps from '../../interfaces/ChildrenProps';
import styles from './DownModal.module.scss';
import Card from '../Card/Card';
import Backdrop from '../Backdrop/Backdrop';
import { useAppDispatch } from '../../store';
import { modalActions } from '../../store/modal-slice';
import { CSSProperties } from 'react';
import useResizeWindow from '../../hooks/use-resize-window';

interface DownModalProps extends ChildrenProps {
  popupLocation?: 'left' | 'right';
}

const DownModal: React.FC<DownModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useResizeWindow();
  function backdropClickHandler() {
    dispatch(modalActions.closeDownAll());
  }
  const style: CSSProperties = props.popupLocation === 'left' ? { left: 0 } : {};

  function backdropMouseEnterHandler(): void {
    if (isMobile) return;
    dispatch(modalActions.closeDownAll());
  }

  return (
    <>
      <Backdrop onClick={backdropClickHandler} onMouseEnter={backdropMouseEnterHandler} notScrollHidden />
      <Card className={`${styles.slider}`} style={style}>
        {props.children}
      </Card>
    </>
  );
};

export default DownModal;
