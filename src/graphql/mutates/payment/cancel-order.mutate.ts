import client from '../../apollo-client';
import { CANCEL_ORDER } from '../../gql/payment';
import { CheckoutResult } from '../../interfaces/checkout';
import { Payment } from '../../interfaces/payment';

type Args = {
  payment: Payment;
  cancelReason: string;
};

const cancelOrderMutate = async (args: Args): Promise<CheckoutResult> => {
  const { payment, cancelReason } = args;
  const response = await client.mutate({
    mutation: CANCEL_ORDER,
    variables: {
      paymentId: payment.id,
      paymentKey: payment.paymentKey,
      cancelReason,
    },
  });

  if (response.errors) {
    throw response.errors;
  }

  return response.data?.cancelOrder;
};

export default cancelOrderMutate;
