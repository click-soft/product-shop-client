import React, { useEffect, useState } from 'react';
import styles from './CartButton.module.scss';
import IconButton from '../../ui/IconButton/IconButton';
import { BsCart2 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchGetItemsCount } from '../../store/cart-slice';
import { useSelector } from 'react-redux';
import { modalActions } from '../../store/modal-slice';

const CartButton = () => {
  const [animation, setAnimation] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const itemsCount = useSelector<RootState, number | undefined>(
    (state) => state.cart.itemsCount,
  );

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
  return (
    <>
      <IconButton icon={BsCart2} onClick={clickHandler}>
        {(itemsCount || 0) > 0 && (
          <div
            className={`${styles['items-count']} ${
              animation ? styles['animate'] : ''
            }`}
          >
            {itemsCount}
          </div>
        )}
      </IconButton>
    </>
  );
};

export default CartButton;
