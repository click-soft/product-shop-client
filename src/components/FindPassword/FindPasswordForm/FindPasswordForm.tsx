import React from 'react';
import TextInput from '../../../ui/TextInput/TextInput';
import useFindPassword from '../../../hooks/findPassword/use-find-password';
import styles from './FindPasswordForm.module.scss';
import CircleLoading from '../../Loading/CircleLoading';

const FindPasswordForm = () => {
  const { userId, loading, setUserId, sendEmail } = useFindPassword();

  function submitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    sendEmail();
  }

  return (
    <>
      {loading && <CircleLoading />}
      <form onSubmit={submitHandler}>
        <label htmlFor="id" className={styles.label}>아이디를 입력하세요.</label>
        <TextInput placeholder="ID" id="id" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button className={styles.find_button} disabled={!userId}>
          찾기
        </button>
      </form>
    </>
  );
};

export default FindPasswordForm;
