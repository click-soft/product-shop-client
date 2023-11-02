import { useRef, useState } from 'react';
import Card from '../../ui/Card/Card';
import styles from './Login.module.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import TextInput from '../../ui/TextInput/TextInput';
import useLogin from '../../hooks/use-login';
import CircleLoading from '../Loading/CircleLoading';
import classNames from 'classnames';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ id: '', password: '' });
  const passwordRef = useRef<HTMLInputElement>(null);
  const [searchQuery] = useSearchParams();
  const isBuisness = searchQuery.get('mode') === 'buisness';
  const { login, loading } = useLogin();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login({
      userId: inputs.id,
      password: inputs.password,
      onSuccess: (admin) => {
        if (admin) {
          navigate('/admin/orders');
        } else {
          navigate('/');
        }
      },
      onError: (errorMessage) => {
        toast.error(errorMessage);
      },
    });
  }

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [e.target.name]: e.target.value,
      };
    });
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter' && !inputs.password) {
      e.preventDefault();
      passwordRef?.current?.focus();
    }
  }

  const inputBox = isBuisness ? (
    <TextInput
      className={styles.text_input}
      placeholder="사업자기호(`-` 제외)"
      // value={inputValue}
      maxLength={10}
      onChange={inputChangeHandler}
    />
  ) : (
    <TextInput
      className={styles.text_input}
      placeholder="요양기관 기호"
      name="id"
      // value={inputValue}
      maxLength={8}
      onChange={inputChangeHandler}
      onKeyDown={keyDownHandler}
    />
  );

  return (
    <>
      {loading && <CircleLoading />}
      <Card className={styles.card}>
        <div className={styles.container}>
          <h2>Login Account</h2>
          <form className={styles.login_form} onSubmit={submitHandler}>
            <div className={styles.ykiho_form}>
              {inputBox}
              <TextInput
                ref={passwordRef}
                className={classNames(styles.password, styles.text_input)}
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={inputChangeHandler}
              />
              <button className={`${styles.login_button} blue-button`} id="btn-login" disabled={loading}>
                로그인
              </button>

              {/* <div className={styles['select-mode']}>
                <Link
                  to={`/login`}
                  className={isBuisness ? undefined : styles.active}
                  onClick={linkClickHandler}
                >
                  요양기관
                </Link>
                <Link
                  to={`/login?mode=buisness`}
                  className={isBuisness ? styles.active : undefined}
                  onClick={linkClickHandler}
                >
                  사업자
                </Link>
              </div> */}

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
