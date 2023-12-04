import { create } from 'zustand';
import ProductListSub from '../interfaces/product-list-sub';
import ProductListWebBunryu from '@/graphql/interfaces/product-list-web-bunryu';

type ProductPayload = {
  code?: string;
  data?: ProductListSub;
  webBunryu?: ProductListWebBunryu;
};

type State = {
  showProductModal: boolean;
  showCartModal: boolean;
  showUserModal: boolean;
  showMenuModal: boolean;

  productPayload?: ProductPayload;
};

type Actions = {
  showProduct: (action: ProductPayload) => void;
  showMenu: () => void;
  showCart: () => void;
  showUser: () => void;
  closeProduct: () => void;
  closeMenu: () => void;
  closeCart: () => void;
  closeUser: () => void;
  clear: () => void;
};

const initialState: State = {
  showProductModal: false,
  showUserModal: false,
  showCartModal: false,
  showMenuModal: false,
  productPayload: undefined,
};

const useModalStore = create<State & Actions>((set) => ({
  ...initialState,
  showProduct: (action) => set(() => ({ showProductModal: true, productPayload: action })),
  showMenu: () => set(() => ({ showMenuModal: true })),
  showCart: () => set(() => ({ showCartModal: true })),
  showUser: () => set(() => ({ showUserModal: true })),
  closeProduct: () => set(() => ({ showProductModal: false })),
  closeMenu: () => set(() => ({ showMenuModal: false })),
  closeCart: () => set(() => ({ showCartModal: false })),
  closeUser: () => set(() => ({ showUserModal: false })),
  clear: () => set(initialState),
}));

export default useModalStore;
