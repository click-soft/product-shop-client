import { CSSProperties, MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import styles from './IconButton.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';

interface IconButtonProps extends ChildrenProps {
  style?: CSSProperties;
  onClick?: MouseEventHandler | undefined;
  icon: IconType;
}
const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      style={{
        height: 48,
        width: 48,
        padding: 10,
        ...props.style,
      }}
    >
      <props.icon style={{ width: '100%', height: '100%' }} />
      {props.children}
    </button>
  );
};

export default IconButton;
