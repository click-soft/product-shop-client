import React from 'react';
import styles from './ProductList.module.scss';
import ProductListSub from '../../../interfaces/ProductListSub';
import ChildrenProps from '../../../interfaces/ChildrenProps';
import ProductItem from '../ProductItem/ProductItem';
import { menuObject } from '../../../data/text-mapping';

interface ProductListProps extends ChildrenProps {
  prodCode: string;
  prds: ProductListSub[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
  const title = menuObject[props.prodCode];

  const components = props.prds.map((pls) => {
    return <ProductItem key={pls.auto} productCode={props.prodCode} productList={pls} />;
  });

  return (
    <div className={styles.container} id={props.prodCode}>
      <h3 className="header-text">{title}</h3>
      <div className={styles['products-grid']}>
        <ul>{components}</ul>
      </div>
    </div>
  );
};

export default ProductList;
