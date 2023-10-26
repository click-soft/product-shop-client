import { useEffect, useMemo, useState } from 'react';
import styles from './CartViewPage.module.scss';
import Cart from '../../interfaces/Cart';
import { getCartWithProduct } from '../../graphql/queries/cart';
import CartViewItems from '../../components/CartViewItem/CartViewItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteCartItems, updateCartItemQuantity } from '../../store/cart-slice';
import BuyArea from '../../components/BuyArea/BuyArea';
import { useNavigate } from 'react-router-dom';
import CartItemManager from '../../utils/cart-item-manager';
import CheckoutState from '../../interfaces/CheckoutState';
import { paymentActions } from '../../store/payment-slice';
import CircleLoading from '../../components/Loading/CircleLoading';
import EmptyCartView from '../../components/EmptyCartView/EmptyCartView';

const CartViewPage = () => {
  const [allCheck, setAllCheck] = useState<boolean>(true);
  const [chkItemIds, setChkItemIds] = useState<number[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(false);
  const cartItemManager = useMemo(
    () => new CartItemManager(cart?.cartItems.filter((item) => chkItemIds.includes(item.id!))),
    [cart?.cartItems, chkItemIds]
  );

  function getIds(cart: Cart): number[] {
    return cart?.cartItems.map((item) => item.id!)!;
  }

  useEffect(() => {
    fetchCart().then((cart) => {
      setChkItemIds(getIds(cart!));
    });
  }, []);

  useEffect(() => {
    const isAllChecked = chkItemIds?.length === cart?.cartItems.length;
    setAllCheck(isAllChecked);
  }, [chkItemIds]);

  function allCheckChangeHandler(checked: boolean) {
    setAllCheck(checked);
    if (checked) {
      setChkItemIds(getIds(cart!));
    } else {
      setChkItemIds([]);
    }
  }

  async function fetchCart(): Promise<Cart | undefined> {
    const cart = await getCartWithProduct();

    setCart(cart);
    return cart;
  }

  const countChangeHandler = (cartItemId: number, value: number) => {
    const foundedCartItem = cart?.cartItems.find((ci) => ci.id === cartItemId);
    const isNotChanged = foundedCartItem?.quantity === value;

    if (isNotChanged) return;

    setLoading(true);
    dispatch(updateCartItemQuantity({ id: cartItemId, quantity: value }))
      .unwrap()
      .then(() => fetchCart())
      .then(() => setLoading(false));
  };

  function onCancelHandler(id: number): void {
    setLoading(true);
    setChkItemIds((prevIds) => prevIds.filter((pId) => pId !== id));
    dispatch(deleteCartItems([id]))
      .unwrap()
      .then(() => fetchCart())
      .then(() => setLoading(false));
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

  if (!cart) {
    return <CircleLoading />;
  } else if (cart.cartItems.length === 0) {
    return <EmptyCartView />;
  }
  const itemComponents = cart?.cartItems.map((ci) => {
    return (
      <CartViewItems
        key={ci.id}
        cartItem={ci}
        checked={chkItemIds.includes(ci.id!)}
        onCheckChange={(checked) => {
          if (checked) {
            setChkItemIds((prevIds) => prevIds?.concat(ci.id!));
          } else {
            setChkItemIds((prevIds) => prevIds?.filter((i) => i !== ci.id));
          }
        }}
        onCancel={onCancelHandler}
        onCountChange={countChangeHandler}
      />
    );
  });

  return (
    <>
      {loading && <CircleLoading />}
      <div className={styles.container}>
        <table>
          <caption className={styles.caption}>장바구니 목록</caption>
          <colgroup>
            <col width={50} />
            <col span={2} width="*" />
            <col width={100} />
          </colgroup>

          <thead className={styles.head}>
            <tr>
              <th className={`${styles['first-column']} ${styles['first-column-header']}`}>
                <label>
                  <input type="checkbox" checked={allCheck} onChange={(e) => allCheckChangeHandler(e.target.checked)} />
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
      <BuyArea totalPrice={cartItemManager.totalPrice} onBuy={buyHandler} disabled={chkItemIds.length === 0} />
    </>
  );
};

export default CartViewPage;
