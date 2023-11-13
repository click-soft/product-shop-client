import React from 'react';
import styles from './ErrorText.module.scss';
import ChildrenProps from '../../interfaces/children-props';

interface ErrorTextProps extends ChildrenProps {
  error: string;
}

const ErrorText: React.FC<ErrorTextProps> = (props) => {
  if (!props.error) {
    return <></>;
  }

  return (
    <div className={`${styles['error-wrapper']} ${props.className}`}>
      <div className={styles.error}>{props.error}</div>
    </div>
  );
};

export default ErrorText;
