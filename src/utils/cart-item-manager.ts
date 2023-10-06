import CartItem from "../interfaces/CartItem";

export default class CartItemManager {
  constructor(public cartItems?: CartItem[]) { }

  public get totalPrice(): number {
    const totalPrice = this.cartItems?.reduce((price: number, ci: CartItem) => {
      price += ci.product?.danga! * ci.quantity;
      return price;
    }, 0);
    return totalPrice ?? 0;
  }

  public get totalQuantity(): number {
    const totalQuantity = this.cartItems?.reduce((quantity: number, ci: CartItem) => {
      quantity += ci.quantity;
      return quantity;
    }, 0);
    return totalQuantity ?? 0;
  }

  public get orderName(): string {
    const orderNames = this.cartItems?.map(ci => `${ci.product?.smMyung}${ci.fit ? '[맞춤주문]' : ''}`)
    return orderNames?.join('|') ?? '';
  }
}