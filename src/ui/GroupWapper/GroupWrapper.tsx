import React from 'react';
import ChildrenProps from '../../interfaces/children-props';
import styles from './GroupWrapper.module.scss';
import classNames from 'classnames';

const GroupWrapper: React.FC<GroupWrapperProps> = ({ className, children, text, fontSize, padding }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.header} style={{ fontSize, padding }}>
        {text}
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export interface GroupWrapperProps extends ChildrenProps {
  text: string;
  fontSize?: string;
  padding?: string | number;
}

export default GroupWrapper;
