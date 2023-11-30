import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useIntersectionObserver from '../use-intersection-observer';
import { useEffect } from 'react';
import { Payment } from '../../graphql/interfaces/payment';
import useOrdersStore from '../../store/orders.store';
import useSocketIo from '../use-socket-io';
import getPaymentWithItemsQuery from '../../graphql/queries/payment/get-payment-with-items.query';

const useOrdersInfiniteQuery = () => {
  const { payments, setPayments, updateSendType } = useOrdersStore();
  const { data, error, hasNextPage, isFetching, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [GET_PAYMENT_WITH_ITEMS_QUERY_KEY],
    queryFn: ({ pageParam }) => getPaymentWithItemsQuery({ pageParam }),
    getNextPageParam: (nextPage) => {
      if (nextPage?.isLast ?? true) {
        return null;
      }
      return nextPage.page + 1;
    }, 
    select: (data) => {
      return data.pages?.flatMap((pg) => pg.payments);
    },
  });

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
    setPayments(data ?? []);
  }, [data, setPayments]);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

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
