import { configureStore } from '@reduxjs/toolkit';

import ordersSlice from './orders-slice';
import errorSlice from './error-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import adminOrderSlice from './admin-order-slice';

const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
    error: errorSlice.reducer,
    adminOrder: adminOrderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
