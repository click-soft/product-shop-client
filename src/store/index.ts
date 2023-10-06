import { configureStore } from '@reduxjs/toolkit'

import modalSlice from './modal-slice';
import cartSlice from './cart-slice';
import paymentSlice from './payment-slice';

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    payment: paymentSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;