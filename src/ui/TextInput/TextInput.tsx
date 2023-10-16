import React from 'react';
import ChildrenProps from '../../interfaces/ChildrenProps';
import styles from './TextInput.module.scss';
interface TextProps extends ChildrenProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return (
    <div className={`${props.className} ${styles.textbox}`}>
      <input type="text" {...props} className={styles.input}/>
      <div className={styles.indicator}></div>
    </div>
  );
};

export default TextInput;
