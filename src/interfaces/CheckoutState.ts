import CartItem from './CartItem';

export default interface CheckoutState {
  totalPrice?: number;
  totalQuantity?: number;
  orderName?: string;
  cartItems?: CartItem[];
}
