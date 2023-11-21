import useGetLoginedUser from '../use-get-logined-user';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import ProductsByBunryu from '../../interfaces/products-by-bunryu';
import { toast } from 'react-toastify';
import { GET_RPDUCTS_BUNRYU_LIST } from '../../graphql/gql/product';

const useMainQuery = () => {
  const [prodGroups, setProdGroups] = useState<ProductsByBunryu[]>();
  const user = useGetLoginedUser();
  const { loading, data, error } = useQuery(GET_RPDUCTS_BUNRYU_LIST, {
    variables: { jisa: user?.jisa },
    skip: !user,
  });

  useEffect(() => {
    setProdGroups(data?.getProductsBunryuList);
  }, [data]);

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
