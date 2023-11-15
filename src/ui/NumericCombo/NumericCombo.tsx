import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './NumericCombo.module.scss';
import { isNuemric } from '../../utils/strings';
import DeviceUtils from '../../utils/device.utils';

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
  const testRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [comboValue, setComboValue] = useState<number | string>(1);
  const isCustom = comboValue === 'custom' || +comboValue > 10;
  const isValueChanged = isCustom ? value !== +inputValue : value !== comboValue;

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
    const startValue = isFit ? 6 : 2;
    const arr = [];
    for (let i = startValue; i <= 10; i = i + 2) {
      arr.push(i);
    }

    return arr;
  }, [minValue]);

  function countApplyHandler() {
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

  useEffect(() => {
    if (isCustom) testRef.current?.focus();
  }, [isCustom]);

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
            onBlur={DeviceUtils.isIOS ? undefined : mouseLeaveHandler}
            onFocus={(e) => e.target.select()}
            value={inputValue}
            onMouseOut={DeviceUtils.isIOS ? mouseLeaveHandler : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                countApplyHandler();
              }
            }}
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
        <select className={styles['combo-style']} onChange={comboChangeHandler} value={comboValue}>
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
      <input className={styles.testinput} type="text" ref={testRef} value={'test'} />
      <input type="hidden" value={value} />
    </>
  );
};

export default NumericCombo;
