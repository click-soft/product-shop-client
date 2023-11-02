import { Payment } from '../graphql/interfaces/payment';

export function updateOrderCancel(setPayments: (value: React.SetStateAction<Payment[]>) => void, p: Payment) {
  setPayments((prevPayments: Payment[]) => updateCancel(prevPayments, p));
}

export function updateCancel(prevPayments: Payment[], payment: Payment) {
  return prevPayments.map((prevPayment) => {
    if (prevPayment === payment) {
      return { ...prevPayment, cancel: true };
    }
    return prevPayment;
  });
}
