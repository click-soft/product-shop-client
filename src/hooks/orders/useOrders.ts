import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { GET_PAYMENT_WITH_ITEMS_QUERY_KEY } from './useOrdersInfiniteQuery';
import { Payment } from '../../graphql/interfaces/payment';
import useOrdersStore from '../../store/ordersStore';
import { GET_PAYMENT_ITEM_CODE } from '../../graphql/queries/payment-item';
import { useLazyQuery } from '@apollo/client';
import { addToCart } from '../../store/cart-slice';
import { useAppDispatch } from '../../store';

const useOrders = () => {
  const dispatch = useAppDispatch();
  const { cancelPayment } = useOrdersStore();
  const queryClient = useQueryClient();
  const [getPaymentItemCode] = useLazyQuery(GET_PAYMENT_ITEM_CODE);

  function cancelHandler(payment: Payment, { state, message }: OrderCancelArgs): void {
    toast[state](message);
    if (state === 'success') {
      queryClient.removeQueries(GET_PAYMENT_WITH_ITEMS_QUERY_KEY);
      cancelPayment(payment);
    }
  }

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
