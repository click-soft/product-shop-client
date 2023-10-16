import { CSSProperties, MouseEventHandler, useState } from 'react';
import { IconType } from 'react-icons';
import styles from './IconButton.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import classNames from 'classnames';
import useResizeWindow from '../../hooks/use-resize-window';

interface IconButtonProps extends ChildrenProps {
  style?: CSSProperties;
  icon: IconType;
  text?: string;
  onClick?: MouseEventHandler | undefined;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}
const IconButton: React.FC<IconButtonProps> = (props) => {
  const { isMobile } = useResizeWindow();
  const [mouseEntered, setMouseEntered] = useState(false);
  console.log(`${props.text} m`, mouseEntered);

  return (
    <div
      className={classNames(
        styles.button_container,
        mouseEntered && !isMobile ? styles.button_to_front : '',
      )}
    >
      <button
        className={styles.button}
        onClick={props.onClick}
        style={{ ...props.style }}
        onMouseEnter={(e) => {
          setMouseEntered(true);
          props?.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setMouseEntered(false);
          props?.onMouseLeave?.(e);
        }}
      >
        <props.icon className={styles.icon} />
        {props.children}
        {props.text && <span className={styles.text}>{props.text}</span>}
      </button>
    </div>
  );
};

export default IconButton;
