import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CartItem from '../interfaces/cart-item';

type Actions = {
  setData: (data: CheckoutState) => void;
  clear: () => void;
};

const initialState: CheckoutState = {
  totalPrice: 0,
  totalQuantity: 0,
  orderName: '',
  cartItems: [],
  orderId: undefined,
  method: undefined,
  requestedAt: undefined,
  approvedAt: undefined,
};

const useCheckoutStore = create(
  persist<CheckoutState & Actions>(
    (set) => ({
      ...initialState,
      setData: (data) => set(() => ({ ...data })),
      clear: () => set(initialState),
    }),
    {
      name: 'checkoutStoreData',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export type CheckoutState = {
  totalPrice: number;
  totalQuantity: number;
  orderName: string;
  cartItems: CartItem[];
  orderId?: string;
  method?: string;
  requestedAt?: Date;
  approvedAt?: Date;
};
export default useCheckoutStore;
