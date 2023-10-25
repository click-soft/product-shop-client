import ChildrenProps from '../../interfaces/ChildrenProps';
import styles from './DownModal.module.scss';
import Card from '../Card';
import Backdrop from '../Backdrop/Backdrop';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import { CSSProperties } from 'react';
import useResizeWindow from '../../hooks/use-resize-window';

interface DownModalProps extends ChildrenProps {
  popupLocation?: 'left' | 'right';
}

const DownModal: React.FC<DownModalProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isMobile } = useResizeWindow();
  function backdropClickHandler() {
    dispatch(modalActions.closeDownAll());
  }
  const style: CSSProperties =
    props.popupLocation === 'left' ? { left: 0 } : {};

  function backdropMouseEnterHandler(): void {
    console.log('isMobile', isMobile);

    if (isMobile) return;
    dispatch(modalActions.closeDownAll());
  }

  return (
    <>
      <Backdrop
        onClick={backdropClickHandler}
        onMouseEnter={backdropMouseEnterHandler}
        notScrollHidden
      />
      <Card className={`${styles.slider}`} style={style}>
        {props.children}
      </Card>
    </>
  );
};

export default DownModal;
