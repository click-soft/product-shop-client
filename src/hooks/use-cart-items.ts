import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "../interfaces/CartItem";
import { getCartWithProduct } from "../graphql/queries/cart";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>()
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

    fetchCart();
  }, [showCartModal])

  return {
    cartItems
  }
}

export default useCartItems;