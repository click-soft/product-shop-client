import React from 'react';
import styles from './IconWrapper.module.scss';
import { IconType } from 'react-icons';
import ChildrenProps from '../../interfaces/children-props';
import classNames from 'classnames';

interface Props extends ChildrenProps {
  icon: IconType;
  iconSize?: number;
  flexDirection?: 'column';
  color?: string;
}

const IconWrapper: React.FC<Props> = (props) => {
  const { icon: Icon, className, children, flexDirection, color, iconSize } = props;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <Icon className={styles.icon} style={{ flexDirection, color, width: iconSize, height: iconSize }} />
      {children}
    </div>
  );
};

export default IconWrapper;
