import React, { useEffect, useRef, useState } from 'react';
import styles from './AdminWebOrdersPage.module.scss';
import { GET_ADMIN_PAYMENTS } from '../../graphql/queries/payment';
import OrderGroup from '../../components/OrderGroup/OrderGroup';
import { PaymentType } from '../../graphql/interfaces/payment';
import AdminSearchForm, { FormValues } from '../../components/Admin/AdminSearchForm/AdminSearchForm';
import { format } from 'date-fns';
import useToast from '../../hooks/use-toast';
import { isNuemric } from '../../utils/strings';
import PaymentWithPage from '../../graphql/interfaces/payments-with-page';
import client from '../../graphql/apollo-client';
import { useInfiniteQuery } from 'react-query';
import GetAdminPaymentsArgs from '../../graphql/dto/get-admin-payments-args';
import useGetLoginedUser from '../../hooks/use-get-logined-user';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import { updateOrderCancel } from '../../utils/payment-utils';
import CircleLoading from '../../components/Loading/CircleLoading';

const fetchGetAdminPayments = async (page: number, variables: GetAdminPaymentsArgs): Promise<PaymentWithPage> => {
  if (!variables) {
    return { isLast: true, page: 0, payments: [] };
  }

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

const AdminWebOrdersPage = () => {
  const { toast, toastConatiner } = useToast();
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [variables, setVariables] = useState<GetAdminPaymentsArgs>();
  const user = useGetLoginedUser(true);
  const { hasNextPage, isLoading, fetchNextPage, refetch } = useInfiniteQuery(
    ['getAdminPayments', variables],
    ({ pageParam = 1, queryKey }) => fetchGetAdminPayments(pageParam, variables!),
    {
      getNextPageParam: (nextPage, pages) => {
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
    }
  );

  const { observerComponent } = useIntersectionObserver({
    hasNextPage: !!hasNextPage,
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
            if (state === 'success') updateOrderCancel(setPayments, p);
          }}
        />
      </li>
    );
  });

  function submitHandler(value: FormValues): void {
    const startDate = format(value.startDate, 'yyyy-MM-dd 00:00:00');
    const endDate = format(value.endDate, 'yyyy-MM-dd 23:59:59');
    const emCode = value.manager;
    let customerName: string | undefined;
    let orderId: string | undefined;

    if (isNuemric(value.text)) {
      orderId = value.text;
    } else {
      customerName = value.text;
    }

    // setPayments(undefined);
    setVariables({
      jisa: user?.jisa!,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      emCode,
      customerName,
      orderId,
    });
  }

  useEffect(() => {
    refetch();
  }, [variables]);

  return (
    <div className={styles.container}>
      {isLoading && <CircleLoading />}
      {toastConatiner}
      <AdminSearchForm onSubmit={submitHandler} textLabel="거래처명 or 주문번호" />
      <ul className={styles.order_ul}>{orderGroupComponents}</ul>
      {observerComponent}
    </div>
  );
};

export default AdminWebOrdersPage;
