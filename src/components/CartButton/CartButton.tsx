import React, { useEffect, useState } from 'react';
import styles from './CartButton.module.scss';
import IconButton from '../../ui/IconButton/IconButton';
import { BsCart2 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchGetItemsCount } from '../../store/cart-slice';
import { useSelector } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import useResizeWindow from '../../hooks/use-resize-window';
import CartModal from '../CartModal/CartModal';

const CartButton = () => {
  const [animation, setAnimation] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [mouseEntered, setMouseEntered] = useState(false);
  const itemsCount = useSelector<RootState, number | undefined>((state) => state.cart.itemsCount);
  const showCartModal = useSelector<RootState>((state) => state.modal.showCartModal);
  const { isMobile } = useResizeWindow();
  function clickHandler() {
    dispatch(modalActions.showCart());
  }

  useEffect(() => {
    dispatch(fetchGetItemsCount());
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
