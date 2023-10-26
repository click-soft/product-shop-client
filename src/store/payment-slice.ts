import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import CheckoutState from '../interfaces/CheckoutState';

interface PaymentState {
  checkout?: CheckoutState;
}
const initialState: PaymentState = {};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    checkout(state, action: PayloadAction<CheckoutState>) {
      state.checkout = { ...action.payload };
    },
  },
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice;
