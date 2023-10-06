import React from 'react';
import styles from './CustomLi.module.scss';
const CustomLi: React.FC<{ title: string; text?: string; children?: any }> = (
  props,
) => {
  return (
    <li>
      <span className={styles['title-span']}>{props.title}</span>
      <span className={styles['colon-span']}>:</span>
      {props.text && <span className={styles['data']}>{props.text}</span>}
      {props.children && props.children}
    </li>
  );
};

export default CustomLi;
