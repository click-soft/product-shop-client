import { useEffect, useMemo, useState } from 'react';
import styles from './CartViewPage.module.scss';
import Cart from '../../interfaces/Cart';
import { getCartWithProduct } from '../../graphql/queries/cart';
import CartViewItems from '../../components/CartViewItem/CartViewItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteCartItem, updateCartItemQuantity } from '../../store/cart-slice';
import BuyArea from '../../components/BuyArea/BuyArea';
import { useNavigate } from 'react-router-dom';
import CartItemManager from '../../utils/cart-item-manager';
import CheckoutState from '../../interfaces/CheckoutState';
import { paymentActions } from '../../store/payment-slice';

const CartViewPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart>();
  const cartItemManager = useMemo(
    () => new CartItemManager(cart?.cartItems),
    [cart?.cartItems],
  );

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const cart = await getCartWithProduct();
    setCart(cart);
  }

  const countChangeHandler = (cartItemId: number, value: number) => {
    const foundedCartItem = cart?.cartItems.find((ci) => ci.id === cartItemId);
    const isNotChanged = foundedCartItem?.quantity === value;

    if (isNotChanged) return;

    dispatch(updateCartItemQuantity({ id: cartItemId, quantity: value })).then(
      () => fetchCart(),
    );
  };

  function onCancelHandler(id: number): void {
    dispatch(deleteCartItem(id)).then(() => fetchCart());
  }

  function buyHandler() {
    const state: CheckoutState = {
      cartItems: cartItemManager.cartItems!,
      orderName: cartItemManager.orderName,
      totalPrice: cartItemManager.totalPrice,
      totalQuantity: cartItemManager.totalQuantity,
    };
    dispatch(paymentActions.checkout(state));
    navigate('/payment');
  }

  const itemComponents = cart?.cartItems.map((ci) => {
    return (
      <CartViewItems
        key={ci.id}
        cartItem={ci}
        onCancel={onCancelHandler}
        onCountChange={countChangeHandler}
      />
    );
  });

  return (
    <>
      <div className={styles.container}>
        <table>
          <caption>sdadasd</caption>
          <colgroup>
            <col width={50} />
            <col span={2} width="*" />
            <col width={100} />
          </colgroup>

          <thead className={styles.head}>
            <tr>
              <th
                className={`${styles['first-column']} ${styles['first-column-header']}`}
              >
                <label>
                  <input type="checkbox" />
                  <span>전체</span>
                </label>
              </th>
              <th>상품정보</th>
              <th></th>
              <th>상품금액</th>
            </tr>
          </thead>

          <tbody>{itemComponents}</tbody>
        </table>
      </div>
      <BuyArea totalPrice={cartItemManager.totalPrice} onBuy={buyHandler} />
    </>
  );
};

export default CartViewPage;
