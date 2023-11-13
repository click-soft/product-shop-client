import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Product from '../graphql/interfaces/product';
import GetAdminProductsArgs from '../graphql/dto/get-admin-products.args';

const initialState: AdminOrderState = {
  products: [],
};

type AdminOrderState = {
  products: Product[];
  variables?: GetAdminProductsArgs | null;
  isFetching?: boolean;
  isUpdateLoading?: boolean;
};

const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setVariables(state, action: PayloadAction<GetAdminProductsArgs>) {
      state.variables = action.payload;
    },
    clear(state) {
      state.variables = null;
      state.products = [];
    },
    setUpdateLoading(state, action: PayloadAction<boolean>) {
      state.isUpdateLoading = action.payload;
    },
    setFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
});

export const adminOrderAction = adminOrderSlice.actions;
export default adminOrderSlice;
