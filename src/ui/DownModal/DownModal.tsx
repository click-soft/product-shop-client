import ChildrenProps from '../../interfaces/ChildrenProps';
import styles from './DownModal.module.scss';
import Card from '../Card';
import Backdrop from '../Backdrop/Backdrop';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import { CSSProperties } from 'react';

interface DownModalProps extends ChildrenProps {
  popupLocation?: 'left' | 'right';
}

const DownModal: React.FC<DownModalProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  function backdropClickHandler() {
    dispatch(modalActions.closeDownAll());
  }
  const style: CSSProperties = props.popupLocation === 'left' ? { left: 0 } : {};
  return (
    <>
      <Backdrop onClick={backdropClickHandler} />
      <Card className={`${styles.slider}`} style={style}>
        {props.children}
      </Card>
    </>
  );
};

export default DownModal;
