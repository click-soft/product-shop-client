import React from 'react';
import styles from './ProductPage.module.scss';
import Products from '../../components/Products/Products';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import ProductsByBunryu from '../../interfaces/ProductsByBunryu';
import { useQuery } from '@apollo/client';
import { GET_RPDUCTS_BUNRYU_LIST } from '../../graphql/queries/product';

const ProductPage: React.FC = (props) => {
  const user = useGetLoginedUser(true);
  const { loading, error, data } = useQuery(GET_RPDUCTS_BUNRYU_LIST, {
    variables: { jisa: user?.jisa },
    skip: !user,
  });

  const prds: ProductsByBunryu[] = data?.getProductsBunryuList;
  let elements: JSX.Element[];

  if (prds) {
    elements = prds.map(({ bunryu, products }) => {
      return <Products key={bunryu} prodCode={bunryu} prds={products} />;
    });
  } else {
    return <div>데이터 없음..</div>;
  }

  return <ul className={styles.container}>{elements}</ul>;
};

export default ProductPage;
