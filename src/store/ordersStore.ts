import { create } from 'zustand';
import { Payment } from '../graphql/interfaces/payment';
import { updateCancel } from '../utils/payment-utils';

interface State {
  payments: Payment[];
}

interface Actions {
  setPayments: (payments: Payment[]) => void;
  cancelPayment: (payment: Payment) => void;
  updateSendType: (payment: Payment) => void;
  clear: () => void;
}

const initialState: State = {
  payments: [],
};

const useOrdersStore = create<State & Actions>((set) => ({
  ...initialState,
  setPayments: (payments) => set(() => ({ payments })),
  cancelPayment: (payment) =>
    set((state) => {
      const updatedPayments = updateCancel(state.payments, payment);
      return {
        payments: updatedPayments,
      };
    }),
  updateSendType: (payment) =>
    set((state) => {
      const updatedPayments = state.payments.map((p) => {
        if (p.id === payment.id) {
          return {
            ...p,
            sendType: payment.sendType,
          };
        }
        return p;
      });
      return {
        payments: updatedPayments,
      };
    }),
  clear: () => set(initialState),
}));

export default useOrdersStore;
