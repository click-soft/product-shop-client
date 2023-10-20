import React from 'react';
import styles from './IconButton2.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import { IconType } from 'react-icons';

interface IconButton2Props extends ChildrenProps {
  icon: IconType;
  text?: string;
  onClick: () => void;
}

const IconButton2: React.FC<IconButton2Props> = (props) => {
  return (
    <button className={styles.icon_wrapper} onClick={props.onClick}>
      <props.icon className={styles.icon} />
      <span className={styles.text}>{props.text}</span>
    </button>
  );
};

export default IconButton2;
