import { useEffect, useRef, useState } from 'react';
import styles from './Login.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import TextInput from '../../ui/TextInput/TextInput';
import useLogin from '../../hooks/login/use-login';
import CircleLoading from '../Loading/CircleLoading';
import classNames from 'classnames';

function Login() {
  const { userId, password, loading, login, handleUserIdChange, handlePasswordChange } = useLogin();
  const passwordRef = useRef<HTMLInputElement>(null);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login({ userId, password });
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter' && !password) {
      e.preventDefault();
      passwordRef?.current?.focus();
    }
  }

  return (
    <>
      {loading && <CircleLoading />}
      <div className={styles.container}>
        <h2>Login Account</h2>
        <form className={styles.login_form} onSubmit={submitHandler}>
          <div className={styles.ykiho_form}>
            <TextInput
              className={styles.text_input}
              placeholder="요양기관 or 사업자기호"
              name="id"
              maxLength={10}
              value={userId}
              onChange={handleUserIdChange}
              onKeyDown={keyDownHandler}
            />
            <TextInput
              ref={passwordRef}
              className={classNames(styles.password, styles.text_input)}
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={handlePasswordChange}
            />
            <button className={`${styles.login_button} blue-button`} id="btn-login" disabled={loading}>
              로그인
            </button>
            <div className={styles.link_wrapper}>
              <Link className={styles.link} to={'../signup'}>
                회원가입
              </Link>
              <Link className={styles.link} to={'../find-password'}>
                비밀번호찾기
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
