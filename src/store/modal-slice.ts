import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";
import ProductListSub from "../interfaces/ProductListSub";

interface ProductPayload {
  productCode?: string;
  data?: ProductListSub;
}

interface ModalState {
  showProductModal: boolean;
  showCartModal: boolean;
  showUserModal: boolean;
  showMenuModal: boolean;

  productCode?: string;
  data?: ProductListSub;
}

const initialState: ModalState = {
  showProductModal: false,
  showCartModal: false,
  showUserModal: false,
  showMenuModal: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showProduct(state, action: PayloadAction<ProductPayload>) {
      state.showProductModal = true;
      state.data = action.payload.data;
      state.productCode = action.payload.productCode;
    },
    closeProduct(state) {
      state.showProductModal = false;
      state.productCode = undefined;
    },
    showMenu(state) {
      state.showMenuModal = true;
    },
    showCart(state) {
      state.showCartModal = true;
    },
    showUser(state) {
      state.showUserModal = true;
    },
    closeDownAll(state) {
      state.showMenuModal = false;
      state.showCartModal = false;
      state.showUserModal = false;

    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
