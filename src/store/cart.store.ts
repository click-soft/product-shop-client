import { create } from 'zustand';

type State = {
  itemsCount: number;
};
type Actions = {
  setItemsCount: (itemsCount: number) => void;
};

const initialState: State = {
  itemsCount: 0,
};

const useCartStore = create<State & Actions>((set) => ({
  ...initialState,
  setItemsCount: (itemsCount) => set(() => ({ itemsCount })),
}));

export default useCartStore;
