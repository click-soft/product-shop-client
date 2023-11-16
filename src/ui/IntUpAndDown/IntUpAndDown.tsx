import React from 'react';
import styles from './IntUpAndDown.module.scss';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface Props {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
}
const IntUpAndDown: React.FC<Props> = ({ value, onChange, disabled, min = 0, max = 999, step = 1 }) => {
  function handleChange(value: number) {
    if (disabled) return;
    if (value < min || value > max) {
      return;
    }

    onChange(value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon} onClick={handleChange.bind(null, value - step)}>
        <FaMinus></FaMinus>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.icon} onClick={handleChange.bind(null, value + step)}>
        <FaPlus></FaPlus>
      </div>
    </div>
  );
};

export default IntUpAndDown;
