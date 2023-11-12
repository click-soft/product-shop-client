import React, { ChangeEventHandler } from 'react';
import styles from './CheckBox.module.scss';
import ChildrenProps from '../../interfaces/ChildrenProps';
import classNames from 'classnames';

interface CheckBoxProps extends ChildrenProps {
  text?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <div className={classNames(styles.checkbox, props.className)}>
      <input id="checkbox" type="checkbox" checked={props.checked} onChange={props.onChange} />
      <label htmlFor="checkbox">{props.text}</label>
    </div>
  );
};

export default CheckBox;
