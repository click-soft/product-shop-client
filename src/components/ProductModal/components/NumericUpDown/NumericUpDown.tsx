import { useRef } from 'react';
import CustomLi from '../CustomLi/CustomLi';
import styles from './NumericUpDown.module.scss';

const MIN_COUNT_VALUE = 1;
const MAX_COUNT_VALUE = 99;

interface NumericUpDownProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const NumericUpDown: React.FC<NumericUpDownProps> = (props) => {
  const countUpDown = (type: 'up' | 'down') => {
    const newCount = type === 'up' ? props.quantity + 1 : props.quantity - 1;
    changeCount(newCount);
  };

  const countChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = +e.target.value;
    changeCount(newCount);
  };

  const changeCount = (value: number) => {
    if (value >= MIN_COUNT_VALUE && value <= MAX_COUNT_VALUE) {
      props.onQuantityChange(value);
    }
  };

  function focusHandler(event: React.FocusEvent<HTMLInputElement, Element>): void {
    event.target.select();
  }

  return (
    <CustomLi
      title="수량"
      children={
        <>
          <input
            className={`${styles['data']} ${styles['count-input']}`}
            type="number"
            onChange={countChangeHandler}
            onFocus={focusHandler}
            value={props.quantity}
            min={MIN_COUNT_VALUE}
            max={MAX_COUNT_VALUE}
          />
          <button className={styles['count-button']} onClick={() => countUpDown('up')} type="button">
            ▲
          </button>
          <button className={styles['count-button']} onClick={() => countUpDown('down')} type="button">
            ▼
          </button>
        </>
      }
    />
  );
};

export default NumericUpDown;
