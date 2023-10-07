import { configureStore } from '@reduxjs/toolkit'

import modalSlice from './modal-slice';
import cartSlice from './cart-slice';
import paymentSlice from './payment-slice';
import ordersSlice from './orders-slice';

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    payment: paymentSlice.reducer,
    orders: ordersSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;