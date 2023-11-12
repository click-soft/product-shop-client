import React, { useEffect, useState } from 'react';
import styles from './CartButton.module.scss';
import IconButton from '../../ui/IconButton/IconButton';
import { BsCart2 } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../store';
import { modalActions } from '../../store/modal-slice';
import useResizeWindow from '../../hooks/use-resize-window';
import CartModal from '../CartModal/CartModal';
import useCart from '../../hooks/useCart';

const CartButton = () => {
  const { itemsCount, fetchCartItemsCount } = useCart();
  const [animation, setAnimation] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [mouseEntered, setMouseEntered] = useState(false);
  const showCartModal = useAppSelector((state) => state.modal.showCartModal);
  const { isMobile } = useResizeWindow();
  function clickHandler() {
    dispatch(modalActions.showCart());
  }

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
    dispatch(modalActions.showCart());
  }

  function closeModal() {
    dispatch(modalActions.closeCart());
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
      onClick={clickHandler}
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
