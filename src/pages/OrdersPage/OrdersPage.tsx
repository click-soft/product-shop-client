import React, { useEffect, useRef, useState } from 'react';
import styles from './OrdersPage.module.scss';
import OrderGroup from '../../components/OrderGroup/OrderGroup';
import { useAppDispatch } from '../../store';
import useToast from '../../hooks/use-toast';
import { Payment } from '../../graphql/interfaces/payment';
import { addToCart } from '../../store/cart-slice';
import { useLazyQuery } from '@apollo/client';
import { GET_PAYMENT_ITEM_CODE } from '../../graphql/queries/payment-item';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import client from '../../graphql/apollo-client';
import { GET_PAYMENT_WITH_ITEMS } from '../../graphql/queries/payment';
import PaymentWithPage from '../../graphql/interfaces/payments-with-page';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import { updateOrderCancel } from '../../utils/payment-utils';
import useSocketIo from '../../hooks/use-socket-io';

const QUERY_KEY = 'getPaymentWithItems';

const fetchGetPaymentWithItems = async ({ pageParam = 1 }): Promise<PaymentWithPage> => {
  const result = await client.query({
    query: GET_PAYMENT_WITH_ITEMS,
    variables: { page: pageParam },
    fetchPolicy: 'no-cache',
  });

  return result.data?.getPaymentWithItems;
};

const OrdersPage = () => {
  const queryClient = useQueryClient();
  const { toast, toastConatiner } = useToast();
  const dispatch = useAppDispatch();
  const [getPaymentItemCode] = useLazyQuery(GET_PAYMENT_ITEM_CODE);
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } = useInfiniteQuery(
    [QUERY_KEY],
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

  useEffect(() => {
    setPayments(data?.pages ?? []);
  }, [data]);

  useSocketIo({
    receiveEventName: 'onOrders',
    onError: (error) => {
      toast.error(error.message);
    },
    onReceive: (args) => {
      const result: {
        state: 'update' | 'checkout';
        data: Payment;
      } = args[0];

      if (result.state === 'update') {
        const payment: Payment = result.data;
        setPayments((prevPayments) => {
          return prevPayments.map((p) => {
            if (p.id === payment.id) {
              return {
                ...p,
                sendType: payment.sendType,
              };
            }
            return p;
          });
        });
      } else if (result.state === 'checkout') {
        refetch();
      }
    },
  });

  const { observerComponent } = useIntersectionObserver({
    hasNextPage: !!hasNextPage,
    isFetching: isFetching,
    onIntersecting: () => {
      fetchNextPage();
    },
  });

  function reorderHandler(p: Payment) {
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;
    async function reorder() {
      for (const item of p.paymentItems) {
        const result = await getPaymentItemCode({ variables: { id: item.id } });
        const code = result.data?.getPaymentItemById?.code;
        if (!code) continue;

        await dispatch(
          addToCart({
            code: code,
            fit: item.fit,
            quantity: item.quantity,
          })
        );
      }
    }
    reorder();
  }

  const orderGroupsComponents = payments?.map((p) => {
    return (
      <li key={p.id}>
        <OrderGroup
          payment={p}
          onCancel={(state, message) => {
            toast[state](message);
            if (state === 'success') {
              queryClient.removeQueries(QUERY_KEY);
              updateOrderCancel(setPayments, p);
            }
          }}
          onReorder={() => reorderHandler(p)}
        />
      </li>
    );
  });

  return (
    <>
      {toastConatiner}
      <div className={styles.main}>
        <ul className={styles['order-ul']}>
          {orderGroupsComponents}
          <li>{observerComponent}</li>
        </ul>{' '}
      </div>
    </>
  );
};

export default OrdersPage;
