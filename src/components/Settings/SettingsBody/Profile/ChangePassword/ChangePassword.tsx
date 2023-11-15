import React, { useEffect, useState } from 'react';
import styles from './ChangePassword.module.scss';
import GroupWrapper from '../../../../../ui/GroupWapper/GroupWrapper';
import ErrorText from '../../../../../ui/ErrorText/ErrorText';
import useGetLoginedUser from '../../../../../hooks/use-get-logined-user';
import CircleLoading from '../../../../Loading/CircleLoading';
import useSettingsChangePassword from '../../../../../hooks/settings/use-settings-change-password';

const ChangePassword = () => {
  const user = useGetLoginedUser(true);
  const {
    currentPassword,
    password,
    confirmPassword,
    passwordError,
    validChange,
    loading,
    handleCurrentPasswordChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    fetchChangePassword,
  } = useSettingsChangePassword();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    fetchChangePassword(user?.userId!);
  }

  return (
    <>
      {loading && <CircleLoading />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <GroupWrapper className={styles.wrapper} text="현재 비밀번호" padding={'0 0 0.5rem 0'}>
          <input
            className={styles.input}
            type="password"
            placeholder="현재 비밀번호를 입력하세요."
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        </GroupWrapper>
        <GroupWrapper text="변경할 비밀번호" padding={'0.5rem 0 0.5rem 0'}>
          <input
            className={styles.input}
            type="password"
            placeholder="변경할 비밀번호를 입력하세요."
            value={password}
            onChange={handlePasswordChange}
          />
        </GroupWrapper>
        <GroupWrapper text="비밀번호 재확인" padding={'0.5rem 0 0.5rem 0'}>
          <input
            className={styles.input}
            onChange={handleConfirmPasswordChange}
            type="password"
            value={confirmPassword}
            placeholder="변경할 비밀번호를 다시 입력하세요."
          />
        </GroupWrapper>

        <ErrorText className={styles.error_text} error={passwordError} />
        <button className={styles.button} disabled={!validChange || loading}>
          변경하기
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
