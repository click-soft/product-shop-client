import { useInfiniteQuery } from '@tanstack/react-query';
import client from '../../graphql/apollo-client';
import GetAdminPaymentsArgs from '../../graphql/dto/get-admin-payments.args';
import PaymentWithPage from '../../graphql/interfaces/payments-with-page';
import useAdminWebOrdersStore from '../../store/admin-web-orders.store';
import { toast } from 'react-toastify';
import useIntersectionObserver from '../use-intersection-observer';
import { useEffect } from 'react';
import { GET_ADMIN_PAYMENTS } from '../../graphql/gql/payment';

const fetchGetAdminPayments = async (page: number, variables: GetAdminPaymentsArgs): Promise<PaymentWithPage> => {
  const result = await client.query({
    query: GET_ADMIN_PAYMENTS,
    variables: {
      ...variables,
      page,
    },
    fetchPolicy: 'no-cache',
  });

  return result.data?.getAdminPayments;
};

const useAdminWebOrdersInfiniteQuery = () => {
  const { variables, setPayments, setFetching } = useAdminWebOrdersStore();

  const { data, error, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [GET_AMDIN_PAYMENTS_KEY, variables],
    queryFn: ({ pageParam = 1 }) => fetchGetAdminPayments(pageParam, variables!),
    getNextPageParam: (nextPage) => {
      if (nextPage.isLast) return undefined;
      return nextPage.page + 1;
    },
    select: (data) => data.pages?.flatMap((pg) => pg.payments),
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
    setFetching(isFetching);
  }, [isFetching, setFetching]);

  useEffect(() => {
    setPayments(data ?? []);
  }, [data, setPayments]);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return {
    observerComponent,
  };
};

export const GET_AMDIN_PAYMENTS_KEY = 'getAdminPayments';
export default useAdminWebOrdersInfiniteQuery;
