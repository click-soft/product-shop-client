import CartViewItems from '../../CartViewItem/CartViewItem';
import useCartView from '../../../hooks/cartView/useCartView';
import useCartViewStore from '../../../store/cartViewStore';

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

  const itemComponents = cart?.cartItems.map((ci) => {
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
