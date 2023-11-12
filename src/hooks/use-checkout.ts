import { CheckoutCartItemInput, CheckoutInput, CheckoutResult } from '../graphql/interfaces/checkout';
import useCheckoutStore, { CheckoutState } from '../store/checkoutStore';
import { useAppDispatch } from '../store';
import { deleteCartItems } from '../store/cart-slice';
import { useMutation } from '@apollo/client';
import { CHECKOUT } from '../graphql/mutates/payment';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TossQueryParser from '../utils/tossQueryParser';
import CartProduct from '../interfaces/CartItem';

const useCheckout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const checkoutState = useCheckoutStore<CheckoutState>((state) => state);
  const [checkout, { error, loading }] = useMutation(CHECKOUT);
  const { cartItems, orderName, totalQuantity } = checkoutState;

  async function fetchDeleteCartItems(items: CartProduct[]) {
    const ids: number[] = items?.map((item) => item.id!)!;
    dispatch(deleteCartItems(ids));
  }

  async function fetchCheckout() {
    const query = new TossQueryParser(searchParams);
    const { errorMessage } = query.valid;

    if (errorMessage) {
      return setErrorMessage(errorMessage);
    }

    return await fetchCheckoutByArgs({
      paymentType: query.paymentType,
      orderId: query.orderId,
      orderName: orderName,
      paymentKey: query.paymentKey,
      amount: query.amount,
      quantity: totalQuantity,
      items: cartItems,
    });
  }

  async function fetchCheckoutByArgs(args: FetchCheckoutArgs) {
    const items = args.items.map((item) => {
      return {
        code: item.product?.smCode!,
        name: item.product?.smMyung!,
        fit: item.fit,
        quantity: item.quantity,
        amount: item.product?.danga!,
      };
    });

    const data = {
      ...args,
      items: items!,
    };

    const response = await checkout({ variables: data });

    const result: CheckoutResult = response.data?.checkout;

    if (result.success) {
      await fetchDeleteCartItems(args.items);
      navigate(`/payment/success/${args.orderId}`);
    } else {
      throw new Error(result.errorMessage);
    }
  }

  useEffect(() => {
    if (!error) return;
    return setErrorMessage(error.message);
  }, [error]);

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return {
    loading,
    fetchCheckout,
    fetchCheckoutByArgs,
  };
};

type FetchCheckoutArgs = {
  paymentType: string;
  orderId: string;
  orderName: string;
  paymentKey: string;
  amount: number;
  quantity: number;
  items: CartProduct[];
};

export default useCheckout;
