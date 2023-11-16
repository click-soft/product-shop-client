import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './NumericCombo.module.scss';
import { isNuemric } from '../../utils/strings';
import CstSelect from '../CstSelect/CstSelect';
import CstOptionData from '../CstSelect/interfaces/cst-option-data';

interface NumericComboProps {
  value?: number;
  onValueChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  isFit: boolean;
}

const NumericCombo: React.FC<NumericComboProps> = ({
  value: initValue,
  onValueChange,
  minValue = 2,
  maxValue = 100,
  isFit,
}) => {
  const [isInit, setIsInit] = useState(true);
  const [value, setValue] = useState(1);
  const textRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [comboValue, setComboValue] = useState<number | string>(1);
  const isCustom = comboValue === 'custom' || +comboValue > 10;
  const isValueChanged = isCustom ? value !== +inputValue : value !== comboValue;

  function comboChangeHandler({ value }: CstOptionData) {
    if (value === 'custom') {
      setComboValue(value);
      setTimeout(() => textRef.current?.focus());
    } else {
      if (+value >= minValue && +value <= maxValue) {
        setComboValue(value);
      }
    }
  }

  const options = useMemo(() => {
    const startValue = isFit ? 6 : 2;
    const values: CstOptionData[] = [];
    for (let i = startValue; i <= 10; i = i + 2) {
      values.push({ value: i, label: i.toString() });
    }
    values.push({ value: 'custom', label: '직접입력' });
    return values;
  }, [minValue]);

  function countApplyHandler() {
    if (+inputValue >= minValue && +inputValue <= maxValue) {
      const isOdd = +inputValue % 2 === 1;
      if (isOdd) return;
      setValue(+inputValue);
      setComboValue(+inputValue);
    }
  }

  useEffect(() => {
    if (initValue) {
      const isOdd = initValue % 2 === 1;
      if (isOdd) return;

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
            ref={textRef}
            type="text"
            className={styles['combo-style']}
            onBlur={mouseLeaveHandler}
            onFocus={(e) => e.target.select()}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isValueChanged && (
            <button
              className={styles['button-style']}
              onMouseDown={(e) => e.preventDefault()}
              onClick={countApplyHandler}
            >
              적용
            </button>
          )}
        </div>
      ) : (
        <CstSelect options={options} defaultValue={comboValue} onChange={comboChangeHandler} />
      )}
      <input type="hidden" value={value} />
    </>
  );
};

export default NumericCombo;
