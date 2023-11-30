import { useInfiniteQuery } from '@tanstack/react-query';
import useIntersectionObserver from '../use-intersection-observer';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import useAdminOrderStore from '../../store/admin-order.store';
import getAdminProductsQuery from '../../graphql/queries/account/get-admin-products.query';

const useAdminOrderInfiniteQuery = () => {
  const { products, variables, setProducts, setIsFetching, clear } = useAdminOrderStore();
  const { data, error, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [ADMIN_QUERY_KEY, variables],
    queryFn: ({ pageParam }) => getAdminProductsQuery(pageParam, variables!),
    getNextPageParam: (nextPage) => {
      if (nextPage?.isLast ?? true) {
        return null;
      }
      return nextPage.page + 1;
    },
    select: (data) => {
      return data.pages?.flatMap((pg) => pg.products);
    },
    enabled: !!variables,
  });

  const { observerComponent } = useIntersectionObserver({
    hasNextPage: !!hasNextPage,
    isFetching: isFetching,
    onIntersecting: () => {
      fetchNextPage();
    },
  });

  useEffect(() => {
    return clear;
  }, [clear]);

  useEffect(() => {
    setProducts(data ?? []);
  }, [data, setProducts]);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    setIsFetching(isFetching);
  }, [isFetching, setIsFetching]);

  return {
    products,
    isFetching,
    observerComponent,
  };
};

export const ADMIN_QUERY_KEY = 'getAdminProducts';
export default useAdminOrderInfiniteQuery;
