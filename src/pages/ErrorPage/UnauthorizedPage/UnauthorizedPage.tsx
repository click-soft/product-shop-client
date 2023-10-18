import React from 'react';
import styles from './UnauthorizedPage.module.scss';
import BaseErrorPage from '../BaseErrorPage/BaseErrorPage';

const UnauthorizedPage = () => {
  return (
    <BaseErrorPage
      title="로그인 정보가 만료되었습니다."
      visibleButtons={{ toLogin: true }}
    >
      <div className={styles.detail}>다시 로그인 해주세요~!</div>
    </BaseErrorPage>
  );
};

export default UnauthorizedPage;
