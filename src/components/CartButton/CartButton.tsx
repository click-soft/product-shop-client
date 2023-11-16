import React, { useEffect, useState } from 'react';
import styles from './CartButton.module.scss';
import IconButton from '../../ui/IconButton/IconButton';
import { BsCart2 } from 'react-icons/bs';
import useResizeWindow from '../../hooks/use-resize-window';
import CartModal from '../CartModal/CartModal';
import useCart from '../../hooks/use-cart';
import useModalStore from '../../store/modal.store';

const CartButton = () => {
  const { itemsCount, fetchCartItemsCount } = useCart();
  const [animation, setAnimation] = useState<boolean>(false);
  const [mouseEntered, setMouseEntered] = useState(false);
  const { showCartModal } = useModalStore();
  const { isMobile } = useResizeWindow();
  const { showCart, closeCart } = useModalStore();

  useEffect(() => {
    fetchCartItemsCount();
  }, []);

  useEffect(() => {
    setAnimation(false);
    const animationTimeout = setTimeout(() => {
      setAnimation(true);
    }, 100);

    return () => clearTimeout(animationTimeout);
  }, [itemsCount]);

  function showModal() {
    showCart();
  }

  function closeModal() {
    closeCart();
  }

  useEffect(() => {
    if (!showCartModal) {
      setMouseEntered(false);
    }
  }, [showCartModal]);

  useEffect(() => {
    if (isMobile) return;

    if (mouseEntered) {
      showModal();
    } else {
      closeModal();
    }
  }, [mouseEntered]);

  return (
    <IconButton
      icon={BsCart2}
      onClick={showModal}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
      text={isMobile ? '' : '장바구니'}
      modalComponent={<CartModal />}
    >
      {(itemsCount || 0) > 0 && (
        <div className={`${styles['items-count']} ${animation ? styles['animate'] : ''}`}>{itemsCount}</div>
      )}
    </IconButton>
  );
};

export default CartButton;
