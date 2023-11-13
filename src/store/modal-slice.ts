import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type } from 'os';
import ProductListSub from '../interfaces/product-list-sub';

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
  showUserModal: false,
  showCartModal: false,
  showMenuModal: false,
};

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
    closeUser(state) {
      state.showUserModal = false;
    },
    closeMenu(state) {
      state.showMenuModal = false;
    },
    closeCart(state) {
      state.showCartModal = false;
    },
    closeDownAll(state) {
      state.showUserModal = false;
      state.showMenuModal = false;
      state.showCartModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
