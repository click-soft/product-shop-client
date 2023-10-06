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
    <div className={styles.textbox}>
      <div className={styles.indicator}></div>
      <input type="text" {...props} />
    </div>
  );
};

export default TextInput;
