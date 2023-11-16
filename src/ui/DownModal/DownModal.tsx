import ChildrenProps from '../../interfaces/children-props';
import styles from './DownModal.module.scss';
import Card from '../Card/Card';
import Backdrop from '../Backdrop/Backdrop';
import { CSSProperties } from 'react';
import useResizeWindow from '../../hooks/use-resize-window';
import useModalStore from '../../store/modal.store';

interface DownModalProps extends ChildrenProps {
  popupLocation?: 'left' | 'right';
}

const DownModal: React.FC<DownModalProps> = (props) => {
  const { isMobile } = useResizeWindow();
  const { clear } = useModalStore();

  function backdropClickHandler() {
    clear();
  }
  const style: CSSProperties = props.popupLocation === 'left' ? { left: 0 } : {};

  function backdropMouseEnterHandler(): void {
    if (isMobile) return;
    clear();
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
