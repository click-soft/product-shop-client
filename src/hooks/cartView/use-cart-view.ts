import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Cart from '../../interfaces/cart';
import useCartViewStore from '../../store/cart-view.store';
import { toast } from 'react-toastify';
import useCart from '../use-cart';
import { GET_CART_WITH_RRODUCT } from '../../graphql/gql/cart';

const useCartView = () => {
  const { fetchDeleteCartItems, fetchUpdateCartItemQuantity } = useCart();
  const { cart, initialized, setCart, setLoading, setCheckAll, setInitialized } = useCartViewStore();
  const { data, error, loading, refetch } = useQuery(GET_CART_WITH_RRODUCT, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (!data) return;
    const cart: Cart = data.getCartWithProduct;

    setCart(cart);
    setInitialized();
  }, [data]);

  useEffect(() => {
    if (!initialized) return;

    setCheckAll(true);
  }, [initialized]);

  useEffect(() => setLoading(loading), [loading]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  async function deleteCartItemById(id: number) {
    await fetchDeleteCartItems([id]);
    await refetch();
  }

  async function updateQuantity({ cartItemId, quantity }: { cartItemId: number; quantity: number }) {
    const foundedCartItem = cart?.cartItems.find((ci) => ci.id === cartItemId);
    const isNotChanged = foundedCartItem?.quantity === quantity;

    if (isNotChanged) return;

    await fetchUpdateCartItemQuantity({ id: cartItemId, quantity });
    await refetch();
  }

  return { cart, updateQuantity, deleteCartItemById };
};

export default useCartView;
