import client from '../../apollo-client';
import { GET_PAYMENT_WITH_ITEMS } from '../../gql/payment';
import PaymentWithPage from '../../interfaces/payments-with-page';

const getPaymentWithItemsQuery = async ({ pageParam = 1 }): Promise<PaymentWithPage> => {
  const result = await client.query({
    query: GET_PAYMENT_WITH_ITEMS,
    variables: { page: pageParam },
    fetchPolicy: 'no-cache',
  });

  return result.data?.getPaymentWithItems;
};

export default getPaymentWithItemsQuery;
