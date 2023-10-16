import { CSSProperties, MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import styles from './IconButton.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';

interface IconButtonProps extends ChildrenProps {
  style?: CSSProperties;
  icon: IconType;
  text?: string;
  onClick?: MouseEventHandler | undefined;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}
const IconButton: React.FC<IconButtonProps> = (props) => {
   return (
    <div className={styles.button_container}>
      <button
        className={styles.button}
        onClick={props.onClick}
        style={{ ...props.style }}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <props.icon className={styles.icon} />
        {props.children}
        {props.text && <span className={styles.text}>{props.text}</span>}
      </button>
    </div>
  );
};

export default IconButton;
