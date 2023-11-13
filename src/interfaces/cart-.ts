import CartItem from './cart-item';

export default interface Cart {
  id: number;
  ykiho: string;
  cartItems: CartItem[];
}
