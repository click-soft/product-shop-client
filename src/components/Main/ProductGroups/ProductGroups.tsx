import React from 'react';
import ProductList from '../ProductList/ProductList';
import { ProductsWithWebBunryu } from '@/interfaces/products-by-bunryu';

interface ProductGroupsProps {
  prodGroups?: ProductsWithWebBunryu[];
}
const ProductGroups: React.FC<ProductGroupsProps> = ({ prodGroups }) => {
  const elements: JSX.Element[] | undefined = prodGroups?.map((prodGroup) => {
    return <ProductList key={prodGroup.bunryu} prodGroup={prodGroup} />;
  });

  return <ul>{elements}</ul>;
};

export default ProductGroups;
