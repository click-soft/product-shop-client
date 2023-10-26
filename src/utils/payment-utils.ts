import { Payment } from '../graphql/interfaces/payment';

export function updateOrderCancel(setPayments: (value: React.SetStateAction<Payment[]>) => void, p: Payment) {
  setPayments((prevPayments: Payment[]) => {
    return prevPayments.map((payment) => {
      if (payment === p) {
        return { ...payment, cancel: true };
      }
      return payment;
    });
  });
}
