import React from 'react';
import styles from './ProductQuantitySelect.module.scss';

interface ProductQuantitySelectProps {
  onChange: (value: number) => void;
  value: number;
  isFit: boolean;
}
const ProductQuantitySelect: React.FC<ProductQuantitySelectProps> = (props) => {
  function getOptions(): number[] {
    const options = [];
    const startIndex = props.isFit ? 6 : 2;
    for (let i = startIndex; i <= 10; i = i + 2) {
      options.push(i);
    }

    return options;
  }

  return (
    <select
      className={styles.select}
      value={props.value}
      onChange={(e) => props.onChange?.(+e.target.value)}
    >
      {getOptions().map((i) => (
        <option key={i} value={i}>{i}</option>
      ))}
    </select>
  );
};

export default ProductQuantitySelect;
