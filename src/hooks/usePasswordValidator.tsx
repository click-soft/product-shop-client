import { useEffect, useState } from 'react';
import { validPassword } from 'kbr-validator';

const usePasswordValidator = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [blurPasswords, setBlurPasswords] = useState<Set<HTMLInputElement>>(new Set());
  const [passwordError, setPasswordError] = useState('');
  const { validate, errorMessage } = validPassword(password);
  const isEqual = password == confirmPassword;
  const isEmpty = !password;

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setbluredPassword(e.target);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
    setbluredPassword(e.target);
  }

  function handlerPasswordBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    setbluredPassword(e.target);
  }

  function handlerConfirmPasswordBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    setbluredPassword(e.target);
  }

  function setbluredPassword(elem: HTMLInputElement) {
    setBlurPasswords((prevSet) => prevSet.add(elem));
  }

  useEffect(() => {
    if (blurPasswords.size !== 2) return;

    if (!isEqual) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError(errorMessage ?? '');
    }
  }, [password, confirmPassword]);

  const isValidPassword = !isEmpty && blurPasswords.size === 2 && isEqual && !!validate;

  return {
    password,
    confirmPassword,
    passwordError,
    isValidPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlerPasswordBlur,
    handlerConfirmPasswordBlur,
  };
};

export default usePasswordValidator;
