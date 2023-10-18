import React from 'react';
import styles from './EmptyCartView.module.scss';
import cartImg from '../../assets/images/cart-pixcel-art.png';

const EmptyCartView = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img className={styles.img} src={cartImg} alt="카트이미지" />
        <div className={styles.text_container}>
          <label className={styles.text}>장바구니가 비었어요!</label>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartView;
