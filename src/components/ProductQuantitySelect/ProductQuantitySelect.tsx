import React from 'react';
import IntUpAndDown from '@/ui/IntUpAndDown/IntUpAndDown';

interface ProductQuantitySelectProps {
  onChange: (value: number) => void;
  value: number;
  isFit: boolean;
  step : number;
}
const ProductQuantitySelect: React.FC<ProductQuantitySelectProps> = (props) => {
  return (
    <IntUpAndDown value={props.value} step={props.step} min={props.step} onChange={(v) => props.onChange(v)} />
     );
};

export default ProductQuantitySelect;
