import { create } from 'zustand';
import Product from '../graphql/interfaces/product';
import GetAdminProductsArgs from '../graphql/dto/get-admin-products.args';

type State = {
  products: Product[];
  variables?: GetAdminProductsArgs;
  isFetching?: boolean;
  isUpdateLoading?: boolean;
};

type Actions = {
  setProducts: (products: Product[]) => void;
  setVariables: (variables: GetAdminProductsArgs) => void;
  setIsUpdateLoading: (isUpdateLoading: boolean) => void;
  setIsFetching: (isFetching: boolean) => void;
  clear: () => void;
};

const initialState: State = {
  products: [],
  variables: undefined,
  isFetching: undefined,
  isUpdateLoading: undefined,
};

const useAdminOrderStore = create<State & Actions>((set) => ({
  ...initialState,
  setProducts: (products) => set(() => ({ products })),
  setVariables: (variables) => set(() => ({ variables })),
  setIsUpdateLoading: (isUpdateLoading) => set(() => ({ isUpdateLoading })),
  setIsFetching: (isFetching) => set(() => ({ isFetching })),
  clear: () => set(initialState),
}));

export default useAdminOrderStore;
