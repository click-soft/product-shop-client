import ProductListWebBunryu from '@/graphql/interfaces/product-list-web-bunryu';
import getWebBunryus from '@/graphql/queries/product-list-web-bunryus/get-web-bunryus.query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useWebBunryus = () => {
  const [webBunryus, setWebBunryus] = useState<ProductListWebBunryu[]>();
  useEffect(() => {
    getWebBunryus()
      .then((data) => {
        setWebBunryus(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return { webBunryus };
};

export default useWebBunryus;
