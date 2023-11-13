import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SEND_CHANGE_PASSWORD_EMAIL } from '../../graphql/mutates/account';
import { toast } from 'react-toastify';
import useFindPasswordStore from '../../store/find-password.store';

const useFindPassword = () => {
  const { userId, sendedEmail, setUserId, setSendedEmail } = useFindPasswordStore();
  const [sendChangePasswordEmail, { data, error, loading }] = useMutation(SEND_CHANGE_PASSWORD_EMAIL);

  function sendEmail() {
    return sendChangePasswordEmail({ variables: { userId } });
  }

  useEffect(() => {
    if (!data) return;
    const email = data?.sendChangePasswordEmail;
    setSendedEmail(email);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return {
    userId,
    sendedEmail,
    loading,
    setUserId,
    sendEmail,
  };
};

export default useFindPassword;
