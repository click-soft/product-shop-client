import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PaymentType } from "../interfaces/PaymentType";
import client from "../graphql/apollo-client";
import { GET_PAYMENT_WITH_ITEMS } from "../graphql/queries/payment";
import { CANCEL_ORDER } from "../graphql/mutates/payment";
import { CheckoutResult } from "../graphql/interfaces/checkout";

interface OrdersState {
  payments: PaymentType[];
}

const initialState: OrdersState = { payments: [] };

const ordersSlice = createSlice({
  name: "orders",
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
      const payment = state.payments.find(p => p.id === action.payload.id);
      if (payment) {
        payment.cancel = true;
      }
    })
  },
});

type PaymentsResultType = {
  isInit: boolean
  payments: PaymentType[]
}
export const getPaymentWithItems = createAsyncThunk(
  'orders-slice/getPaymentWithItems',
  async ({isInit}: { isInit: boolean }): Promise<PaymentsResultType> => {
    const response = await client.query({ query: GET_PAYMENT_WITH_ITEMS })

    return { isInit, payments: response.data.getPaymentWithItems };
  }
);

export const cancelOrder = createAsyncThunk(
  'orders-slice/cancelOrder',
  async ({ payment, cancelReason }: { payment: PaymentType, cancelReason: string }): Promise<PaymentType> => {
    // throw new Error("오메메ㅔ");
    const response = await client.mutate({
      mutation: CANCEL_ORDER, variables: {
        paymentId: payment.id,
        paymentKey: payment.paymentKey,
        cancelReason,
      }
    });

    const data: CheckoutResult = response.data.cancelOrder;
    if (data.success) {
      return payment;
    } else {
      throw new Error(data.errorMessage);
    }
  }
);

export const ordersActions = ordersSlice.actions;
export default ordersSlice;