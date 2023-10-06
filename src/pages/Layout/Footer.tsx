import React from 'react';
import styles from './Footer.module.scss';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isCartViewPage = location.pathname === '/cart-view';

  return (
    <footer
      className={`${styles.footer} ${
        isCartViewPage ? styles['cart-view'] : ''
      }`}
    >
      <div className={styles.footer__wrapper}>
        <div className={styles.company}>
          <strong>Copyrightⓒ 2020 by clicksoft.co.All right reserved.</strong>
          <div>
            사업자등록번호 402-81-45901
            <span className={styles.vertical} />
            통신판매업신고번호 2006-테스트-0010호
            <span className={styles.vertical} />
            대표이사 염종배
            <span className={styles.vertical} />
            전북 전주시 덕진구 기린대로 477 cs빌딩 501호 클릭소프트(주)
            <span className={styles.vertical} />
            Tel.063-251-0510
            <span className={styles.vertical} />
            Fax. 063-251-0519
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
