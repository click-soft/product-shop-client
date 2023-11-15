import GroupWrapper from '../../../../../ui/GroupWapper/GroupWrapper';
import styles from './ChangeEmail.module.scss';
import useSettingsChangeEmail from '../../../../../hooks/settings/use-settings-change-email';
import ErrorText from '../../../../../ui/ErrorText/ErrorText';

const ChangeEmail = () => {
  const { email, isValidEmail, errorMessage, handleEmailChange, fetchChangeEmail } = useSettingsChangeEmail();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    fetchChangeEmail();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <GroupWrapper text="e-mail" padding={'0 0 0.5rem 0'}>
        <input
          className={styles.input}
          onChange={handleEmailChange}
          value={email}
          placeholder="e-mail 주소를 입력하세요."
        />
      </GroupWrapper>
      {errorMessage && <ErrorText className={styles.error} error={errorMessage} />}
      <button className={styles.button} disabled={!isValidEmail}>
        변경하기
      </button>
    </form>
  );
};

export default ChangeEmail;
