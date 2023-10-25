import React from 'react';
import styles from './DeliverySelect.module.scss';

interface InnerSelectProps {
  value: string;
  onChange: (value: string) => void;
  object: { [key: string]: string };
}

const DeliverySelect: React.FC<InnerSelectProps> = (props) => {
  const keys = Object.keys(props.object);
  keys.sort();

  return (
    <select
      className={styles.inner_select}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      {keys.map((k) => (
        <option key={k} value={k}>
          {props.object[k]}
        </option>
      ))}
    </select>
  );
};

export default DeliverySelect;
