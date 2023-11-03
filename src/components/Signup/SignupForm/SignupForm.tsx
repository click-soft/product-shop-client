import React from 'react';
import styles from './SignupForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../../../ui/TextInput/TextInput';
import LoginMsgCard from '../../Login/LoginMsgCard/LoginMsgCard';
import ErrorText from '../../../ui/ErrorText/ErrorText';
import useSignupStore from '../../../store/signupStore';
import useSignupValidator from '../../../hooks/signup/useSignupValidator';
import useSignupService from '../../../hooks/signup/useSignupService';

const SignupForm = () => {
  const navigate = useNavigate();
  const { id, pwd, confirmPwd, idError, pwdError, setId, setPwd, setConfirmPwd } = useSignupStore();
  const { isValidSave, setPwdChangedElem } = useSignupValidator();
  const { user, save } = useSignupService();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidSave) return;

    save(id, pwd, {
      onSuccess: () => navigate('../login'),
      onFail: (error) => toast.error(error?.message),
    });
  }

  function pwdFocusHandler(e: React.FocusEvent<HTMLInputElement, Element>): void {
    setPwdChangedElem(e.target);
  }

  return (
    <form onSubmit={submitHandler}>
      <section className={styles.title_container}>
        <h2 className={styles.title}>회원가입</h2>
      </section>
      <TextInput
        className={styles.input_style}
        placeholder="요양기관 OR 사업자기호"
        maxLength={10}
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      {user?.ykiho && (
        <LoginMsgCard
          dataList={[
            { title: '기관명칭', message: user?.name },
            { title: '대표자명', message: user?.ceoName },
          ]}
        />
      )}
      {idError && <ErrorText className={styles.error} error={idError} />}
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
      {pwdError && <ErrorText className={styles.error} error={pwdError} />}
      <button className={styles.signup} disabled={!isValidSave}>
        가입하기
      </button>
    </form>
  );
};

export default SignupForm;
