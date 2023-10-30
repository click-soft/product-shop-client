import React, { useEffect, useRef, useState } from 'react';
import styles from './AdminWebOrdersPage.module.scss';
import { GET_ADMIN_PAYMENTS } from '../../graphql/queries/payment';
import OrderGroup from '../../components/OrderGroup/OrderGroup';
import { Payment } from '../../graphql/interfaces/payment';
import AdminSearchForm, { FormValues } from '../../components/Admin/AdminSearchForm/AdminSearchForm';
import useToast from '../../hooks/use-toast';
import { isNuemric } from '../../utils/strings';
import PaymentWithPage from '../../graphql/interfaces/payments-with-page';
import client from '../../graphql/apollo-client';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import GetAdminPaymentsArgs from '../../graphql/dto/get-admin-payments-args';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import { updateOrderCancel } from '../../utils/payment-utils';
import CircleLoading from '../../components/Loading/CircleLoading';
import dayjs from 'dayjs';

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

const ADMIN_QUERY_KEY = 'getAdminPayments';
const AdminWebOrdersPage = () => {
  const queryClient = useQueryClient();
  const { toast, toastConatiner } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [variables, setVariables] = useState<GetAdminPaymentsArgs>();
  const user = useGetLoginedUser(true);
  const { hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    [ADMIN_QUERY_KEY, variables],
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

  const orderGroupComponents = payments?.map((p) => {
    return (
      <li className={styles.order_li} key={p.id}>
        <OrderGroup
          isAdmin
          payment={p}
          onCancel={(state, message) => {
            toast[state](message);
            if (state === 'success') {
              queryClient.removeQueries(ADMIN_QUERY_KEY);
              updateOrderCancel(setPayments, p);
            }
          }}
        />
      </li>
    );
  });

  function submitHandler(value: FormValues): void {
    const emCode = value.manager;
    let customerName: string | undefined;
    let orderId: string | undefined;

    if (isNuemric(value.text)) {
      orderId = value.text;
    } else {
      customerName = value.text;
    }

    setVariables({
      jisa: user?.jisa!,
      startDate: dayjs(value.startDate).startOf('day').toDate(),
      endDate: dayjs(value.endDate).endOf('day').toDate(),
      emCode,
      customerName,
      orderId,
    });
    queryClient.invalidateQueries([ADMIN_QUERY_KEY]);
  }

  return (
    <div className={styles.container}>
      {isFetching && <CircleLoading />}
      {toastConatiner}
      <AdminSearchForm onSubmit={submitHandler} textLabel="거래처명 or 주문번호" />
      <ul className={styles.order_ul}>
        {orderGroupComponents}
        {observerComponent}
      </ul>
    </div>
  );
};

export default AdminWebOrdersPage;
