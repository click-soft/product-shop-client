import { useEffect, useState } from 'react';
import { validEmail } from '../../utils/validation';
import changeEmailMutate from '../../graphql/mutates/account/change-email.mutate';
import { toast } from 'react-toastify';
import useProfile from '../useProfile';

const useSettingsChangeEmail = () => {
  const { user, fetchGetUser } = useProfile();
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();

  async function fetchChangeEmail() {
    if (!isValidEmail) return;

    try {
      const success = await changeEmailMutate({ newEmail: email! });
      if (!success) return;
      await fetchGetUser();

      toast.success('변경되었습니다.');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    setEmail(user?.email ?? '');
  }, [user?.email]);

  useEffect(() => {
    setErrorMessage('');

    const isValid = validEmail(email!);
    if (!isValid) {
      setErrorMessage('이메일 형식이 맞지 않습니다.');
    }
    const isEqual = user?.email === email;

    setIsValidEmail(isValid && !isEqual);
  }, [email]);

  return {
    email,
    isValidEmail,
    errorMessage,
    handleEmailChange,
    fetchChangeEmail,
  };
};

export default useSettingsChangeEmail;
