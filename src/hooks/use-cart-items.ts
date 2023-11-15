import { useEffect, useState } from 'react';
import CartItem from '../interfaces/cart-item';
import { getCartWithProduct } from '../graphql/gql/cart';
import useModalStore from '../store/modal.store';

const useCartItems = () => {
  const { showCartModal } = useModalStore();
  const [cartItems, setCartItems] = useState<CartItem[]>();
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
