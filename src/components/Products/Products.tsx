import React from 'react';
import styles from './Products.module.scss';
import ProductListSub from '../../interfaces/ProductListSub';
import ChildrenProps from '../../interfaces/ChildrenProps';
import ProductItem from '../Product/ProductItem';
import { menuObject } from '../../shared/text-mapping';

interface ProductsProps extends ChildrenProps {
  prodCode: string;
  prds: ProductListSub[];
}

const Products: React.FC<ProductsProps> = (props) => {
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

export default Products;
