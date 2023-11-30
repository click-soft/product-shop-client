import { toast } from 'react-toastify';
import { Payment } from '../../graphql/interfaces/payment';
import useOrdersStore from '../../store/orders.store';
import { GET_PAYMENT_ITEM_CODE } from '../../graphql/gql/payment-item';
import { useLazyQuery } from '@apollo/client';
import useCart from '../use-cart';
import { useQueryClient } from '@tanstack/react-query';
import { GET_PAYMENT_WITH_ITEMS_QUERY_KEY } from './use-orders-infinite-query';

const useOrders = () => {
  const { fetchAddToCart } = useCart();
  const { cancelPayment } = useOrdersStore();
  const [getPaymentItemCode] = useLazyQuery(GET_PAYMENT_ITEM_CODE);
  const queryClient = useQueryClient();

  function cancelHandler(payment: Payment, { state, message }: OrderCancelArgs): void {
    toast[state](message);
    if (state === 'success') {
      cancelPayment(payment);
      queryClient.removeQueries([GET_PAYMENT_WITH_ITEMS_QUERY_KEY]);
    }
  }

  function reorderHandler(p: Payment) {
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;

    async function reorder() {
      for (const item of p.paymentItems) {
        const result = await getPaymentItemCode({ variables: { id: item.id } });
        const code = result.data?.getPaymentItemById?.code;
        if (!code) continue;

        await fetchAddToCart({
          code: code,
          fit: item.fit,
          quantity: item.quantity,
        });
      }
    }
    reorder();
  }

  return {
    cancelHandler,
    reorderHandler,
  };
};

export type OrderCancelArgs = {
  state: 'success' | 'error';
  message: string;
};

export default useOrders;
