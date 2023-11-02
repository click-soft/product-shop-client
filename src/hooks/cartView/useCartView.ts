import { useQuery } from '@apollo/client';
import { GET_CART_WITH_RRODUCT } from '../../graphql/queries/cart';
import { useEffect, useState } from 'react';
import Cart from '../../interfaces/Cart';
import useCartViewStore from '../../store/cartViewStore';
import { useAppDispatch } from '../../store';
import { deleteCartItems, updateCartItemQuantity } from '../../store/cart-slice';
import { toast } from 'react-toastify';

const useCartView = () => {
  const dispatch = useAppDispatch();
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
    await dispatch(deleteCartItems([id])).unwrap();
    await refetch();
  }

  async function updateQuantity({ cartItemId, quantity }: { cartItemId: number; quantity: number }) {
    const foundedCartItem = cart?.cartItems.find((ci) => ci.id === cartItemId);
    const isNotChanged = foundedCartItem?.quantity === quantity;

    if (isNotChanged) return;

    await dispatch(updateCartItemQuantity({ id: cartItemId, quantity })).unwrap();
    await refetch();
  }

  return { cart, updateQuantity, deleteCartItemById };
};

export default useCartView;
