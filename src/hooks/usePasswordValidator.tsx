import { useEffect, useState } from 'react';

const usePasswordValidator = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [blurPasswords, setBlurPasswords] = useState<Set<HTMLInputElement>>(new Set());
  const [passwordError, setPasswordError] = useState('');
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
    } else if (isEmpty) {
      setPasswordError('비밀번호를 입력하세요.');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  const isValidPassword = !isEmpty && blurPasswords.size === 2 && isEqual;
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
