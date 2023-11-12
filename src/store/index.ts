import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './modal-slice';
import ordersSlice from './orders-slice';
import errorSlice from './error-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import adminOrderSlice from './adminOrderSlice';

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
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
