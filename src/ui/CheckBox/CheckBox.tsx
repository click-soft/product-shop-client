import React, { ChangeEventHandler } from 'react';
import styles from './CheckBox.module.scss';

interface CheckBoxProps {
  text?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <div className={styles.checkbox}>
      <input id="checkbox" type="checkbox" checked={props.checked} onChange={props.onChange} />
      <label htmlFor="checkbox">{props.text}</label>
    </div>
  );
};

export default CheckBox;
