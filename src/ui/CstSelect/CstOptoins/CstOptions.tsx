import React from 'react';
import styles from './CstOptions.module.scss';
import CstOptionData from '../interfaces/cst-option-data';
import CstOption from '../CstOption/CstOption';
import classNames from 'classnames';

interface Props {
  option: CstOptionData;
  options: CstOptionData[];
  popup: boolean;
  onChange: (data: CstOptionData) => void;
}

const CstOptions: React.FC<Props> = ({ popup, option, options, onChange }) => {
  const optionComponents = options.map((o) => (
    <CstOption key={o.value} option={o} selected={o === option} onChange={onChange} />
  ));
  return (
    <div className={classNames(styles.wrapper, popup ? styles.popup : undefined)}>
      <ul>{optionComponents}</ul>
    </div>
  );
};

export default CstOptions;
