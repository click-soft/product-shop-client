import React, { useMemo } from 'react';
import styles from './BuyArea.module.scss';
import CartItemManager from '../../utils/cart-item-manager';
import { paymentActions } from '../../store/payment-slice';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router';
import useCartViewStore from '../../store/cartViewStore';

const BuyArea: React.FC = () => {
  const { cart, checkedIds } = useCartViewStore();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const buttonDisabled = checkedIds.length === 0;
  const cartItemManager = useMemo(
    () => new CartItemManager(cart?.cartItems.filter((item) => checkedIds.includes(item.id!))),
    [cart?.cartItems, checkedIds]
  );

  function buyHandler() {
    dispatch(
      paymentActions.checkout({
        cartItems: cartItemManager.cartItems!,
        orderName: cartItemManager.orderName,
        totalPrice: cartItemManager.totalPrice,
        totalQuantity: cartItemManager.totalQuantity,
      })
    );
    navigate('/payment');
  }

  return (
    <div className={styles['buy-container']}>
      <div className={styles['buy-wrapper']}>
        <div className={styles['buy-amount-wrapper']}>
          <div className={styles['buy-amount-title']}>총 주문금액</div>
          <div className={styles['buy-amount']}>{cartItemManager.totalPrice.toLocaleString()}원</div>
        </div>
        <button className={styles['buy-amount-button']} onClick={buyHandler} disabled={buttonDisabled}>
          구매하기
        </button>
      </div>
    </div>
  );
};

export default BuyArea;
