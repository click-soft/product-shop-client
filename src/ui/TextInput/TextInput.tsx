import React from 'react';
import styles from './TextInput.module.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className={`${props.className} ${styles.textbox}`}>
      <input type="text" {...props} ref={ref} className={styles.input} />
      <div className={styles.indicator}></div>
    </div>
  );
});

export default TextInput;
