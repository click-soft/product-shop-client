import { create } from 'zustand';
import GetAdminPaymentsArgs from '../graphql/dto/get-admin-payments-args';
import { Payment } from '../graphql/interfaces/payment';
import { updateCancel } from '../utils/payment-utils';

type State = {
  payments: Payment[];
  variables?: GetAdminPaymentsArgs;
  isFetching?: boolean;
};

type Actions = {
  setPayments: (payments: Payment[]) => void;
  setVariables: (variables: GetAdminPaymentsArgs) => void;
  setFetching: (isFetching: boolean) => void;
  cancelPayment: (payment: Payment) => void;
  clear: () => void;
};

const initialState: State = {
  payments: [],
  variables: undefined,
  isFetching: false,
};

const useAdminWebOrdersStore = create<State & Actions>((set) => ({
  ...initialState,
  setPayments: (payments) => set(() => ({ payments: payments })),
  setVariables: (variables) => set(() => ({ variables: variables })),
  setFetching: (isFetching) => set(() => ({ isFetching: isFetching })),
  cancelPayment: (payment) =>
    set((state) => {
      const payments = [...state.payments];
      updateCancel(payments, payment);

      return { payments };
    }),
  clear: () => set(initialState),
}));

export default useAdminWebOrdersStore;
