import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CartProduct from '../interfaces/CartItem';
import { cartItemsCount } from '../graphql/queries/cart';
import { ADD_TO_CART } from '../graphql/mutates/cart';
import client from '../graphql/apollo-client';
import { DELETE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from '../graphql/mutates/cart-item';
import { AppDispatch } from '.';

interface CartState {
  itemsCount?: number;
}

const initialState: CartState = {
  itemsCount: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGetItemsCount.fulfilled, (state, action: PayloadAction<number>) => {
      state.itemsCount = action.payload;
    });
    builder.addCase(fetchGetItemsCount.rejected, (state) => {
      state.itemsCount = undefined;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.itemsCount = (state.itemsCount ?? 0) + action.payload.quantity;
    });
  },
});

type AddToCartArgs = {
  code: string;
  quantity: number;
  fit: boolean;
};

export const addToCart = createAsyncThunk('cart-slice/addToCart', async (args: AddToCartArgs) => {
  const response = await client.mutate({
    mutation: ADD_TO_CART,
    variables: {
      ...args,
    },
  });

  if (response.data?.addToCart?.message === 'success') {
    return { quantity: args.quantity };
  } else {
    return { quantity: 0 };
  }
});

export const fetchGetItemsCount = createAsyncThunk('cart-slice/fetchGetItemsCount', async () => {
  const itemsCount = await cartItemsCount();

  return itemsCount;
});

export const updateCartItemQuantity = createAsyncThunk(
  'cart-slice/updateCartItemQuantity',
  async (input: { id: number; quantity: number }, thunkAPI) => {
    const response = await client.mutate({
      mutation: UPDATE_CART_ITEM_QUANTITY,
      variables: { ...input },
    });

    if (!response.errors) {
      const dispatch = thunkAPI.dispatch as AppDispatch;
      dispatch(fetchGetItemsCount());
    }

    return response;
  }
);

export const deleteCartItems = createAsyncThunk('cart-slice/deleteCartItems', async (ids: number[], thunkAPI) => {
  const response = await client.mutate({
    mutation: DELETE_CART_ITEM,
    variables: { ids },
  });

  if (!response.errors) {
    const dispatch = thunkAPI.dispatch as AppDispatch;
    dispatch(fetchGetItemsCount());
  }

  return response;
});

export const cartActions = cartSlice.actions;
export default cartSlice;
