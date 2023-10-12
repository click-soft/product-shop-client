import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ErrorState = {}

const errorSlice = createSlice(
  {
    name: "error",
    initialState,
    reducers: {
      setError(state, action: PayloadAction<ErrorState>) {
        state.code = action.payload.code;
        state.error = action.payload.error;
      },
      clearError(state) {
        state.code = undefined;
        state.error = undefined;
      }
    }
  }
)

export interface ErrorState {
  code?: 'TOKEN_EXPIRED';
  error?: any;
}
export const errorActions = errorSlice.actions;
export default errorSlice;