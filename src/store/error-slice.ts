import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ErrorState = {};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<ErrorArgs>) {
      state.error = action.payload;
    },
    clear(state) {
      state.error = undefined;
    },
  },
});
export interface ErrorState {
  error?: ErrorArgs;
}

export interface ErrorArgs {
  code?: string;
  status?: number;
  message?: string;
}

export const errorActions = errorSlice.actions;
export default errorSlice;
