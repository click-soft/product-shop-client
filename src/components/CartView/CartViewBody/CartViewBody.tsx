import CartViewItems from '../../CartViewItem/CartViewItem';
import useCartView from '../../../hooks/cartView/use-cart-view';
import useCartViewStore from '../../../store/cart-view.store';
import CartProduct from '../../../interfaces/cart-item';

const CartViewBody = () => {
  const { cart, updateQuantity, deleteCartItemById } = useCartView();
  const { checkedIds, setCheck } = useCartViewStore();
  function onCancelHandler(id: number): void {
    deleteCartItemById(id);
  }

  function countChangeHandler(cartItemId: number, quantity: number) {
    updateQuantity({ cartItemId, quantity });
  }

  function checkChangeHandler(id: number, checked: boolean) {
    setCheck(id, checked);
  }

  const itemComponents = cart?.cartItems.map((ci: CartProduct) => {
    return (      
        <CartViewItems
          key={ci.id}
          cartItem={ci}
          checked={checkedIds.includes(ci.id!)}
          onCheckChange={(checked) => checkChangeHandler(ci.id!, checked)}
          onCancel={onCancelHandler}
          onCountChange={countChangeHandler}
        />
    );
  });

  return <tbody>{itemComponents}</tbody>;
};

export default CartViewBody;
