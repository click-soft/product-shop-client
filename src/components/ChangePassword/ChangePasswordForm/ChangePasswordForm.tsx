import styles from './ChangePasswordForm.module.scss';
import TextInput from '../../../ui/TextInput/TextInput';
import ErrorText from '../../../ui/ErrorText/ErrorText';
import usePasswordValidator from '../../../hooks/use-password-validator';
import CircleLoading from '../../Loading/CircleLoading';
import ChangeResult from '../ChangeResult/ChangeResult';
import useChangePasswordForm from '../../../hooks/changePassword/use-change-password-form';

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

  const { errorMessage, loading, success, fetchChangePassword } = useChangePasswordForm(password);

  function changePasswordHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    fetchChangePassword();
  }

  if (success) {
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

export default ChangePasswordForm;
