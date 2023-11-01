import { CSSProperties, MouseEventHandler, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import styles from './IconButton.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import classNames from 'classnames';
import useResizeWindow from '../../hooks/use-resize-window';
import { RootState, useAppSelector } from '../../store';
import { useSelector } from 'react-redux';

interface IconButtonProps extends ChildrenProps {
  style?: CSSProperties;
  icon: IconType;
  text?: string;
  onClick?: MouseEventHandler | undefined;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  modalComponent?: React.ReactNode;
}
const IconButton: React.FC<IconButtonProps> = (props) => {
  const { isMobile } = useResizeWindow();
  const [mouseEntered, setMouseEntered] = useState(false);
  const isModalShown = useAppSelector((state) => {
    return state.modal.showCartModal || state.modal.showMenuModal || state.modal.showUserModal;
  });

  useEffect(() => {
    if (!isModalShown) {
      setMouseEntered(false);
    }
  }, [isModalShown]);

  return (
    <div
      onMouseEnter={(e) => {
        setMouseEntered(true);
        props?.onMouseEnter?.();
      }}
      onMouseLeave={(e) => {
        setMouseEntered(false);
        props?.onMouseLeave?.();
      }}
    >
      <div className={mouseEntered && !isMobile ? styles.button_to_front : ''}>
        <div className={classNames(styles.button_container)}>
          <button className={styles.button} onClick={props.onClick} style={{ ...props.style }}>
            <props.icon className={styles.icon} />
            {props.children}
            {props.text && <span className={styles.text}>{props.text}</span>}
          </button>
        </div>
      </div>
      {props.modalComponent}
    </div>
  );
};

export default IconButton;
