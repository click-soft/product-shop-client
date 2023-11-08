import { useEffect, useState } from 'react';
import useSignupStore from '../../store/signupStore';
import { validEmail } from '../../utils/validation';

const useSignupValidator = (isValidPassword: boolean) => {
  const { id, email, isIdExists, setIdError } = useSignupStore();
  const isValidEmail = validEmail(email);
  const isValidSave = !!(id && !isIdExists && isValidPassword && isValidEmail);

  useEffect(() => {
    setIdError(isIdExists ? '존재하는 아이디입니다.' : '');
  }, [isIdExists]);

  return {
    isValidSave,
    isValidEmail,
  };
};

export default useSignupValidator;
