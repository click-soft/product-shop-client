import React from 'react';
import styles from './ProductList.module.scss';
import ProductListSub from '../../../interfaces/product-list-sub';
import ChildrenProps from '../../../interfaces/children-props';
import ProductItem from '../ProductItem/ProductItem';
import { menuObject } from '../../../data/text-mapping';
import classNames from 'classnames';
import useTheme from '../../../hooks/theme/use-theme';

interface ProductListProps extends ChildrenProps {
  prodCode: string;
  prds: ProductListSub[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
  const { themeStyles } = useTheme(styles);
  const title = menuObject[props.prodCode];
  const components = props.prds.map((pls) => {
    return <ProductItem key={pls.auto} productCode={props.prodCode} productList={pls} />;
  });

  return (
    <div className={classNames(themeStyles, styles.container)} id={props.prodCode}>
      <h3 className="header-text">{title}</h3>
      <div className={styles['products-grid']}>
        <ul>{components}</ul>
      </div>
    </div>
  );
};

export default ProductList;
