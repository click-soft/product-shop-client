import client from '../../apollo-client';
import RefundOrderArgs from '../../dto/refund-order.args';
import { REFUND_ORDER } from '../../gql/payment';
import { CheckoutResult } from '../../interfaces/checkout';

const refundOrderMutate = async (args: RefundOrderArgs): Promise<CheckoutResult> => {
  const response = await client.mutate({
    mutation: REFUND_ORDER,
    variables: {
      ...args,
    },
  });

  return response.data?.refundOrder;
};

export default refundOrderMutate;
