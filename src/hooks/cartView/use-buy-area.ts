import { useEffect, useMemo, useState } from 'react';
import CartItemManager from '../../utils/cart-item-manager';
import useCartViewStore from '../../store/cart-view.store';
import { useNavigate } from 'react-router-dom';
import useCheckout from '../use-checkout';
import { getOrderId } from '../../utils/toss-payments.utils';
import useGetLoginedUser from '../use-get-logined-user';

const useBuyArea = () => {
  const navigate = useNavigate();
  const user = useGetLoginedUser(true);
  const { loading, fetchCheckoutByArgs } = useCheckout();
  const [checkBNPL, setCheckBNPL] = useState(false);
  const { cart, checkedIds } = useCartViewStore();
  const disabled = loading || checkedIds.length === 0;
  const cartItemManager = useMemo(
    () => new CartItemManager(cart?.cartItems.filter((item) => checkedIds.includes(item.id!))),
    [cart?.cartItems, checkedIds]
  );

  function handleBuy() {
    if (checkBNPL) {
      const orderId = getOrderId();
      fetchCheckoutByArgs({
        paymentType: 'BNPL',
        orderId: orderId,
        orderName: cartItemManager.orderName,
        paymentKey: orderId,
        amount: cartItemManager.totalPrice,
        quantity: cartItemManager.totalQuantity,
        items: cartItemManager.cartItems!,
      });
    } else {
      navigate('/payment', { state: cartItemManager.checkoutState });
    }
  }

  function handleBNPLChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckBNPL(e.target.checked);
  }

  useEffect(() => {
    if (!user?.useBNPL) return;

    setCheckBNPL(user?.useBNPL);
  }, [user?.useBNPL]);

  return {
    useBNPL: user?.useBNPL,
    checkBNPL,
    disabled,
    currencyTotalPrice: cartItemManager.totalPrice.toLocaleString(),
    handleBuy,
    handleBNPLChange,
  };
};

export default useBuyArea;
