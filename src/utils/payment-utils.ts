import { PaymentType } from '../graphql/interfaces/payment';

export function updateOrderCancel(setPayments: (value: React.SetStateAction<PaymentType[]>) => void, p: PaymentType) {
  setPayments((prevPayments: PaymentType[]) => {
    return prevPayments.map((payment) => {
      if (payment === p) {
        return { ...payment, cancel: true };
      }
      return payment;
    });
  });
}
