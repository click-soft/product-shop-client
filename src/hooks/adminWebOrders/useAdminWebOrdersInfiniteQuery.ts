import { useInfiniteQuery } from 'react-query';
import client from '../../graphql/apollo-client';
import GetAdminPaymentsArgs from '../../graphql/dto/get-admin-payments-args';
import PaymentWithPage from '../../graphql/interfaces/payments-with-page';
import { GET_ADMIN_PAYMENTS } from '../../graphql/queries/payment';
import useAdminWebOrdersStore from '../../store/adminWebOrdersStore';
import { toast } from 'react-toastify';
import useIntersectionObserver from '../use-intersection-observer';
import { useEffect } from 'react';

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

  const { hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    [GET_AMDIN_PAYMENTS_KEY, variables],
    ({ pageParam = 1 }) => fetchGetAdminPayments(pageParam, variables!),
    {
      getNextPageParam: (nextPage) => {
        if (nextPage.isLast) return undefined;
        return nextPage.page + 1;
      },
      onSuccess: (data) => {
        const payments = data?.pages.flatMap((pg) => pg.payments);
        setPayments(payments ?? []);
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
    setFetching(isFetching);
  }, [isFetching]);

  return {
    observerComponent,
  };
};

export const GET_AMDIN_PAYMENTS_KEY = 'getAdminPayments';
export default useAdminWebOrdersInfiniteQuery;
