import { useState } from 'react';
import usePasswordValidator from '../use-password-validator';
import verifyAccountQuery from '../../graphql/queries/account/verify-account.query';
import changePasswordMutate from '../../graphql/mutates/account/change-password.mutate';
import { toast } from 'react-toastify';
import { Account } from '../../graphql/interfaces/account';

const useSettingsChangePassword = () => {
  const {
    password,
    confirmPassword,
    isValidPassword,
    passwordError,
    clear,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordValidator();
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState<boolean>();

  function handleCurrentPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPassword(e.target.value);
  }

  function clearAll() {
    setCurrentPassword('');
    clear();
  }

  async function fetchChangePassword(userId: string) {
    setLoading(true);

    let account: Account;
    try {
      account = await verifyAccountQuery({ userId, password: currentPassword });
    } catch (error: any) {
      toast.error('현재 비밀번호를 확인하세요.');
      return setLoading(false);
    }

    try {
      const success = await changePasswordMutate({ userId: account.userId, password });
      if (success) {
        toast.success('비밀번호가 변경되었습니다.');
        clearAll();
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  }

  const validChange = isValidPassword && !!currentPassword;

  return {
    password,
    confirmPassword,
    currentPassword,
    passwordError,
    validChange,
    loading,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleCurrentPasswordChange,
    fetchChangePassword,
  };
};

export default useSettingsChangePassword;
