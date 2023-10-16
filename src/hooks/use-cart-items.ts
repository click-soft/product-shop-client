import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "../interfaces/CartItem";
import { getCartWithProduct } from "../graphql/queries/cart";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>()
  const [error, setError] = useState<any>();
  const showCartModal = useSelector<RootState, boolean>(state => state.modal.showCartModal);
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
    fetchCart()
      .catch(err => setError(err));
  }, [showCartModal])

  if (error) {
    throw new Error(error.message);
  }

  return {
    cartItems
  }
}

export default useCartItems;