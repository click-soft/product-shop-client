import { Link, useActionData, useNavigate } from 'react-router-dom';
import Card from '../../ui/Card';
import TextInput from '../../ui/TextInput/TextInput';
import styles from './SignupPage.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import useFindUser from '../../hooks/use-find-user';
import LoginMsgCard from '../../components/Login/LoginMsgCard/LoginMsgCard';
import ErrorText from '../../ui/ErrorText/ErrorText';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ACCOUNT_EXISTS, SAVE_ACCOUNT } from '../../graphql/queries/account';
import useToast from '../../hooks/use-toast';

const SignupPage = () => {
  const [ykiho, setYkiho] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdChanged, setPwdChanged] = useState<HTMLInputElement[]>([]);
  const [ykihoErr, setYkihoErr] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const { data, fetchHospData } = useFindUser();
  const [getAccount] = useLazyQuery(GET_ACCOUNT_EXISTS);
  const [saveAccount, { error: saveAccountError, data: saveAccountData }] = useMutation(SAVE_ACCOUNT);
  const navigate = useNavigate();
  const { toast, toastConatiner } = useToast();
  const isEqualPassword = pwd === confirmPwd;

  useEffect(() => {
    fetchHospData(false, ykiho);
    if (ykiho.length === 8) {
      getAccount({ variables: { userId: ykiho } }).then((response) => {
        if (response.data) {
          if (ykiho.length === 8) setYkihoErr('이미 가입된 요양기관입니다.');
        }
      });
    } else {
      setYkihoErr('');
    }
  }, [ykiho]);

  useEffect(() => {
    if (pwdChanged.length === 2 && !isEqualPassword) {
      setPwdErr('비밀번호가 일치하지 않습니다.');
    } else {
      setPwdErr('');
    }
  }, [pwd, confirmPwd]);

  useEffect(() => {
    if (saveAccountData) {
      navigate('../login');
    } else if (saveAccountError) {
      toast.error(saveAccountError?.message);
    }
  }, [saveAccountData, saveAccountError]);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (ykiho && isEqualPassword) {
      saveAccount({
        variables: { userId: ykiho, password: pwd },
      }).catch((_) => {});
    }
  }

  function ykihoBlurHandler(): void {
    if (ykiho.length !== 8) {
      setYkihoErr('요양기관기호 자리 수를 확인하세요.');
      return;
    }
  }

  function pwdFocusHandler(e: React.FocusEvent<HTMLInputElement, Element>): void {
    setPwdChanged((p) => {
      if (p.some((input) => input === e.target)) return p;
      return p.concat(e.target);
    });
  }

  return (
    <>
      {toastConatiner}
      <Card className={styles.container}>
        <Link to={'../login'} className={styles.to_back}>
          <AiOutlineClose className={styles.exit} />
        </Link>
        <form onSubmit={submitHandler}>
          <section className={styles.title_container}>
            <h2 className={styles.title}>회원가입</h2>
          </section>
          <TextInput
            className={styles.input_style}
            placeholder="요양기관 기호"
            maxLength={8}
            value={ykiho}
            onBlur={ykihoBlurHandler}
            onChange={(e) => setYkiho(e.target.value)}
          />
          {data?.ykiho && (
            <LoginMsgCard
              dataList={[
                { title: '요양기관명칭', message: data?.name },
                { title: '대표자명', message: data?.ceoName },
              ]}
            />
          )}
          {ykihoErr && <ErrorText className={styles.error} error={ykihoErr} />}
          <TextInput
            className={styles.input_style}
            placeholder="비밀번호"
            type="password"
            value={pwd}
            onFocus={pwdFocusHandler}
            onChange={(e) => setPwd(e.target.value)}
          />
          <TextInput
            className={styles.input_style}
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPwd}
            onFocus={pwdFocusHandler}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          {pwdErr && <ErrorText className={styles.error} error={pwdErr} />}
          <button className={styles.signup} disabled={!!(ykihoErr || pwdErr)}>
            가입하기
          </button>
        </form>
      </Card>
    </>
  );
};

export default SignupPage;
