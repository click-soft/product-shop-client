import useGetLoginedUser from '../use-get-logined-user';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import ProductsByBunryu, { ProductsWithWebBunryu } from '../../interfaces/products-by-bunryu';
import { toast } from 'react-toastify';
import { GET_RPDUCTS_BUNRYU_LIST } from '../../graphql/gql/product';
import useWebBunryus from '../use-web-bunryus';

const useMainQuery = () => {
  const { webBunryus } = useWebBunryus();
  const [prodGroups, setProdGroups] = useState<ProductsWithWebBunryu[]>();
  const user = useGetLoginedUser();
  const { loading, data, error } = useQuery(GET_RPDUCTS_BUNRYU_LIST, {
    variables: { jisa: user?.jisa },
    skip: !user,
  });

  useEffect(() => {
    const prodBunryus: ProductsByBunryu[] = data?.getProductsBunryuList;
    const groups = prodBunryus?.reduce<ProductsWithWebBunryu[]>((acc, prod) => {
      const webBunryu = webBunryus?.find((w) => w.code === prod.bunryu);

      return acc.concat({ ...prod, webBunryu });
    }, []);

    setProdGroups(groups);
  }, [data, webBunryus]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return {
    prodGroups,
    loading,
    error,
  };
};

export default useMainQuery;
