import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import validChangePasswordQuery from '../../graphql/queries/account/valid-change-password.query';
import changePasswordMutate from '../../graphql/mutates/account/change-password.mutate';

const useChangePasswordForm = (password: string) => {
  const [params] = useSearchParams();
  const userId = params.get('uid');
  const token = params.get('key');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [success, setSuccess] = useState<boolean>();

  async function fetchValidChangePassword() {
    if (!userId || !token) return;

    try {
      const isValid = await validChangePasswordQuery({ userId, token });
      if (!isValid) throw new Error();
      return isValid;
    } catch {
      setErrorMessage('비밀번호 변경 권한이 없습니다.');
      return false;
    }
  }

  async function fetchChangePassword() {
    if (!userId || !token) return;

    setLoading(true);
    const isValid = await fetchValidChangePassword();
    if (!isValid) return;

    try {
      await changePasswordMutate({ userId, password });
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchValidChangePassword();
      setLoading(false);
    })();
  }, []);

  return {
    loading,
    errorMessage,
    success,
    fetchChangePassword,
  };
};

export default useChangePasswordForm;
