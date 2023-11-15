import { create } from 'zustand';
import Product from '../graphql/interfaces/product';
import GetAdminProductsArgs from '../graphql/dto/get-admin-products.args';

type State = {
  products: Product[];
  variables?: GetAdminProductsArgs;
  isFetching?: boolean;
  isUpdateLoading?: boolean;
};

type Actions = {};

const initialState: State = {
  products: [],
  variables: undefined,
  isFetching: undefined,
  isUpdateLoading: undefined,
};

const useAdminOrderStore = create<State & Actions>((set) => ({
  ...initialState,
}));

export default useAdminOrderStore;
