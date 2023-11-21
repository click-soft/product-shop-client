import { useInfiniteQuery } from 'react-query';
import useIntersectionObserver from '../use-intersection-observer';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import useAdminOrderStore from '../../store/admin-order.store';
import getAdminProductsQuery from '../../graphql/queries/account/get-admin-products.query';

const useAdminOrderInfiniteQuery = () => {
  const { products, variables, setProducts, setIsFetching, clear } = useAdminOrderStore();
  const { isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [ADMIN_QUERY_KEY, variables],
    ({ pageParam = 1 }) => getAdminProductsQuery(pageParam, variables!),
    {
      getNextPageParam: (nextPage) => {
        if (nextPage?.isLast ?? true) {
          return null;
        }
        return nextPage.page + 1;
      },
      onSuccess: (data) => {
        const products = data.pages?.flatMap((pg) => pg.products);
        setProducts(products);
      },

      onError: (err) => {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      },
      enabled: !!variables,
    }
  );

  const { observerComponent } = useIntersectionObserver({
    hasNextPage: !!hasNextPage,
    isFetching: isFetching,
    onIntersecting: () => {
      fetchNextPage();
    },
  });

  useEffect(() => {
    return clear;
  }, []);

  useEffect(() => {
    setIsFetching(isFetching);
  }, [isFetching]);
  return {
    products,
    isFetching,
    observerComponent,
  };
};

export const ADMIN_QUERY_KEY = 'getAdminProducts';
export default useAdminOrderInfiniteQuery;
