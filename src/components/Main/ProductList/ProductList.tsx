import React from 'react';
import styles from './ProductList.module.scss';
import ChildrenProps from '../../../interfaces/children-props';
import ProductItem from '../ProductItem/ProductItem';
import classNames from 'classnames';
import useTheme from '../../../hooks/theme/use-theme';
import { ProductsWithWebBunryu } from '@/interfaces/products-by-bunryu';

interface ProductListProps extends ChildrenProps {
  prodGroup: ProductsWithWebBunryu;
}

const ProductList: React.FC<ProductListProps> = ({ prodGroup }) => {
  const { bunryu, products, webBunryu } = prodGroup;

  const { themeStyles } = useTheme(styles);
  const components = products.map((pls) => {
    return <ProductItem key={pls.auto} webBunryu={webBunryu} productCode={bunryu} productList={pls} />;
  });

  return (
    <div className={classNames(themeStyles, styles.container)} id={bunryu}>
      <h3 className="header-text">{webBunryu?.name}</h3>
      <div className={styles['products-grid']}>
        <ul>{components}</ul>
      </div>
    </div>
  );
};

export default ProductList;
