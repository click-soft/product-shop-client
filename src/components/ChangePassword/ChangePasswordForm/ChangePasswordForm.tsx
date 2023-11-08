import styles from './ChangePasswordForm.module.scss';
import TextInput from '../../../ui/TextInput/TextInput';
import ErrorText from '../../../ui/ErrorText/ErrorText';
import usePasswordValidator from '../../../hooks/usePasswordValidator';
import { useMutation, useQuery } from '@apollo/client';
import { CHANGE_PASSWORD, VALID_CHANGE_PASSWORD } from '../../../graphql/queries/account';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CircleLoading from '../../Loading/CircleLoading';
import ChangeResult from '../ChangeResult/ChangeResult';

const ChangePasswordForm = () => {
  const {
    password,
    confirmPassword,
    passwordError,
    isValidPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlerPasswordBlur,
    handlerConfirmPasswordBlur,
  } = usePasswordValidator();

  const { errorMessage, loading, changeSuccess, fetchChangePassword } = useChangePassword(password);

  function changePasswordHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    fetchChangePassword();
  }

  if (changeSuccess) {
    return <ChangeResult message="성공적으로 비밀번호가 변경되었습니다." />;
  }

  if (errorMessage) {
    return <ChangeResult message={errorMessage} isError={true} />;
  }

  return (
    <>
      {loading && <CircleLoading />}
      {!loading && !errorMessage && (
        <form onSubmit={changePasswordHandler}>
          <TextInput
            className={styles.password}
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlerPasswordBlur}
          />
          <TextInput
            className={styles.password}
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handlerConfirmPasswordBlur}
          />
          {passwordError && <ErrorText className={styles.error} error={passwordError} />}
          <button className={styles.change_button} disabled={!isValidPassword}>
            변경하기
          </button>
        </form>
      )}
    </>
  );
};

const useChangePassword = (password: string) => {
  const [params] = useSearchParams();
  const userId = params.get('userId');
  const token = params.get('key');
  const [errorMessage, setErrorMessage] = useState<string>();
  const { data, loading, error } = useQuery(VALID_CHANGE_PASSWORD, { variables: { userId, token } });
  const [changePassword, { data: changePasswordData, error: changePasswordError }] = useMutation(CHANGE_PASSWORD);
  const [changeSuccess, setChangeSuccess] = useState(false);

  function fetchChangePassword() {
    changePassword({ variables: { userId, password } });
  }

  useEffect(() => {
    if (data) {
      const isValid: boolean = data?.validChangePassword;
      if (!isValid) {
        setErrorMessage('비밀번호 변경 권한이 없습니다.');
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorMessage('비밀번호 변경 권한이 없습니다.');
    }
  }, [error]);

  useEffect(() => {
    if (!changePasswordData) return;

    const affected: number = changePasswordData.changePassword;
    if (affected) {
      setChangeSuccess(true);
    }
  }, [changePasswordData]);

  useEffect(() => {
    if (changePasswordError) {
      setErrorMessage(changePasswordError.message);
    }
  }, [changePasswordError]);

  return {
    loading,
    errorMessage,
    changeSuccess,
    fetchChangePassword,
  };
};

export default ChangePasswordForm;
