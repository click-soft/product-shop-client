import React from 'react';
import ProductsByBunryu from '../../../interfaces/ProductsByBunryu';
import ProductList from '../ProductList/ProductList';

interface ProductGroupsProps {
  prodGroups?: ProductsByBunryu[];
}
const ProductGroups: React.FC<ProductGroupsProps> = ({ prodGroups }) => {
  const elements: JSX.Element[] | undefined = prodGroups?.map(({ bunryu, products }) => {
    return <ProductList key={bunryu} prodCode={bunryu} prds={products} />;
  });

  return <ul>{elements}</ul>;
};

export default ProductGroups;
