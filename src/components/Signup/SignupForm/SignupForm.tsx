import React, { useEffect } from 'react';
import styles from './SignupForm.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../../../ui/TextInput/TextInput';
import LoginMsgCard from '../../Login/LoginMsgCard/LoginMsgCard';
import ErrorText from '../../../ui/ErrorText/ErrorText';
import useSignupStore from '../../../store/signupStore';
import useSignupValidator from '../../../hooks/signup/useSignupValidator';
import useSignupService from '../../../hooks/signup/useSignupService';
import usePasswordValidator from '../../../hooks/usePasswordValidator';

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    password,
    confirmPassword,
    passwordError,
    isValidPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordValidator();
  const { id, email, isEmailFocused, idError, setId, setEmail, setIsEmailFocused } = useSignupStore();
  const { isValidSave, isValidEmail } = useSignupValidator(isValidPassword);
  const { user, save } = useSignupService();
  const [params] = useSearchParams();
  const paramUserId = params.get('uid') as string;

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidSave) return;

    save(
      { userId: id, password: password, email },
      {
        onSuccess: () => navigate('../login'),
        onFail: (error) => toast.error(error?.message),
      }
    );
  }

  useEffect(() => {
    if (!paramUserId) return;

    setId(paramUserId);
  }, [paramUserId]);

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
        value={password}
        onChange={handlePasswordChange}
      />
      <TextInput
        className={styles.input_style}
        placeholder="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {passwordError && <ErrorText className={styles.error} error={passwordError} />}
      <TextInput
        className={styles.input_style}
        placeholder="E-Mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={setIsEmailFocused}
      />
      {isEmailFocused && !isValidEmail && <ErrorText className={styles.error} error="이메일 형식을 확인하세요." />}
      <button className={styles.signup} disabled={!isValidSave}>
        가입하기
      </button>
    </form>
  );
};

export default SignupForm;
