import React from 'react';
import LinkToLogin from '../LinkToLogin/LinkToLogin';
import styles from './ChangeResult.module.scss';
import classNames from 'classnames';

interface Props {
  message: string;
  isError?: boolean;
}
const ChangeSuccess: React.FC<Props> = ({ message, isError }) => {
  const classes = classNames(isError ? styles.error : styles.success);

  return (
    <div>
      <div className={classNames(styles.message, classes)}>{message}</div>
      <LinkToLogin />
    </div>
  );
};

export default ChangeSuccess;
