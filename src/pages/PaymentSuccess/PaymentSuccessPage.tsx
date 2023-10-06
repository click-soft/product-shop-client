import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CHECKOUT, checkout } from '../../graphql/mutates/payment';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CheckoutState from '../../interfaces/CheckoutState';
import LocalStorageManager, {
  LocalStoragekey,
} from '../../utils/local-storage-manager';

interface TossSuccessQueries {
  paymentType: string;
  orderId: string;
  paymentKey: string;
  amount: number;
}

const PaymentSuccessPage = () => {
  const checkoutState = LocalStorageManager.get<CheckoutState>(
    LocalStoragekey.CHECKOUT_DATA,
  );
  const [searchParams] = useSearchParams();
  const query: TossSuccessQueries = {
    paymentType: searchParams.get('paymentType')!,
    orderId: searchParams.get('orderId')!,
    paymentKey: searchParams.get('paymentKey')!,
    amount: parseInt(searchParams.get('amount')!),
  };

  useEffect(() => {
    const items = checkoutState?.cartItems?.map((item) => {
      return {
        code: item.product?.smCode!,
        name: item.product?.smMyung!,
        fit: item.fit,
        quantity: item.quantity,
        amount: item.product?.danga!,
      };
    });

    checkout({
      paymentType: query.paymentType,
      orderId: query.orderId,
      orderName: checkoutState?.orderName!,
      paymentKey: query.paymentKey,
      amount: query.amount,
      quantity: checkoutState?.totalQuantity!,
      items: items!,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('결제 에러', error);
      });
  }, []);

  return <div>결제 성공 페이지</div>;
};

export default PaymentSuccessPage;
