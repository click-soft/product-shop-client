import React from 'react';
import styles from './CircleLoading.module.scss';
import loadingGif from '../../assets/gifs/loading.gif';
import Backdrop from '../../ui/Backdrop/Backdrop';
const CircleLoading = () => {
  return (
    <>
      <Backdrop
        className={styles.loading_backdrop}
        notScrollHidden
        zIndex={9999}
      />
      <img className={styles.loading} src={loadingGif} alt="loading..."></img>
    </>
  );
};

export default CircleLoading;
