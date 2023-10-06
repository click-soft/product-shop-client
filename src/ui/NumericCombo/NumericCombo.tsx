import React, { useEffect, useMemo, useState } from 'react';
import styles from './NumericCombo.module.scss';
import { isNuemric } from '../../utils/strings';

interface NumericComboProps {
  value?: number;
  onValueChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
}

const NumericCombo: React.FC<NumericComboProps> = ({
  value: initValue,
  onValueChange,
  minValue = 1,
  maxValue = 99,
}) => {
  const [isInit, setIsInit] = useState(true);
  const [value, setValue] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [comboValue, setComboValue] = useState<number | string>(1);
  const isCustom = comboValue === 'custom' || +comboValue > 10;
  const isValueChanged = isCustom
    ? value !== +inputValue
    : value !== comboValue;
  function comboChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'custom') {
      setComboValue(e.target.value);
    } else {
      const comboValue = +e.target.value;
      if (comboValue >= minValue && comboValue <= maxValue) {
        setComboValue(e.target.value);
      }
    }
  }

  const options: number[] = useMemo(() => {
    const arr = [];
    for (let i = minValue; i <= 10; i++) {
      arr.push(i);
    }

    return arr;
  }, [minValue]);

  function countApplyHandler() {
    console.log('apply?');
    if (+inputValue >= minValue && +inputValue <= maxValue) {
      setValue(+inputValue);
      setComboValue(+inputValue);
    }
  }

  useEffect(() => {
    if (initValue) {
      setValue(initValue);
      setInputValue(initValue.toString());
      setComboValue(initValue);
    }
  }, [initValue]);

  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      return;
    }

    onValueChange?.(value);
  }, [value]);

  useEffect(() => {
    if (isNuemric(comboValue.toString())) {
      const value = +comboValue.toString();

      setInputValue(value.toString());
      setValue(value);
    }
  }, [comboValue, setValue, setInputValue]);

  function mouseLeaveHandler(): void {
    setInputValue(value.toString());
    setComboValue(value);
  }

  return (
    <>
      {isCustom ? (
        <div className={styles['input-container']}>
          <input
            type="text"
            className={styles['combo-style']}
            onBlur={mouseLeaveHandler}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isValueChanged && (
            <button
              className={styles['button-style']}
              onMouseDown={(e) => e.preventDefault()}
              onClick={countApplyHandler}
            >
              {' '}
              적용
            </button>
          )}
        </div>
      ) : (
        <select
          className={styles['combo-style']}
          onChange={comboChangeHandler}
          value={comboValue}
        >
          {options.map((i) => {
            return (
              <option key={i} value={i}>
                {i}
              </option>
            );
          })}
          <option value={'custom'}>직접입력</option>
        </select>
      )}
      <input type="hidden" value={value} />
    </>
  );
};

export default NumericCombo;
