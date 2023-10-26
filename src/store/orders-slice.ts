import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET_PAYMENT_WITH_ITEMS } from '../graphql/queries/payment';
import { CANCEL_ORDER, REFUND_ORDER } from '../graphql/mutates/payment';
import { CheckoutResult } from '../graphql/interfaces/checkout';
import { Payment } from '../graphql/interfaces/payment';
import RefundOrderArgs from '../graphql/dto/refund-order-args';
import client from '../graphql/apollo-client';

interface OrdersState {
  payments: Payment[];
}

const initialState: OrdersState = { payments: [] };

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPaymentWithItems.fulfilled, (state, action) => {
      const { isInit, payments } = action.payload;
      if (isInit) {
        state.payments = [];
      }
      state.payments = state.payments.concat(payments);
    });

    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      const payment = state.payments.find((p) => p.id === action.payload);
      if (payment) {
        payment.cancel = true;
      }
    });

    builder.addCase(refundOrder.fulfilled, (state, action) => {
      const payment = state.payments.find((p) => p.id === action.payload);
      if (payment) {
        payment.cancel = true;
      }
    });
  },
});

type PaymentsResultType = {
  isInit: boolean;
  payments: Payment[];
};
export const getPaymentWithItems = createAsyncThunk(
  'orders-slice/getPaymentWithItems',
  async ({ isInit }: { isInit: boolean }): Promise<PaymentsResultType> => {
    try {
      const response = await client.query({
        query: GET_PAYMENT_WITH_ITEMS,
        fetchPolicy: 'no-cache',
      });

      return { isInit, payments: response.data.getPaymentWithItems };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders-slice/cancelOrder',
  async ({ payment, cancelReason }: { payment: Payment; cancelReason: string }): Promise<number> => {
    const response = await client.mutate({
      mutation: CANCEL_ORDER,
      variables: {
        paymentId: payment.id,
        paymentKey: payment.paymentKey,
        cancelReason,
      },
    });

    const data: CheckoutResult = response.data.cancelOrder;
    if (data.success) {
      return payment.id;
    } else {
      throw new Error(data.errorMessage);
    }
  }
);

export const refundOrder = createAsyncThunk(
  'orders-slice/refundOrder',
  async (args: RefundOrderArgs): Promise<number> => {
    const response = await client.mutate({
      mutation: REFUND_ORDER,
      variables: {
        ...args,
      },
    });

    const data: CheckoutResult = response.data.refundOrder;
    if (data.success) {
      return args.paymentId;
    } else {
      throw new Error(data.errorMessage);
    }
  }
);
export const ordersActions = ordersSlice.actions;
export default ordersSlice;
