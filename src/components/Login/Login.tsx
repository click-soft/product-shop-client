import { useRef, useState } from 'react';
import { isNuemric } from '../../utils/strings';
import Card from '../../ui/Card';
import styles from './Login.module.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import TextInput from '../../ui/TextInput/TextInput';
import useToast from '../../hooks/use-toast';
import useLogin from '../../hooks/use-login';

function Login() {
  const navigate = useNavigate();
  const { toast, toastConatiner } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery] = useSearchParams();
  const isBuisness = searchQuery.get('mode') === 'buisness';
  const { login, loading } = useLogin();
  function linkClickHandler() {
    setInputValue('');
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login({
      userId: inputValue,
      password: password,
      onSuccess: () => {
        navigate('/');
      },
      onError: (errorMessage) => {
        toast.error(errorMessage);
      },
    });
  }

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;

    if (isNuemric(value)) {
      setInputValue(value);
    }
  }

  const inputBox = isBuisness ? (
    <TextInput
      placeholder="사업자기호(`-` 제외)"
      value={inputValue}
      maxLength={10}
      onChange={inputChangeHandler}
    />
  ) : (
    <TextInput
      placeholder="요양기관 기호"
      value={inputValue}
      maxLength={8}
      onChange={inputChangeHandler}
    />
  );

  return (
    <>
      {toastConatiner}
      <Card className={styles.card}>
        <div className={styles.container}>
          <h2>Login Account</h2>
          <form className={styles.login_form} onSubmit={submitHandler}>
            <div className={styles.ykiho_form}>
              {inputBox}
              <TextInput
                className={styles.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="비밀번호"
              />
              <button
                className={`${styles.login_button} blue-button`}
                id="btn-login"
              >
                로그인
              </button>

              <div className={styles['select-mode']}>
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
              </div>

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
