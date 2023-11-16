import React from 'react';
import styles from './CstOption.module.scss';
import CstOptionData from '../interfaces/cst-option-data';
import classNames from 'classnames';

interface Props {
  option: CstOptionData;
  selected: boolean;
  onChange: (data: CstOptionData) => void;
}
const CstOption: React.FC<Props> = ({ option, selected, onChange }) => {
  function handleClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
    event.preventDefault();
    onChange(option);
  }

  return (
    <li className={classNames(styles.item, selected ? styles.selected : '')} onClick={handleClick}>
      {option.label}
    </li>
  );
};

export default CstOption;
