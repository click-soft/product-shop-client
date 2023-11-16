import React, { useEffect, useState } from 'react';
import styles from './CstSelect.module.scss';
import { BiChevronDown } from 'react-icons/bi';
import CstOptions from './CstOptoins/CstOptions';
import CstOptionData from './interfaces/cst-option-data';

interface Props {
  options: CstOptionData[];
  defaultValue?: string | number;
  onChange?: (value: CstOptionData) => void;
}

const CstSelect: React.FC<Props> = ({ options, defaultValue, onChange }) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [selOption, setSelOption] = useState<CstOptionData>();
  const [dispOption, setDispOption] = useState<CstOptionData>();

  function handleChange(data: CstOptionData): void {
    setDispOption(data);
  }

  function handlePopup(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    setPopup((prevPopup) => !prevPopup);
  }

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target?.closest('#CstSelect')) {
        return;
      }
      setPopup(false);
    };

    const handleKeyDown = (event: any) => {
      if (event.key === 'Tab') {
        setPopup(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const option = options.find((o) => o.value === defaultValue);
    setSelOption(option);
    setDispOption(option);
  }, [defaultValue]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
    e.preventDefault();

    let index;
    switch (e.key) {
      case 'ArrowUp':
        index = options.findIndex((o) => o === dispOption) - 1;
        if (index > -1) {
          const option = options[index];
          setDispOption(option);
          if (!popup) {
            setSelOption(option);
          }
        }
        break;
      case 'ArrowDown':
        index = options.findIndex((o) => o === dispOption) + 1;
        if (index < options.length) {
          const option = options[index];
          setDispOption(option);
          if (!popup) {
            setSelOption(option);
          }
        }
        break;
      case 'Escape':
      case 'Enter':
        setPopup(false);
        break;
    }
  }

  useEffect(() => {
    if (!selOption) return;
    if (selOption.value === defaultValue) return;

    onChange?.(selOption);
  }, [selOption, defaultValue]);

  useEffect(() => {
    if (popup) return;
    setSelOption(dispOption);
  }, [popup]);

  return (
    <div id="CstSelect" className={styles.wrapper} onClick={handlePopup}>
      <CstOptions popup={popup} option={dispOption!} options={options} onChange={handleChange} />
      <input className={styles.input} onKeyDown={handleKeyDown} value={dispOption?.label} readOnly={true} />
      <button className={styles.down_button} tabIndex={-1} onKeyDown={handleKeyDown}>
        <BiChevronDown />
      </button>
    </div>
  );
};

export default CstSelect;
