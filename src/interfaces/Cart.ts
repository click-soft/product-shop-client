import CartItem from './CartItem';

export default interface Cart {
  id: number;
  ykiho: string;
  cartItems: CartItem[];
}
