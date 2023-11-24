import styles from './CartModal.module.scss';
import { BsCartCheck } from 'react-icons/bs';
import CartItem from './CartItem/CartItem';
import { Fragment, useMemo } from 'react';
import DownModal from '../../ui/DownModal/DownModal';
import useCartItems from '../../hooks/use-cart-items';
import { Link } from 'react-router-dom';
import CartItemManager from '../../utils/cart-item-manager';
import useModalStore from '../../store/modal.store';

const Cart = () => {
  const { cartItems } = useCartItems();
  const { showCartModal, clear } = useModalStore();
  const cartItemManager = useMemo(() => new CartItemManager(cartItems), [cartItems]);

  if (!showCartModal) {
    return <></>;
  }

  const itemsComponents = cartItems?.map((item) => {
    return (
      <Fragment key={item.id}>
        <CartItem item={item} />
        <hr key={item.code} style={{ width: '100%' }} />
      </Fragment>
    );
  });

  return (
    <>
      <DownModal>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <div className={styles.totalQuantity}>
                총 주문 수량 : <span>{cartItemManager.totalQuantity}</span>
              </div>
              <div className={styles.totalPrice}>{`₩${cartItemManager.totalPrice.toLocaleString()}`}</div>
            </div>
            <Link to="/cart-view" className={styles['shop-button']} onClick={clear}>
              <BsCartCheck className={styles['shop-icon']} />
              장바구니 보기
            </Link>
          </div>
          <ul className={styles.list}>{itemsComponents}</ul>
        </div>
      </DownModal>
    </>
  );
};

export default Cart;
