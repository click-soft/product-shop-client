import { useLazyQuery, useMutation } from '@apollo/client';
import AddToCartArgs from '../graphql/dto/add-to-cart.args';
import useCartStore from '../store/cart.store';
import { useEffect } from 'react';
import { ADD_TO_CART, CART_ITEMS_COUNT } from '../graphql/gql/cart';
import { DELETE_CART_ITEMS, UPDATE_CART_ITEM_QUANTITY } from '../graphql/gql/cart-item';

const useCart = () => {
  const { itemsCount, setItemsCount } = useCartStore();
  const [cartItemsCount, { data: cartItemsCountData }] = useLazyQuery(CART_ITEMS_COUNT);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [deleteCartItems] = useMutation(DELETE_CART_ITEMS);

  async function fetchCartItemsCount() {
    return await cartItemsCount({ fetchPolicy: 'no-cache' });
  }

  async function fetchAddToCart(args: AddToCartArgs) {
    await addToCart({ variables: { ...args } });
    await fetchCartItemsCount();
  }

  async function fetchUpdateCartItemQuantity(input: { id: number; quantity: number }) {
    await updateCartItemQuantity({ variables: { ...input } });
    await fetchCartItemsCount();
  }

  async function fetchDeleteCartItems(ids: number[]) {
    await deleteCartItems({ variables: { ids } });
    await fetchCartItemsCount();
  }

  useEffect(() => {
    if (!cartItemsCountData) return;
    setItemsCount(cartItemsCountData?.cartItemsCount ?? 0);
  }, [cartItemsCountData]);

  return {
    itemsCount,
    fetchCartItemsCount,
    fetchAddToCart,
    fetchUpdateCartItemQuantity,
    fetchDeleteCartItems,
  };
};

export default useCart;
