import { useInfiniteQuery } from 'react-query';
import client from '../../graphql/apollo-client';
import GetAdminProductsArgs from '../../graphql/dto/get-admin-products.args';
import { GET_ADMIN_PRODUCTS } from '../../graphql/queries/product';
import { useAppDispatch, useAppSelector } from '../../store';
import { adminOrderAction } from '../../store/adminOrderSlice';
import useIntersectionObserver from '../use-intersection-observer';
import ProductsWithPage from '../../graphql/interfaces/products-with-page';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const fetchGetAdminProducts = async (page: number, variables: GetAdminProductsArgs): Promise<ProductsWithPage> => {
  const result = await client.query({
    query: GET_ADMIN_PRODUCTS,
    variables: {
      ...variables,
      page,
    },
    fetchPolicy: 'no-cache',
  });

  return result.data?.getAdminProducts;
};

const useAdminOrderInfiniteQuery = () => {
  const dispatch = useAppDispatch();
  const variables = useAppSelector((state) => state.adminOrder.variables);
  const { isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [ADMIN_QUERY_KEY, variables],
    ({ pageParam = 1 }) => fetchGetAdminProducts(pageParam, variables!),
    {
      getNextPageParam: (nextPage, pages) => {
        if (nextPage?.isLast ?? true) {
          return null;
        }
        return nextPage.page + 1;
      },
      onSuccess: (data) => {
        const products = data.pages?.flatMap((pg) => pg.products);
        dispatch(adminOrderAction.setProducts(products));
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
    return () => {
      dispatch(adminOrderAction.clear());
    };
  }, []);

  useEffect(() => {
    dispatch(adminOrderAction.setFetching(isFetching));
  }, [isFetching]);
  return {
    isFetching,
    observerComponent,
  };
};

export const ADMIN_QUERY_KEY = 'getAdminProducts';
export default useAdminOrderInfiniteQuery;
