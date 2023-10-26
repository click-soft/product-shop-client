import React from 'react';
import styles from './RootFooter.module.scss';
import { useLocation } from 'react-router-dom';

const RootFooter = () => {
  const location = useLocation();
  const isCartViewPage = location.pathname === '/cart-view';

  return (
    <footer className={`${styles.footer} ${isCartViewPage ? styles['cart-view'] : ''}`}>
      <div className={styles.footer__wrapper}>
        <div className={styles.company}>
          <strong className={styles.corporate}>클릭소프트주식회사</strong>
          <div>
            <div>
              사업자등록번호 402-81-45901
              <span className={styles.vertical} />
              통신판매업신고번호 제 2023-전주덕진-0219호
            </div>
            <div>
              대표이사 염종배
              <span className={styles.vertical} />
              전북 전주시 덕진구 기린대로 477 cs빌딩 501호 클릭소프트(주)
            </div>
            <div>
              Tel.063-251-0510
              <span className={styles.vertical} />
              Fax. 063-251-0519
            </div>
          </div>
          <strong className={styles.copyright}>Copyrightⓒ 2020 by clicksoft.co.All right reserved.</strong>
        </div>
      </div>
    </footer>
  );
};

export default RootFooter;
