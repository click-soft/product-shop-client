import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import CartItem from '../interfaces/cart-item';
import { getCartWithProduct } from '../graphql/gql/cart';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const showCartModal = useAppSelector<boolean>((state) => state.modal.showCartModal);
  async function fetchCart() {
    const cart = await getCartWithProduct();
    if (cart) {
      setCartItems(cart.cartItems);
    } else {
      setCartItems([]);
    }
  }

  useEffect(() => {
    if (!showCartModal) return;
    fetchCart();
  }, [showCartModal]);

  return {
    cartItems,
  };
};

export default useCartItems;
