import { useInfiniteQuery } from 'react-query';
import client from '../../graphql/apollo-client';
import PaymentWithPage from '../../graphql/interfaces/payments-with-page';
import { toast } from 'react-toastify';
import useIntersectionObserver from '../use-intersection-observer';
import { useEffect } from 'react';
import { Payment } from '../../graphql/interfaces/payment';
import useOrdersStore from '../../store/orders.store';
import useSocketIo from '../use-socket-io';
import { GET_PAYMENT_WITH_ITEMS } from '../../graphql/gql/payment';

const fetchGetPaymentWithItems = async ({ pageParam = 1 }): Promise<PaymentWithPage> => {
  const result = await client.query({
    query: GET_PAYMENT_WITH_ITEMS,
    variables: { page: pageParam },
    fetchPolicy: 'no-cache',
  });

  return result.data?.getPaymentWithItems;
};

const useOrdersInfiniteQuery = () => {
  const { payments, setPayments, updateSendType } = useOrdersStore();
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } = useInfiniteQuery(
    [GET_PAYMENT_WITH_ITEMS_QUERY_KEY],
    fetchGetPaymentWithItems,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.isLast ?? true) return undefined;
        return lastPage.page + 1;
      },
      select({ pageParams, pages }) {
        const payments = pages.flatMap((pg) => pg.payments);
        return { pageParams, pages: payments };
      },
      onError: (err) => {
        toast.error((err as any).message);
      },
    }
  );

  const { observerComponent } = useIntersectionObserver({
    hasNextPage: !!hasNextPage,
    isFetching: isFetching,
    onIntersecting: () => {
      fetchNextPage();
    },
  });

  useSocketIo({
    receiveEventName: 'onOrders',
    onError: (error) => {
      toast.error(error.message);
    },
    onReceive: (args) => {
      const sock: SockType = args[0];
      switch (sock.state) {
        case 'update':
          updateSendType(sock.data);
          break;
        case 'checkout':
          refetch();
      }
    },
  });

  useEffect(() => {
    setPayments(data?.pages ?? []);
  }, [data]);

  return {
    payments,
    observerComponent,
  };
};

type SockType = {
  state: 'update' | 'checkout';
  data: Payment;
};

export const GET_PAYMENT_WITH_ITEMS_QUERY_KEY = 'getPaymentWithItems';
export default useOrdersInfiniteQuery;
