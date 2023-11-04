import { useRef, useState } from 'react';
import Card from '../../ui/Card/Card';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import TextInput from '../../ui/TextInput/TextInput';
import useLogin from '../../hooks/login/use-login';
import CircleLoading from '../Loading/CircleLoading';
import classNames from 'classnames';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login, loading } = useLogin();

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
      <Card className={styles.card}>
        <div className={styles.container}>
          <h2>Login Account</h2>
          <form className={styles.login_form} onSubmit={submitHandler}>
            <div className={styles.ykiho_form}>
              <TextInput
                className={styles.text_input}
                placeholder="요양기관 OR 사업자기호"
                name="id"
                maxLength={10}
                onChange={(e) => setUserId(e.target.value)}
                onKeyDown={keyDownHandler}
              />
              <TextInput
                ref={passwordRef}
                className={classNames(styles.password, styles.text_input)}
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={`${styles.login_button} blue-button`} id="btn-login" disabled={loading}>
                로그인
              </button>
              <Link className={styles.signup} to={'../signup'}>
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export default Login;
