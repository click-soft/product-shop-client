import React from 'react';
import styles from './BaseErrorPage.module.scss';
import mainLogo from '../../../assets/images/main_logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import ChildrenProps from '../../../interfaces/children-props';
import { redirect } from 'react-router-dom';

interface BaseErrorPageProps extends ChildrenProps {
  title: string;
  visibleButtons?: {
    toBack?: boolean;
    toMain?: boolean;
    toLogin?: boolean;
  };
}
const BaseErrorPage: React.FC<BaseErrorPageProps> = (props) => {
  const navigate = useNavigate();
  redirect('/home');
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src={mainLogo} alt="클릭소프트 로고" />
        <div className={styles.box}>
          <div className={styles.header}>
            <h3>{props.title}</h3>
          </div>
          {props.children}
        </div>
      </div>
      <nav className={styles.nav_wrapper}>
        {props.visibleButtons?.toBack && (
          <button onClick={() => navigate(-1)} className={styles.to_back}>
            뒤로가기
          </button>
        )}
        {props.visibleButtons?.toMain && (
          <button className={styles.to_main} onClick={() => (window.location.href = '/')}>
            메인으로
          </button>
        )}
        {props.visibleButtons?.toLogin && (
          <button
            className={styles.to_login}
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            로그인화면으로
          </button>
          // <Link to={'/login'} className={styles.to_login}>
          //   로그인화면으로
          // </Link>
        )}
      </nav>
    </main>
  );
};

export default BaseErrorPage;
