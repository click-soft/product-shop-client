import { useState } from 'react';
import { isNuemric } from '../../utils/strings';
import Card from '../../ui/Card';
import styles from './Login.module.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import TextInput from '../../ui/TextInput/TextInput';
import useFindUser from '../../hooks/use-find-user';
import LoginMsgCard from './LoginMsgCard/LoginMsgCard';
import { login } from '../../graphql/mutates/auth';
import useToast from '../../hooks/use-toast';

function Login() {
  const navigate = useNavigate();
  const { showToast, toastComponet } = useToast();
  const [inputValue, setInputValue] = useState('');
  const { data, error, fetchHospData } = useFindUser();
  const [searchQuery] = useSearchParams();
  const isBuisness = searchQuery.get('mode') === 'buisness';

  function linkClickHandler() {
    setInputValue('');
    fetchHospData(isBuisness, '');
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!error) {
      try {
        const result = await login(isBuisness, inputValue);

        if (result.message === 'success') {
          navigate('/');
        }
      } catch (err: any) {
        showToast('error', err.message);
      }
    }
  }

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;

    if (isNuemric(value)) {
      setInputValue(value);
      fetchHospData(isBuisness, value);
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
      {toastComponet}
      <Card className={styles.card}>
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
        <div className={styles.container}>
          <h2>Login Account</h2>
          <form className={styles.login_form} onSubmit={submitHandler}>
            <div className={styles.ykiho_form}>
              {inputBox}
              {error?.type === 'notfound error' && (
                <LoginMsgCard
                  isError={true}
                  dataList={[
                    {
                      title: 'Error',
                      message: error.message,
                    },
                  ]}
                />
              )}
              {data?.ykiho && (
                <LoginMsgCard
                  dataList={[
                    { title: '요양기관명칭', message: data?.name },
                    { title: '대표자명', message: data?.ceoName },
                  ]}
                />
              )}
              <button
                className={`${styles.login_button} blue-button`}
                id="btn-login"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export default Login;
