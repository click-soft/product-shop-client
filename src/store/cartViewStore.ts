import { create } from 'zustand';
import Cart from '../interfaces/Cart';

type State = {
  cart?: Cart;
  loading: boolean;
  checkedIds: number[];
  initialized: boolean;
};

type Action = {
  setCart: (cart: Cart) => void;
  setLoading: (loading: boolean) => void;
  setCheck: (id: number, checked: boolean) => void;
  setCheckAll: (checked: boolean) => void;
  setInitialized: () => void;
  clear: () => void;
};

const initialState: State = {
  cart: undefined,
  loading: false,
  checkedIds: [],
  initialized: false,
};

const useCartViewStore = create<State & Action>((set) => ({
  ...initialState,
  setCart: (cart) => set(() => ({ cart: cart })),
  setLoading: (loading) => set(() => ({ loading: loading })),
  setCheck: (id, checked) =>
    set((state) => {
      const newIds = [...state.checkedIds];

      if (checked) {
        newIds.push(id);
      } else {
        const findIndex = newIds.findIndex((pId) => pId === id);
        newIds.splice(findIndex, 1);
      }

      return { checkedIds: newIds };
    }),
  setCheckAll: (checked) =>
    set((state) => {
      let ids: number[] | undefined;

      if (checked) {
        ids = state.cart?.cartItems?.map((ci) => ci.id!);
      }

      return { checkedIds: ids ?? [] };
    }),
  setInitialized: () => set({ initialized: true }),
  clear: () => set(initialState),
}));

export default useCartViewStore;
