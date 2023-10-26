import React from 'react';
import styles from './NotFoundErrorPage.module.scss';
import BaseErrorPage from '../BaseErrorPage/BaseErrorPage';

const NotFoundErrorPage = () => {
  return (
    <BaseErrorPage title="찾을 수 없는 페이지 입니다." visibleButtons={{ toBack: true, toMain: true }}>
      <div className={styles.detail}>
        입력하신 페이지의 주소가 잘못 입력되었거나, 변경 또는 삭제되어
        <br />
        요청하신 페이지를 찾을 수 없습니다.
      </div>
    </BaseErrorPage>
  );
};

export default NotFoundErrorPage;
